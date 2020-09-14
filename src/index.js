module.exports = {
  HostClient: require('./client/ClientHost'),
  Host: require('./client/ClientHost'),

  Utils: require('./utils/Utils'),

  Version: require('../package.json').version,
};
