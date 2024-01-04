const config = require("../../../config");
const sql = require('mssql');

async function getposition(activos, positionId = 0, position = null) {
    var activos
    let query = "exec sp_web_positions_get @activated='" + activos + "', @positionId='" + positionId + "'";
    if(position !=  null && position.trim() != '' ){
        query += ", @position= '" + position + "'";
    }
    query +=  ";";
    try {
        const connection = await new sql.ConnectionPool(config).connect();
        const positions = await connection
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

        return positions;

    } catch (error) {
        return { error: true, message: error.message };
    };
};

async function addposition(position) {
    let query = await "exec sp_web_positions_add @position='" + position + "';";
    try {
        const connection = await new sql.ConnectionPool(config).connect();
        const position = await connection
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

        return position;

    } catch (error) {
        return { error: true, message: error.message };
    };
};

async function updateposition(id, position, status) {
    let query = await "exec sp_web_positions_update @id = '" + id + "', @position='" + position + "', @status='" + status + "';";
    try {
        const connection = await new sql.ConnectionPool(config).connect();
        const position = await connection
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

        return position;

    } catch (error) {
        return { error: true, message: error.message };
    };
};

module.exports = {
    getPosition,
    addPosition,
    updatePosition
};