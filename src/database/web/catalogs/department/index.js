const config = require("../../../config");
const sql = require('mssql');

async function getdeparment(activos, deparmentId = 0, deparment = null) {
    var activos
    let query = "exec sp_web_deparments_get @activated='" + activos + "', @deparmentId='" + deparmentId + "'";
    if(deparment !=  null && deparment.trim() != '' ){
        query += ", @deparment= '" + deparment + "'";
    }
    query +=  ";";
    try {
        const connection = await new sql.ConnectionPool(config).connect();
        const deparments = await connection
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

        return deparments;

    } catch (error) {
        return { error: true, message: error.message };
    };
};

async function adddeparment(deparment) {
    let query = await "exec sp_web_deparments_add @deparment='" + deparment + "';";
    try {
        const connection = await new sql.ConnectionPool(config).connect();
        const deparment = await connection
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

        return deparment;

    } catch (error) {
        return { error: true, message: error.message };
    };
};

async function updatedeparment(id, deparment, status) {
    let query = await "exec sp_web_deparments_update @id = '" + id + "', @deparment='" + deparment + "', @status='" + status + "';";
    try {
        const connection = await new sql.ConnectionPool(config).connect();
        const deparment = await connection
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

        return deparment;

    } catch (error) {
        return { error: true, message: error.message };
    };
};

module.exports = {
    getDeparment,
    addDeparment,
    updateDeparment
};