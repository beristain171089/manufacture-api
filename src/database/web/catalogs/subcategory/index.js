const config = require("../../../config");
const sql = require('mssql');

async function getsubcategory(activos, subcategoryId = 0, subcategory = null) {
    var activos
    let query = "exec sp_web_subcategories_get @activated='" + activos + "', @subcategoryId='" + subcategoryId + "'";
    if(subcategory !=  null && subcategory.trim() != '' ){
        query += ", @subcategory= '" + subcategory + "'";
    }
    query +=  ";";
    try {
        const connection = await new sql.ConnectionPool(config).connect();
        const subcategories = await connection
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

        return subcategories;

    } catch (error) {
        return { error: true, message: error.message };
    };
};

async function addsubcategory(subcategory) {
    let query = await "exec sp_web_subcategories_add @subcategory='" + subcategory + "';";
    try {
        const connection = await new sql.ConnectionPool(config).connect();
        const subcategory = await connection
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

        return subcategory;

    } catch (error) {
        return { error: true, message: error.message };
    };
};

async function updatesubcategory(id, subcategory, status) {
    let query = await "exec sp_web_subcategories_update @id = '" + id + "', @subcategory='" + subcategory + "', @status='" + status + "';";
    try {
        const connection = await new sql.ConnectionPool(config).connect();
        const subcategory = await connection
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

        return subcategory;

    } catch (error) {
        return { error: true, message: error.message };
    };
};

module.exports = {
    getSubcategory,
    addSubcategory,
    updateSubcategory
};