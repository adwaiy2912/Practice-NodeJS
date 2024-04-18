import validator from "validator";
import chalk from "chalk";
import yargs from "yargs";

import getNotes from "./utils.js";

const msg = getNotes();
// console.log(msg);

// yargs.command({
//    command: "add",
//    describe: "Add a new note",
//    handler: () => {
//       console.log("Adding a norw note");
//    },
// });

const argv = yargs.argv;
console.log(argv);

// console.log(validator.isEmail("hello@w.in"));
// console.log(chalk.green.inverse("Success"));
// console.log(process.argv);

// nodemon notes/app.js
// node notes/app.js
