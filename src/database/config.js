let config;

if (process.env.NODE_ENV === "production") {
  config = {
    server: "",
    port: 1433,
    database: "", 
    user: "",
    password: "",
    encrypt: true,
    connectionTimeout: 300000,
    requestTimeout: 300000
  };
} else {
  config = {
    server: "",
    port: 1433,
    database: "",
    user: "",
    password: "",
    encrypt: true,
    connectionTimeout: 300000,
    requestTimeout: 300000
  };
};

module.exports = config;