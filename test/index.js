const Auth = require('./Auth');
const danbotjs = require('../');
const { Client } = require('discord.js');
const client = new Client();

client.login(Auth.token);
const host = new danbotjs.Host(client, Auth.key);

client.on('ready', async () => {
  console.log('ready');
  console.log(await danbotjs.Utils.getUserID(host));
  console.log(await host.info());
  await host.autoPost().catch(console.log);
});

host.on('post', () => console.log('I have posted'));
host.on('autoPosting', () => console.log('I started autoPosting'));
host.on('error', (error) => console.log(error));
