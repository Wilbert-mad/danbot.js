const EventEmitter = require('events');
const fetch = require('node-fetch');

/**
 * The base class for all
 * @extends {EventEmitter}
 */
class Base extends EventEmitter {
  constructor(Bot, ApiKey) {
    super(Bot, ApiKey);

    /**
     * Api base url
     * @type {string}
     * @readonly
     * @private 
     */
    this._BaseURL = 'https://danbot.host/api';

    /**
     * User Api key
     * @type {string}
     * @public
     */
    this.key = ApiKey;

    /**
     * Version of discord
     * @type {boolean}
     * @static
     * @private 
     */
    this._V12 = (require('discord.js').version.split('.')[0] === '12' ? 'v12' : 'v11') === 'v12';

    /**
     * Client or manager class
     * @type {import('discord.js').Client | import('discord.js').ShardingManager}
     * @private
     */
    this._clientOrManager = Bot;
  }

  async post() {
    let guildCount = 0;
    let userCount = 0;

    guildCount = this._V12 ? this.clientOrManager.guilds.catch.size : this.clientOrManager.guilds.size;
    userCount = this._V12 ? this.clientOrManager.users.catch.size : this.clientOrManager.users.size;

    const Body = {
      id: this.clientOrManager.user.id,
      guilds: guildCount.toString(),
      users: userCount.toString(),
      clientUser: this.clientOrManager.user,
    };

    const res = await fetch(`${this._BaseURL}/bot/${this.clientOrManager.user.id}/stats`, {
      method: 'post',
      body: JSON.stringify(Body),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    await new Promise((resolve, reject) => {
      try {
        // server error
        if (res.status >= 500)
          throw new Error(`DanBot Hosting server error, statusCode: ${res.status}`);

        // json body
        const data = res.json();

        if (res.status === 200) {
          if (!data.error) {
            resolve();
          }
        } else {
          // any other error
          throw new Error('An unknown error has occurred');
        }
      } catch (error) {
        reject(error);
      }
    });
  }
}

module.exports = Base;