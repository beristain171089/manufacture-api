const koaRouter = require("koa-router");
const koaBody = require("koa-body");
const router = new koaRouter({ prefix: "/web" });
const db = require("../../database/web");

router.get("/jugador/get", koaBody(), async function (context) {
    try {

        context.body = await db.getDatetime();

    } catch (error) {
        context.body = { error: true, message: error.message };
    };
});

/*router.post("/country", koaBody(), async function (context) {
    try {
        var body = context.request.body;
        var header = context.request.body;
        console.log(context);

        //context.body = await db.getCountry();

    } catch (error) {
        context.body = { error: true, message: error.message };
    };
});*/

module.exports = { router };    