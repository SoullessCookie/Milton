const addReactions = (message, reactions) => {
    message.react(reactions[0])
    reactions.shift()
    if (reactions.length > 0) {
        setTimeout(() => addReactions(message, reactions), 750)
    }
}

module.exports = async (client, id, text, reactions = []) => {
    const channel = await client.channel.fetch(id)

    channel.messages.fetch().then((messages) => {
        if (messages.size === 0) {
            // If no message exists, send a new one
            channel.send(text).then((message) => {
                addReactions(message, reactions)
            })
        } else {
            // If a message exists, edit it
            for (const message of messages) {
                message[1].edit(text)
                addReactions(message[1], reactions)
            }
        }
    })
}