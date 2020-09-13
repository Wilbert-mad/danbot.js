const EventEmitter = require('events');
const Utils = require('../utils/Utils');

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
     * @type {*}
     * @private 
     */
    this.Bot = Bot;

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
  }

  /**
   * @returns {Promise<void>}  
   */
  async post() {
    let guildCount = 0;
    let userCount = 0;
    
    guildCount = Utils.getGuilds(this).size;
    userCount = Utils.getUsers(this).size;

    const Body = {
      id: (await Utils.getUserID(this)),
      key: this.key,
      servers: guildCount.toString(),
      users: userCount.toString(),
      client: (await Utils.getUser(this)),
    };

    const res = await Utils.request('post', {
      path: `${this._BaseURL}/bot/${(await Utils.getUser(this))}/stats`,
      Body: JSON.stringify(Body),
    });

    const post = new Promise((resolve, reject) => {
      try {
        // server error
        if (res.status >= 500)
          throw new Error(`DanBot Hosting server error, statusCode: ${res.status}`);

        // json body
        const data = res.json();

        if (res.status === 200) {
          // good
          if (!data.error) {
            if (data === undefined) 
              throw new Error('Data not found');
            resolve();
          }
        } else if (res.status == 400) {
          // Bad request
          if (res.error)
            new Error(res.message);
        } else if (res.status == 429) {
          // Rate limit hit
          if (res.error)
            new Error(res.message);
        } else {
          // any other error
          throw new Error('An unknown error has occurred');
        }
      } catch (error) {
        reject(error);
      }
    });
    return post;
  }

  /**
   * @returns {Promise<ClientInfo>}  
   */
  async info() {
    const res = await Utils.request('get', {
      path: `${this._BaseURL}/bot/${(await Utils.getUser(this))}/info`,
    });

    const data = await res.json();

    const get = new Promise((resolve, reject) => {
      try {
        // server error
        if (res.status >= 500)
          throw new Error(`DanBot Hosting server error, statusCode: ${res.status}`);

        if (res.status === 200) {
          // good
          if (!data.error) {
            if (data === undefined) 
              throw new Error('Data not found');
            
            resolve(data);
          }
        } else if (res.status == 400) {
          // Bad request
          if (res.error)
            new Error(res.message);
        } else if (res.status == 429) {
          // Rate limit hit
          if (res.error)
            new Error(res.message);
        } else {
          // any other error
          throw new Error('An unknown error has occurred');
        }
        
      } catch (error) {
        reject(error);
      }
    });
    return get;
  }
}

module.exports = Base;