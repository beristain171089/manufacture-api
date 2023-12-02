const crypto = require('crypto');

function getToken(data) {

    var cipher = crypto.createCipher('aes-256-cbc', 'iGate API Key');
    var encrypted = cipher.update(data, 'utf8', 'hex');

    encrypted += cipher.final('hex');

    return encrypted;
};

function getDecode(token) {

    var decipher = crypto.createDecipher('aes-256-cbc', 'iGate API Key');
    var decrypted = decipher.update(token, 'hex', 'utf8');

    decrypted += decipher.final('utf8');

    return decrypted;
};

module.exports = {
    getToken,
    getDecode
};