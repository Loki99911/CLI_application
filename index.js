const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} = require("./contacts");

const { Command } = require("commander");
const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();
// const argv = require("yargs").argv;

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
          const contacts = await listContacts();
          console.table(contacts);
      break;

    case "get":
          const contact = await getContactById(id);
          if (!contact) {
              throw new Error(`Contact with id=${id} not found`);
          }
          console.log(contact);
      break;

    case "add":
          const newContacts = await addContact(name, email, phone);
          console.table(newContacts);
      break;

    case "remove":
      const [removedContact] = await removeContact(id);
      if (!removedContact) {
        throw new Error(`Contact with id=${id} not found`);
      }
      console.log(removedContact);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
