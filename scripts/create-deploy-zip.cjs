const fs = require('fs');
const path = require('path');
const JSZip = require('jszip');

async function createZip() {
  console.log('📦 Creating Namecheap Production Zip Package...');
  const zip = new JSZip();
  const distDir = path.resolve('dist');

  if (!fs.existsSync(distDir)) {
    console.error('❌ dist folder does not exist. Run vite build first.');
    return;
  }

  function addFolderToZip(folderPath, zipFolder) {
    const items = fs.readdirSync(folderPath);
    for (const item of items) {
      if (item === 'server.cjs' || item === 'server.cjs.map' || item.endsWith('.zip')) {
        continue;
      }
      const itemPath = path.join(folderPath, item);
      const stat = fs.statSync(itemPath);
      if (stat.isDirectory()) {
        const subZip = zipFolder.folder(item);
        addFolderToZip(itemPath, subZip);
      } else {
        const content = fs.readFileSync(itemPath);
        zipFolder.file(item, content);
      }
    }
  }

  addFolderToZip(distDir, zip);

  // Ensure .htaccess and .github workflow are included
  const htaccessPath = path.resolve('public/.htaccess');
  if (fs.existsSync(htaccessPath)) {
    zip.file('.htaccess', fs.readFileSync(htaccessPath));
  }
  const githubWorkflowPath = path.resolve('.github/workflows/deploy.yml');
  if (fs.existsSync(githubWorkflowPath)) {
    zip.file('.github/workflows/deploy.yml', fs.readFileSync(githubWorkflowPath));
  }

  const zipBuffer = await zip.generateAsync({
    type: 'nodebuffer',
    compression: 'DEFLATE',
    compressionOptions: { level: 9 }
  });

  const outPublicPath = path.resolve('public/streamuk-production-build.zip');
  fs.writeFileSync(outPublicPath, zipBuffer);
  fs.writeFileSync(path.resolve('public/globalstreamhub-github-build.zip'), zipBuffer);
  console.log(`✅ Saved ${outPublicPath} (${(zipBuffer.length / 1024).toFixed(1)} KB)`);

  const outDistPath = path.resolve('dist/streamuk-production-build.zip');
  fs.writeFileSync(outDistPath, zipBuffer);
  fs.writeFileSync(path.resolve('dist/globalstreamhub-github-build.zip'), zipBuffer);
  console.log(`✅ Saved ${outDistPath}`);
}

createZip().catch(console.error);
