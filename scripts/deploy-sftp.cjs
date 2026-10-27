const fs = require('fs');
const path = require('path');
const SftpClient = require('ssh2-sftp-client');

async function deploy() {
  console.log('🚀 Starting Fast Production Deployment to Namecheap (SFTP)...');

  const host = process.env.NAMECHEAP_FTP_HOST || 'premium35-2.web-hosting.com';
  const username = process.env.NAMECHEAP_FTP_USER || 'streclrv';
  const password = process.env.NAMECHEAP_FTP_PASS;
  
  // Resolve target web directory on cPanel (always public_html)
  let targetBase = process.env.NAMECHEAP_REMOTE_DIR || 'public_html';
  if (targetBase === '/' || targetBase === '') {
    targetBase = 'public_html';
  } else if (targetBase.startsWith('/')) {
    targetBase = targetBase.replace(/^\/+/, '');
  }

  if (!username || !password) {
    console.error('❌ Error: Missing Namecheap credentials (NAMECHEAP_FTP_USER or NAMECHEAP_FTP_PASS).');
    process.exit(1);
  }

  const distDir = path.resolve('dist');
  if (!fs.existsSync(distDir)) {
    console.error('❌ Error: dist/ directory not found. Please run "npm run build" first.');
    process.exit(1);
  }

  const sftp = new SftpClient();
  const port = 21098;

  try {
    console.log(`📡 Connecting securely to ${host}:${port} as ${username}...`);
    await sftp.connect({
      host,
      port,
      username,
      password,
      readyTimeout: 20000,
      retries: 2
    });
    console.log('✅ Connected via SSH/SFTP.');

    // Ensure remote targetBase exists
    const exists = await sftp.exists(targetBase);
    if (!exists) {
      console.log(`📁 Creating folder: ${targetBase}...`);
      await sftp.mkdir(targetBase, true);
    }

    // Cache remote file list for fast smart sync
    async function getRemoteMap(remoteDir) {
      try {
        const list = await sftp.list(remoteDir);
        const map = new Map();
        for (const item of list) {
          map.set(item.name, item);
        }
        return map;
      } catch {
        return new Map();
      }
    }

    // Recursive smart upload
    async function syncDirectory(localDir, remoteDir) {
      const items = fs.readdirSync(localDir);
      const remoteMap = await getRemoteMap(remoteDir);

      for (const item of items) {
        // Skip backend server binary and zip from root
        if (item === 'server.cjs' || item === 'server.cjs.map' || item.endsWith('.zip')) {
          continue;
        }

        const localItemPath = path.join(localDir, item);
        const remoteItemPath = `${remoteDir}/${item}`;
        const stat = fs.statSync(localItemPath);

        if (stat.isDirectory()) {
          if (!remoteMap.has(item)) {
            console.log(`📁 Creating remote directory: ${remoteItemPath}`);
            await sftp.mkdir(remoteItemPath, true);
          }
          await syncDirectory(localItemPath, remoteItemPath);
        } else {
          const remoteFile = remoteMap.get(item);
          // If remote file exists and has identical size (e.g. large images), skip to save bandwidth & time
          if (remoteFile && remoteFile.size === stat.size && item !== 'index.html' && item !== '.htaccess' && item !== 'sitemap.xml' && item !== 'robots.txt') {
            continue;
          }

          console.log(`⬆️ Uploading: ${item} -> ${remoteItemPath} (${(stat.size / 1024).toFixed(1)} KB)`);
          await sftp.put(localItemPath, remoteItemPath);
        }
      }
    }

    console.log(`📦 Syncing build assets directly into "${targetBase}"...`);
    await syncDirectory(distDir, targetBase);

    // Always ensure latest .htaccess is uploaded
    const htaccessPath = path.resolve('public/.htaccess');
    if (fs.existsSync(htaccessPath)) {
      console.log(`⬆️ Uploading latest .htaccess -> ${targetBase}/.htaccess`);
      await sftp.put(htaccessPath, `${targetBase}/.htaccess`);
    }

    console.log('\n🎉 ========================================================');
    console.log('🚀 LIVE DEPLOYMENT COMPLETE TO NAMECHEAP!');
    console.log(`🌍 Live Location: ${targetBase} (https://streamuk.vip)`);
    console.log('🎉 ========================================================\n');

    await sftp.end();
  } catch (err) {
    console.error('❌ Deployment Failed:', err.message);
    try { await sftp.end(); } catch (e) {}
    process.exit(1);
  }
}

deploy();

