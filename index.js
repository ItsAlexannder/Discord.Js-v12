const Discord = require('discord.js');
const client = new Discord.Client();
const { prefix, token } = require('./config.json');
const fs = require('fs');
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection()
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    command.aliases.forEach(alias => client.aliases.set(alias, command.name))
    client.commands.set(command.name, command)
        
};
client.on('message', async(message) =>{
    if(message.author.bot) return
    if(!message.content.startsWith(prefix)) return
    if(!message.member) message.member = await message.guild.fetchMember(message);
    const args = message.content.slice(prefix.length).split(/ +/)
    const command = args.shift().toLowerCase()
    const cmd = client.commands.get(command) || client.commands.get(client.aliases.get(command))
    if(cmd === null) return
    if(cmd) cmd.run(client, message, args)
    if(!cmd) return
    // Dupa parerea mea este cel mai simplu command handler de invatat.
    //Poti adauga cate comenzi vrei, uite exemplu de module.exports;
    //module.exports = {
    //   name: "nume",
    //    aliases: ["altnume/prescurtare"],
    //    description: "descriere",
    //    run: async (client, message, args) => {
    //        code
    //    }}
    //Tot ce este aici este si in descriere si pe server-ul de discord! Ceaw <3
})
client.on('ready', () =>{ 
    console.log('Sunt online!'); //Logs - Botul este online!
    client.user.setActivity('Salut!'); //Custom status
})

client.login(token);

