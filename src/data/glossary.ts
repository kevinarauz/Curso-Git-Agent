import { GlossaryTerm } from '../types';

export const glossaryTerms: GlossaryTerm[] = [
  // Términos básicos de Git
  {
    id: 'git-001',
    term: 'Git',
    definition: 'Sistema de control de versiones distribuido gratuito y de código abierto diseñado para manejar todo, desde proyectos pequeños hasta muy grandes con velocidad y eficiencia.',
    category: 'git',
    relatedTerms: ['repository', 'commit', 'branch', 'merge'],
    examples: ['git init', 'git clone', 'git status'],
    difficulty: 'beginner',
  },
  {
    id: 'git-002',
    term: 'Repository (Repositorio)',
    definition: 'Una colección de archivos y carpetas junto con el historial de cambios de cada archivo. Es donde Git almacena todos los metadatos y el historial de un proyecto.',
    category: 'git',
    relatedTerms: ['git', 'commit', 'branch', 'clone'],
    examples: ['git init', 'git clone https://github.com/user/repo.git'],
    difficulty: 'beginner',
  },
  {
    id: 'git-003',
    term: 'Commit',
    definition: 'Un snapshot (instantánea) de los cambios en el repositorio en un momento específico. Cada commit tiene un hash único y contiene metadatos como autor, fecha y mensaje.',
    category: 'git',
    relatedTerms: ['hash', 'staging', 'push', 'pull'],
    examples: ['git commit -m "Agregar nueva funcionalidad"', 'git commit -a'],
    difficulty: 'beginner',
  },
  {
    id: 'git-004',
    term: 'Branch (Rama)',
    definition: 'Una línea independiente de desarrollo que permite trabajar en diferentes funcionalidades sin afectar la rama principal. Es una referencia móvil a un commit específico.',
    category: 'git',
    relatedTerms: ['merge', 'checkout', 'master', 'main'],
    examples: ['git branch nueva-funcionalidad', 'git checkout -b feature/login'],
    difficulty: 'beginner',
  },
  {
    id: 'git-005',
    term: 'Merge',
    definition: 'El proceso de combinar los cambios de una rama en otra. Git intentará fusionar automáticamente los cambios, pero puede requerir resolución manual de conflictos.',
    category: 'git',
    relatedTerms: ['branch', 'conflict', 'pull-request', 'fast-forward'],
    examples: ['git merge feature-branch', 'git merge --no-ff'],
    difficulty: 'intermediate',
  },
  {
    id: 'git-006',
    term: 'Clone',
    definition: 'Crear una copia local de un repositorio remoto, incluyendo todo el historial de commits, ramas y archivos.',
    category: 'git',
    relatedTerms: ['repository', 'remote', 'fetch', 'pull'],
    examples: ['git clone https://github.com/user/repo.git', 'git clone --depth 1 repo.git'],
    difficulty: 'beginner',
  },
  {
    id: 'git-007',
    term: 'Push',
    definition: 'Enviar commits locales a un repositorio remoto, actualizando la rama remota con los cambios locales.',
    category: 'git',
    relatedTerms: ['pull', 'remote', 'origin', 'upstream'],
    examples: ['git push origin main', 'git push -u origin nueva-rama'],
    difficulty: 'beginner',
  },
  {
    id: 'git-008',
    term: 'Pull',
    definition: 'Descargar y fusionar cambios de un repositorio remoto a la rama local actual. Equivale a git fetch seguido de git merge.',
    category: 'git',
    relatedTerms: ['fetch', 'merge', 'rebase', 'origin'],
    examples: ['git pull origin main', 'git pull --rebase'],
    difficulty: 'beginner',
  },
  {
    id: 'git-009',
    term: 'Staging Area (Área de Preparación)',
    definition: 'Un área intermedia donde se preparan los cambios antes de hacer un commit. También conocida como "index".',
    category: 'git',
    relatedTerms: ['add', 'commit', 'working-directory', 'index'],
    examples: ['git add archivo.txt', 'git add .', 'git reset HEAD archivo.txt'],
    difficulty: 'beginner',
  },
  {
    id: 'git-010',
    term: 'Working Directory (Directorio de Trabajo)',
    definition: 'El directorio donde tienes los archivos de tu proyecto. Es donde haces cambios antes de agregarlos al staging area.',
    category: 'git',
    relatedTerms: ['staging', 'commit', 'status', 'diff'],
    examples: ['git status', 'git diff', 'git checkout -- archivo.txt'],
    difficulty: 'beginner',
  },
  {
    id: 'git-011',
    term: 'Remote (Remoto)',
    definition: 'Una versión de tu repositorio hospedada en otro lugar (como GitHub, GitLab). Permite colaboración y backup.',
    category: 'git',
    relatedTerms: ['origin', 'upstream', 'push', 'pull'],
    examples: ['git remote add origin https://github.com/user/repo.git', 'git remote -v'],
    difficulty: 'beginner',
  },
  {
    id: 'git-012',
    term: 'Origin',
    definition: 'El nombre por defecto del repositorio remoto principal de donde se clonó el proyecto.',
    category: 'git',
    relatedTerms: ['remote', 'clone', 'push', 'pull'],
    examples: ['git push origin main', 'git pull origin development'],
    difficulty: 'beginner',
  },
  {
    id: 'git-013',
    term: 'HEAD',
    definition: 'Un puntero que indica el commit actual en el que estás trabajando. Generalmente apunta al último commit de la rama actual.',
    category: 'git',
    relatedTerms: ['commit', 'branch', 'checkout', 'reset'],
    examples: ['git reset HEAD~1', 'git checkout HEAD~2'],
    difficulty: 'intermediate',
  },
  {
    id: 'git-014',
    term: 'Hash (SHA)',
    definition: 'Un identificador único de 40 caracteres hexadecimales que Git genera para cada commit, árbol y blob.',
    category: 'git',
    relatedTerms: ['commit', 'object', 'blob', 'tree'],
    examples: ['git log --oneline', 'git show a1b2c3d4'],
    difficulty: 'intermediate',
  },
  {
    id: 'git-015',
    term: 'Conflict (Conflicto)',
    definition: 'Ocurre cuando Git no puede fusionar automáticamente los cambios de diferentes ramas debido a modificaciones en las mismas líneas.',
    category: 'git',
    relatedTerms: ['merge', 'rebase', 'resolution', 'marker'],
    examples: ['git status', 'git merge --abort', 'git add conflicted-file.txt'],
    difficulty: 'intermediate',
  },

  // Términos avanzados de Git
  {
    id: 'git-016',
    term: 'Rebase',
    definition: 'Proceso de mover o combinar una secuencia de commits a un nuevo commit base, creando un historial linear.',
    category: 'git',
    relatedTerms: ['merge', 'interactive', 'squash', 'cherry-pick'],
    examples: ['git rebase main', 'git rebase -i HEAD~3'],
    difficulty: 'advanced',
  },
  {
    id: 'git-017',
    term: 'Stash',
    definition: 'Almacenar temporalmente cambios no confirmados para poder cambiar de rama sin hacer commit.',
    category: 'git',
    relatedTerms: ['pop', 'apply', 'list', 'drop'],
    examples: ['git stash', 'git stash pop', 'git stash apply stash@{1}'],
    difficulty: 'intermediate',
  },
  {
    id: 'git-018',
    term: 'Cherry-pick',
    definition: 'Aplicar los cambios de un commit específico de una rama a otra rama.',
    category: 'git',
    relatedTerms: ['rebase', 'merge', 'commit', 'hash'],
    examples: ['git cherry-pick a1b2c3d4', 'git cherry-pick -n commit-hash'],
    difficulty: 'advanced',
  },
  {
    id: 'git-019',
    term: 'Squash',
    definition: 'Combinar múltiples commits en un solo commit, típicamente usado durante rebase interactivo.',
    category: 'git',
    relatedTerms: ['rebase', 'interactive', 'merge', 'history'],
    examples: ['git rebase -i HEAD~3', 'git merge --squash feature-branch'],
    difficulty: 'advanced',
  },
  {
    id: 'git-020',
    term: 'Submodule',
    definition: 'Una forma de incluir un repositorio Git como subdirectorio de otro repositorio Git.',
    category: 'git',
    relatedTerms: ['subtree', 'repository', 'dependency', 'nested'],
    examples: ['git submodule add https://github.com/user/lib.git lib', 'git submodule update'],
    difficulty: 'advanced',
  },

  // Términos de GitHub
  {
    id: 'github-001',
    term: 'GitHub',
    definition: 'Plataforma de desarrollo colaborativo que usa Git para el control de versiones, con funcionalidades adicionales como issues, pull requests y GitHub Actions.',
    category: 'github',
    relatedTerms: ['git', 'repository', 'pull-request', 'actions'],
    examples: ['github.com/user/repo', 'GitHub Desktop', 'GitHub CLI'],
    difficulty: 'beginner',
  },
  {
    id: 'github-002',
    term: 'Pull Request (PR)',
    definition: 'Una solicitud para fusionar cambios de una rama en otra, permitiendo revisión de código y discusión antes de la fusión.',
    category: 'github',
    relatedTerms: ['merge', 'review', 'branch', 'fork'],
    examples: ['Crear PR desde feature-branch hacia main', 'Revisar y aprobar PR'],
    difficulty: 'beginner',
  },
  {
    id: 'github-003',
    term: 'Fork',
    definition: 'Crear una copia personal de un repositorio de otro usuario en tu cuenta de GitHub.',
    category: 'github',
    relatedTerms: ['pull-request', 'upstream', 'clone', 'contribution'],
    examples: ['Fork repository', 'git remote add upstream original-repo'],
    difficulty: 'beginner',
  },
  {
    id: 'github-004',
    term: 'Issues',
    definition: 'Sistema de seguimiento de tareas, errores, mejoras y otras solicitudes para un repositorio.',
    category: 'github',
    relatedTerms: ['bug', 'feature', 'milestone', 'label'],
    examples: ['Crear issue para reportar bug', 'Asignar issue a desarrollador'],
    difficulty: 'beginner',
  },
  {
    id: 'github-005',
    term: 'GitHub Actions',
    definition: 'Plataforma de integración y despliegue continuo (CI/CD) que permite automatizar flujos de trabajo.',
    category: 'github',
    relatedTerms: ['workflow', 'yaml', 'runner', 'automation'],
    examples: ['workflow de testing', 'deployment automation'],
    difficulty: 'intermediate',
  },
  {
    id: 'github-006',
    term: 'Repository Settings',
    definition: 'Configuraciones del repositorio incluyendo colaboradores, ramas protegidas, webhooks y más.',
    category: 'github',
    relatedTerms: ['collaborators', 'branches', 'protection', 'webhooks'],
    examples: ['Agregar colaboradores', 'Proteger rama main'],
    difficulty: 'intermediate',
  },
  {
    id: 'github-007',
    term: 'GitHub Desktop',
    definition: 'Aplicación gráfica oficial de GitHub para gestionar repositorios Git de forma visual.',
    category: 'github',
    relatedTerms: ['gui', 'visual', 'clone', 'commit'],
    examples: ['Clone repository', 'Visual commit history'],
    difficulty: 'beginner',
  },
  {
    id: 'github-008',
    term: 'Release',
    definition: 'Versión empaquetada de software que se puede descargar, con notas de versión y archivos binarios.',
    category: 'github',
    relatedTerms: ['tag', 'version', 'changelog', 'assets'],
    examples: ['Create release v1.0.0', 'Upload release assets'],
    difficulty: 'intermediate',
  },
  {
    id: 'github-009',
    term: 'Gist',
    definition: 'Fragmentos de código o archivos que se pueden compartir públicamente o de forma privada.',
    category: 'github',
    relatedTerms: ['snippet', 'share', 'embed', 'revision'],
    examples: ['Compartir código snippet', 'Crear gist privado'],
    difficulty: 'beginner',
  },
  {
    id: 'github-010',
    term: 'Organization',
    definition: 'Cuenta compartida donde múltiples usuarios pueden colaborar en repositorios con permisos granulares.',
    category: 'github',
    relatedTerms: ['team', 'permissions', 'members', 'billing'],
    examples: ['Crear organización', 'Invite team members'],
    difficulty: 'intermediate',
  },

  // Términos de GitLab
  {
    id: 'gitlab-001',
    term: 'GitLab',
    definition: 'Plataforma DevOps completa que proporciona un repositorio Git con funcionalidades de CI/CD, monitoreo y más.',
    category: 'gitlab',
    relatedTerms: ['devops', 'cicd', 'repository', 'pipeline'],
    examples: ['GitLab.com', 'GitLab self-hosted', 'GitLab Runner'],
    difficulty: 'beginner',
  },
  {
    id: 'gitlab-002',
    term: 'Merge Request (MR)',
    definition: 'Equivalente al Pull Request de GitHub, solicitud para fusionar cambios con revisión de código.',
    category: 'gitlab',
    relatedTerms: ['merge', 'review', 'approval', 'pipeline'],
    examples: ['Crear MR', 'Approve merge request'],
    difficulty: 'beginner',
  },
  {
    id: 'gitlab-003',
    term: 'Pipeline',
    definition: 'Conjunto de jobs que se ejecutan en etapas para construir, probar y desplegar código automáticamente.',
    category: 'gitlab',
    relatedTerms: ['cicd', 'job', 'stage', 'runner'],
    examples: ['CI pipeline', 'Deploy pipeline'],
    difficulty: 'intermediate',
  },
  {
    id: 'gitlab-004',
    term: 'GitLab Runner',
    definition: 'Aplicación que ejecuta jobs en pipelines de GitLab CI/CD.',
    category: 'gitlab',
    relatedTerms: ['pipeline', 'executor', 'job', 'docker'],
    examples: ['Register runner', 'Docker executor'],
    difficulty: 'intermediate',
  },
  {
    id: 'gitlab-005',
    term: 'Project',
    definition: 'En GitLab, un proyecto contiene el repositorio, issues, merge requests, CI/CD y otras funcionalidades.',
    category: 'gitlab',
    relatedTerms: ['repository', 'namespace', 'group', 'settings'],
    examples: ['Create project', 'Project settings'],
    difficulty: 'beginner',
  },
  {
    id: 'gitlab-006',
    term: 'Group',
    definition: 'Colección de proyectos y usuarios que permite organizar y gestionar permisos a nivel grupal.',
    category: 'gitlab',
    relatedTerms: ['project', 'namespace', 'permissions', 'subgroup'],
    examples: ['Create group', 'Group permissions'],
    difficulty: 'intermediate',
  },
  {
    id: 'gitlab-007',
    term: 'Issue Board',
    definition: 'Herramienta tipo Kanban para gestionar issues y workflows de desarrollo.',
    category: 'gitlab',
    relatedTerms: ['kanban', 'issue', 'workflow', 'milestone'],
    examples: ['Issue board', 'Kanban workflow'],
    difficulty: 'intermediate',
  },
  {
    id: 'gitlab-008',
    term: 'Container Registry',
    definition: 'Registro integrado para almacenar y gestionar imágenes de Docker containers.',
    category: 'gitlab',
    relatedTerms: ['docker', 'image', 'container', 'registry'],
    examples: ['Push Docker image', 'Pull from registry'],
    difficulty: 'advanced',
  },
  {
    id: 'gitlab-009',
    term: 'Wiki',
    definition: 'Sistema de documentación colaborativa integrado en cada proyecto de GitLab.',
    category: 'gitlab',
    relatedTerms: ['documentation', 'markdown', 'collaboration', 'pages'],
    examples: ['Create wiki page', 'Edit documentation'],
    difficulty: 'beginner',
  },
  {
    id: 'gitlab-010',
    term: 'Snippets',
    definition: 'Fragmentos de código que se pueden compartir, similar a GitHub Gist.',
    category: 'gitlab',
    relatedTerms: ['code', 'share', 'snippet', 'visibility'],
    examples: ['Create snippet', 'Share code snippet'],
    difficulty: 'beginner',
  },

  // Términos generales
  {
    id: 'general-001',
    term: 'Version Control',
    definition: 'Sistema para rastrear cambios en archivos a lo largo del tiempo, permitiendo recuperar versiones anteriores.',
    category: 'general',
    relatedTerms: ['git', 'svn', 'history', 'backup'],
    examples: ['Git version control', 'SVN system'],
    difficulty: 'beginner',
  },
  {
    id: 'general-002',
    term: 'Distributed Version Control',
    definition: 'Sistema donde cada desarrollador tiene una copia completa del historial del proyecto.',
    category: 'general',
    relatedTerms: ['git', 'mercurial', 'decentralized', 'backup'],
    examples: ['Git distributed system', 'Local repository'],
    difficulty: 'intermediate',
  },
  {
    id: 'general-003',
    term: 'Centralized Version Control',
    definition: 'Sistema donde existe un servidor central que contiene todas las versiones del proyecto.',
    category: 'general',
    relatedTerms: ['svn', 'cvs', 'server', 'checkout'],
    examples: ['SVN centralized system', 'CVS repository'],
    difficulty: 'intermediate',
  },
  {
    id: 'general-004',
    term: 'DevOps',
    definition: 'Práctica que combina desarrollo (Dev) y operaciones (Ops) para mejorar la colaboración y productividad.',
    category: 'general',
    relatedTerms: ['cicd', 'automation', 'deployment', 'monitoring'],
    examples: ['DevOps pipeline', 'Continuous integration'],
    difficulty: 'intermediate',
  },
  {
    id: 'general-005',
    term: 'CI/CD',
    definition: 'Integración Continua y Despliegue Continuo - prácticas para automatizar testing y deployment.',
    category: 'general',
    relatedTerms: ['pipeline', 'automation', 'testing', 'deployment'],
    examples: ['CI pipeline', 'CD deployment'],
    difficulty: 'intermediate',
  },
  {
    id: 'general-006',
    term: 'Code Review',
    definition: 'Proceso de examinar código escrito por otros desarrolladores para encontrar errores y mejorar la calidad.',
    category: 'general',
    relatedTerms: ['pull-request', 'quality', 'feedback', 'collaboration'],
    examples: ['PR review', 'Code quality check'],
    difficulty: 'beginner',
  },
  {
    id: 'general-007',
    term: 'Workflow',
    definition: 'Secuencia de pasos y procesos que los desarrolladores siguen para completar tareas.',
    category: 'general',
    relatedTerms: ['process', 'methodology', 'steps', 'automation'],
    examples: ['Git workflow', 'Development workflow'],
    difficulty: 'beginner',
  },
  {
    id: 'general-008',
    term: 'Agile',
    definition: 'Metodología de desarrollo que enfatiza la colaboración, respuesta al cambio y entrega incremental.',
    category: 'general',
    relatedTerms: ['scrum', 'iterative', 'collaboration', 'sprint'],
    examples: ['Agile methodology', 'Scrum framework'],
    difficulty: 'intermediate',
  },
  {
    id: 'general-009',
    term: 'Open Source',
    definition: 'Software cuyo código fuente está disponible públicamente para ser usado, modificado y distribuido.',
    category: 'general',
    relatedTerms: ['license', 'contribution', 'community', 'github'],
    examples: ['Open source project', 'MIT license'],
    difficulty: 'beginner',
  },
  {
    id: 'general-010',
    term: 'README',
    definition: 'Archivo de documentación que proporciona información sobre el proyecto, instalación y uso.',
    category: 'general',
    relatedTerms: ['documentation', 'markdown', 'project', 'instructions'],
    examples: ['README.md', 'Project documentation'],
    difficulty: 'beginner',
  },
];

