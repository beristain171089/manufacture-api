const koaRouter = require("koa-router");
const koaBody = require("koa-body");
const router = new koaRouter({ prefix: "/app" });

//Revisa conexion efectiva
router.get("/connection", koaBody(), async function (context) {
    try {
        context.body = { connection: true, message: 'OK' }
    } catch (error) {
        context.body = { connection: false, message: error.message }
    }
});

module.exports = { router };