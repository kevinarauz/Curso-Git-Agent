# 🎯 Git Training Portal

Portal web interactivo para aprender Git, GitLab y GitHub Desktop con teoría, ejercicios prácticos, gamificación y más.

## 🚀 Características

### 📚 Contenido Completo
- **24 Módulos** de aprendizaje estructurados
- **72 Ejercicios** prácticos e interactivos
- **150+ Términos** en el glosario técnico
- **Teoría y Práctica** balanceadas

### 🎮 Gamificación
- Sistema de **puntos y experiencia**
- **Badges y logros** desbloqueables
- **Progreso visual** de aprendizaje
- **Leaderboards** y competición

### 🛠️ Tecnologías
- **React 18** con TypeScript
- **Vite** para desarrollo rápido
- **Tailwind CSS** para estilos modernos
- **Lucide React** para iconografía
- **Context API** para estado global

### 📱 Características Técnicas
- **Responsive Design** (mobile-first)
- **Dark/Light Theme** 
- **PWA Ready** 
- **Offline Support**
- **Accesibilidad** (ARIA, semantic HTML)

## 📦 Instalación

### Requisitos Previos
- Node.js 18+ (recomendado: versión LTS)
- npm 8+ o yarn 1.22+
- Git instalado

### Instalación Paso a Paso

```bash
# Clonar el repositorio
git clone https://github.com/kevinarauz/Curso-Git-Agent.git

# Navegar al directorio
cd Curso-Git-Agent

# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev

# Construir para producción
npm run build

# Vista previa de producción
npm run preview
```

### Comandos Disponibles

```bash
# Desarrollo
npm run dev                    # Servidor de desarrollo con HMR
npm run dev:stable            # Servidor sin auto-refresh (puerto 5174)
npm run dev:static            # Servidor ultra estable (puerto 5175)

# Producción
npm run build                 # Construir para producción
npm run preview               # Vista previa de build

# Calidad de código
npm run lint                  # Revisar código con ESLint
npm run type-check           # Verificar tipos TypeScript (si disponible)
```

### Configuración de Desarrollo

#### Modos de Desarrollo
- **Modo estándar** (`npm run dev`): Con HMR y auto-refresh
- **Modo estable** (`npm run dev:stable`): Sin HMR, ideal para desarrollo constante
- **Modo estático** (`npm run dev:static`): Sin ningún tipo de refresh, máxima estabilidad

#### Variables de Entorno
Crea un archivo `.env.local` para configuraciones personales:

```env
# Configuración de IA (opcional)
VITE_OPENAI_API_KEY=tu_clave_aqui
VITE_GEMINI_API_KEY=tu_clave_aqui
```

## 🎨 Estructura del Proyecto

```
src/
├── components/          # Componentes reutilizables
│   ├── AIAssistant.tsx     # Asistente de IA
│   ├── AchievementsPage.tsx # Página de logros
│   ├── ExamenPage.tsx      # Página de examen
│   ├── ExercisesPage.tsx   # Página de ejercicios
│   ├── Footer.tsx          # Footer del sitio
│   ├── GamificationBar.tsx # Barra de gamificación
│   ├── GitManualPage.tsx   # Manual de Git
│   ├── GlossaryPage.tsx    # Glosario de términos
│   └── ToastContainer.tsx  # Notificaciones
├── contexts/           # Context providers
│   ├── GameContext.tsx     # Provider de gamificación
│   └── GameContextImpl.ts  # Implementación del contexto
├── data/              # Datos estáticos (glosario, módulos)
├── hooks/             # Custom hooks
│   ├── useGame.ts          # Hook del contexto de juego
│   └── usePreventAutoRefresh.ts # Hook anti-refresh
├── services/          # Servicios externos
│   ├── aiService.ts        # Servicio de IA
│   └── aiContinuationService.ts # Servicio de continuación
├── types/             # Definiciones TypeScript
├── utils/             # Utilidades y helpers
│   ├── autoRefreshDetector.ts # Detector de auto-refresh
│   └── gameUtils.ts        # Utilidades de gamificación
└── assets/            # Recursos estáticos
```

### Archivos de Configuración

```
├── eslint.config.js      # Configuración ESLint
├── postcss.config.js     # Configuración PostCSS
├── tailwind.config.js    # Configuración Tailwind
├── tsconfig.json         # Configuración TypeScript base
├── tsconfig.app.json     # Configuración TypeScript para app
├── tsconfig.node.json    # Configuración TypeScript para Node
├── vite.config.ts        # Configuración Vite principal
├── vite.config.stable.ts # Configuración Vite estable
└── vite.config.static.ts # Configuración Vite estática
```

## 🎯 Módulos de Aprendizaje

### 📖 Git Fundamentals
- Conceptos básicos de control de versiones
- Inicialización y configuración
- Staging area y commits
- Ramas y merging
- Resolución de conflictos

### 🦊 GitLab
- Interfaz y navegación
- Merge Requests
- CI/CD Pipelines
- GitLab Runner
- Issues y Project Management

