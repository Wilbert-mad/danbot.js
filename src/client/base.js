const EventEmitter = require('events');

class Base extends EventEmitter {

  /**
   * 
   * @param {*} Bot 
   * @param {string} ApiKey Hosting key
   */
  constructor(Bot, ApiKey) {
    super(Bot, ApiKey);

    /**
     * @private 
     */
    this._BaseURL = 'https://danbot.host/api';

    /**
     * @public
     */
    this.key = ApiKey;

    /**
     * @private 
     */
    this._V12 = (require('discord.js').version.split('.')[0] === '12' ? 'v12' : 'v11') === 'v12';
  }
}

module.exports = Base;