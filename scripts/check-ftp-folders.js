import * as ftp from "basic-ftp";
import dotenv from "dotenv";

dotenv.config();

async function checkFtpFolders() {
  const host = process.env.NAMECHEAP_FTP_HOST?.trim();
  const user = process.env.NAMECHEAP_FTP_USER?.trim();
  const password = process.env.NAMECHEAP_FTP_PASS?.trim();

  const client = new ftp.Client(30000);
  try {
    await client.access({
      host,
      user,
      password,
      secure: true,
      secureOptions: { rejectUnauthorized: false }
    });

    console.log("Current working directory:", await client.pwd());
    
    // Try to CDUP to see if we are in a subfolder or jailed
    try {
      await client.cdup();
      console.log("After CDUP, directory is:", await client.pwd());
      const parentList = await client.list();
      console.log("Parent folder contents:", parentList.map(i => i.name));
    } catch (e) {
      console.log("Cannot CDUP (FTP user is jailed to its root):", e.message);
    }
  } catch (err) {
    console.error("Error:", err.message);
  } finally {
    client.close();
  }
}

checkFtpFolders();
