import * as ftp from "basic-ftp";
import dotenv from "dotenv";

dotenv.config();

async function inspectFtp() {
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

    console.log("=== Listing Remote Root Directory ===");
    const list = await client.list("/");
    for (const item of list) {
      console.log(`${item.isDirectory ? "[DIR]" : "[FILE]"} ${item.name} (${item.size} bytes)`);
    }

    // Check if there are unwanted default files
    const defaultFiles = ["index.php", "default.html", "index.html.default", "parking.php", "parking.html"];
    for (const df of defaultFiles) {
      const found = list.find(f => f.name.toLowerCase() === df.toLowerCase());
      if (found) {
        console.log(`Found unwanted default file: ${found.name}, removing it...`);
        await client.remove(`/${found.name}`);
        console.log(`Removed ${found.name}`);
      }
    }
  } catch (err) {
    console.error("Error inspecting FTP:", err.message);
  } finally {
    client.close();
  }
}

inspectFtp();
