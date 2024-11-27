const wbm = require("./src/index");

(async () => {
  await wbm
    .start({ showBrowser: true, session: true })
    .then(async () => {
      const phones = ["923108559858"];
      console.log("🚀 ~ .then ~ phones:", phones)

      const message = new Date().toLocaleString(); // Or use toISOString() for ISO format
      console.log("🚀 ~ .then ~ message:", message)

      await wbm.send(phones, message);
      await wbm.end();
    })
    .catch((err) => console.log(err));
})();
