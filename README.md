# danbot.js

A wrap for Dan Bot-Hosting.

* Discord: https://discord.gg/py4Nf4m
* Site: https://panel.danbot.host

# Install

Node.js 12.0.0 or newer is required.
As that is what discord.js requires.

NOTE: `Discord is require to run module.`

```
npm install danbot.js
```

# How to get API Key

* Join our Discord ([link](https://discord.gg/py4Nf4m))
* Go into our [#bot-commands](https://discordapp.com/channels/639477525927690240/738532075476615288) channel
* Type DBH!ApiKey and you'll get an API Key!

# Examples

```js
const Discod = require('discord.js');
const danbotjs = require('danbot.js');
const client = new Discod.Client();

client.login('Token');

const host = new danbotjs.Host(client, 'key');

client.on('ready', async () => {
  console.log('ready');
  
  const res = await host.info();
  await host.post();
  console.log(res);
});

host.on('post', () => {
  console.log('I have Posted');
});
```