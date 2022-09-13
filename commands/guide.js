const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('guide')
    .setDescription('search ffxiv raiding guide')
    .addStringOption(option =>
      option.setName('raid')
        .setDescription('input raid abbreviation name.')
        .setAutocomplete(true));,
  async execute(interaction) {
    console.log(`[+] user ${interaction.user.tag}:${interaction.user.id} looking for ${}`)
    await interaction.reply(`Server name: ${interaction.guild.name}\nTotal members: ${interaction.guild.memberCount}`);
  },
};
