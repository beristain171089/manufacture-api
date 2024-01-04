const config = require("../../../config");
const sql = require('mssql');

async function getworkshop(activos, workshopId = 0, workshop = null) {
    var activos
    let query = "exec sp_web_workshops_get @activated='" + activos + "', @workshopId='" + workshopId + "'";
    if(workshop !=  null && workshop.trim() != '' ){
        query += ", @workshop= '" + workshop + "'";
    }
    query +=  ";";
    try {
        const connection = await new sql.ConnectionPool(config).connect();
        const workshops = await connection
            .request()
            .query(query)
            .then((dbData) => {
                return { error: false, data: dbData.recordset };
            })
            .catch(function(err) {
                console.error(err && err.message, err && err.stack);
                return { error: true, message: "NO FUE POSIBLE OBTENER EL REGISTRO - " };
                //guardar el valor dfe err en el registro de log 
            });

        connection.close();

        return workshops;

    } catch (error) {
        return { error: true, message: error.message };
    };
};

async function addworkshop(workshop) {
    let query = await "exec sp_web_workshops_add @workshop='" + workshop + "';";
    try {
        const connection = await new sql.ConnectionPool(config).connect();
        const workshop = await connection
            .request()
            .query(query)
            .then((dbData) => {
                if (dbData.recordset.length > 0) {
                    return { error: false, data: dbData.recordset };
                } else {
                    return { error: true, message: "NO FUE POSIBLE GUARDAR EL REGISTRO" };
                }
            });

        connection.close();

        return workshop;

    } catch (error) {
        return { error: true, message: error.message };
    };
};

async function updateworkshop(id, workshop, status) {
    let query = await "exec sp_web_workshops_update @id = '" + id + "', @workshop='" + workshop + "', @status='" + status + "';";
    try {
        const connection = await new sql.ConnectionPool(config).connect();
        const workshop = await connection
            .request()
            .query(query)
            .then((dbData) => {
                if (dbData.recordset.length > 0) {
                    return { error: false, data: dbData.recordset };
                } else {
                    return { error: true, message: "NO FUE POSIBLE ACTUALIZAR EL REGISTRO" };
                }
            });

        connection.close();

        return workshop;

    } catch (error) {
        return { error: true, message: error.message };
    };
};

module.exports = {
    getWorkshop,
    addWorkshop,
    updateWorkshop
};