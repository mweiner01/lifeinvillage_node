const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

function createComment(data) {
    client.channels.fetch('772953775781969951').then(r => {

        let embed = new Discord.MessageEmbed();
        embed.setTitle(data["comment_from"] + " hat ein Kommentar geschrieben");
        embed.setColor("RED")
        embed.addField("Kommentar von:", "["+data["comment_from"]+"](http://localhost:3000/profiles/"+data["comment_from"]+")", true)
        embed.addField("Zum Beitrag:", "[Beitrag](http://localhost:3000/profiles/"+data["post_from"]+")", true)
        embed.addField("Content:", data["comment_content"], false)

        r.send(embed)
    });
}

function createAccount(data) {
    client.channels.fetch('772953775781969951').then(r => {

        let embed = new Discord.MessageEmbed();
        embed.setTitle(data["username"] + " hat sich bei **LIV** registriert");
        embed.addField("Willkommen", "Wir heißen dich bei Life in Village 7 rechtherzlich willkommen")
        embed.setColor("BLUE")

        r.send(embed)
    });
}

client.login('NzM4MDYzNjEzMjIyMzIyMTk4.XyGdTQ.D7-UhWIZAqB4C6vwLJO-ZAB4gLY');

module.exports = {
    createComment: function (data) {
        createComment(data)
    },
    createAccount: function (data) {
        createAccount(data)
    }
};
