const fetch = require('node-fetch');

class Utils {
  constructor() {
    throw new Error(`The ${this.constructor.name} class may not be instantiated.`);
  }

  /**
   * send request to host
   * @param {string} type request type
   * @param {object} ops options for request
   * @param {string} ops.path request path
   * @param {string | Blob | Buffer} [ops.Body] request path
   * @returns {Promise<void>}
   */
  static async request(type, ops) {
    if (typeof type !== 'string') throw new Error('type is a string');
    if (typeof ops !== 'object') throw new Error('ops is a object');
    if (typeof ops.path !== 'string') throw new Error('Path is a string');

    // method types
    const types = ['get', 'post', 'put', 'patch', 'delete'];

    // check type
    if (!types.includes(type)) 
      throw new Error('Type not fount in method types');

    if (ops.Body) {
      return fetch(ops.path, {
        method: type,
        body: ops.Body,
        headers: { 'Content-Type': 'application/json' },
      });
    } else {
      return fetch(ops.path, {
        method: type,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  }

  /**
   * Get sharding guild
   * @param {*} data 
   * @returns {number}
   */
  static shardingGetGuild(data) {
    return (data.Bot.shard.fetchClientValues(data._V12 ? 'guilds.cache.size' : 'guilds.size'))
      .reduce((prev, current) => prev + current, 0);
  }

  /**
   * Get sharding users
   * @param {*} data
   * @returns {number}
   */
  static shardingGetUsers(data) {
    return (data.Bot.shard.fetchClientValues(data._V12 ? 'users.cache.size' : 'users.size'))
      .reduce((prev, current) => prev + current, 0);
  }

  /**
   * @returns {*}
   */
  static getGuilds(data) {
    if (data.Bot.shard) {
      return this.shardingGetGuild(data);
    } else {
      if (data._V12) return data.Bot.guilds.cache;
      else return data.Bot.guilds;
    }
  }

  /**
   * @returns {*}
   */
  static getUsers(data) {
    if (data.Bot.shard) {
      return this.shardingGetUsers(data);
    } else {
      if (data._V12) return data.Bot.users.cache;
      else return data.Bot.users;
    }
  }

  /**
   * @returns {*}
   */
  static async getUser(data) {
    if (data.Bot.shard) {
      return (await data.Bot.broadcastEval('this.user'))[0];
    } else {
      return data.Bot.user;
    }
  }

  /**
   * @returns {*}
   */
  static async getUserID(data) {
    if (data.Bot.shard) {
      return (await data.Bot.broadcastEval('this.user.id'))[0];
    } else {
      return data.Bot.user.id;
    }
  }
}

module.exports = Utils;
