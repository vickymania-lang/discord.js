require('dotenv').config();

const { Client, Intents } = require('discord.js')
const client = new Client({ intents: [ Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const PREFIX = "$";

client.on('ready', () => {
    console.log(`${client.user.tag} has logged in.`);
});

client.on('message', (message) => {
    if (message.author.bot) return;
    if (message.content.startsWith(PREFIX)) {
        const [CMD_NAME, ...args] = message.content
        .trim()
        .substring(PREFIX.length)
        .split(/\s+/);
        if (CMD_NAME === 'kick') {
            if (!message.member.hasPermission('KICK_MEMBERS'))
            return message.reply('you do not have permissions to use that command');
            if (args.length === 0) return message.reply('please provide an ID');
            const member = message.guild.members.cache.get(args[0]);
            if (member) {
                member
                .kick()
                .then((member) => message.channel.send(`${member} was kicked.`))
                .catch((err) => message.channel.send('i do not have permissions :('))
            } else {
                message.channel.send('that member was not found');
            }
        }else if (CMD_NAME === 'ban') {
            if (!message.member.hasPermission('BAN_MEMBERS'))
            return message.reply("you do not have permissions to use that command");
        }
       console.log(CMD_NAME);
       console.log(args);
    }
});

client.login(process.env.discord_bot_token);