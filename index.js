const Discord = require('discord.js')
const client = new Discord.Client()
// const config = require('./config.json')

client.on('ready', () =>{
    console.log('Milton is ready to go!')
})

client.login(process.env.BOT_TOKEN)