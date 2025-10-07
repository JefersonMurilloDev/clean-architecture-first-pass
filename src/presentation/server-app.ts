import { CreateTable } from "../domain/use-cases/create-table.use-case";
import { SaveFile } from "../domain/use-cases/save-file.use-case";



interface RunOptions {
    base: number;
    limit: number;
    showTable: boolean;
    destination: string;
    fileName: string;
}


export class ServerApp {

    static async run({ base, limit, showTable, destination, fileName }: RunOptions) {
        //const args = await yarg();
        //console.log(args);
        console.log('Server Running...');

        const createTable = new CreateTable().execute({ base, limit });
        const saveFile = new SaveFile()
            .execute({ 
                fileContent: createTable, 
                destination: destination, 
                fileName: fileName 
            });

        if (showTable) {
            console.log(createTable);
        }
        (saveFile) ? console.log('Tabla guardada exitosamente!') 
                   : console.log('Error al guardar la tabla');
                
    }
}