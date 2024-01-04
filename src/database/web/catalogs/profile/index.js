const config = require("../../../config");
const sql = require('mssql');

async function getprofile(activos, profileId = 0, profile = null) {
    var activos
    let query = "exec sp_web_profiles_get @activated='" + activos + "', @profileId='" + profileId + "'";
    if(profile !=  null && profile.trim() != '' ){
        query += ", @profile= '" + profile + "'";
    }
    query +=  ";";
    try {
        const connection = await new sql.ConnectionPool(config).connect();
        const profiles = await connection
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

        return profiles;

    } catch (error) {
        return { error: true, message: error.message };
    };
};

async function addprofile(profile) {
    let query = await "exec sp_web_profiles_add @profile='" + profile + "';";
    try {
        const connection = await new sql.ConnectionPool(config).connect();
        const profile = await connection
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

        return profile;

    } catch (error) {
        return { error: true, message: error.message };
    };
};

async function updateprofile(id, profile, status) {
    let query = await "exec sp_web_profiles_update @id = '" + id + "', @profile='" + profile + "', @status='" + status + "';";
    try {
        const connection = await new sql.ConnectionPool(config).connect();
        const profile = await connection
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

        return profile;

    } catch (error) {
        return { error: true, message: error.message };
    };
};

module.exports = {
    getProfile,
    addProfile,
    updateProfile
};