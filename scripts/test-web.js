async function inspectHtml() {
  const res = await fetch("https://streamuk.vip");
  const text = await res.text();
  console.log("Full HTML returned from https://streamuk.vip:\n", text);
}
inspectHtml();
