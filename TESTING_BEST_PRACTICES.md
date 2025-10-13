# Mejores Prácticas de Testing - Lecciones Aprendidas

## Resumen de Problemas Resueltos

### 1. **Problema con Módulos ESM en Jest**

**Error Original:**
```
SyntaxError: Cannot use import statement outside a module
```

**Causa:**
- `yargs` usa módulos ESM (.mjs) pero Jest con `ts-jest` estaba configurado para CommonJS
- Dynamic imports (`await import()`) no resolvían el problema de compatibilidad

**Solución:**
Mock completo del módulo yargs para evitar importar el código real con problemas ESM.

```typescript
// Mock antes de cualquier import
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
```

**Lección Aprendida:**
- Cuando un módulo externo causa problemas de compatibilidad ESM/CommonJS, mockearlo completamente es la mejor solución
- Los mocks te permiten testear **tu lógica** sin depender de la implementación del módulo externo
- Usa `jest.resetModules()` en `beforeEach` para limpiar el cache entre tests

---

### 2. **Console.error/log Ruidosos Durante Tests**

**Problema:**
Los tests pasaban pero generaban console.error/log que ensuciaban la salida de los tests.

**Solución:**
Usar spies de Jest para silenciar y verificar las llamadas a console:

```typescript
test('should return false if directory could not be created', () => {
    const saveFile = new SaveFile();

    // Silenciar console.error
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
    const mkdirSpy = jest.spyOn(fs, 'mkdirSync').mockImplementation(() => {
      throw new Error('Directory could not be created');
    });

    const result = saveFile.execute(customOptions);

    expect(result).toBe(false);
    // Verificar que console.error fue llamado con el error correcto
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      expect.objectContaining({ message: 'Directory could not be created' })
    );

    // Restaurar mocks
    mkdirSpy.mockRestore();
    consoleErrorSpy.mockRestore();
});
```

**Lección Aprendida:**
- Siempre silencia console.log/error en tests con spies
- No solo silencies, **verifica que las funciones fueron llamadas correctamente**
- Restaura los mocks después de cada test para evitar side effects

---

### 3. **Tests Asíncronos Mal Estructurados**

**Problema Original:**
```typescript
// ❌ MAL - No es async pero usa función async
test('should return default values', () => {
    const argv = runCommand(['-b', '5']); // Retorna Promise<...>
    console.log(argv); // Promise { <pending> }
});
```

**Solución:**
```typescript
// ✅ BIEN - Test async con await
test('should return default values', async () => {
    const argv = await runCommand(['-b', '5']);

    expect(argv).toEqual(expect.objectContaining({
        b: 5,
        base: 5,
        // ...
    }));
});
```

**Lección Aprendida:**
- Si una función retorna una Promise, el test DEBE ser `async` y usar `await`
- Usa `expect.objectContaining()` para verificar objetos parcialmente
- NUNCA uses `console.log` para "testear" - siempre usa assertions (expect)

---

### 4. **Aislamiento Entre Tests**

**Mejor Práctica Aplicada:**
```typescript
describe('testing ArgsPlugin', () => {
    const originalArgv = process.argv;

    beforeEach(() => {
        jest.clearAllMocks();      // Limpia calls, instances, etc.
        jest.resetModules();       // Limpia cache de módulos
    });

    afterEach(() => {
        process.argv = originalArgv; // Restaura estado global
    });

    // ... tests
});
```

**Lección Aprendida:**
- Guarda el estado original de variables globales (`process.argv`, etc.)
- Usa `beforeEach` para limpiar mocks y resetear módulos
- Usa `afterEach` para restaurar el estado original
- Esto previene que tests afecten a otros (side effects)

---

### 5. **Testear Validaciones y Lógica de Negocio**

