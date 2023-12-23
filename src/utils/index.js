function boolParseFunc(str)
{
    // writing a switch-case statement
    switch(str)
    {
        case "true":
            return true;
        case "1":
            return true;
        case "yes":
            return true;
        default:
            return false;
    } 
}

function IsNullOrEmpty(str){
    if (typeof str === "string" && str.length === 0) {
        return false;
    } else if (str === null) {
        return false;
    } else if (str === undefined) {
        return false;
    } else {
        return true;
    }
}

module.exports = {
    boolParseFunc,
    IsNullOrEmpty
};