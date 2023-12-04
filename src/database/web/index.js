const config = require("../config");
const sql = require('mssql');

async function getDatetime() {
    try {

        const connection = await new sql.ConnectionPool(config).connect();
        const datetime = await connection
            .request()
            .query('SELECT GETDATE()')
            .then((dbData) => {
                if (dbData.recordset.length > 0) {
                    return { Datetiem: dbData.recordset };
                } else {
                    return { error: true, message: "NO SE ENCONTRARON VIVIENDAS" };
                }
            });

        connection.close();

        return datetime;

    } catch (error) {
        return { error: true, message: error.message };
    };
};

module.exports = {
    getDatetime
};