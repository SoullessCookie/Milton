const mongo = require('./mongo')
const command = require('./command')
const welcomeSchema = require('./schemas/welcome-schema')

module.exports = (client) => {
    
    command(client, 'setwelcome', async (message) => {
        const { member, channel, content, guild } = message

        if (!member.hasPermission('ADMINISTRATOR')) {
            channel.send('You do not have permission to run this command...\nRequired: [ADMINISTRATOR] Missing: [ADMINISTRATOR]')
            return
        }

        if (member.hasPermission('ADMINISTRATOR')) {
            channel.send(`${member} Set welcome message to: "${content}" in the channel "${channel}".\n*Ignore the command in the message, it's a weird bug that I gotta figure out*`)
            return
        }

        let text = content

        const split = text.split(' ')

        if (split.length < 2) {
            channel.send('Please include a welcome message')
            return
        }

        split.shift()
        text = split.join(' ')

        await mongo().then(async (mongoose) => {
            try {
                await welcomeSchema.findOneAndUpdate({
                    _id: guild.id
                }, {
                    _id: guild.id,
                    channelId: channel.id,
                    text,
                }, {
                   upsert: true, 
                }){
                }
            } finally {
                mongoose.connection.close()
            }
        })
    })
}