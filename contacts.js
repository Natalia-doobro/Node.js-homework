const fs = require('fs/promises')
const path = require('path')
const crypto = require('crypto')
const contactsPath = path.join(__dirname, 'db', 'contacts.json');

const readContent = async () => {
    const contact = await fs.readFile(contactsPath, 'utf8',);
    const result = JSON.parse(contact);
    return result;
}

const writeContent = async (contact) => {
    const newcontact = await fs.writeFile(contactsPath, JSON.stringify(contact, null, 2));
    return newcontact;
}

const listContacts = async () => {
    return await readContent();
}

const getContactById = async (contactId) => {
    const contacts = await readContent();
    const [contact] = contacts.filter((contact) => contact.id === contactId);
    return contact;
}

const removeContact = async (contactId) => {
    const contacts = await readContent();
    const newList = contacts.filter(contact => contact.id !== contactId);
    await writeContent(newList);
    return newList;
}

const addContact = async (name, email, phone) => {
    const contacts = await readContent();
    const newContact = { name, email, phone, id: crypto.randomUUID() }
    contacts.push(newContact)
    await writeContent(contacts);
    return newContact;
}

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
}