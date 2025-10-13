# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Descripción del Proyecto

Generador de tablas de multiplicar construido con Node.js y TypeScript siguiendo principios de Clean Architecture.

## Comandos

### Desarrollo
```bash
npm run dev              # Ejecutar con ts-node (inicio rápido)
npm run dev:nodemon      # Ejecutar con nodemon usando flag -b (ej: -b 7)
```

### Build y Producción
```bash
npm run build           # Compilar TypeScript a dist/ (ejecuta rimraf primero)
npm run start           # Construir y ejecutar código compilado
npm run clean           # Eliminar carpeta dist/
```

### Testing
```bash
npm test                # Ejecutar todos los tests con Jest
npm run test:watch      # Ejecutar tests en modo watch (re-ejecuta al detectar cambios)
npm run test:coverage   # Ejecutar tests y generar reporte de cobertura
```

### Ejecutar la Aplicación
La aplicación acepta argumentos CLI via yargs:
```bash
# Desarrollo con argumentos
npm run dev -- -b 5 -l 12 -s -d outputs -f tabla-5

# Producción con argumentos
node dist/app.js -b 5 -l 12 -s
```

**Argumentos:**
- `-b, --base` (requerido): Número base de la tabla de multiplicar (debe ser > 0)
- `-l, --limit` (default: 10): Límite superior para la tabla de multiplicar
- `-s, --show` (default: false): Mostrar tabla en consola
- `-d, --destination` (default: "outputs"): Ruta de carpeta de salida
- `-f, --fileName` (default: "multiplication-table"): Nombre del archivo de salida (sin extensión)

## Arquitectura

### Estructura Clean Architecture
```
src/
├── app.ts                          # Punto de entrada, parsea args y ejecuta ServerApp
├── presentation/
│   └── server-app.ts              # Orquesta los casos de uso
├── domain/use-cases/              # Lógica de negocio (patrón use case)
│   ├── create-table.use-case.ts   # Genera string de tabla de multiplicar
│   └── save-file.use-case.ts      # Guarda contenido en sistema de archivos
└── config/plugins/
    └── args.plugin.ts             # Parser de argumentos CLI con yargs
```

### Patrones Clave
- **Use Cases**: Cada caso de uso es una clase que implementa una interfaz con método `execute()`
- **Inyección de Dependencias**: Los constructores están preparados para DI (actualmente vacíos pero estructurados para futura inyección de repositorios)
- **Interface-first**: Los casos de uso definen interfaces (`CreateTableUseCase`, `SaveFileUseCase`) para facilitar testing
- **Separación de responsabilidades**:
  - Capa de dominio maneja lógica de negocio pura
  - Capa de presentación orquesta casos de uso
  - Capa de configuración maneja dependencias externas (argumentos CLI)

### Flujo de Ejecución
1. `app.ts` → Parsea argumentos CLI via `args.plugin.ts`
2. Llama a `ServerApp.run()` con opciones parseadas
3. ServerApp instancia y ejecuta casos de uso:
   - `CreateTable.execute()` → Retorna string de tabla de multiplicar
   - `SaveFile.execute()` → Escribe string al sistema de archivos
4. Feedback en consola basado en éxito/fallo

## Configuración TypeScript
- Target: ES2022, módulos CommonJS
- Strict mode habilitado con chequeo de tipos comprehensivo
- Output: `dist/` con source maps y archivos de declaración
- ts-node configurado para modo CommonJS transpile-only

## Testing con Jest
- Framework: Jest con ts-jest para soporte TypeScript
- Archivos de test: `*.test.ts` o `*.spec.ts` dentro de `src/`
- Configuración: `jest.config.ts` con preset ts-jest
- Cobertura: Reportes en formato text, lcov y HTML (carpeta `coverage/`)
- Patrón de tests: Los archivos de test deben colocarse junto a los archivos que testean o en subcarpetas `__tests__/`
