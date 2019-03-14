const { Command } = require('discord-akairo')
const { RichEmbed } = require('discord.js')
const DomParser = require('dom-parser')
const fetch = require("node-fetch")
const striptags = require("striptags")

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
        this.parser = new DomParser()

        const url = new URL('https://gbf.wiki/Shiva')
        fetch(url)
            .then((response) => {
                return response.text()
            })
            .then((html) => {
                console.log("Fetched URL!")
                var dom = this.parser.parseFromString(html, "text/html")
                var content = dom.getElementById('mw-content-text')

                this.getCharacterSkills(content)
            })
            .catch(function(error) {
                console.log(error)
            })

    }

    getCharacterSkills(html) {
        let tables = html.getElementsByClassName("character")

        let skillsWrapper = tables[2]
        let skillNames = skillsWrapper.getElementsByClassName("skill-name")
        let rawSkills = skillNames.map(function(item) {
            return item.parentNode
        })

        var skills = []

        for (var i in rawSkills) {
            var rawSkill = rawSkills[i]
            var skill = {}

            skill.name = rawSkill.getElementsByClassName("skill-name")[0].innerHTML.trim()
            skill.icon = rawSkill.getElementsByClassName("skill-icon")[0].childNodes[1].getAttribute("src")
            
            let strippedDescription = striptags(rawSkill.childNodes[11].innerHTML.trim(), ['br'])
            skill.description = striptags(strippedDescription, [], "\n")

            console.log(skill.name)
            console.log(skill.icon)
            console.log(skill.description)
            console.log("-----------------------------------------")
        }
    }
}

module.exports = WikiCommand