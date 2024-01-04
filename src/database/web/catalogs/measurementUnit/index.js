const config = require("../../../config");
const sql = require('mssql');

async function getmeasurementUnit(activos, measurementUnitId = 0, measurementUnit = null) {
    var activos
    let query = "exec sp_web_measurement_units_get @activated='" + activos + "', @measurementUnitId='" + measurementUnitId + "'";
    if(measurementUnit !=  null && measurementUnit.trim() != '' ){
        query += ", @measurementUnit= '" + measurementUnit + "'";
    }
    query +=  ";";
    try {
        const connection = await new sql.ConnectionPool(config).connect();
        const measurement_units = await connection
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

        return measurement_units;

    } catch (error) {
        return { error: true, message: error.message };
    };
};

async function addmeasurementUnit(measurementUnit) {
    let query = await "exec sp_web_measurement_units_add @measurementUnit='" + measurementUnit + "';";
    try {
        const connection = await new sql.ConnectionPool(config).connect();
        const measurementUnit = await connection
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

        return measurementUnit;

    } catch (error) {
        return { error: true, message: error.message };
    };
};

async function updatemeasurementUnit(id, measurementUnit, status) {
    let query = await "exec sp_web_measurement_units_update @id = '" + id + "', @measurementUnit='" + measurementUnit + "', @status='" + status + "';";
    try {
        const connection = await new sql.ConnectionPool(config).connect();
        const measurementUnit = await connection
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

        return measurementUnit;

    } catch (error) {
        return { error: true, message: error.message };
    };
};

module.exports = {
    getMeasurementUnit,
    addMeasurementUnit,
    updateMeasurementUnit
};