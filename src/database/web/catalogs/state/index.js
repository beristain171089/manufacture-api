const config = require("../../../config");
const sql = require('mssql');

async function getstate(activos, stateId = 0, state = null) {
    var activos
    let query = "exec sp_web_states_get @activated='" + activos + "', @stateId='" + stateId + "'";
    if(state !=  null && state.trim() != '' ){
        query += ", @state= '" + state + "'";
    }
    query +=  ";";
    try {
        const connection = await new sql.ConnectionPool(config).connect();
        const states = await connection
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

        return states;

    } catch (error) {
        return { error: true, message: error.message };
    };
};

async function addstate(state) {
    let query = await "exec sp_web_states_add @state='" + state + "';";
    try {
        const connection = await new sql.ConnectionPool(config).connect();
        const state = await connection
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

        return state;

    } catch (error) {
        return { error: true, message: error.message };
    };
};

async function updatestate(id, state, status) {
    let query = await "exec sp_web_states_update @id = '" + id + "', @state='" + state + "', @status='" + status + "';";
    try {
        const connection = await new sql.ConnectionPool(config).connect();
        const state = await connection
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

        return state;

    } catch (error) {
        return { error: true, message: error.message };
    };
};

module.exports = {
    getState,
    addState,
    updateState
};