module.exports = client => {
    const channelId = '829702923717050429'

    const updateMembers = guild => {
        const channel = guild.channels.cache.get(channelId)
        channel.setName(`Member Count: ${guild.memberCount.toLocaleString()}`)
    }

    client.on('guildMemberAdd', member => updateMembers(member.guild))
    client.on('guildMemberRemove', member => updateMembers(member.guild))

    const guild = client.guilds.cache.get('732282327463493794')
    updateMembers(guild)
}