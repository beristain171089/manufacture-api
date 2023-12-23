let config;

if (process.env.NODE_ENV === "production") {
  config = {
    server: "192.168.1.82",
    port: 1433,
    database: "manufacture", 
    user: "sa",
    password: "R00T.root",
    encrypt: true,
    connectionTimeout: 300000,
    requestTimeout: 300000
  };
} else {
  config = {
    server: "192.168.1.82",
    port: 1433,
    database: "manufacture", 
    user: "sa",
    password: "R00T.root",
    encrypt: true,
    connectionTimeout: 300000,
    requestTimeout: 300000
  };
};

module.exports = config;