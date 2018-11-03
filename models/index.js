const mongoose = require('mongoose');

mongoose.set('debug', true);
mongoose.Promise = Promise;

mongoose.connect(process.env.MONGOURL, {
  keepAlive: true,
  useNewUrlParser: true,
  useCreateIndex: true,
});

module.exports.User = require('./user');
module.exports.Wine = require('./wine');
