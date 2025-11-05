#!/usr/bin/env node
import { program } from "commander";
import genDiff from '../src/index.js';

program
    .name("gendiff")
    .description("Compares two configuration files and shows a difference.")
    .version('0.0.1')
    .option('-f, --format <type>', 'output format', 'stylish')
    .argument('<filepath1>', 'The path of the first file')
    .argument('<filepath2>', 'The path of the second file')
    .action((filepath1, filepath2, options) => {
        const result = genDiff(filepath1, filepath2, options.format);
        console.log(result);
    });

    program.parse()