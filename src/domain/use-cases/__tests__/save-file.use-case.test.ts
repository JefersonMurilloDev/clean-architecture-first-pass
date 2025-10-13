import { SaveFile } from "../save-file.use-case";
import fs from "fs";

describe("SaveFileUseCase", () => {
  const customOptions = {
    fileContent: "custom file content",
    destination: "custom-outputs/file-destination",
    fileName: "custom-file-name",
  };

  const filePath = `${customOptions.destination}/${customOptions.fileName}.txt`;

  beforeEach(() => {
    // clean up
    if (fs.existsSync("outputs")) {
      fs.rmSync("outputs", { recursive: true });
    }

    if (fs.existsSync("custom-outputs")) {
      fs.rmSync("custom-outputs", { recursive: true });
    }
  });
  afterEach(() => {
    // clean up
    if (fs.existsSync("outputs")) {
      fs.rmSync("outputs", { recursive: true });
    }

    if (fs.existsSync("custom-outputs")) {
      fs.rmSync("custom-outputs", { recursive: true });
    }
  });

  test("should save file with default values", () => {
    const saveFile = new SaveFile();
    const filePath = "outputs/table.txt";
    const options = {
      fileContent: "test file content",
      fileName: "table",
    };

    // Silenciar console.log para mantener salida limpia
    const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation();

    const result = saveFile.execute(options);
    const checkFileExists = fs.existsSync(filePath);
    const fileContent = fs.readFileSync(filePath, { encoding: "utf-8" });

    expect(result).toBe(true);
    expect(checkFileExists).toBe(true);
    expect(fileContent).toBe(options.fileContent);
    expect(consoleLogSpy).toHaveBeenCalledWith('Tabla generada exitosamente!');

    consoleLogSpy.mockRestore();
  });

  test("should save file with custom values", () => {
    const saveFile = new SaveFile();

    // Silenciar console.log para mantener salida limpia
    const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation();

    const result = saveFile.execute(customOptions);
    const checkFileExists = fs.existsSync(filePath);
    const fileContent = fs.readFileSync(filePath, { encoding: "utf-8" });

    expect(result).toBe(true);
    expect(checkFileExists).toBe(true);
    expect(fileContent).toBe(customOptions.fileContent);
    expect(consoleLogSpy).toHaveBeenCalledWith('Tabla generada exitosamente!');

    consoleLogSpy.mockRestore();
  });

  test('should return false if directory could not be created', () => {
    const saveFile = new SaveFile();

    // Silenciar console.error para evitar ruido en la salida de tests
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
    const mkdirSpy = jest.spyOn(fs, 'mkdirSync').mockImplementation(() => {
      throw new Error('Directory could not be created');
    });

    const result = saveFile.execute(customOptions);

    expect(result).toBe(false);
    // Verificar que console.error fue llamado con el error
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      expect.objectContaining({ message: 'Directory could not be created' })
    );

    mkdirSpy.mockRestore();
    consoleErrorSpy.mockRestore();
  });

  test('should return false if file could not be created', () => {
    const saveFile = new SaveFile();

    // Silenciar console.error para evitar ruido en la salida de tests
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
    const writeFileSpy = jest.spyOn(fs, 'writeFileSync').mockImplementation(() => {
      throw new Error('File could not be created');
    });

    const result = saveFile.execute({fileContent: "test file content"});

    expect(result).toBe(false);
    // Verificar que console.error fue llamado con el error
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      expect.objectContaining({ message: 'File could not be created' })
    );

    writeFileSpy.mockRestore();
    consoleErrorSpy.mockRestore();
  });
});
