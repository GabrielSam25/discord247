require('dotenv').config();
const { Client } = require('discord.js-selfbot-v13');

const client = new Client();

client.on('ready', () => {
  console.log(`Logado como ${client.user.username}`);
});

client.login(process.env.AUTH_KEY); // Novo nome da variável
