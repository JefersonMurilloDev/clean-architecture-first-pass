# 🔢 Multiplication Table Generator

Generador de tablas de multiplicar construido con Node.js, TypeScript y Clean Architecture. Incluye validación de argumentos CLI, manejo de errores y suite completa de tests con Jest.

## 📦 Dependencias

### Producción:
- **yargs** `^18.0.0` - Parser de argumentos CLI con validaciones

### Desarrollo:
- **typescript** `^5.5.0` - Compilador TypeScript
- **@types/node** `^22.0.0` - Tipos para Node.js
- **@types/yargs** `^17.0.33` - Tipos para yargs
- **ts-node** `^10.9.0` - Ejecuta TypeScript directamente
- **nodemon** `^3.1.0` - Reinicia automáticamente la aplicación
- **rimraf** `^6.0.0` - Limpia directorios
- **jest** `^30.2.0` - Framework de testing
- **ts-jest** `^29.4.4` - Preset de Jest para TypeScript
- **@types/jest** `^30.0.0` - Tipos para Jest

## 🛠️ Comandos Disponibles

### Desarrollo
```bash
# Instalar dependencias
npm install

# Ejecutar con ts-node (inicio rápido)
npm run dev

# Ejecutar con nodemon (con argumentos ejemplo: -b 7)
npm run dev:nodemon
```

### Build y Producción
```bash
# Compilar TypeScript a dist/
npm run build

# Construir y ejecutar código compilado
npm run start

# Limpiar carpeta dist/
npm run clean
```

### Testing
```bash
# Ejecutar todos los tests
npm test

# Ejecutar tests en modo watch (re-ejecuta al detectar cambios)
npm run test:watch

# Ejecutar tests con reporte de cobertura
npm run test:coverage

# Limpiar cache de Jest (útil si hay problemas)
npm test -- --clearCache
```

## 📁 Estructura del Proyecto (Clean Architecture)

```
src/
├── app.ts                          # Punto de entrada, parsea args y ejecuta ServerApp
├── presentation/
│   └── server-app.ts              # Orquesta los casos de uso
├── domain/
│   └── use-cases/                 # Lógica de negocio (patrón use case)
│       ├── create-table.use-case.ts   # Genera string de tabla de multiplicar
│       ├── save-file.use-case.ts      # Guarda contenido en sistema de archivos
│       └── __tests__/                 # Tests de casos de uso
└── config/
    └── plugins/
        ├── args.plugin.ts         # Parser de argumentos CLI con yargs
        └── __tests__/             # Tests del plugin de argumentos
```

## 🚀 Uso de la Aplicación

### Ejecutar con Argumentos CLI

La aplicación acepta varios argumentos para personalizar la tabla de multiplicar:

```bash
# Desarrollo con argumentos
npm run dev -- -b 5 -l 12 -s -d outputs -n tabla-5

# Producción con argumentos
node dist/app.js -b 5 -l 12 -s
```

### Argumentos Disponibles

| Argumento | Alias | Tipo | Default | Descripción |
|-----------|-------|------|---------|-------------|
| `-b` | `--base` | number | *requerido* | Número base de la tabla (debe ser > 0) |
| `-l` | `--limit` | number | `10` | Límite superior para la tabla |
| `-s` | `--show` | boolean | `false` | Mostrar tabla en consola |
| `-d` | `--destination` | string | `"outputs"` | Carpeta de destino para el archivo |
| `-n` | `--name` | string | `"multiplication-table"` | Nombre del archivo (sin extensión) |

### Ejemplos

```bash
# Tabla del 5, límite 10, mostrar en consola
npm run dev -- -b 5 -s

# Tabla del 7, límite 20, guardar en carpeta custom
npm run dev -- -b 7 -l 20 -d mis-tablas -n tabla-7

# Producción: tabla del 12, límite 15
npm run build
node dist/app.js -b 12 -l 15 -s
```

## 🏗️ Arquitectura

Este proyecto sigue los principios de **Clean Architecture**:

### Capas

1. **Domain Layer** (`domain/use-cases/`)
   - Contiene la lógica de negocio pura
   - Independiente de frameworks y librerías externas
   - Cada caso de uso implementa una interfaz
   - Fácilmente testeable mediante inyección de dependencias

2. **Presentation Layer** (`presentation/`)
   - Orquesta los casos de uso
   - Maneja el flujo de la aplicación
   - Coordina la entrada y salida

3. **Configuration Layer** (`config/`)
   - Configuración de dependencias externas
   - Plugins y adaptadores (yargs, etc.)

### Patrones Aplicados

- **Use Case Pattern**: Cada acción es un caso de uso independiente
- **Dependency Injection**: Constructores preparados para DI
- **Interface-first**: Los casos de uso definen interfaces para facilitar testing
- **Separation of Concerns**: Cada capa tiene responsabilidades bien definidas

## ⚙️ Configuración

### TypeScript
- Target: ES2022, módulos CommonJS
- Strict mode habilitado
- Output: `dist/` con source maps

### Jest
- Framework de testing con ts-jest
- Cobertura: text, lcov y HTML
- Configurado para ignorar carpetas problemáticas en Windows
- Soporte para módulos ESM

## 🧪 Testing

El proyecto incluye una suite completa de tests unitarios:

- **14 tests pasando** con 100% de cobertura
- Tests de casos de uso (create-table, save-file)
- Tests de configuración (args.plugin)
- Mocks apropiados para dependencias externas
- Sin console.log/error ruidosos

Ver [TESTING_BEST_PRACTICES.md](TESTING_BEST_PRACTICES.md) para guía detallada de testing.

## ✨ Características

- ✅ Clean Architecture
- ✅ TypeScript con configuración estricta
- ✅ Validación de argumentos CLI con yargs
- ✅ Manejo robusto de errores
- ✅ Suite completa de tests con Jest
- ✅ Auto-restart en desarrollo con Nodemon
- ✅ Source maps para debugging
- ✅ Cobertura de tests con reportes HTML
- ✅ Compatible con Windows, macOS y Linux

## 📝 Requisitos

- Node.js >= 18.0.0
- npm o yarn

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/amazing-feature`)
3. Commit tus cambios (`git commit -m 'Add amazing feature'`)
4. Push a la rama (`git push origin feature/amazing-feature`)
5. Abre un Pull Request

## 📄 Licencia

MIT

## 👨‍💻 Autor

[@JefersonMurilloDev](https://github.com/JefersonMurilloDev)
