const Auth = require('./Auth');
const danbotjs = require('../src/index');
const { Client } = require('discord.js');
const client = new Client();

client.login(Auth.token);
const host = new danbotjs.Host(client, Auth.key);

client.on('ready', async () => {
  console.log('ready');
  
  const res = await host.info();
  await host.post().catch(console.log);
  console.log(danbotjs.Utils.getUserID(host));
  console.log(res);
});
