import  yargs  from "yargs";
import { hideBin } from "yargs/helpers";

export const yarg = async () => {

    return await yargs(hideBin(process.argv))    
        .option("b", {
            alias: "base",
            type: "number",
            demandOption: true,
            describe: "Multiplication base table"
        })
        .option("l", {
            alias: "limit",
            type: "number",
            default: 10,
            describe: "Multiplication table limit"
        })
        .option('s', {
            alias: 'show',
            type: 'boolean',
            default: false,
            describe: 'Show multiplication table'
        })
        .option('d', {
            alias: 'destination',
            type: 'string',
            default: 'outputs',
            describe: 'Destination folder'
        })
        .option('f', {
            alias: 'fileName',
            type: 'string',
            default: 'multiplication-table',
            describe: 'File name'
        })
        .check((argv, options) => {

            if (argv.b < 1) throw 'Error: base must be greater than 0';

            return true;
            
        })
        .parseAsync();

}