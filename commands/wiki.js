const { Command } = require('discord-akairo')
const { RichEmbed } = require('discord.js')
const DomParser = require('dom-parser')
const fetch = require("node-fetch")

class WikiCommand extends Command {
    constructor() {
        super('wiki', {
            aliases: ['wiki', 'w'],
            args: [
                {
                    id: 'object',
                    type: 'string'
                },
                {
                    id: 'entry',
                    type: 'string'
                },
                {
                    id: 'section',
                    type: 'string'
                }
            ]
        })
    }

    exec(message, args) {
        const url = new URL('https://gbf.wiki/Shiva')
        fetch(url)
            .then((response) => {
                return response.text()
            })
            .then((html) => {
                var parser = new DomParser()

                var dom = parser.parseFromString(html, "text/html")
                var content = dom.getElementById('mw-content-text')

                console.log(content.innerHTML)
            })
            .catch(function(error) {
                console.log(error)
            })

    }
}

module.exports = WikiCommand