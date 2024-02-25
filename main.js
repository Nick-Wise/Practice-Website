const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");
const bodyParser = require('body-parser');

const databaseFile = "db.json";
const dbFilePath = path.join(__dirname, databaseFile);

app.use(express.static(path.join(__dirname, "frontend")));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/sign_up', (req, res) => {
    res.sendFile(path.join(__dirname,'frontend', 'sign_up.html'));
});

app.post('/sign_up', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    let userData = [];

    if (fs.existsSync(dbFilePath)) {
        const fileContent = fs.readFileSync(dbFilePath, 'utf8');
        userData = fileContent ? JSON.parse(fileContent) : { users: [] };
    }

    userData.push({ username, password });
    fs.writeFileSync(dbFilePath, JSON.stringify(userData, null, 2), 'utf8');

    res.send(`Sign-up successful! Username: ${username}, Password: ${password}`);
});


app.listen(3000, () => {
    console.log("Listening at http://localhost:3000/");
});
