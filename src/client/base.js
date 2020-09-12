const EventEmitter = require('events');

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
     * @private 
     */
    this._V12 = (require('discord.js').version.split('.')[0] === '12' ? 'v12' : 'v11') === 'v12';
  }
}

module.exports = Base;