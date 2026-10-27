import * as ftp from "basic-ftp";
import dotenv from "dotenv";

dotenv.config();

async function testDeployDirect() {
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

    console.log("Current working directory for FTP user:", await client.pwd());
    const list = await client.list();
    console.log("Files in this FTP directory:", list.map(i => i.name));
  } catch (err) {
    console.error("FTP error:", err);
  } finally {
    client.close();
  }
}

testDeployDirect();
