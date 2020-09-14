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
          - Time?: [number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number), optional

          `Amount of time betwen each post !must be 60000 or above!`,

          returns: Promise<[void](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined)>
      ```js
        host.autoPost(80000);
      ```

  - **Base** extends EventEmitter
    ```js
      new danbotjs.Host(client, 'key')
    ```
      * post()
          - returns: Promise<[void](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined)>
       ```js
        host.post();
       ```
      * info()
        - returns: Promise<[ServerInfo](#ServerInfo)>
      ```js
        host.info();
      ```

      * key
        - returns: [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)
        ```css
        - This should be kept private at all times.
        ```
      ```js
        host.key;
      ```

# Types 

## ServerInfo
- Type: Object,

  property: 

      - id: [Snowflake](https://discord.js.org/#/docs/main/stable/typedef/Snowflake)

      - servers: [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)

      - users: [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)

      - owner: [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)

      - deleted: [boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)

      - added: [number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)

      - client: [ClientUser](https://discord.js.org/#/docs/main/stable/class/ClientUser)


## methods
- 'get', 'post', 'put', 'patch', 'delete'
