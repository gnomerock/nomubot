const { 
  SlashCommandBuilder,
  EmbedBuilder
} = require('discord.js');

const raids = [
  { name: 'p1s', fullname: 'Pandaemonium Abyssos: The First Circle'},
  { name: 'p2s', fullname: 'Pandaemonium Abyssos: The Second Circle'},
  { name: 'p3s', fullname: 'Pandaemonium Abyssos: The Third Circle'},
  { name: 'p4s', fullname: 'Pandaemonium Abyssos: The Forth Circle'},
  { name: 'p5s', fullname: 'Pandaemonium Abyssos: The Fifth Circle'},
  { name: 'p6s', fullname: 'Pandaemonium Abyssos: The Sixth Circle'},
  { name: 'p7s', fullname: 'Pandaemonium Abyssos: The Seventh Circle'},
  { name: 'p8s', fullname: 'Pandaemonium Abyssos: The Eighth Circle'},
  { name: 'p9s', fullname: 'Pandaemonium Abyssos: The Ninth Circle'},
  { name: 'p10s', fullname: 'Pandaemonium Abyssos: The Tenth Circle'},
  { name: 'p11s', fullname: 'Pandaemonium Abyssos: The Eleventh Circle'},
  { name: 'p12s', fullname: 'Pandaemonium Abyssos: The Twelfth Circle'},
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
        let selectedRaid = interaction.options.get('raid').value
        console.log(`[+] ${interaction.user.tag} is getting ${selectedRaid} guide.`)
        const embed = new EmbedBuilder()
          .setColor(0x0099FF)
          .setTitle('Some title')
          .setURL('https://discord.js.org/')
          .setAuthor({ name: 'Some name', iconURL: 'https://i.imgur.com/AfFp7pu.png', url: 'https://discord.js.org' })
          .setDescription('Some description here')
          .setThumbnail('https://i.imgur.com/AfFp7pu.png')
          .addFields(
            { name: 'Regular field title', value: 'Some value here' },
            { name: '\u200B', value: '\u200B' },
            { name: 'Inline field title', value: 'Some value here', inline: true },
            { name: 'Inline field title', value: 'Some value here', inline: true },
          )
          .addFields({ name: 'Inline field title', value: 'Some value here', inline: true })
          .setImage('https://i.imgur.com/AfFp7pu.png')
          .setTimestamp()
          .setFooter({ text: 'Some footer text here', iconURL: 'https://i.imgur.com/AfFp7pu.png' });

        await interaction.reply({
          // content: `[+] ${interaction.user.tag} is getting ${interaction.options.get('raid').value} guide.`,
          embeds: [embed],
          ephemeral: true
        });

      }
    },
};
