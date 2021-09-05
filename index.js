const { Client } = require("discord.js");
const { Intents } = require('discord.js');
const Discord = require('discord.js')
const config = require('./config.json');

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_BANS, Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS, Intents.FLAGS.GUILD_INTEGRATIONS, Intents.FLAGS.GUILD_WEBHOOKS, Intents.FLAGS.GUILD_INVITES, Intents.FLAGS.GUILD_VOICE_STATES, Intents.FLAGS.GUILD_PRESENCES, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS, Intents.FLAGS.GUILD_MESSAGE_TYPING, Intents.FLAGS.DIRECT_MESSAGES, Intents.FLAGS.DIRECT_MESSAGE_REACTIONS, Intents.FLAGS.DIRECT_MESSAGE_TYPING],
});


client
  .login(config.token)
  .then(() =>{
    console.log('Bot started');
    client.on('ready', () => {
      console.log("Connected as " + client.user.tag);

      client.user.setActivity("YouTube", {type: "WATCHING"})

    console.log("Servers:")
    client.guilds.cache.forEach((guild) => {
        // console.log(guild.available)
        console.log(guild.name)

        guild.channels.cache.forEach((channel) => {
            console.log(` - ${channel.name} (${channel.type}) ${channel.id}`)
        })
    });
    let generalChannel = client.channels.cache.get("855797657897664559")
    // const Attachment = new Discord.MessageAttachment("https://www.kindpng.com/picc/m/277-2770706_bot-logo-discord-hd-png-download.png")
    generalChannel.send(Attachment)
    // generalChannel.send("Hello, world!")
    });

    client.on('message', (receivedMessage) => {
       
        if (receivedMessage.author == client.user) {
            return
        }
    
        // receivedMessage.channel.send("Message received, " + receivedMessage.author.toString() +": " + receivedMessage.content)
        // receivedMessage.react("😉")

        if (receivedMessage.content.startsWith("!")) {
            processCommand(receivedMessage)
        }
    })
    function processCommand(receivedMessage) {
        let fullCommand = receivedMessage.content.substr(1) // Remove the leading exclamation mark
        let splitCommand = fullCommand.split(" ") // Split the message up in to pieces for each space
        let primaryCommand = splitCommand[0] // The first word directly after the exclamation is the command
        let arguments = splitCommand.slice(1) // All other words are arguments/parameters/options for the command
    
        console.log("Command received: " + primaryCommand)
        console.log("Arguments: " + arguments) // There may not be any arguments
    
        if (primaryCommand == "help") {
            helpCommand(arguments, receivedMessage)
        } else if (primaryCommand == "multiply") {
            multiplyCommand(arguments, receivedMessage)
        } else {
            receivedMessage.channel.send("I don't understand the command. Try `!help` or `!multiply`")
        }
    }
    
    function helpCommand(arguments, receivedMessage) {
        if (arguments.length == 0) {
            receivedMessage.channel.send("I'm not sure what you need help with. Try `!help [topic]`")
        } else {
            receivedMessage.channel.send("It looks like you might need help with " + arguments)
        }
    }
    
    function multiplyCommand(arguments, receivedMessage) {
        if (arguments.length < 2) {
            receivedMessage.channel.send("Not enough values to multiply. Try `!multiply 2 4 10` or `!multiply 5.2 7`")
            return
        }
        let product = 1 
        arguments.forEach((value) => {
            product = product * parseFloat(value)
        })
        receivedMessage.channel.send("The product of " + arguments + " multiplied together is: " + product.toString())
    }
    

})
  .catch((err) =>{
  console.error(err);
})
