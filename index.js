const path = require('path');
const fs = require('fs');
const express = require('express');
const cors = require('cors');
// const shortid = require('shortid');
const { getData, postData } = require('./api/apilogic');

const app = express();
const fsProm = fs.promises;
const PORT = process.env.PORT || 3003;

const examplesPath = path.join(__dirname, "./db/examples.json");
const typesPath = path.join(__dirname, "./db/portfolio-types.json");
const mailingPath = path.join(__dirname, "./db/mailing.json");
const formPath = path.join(__dirname, "./db/form.json");
const advantagesPath = path.join(__dirname, "./db/advantages.json");
const clientsPath = path.join(__dirname, "./db/clients.json");
const commandPath = path.join(__dirname, "./db/command.json");
const workPath = path.join(__dirname, "./db/work.json");

app.use(express.urlencoded({ extended: true })) //дає можливість зчитувати body в req.body.title// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.json());// Parse JSON bodies (as sent by API clients)
app.use(cors());

app.get('/advantages', getData(advantagesPath));
app.get('/work', getData(workPath));
app.get('/command', getData(commandPath));
app.get('/clients', getData(clientsPath));
app.get('/examples', getData(examplesPath));
app.get('/types', getData(typesPath));
app.get('/mailing', getData(mailingPath));
app.get('/form', getData(formPath));

app.post('/mailing', postData(mailingPath));
app.post('/form', postData(formPath));

// app.post('/mailing', async (req, res) => {
//     try {
//         const newEmail = { email: req.body.email, id: shortid.generate() };
//         const data = await fsProm.readFile(mailingPath, "utf-8");
//         const emailList = JSON.parse(data);
//         emailList.push(newEmail);
//         await fsProm.writeFile(
//             mailingPath,
//             JSON.stringify(emailList, null, 2),
//             "utf-8",
//             (err) => {
//                 if (err) throw err;
//             }
//         )
//         res.status(201).send(newEmail);
//     } catch (err) {
//         res.status(400).send('error');
//         return console.error(err.message);
//     }
// })

// app.post('/form', async (req, res) => {
//     try {
//         const newClient = {...req.body, id: shortid.generate() };
//         const data = await fsProm.readFile(formPath, "utf-8");
//         const clientList = JSON.parse(data);
//         clientList.push(newClient);
//         await fsProm.writeFile(
//             formPath,
//             JSON.stringify(clientList, null, 2),
//             "utf-8",
//             (err) => {
//                 if (err) throw err;
//             }
//         )

//         res.status(201).send(newClient);
//     } catch (err) {
//         res.status(400).send('error');
//         return console.error(err.message);
//     }
// })

app.listen(PORT, () => {
            console.log("starting listening on port", PORT);
        })