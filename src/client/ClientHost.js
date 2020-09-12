const Base = require('./Base.js');

/**
 * Non sharding client
 * @extends {Base}
 */
class ClientHost extends Base {

  /**
   * @param {import('discord.js').Client} client Client class
   * @param {string} key Api key
   */
  constructor(client, key) {
    super(client, key);

    // Check for client
    if (!this.clientOrManager) throw new Error('Client class not found');
    
    // Check for key and type
    if (!key || typeof key !== 'string') throw new Error('KEY_INVALID');

    // If key is formated wrong it will reformat
    if (!key.startsWith('danbot-')) key = `danbot-${key}`;

    console.log(key);
  }
}

module.exports = ClientHost;