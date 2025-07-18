# 🚀 Guía de Desarrollo Rápido

Esta guía te ayudará a empezar a desarrollar en el Git Training Portal rápidamente.

## ⚡ Inicio Rápido

```bash
# Clona el repositorio
git clone https://github.com/kevinarauz/Curso-Git-Agent.git
cd Curso-Git-Agent

# Instala dependencias
npm install

# Inicia el servidor de desarrollo
npm run dev
```

## 🛠️ Comandos Útiles

### Desarrollo
```bash
npm run dev              # Desarrollo estándar (puerto 5173)
npm run dev:stable       # Sin auto-refresh (puerto 5174)
npm run dev:static       # Ultra estable (puerto 5175)
```

### Calidad de Código
```bash
npm run lint             # Revisar código
npm run lint:fix         # Corregir errores automáticamente
npm run type-check       # Verificar tipos TypeScript
npm run validate         # Ejecutar todas las validaciones
```

### Build
```bash
npm run build            # Construir para producción
npm run preview          # Vista previa del build
npm run clean            # Limpiar archivos generados
```

## 📁 Estructura Clave

```
src/
├── components/         # Componentes React
├── contexts/          # Context providers
├── hooks/            # Custom hooks
├── services/         # Lógica de negocio
├── types/           # Tipos TypeScript
└── utils/          # Utilidades
```

## 🎯 Flujo de Desarrollo

### 1. Crear Feature Branch
```bash
git checkout -b feature/mi-nueva-funcionalidad
```

### 2. Desarrollar
```bash
# Ejecutar en modo de desarrollo
npm run dev:stable

# Hacer cambios...
# Verificar tipos
npm run type-check

# Corregir linting
npm run lint:fix
```

### 3. Validar
```bash
# Ejecutar todas las validaciones
npm run validate
```

### 4. Commit y Push
```bash
git add .
git commit -m "feat: descripción del cambio"
git push origin feature/mi-nueva-funcionalidad
```

## 🔧 Configuración IDE

### VS Code
- Abre el archivo `.vscode/settings.json` para configuración automática
- Instala las extensiones recomendadas
- Usa `Ctrl+Shift+P` > "TypeScript: Restart TS Server" si hay problemas

### Debugging
- Usa `F5` para iniciar debugging en Chrome
- Configura breakpoints en el código TypeScript
- Usa `npm run dev:stable` para debugging más estable

## 🧩 Patrones Comunes

### Crear un Componente
```tsx
// src/components/MiComponente.tsx
import React from 'react';

interface MiComponenteProps {
  texto: string;
  onClick?: () => void;
}

const MiComponente: React.FC<MiComponenteProps> = ({ texto, onClick }) => {
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <p className="text-gray-800">{texto}</p>
      {onClick && (
        <button 
          onClick={onClick}
          className="mt-2 px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark"
        >
          Acción
        </button>
      )}
    </div>
  );
};

export default MiComponente;
```

### Usar el Hook de Gamificación
```tsx
import { useGame } from '../hooks/useGame';

const MiComponente = () => {
  const { addPoints, unlockBadge, user } = useGame();

  const handleAction = () => {
    addPoints(50);
    unlockBadge({
      id: 'mi-badge',
      name: 'Mi Badge',
      description: 'Descripción',
      icon: '🏆'
    });
  };

  return (
    <div>
      <p>Puntos: {user.totalPoints}</p>
      <button onClick={handleAction}>Ganar Puntos</button>
    </div>
  );
};
```

### Crear un Hook Personalizado
```tsx
// src/hooks/useMiHook.ts
import { useState, useEffect } from 'react';

export const useMiHook = (parametro: string) => {
  const [estado, setEstado] = useState<string>('');

  useEffect(() => {
    // Lógica del hook
    setEstado(parametro);
  }, [parametro]);

  return { estado, setEstado };
};
```

## 🎨 Styling con Tailwind

### Clases Comunes
```tsx
// Botones
<button className="btn btn-primary">Botón Principal</button>
<button className="btn btn-secondary">Botón Secundario</button>

// Cards
<div className="card">
  <div className="card-body">
    <h3 className="card-title">Título</h3>
    <p className="text-gray-600">Contenido</p>
  </div>
</div>

// Layout
<div className="container mx-auto px-4">
  <div className="grid md:grid-cols-2 gap-6">
    {/* Contenido */}
  </div>
</div>
```

### Colores del Tema
```tsx
// Colores principales
className="bg-primary text-white"      // Azul principal
className="bg-secondary text-white"    // Púrpura secundario
className="bg-git-orange text-white"   // Naranja Git
className="bg-gitlab-orange text-white" // Naranja GitLab
className="bg-github-dark text-white"  // Gris oscuro GitHub
```

## 🐛 Debugging

### Problemas Comunes
1. **Error de compilación**: Ejecutar `npm run type-check`
2. **Error de linting**: Ejecutar `npm run lint:fix`
3. **Puerto ocupado**: Usar `npm run dev:stable` o `npm run dev:static`
4. **Problemas de caché**: Ejecutar `npm run clean && npm install`

### Herramientas de Debug
```bash
# Verificar estado del proyecto
npm run validate

# Limpiar y reinstalar
npm run clean
npm install

# Verificar dependencias
npm run check-deps
```

## 📊 Métricas de Desarrollo

### Performance
- Bundle size: ~420KB (comprimido ~111KB)
- Build time: ~4 segundos
- Dev server startup: ~265ms

### Calidad de Código
- TypeScript: 100% tipado (sin `any`)
- ESLint: 0 errores, 1 warning
- Componentes: 10 principales
- Hooks: 2 personalizados

## 🚀 Próximos Pasos

1. **Familiarízate** con la estructura del proyecto
2. **Ejecuta** los comandos de desarrollo
3. **Explora** los componentes existentes
4. **Prueba** crear un componente simple
5. **Lee** la documentación completa en README.md

## 🆘 Obtener Ayuda

- **GitHub Issues**: Para reportar bugs
- **CONTRIBUTING.md**: Guía detallada de contribución
- **README.md**: Documentación completa
- **Código**: Comentarios inline en archivos complejos

¡Listo para empezar! 🎉