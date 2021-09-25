require('dotenv').config();
const Discord = require('discord.js');
const { Client } = require('ssh2');

const bot = new Discord.Client();
const TOKEN = process.env.TOKEN;
const prefix = '$';

const client = new Client();
bot.login(TOKEN);

bot.on('ready', () => {
  console.info(`Logged in as ${bot.user.tag}!`);
  client.on('ready', () => {
		console.log('Ssh is ready');
  }).connect({
    host: '127.0.0.1',
    port: 8022,
    username: 'u0_a230',
    password: 'ggopx1124'
  });
});

bot.on('message', (message) => {
	if (!message.content.startsWith(prefix))
		return;

	const command = message.content.substring(prefix.length, message.content.length);
  client.exec(command, (err, stream) => {
  	if (err) throw err;
    stream.on('data', (data) => {
      console.log('STDOUT: \n' + data);
      message.reply('\n' + data);
    }).stderr.on('data', (data) => {
      console.log('STDERR: \n' + data);
      message.reply('\n' + data);
    });
  });
});