### 🐙 GitHub Desktop
- Instalación y configuración
- Interfaz gráfica
- Workflows visuales
- Colaboración en equipo
- GitHub Integration

## 🏆 Sistema de Gamificación

### 🎖️ Badges Disponibles
- **First Steps**: Primer commit
- **Branch Master**: Crear primera rama
- **Conflict Resolver**: Resolver conflictos
- **CI/CD Hero**: Configurar pipeline
- **Code Reviewer**: Revisar Pull Requests

### 📊 Progreso
- **Niveles**: Basados en experiencia acumulada
- **Puntos**: Por completar módulos y ejercicios
- **Streaks**: Días consecutivos de actividad
- **Achievements**: Logros especiales

## 🎮 Ejercicios Interactivos

### 🖥️ Simulador de Terminal
- Comandos Git interactivos
- Feedback inmediato
- Hints y ayuda contextual
- Escenarios realistas

### 🧩 Quizzes y Desafíos
- Preguntas multiple choice
- Ejercicios de código
- Casos de uso prácticos
- Evaluación automática

## 🔧 Configuración de Desarrollo

### 📋 Requisitos del Sistema
- Node.js 18+ (recomendado: 20 LTS)
- npm 8+ o yarn 1.22+
- Git 2.30+
- Editor con soporte TypeScript (VS Code recomendado)

### 🚀 Scripts de Desarrollo
```bash
# Desarrollo
npm run dev          # Servidor de desarrollo estándar
npm run dev:stable   # Servidor sin HMR (puerto 5174)
npm run dev:static   # Servidor ultra estable (puerto 5175)

# Producción
npm run build        # Construir para producción
npm run preview      # Vista previa de build

# Calidad de código
npm run lint         # Revisar código con ESLint
npm run type-check   # Verificar tipos TypeScript
```

### 🛠️ Configuración del Editor

#### VS Code (Recomendado)
Instala las siguientes extensiones:
- ESLint
- TypeScript and JavaScript Language Features
- Tailwind CSS IntelliSense
- Auto Rename Tag
- Prettier

#### Configuración de ESLint
El proyecto usa ESLint con las siguientes reglas:
- TypeScript strict mode
- React hooks rules
- Unused variables con prefijo `_` permitidos
- React refresh compatible

### 🎨 Personalización de Tema
Edita `tailwind.config.js` para personalizar:
```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        'git-orange': '#F05032',
        'gitlab-orange': '#FC6D26',
        'github-dark': '#24292F',
        'primary': '#6366F1',
        'secondary': '#8B5CF6',
      }
    }
  }
}
```

### 🔍 Solución de Problemas

#### Problemas Comunes

**Error: Module not found**
```bash
# Limpiar caché y reinstalar
rm -rf node_modules package-lock.json
npm install
```

**Error: TypeScript compilation**
```bash
# Verificar tipos
npm run type-check
# o
npx tsc --noEmit
```

**Error: ESLint**
```bash
# Ejecutar lint con fix automático
npm run lint -- --fix
```

**Problemas de HMR/Auto-refresh**
```bash
# Usar modo estable
npm run dev:stable
# o modo estático
npm run dev:static
```

**Error: Port already in use**
```bash
# Matar proceso en puerto 5173
npx kill-port 5173
# o usar puerto alternativo
npm run dev:stable  # puerto 5174
npm run dev:static  # puerto 5175
```

### 🚨 Problemas Conocidos

1. **Vulnerabilidades de seguridad**: Hay 2 vulnerabilidades moderadas en dependencias de desarrollo (esbuild/vite). No afectan producción.

2. **Auto-refresh**: El proyecto incluye configuraciones especiales para evitar auto-refresh no deseado durante desarrollo.

