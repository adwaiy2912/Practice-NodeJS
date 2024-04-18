import yargs from "yargs";

yargs().command({
   command: "greet",
   describe: "Greet the user",
   builder: {
      name: {
         describe: "Your name",
         demandOption: true,
         type: "string",
      },
   },
   handler(argv) {
      console.log(`Hello, ${argv.name}!`);
   },
});

print(yargs());
