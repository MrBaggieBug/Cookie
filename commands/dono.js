const moment = require('moment')
const { MessageEmbed } = require('discord.js')

module.exports = {
    name: 'dono',
    description: 'plz help an opensource dev eat and feed his 5 wive and children',
    async execute(message) {

        let time = moment().format('LTS')
        const donoEmbed = new MessageEmbed()
        .setTitle('Donations!')
        .setDescription(
            'As you might know this shit is a free and opensource software, and I get 0 bitches \n so it would be very nice of you to buy me some Head at \n \n https://www.buymeacoffee.com/MrBaggieBug \n \n List of donations: \n \n 1. **2NA.#0002** <:Cookie:970644679353831424><:Cookie:970644679353831424><:Cookie:970644679353831424><:Cookie:970644679353831424><:Cookie:970644679353831424> \n2. **zujikou#3014** <:Cookie:970644679353831424> '
            )
        .setFooter('LOVE U MFS <3')
        .setURL('https://www.buymeacoffee.com/MrBaggieBug')
        .setImage('https://cdn.discordapp.com/attachments/883245986166759437/959316443399352350/no-bitches-gclik-gif.gif')

        message.reply({embeds:[donoEmbed]})
        console.log(`[${time}] Donation`)

    }
}