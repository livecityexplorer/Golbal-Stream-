import dns from "dns/promises";

async function checkDNS() {
  dns.setServers(["8.8.8.8", "1.1.1.1"]);
  try {
    const aRecords = await dns.resolve4("streamuk.vip");
    console.log("streamuk.vip A records via Google/Cloudflare DNS:", aRecords);
    const nsRecords = await dns.resolveNs("streamuk.vip");
    console.log("streamuk.vip NS records:", nsRecords);
  } catch (e) {
    console.error("DNS Error:", e.message);
  }
}
checkDNS();
