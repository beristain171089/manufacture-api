const config = require("../../../config");
const sql = require('mssql');

async function getprofileMenu(activos, profileMenuId = 0, profileMenu = null) {
    var activos
    let query = "exec sp_web_profile_menus_get @activated='" + activos + "', @profileMenuId='" + profileMenuId + "'";
    if(profileMenu !=  null && profileMenu.trim() != '' ){
        query += ", @profileMenu= '" + profileMenu + "'";
    }
    query +=  ";";
    try {
        const connection = await new sql.ConnectionPool(config).connect();
        const profile_menus = await connection
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

        return profile_menus;

    } catch (error) {
        return { error: true, message: error.message };
    };
};

async function addprofileMenu(profileMenu) {
    let query = await "exec sp_web_profile_menus_add @profileMenu='" + profileMenu + "';";
    try {
        const connection = await new sql.ConnectionPool(config).connect();
        const profileMenu = await connection
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

        return profileMenu;

    } catch (error) {
        return { error: true, message: error.message };
    };
};

async function updateprofileMenu(id, profileMenu, status) {
    let query = await "exec sp_web_profile_menus_update @id = '" + id + "', @profileMenu='" + profileMenu + "', @status='" + status + "';";
    try {
        const connection = await new sql.ConnectionPool(config).connect();
        const profileMenu = await connection
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

        return profileMenu;

    } catch (error) {
        return { error: true, message: error.message };
    };
};

module.exports = {
    getProfileMenu,
    addProfileMenu,
    updateProfileMenu
};