import * as ftp from "basic-ftp";
import * as path from "path";
import * as fs from "fs";
import * as dns from "dns/promises";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");
const distDir = path.join(rootDir, "dist");

async function deploy() {
  console.log("🚀 Starting deployment to Namecheap Stellar Plus...");

  const host = process.env.NAMECHEAP_FTP_HOST?.trim() || "ftp.streamuk.vip";
  const user = process.env.NAMECHEAP_FTP_USER?.trim() || "deploy@streamuk.vip";
  const password = process.env.NAMECHEAP_FTP_PASS?.trim() || "-.Tu%mLxbTsDm3[v";
  const rawRemoteDir = process.env.NAMECHEAP_REMOTE_DIR?.trim() || "/";
  const useTls = process.env.NAMECHEAP_USE_TLS === "false" ? false : true;

  if (!host || !user || !password) {
    console.error("❌ Missing required FTP environment variables:");
    if (!host) console.error("   - NAMECHEAP_FTP_HOST is missing");
    if (!user) console.error("   - NAMECHEAP_FTP_USER is missing");
    if (!password) console.error("   - NAMECHEAP_FTP_PASS is missing");
    process.exit(1);
  }

  // Ensure dist directory exists
  if (!fs.existsSync(distDir)) {
    console.error("❌ 'dist' directory not found. Please run 'npm run build' first.");
    process.exit(1);
  }

  // Ensure .htaccess is in dist
  const htaccessSrc = path.join(rootDir, "public", ".htaccess");
  const htaccessDest = path.join(distDir, ".htaccess");
  if (fs.existsSync(htaccessSrc) && !fs.existsSync(htaccessDest)) {
    fs.copyFileSync(htaccessSrc, htaccessDest);
    console.log("📄 Copied .htaccess to dist directory.");
  }

  let resolvedHost = host;
  try {
    const lookup = await dns.lookup(resolvedHost);
    console.log(`📡 Resolved ${resolvedHost} -> IP: ${lookup.address}`);
  } catch (dnsErr) {
    console.warn(`⚠️ Could not resolve DNS for ${resolvedHost}: ${dnsErr.message}`);
    if (resolvedHost.startsWith("ftp.")) {
      const fallback = resolvedHost.replace(/^ftp\./, "");
      try {
        const lookup = await dns.lookup(fallback);
        console.log(`📡 Resolved fallback ${fallback} -> IP: ${lookup.address}`);
        resolvedHost = fallback;
      } catch (err) {
        console.warn(`⚠️ Could not resolve fallback ${fallback}: ${err.message}`);
      }
    }
  }

  const client = new ftp.Client(30000); // 30s timeout
  client.ftp.verbose = true;

  try {
    console.log(`🔌 Connecting to ${resolvedHost} as ${user} (TLS: ${useTls})...`);
    
    await client.access({
      host: resolvedHost,
      user: user,
      password: password,
      secure: useTls,
      secureOptions: {
        rejectUnauthorized: false
      }
    });

    console.log("✅ FTP Connection established!");

    const targetFolders = ["/public_html", "/streamuk.vip", "/"];
    for (const folder of targetFolders) {
      try {
        console.log(`📁 Navigating to remote folder: ${folder}`);
        await client.ensureDir(folder);
        console.log(`📦 Uploading static files from ./dist to ${folder}...`);
        await client.uploadFromDir(distDir, folder);
        console.log(`✅ Successfully uploaded to ${folder}`);
      } catch (uploadErr) {
        console.warn(`⚠️ Warning: Could not upload to ${folder}:`, uploadErr.message);
      }
    }

    console.log("🎉 DEPLOYMENT SUCCESSFUL!");
    console.log("🌐 Your site is live on Namecheap Stellar Plus at https://streamuk.vip");
  } catch (err) {
    console.error("❌ Deployment failed:", err.message || err);
    if (useTls && (err.message?.includes("timeout") || err.message?.includes("ECONNREFUSED") || err.message?.includes("SSL"))) {
      console.log("🔄 Retrying without TLS (standard plain FTP)...");
      try {
        const plainClient = new ftp.Client(30000);
        plainClient.ftp.verbose = true;
        await plainClient.access({
          host: resolvedHost,
          user: user,
          password: password,
          secure: false
        });
        console.log("✅ Plain FTP Connection established!");
        const targetFolders = ["/public_html", "/streamuk.vip", "/"];
        for (const folder of targetFolders) {
          try {
            console.log(`📁 Navigating to remote folder: ${folder}`);
            await plainClient.ensureDir(folder);
            console.log(`📦 Uploading static files from ./dist to ${folder}...`);
            await plainClient.uploadFromDir(distDir, folder);
            console.log(`✅ Successfully uploaded to ${folder}`);
          } catch (uploadErr) {
            console.warn(`⚠️ Warning: Could not upload to ${folder}:`, uploadErr.message);
          }
        }
        console.log("🎉 DEPLOYMENT SUCCESSFUL via Plain FTP!");
        plainClient.close();
        return;
      } catch (plainErr) {
        console.error("❌ Plain FTP retry also failed:", plainErr.message || plainErr);
      }
    }
    process.exit(1);
  } finally {
    client.close();
  }
}

deploy();

