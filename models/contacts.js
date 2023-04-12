const fs = require('fs/promises');
const path = require('path');
const { nanoid } = require('nanoid');
const contactPath = path.join(process.cwd(), 'models', 'contacts.json');

const getContacts = async () => {
  const data = await fs.readFile(contactPath, 'utf8');
  return JSON.parse(data);
};

const getContactById = async contactId => {
  const data = await getContacts();
  const res = data.find(item => item.id === contactId);
  return res || null;
};

const removeContact = async contactId => {
  const dataContacts = await getContacts();
  const index = dataContacts.findIndex(item => item.id === contactId);
  if (index === -1) return null;
  const [res] = dataContacts.splice(index, 1);
  await fs.writeFile(contactPath, JSON.stringify(dataContacts, null, 2));
  console.log(res);
  return res;
};

const addContact = async body => {
  const { name, email, phone } = body;
  const contacts = await getContacts();
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };

  contacts.push(newContact);
  await fs.writeFile(contactPath, JSON.stringify(contacts, null, 2));
  return newContact;
};

const updateContact = async (contactId, body) => {
  // const { name, email, phone } = body;
  const contacts = await getContacts();
  const index = contacts.findIndex(item => item.id === contactId);

  if (index === -1) {
    return null;
  }
  contacts[index] = { id:contactId, ...body };
  await fs.writeFile(contactPath, JSON.stringify(contacts, null, 2));
  return contacts[index];
};

module.exports = {
  getContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
