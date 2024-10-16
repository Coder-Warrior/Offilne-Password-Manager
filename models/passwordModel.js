const mongoose = require("mongoose");

const passwordSchema = new mongoose.Schema({
    passwordName: String,
    passwordInput: String,
});

const Password = mongoose.model("password", passwordSchema);

module.exports = Password;