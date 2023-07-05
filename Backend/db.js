let mongoose = require('mongoose');
var conn = Date.now();
var cachedDb;

let url = 'mongodb+srv://karunakapildev485:JH2IJ1PkuHG7HIh6@cluster0.oufmpnx.mongodb.net/IppoPay?retryWrites=true&w=majority';

class Database {
  constructor() {
    this._connect();
  }

  async _connect() {
    mongoose.connection.on('error', (err) => {
      console.error('=> error connection', err);
    });
    if (cachedDb && cachedDb.serverConfig.isConnected()) {
      console.log('=> using cached database instance');
      return cachedDb;
    }
    const db = await mongoose.connect(url, { useNewUrlParser: true });
    console.log('=> using new connection');
    cachedDb = db;
    return db;
  }
}

module.exports = new Database();
