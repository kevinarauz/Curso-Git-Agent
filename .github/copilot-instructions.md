<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

# Portal de Capacitación Git - Copilot Instructions

## Descripción del Proyecto
Este es un portal web de capacitación completo para Git, GitLab y GitHub Desktop con:
- Módulos teóricos interactivos
- Ejercicios prácticos y simuladores
- Sistema de gamificación con puntos y badges
- Glosario técnico completo
- Interfaz moderna y responsiva

## Tecnologías Utilizadas
- **Frontend**: React + TypeScript + Vite
- **Estilos**: Tailwind CSS con tema personalizado
- **Estado**: Context API para gamificación
- **Iconos**: Lucide React

## Estructura del Proyecto
- `/src/components/`: Componentes reutilizables
- `/src/pages/`: Páginas principales
- `/src/contexts/`: Context providers
- `/src/data/`: Datos estáticos (glosario, ejercicios)
- `/src/types/`: Definiciones de tipos TypeScript
- `/src/utils/`: Utilidades y helpers

## Instrucciones de Desarrollo
- Usar TypeScript estricto
- Componentes funcionales con hooks
- Tailwind CSS para estilos
- Responsive design (mobile-first)
- Accesibilidad (ARIA labels, semantic HTML)
- Optimizar performance (lazy loading, memoización)

## Gamificación
- Sistema de puntos por completar módulos
- Badges por logros específicos
- Progreso persistente en localStorage
- Leaderboard y estadísticas

## Colores del Tema
- Git Orange: #F05032
- GitLab Orange: #FC6D26
- GitHub Dark: #24292F
- Primary: #6366F1
- Secondary: #8B5CF6