// Función para buscar términos
export const searchGlossary = (query: string): GlossaryTerm[] => {
  const searchTerm = query.toLowerCase();
  return glossaryTerms.filter(term => 
    term.term.toLowerCase().includes(searchTerm) ||
    term.definition.toLowerCase().includes(searchTerm) ||
    term.examples.some(example => example.toLowerCase().includes(searchTerm)) ||
    term.relatedTerms.some(related => related.toLowerCase().includes(searchTerm))
  );
};

// Función para obtener términos por categoría
export const getTermsByCategory = (category: string): GlossaryTerm[] => {
  return glossaryTerms.filter(term => term.category === category);
};

// Función para obtener términos por dificultad
export const getTermsByDifficulty = (difficulty: string): GlossaryTerm[] => {
  return glossaryTerms.filter(term => term.difficulty === difficulty);
};

// Función para obtener términos relacionados
export const getRelatedTerms = (termId: string): GlossaryTerm[] => {
  const term = glossaryTerms.find(t => t.id === termId);
  if (!term) return [];
  
  return glossaryTerms.filter(t => 
    term.relatedTerms.some(relatedTerm => 
      t.term.toLowerCase().includes(relatedTerm.toLowerCase()) ||
      t.id !== termId
    )
  ).slice(0, 5); // Limitar a 5 términos relacionados
};

// Función para obtener término aleatorio
export const getRandomTerm = (): GlossaryTerm => {
  const randomIndex = Math.floor(Math.random() * glossaryTerms.length);
  return glossaryTerms[randomIndex];
};

// Estadísticas del glosario
export const getGlossaryStats = () => {
  const stats = {
    total: glossaryTerms.length,
    byCategory: {} as Record<string, number>,
    byDifficulty: {} as Record<string, number>,
  };

  glossaryTerms.forEach(term => {
    stats.byCategory[term.category] = (stats.byCategory[term.category] || 0) + 1;
    stats.byDifficulty[term.difficulty] = (stats.byDifficulty[term.difficulty] || 0) + 1;
  });

  return stats;
};
