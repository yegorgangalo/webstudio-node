const shortid = require('shortid');
const fsProm = require('fs/promises');

const getData = (path) => async (req, res, next) => {
    try {
        const data = await fsProm.readFile(path, "utf-8");
        const parsedData = JSON.parse(data);
        console.log('parsedData=',parsedData);
        res.status(200).send(parsedData);
    } catch (err) {
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

module.exports = { getData, postData }