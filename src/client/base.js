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
   * Post bot stats
   * @returns {Promise<void>}  
   */
  async post() {
    let guildCount = 0;
    let userCount = 0;
    
    guildCount = Utils.getGuilds(this).size;
    userCount = Utils.getUsers(this).size;

    const userID = (await Utils.getUserID(this)); 
    const clientUser = (await Utils.getUser(this));

    const dataBody = {
      id: userID,
      key: this.key,
      servers: guildCount.toString(),
      users: userCount.toString(),
      clientInfo: clientUser,
    };

    const res = await Utils.request('post', `bot/${userID}/stats`, dataBody);

    console.log(res);

    const post = new Promise((resolve, reject) => {
      try {
        // server error
        if (res.status >= 500)
          throw new Error(`DanBot Hosting server error, statusCode: ${res.status}`);

        // json body
        const data = res.body;

        if (res.status === 200) {
          // good
          if (!data.error) {
            if (data === undefined) 
              throw new Error('Data not found');
            this.emit('post');
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
        this.emit('error', (error));
        reject(error);
      }
    });
    return post;
  }

  /**
   * @returns {Promise<ClientInfo>}  
   */
  async info() {
    const res = await Utils.request('get', `bot/${(await Utils.getUserID(this))}/info`);

    const data = await res.body;

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
        this.emit('error', (error));
        reject(error);
      }
    });
    return get;
  }
}

module.exports = Base;