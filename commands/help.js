/* eslint-disable no-unused-vars */
const moment = require('moment');
const { MessageEmbed, MessageActionRow, MessageButton, ButtonInteraction } = require('discord.js')


const helpEmbed = new MessageEmbed()
    .setTitle('Hey Hey')
    .setImage('https://cdn.discordapp.com/attachments/883245986166759437/960615193115762740/unknown.png')
    .setDescription(
        `fuck you`
    )
    .setColor('PURPLE')

const row = new MessageActionRow()

    .addComponents(

        new MessageButton()
            .setStyle('LINK')
            .setLabel('Code base')
            .setEmoji('<:github:538520337529307145>'),
            //.setURL('https://github.com/mrbaggiebug/Ben-bot'),

        new MessageButton()
            .setURL('https://top.gg/bot/945330615685873704')
            .setLabel("Rate Ben on top.gg!!")
            .setEmoji("⭐")
            .setStyle('LINK'),

        new MessageButton()
            .setStyle('PRIMARY')
            .setLabel('Very dark Ben twitter account')
            .setURL('https://twitter.com/discordingben')
            .setEmoji('<:Twitter:871910111763914833>')
            .setStyle('LINK'),


        new MessageButton()
            .setURL('https://www.buymeacoffee.com/MrBaggieBug')
            .setLabel('Donations')
            .setStyle('LINK')
            .setEmoji('<:8bitL:942601692782936065>'),

        new MessageButton()
            .setLabel('Our support server!')
            .setURL('https://discord.gg/jb8vUDTF5s')
            .setEmoji('<:discord:935402576877346846>')
            .setStyle('LINK'),

    )

module.exports = {
    name: 'help',
    description: 'send help',
    cooldown: 5,
    async execute(message) {
        let time = moment().format("LTS")

        //message.channel.send({ embeds: [helpEmbed], components: [row] })
        console.log(`[${time}] H`)
    },
};
