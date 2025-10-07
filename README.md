# Configuración TypeScript + Node.js + Nodemon

Esta configuración está optimizada para proyectos Node.js con TypeScript usando las versiones más actualizadas de las herramientas.

## 📦 Dependencias Instaladas

### Dependencias de Desarrollo:
- **typescript** `^5.5.0` - Compilador TypeScript actualizado
- **@types/node** `^22.0.0` - Tipos para Node.js
- **ts-node** `^10.9.0` - Ejecuta TypeScript directamente
- **nodemon** `^3.1.0` - Reinicia automáticamente la aplicación
- **rimraf** `^6.0.0` - Limpia directorios (equivalente a `rm -rf`)

## 🛠️ Comandos Disponibles

```bash
# Instalar dependencias
npm install

# Desarrollo con auto-restart
npm run dev

# Construir para producción
npm run build

# Ejecutar en producción
npm run start

# Limpiar archivos compilados
npm run clean
```

## 📁 Estructura de Archivos

```
/
├── src/
│   └── app.ts          # Punto de entrada de la aplicación
├── dist/               # Archivos compilados (generado automáticamente)
├── package.json        # Configuración del proyecto
├── tsconfig.json       # Configuración de TypeScript
└── nodemon.json        # Configuración de Nodemon
```

## ⚙️ Configuraciones

### TypeScript (tsconfig.json)
- **Target**: ES2022
- **Module**: CommonJS
- **Strict Mode**: Activado
- **Output**: `./dist`
- **Source Maps**: Activados
- **Declaration Files**: Activados

### Nodemon (nodemon.json)
- **Watch**: `./src`
- **Extensions**: `.ts,.js`
- **Exec**: `ts-node ./src/app.ts`
- **Delay**: 500ms
- **Verbose**: Activado

## 🚀 Uso

1. **Instalar dependencias**:
   ```bash
   npm install
   ```

2. **Desarrollo**:
   ```bash
   npm run dev
   ```
   Nodemon vigilará los cambios en `src/` y reiniciará automáticamente.

3. **Producción**:
   ```bash
   npm run build
   npm start
   ```

## ✨ Características

- ✅ TypeScript con configuración estricta
- ✅ Auto-restart en desarrollo con Nodemon
- ✅ Compilación optimizada para producción
- ✅ Source maps para debugging
- ✅ Limpieza automática de archivos compilados
- ✅ Compatible con ES2022
- ✅ Configuración actualizada y optimizada

## 📝 Notas

- La configuración está basada en las documentaciones más recientes de TypeScript, ts-node, y Nodemon
- Usa las versiones más estables y actualizadas disponibles
- Configurada para Clean Architecture (puedes expandir la estructura `src/` según necesites)
