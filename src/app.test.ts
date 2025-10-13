import { ServerApp } from "./presentation/server-app";

// Mock the args plugin to avoid loading yargs
jest.mock('./config/plugins/args.plugin', () => ({
    yarg: {
        b: 10,
        l: 5,
        s: true,
        n: 'test-file',
        d: 'test-destination'
    }
}));

describe('Test app.ts', () => {
    

    test('should call ServerApp.run with values', async () => {
        
        const serverRunMock = jest.fn();
        ServerApp.run = serverRunMock;

        await import('./app');

        expect(serverRunMock).toHaveBeenCalledWith({
            base: 10,
            limit: 5,
            showTable: true,
            fileName: 'test-file',
            destination: 'test-destination'
        });
    })
});