**Ejemplo Aplicado:**
```typescript
test('should validate base is greater than 0', async () => {
    // ... setup

    // Verificar que la función de validación check fue llamada
    expect(mockCheck).toHaveBeenCalledWith(expect.any(Function));

    // Obtener la función de validación y probarla directamente
    const checkFunction = mockCheck.mock.calls[0][0];

    // Debería pasar con base > 0
    expect(checkFunction({ b: 5 }, {})).toBe(true);

    // Debería lanzar error con base < 1
    expect(() => checkFunction({ b: 0 }, {})).toThrow('Error: base must be greater than 0');
});
```

**Lección Aprendida:**
- Puedes extraer funciones de los mocks para testearlas directamente
- Usa `mockCheck.mock.calls[0][0]` para acceder a argumentos pasados a mocks
- Testea tanto casos de éxito como de fallo (happy path + edge cases)

---

## Estructura de Test Ideal

```typescript
describe('Feature Name', () => {
    // 1. Variables de setup
    const originalState = globalState;

    // 2. Mocks (si son necesarios)
    const mockFunction = jest.fn();

    // 3. Setup antes de cada test
    beforeEach(() => {
        jest.clearAllMocks();
        jest.resetModules();
    });

    // 4. Teardown después de cada test
    afterEach(() => {
        globalState = originalState;
    });

    // 5. Tests organizados por escenario
    describe('Happy path', () => {
        test('should work with default values', () => {
            // Arrange
            const input = ...;

            // Act
            const result = functionUnderTest(input);

            // Assert
            expect(result).toBe(expected);
        });
    });

    describe('Error handling', () => {
        test('should handle errors gracefully', () => {
            // ...
        });
    });
});
```

---

## Checklist de Testing

- [ ] Tests son **independientes** (no dependen de orden de ejecución)
- [ ] Tests son **repetibles** (mismo resultado cada vez)
- [ ] Tests son **rápidos** (usan mocks en lugar de operaciones reales cuando es posible)
- [ ] Tests tienen **assertions claras** (no solo console.log)
- [ ] Tests limpian **side effects** (afterEach, mockRestore)
- [ ] Console logs están **silenciados** pero **verificados**
- [ ] Tests async usan **async/await** correctamente
- [ ] Mocks son **específicos** (mockean solo lo necesario)
- [ ] Tests cubren **happy path y edge cases**
- [ ] Nombres de tests son **descriptivos** ("should do X when Y")

---

## Comandos Útiles

```bash
# Ejecutar todos los tests
npm test

# Ejecutar tests en modo watch (re-ejecuta al cambiar archivos)
npm run test:watch

# Ejecutar tests con reporte de cobertura
npm run test:coverage

# Limpiar cache de Jest (útil si hay problemas)
npm test -- --clearCache
```

---

## Solución de Problemas Comunes

### Error: EPERM en modo watch (Windows)

**Síntoma:**
```
Error: EPERM: operation not permitted, watch 'C:\...\outputs'
```

**Causa:**
Jest intenta vigilar carpetas que no contienen tests (como `outputs/`, `dist/`, etc.) y Windows puede bloquear el acceso por permisos o procesos activos.

**Solución:**
Agregar `watchPathIgnorePatterns` en `jest.config.ts`:

```typescript
watchPathIgnorePatterns: [
  '<rootDir>/node_modules/',
  '<rootDir>/dist/',
  '<rootDir>/coverage/',
  '<rootDir>/outputs/',
  '<rootDir>/custom-outputs/'
]
```

**Si persiste:**
1. Cerrar todos los procesos de Jest
2. Limpiar cache: `npm test -- --clearCache`
3. Eliminar carpetas: `outputs/`, `dist/`, `coverage/`
4. Reintentar: `npm run test:watch`

---

## Recursos Adicionales

- [Jest Mocking](https://jestjs.io/docs/mock-functions)
- [Testing Async Code](https://jestjs.io/docs/asynchronous)
- [Setup and Teardown](https://jestjs.io/docs/setup-teardown)
- [ECMAScript Modules](https://jestjs.io/docs/ecmascript-modules)
