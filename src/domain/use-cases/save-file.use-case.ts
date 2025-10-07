import fs from "fs";

export interface SaveFileUseCase {
    execute(options: Options): boolean;
}

export interface Options {
    fileContent : string;
    destination?: string;
    fileName?   : string;
}


export class SaveFile implements SaveFileUseCase {

    constructor (
        /**
         * Repository - StorageRepository
         */
    ) {};

    execute({ fileContent, destination = 'outputs', fileName }: Options): boolean {

        try {
        
          if (!fs.existsSync(destination)) {
            fs.mkdirSync(destination, { recursive: true });
          }
          fs.writeFileSync(`./${destination}/${fileName}.txt`, fileContent);
          console.log('Tabla generada exitosamente!');
          return true

        } catch (error) {
          console.error(error);
          return false
        }
    }
}