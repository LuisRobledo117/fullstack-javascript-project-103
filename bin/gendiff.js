import { program } from "commander";

program
    .name("gendiff")
    .description("Compares two configuration files and shows a difference.")
    .version('0.0.1')
    .option('-f, --format <type>', 'output format')
    .argument('<filepath1>', 'The path of the first file')
    .argument('<filepath2>', 'The path of the second file')
    .action((filepath1, filepath2) => {
        console.log('filepath1:', filepath1);
        console.log('filepath2:', filepath2);

    })
    .parse()