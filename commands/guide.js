const { SlashCommandBuilder } = require('discord.js');

const raids = [
  { name: 'p5s', fullname: 'Pandaemonium Abyssos: The Fifth Circle'},
  { name: 'p6s', fullname: 'Pandaemonium Abyssos: The Sixth Circle'},
  { name: 'p7s', fullname: 'Pandaemonium Abyssos: The Seventh Circle'},
  { name: 'p8s', fullname: 'Pandaemonium Abyssos: The Eighth Circle'},
]

module.exports = {
  data: new SlashCommandBuilder()
    .setName('guide')
    .setNameLocalizations({
      th: 'ไกด์'
    })
    .setDescription('search ffxiv raiding guide')
    .setDescriptionLocalizations({
      th: 'ค้นหาไกด์วิธีเล่นเหรด ffxiv',
    })
    .addStringOption(option =>
      option
        .setName('raid')
        .setNameLocalizations({
          th: 'ตัวย่อชื่อเหรด'
        })
        .setDescription('input raid abbreviation name.')
        .setDescriptionLocalizations({
          th: 'ใส่ตัวย่อชื่อเหรด เช่น p8s, uwu, tea',
        })
        .setAutocomplete(true)
    ),
    async execute(interaction) {
      
      if (interaction.isAutocomplete()) {

        const focusedValue = interaction.options.getFocused(true);

        let choices = []
        if (focusedValue.name === 'raid') {
          choices = raids
        }

        const filtered = choices.filter(choice => choice.name.startsWith(focusedValue.value))

        await interaction.respond(
          filtered.map(choice => ({ name: choice.name, value: choice.name, description: 'test' })),
        )

      }else{

        console.log(`[+] ${interaction.user.tag} is getting ${interaction.options.get('raid')} guide.`)

        await interaction.reply({
          content: `[+] ${interaction.user.tag} is getting ${interaction.options.get('raid').value} guide.`,
          ephemeral: true
        });

      }
    },
};
