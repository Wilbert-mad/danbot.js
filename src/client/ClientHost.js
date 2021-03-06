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
    if (!this.Bot || !(this.Bot instanceof require('discord.js').Client)) 
      throw new Error('Instanceof Client not found');
    
    // Check for key and type
    if (!this.key || typeof this.key !== 'string') throw new Error('KEY_INVALID');

    // If key is formated wrong it will reformat
    if (!this.key.startsWith('danbot-')) this.key = `danbot-${this.key}`;

    /**
     * whether you are auto posting
     * @type {boolean}
     * @public
     */
    this.posting = false;
  }

  /**
   * @returns {Promise<void>}
   */
  async autoPost(Time = 60000) { 
    const post = new Promise((resolve, reject) => {
      try {
        if (Time < 60000) throw new Error('Time must be above or 60000');
        if (typeof Time !== 'number') throw new Error('Invalid input "Time" as number');
        this.emit('autoPosting');
        this.posting = true;
        this.post();

        setInterval(async() => {
          if (this.posting) {
            await this.post();
          } else {
            return;
          }
        }, Time);

        resolve();
      } catch (error) {
        this.emit('error', (error));
        reject(error);
      }
    });
    return post;
  }

  /**
   * @returns {Promise<void>}
   */
  autoStop() {
    const stop = new Promise((resolve, reject) => {
      try {
        this.emit('stop');
        this.posting = false;
        resolve();
      } catch (error) {
        this.emit('error', (error));
        reject(error);
      }
    });
    return stop; 
  }
}

module.exports = ClientHost;