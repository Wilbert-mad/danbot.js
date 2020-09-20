module.exports = {
  // Non support for sharding client
  HostClient: require('./client/ClientHost'),
  Host: require('./client/ClientHost'),
  
  // Utils used by package
  Utils: require('./utils/Utils'),

  // version of module
  Version: require('../package.json').version,
};
