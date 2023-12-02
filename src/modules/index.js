const index = require("./default");
const app = require("./app");

module.exports = {
    modules: [
        index.routes(),
        app.router.routes()
    ],
};