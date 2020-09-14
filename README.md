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

# Docs

## Events

 - post
    ```js
    host.on('post', () => {
      // do something
    });
    ```
 - autoPosting
    ```js
    host.on('autoPosting', () => {
      // do something
    });
    ```
 - error
   ```js
    host.on('error', (error) => {
      // do something
    });
    ```
## Classes

  - **Host** extends Base
    ```js
      new danbotjs.Host(client, 'key')
    ```
      * autoPost(Time)
          - Time?: Number, optional
          `Amount of time betwen each post !must be 60000 or above!`,
          returns: Promise<void>
      ```js
        host.autoPost(80000);
      ```

  - **Base** extends EventEmitter
    ```js
      new danbotjs.Host(client, 'key')
    ```
      * post()
          - returns: Promise<void>
       ```js
        host.post();
       ```
      * info()
        - returns: Promise<[ServerInfo](#ServerInfo)>
      ```js
        host.info();
      ```

# Types 

## ServerInfo
- Type: Object,

  property: 

      - id: Snowflake

      - servers: string

      - users: string

      - owner: string

      - deleted: boolean

      - added: number

      - client: ClientUser


## methods
- 'get', 'post', 'put', 'patch', 'delete'
