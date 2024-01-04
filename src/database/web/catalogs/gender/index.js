const config = require("../../../config");
const sql = require('mssql');

async function getgender(activos, genderId = 0, gender = null) {
    var activos
    let query = "exec sp_web_genders_get @activated='" + activos + "', @genderId='" + genderId + "'";
    if(gender !=  null && gender.trim() != '' ){
        query += ", @gender= '" + gender + "'";
    }
    query +=  ";";
    try {
        const connection = await new sql.ConnectionPool(config).connect();
        const genders = await connection
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

        return genders;

    } catch (error) {
        return { error: true, message: error.message };
    };
};

async function addgender(gender) {
    let query = await "exec sp_web_genders_add @gender='" + gender + "';";
    try {
        const connection = await new sql.ConnectionPool(config).connect();
        const gender = await connection
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

        return gender;

    } catch (error) {
        return { error: true, message: error.message };
    };
};

async function updategender(id, gender, status) {
    let query = await "exec sp_web_genders_update @id = '" + id + "', @gender='" + gender + "', @status='" + status + "';";
    try {
        const connection = await new sql.ConnectionPool(config).connect();
        const gender = await connection
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

        return gender;

    } catch (error) {
        return { error: true, message: error.message };
    };
};

module.exports = {
    getGender,
    addGender,
    updateGender
};