module.exports = {
    name: "salut",
    aliases: ["sal"],
    description: "nothing",
    run: async (client, message, args) => {
        message.channel.send('SALUT');
    }
}