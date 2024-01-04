const config = require("../../../config");
const sql = require('mssql');

async function getbudgetStatus(activos, budgetStatusId = 0, budgetStatus = null) {
    var activos
    let query = "exec sp_web_budget_statuses_get @activated='" + activos + "', @budgetStatusId='" + budgetStatusId + "'";
    if(budgetStatus !=  null && budgetStatus.trim() != '' ){
        query += ", @budgetStatus= '" + budgetStatus + "'";
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

async function addbudgetStatus(budgetStatus) {
    let query = await "exec sp_web_budget_statuses_add @budgetStatus='" + budgetStatus + "';";
    try {
        const connection = await new sql.ConnectionPool(config).connect();
        const budgetStatus = await connection
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

        return budgetStatus;

    } catch (error) {
        return { error: true, message: error.message };
    };
};

async function updatebudgetStatus(id, budgetStatus, status) {
    let query = await "exec sp_web_budget_statuses_update @id = '" + id + "', @budgetStatus='" + budgetStatus + "', @status='" + status + "';";
    try {
        const connection = await new sql.ConnectionPool(config).connect();
        const budgetStatus = await connection
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

        return budgetStatus;

    } catch (error) {
        return { error: true, message: error.message };
    };
};

module.exports = {
    getBudgetStatus,
    addBudgetStatus,
    updateBudgetStatus
};