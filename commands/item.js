const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('item')
    .setDescription('ffxiv item information'),
  async execute(interaction) {
    let response = await fetch(`https://xivapi.com/item/1675?private_key=56399de741e7447b85de39f3b81e09f65ac30b0a370a485b81f3fc84a14727b8&pretty=1`)
    
    let data = await response.json().data
    console.log({data})
    await interaction.reply({
      content: `${data}`,
      ephemeral: true
    });
  },
};