const path = require('path');
const fs = require('fs');
const express = require('express');
const cors = require('cors');
const shortid = require('shortid');

const app = express();
const fsProm = fs.promises;
const examplesPath = path.join(__dirname, "./db/examples.json");
const typesPath = path.join(__dirname, "./db/portfolio-types.json");
const mailingPath = path.join(__dirname, "./db/mailing.json");
const formPath = path.join(__dirname, "./db/form.json");
const PORT = process.env.PORT || 3003;

app.use(express.urlencoded({ extended: true })) //дає можливість зчитувати body в req.body.title// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.json());// Parse JSON bodies (as sent by API clients)
app.use(cors());

app.get('/examples', async (req, res) => {
    try {
        const data = await fsProm.readFile(examplesPath, "utf-8");
        const examples = JSON.parse(data);
        res.status(200).send(examples);
    } catch (err) {
        return console.error(err.message);
    }
})

app.get('/types', async (req, res) => {
    try {
        const data = await fsProm.readFile(typesPath, "utf-8");
        const types = JSON.parse(data);
        res.status(200).send(types);
    } catch (err) {
        return console.error(err.message);
    }
})

app.get('/mailing', async (req, res) => {
    try {
        const data = await fsProm.readFile(mailingPath, "utf-8");
        const emailList = JSON.parse(data);
        res.status(200).send(emailList);
    } catch (err) {
        return console.error(err.message);
    }
})

app.post('/mailing', async (req, res) => {
    try {
        const newEmail = { email: req.body.email, id: shortid.generate() };
        const data = await fsProm.readFile(mailingPath, "utf-8");
        const emailList = JSON.parse(data);
        emailList.push(newEmail);
        await fsProm.writeFile(
            mailingPath,
            JSON.stringify(emailList, null, 2),
            "utf-8",
            (err) => {
                if (err) throw err;
            }
        )
        res.status(201).send(newEmail);
    } catch (err) {
        res.status(400).send('error');
        return console.error(err.message);
    }
})

app.post('/form', async (req, res) => {
    try {
        const newClient = {...req.body, id: shortid.generate() };
        const data = await fsProm.readFile(formPath, "utf-8");
        const clientList = JSON.parse(data);
        clientList.push(newClient);
        await fsProm.writeFile(
            formPath,
            JSON.stringify(clientList, null, 2),
            "utf-8",
            (err) => {
                if (err) throw err;
            }
        )

        res.status(201).send(newClient);
    } catch (err) {
        res.status(400).send('error');
        return console.error(err.message);
    }
})

app.listen(PORT, () => {
            console.log("starting listening on port", PORT);
        })