const Auth = require('./Auth');
const danbotjs = require('../src');
const { Client } = require('discord.js');
const client = new Client();

client.login(Auth.token);
const host = new danbotjs.Host(client, Auth.key);

client.on('ready', async () => {
  console.log('ready');
  console.log(await danbotjs.Utils.getUserID(host));
  host.post().catch(console.log);
  // console.log(await host.info());
  // await host.autoPost(10).catch(() => {});
});

host.on('post', () => console.log('I have posted'));
host.on('autoPosting', () => console.log('I started autoPosting'));
host.on('error', (error) => console.log(error));
