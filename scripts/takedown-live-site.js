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
const offlineDir = path.join(rootDir, "offline_bundle");

async function takedown() {
  console.log("🛑 INITIATING IMMEDIATE LIVE SITE TAKEDOWN FOR streamuk.vip...");

  const host = process.env.NAMECHEAP_FTP_HOST?.trim() || "ftp.streamuk.vip";
  const user = process.env.NAMECHEAP_FTP_USER?.trim() || "deploy@streamuk.vip";
  const password = process.env.NAMECHEAP_FTP_PASS?.trim() || "-.Tu%mLxbTsDm3[v";
  const useTls = process.env.NAMECHEAP_USE_TLS === "false" ? false : true;

  if (!fs.existsSync(offlineDir)) {
    console.error("❌ 'offline_bundle' directory not found.");
    process.exit(1);
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

  const client = new ftp.Client(30000);
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

        // List and remove all existing items to completely wipe old pages
        console.log(`🧹 Clearing all existing files and subdirectories in ${folder}...`);
        try {
          await client.clearWorkingDir();
          console.log(`✅ Working dir cleared in ${folder}`);
        } catch (clearErr) {
          console.warn(`⚠️ clearWorkingDir warning in ${folder}:`, clearErr.message);
        }

        // Upload only the offline placeholder files
        console.log(`📤 Uploading offline placeholder files to ${folder}...`);
        await client.uploadFromDir(offlineDir, folder);
        console.log(`✅ Offline placeholder active in ${folder}`);
      } catch (folderErr) {
        console.warn(`⚠️ Could not update ${folder}:`, folderErr.message);
      }
    }

    console.log("🎉 TAKEDOWN SUCCESSFUL!");
    console.log("🛑 All pages have been removed. The live site is now completely offline.");
  } catch (err) {
    console.error("❌ Takedown via TLS failed:", err.message || err);
    if (useTls) {
      console.log("🔄 Retrying with plain FTP...");
      const plainClient = new ftp.Client(30000);
      plainClient.ftp.verbose = true;
      try {
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
            await plainClient.clearWorkingDir();
            await plainClient.uploadFromDir(offlineDir, folder);
            console.log(`✅ Offline placeholder active in ${folder}`);
          } catch (folderErr) {
            console.warn(`⚠️ Could not update ${folder}:`, folderErr.message);
          }
        }
        console.log("🎉 TAKEDOWN SUCCESSFUL via Plain FTP!");
        plainClient.close();
        return;
      } catch (plainErr) {
        console.error("❌ Plain FTP retry also failed:", plainErr.message || plainErr);
        process.exit(1);
      }
    }
    process.exit(1);
  } finally {
    client.close();
  }
}

takedown();
