// Mock completo de yargs para evitar problemas con módulos ESM
const mockParseSync = jest.fn();
const mockCheck = jest.fn().mockReturnThis();
const mockOption = jest.fn().mockReturnThis();

jest.mock('yargs', () => {
    return jest.fn(() => ({
        option: mockOption,
        check: mockCheck,
        parseSync: mockParseSync
    }));
});

jest.mock('yargs/helpers', () => ({
    hideBin: jest.fn((argv) => argv.slice(2))
}));

describe('testing ArgsPlugin', () => {
    const originalArgv = process.argv;

    beforeEach(() => {
        jest.clearAllMocks();
        jest.resetModules();
    });

    afterEach(() => {
        process.argv = originalArgv;
    });

    test('should return default values', async () => {
        // Configurar el mock para retornar valores por defecto
        mockParseSync.mockReturnValue({
            b: 5,
            base: 5,
            l: 10,
            limit: 10,
            s: false,
            show: false,
            n: 'multiplication-table',
            name: 'multiplication-table',
            d: 'outputs',
            destination: 'outputs',
        });

        process.argv = ['node', 'app.js', '-b', '5'];

        const { yarg } = await import('../args.plugin');

        expect(yarg).toEqual(expect.objectContaining({
            b: 5,
            base: 5,
            l: 10,
            limit: 10,
            s: false,
            show: false,
            n: 'multiplication-table',
            name: 'multiplication-table',
            d: 'outputs',
            destination: 'outputs'
        }));

        // Verificar que option fue llamado con las configuraciones correctas
        expect(mockOption).toHaveBeenCalledWith('b', expect.objectContaining({
            alias: 'base',
            type: 'number',
            demandOption: true
        }));
        //console.log(yarg);
    });

    test('should return custom values', async () => {
        mockParseSync.mockReturnValue({
            b: 8,
            base: 8,
            l: 20,
            limit: 20,
            s: true,
            show: true,
            n: 'custom-name',
            name: 'custom-name',
            d: 'custom-outputs',
            destination: 'custom-outputs',
        });

        process.argv = ['node', 'app.js', '-b', '8', '-l', '20', '-s', '-n', 'custom-name', '-d', 'custom-outputs'];
        //console.log(process.argv);
        jest.resetModules();
        const { yarg } = await import('../args.plugin');
        
        expect(yarg).toEqual(expect.objectContaining({
            b: 8,
            base: 8,
            l: 20,
            limit: 20,
            s: true,
            show: true,
            n: 'custom-name',
            name: 'custom-name',
            d: 'custom-outputs',
            destination: 'custom-outputs'
        }));
    });

    test('should have all required options configured', async () => {
        mockParseSync.mockReturnValue({
            b: 5,
            base: 5,
            l: 10,
            limit: 10,
            s: false,
            show: false,
            n: 'multiplication-table',
            name: 'multiplication-table',
            d: 'outputs',
            destination: 'outputs',
        
        });

        process.argv = ['node', 'app.js', '-b', '5'];

        jest.resetModules();
        await import('../args.plugin');

        // Verificar que todas las opciones fueron configuradas
        expect(mockOption).toHaveBeenCalledWith('b', expect.any(Object));
        expect(mockOption).toHaveBeenCalledWith('l', expect.any(Object));
        expect(mockOption).toHaveBeenCalledWith('s', expect.any(Object));
        expect(mockOption).toHaveBeenCalledWith('n', expect.any(Object));
        expect(mockOption).toHaveBeenCalledWith('d', expect.any(Object));

        // Verificar que check fue llamado
        expect(mockCheck).toHaveBeenCalled();
    });

    test('should validate base is greater than 0', async () => {
        mockParseSync.mockReturnValue({
            b: 5,
            base: 5,
            l: 10,
            limit: 10,
            s: false,
            show: false,
            n: 'multiplication-table',
            name: 'multiplication-table',
            d: 'outputs',
            destination: 'outputs',
        });

        process.argv = ['node', 'app.js', '-b', '5'];

        jest.resetModules();
        await import('../args.plugin');

        // Verificar que la función de validación check fue llamada
        expect(mockCheck).toHaveBeenCalledWith(expect.any(Function));

        // Obtener la función de validación y probarla
        const checkFunction = mockCheck.mock.calls[0][0];

        // Debería pasar con base > 0
        expect(checkFunction({ b: 5 }, {})).toBe(true);

        // Debería lanzar error con base < 1
        expect(() => checkFunction({ b: 0 }, {})).toThrow('Error: base must be greater than 0');

        console.log(checkFunction({ b: 5 }, {}));
    });
});
