const fs = require("fs").promises;
const path = require("path");
const contactsPath = path.join(__dirname, "db/contacts.json");
const { v4 } = require("uuid");

async function listContacts() {
  const data = await fs.readFile(contactsPath);
  const contacts = JSON.parse(data);
  return contacts;
}

async function getContactById(contactId) {
  const contacts = await listContacts();
  const contact = contacts.find((item) => item.id === contactId);
  if (!contact) {
    return null;
  }
  return contact;
}

async function removeContact(contactId) {
  const contacts = await listContacts();
  const contactIndex = contacts.findIndex((item) => item.id === contactId);
  if (contactIndex === -1) {
    return null;
  }
  const removedContact = contacts.splice(contactIndex, 1);
  await updateContact(contacts);
  return removedContact;
}

async function addContact(name, email, phone) {
  const contacts = await listContacts();
  const newContact = { id: v4(), name, email, phone };
  contacts.push(newContact);
  await updateContact(contacts);
  return contacts;
}

async function updateContact(contacts) {
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
}

module.exports = { listContacts, getContactById, removeContact, addContact };
