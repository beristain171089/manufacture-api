const http = require("http");
const koa = require("koa");
const app = new koa();
const cors = require("koa2-cors");
const variables = require("./src/config/variables");
require("./src/modules/web/index");
require("./src/modules/default");

app.use(cors({
    origin: () => {

        if (process.env.NODE_ENV !== "production") {
            return "*";
        };

        return "*";

    },
}));

// Autentificación del peticiones al API
app.use(async (context, next) => {

    const { getDecode } = require("./src/auth/token");

    function validateToken() {

        try {

            const path = context.path;

            if (path.indexOf("auth") > 0) {
                return true;
            };

            const token = context.headers.easy_sports_key;

            let auth = getDecode(token);

            if (auth) {

                if (auth === process.env.IDAPP) {
                    return true;
                } else {
                    return false;
                };
            };

            return false;

        } catch (error) {
            console.error(error.message);
            return false;
        };
    };

    if (validateToken()) {
        await next();
    } else {
        context.status = 403;
    };

    const responseTime = context.response.get("X-Response-Time");

    if (process.env.NODE_ENV !== "production") {
        console.log(`${context.method} ${context.url} - ${responseTime} - Response Status: ${context.status} 🔚`);
    };

});

/**
 * 	Calculo del Header "X-Response-Time"
 * 	Computar y asignar el Header "X-Response-Time" el calculo en 'ms' de peticiones
 */
app.use(async (context, next) => {
    const startTime = Date.now();
    await next();
    const ms = Date.now() - startTime;
    context.set("X-Response-Time", `${ms}ms`);
});

// Gestión de las rutas válidas de la aplicación
const { modules } = require("./src/modules");

modules.map(route => {
    app.use(route);
});

// 	Variables de entorno / 	HOST: String, PORT: Int
const HOST = process.env.HOST || "http://localhost";
const PORT = process.env.PORT || 8081;
const server = http.createServer(app.callback());

/**
 * 	Ejecución del servidor.
 * 	Activa el evento "Listener" este método es llamado cuando un evento ocurre.
 */
server.listen(PORT, () => {
    if (process.env.NODE_ENV !== "production") {
        console.log("Application in execution: 🔥", `${HOST}:${PORT}`);
    };
});

module.exports = {
    app,
};