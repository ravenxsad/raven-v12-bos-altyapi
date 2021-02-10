const { Discord, MessageEmbed, Client } = require('discord.js');
const client = global.client = new Client({fetchAllMembers: true});
const ayarlar = require("./ayarlar.json");
const http = require("http");
const express = require("express");
const queue = new Map();
const moment = require("moment");
const fs = require("fs");
const db = require("quick.db");

const app = express();
app.get("/", (request, response) => {
  console.log(Date.now() + " Ping tamamdır.");
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);

var prefix = ayarlar.prefix;

const log = message => {
  console.log(`${message}`);
};

client.on("message", (message) => {
    if (message.author.bot ||!message.content.startsWith(ayarlar.prefix) || !message.channel || message.channel.type == "dm") return;
    let args = message.content
      .substring(ayarlar.prefix.length)
      .split(" ");
    let command = args[0];
    let bot = message.client;
    args = args.splice(1);
    let calistirici;
    if (commands.has(command)) {
      calistirici = commands.get(command);
      calistirici.execute(bot, message, args);
    } else if (aliases.has(command)) {
      calistirici = aliases.get(command);
      calistirici.execute(bot, message, args);
    }
});

const commands = new Map();
global.commands = commands;
const aliases = new Map();
global.aliases = aliases;
global.client = client;
fs.readdir("./Commands", (err, files) => {
if(err) return console.error(err);
files = files.filter(file => file.endsWith(".js"));
console.log(`${files.length} komut yüklenecek.`);
files.forEach(file => {
    let prop = require(`./Commands/${file}`);
    if(!prop.configuration) return;
    console.log(`${prop.configuration.name} komutu yükleniyor!`);
    if(typeof prop.onLoad === "function") prop.onLoad(client);
    commands.set(prop.configuration.name, prop);
    if(prop.configuration.aliases) prop.configuration.aliases.forEach(aliase => aliases.set(aliase, prop));
});
});

fs.readdir("./Events", (err, files) => {
if(err) return console.error(err);
files.filter(file => file.endsWith(".js")).forEach(file => {
    let prop = require(`./Events/${file}`);
    if(!prop.configuration) return;
    client.on(prop.configuration.name, prop);
});
});

client.sayilariCevir = function(x) {
return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

client.login(ayarlar.token);
