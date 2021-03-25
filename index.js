const Discord = require('discord.js')
const client = new Discord.Client()

const config = require('./config.json')
const command = require('./command')
const privateMessage = require('./private-message')

client.on('ready', () =>{
    console.log('Milton is ready to go!')
    client.user.setActivity('Minecraft', { type: 'PLAYING' })

    // simple ping test (returns latency "ping")
    command(client, ['ping', 'test'], (message) => {
        message.channel.send(`Ping: ${Date.now() - message.createdTimestamp}ms`)
    })

    // lists all the servers it's in along with member count
    command(client, 'servers', (message) => {
        client.guilds.cache.forEach((guild) => {
            message.channel.send(
                `${guild.name} has a total of ${guild.memberCount} members`
            )
        })
    })

    // deletes all messages in a channel up to 14 days old(requires ADMINISTRATOR perms)
    command(client, ['clearchannel', ''], (message) => {
        if (message.member.hasPermission('ADMINISTRATOR')) {
            message.channel.messages.fetch().then((results) => {
                message.channel.bulkDelete(results)
            })
        }
    })

    // changes the bot status
    command(client, 'status', message => {
        const content = message.content.replace('!!status ', '')

        client.user.setPresence ({
            activity: {
                name: content,
                type: "PLAYING",
            },
        })
    })

    // sends private message with server invite to user of the (!!invite) command
    privateMessage(client, '!!invite', 'https://discord.gg/jbB37mQ')

    // specify user with id, then what you want to say
    client.users.fetch('419838467762028544').then(user => {
        user.send('Up and working')
    })

    // command to create a text channel with name and remove the command from name (name in first quotes)
    command(client, '', (message) => {
        const name = message.content.replace('', '')

        message.guild.channels.create(name, {
            type: 'text',
        }).then((channel) => {
            const categoryId = ''
            channel.setParent(categoryId)
        })
    })

    // command to create a voice channel with name and remove the command from name (name is first quotes)
    command(client, '', (message) => {
        const name = message.content.replace('', '')

        message.guild.channels.create(name, {
            type: 'voice',
        })
        .then((channel) => {
            // sets max users to 10
            channel.setUserLimit(10)
        })
    })

    // just an exanple embed template-ish
    command(client, 'embedexample', (message) => {
        const embed = new Discord.MessageEmbed()
            .setTitle('Example Title')
            .setURL('')
            .setAuthor(message.author.username)
            .setImage()
            .setThumbnail()
            .setFooter('')
            .setColor('#00AAFF')
            .addFields(
                {
                    name:'Field 1',
                    value: 'example field 1',
                    inline: true,
                },
                {
                    name:'Field 2',
                    value: 'example field 2',
                    inline: true,
                },
                {
                    name:'Field 3',
                    value: 'example field 3',
                    inline: true,
                },

            )

        message.channel.send(embed)
    })

    command(client, 'serverinfo', message => {
        const { guild } = message
        
        const { name, region, memberCount, afkTimeout, defaultMessageNotifications, 
            description, createdAt, verificationLevel, premiumSubscriptionCount, rulesChannel} = guild
        const icon = guild.iconURL()
        

        const embed = new Discord.MessageEmbed()
        .setTitle(`Server info for "${name}"`)
        .setThumbnail(icon)
        .setColor('#00AAFF')
        .addFields({
            name: 'Region',
            value: region,
        },{
            name: 'Members',
            value: memberCount,
        },{
            name: 'Owner',
            value: 'Error',
        },{
            name: 'Notifications',
            value: defaultMessageNotifications,
        },{
            name: 'Description',
            value: description,
        },{
            name: 'Created',
            value: createdAt,
        },{
            name: 'Verification Level',
            value: verificationLevel,
        },{
            name: 'Boosts',
            value: premiumSubscriptionCount,
        },{
            name: 'Rules Channel',
            value: rulesChannel,
        },{
            name: 'AFK TImeout',
            value: afkTimeout / 60 + ' minutes',
        },)

        message.channel.send(embed)
    })
})

client.login(config.token)
// for heroku: process.env.BOT_TOKEN 