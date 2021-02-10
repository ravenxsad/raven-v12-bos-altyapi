const qdb = require("quick.db");
const client = global.client;
module.exports = () => {
  console.log("Bot aktif!");
  client.channels.cache.get('').join() //BOT SES KANALI İD
  client.user.setActivity("Râven ❤️ Syrix");
}
module.exports.configuration = {
  name: "ready"
}