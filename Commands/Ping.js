const Discord = require('discord.js');
const moment = require('moment');
const ayarlar = require('../ayarlar.json');
require('moment-duration-format');
module.exports.execute = async (client, message, args) => {
 message.channel.send(`${client.ws.ping}ms\n${new Date().getTime() - message.createdTimestamp} Message Delay`)
}

module.exports.configuration = {
    name: "ping",
    aliases: ['ms'],
    usage: "ping",
    description: "Bot ping"
  };