const index = require("./default");
const app = require("./app");
const web = require("./web");

module.exports = {
    modules: [
        index.routes(),
        app.router.routes(),
        web.router.routes()
    ],
};