3. **Tipos TypeScript**: Algunos tipos pueden requerir ajustes según la versión de las dependencias.
npm run type-check   # Verificación TypeScript
```

### 🎨 Personalización
Edita `tailwind.config.js` para personalizar:
- Colores del tema
- Fuentes
- Espaciado
- Breakpoints

## 🌐 Deployment

### 📡 Vercel (Recomendado)
```bash
npm install -g vercel
vercel deploy
```

### 🐳 Docker
```bash
docker build -t git-training-portal .
docker run -p 3000:3000 git-training-portal
```

### 📦 GitHub Pages
```bash
npm run build
npm run deploy
```

## 🤝 Contribución

### Proceso de Contribución

1. **Fork el proyecto** en GitHub
2. **Clona tu fork** localmente
   ```bash
   git clone https://github.com/tu-usuario/Curso-Git-Agent.git
   ```
3. **Crea una feature branch**
   ```bash
   git checkout -b feature/nueva-funcionalidad
   ```
4. **Realiza tus cambios** siguiendo las mejores prácticas:
   - Usa TypeScript estricto
   - Sigue las reglas de ESLint
   - Mantén los componentes pequeños y reutilizables
   - Añade comentarios para lógica compleja
   - Actualiza documentación si es necesario

5. **Prueba tus cambios**
   ```bash
   npm run lint        # Revisar código
   npm run build       # Verificar que compila
   npm run dev         # Probar funcionamiento
   ```

6. **Commit tus cambios**
   ```bash
   git add .
   git commit -m "feat: descripción clara del cambio"
   ```

7. **Push a tu branch**
   ```bash
   git push origin feature/nueva-funcionalidad
   ```

8. **Abre un Pull Request** con:
   - Título descriptivo
   - Descripción detallada de los cambios
   - Screenshots si hay cambios visuales
   - Referencia a issues relacionados

### 📝 Guías de Estilo

#### Código
- **TypeScript**: Usar tipos explícitos, evitar `any`
- **React**: Componentes funcionales con hooks
- **Tailwind CSS**: Clases utilitarias, evitar CSS personalizado
- **Naming**: camelCase para variables, PascalCase para componentes

#### Commits
Usa [Conventional Commits](https://www.conventionalcommits.org/):
```
feat: añade nueva funcionalidad
fix: corrige bug
docs: actualiza documentación
style: mejoras de estilo
refactor: refactorización de código
test: añade o modifica tests
```

### 🐛 Reportar Bugs

Usa GitHub Issues con la siguiente información:
- Descripción clara del problema
- Pasos para reproducir
- Comportamiento esperado vs actual
- Screenshots si aplica
- Información del sistema (OS, Node.js, navegador)

### 💡 Sugerir Mejoras

Para nuevas funcionalidades:
- Descripción clara de la funcionalidad
- Justificación del valor añadido
- Mockups o wireframes si aplica
- Consideraciones técnicas

## 🏗️ Arquitectura Técnica

### Stack Tecnológico
- **Frontend**: React 19 + TypeScript 5.8
- **Build Tool**: Vite 5.4
- **Styling**: Tailwind CSS 3.4
- **Icons**: Lucide React 0.525
- **State Management**: React Context API
- **Linting**: ESLint 9 + TypeScript ESLint
- **Package Manager**: npm

### Patrones de Diseño
- **Component-based Architecture**: Componentes reutilizables y modulares
- **Context Pattern**: Para estado global de gamificación
- **Custom Hooks**: Para lógica reutilizable
- **Service Layer**: Para APIs externas y lógica de negocio
- **Type-first Development**: TypeScript estricto en todo el proyecto

### Gamificación
- **Sistema de Puntos**: Basado en completar módulos y ejercicios
- **Badges**: Logros desbloqueables por hitos específicos
- **Niveles**: Progresión basada en experiencia acumulada
- **Persistencia**: localStorage para mantener progreso

### Características Técnicas
- **Responsive Design**: Mobile-first approach
- **Accessibility**: ARIA labels, semantic HTML
- **Performance**: Lazy loading, code splitting
- **Type Safety**: TypeScript estricto, sin `any`
- **Code Quality**: ESLint, Prettier, pre-commit hooks

## 📝 Roadmap

### 🎯 Próximas Características (v1.1)
- [ ] **Sistema de Tests**: Jest + React Testing Library
- [ ] **Modo Offline**: Service Worker para funcionalidad sin internet
- [ ] **Más Simuladores**: Terminal interactivo, Git flow visual
- [ ] **Exportar Progreso**: PDF con certificado de completación
- [ ] **Tema Oscuro**: Alternativa visual para usuarios

### 🚀 Mejoras Planificadas (v1.2)
- [ ] **Integración con APIs**: GitHub API para repositorios reales
- [ ] **Modo Multijugador**: Competencias y colaboración
- [ ] **Notificaciones**: Push notifications para recordatorios
- [ ] **Análisis Avanzado**: Métricas detalladas de progreso
- [ ] **Soporte i18n**: Múltiples idiomas (inglés, portugués)

### 🔮 Visión a Largo Plazo (v2.0)
- [ ] **Certificaciones**: Programa oficial de certificación
- [ ] **Integración LMS**: Compatibilidad con plataformas educativas
- [ ] **IA Personalizada**: Tutor inteligente adaptativo
- [ ] **Realidad Virtual**: Experiencias inmersivas de aprendizaje
- [ ] **Blockchain**: Credenciales verificables descentralizadas

### 🛠️ Mejoras Técnicas
- [ ] **Migración a Vite 7**: Resolver vulnerabilidades de seguridad
- [ ] **Optimización de Bundle**: Reducir tamaño final
- [ ] **Performance Monitoring**: Métricas de rendimiento
- [ ] **CI/CD Pipeline**: Automatización de despliegue
- [ ] **Docker Support**: Containerización para fácil despliegue
- [ ] Notificaciones push
- [ ] Análisis de progreso avanzado
- [ ] Integración con GitHub API
- [ ] Exportar progreso

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 🙏 Agradecimientos

- **Git Community** por la documentación
- **GitHub** por las herramientas
- **GitLab** por la plataforma
- **Lucide** por los iconos
- **Tailwind CSS** por los estilos

## 📞 Contacto

- **Email**: contact@git-training-portal.com
- **GitHub**: [@git-training-portal](https://github.com/git-training-portal)
- **Twitter**: [@GitTrainingPortal](https://twitter.com/GitTrainingPortal)

---

**¡Hecho con ❤️ para la comunidad de desarrolladores!**
