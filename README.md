# 🎯 Git Training Portal

Portal web interactivo para aprender Git, GitLab y GitHub Desktop con teoría, ejercicios prácticos, gamificación y más.

<!-- Updated: 18 de julio de 2025 -->

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

```bash
# Clonar el repositorio
git clone https://github.com/tu-usuario/git-training-portal.git

# Navegar al directorio
cd git-training-portal

# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev

# Construir para producción
npm run build
```

## 🎨 Estructura del Proyecto

```
src/
├── components/          # Componentes reutilizables
├── contexts/           # Context providers (GameContext, etc.)
├── data/              # Datos estáticos (glosario, módulos)
├── pages/             # Páginas principales
├── types/             # Definiciones TypeScript
├── utils/             # Utilidades y helpers
├── hooks/             # Custom hooks
└── styles/            # Estilos globales
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

### 📋 Requisitos
- Node.js 18+
- npm o yarn
- Git instalado

### 🚀 Scripts Disponibles
```bash
npm run dev          # Desarrollo
npm run build        # Producción
npm run preview      # Vista previa
npm run lint         # Linting
npm run test         # Tests
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

1. Fork el proyecto
2. Crea una feature branch (`git checkout -b feature/amazing-feature`)
3. Commit tus cambios (`git commit -m 'Add amazing feature'`)
4. Push a la branch (`git push origin feature/amazing-feature`)
5. Abre un Pull Request

## 📝 Roadmap

### 🎯 Próximas Características
- [ ] Modo multijugador
- [ ] Certificaciones
- [ ] Integración con APIs reales
- [ ] Más simuladores
- [ ] Soporte para más idiomas

### 🚀 Mejoras Planificadas
- [ ] Offline mode completo
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
