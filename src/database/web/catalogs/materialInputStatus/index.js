const config = require("../../../config");
const sql = require('mssql');

async function getmaterialInputStatus(activos, materialInputStatusId = 0, materialInputStatus = null) {
    var activos
    let query = "exec sp_web_material_input_statuses_get @activated='" + activos + "', @materialInputStatusId='" + materialInputStatusId + "'";
    if(materialInputStatus !=  null && materialInputStatus.trim() != '' ){
        query += ", @materialInputStatus= '" + materialInputStatus + "'";
    }
    query +=  ";";
    try {
        const connection = await new sql.ConnectionPool(config).connect();
        const material_input_statuses = await connection
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

        return material_input_statuses;

    } catch (error) {
        return { error: true, message: error.message };
    };
};

async function addmaterialInputStatus(materialInputStatus) {
    let query = await "exec sp_web_material_input_statuses_add @materialInputStatus='" + materialInputStatus + "';";
    try {
        const connection = await new sql.ConnectionPool(config).connect();
        const materialInputStatus = await connection
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

        return materialInputStatus;

    } catch (error) {
        return { error: true, message: error.message };
    };
};

async function updatematerialInputStatus(id, materialInputStatus, status) {
    let query = await "exec sp_web_material_input_statuses_update @id = '" + id + "', @materialInputStatus='" + materialInputStatus + "', @status='" + status + "';";
    try {
        const connection = await new sql.ConnectionPool(config).connect();
        const materialInputStatus = await connection
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

        return materialInputStatus;

    } catch (error) {
        return { error: true, message: error.message };
    };
};

module.exports = {
    getMaterialInputStatus,
    addMaterialInputStatus,
    updateMaterialInputStatus
};