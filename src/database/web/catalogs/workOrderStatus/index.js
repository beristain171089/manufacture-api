const config = require("../../../config");
const sql = require('mssql');

async function getworkOrderStatus(activos, workOrderStatusId = 0, workOrderStatus = null) {
    var activos
    let query = "exec sp_web_work_order_statuses_get @activated='" + activos + "', @workOrderStatusId='" + workOrderStatusId + "'";
    if(workOrderStatus !=  null && workOrderStatus.trim() != '' ){
        query += ", @workOrderStatus= '" + workOrderStatus + "'";
    }
    query +=  ";";
    try {
        const connection = await new sql.ConnectionPool(config).connect();
        const work_order_statuses = await connection
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

        return work_order_statuses;

    } catch (error) {
        return { error: true, message: error.message };
    };
};

async function addworkOrderStatus(workOrderStatus) {
    let query = await "exec sp_web_work_order_statuses_add @workOrderStatus='" + workOrderStatus + "';";
    try {
        const connection = await new sql.ConnectionPool(config).connect();
        const workOrderStatus = await connection
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

        return workOrderStatus;

    } catch (error) {
        return { error: true, message: error.message };
    };
};

async function updateworkOrderStatus(id, workOrderStatus, status) {
    let query = await "exec sp_web_work_order_statuses_update @id = '" + id + "', @workOrderStatus='" + workOrderStatus + "', @status='" + status + "';";
    try {
        const connection = await new sql.ConnectionPool(config).connect();
        const workOrderStatus = await connection
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

        return workOrderStatus;

    } catch (error) {
        return { error: true, message: error.message };
    };
};

module.exports = {
    getWorkOrderStatus,
    addWorkOrderStatus,
    updateWorkOrderStatus
};