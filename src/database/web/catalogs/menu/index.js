const config = require("../../../config");
const sql = require('mssql');

async function getmenu(activos, menuId = 0, menu = null) {
    var activos
    let query = "exec sp_web_menus_get @activated='" + activos + "', @menuId='" + menuId + "'";
    if(menu !=  null && menu.trim() != '' ){
        query += ", @menu= '" + menu + "'";
    }
    query +=  ";";
    try {
        const connection = await new sql.ConnectionPool(config).connect();
        const menus = await connection
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

        return menus;

    } catch (error) {
        return { error: true, message: error.message };
    };
};

async function addmenu(menu) {
    let query = await "exec sp_web_menus_add @menu='" + menu + "';";
    try {
        const connection = await new sql.ConnectionPool(config).connect();
        const menu = await connection
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

        return menu;

    } catch (error) {
        return { error: true, message: error.message };
    };
};

async function updatemenu(id, menu, status) {
    let query = await "exec sp_web_menus_update @id = '" + id + "', @menu='" + menu + "', @status='" + status + "';";
    try {
        const connection = await new sql.ConnectionPool(config).connect();
        const menu = await connection
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

        return menu;

    } catch (error) {
        return { error: true, message: error.message };
    };
};

module.exports = {
    getMenu,
    addMenu,
    updateMenu
};