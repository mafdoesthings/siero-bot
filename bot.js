require('dotenv').config()

const { AkairoClient, CommandHandler, ListenerHandler } = require('discord-akairo')

class SieroClient extends AkairoClient {
    constructor() {
        super({
            ownerID: process.env.OWNER_ID,
            allowMention: true,
            handleEdits: true,
            partials: ['MESSAGE']
        }, {
            disableEveryone: true
        })

        // Set up command handler
        this.commandHandler = new CommandHandler(this, {
            directory: './commands/',
            prefix: '$'
        })

        this.commandHandler.loadAll()
    }
}

const client = new SieroClient()
client.login(process.env.DISCORD_SECRET)
