import { beforeEach } from 'node:test';
import { CreateTable } from '../../domain/use-cases/create-table.use-case';
import { SaveFile } from '../../domain/use-cases/save-file.use-case';
import { ServerApp } from '../server-app';

describe('testing ServerApp', () => {
    
    const options = {
        base: 2,
        limit: 10,
        showTable: false,
        destination: 'outputs-test',
        fileName: 'test-table-del-2'
    };

    beforeEach(() => {
        jest.clearAllMocks();
    })
    
    test('should create ServerApp instance and verify run function', () => {
        
        const serverApp = new ServerApp();
        expect(serverApp).toBeInstanceOf(ServerApp);

        // Verificar que run es una función
        expect(typeof ServerApp.run).toBe('function');

    });

    test('should run ServerApp with options', () => {

        const logSpy = jest.spyOn(console, 'log');
        const createTableSpy = jest.spyOn(CreateTable.prototype, 'execute');
        const saveFileSpy = jest.spyOn(SaveFile.prototype, 'execute');

        ServerApp.run(options);

        expect(logSpy).toHaveBeenCalledTimes(3);
        expect(logSpy).toHaveBeenCalledWith('Server Running...');
        expect(logSpy).toHaveBeenCalledWith('Tabla generada exitosamente!');

        expect(createTableSpy).toHaveBeenCalledTimes(1);
        expect(createTableSpy).toHaveBeenCalledWith({base: options.base, limit: options.limit});

        expect(saveFileSpy).toHaveBeenCalledTimes(1);
        expect(saveFileSpy).toHaveBeenCalledWith({
            fileContent: expect.any(String),
            destination: options.destination,
            fileName: options.fileName
        });
    });

    test('should run with custom values mocked', () => {
        
        const logMock = jest.fn();
        const createMock = jest.fn().mockReturnValue('Tabla generada exitosamente!');
        const saveFileMock = jest.fn().mockReturnValue(true);

        console.log = logMock;
        CreateTable.prototype.execute = createMock;
        SaveFile.prototype.execute = saveFileMock;


        ServerApp.run(options);  

        expect(logMock).toHaveBeenCalledWith('Server Running...');

        //expect(createMock).toHaveBeenCalledTimes(1);
        expect(createMock).toHaveBeenCalledWith({base: options.base, limit: options.limit});

        expect(saveFileMock).toHaveBeenCalledWith({
            fileContent: expect.any(String),
            destination: options.destination,
            fileName: options.fileName
        });
        expect(logMock).toHaveBeenCalledWith('Tabla guardada exitosamente!');

    })


});