const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const Password = require("./models/passwordModel");
const { encryptPassword, decryptPassword } = require('./functions/enctyption-decryption');
const { isTheseValidCredentials } = require("./functions/validation");

const app = express();
const dbURI = "Your Mongo URI";
const secretKey = "your secret key";

app.use(express.json());

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, '/statics')))

app.get('/', async (req, res) => {
    const passwords = [];
    const dbPasswords = await Password.find({ });

    for (let i = 0; i < dbPasswords.length; i++) {
        const password = {};
        password.passwordName = dbPasswords[i].passwordName;
        password.passwordInput = decryptPassword(dbPasswords[i].passwordInput, secretKey);
        passwords.push(password);
    }
    
    res.render("index", { passwords });
});

app.get("/createPassword", (req, res) => {
    res.render("createPassword");
});

app.post("/createPassword", async (req, res) => {
    const { passwordInput, passwordName } = req.body;
    if (isTheseValidCredentials(passwordName, passwordInput) !== true) {
        return res.status(400).json({ error: isTheseValidCredentials(passwordName, passwordInput) });
    }
    try {
        await Password.create({ passwordInput: encryptPassword(passwordInput, secretKey), passwordName });
        res.status(200).json({ passwordSent: true });
    } catch (e) {
        console.log(e);
    }
});

mongoose.connect(dbURI).then(_ => {
    app.listen(3000);
    console.log("server started");
}).catch(err => console.log(err));