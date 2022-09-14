const fs = require('node:fs');
const path = require('node:path');

const { Routes } = require('discord.js');
const { REST } = require('@discordjs/rest');

require('dotenv').config()
const clientId = process.env.CLIENT_ID
const guildId = process.env.GUILD_ID
const token = process.env.TOKEN

const rest = new REST({ version: '10' }).setToken(token);

const commands = []
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

//loop read file to commands array
for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);
  commands.push(command.data.toJSON());
}

rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
  .then((data) => {
    for(let command of commands) {
      console.log(`[+] Successfully registered `, command)
    }
    console.log(`[+] Successfully registered ${data.length} commands`)
  })
  .catch(console.error);