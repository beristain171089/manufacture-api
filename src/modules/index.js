const index = require("./default");
const app = require("./app");
const web = require("./web");
const country = require("./web/catalogs/country");
const area = require("./web/catalogs/area");
const auth = require("../auth");

module.exports = {
    modules: [
        index.routes(),
        app.router.routes(),
        web.router.routes(),
        country.router.routes(),
        area.router.routes(),
        auth.routes()
    ],
};