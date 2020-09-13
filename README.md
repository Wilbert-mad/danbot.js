# danbot.js

A wrap for Dan Bot-Hosting.

* Discord: https://discord.gg/rYzHH5N
* Site: https://panel.danbot.host

# How to get API Key

* Join our Discord (link above)
* Go into our #bot-commands channel
* Type DBH!ApiKey and you'll get an API Key!

# Examples

```js
const Discod = require('discord.js');
const danbotjs = require('danbot.js');
const client = new Discod.Client();

client.login('Token');

const Host = new danbotjs.Host(client, 'key');

client.on('ready', async () => {
  console.log('ready');
  
  const res = await host.info();
  await host.post();
  console.log(res);
});
```