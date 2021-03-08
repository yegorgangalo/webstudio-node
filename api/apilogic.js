const shortid = require('shortid');
const fsProm = require('fs/promises');

const getData = (path) => async (req, res, next) => {
    try {
        const data = await fsProm.readFile(path, "utf-8");
        const parsedData = JSON.parse(data);
        res.status(200).send(parsedData);
    } catch (err) {
        res.status(400).send(err);
        return console.error(err.message);
    }
}

const postData = (path) => async (req, res, next) => {
    try {
        console.log(req.body);
        const newData = { ...req.body, id: shortid.generate() };
        const data = await fsProm.readFile(path, "utf-8");
        const oldData = JSON.parse(data);
        oldData.push(newData);
        await fsProm.writeFile(
            path,
            JSON.stringify(oldData, null, 2),
            "utf-8",
            (err) => {
                if (err) throw err;
            }
        )
        res.status(201).send(newData);
    } catch (err) {
        res.status(400).send('error');
        return console.error(err.message);
    }
}

const getDataMongo = (Model) => async (req, res) => {
    try {
        const allData = await Model.find({})
        res.send(allData);
    } catch (err) {
        res.status(400).send(err);
        return console.error(err);
    }
}

const postDataMongo = (Model) => async (req, res) => {
    try {
        const newData = new Model({ ...req.body })
        await newData.save();
        res.status(201).send(newData);
    } catch (err) {
        res.status(400).send(err);
        return console.error(err);
    }
}

module.exports = { getData, postData, getDataMongo, postDataMongo }