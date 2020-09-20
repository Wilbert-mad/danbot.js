const Base = require('./base');

class ShardingHost extends Base {

  /**
   * @param {import('discord.js').ShardingManager} Manager Manager class
   * @param {string} key Api key
   * @param {shardingOptions} options Manager host options
   */
  constructor(Manager, key, options = {}) {
    super(Manager, key, options);

    // Check for Manager
    if (!this.Bot) throw new Error('Discord Manager not found');
    if (!(this.Bot instanceof require('discord.js').ShardingManager))
      throw new TypeError('Instanceof Manager not found');

    // Check for key and type
    if (!this.key || typeof this.key !== 'string') throw new Error('KEY_INVALID');

    // If key is formated wrong it will reformat
    if (!this.key.startsWith('danbot-')) this.key = `danbot-${this.key}`;

    // Check typeof options
    if (typeof options !== 'object') throw new Error('Parameter "options" is not Object type');

    // set variables
    this.manager = this.Bot;
    this.options = options;

    const currentShard = (id) => this.manager.shards.get(id);

    if (this.options.autoPostStart) {
  
      this.Bot.on('shardCreate', (shard) => {
        if (shard.id + 1 == this.manager.totalShards) {
          currentShard(shard.id).once('ready', () => {
            setTimeout(() => {
              this.emit('autoPosting');
              setInterval(async () => {
                await this.post();
              }, 60000);
            }, 400);
          });
        }
      });

    }
  }

  autoPost(Time = 60000) {
    const post = new Promise((resolve, reject) => {
      try {
        if (Time < 60000) throw new Error('Time must be above or 60000');
        if (typeof Time !== 'number') throw new Error('Invalid input "Time" as number');
        if (this.options.autoPostStart) throw new Error('Method could not be used, "autoPostStart" is enabled');
        this.emit('autoPosting');
        this.post();

        setInterval(async() => {
          await this.post();
        }, Time);
        resolve();
      } catch (error) {
        this.emit('error', (error));
        reject(error);
      }
    });
    return post;
  }
}

module.exports = ShardingHost;