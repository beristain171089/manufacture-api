let config;

if (process.env.NODE_ENV === "production") {
  config = {
    server: "192.168.1.81",
    port: 1433,
    database: "manufacture", 
    user: "sa",
    password: "1234",
    encrypt: true,
    connectionTimeout: 300000,
    requestTimeout: 300000
  };
} else {
  config = {
    server: "192.168.1.81",
    port: 1433,
    database: "manufacture", 
    user: "sa",
    password: "1234",
    encrypt: true,
    connectionTimeout: 300000,
    requestTimeout: 300000
  };
};

module.exports = config;