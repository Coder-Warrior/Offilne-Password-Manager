const crypto = require('crypto');

function encryptPassword(password, secretKey) {
    const iv = crypto.randomBytes(16);

    const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(secretKey), iv);

    let encryptedPassword = cipher.update(password, 'utf-8', 'hex');
    encryptedPassword += cipher.final('hex');

    return iv.toString('hex') + ':' + encryptedPassword;
}

function decryptPassword(encryptedPassword, secretKey) {
    const parts = encryptedPassword.split(':');
    const iv = Buffer.from(parts[0], 'hex');
    const encryptedText = parts[1];

    const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(secretKey), iv);

    let decryptedPassword = decipher.update(encryptedText, 'hex', 'utf-8');
    decryptedPassword += decipher.final('utf-8');

    return decryptedPassword;
}

module.exports = { encryptPassword, decryptPassword }