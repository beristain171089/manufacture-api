const config = require("../../../config");
const sql = require('mssql');

async function getCountry(activos, countryId = 0, country = null) {
    var activos
    let query = "exec sp_web_country_get @activated='" + activos + "', @countryId='" + countryId + "'";
    if(country !=  null && country.trim() != '' ){
        query += ", @country= '" + country + "'";
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

async function addCountry(country) {
    let query = await "exec sp_web_country_add @country='" + country + "';";
    try {
        const connection = await new sql.ConnectionPool(config).connect();
        const country = await connection
            .request()
            .query(query)
            .then((dbData) => {
                if (dbData.recordset.length > 0) {
                    return { Datetiem: dbData.recordset };
                } else {
                    return { error: true, message: "NO FUE POSIBLE GUARDAR EL REGISTRO" };
                }
            });

        connection.close();

        return country;

    } catch (error) {
        return { error: true, message: error.message };
    };
};

async function updateCountry(id, country, status) {
    let query = await "exec sp_web_country_update @id = '" + id + "', @country='" + country + "', @status='" + status + "';";
    try {
        const connection = await new sql.ConnectionPool(config).connect();
        const country = await connection
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

        return country;

    } catch (error) {
        return { error: true, message: error.message };
    };
};

module.exports = {
    getCountry,
    addCountry,
    updateCountry
};