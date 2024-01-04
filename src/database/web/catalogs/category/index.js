const config = require("../../../config");
const sql = require('mssql');

async function getcategory(activos, categoryId = 0, category = null) {
    var activos
    let query = "exec sp_web_categories_get @activated='" + activos + "', @categoryId='" + categoryId + "'";
    if(category !=  null && category.trim() != '' ){
        query += ", @category= '" + category + "'";
    }
    query +=  ";";
    try {
        const connection = await new sql.ConnectionPool(config).connect();
        const categories = await connection
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

        return categories;

    } catch (error) {
        return { error: true, message: error.message };
    };
};

async function addcategory(category) {
    let query = await "exec sp_web_categories_add @category='" + category + "';";
    try {
        const connection = await new sql.ConnectionPool(config).connect();
        const category = await connection
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

        return category;

    } catch (error) {
        return { error: true, message: error.message };
    };
};

async function updatecategory(id, category, status) {
    let query = await "exec sp_web_categories_update @id = '" + id + "', @category='" + category + "', @status='" + status + "';";
    try {
        const connection = await new sql.ConnectionPool(config).connect();
        const category = await connection
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

        return category;

    } catch (error) {
        return { error: true, message: error.message };
    };
};

module.exports = {
    getCategory,
    addCategory,
    updateCategory
};