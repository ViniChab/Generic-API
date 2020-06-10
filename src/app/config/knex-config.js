const knexConfig = {
  client: 'mysql',
  connection: {
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'generic-schema',
  },
};

module.exports = knexConfig;