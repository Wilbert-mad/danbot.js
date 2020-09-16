# danbot.js

A wrap for Dan Bot-Hosting.

* Discord: https://discord.gg/py4Nf4m
* Site: https://panel.danbot.host

# Install

Node.js 12.0.0 or newer is required.
As that is what discord.js requires.

**NOTE**: `"discord.js" is require to run module.`

```
npm install danbot.js
```

# How to get API Key

* Join our Discord ([link](https://discord.gg/py4Nf4m))
* Go into our [#bot-commands](https://discordapp.com/channels/639477525927690240/738532075476615288) channel
* Type DBH!ApiKey and you'll get an API Key!

# Examples

```js
// import modules
const Discod = require('discord.js');
const danbotjs = require('danbot.js');

// Create instanceof client
const client = new Discod.Client();

// Log in the Client
client.login('Token');
// NOTE: It is important to login to discord
// before creating instanceof host

// Create instanceof host
const host = new danbotjs.Host(client, 'key');

// Client "ready" event
client.on('ready', async () => {
  console.log('ready');
  
  // Await server bot info
  const res = await host.info();
  // post current bot info to server
  await host.post();
  // Log Server bot response
  console.log(res);
});
/*
 * NOTE: The events/methods arent limited to
 * the clients "ready" event!
 */
 
// Host event emited on .post()
host.on('post', () => {
  console.log('I have Posted');
});
```

Message Event Examples
```js
client.on('message', (msg) => {
  if (msg.content === 'post') {
    // Await server info
    host.post();
  }
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
      new danbotjs.Host(client, key)
    ```
    Paremeter: (client: [Client](https://discord.js.org/#/docs/main/stable/class/Client), key: [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String))


      * autoPost(Time)
          - Time?: [number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number), optional, 
          
          Default: `60000`

          `Amount of time betwen each post (In milliseconds) !must be 60000 or above!`,

          returns: Promise<[void](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined)>
      ```js
        host.autoPost(80000);
      ```

  - **Base** extends EventEmitter
  
  
    Paremeter: (Bot: [Client](https://discord.js.org/#/docs/main/stable/class/Client) or [ShardingManager](https://discord.js.org/#/docs/main/stable/class/ShardingManager), key: [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String))


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

      - id: Snowflake

      - servers: string

      - users: string

      - owner: string

      - deleted: boolean

      - added: number

      - client: ClientUser


## methods
- [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String): 'get', 'post', 'put', 'patch', 'delete'
