# 🤝 Guía de Contribución

¡Gracias por tu interés en contribuir al Git Training Portal! Esta guía te ayudará a hacer contribuciones efectivas y mantener la calidad del proyecto.

## 📋 Tabla de Contenidos

- [Código de Conducta](#código-de-conducta)
- [Formas de Contribuir](#formas-de-contribuir)
- [Configuración del Entorno](#configuración-del-entorno)
- [Proceso de Desarrollo](#proceso-de-desarrollo)
- [Estándares de Código](#estándares-de-código)
- [Pruebas](#pruebas)
- [Documentación](#documentación)
- [Pull Requests](#pull-requests)
- [Reportar Issues](#reportar-issues)

## 📜 Código de Conducta

Este proyecto sigue un código de conducta que garantiza un ambiente inclusivo y respetuoso:

- **Sé respetuoso**: Trata a todos con cortesía y profesionalismo
- **Sé inclusivo**: Valora la diversidad de perspectivas y experiencias
- **Sé constructivo**: Ofrece retroalimentación útil y específica
- **Sé paciente**: Recuerda que todos estamos aprendiendo

## 🚀 Formas de Contribuir

### 1. Reportar Bugs
- Busca si el bug ya fue reportado
- Usa el template de issue para bugs
- Incluye pasos para reproducir
- Proporciona información del sistema

### 2. Sugerir Mejoras
- Verifica que la mejora no esté en el roadmap
- Describe claramente el problema que resuelve
- Proporciona ejemplos de uso
- Considera la compatibilidad con la arquitectura actual

### 3. Contribuir Código
- Corregir bugs existentes
- Implementar nuevas características
- Mejorar la documentación
- Optimizar el rendimiento

### 4. Mejorar Documentación
- Actualizar README.md
- Añadir comentarios en código
- Crear guías de usuario
- Traducir contenido

## 🛠️ Configuración del Entorno

### Requisitos Previos

```bash
# Versiones requeridas
Node.js >= 18.0.0
npm >= 8.0.0
Git >= 2.30.0
```

### Instalación

```bash
# 1. Fork el repositorio en GitHub
# 2. Clona tu fork
git clone https://github.com/tu-usuario/Curso-Git-Agent.git
cd Curso-Git-Agent

# 3. Instala dependencias
npm install

# 4. Configura tu fork
git remote add upstream https://github.com/kevinarauz/Curso-Git-Agent.git

# 5. Verifica la instalación
npm run dev
```

### Configuración del Editor

#### VS Code (Recomendado)
Instala estas extensiones:
- ESLint
- TypeScript and JavaScript Language Features
- Tailwind CSS IntelliSense
- Auto Rename Tag
- GitLens

#### Configuración automática
```bash
# Configura ESLint y Prettier
npm run lint -- --fix
```

## 🔄 Proceso de Desarrollo

### 1. Preparación
```bash
# Mantén tu fork actualizado
git checkout main
git pull upstream main
git push origin main

# Crea una nueva branch
git checkout -b feature/nombre-descriptivo
```

### 2. Desarrollo
```bash
# Ejecuta en modo desarrollo
npm run dev

# Para desarrollo sin auto-refresh
npm run dev:stable
```

### 3. Verificación
```bash
# Lint del código
npm run lint

# Verificar tipos
npm run build

# Pruebas manuales
npm run preview
```

### 4. Commit
```bash
# Añade cambios
git add .

# Commit con mensaje descriptivo
git commit -m "feat: añade nueva funcionalidad de ejercicios"

# Push a tu branch
git push origin feature/nombre-descriptivo
```

## 📏 Estándares de Código

### TypeScript
- **Tipos explícitos**: Evita `any`, usa tipos específicos
- **Interfaces**: Define interfaces para objetos complejos
- **Enums**: Usa enums para constantes relacionadas
- **Generics**: Usa generics para código reutilizable

```typescript
// ✅ Bueno
interface User {
  id: string;
  name: string;
  level: number;
}

// ❌ Malo
const user: any = { id: 1, name: "Juan" };
```

### React
- **Componentes funcionales**: Usa hooks en lugar de clases
- **Props tipadas**: Define interfaces para props
- **Hooks personalizados**: Extrae lógica reutilizable
- **Memoización**: Usa React.memo para optimización

```tsx
// ✅ Bueno
interface ButtonProps {
  onClick: () => void;
  disabled?: boolean;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ onClick, disabled, children }) => {
  return (
    <button onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
};
```

### Tailwind CSS
- **Clases utilitarias**: Usa clases de Tailwind en lugar de CSS personalizado
- **Responsive design**: Usa prefijos responsive (sm:, md:, lg:)
- **Consistencia**: Usa variables CSS para colores personalizados
- **Componentes**: Agrupa clases relacionadas

```tsx
// ✅ Bueno
<button className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors">
  Botón
</button>

// ❌ Malo - CSS personalizado innecesario
<button style={{backgroundColor: '#6366F1', color: 'white'}}>
  Botón
</button>
```

### Convenciones de Nomenclatura
- **Archivos**: PascalCase para componentes, camelCase para utilidades
- **Variables**: camelCase
- **Constantes**: UPPER_SNAKE_CASE
- **Componentes**: PascalCase
- **Hooks**: camelCase con prefijo `use`

## 🧪 Pruebas

### Pruebas Manuales
```bash
# Ejecuta la aplicación
npm run dev

# Prueba diferentes escenarios:
# - Navegación entre páginas
# - Funcionalidades de gamificación
# - Responsive design
# - Accesibilidad
```

### Lista de Verificación
- [ ] La aplicación se carga sin errores
- [ ] La navegación funciona correctamente
- [ ] Los componentes son responsive
- [ ] No hay errores en la consola
- [ ] El código pasa el linting
- [ ] La build se genera correctamente

## 📚 Documentación

### Comentarios en Código
```typescript
/**
 * Calcula el progreso del nivel basado en experiencia
 * @param currentExperience - Experiencia actual del usuario
 * @param experienceToNextLevel - Experiencia necesaria para el siguiente nivel
 * @returns Porcentaje de progreso (0-100)
 */
const calculateLevelProgress = (
  currentExperience: number, 
  experienceToNextLevel: number
): number => {
  return Math.floor((currentExperience / experienceToNextLevel) * 100);
};
```

### JSDoc para Componentes
```tsx
/**
 * Componente de botón reutilizable
 * @param onClick - Función llamada al hacer clic
 * @param disabled - Si el botón está deshabilitado
 * @param children - Contenido del botón
 */
const Button: React.FC<ButtonProps> = ({ onClick, disabled, children }) => {
  // ...
};
```

## 🔄 Pull Requests

### Antes de Enviar
- [ ] Tu código pasa `npm run lint`
- [ ] Tu código compila sin errores (`npm run build`)
- [ ] Has probado los cambios manualmente
- [ ] Has actualizado la documentación si es necesario
- [ ] Tu branch está actualizada con main

### Template de PR
```markdown
## Descripción
Descripción clara de los cambios realizados.

## Tipo de Cambio
- [ ] Bug fix
- [ ] Nueva funcionalidad
- [ ] Mejora de rendimiento
- [ ] Documentación
- [ ] Refactoring

## Pruebas
- [ ] Pruebas manuales realizadas
- [ ] Funciona en desktop
- [ ] Funciona en mobile
- [ ] No hay errores en consola

## Screenshots
[Incluir capturas de pantalla si hay cambios visuales]

## Notas Adicionales
Cualquier información adicional relevante.
```

## 🐛 Reportar Issues

### Template de Bug
```markdown
## Descripción del Bug
Descripción clara del problema.

## Pasos para Reproducir
1. Ir a '...'
2. Hacer clic en '...'
3. Scroll hasta '...'
4. Ver error

## Comportamiento Esperado
Lo que debería pasar.

## Comportamiento Actual
Lo que pasa actualmente.

## Screenshots
[Capturas de pantalla del error]

## Información del Sistema
- OS: [ej. Windows 10]
- Navegador: [ej. Chrome 91]
- Versión de Node.js: [ej. 18.15.0]
```

### Template de Feature Request
```markdown
## Funcionalidad Solicitada
Descripción clara de la nueva funcionalidad.

## Problema que Resuelve
Explica qué problema resuelve esta funcionalidad.

## Solución Propuesta
Descripción de cómo debería funcionar.

## Alternativas Consideradas
Otras soluciones que has considerado.

## Información Adicional
Cualquier otra información relevante.
```

## 🎯 Guías Específicas

### Añadir Nuevos Ejercicios
1. Crear el ejercicio en `src/data/exercises.ts`
2. Definir la interfaz en `src/types/index.ts`
3. Implementar la lógica en el componente
4. Añadir pruebas manuales
5. Documentar el ejercicio

### Modificar Gamificación
1. Actualizar `src/contexts/GameContext.tsx`
2. Modificar tipos en `src/types/index.ts`
3. Actualizar componentes relacionados
4. Probar persistencia en localStorage
5. Verificar que no rompe el estado existente

### Añadir Nuevas Páginas
1. Crear componente en `src/components/`
2. Añadir ruta en `src/App.tsx`
3. Actualizar navegación
4. Añadir a las pruebas manuales
5. Documentar la nueva página

## 🆘 Obtener Ayuda

- **GitHub Issues**: Para bugs y preguntas técnicas
- **GitHub Discussions**: Para ideas y discusiones generales
- **Email**: Para comunicación directa con mantenedores

## 🙏 Reconocimiento

Todos los contribuidores serán reconocidos en:
- README.md del proyecto
- Página de créditos de la aplicación
- Releases notes correspondientes

¡Gracias por contribuir al Git Training Portal! 🚀