const koaRouter = require("koa-router");
const koaBody = require("koa-body");
const utils = require("../../../../utils");
const router = new koaRouter({ prefix: "/web" });
const db = require("../../../../database/web/catalogs/area");

router.get("/area", koaBody(), async function (context) {
    try {
        const active = context.params.active || '';
        const queryParams = context.request.query;
        const activated = utils.boolParseFunc(queryParams.activated);
        const idarea =  parseInt(queryParams.idarea) || 0;
        const area =  utils.IsNullOrEmpty(queryParams.area)? queryParams.area : null;
        context.body = await db.getArea(activated, idarea, area);

    } catch (error) {
        context.body = { error: true, message: error.message };
    };
});

router.post("/area", koaBody(), async function (context) {
    try {
        
        if(context.request.body == undefined || 
            context.request.body == null || 
            context.request.body.area == undefined || 
            context.request.body.area == null){
                context.status = 400;
                return context.body = { error: true, message: "Ya existe registro" };
        }
        var area = context.request.body.area.trim();
        var header = context.request.header;
        var active = false;
        var areaId = 0;
        var resp = await db.getArea(active, areaId, area);
        if(resp.data.length > 0)
        {
            context.status = 409;
            return context.body = { error: true, message: "Ya existe registro" };
        }

        context.body = await db.addArea(area);

    } catch (error) {
        context.body = { error: true, message: error.message };
    };
});

router.put("/area/:id", koaBody(), async function (context) {
    try {
        var areaId = parseInt(context.params.id);
        if(context.request.body == undefined || 
            context.request.body == null || 
            context.request.body.area == undefined || 
            context.request.body.area == null ||
            isNaN(areaId) && context.params.id  !== '' + areaId
            ){
                context.status = 400;
                return context.body = { error: true, message: "Parámetros incorrectros" };
        }
        var area = context.request.body.area.trim();
        var status = context.request.body.status;
        var header = context.request.header;

        context.body = await db.updateArea(areaId, area, status);

    } catch (error) {
        context.body = { error: true, message: error.message };
    };
});

module.exports = { router };    