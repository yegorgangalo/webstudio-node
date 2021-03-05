const shortid = require('shortid');
const path = require('path');
const fs = require('fs');

const { promises: fsPromises } = fs;
const contactsPath = path.join(__dirname, "./db/contacts.json");

async function listContacts() {
    try {
        const data = await fsPromises.readFile(contactsPath, "utf-8");
        const contacts = JSON.parse(data);
        console.log('List of contacts:');
        console.table(contacts);
        return contacts;
    } catch (err) {
        return console.error(err.message);
    }
}

async function getContactById(contactId) {
    try {
        const data = await fsPromises.readFile(contactsPath, "utf-8");
        const contacts = JSON.parse(data);
        const searchContact = contacts.find(contact => contact.id === contactId);
        if (!searchContact) {
            throw new Error(`Contact with id=${contactId} is not found!`);
        };
        console.log(searchContact);
        return searchContact;
    } catch (err) {
        return console.error(err.message);
    }
}

async function removeContact(contactId) {
    try {
        const data = await fsPromises.readFile(contactsPath, "utf-8");
        const contacts = JSON.parse(data);
        const filteredContacts = contacts.filter(contact => contact.id !== contactId);

        if (filteredContacts.length === contacts.length) {
            throw new Error(`Contact with id=${contactId} is not found!`);
        };
        await fsPromises.writeFile(
            contactsPath,
            JSON.stringify(filteredContacts),
            "utf-8",
            (err) => {
                if (err) throw err;
            }
        )
        console.table(filteredContacts);
        return filteredContacts;
    } catch (err) {
        return console.error(err.message);
    }
}

async function addContact(name, email, phone) {
    try {
        const data = await fsPromises.readFile(contactsPath, "utf-8");
        const contacts = JSON.parse(data);
        const existContact = contacts.find(contact =>
            contact.name === name || contact.email === email || contact.phone === phone);
        if (existContact) {
            throw new Error(`Such contact exists!`);
        };

        const newContact = { id: shortid.generate(), name, email, phone };
        contacts.push(newContact);
        await fsPromises.writeFile(
            contactsPath,
            JSON.stringify(contacts),
            "utf-8",
            (err) => {
                if (err) throw err;
            }
        )
        console.table(contacts);
        return contacts;
    } catch (err) {
        return console.error(err.message);
    }
}

// listContacts();
// getContactById(2)
// removeContact(10);
// addContact('Albert Hugo', 'asd@assd.com', '(093) 232-3334');

module.exports = { listContacts, getContactById, removeContact, addContact };