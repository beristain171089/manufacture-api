const koaBody = require('koa-body');

function Jugador(router) {

    router.get("/jugador/get", koaBody(), async function (context) {

        try {

            context.body = { connection: true, message: 'OK' }

        } catch (error) {
            context.body = { error: true, message: error.message };
        }
    });

};

module.exports = Jugador;