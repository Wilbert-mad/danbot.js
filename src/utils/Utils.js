const https = require('https');
const qs = require('querystring');

class Utils {
  constructor() {
    throw new Error(`The ${this.constructor.name} class may not be instantiated.`);
  }

  /**
   * send request to host
   * @param {string} method request type
   * @param {string} endpoint request path
   * @param {object} data options for request
   * @returns {Promise<void>}
   */
  static async request(method, endpoint, data) {
    if (typeof method !== 'string') throw new Error('type is a string');
    if (typeof endpoint !== 'string') throw new Error('endpoint is a string');

    // method types
    const types = ['get', 'post', 'put', 'patch', 'delete'];

    // check type
    if (!types.includes(method)) 
      throw new Error('Type not found in method types');

    return new Promise((resolve, reject) => {
      const response = {
        raw: '',
        body: null,
        status: null,
        headers: null,
      };

      const options = {
        hostname: 'danbot.host',
        path: `/api/${endpoint}`,
        method,
        headers: {},
      };

      if (data && method === 'post') options.headers['content-type'] = 'application/json';
      if (data && method === 'get') options.path += `?${qs.encode(data)}`;

      const request = https.request(options, (res) => {
        response.status = res.statusCode;
        response.headers = res.headers;
        response.ok = res.statusCode >= 200 && res.statusCode < 300;
        response.statusText = res.statusMessage;
        res.on('data', (chunk) => {
          response.raw += chunk;
        });

        res.on('end', () => {
          response.body = res.headers['content-type'].includes('application/json') ? JSON.parse(response.raw) : response.raw;
          if (response.ok) {
            resolve(response);
          } else {
            const error = new Error(`${res.statusCode} ${res.statusMessage}`);
            Object.assign(error, response);
            reject(error);
          }
        });
      });

      request.on('error', (error) => {
        reject(error);
      });

      if (data && method === 'post') request.write(JSON.stringify(data));
      request.end();
    });
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
