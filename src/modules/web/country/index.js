const koaRouter = require("koa-router");
const koaBody = require("koa-body");
const utils = require("../../../utils");
const router = new koaRouter({ prefix: "/web" });
const db = require("../../../database/web/catalogs/country");

router.get("/country", koaBody(), async function (context) {
    try {
        const active = context.params.active || '';
        const queryParams = context.request.query;
        const activated = utils.boolParseFunc(queryParams.activated);
        const idCountry =  parseInt(queryParams.idCountry) || 0;
        const country =  utils.IsNullOrEmpty(queryParams.country)? queryParams.country : null;
        context.body = await db.getCountry(activated, idCountry, country);

    } catch (error) {
        context.body = { error: true, message: error.message };
    };
});

router.post("/country", koaBody(), async function (context) {
    try {
        
        if(context.request.body == undefined || 
            context.request.body == null || 
            context.request.body.country == undefined || 
            context.request.body.country == null){
                context.status = 400;
                return context.body = { error: true, message: "Ya existe registro" };
        }
        var country = context.request.body.country.trim();
        var header = context.request.header;
        var active = false;
        var countryId = 0;
        var resp = await db.getCountry(active, countryId, country);
        if(resp.data.length > 0)
        {
            context.status = 409;
            return context.body = { error: true, message: "Ya existe registro" };
        }

        context.body = await db.addCountry(country);

    } catch (error) {
        context.body = { error: true, message: error.message };
    };
});

router.put("/country/:id", koaBody(), async function (context) {
    try {
        var countryId = parseInt(context.params.id);
        if(context.request.body == undefined || 
            context.request.body == null || 
            context.request.body.country == undefined || 
            context.request.body.country == null ||
            isNaN(countryId) && context.params.id  !== '' + countryId
            ){
                context.status = 400;
                return context.body = { error: true, message: "Parámetros incorrectros" };
        }
        var country = context.request.body.country.trim();
        var status = context.request.body.status;
        var header = context.request.header;

        context.body = await db.updateCountry(countryId, country, status);

    } catch (error) {
        context.body = { error: true, message: error.message };
    };
});

module.exports = { router };    