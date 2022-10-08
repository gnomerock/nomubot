const { SlashCommandBuilder } = require("discord.js")

module.exports = {
  data: new SlashCommandBuilder()
    .setName('help')
    .setDescription('Boops the specified user, as many times as you want')
    .addUserOption((option) => option.setName('user').setDescription('The user to boop').setRequired(true))

    // Adds an integer option
    .addIntegerOption((option) =>
      option.setName('boop_amount').setDescription('How many times should the user be booped (defaults to 1)'),
    )

    // Supports choices too!
    .addIntegerOption((option) =>
      option
        .setName('boop_reminder')
        .setDescription('How often should we remind you to boop the user')
        .addChoices({ name: 'Every day', value: 1 }, { name: 'Weekly', value: 7 }),
    ),
  async execute(interaction) {
    await interaction.reply(`Server name: ${interaction.guild.name}\nTotal members: ${interaction.guild.memberCount}`);
  },
};