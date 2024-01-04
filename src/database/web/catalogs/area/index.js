const config = require("../../../config");
const sql = require('mssql');

async function getArea(activos, areaId = 0, area = null) {
    var activos
    let query = "exec sp_web_areas_get @activated='" + activos + "', @areaId='" + areaId + "'";
    if(area !=  null && area.trim() != '' ){
        query += ", @area= '" + area + "'";
    }
    query +=  ";";
    try {
        const connection = await new sql.ConnectionPool(config).connect();
        const countries = await connection
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

        return countries;

    } catch (error) {
        return { error: true, message: error.message };
    };
};

async function addArea(area) {
    let query = await "exec sp_web_areas_add @area='" + area + "';";
    try {
        const connection = await new sql.ConnectionPool(config).connect();
        const area = await connection
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

        return area;

    } catch (error) {
        return { error: true, message: error.message };
    };
};

async function updateArea(id, area, status) {
    let query = await "exec sp_web_areas_update @id = '" + id + "', @area='" + area + "', @status='" + status + "';";
    try {
        const connection = await new sql.ConnectionPool(config).connect();
        const area = await connection
            .request()
            .query(query)
            .then((dbData) => {
                if (dbData.recordset.length > 0) {
                    return { Datetiem: dbData.recordset };
                } else {
                    return { error: true, message: "NO FUE POSIBLE ACTUALIZAR EL REGISTRO" };
                }
            });

        connection.close();

        return area;

    } catch (error) {
        return { error: true, message: error.message };
    };
};

module.exports = {
    getArea,
    addArea,
    updateArea
};