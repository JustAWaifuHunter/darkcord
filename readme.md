![Library logo](https://cdn.discordapp.com/attachments/846411409293967450/864228830053662730/110_Sem_Titulo_20210712163602.png)

## Example
```js
const DarkCord = require('darkcord.js')

const client = DarkCord({
    intents: [INTENTS], // Ex. DarkCord.Intents.GUILD_MESSAGES
    token: 'Bot Token'
}) // => Client

client.on('message', (message) => {
    if (message.content === '!ping') {
        return message.channel.send('pong!')
    }
})

(async () => {
    await client.login() // => Promise<Client>
})()
```
