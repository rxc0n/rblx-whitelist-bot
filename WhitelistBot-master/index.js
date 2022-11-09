const Discord = require('discord.js');
const client = new Discord.Client();
const Rcon = require('modern-rcon');
const rcon = new Rcon('localhost', 'testingshit');

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  if (msg.content === 'ping') {
    msg.reply('Pong!');
  }
});

client.on('guildMemberUpdate', (oldMember, newMember) => {

  // Fire if user has a role
  if (newMember.roles.find(r => r.name === "Member")) {
    rcon.connect().then(() => {
      return rcon.send(`whitelist add ${newMember.displayName}`);
    }).then(res => {
      console.log(res);
    }).then(() => {
      return rcon.disconnect();
    });
  }
})

client.login('MTAxNTQ3ODU4MTU1MzU0OTM3Mw.GCUiOh.4026bI_503yXvmhSVUA0ELIuTWY-mgP8O6RL_s');