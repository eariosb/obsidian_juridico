# Curso Obsidian para Despachos Jurídicos

> Plataforma educativa estática para capacitar abogados en el uso de Obsidian como bóveda de conocimiento jurídico, redacción procesal, colaboración en equipo y trazabilidad documental.

Construida con **Next.js 15** (App Router + SSG), **Tailwind CSS**, **shadcn/ui** y **TypeScript** estricto. El contenido se sirve desde archivos Markdown con frontmatter YAML, procesados en build time. El progreso del estudiante se persiste en `localStorage`.

---

## Tabla de contenidos

- [Requisitos](#requisitos)
- [Instalación](#instalación)
- [Desarrollo](#desarrollo)
- [Build y producción](#build-y-producción)
- [Scripts disponibles](#scripts-disponibles)
- [Estructura del proyecto](#estructura-del-proyecto)
- [Arquitectura](#arquitectura)
- [Contenido del curso](#contenido-del-curso)
- [Características](#características)
- [Tecnologías](#tecnologías)
- [Despliegue](#despliegue)
- [Autor](#autor)
- [Licencia](#licencia)

---

## Requisitos

| Herramienta | Versión mínima | Notas |
|---|---|---|
| Node.js | 20+ | Recomendado: LTS más reciente |
| pnpm | 9+ | Gestor de paquetes principal |
| Sistema operativo | Windows / macOS / Linux | Multiplataforma |

---

## Instalación

```bash
# Clonar el repositorio
git clone <repo-url>
cd Obsidian_Juridico

# Instalar dependencias
pnpm install
```

---

## Desarrollo

```bash
pnpm dev
```

Abre [http://localhost:3000](http://localhost:3000) en el navegador.

El servidor de desarrollo incluye:

- Hot Module Replacement (HMR)
- Compilación incremental de rutas
- Reporte de errores en consola y overlay

---

## Build y producción

```bash
# Generar build estático (SSG)
pnpm build

# Servir el build localmente
pnpm start
```

El build genera **21 páginas estáticas**:

- 1 página de inicio (`/`)
- 1 página 404 (`/_not-found`)
- 17 páginas de módulos y anexos (`/modulos/[slug]`)

Todas las páginas se pre-renderizan en build time mediante `generateStaticParams`.

---

## Scripts disponibles

| Script | Descripción |
|---|---|
| `pnpm dev` | Servidor de desarrollo con HMR |
| `pnpm build` | Build de producción (SSG) |
| `pnpm start` | Sirve el build de producción localmente |
| `pnpm lint` | ESLint con configuración de Next.js |
| `pnpm type-check` | Verificación de tipos TypeScript sin emitir archivos |

---

## Estructura del proyecto

```
Obsidian_Juridico/
├── app/                          # Rutas App Router
│   ├── layout.tsx                # Layout raíz: sidebar, footer, providers
│   ├── page.tsx                  # Página de inicio con grid de módulos
│   ├── globals.css               # Estilos globales + Tailwind
│   └── modulos/
│       └── [slug]/
│           └── page.tsx          # Página dinámica de cada módulo (SSG)
│
├── components/
│   ├── ui/                       # Componentes shadcn/ui
│   │   ├── button.tsx
│   │   └── card.tsx
│   │
│   ├── layout/                   # Componentes de navegación y estructura
│   │   ├── Sidebar.tsx           # Sidebar principal (refactorizado SOLID)
│   │   ├── SidebarItem.tsx       # Item individual del sidebar
│   │   ├── SidebarSection.tsx    # Sección agrupadora del sidebar
│   │   ├── MobileSidebar.tsx     # Sidebar responsive para móvil
│   │   ├── SearchBar.tsx         # Búsqueda en vivo de módulos
│   │   ├── ThemeToggle.tsx       # Toggle dark/light mode
│   │   ├── ThemeProvider.tsx     # Provider de next-themes
│   │   └── Footer.tsx            # Footer con credenciales del autor
│   │
│   └── course/                   # Componentes de contenido del curso
│       ├── MdxContent.tsx        # Renderizador MDX con plugins rehype/remark
│       ├── CodeBlock.tsx         # Bloque de código colapsable + copy
│       ├── ModuleHeader.tsx      # Cabecera de módulo con objetivos
│       ├── ModulePrevNext.tsx    # Navegación entre módulos
│       ├── CompleteButton.tsx    # Botón de marcar como completado
│       ├── ProgressProvider.tsx  # Context provider de progreso
│       └── TableOfContents.tsx   # TOC dinámico lateral derecho
│
├── content/
│   └── modulos/                  # 17 archivos Markdown del curso
│       ├── modulo-0-boveda.md
│       ├── modulo-1-puesta-en-marcha.md
│       ├── modulo-2-sintaxis-markdown.md
│       ├── modulo-3-plantillas.md
│       ├── modulo-4-red-conocimiento.md
│       ├── modulo-5-dataview.md
│       ├── modulo-6-bitacora-procesal.md
│       ├── modulo-7-colaboracion.md
│       ├── modulo-8-trazabilidad.md
│       ├── modulo-9-privacidad.md
│       ├── modulo-10-curva-adopcion.md
│       ├── modulo-11-ia-local.md
│       ├── anexo-a-plantillas.md
│       ├── anexo-b-dataview.md
│       ├── anexo-c-protocolo.md
│       ├── anexo-d-simulador.md
│       └── anexo-e-ejemplo.md
│
├── hooks/
│   └── useProgress.ts            # Hook + Context de progreso (localStorage)
│
├── lib/
│   ├── content.ts                # Capa de datos: lectura de Markdown + frontmatter
│   └── utils.ts                  # Utilidades (cn() para clases Tailwind)
│
├── types/
│   └── module.ts                 # Tipos TypeScript: ModuleMeta, ModuleEntry, etc.
│
├── public/                       # Assets estáticos
├── next.config.ts                # Configuración de Next.js
├── tailwind.config.ts            # Configuración de Tailwind + typography plugin
├── tsconfig.json                 # Configuración TypeScript estricto
├── package.json                  # Dependencias y scripts
└── Dockerfile                    # Imagen Docker para despliegue
```

---

## Arquitectura

### Capa de datos (`lib/content.ts`)

Los módulos se almacenan como archivos Markdown con frontmatter YAML en `content/modulos/`. La capa de datos utiliza `gray-matter` para parsear el frontmatter y expone tres funciones:

- `getAllModules()` — Retorna todos los módulos ordenados por `order`
- `getModuleBySlug(slug)` — Retorna un módulo específico con su contenido
- `getAdjacentModules(slug)` — Retorna el módulo anterior y siguiente

### Esquema de frontmatter

Cada archivo Markdown debe incluir frontmatter con la siguiente estructura:

```yaml
---
title: "Título del módulo"          # string, requerido
slug: "slug-del-modulo"             # string, requerido, único
subtitle: "Subtítulo descriptivo"   # string, opcional
order: 1                            # number, requerido, define orden
type: "module"                      # "module" | "anexo", opcional (default: "module")
objective:                          # string | string[], opcional
  - "Objetivo de aprendizaje 1"
  - "Objetivo de aprendizaje 2"
datasets:                           # string[], opcional
  - "dataset1.csv"
---
```

### Renderizado MDX (`components/course/MdxContent.tsx`)

El contenido Markdown se renderiza con `next-mdx-remote/rsc` y los siguientes plugins:

- **remark-gfm**: Soporte para GitHub Flavored Markdown (tablas, task lists, strikethrough)
- **remark-breaks**: Preserva saltos de línea del Markdown original
- **rehype-raw**: Permite HTML embebido en el Markdown
- **rehype-slug**: Genera IDs automáticos para headings
- **rehype-autolink-headings**: Agrega anchors a los headings (behavior: append)

### Progreso del estudiante (`hooks/useProgress.ts` + `ProgressProvider.tsx`)

El progreso se persiste en `localStorage` con la key `course-progress-obsidian`. El `ProgressProvider` expone mediante Context API:

- `completedSlugs`: `Set<string>` con los slugs completados
- `progressPct`: Porcentaje de progreso (0-100)
- `toggleCompleted(slug)`: Alterna el estado de completado
- `markCompleted(slug)` / `unmarkCompleted(slug)`: Acciones específicas
- `isCompleted(slug)`: Verifica si un módulo está completado

### Componentes SOLID del sidebar

El sidebar se refactorizó siguiendo principios SOLID:

- **`Sidebar`**: Componente orquestador que recibe `modules` y delega renderizado
- **`SidebarSection`**: Componente presentacional para agrupar secciones (Módulos / Anexos)
- **`SidebarItem`**: Componente individual con props tipadas (`href`, `title`, `order`, `isActive`, `isCompleted`)

---

## Contenido del curso

### Módulos principales (12)

| # | Módulo | Descripción |
|---|---|---|
| 0 | La bóveda compartida como ventaja competitiva | Introducción a Obsidian como herramienta jurídica |
| 1 | Puesta en marcha de la bóveda del despacho | Configuración inicial, estructura de carpetas, plugins |
| 2 | Sintaxis Markdown para redacción procesal | Markdown aplicado a escritos jurídicos |
| 3 | Plantillas para litigación colombiana | Plantillas de caso civil, penal, laboral y tutela |
| 4 | La red de conocimiento jurídico | Backlinks, tags y grafo de conocimiento |
| 5 | Dataview para tablero del despacho | Consultas Dataview para gestión de casos |
| 6 | Bitácora procesal con notas diarias | Daily Notes como registro procesal colectivo |
| 7 | Colaboración y sincronización | Obsidian Sync, protocolo check-out/check-in |
| 8 | Trazabilidad documental | Versionado, auditoría y recuperación |
| 9 | Privacidad y protección de datos | Cifrado, control de acceso, RGPD/ley 1581 |
| 10 | Curva de adopción del equipo | Capacitación, onboarding y gestión del cambio |
| 11 | IA local con Obsidian | Plugins de IA, privacidad y automatización |

### Anexos (5)

| Anexo | Contenido |
|---|---|
| A | Plantillas completas para caso civil, penal, laboral y tutela |
| B | Colección de consultas Dataview para tablero de control |
| C | Protocolo escrito de check-out / check-in |
| D | Simulador interactivo de conflicto de sincronización |
| E | Bóveda de demostración con tres casos simulados |

---

## Características

### Experiencia de usuario

- **SSG (Static Site Generation)**: Todas las páginas se pre-renderizan en build time para máximo rendimiento
- **Sidebar sticky**: Navegación lateral fija con scroll independiente, separa módulos y anexos
- **Table of Contents dinámico**: TOC lateral derecho que detecta headings automáticamente y resalta la sección activa al hacer scroll (Intersection Observer)
- **Búsqueda en vivo**: Filtrado instantáneo de módulos por título, slug y subtítulo
- **Bloques de código colapsables**: Todos los bloques de código aparecen colapsados por defecto con botón de copiar al portapapeles
- **Progreso local**: Marca módulos como completados, persiste en `localStorage` con key `course-progress-obsidian`
- **Navegación prev/next**: Botones para navegar secuencialmente entre módulos
- **Dark mode**: Toggle de tema claro/oscuro con `next-themes` y persistencia
- **Responsive**: Sidebar móvil con menú desplegable (hamburger), TOC solo visible en pantallas grandes (lg+)

### Accesibilidad

- Roles ARIA en navegación y botones
- Navegación por teclado
- Contraste WCAG AA en ambos temas
- `aria-label` en todos los botones de acción

### Rendimiento

- Sin JavaScript innecesario en el cliente (SSG)
- Code splitting automático de Next.js
- Fuentes optimizadas con `next/font` (Inter + JetBrains Mono)
- Sin imágenes sin optimizar

---

## Tecnologías

### Core

| Tecnología | Versión | Uso |
|---|---|---|
| Next.js | 15.3.4 | Framework React con App Router y SSG |
| React | 19.1.0 | Librería de UI |
| TypeScript | 5+ | Tipado estático estricto |
| Tailwind CSS | 3.4+ | Estilos utility-first |
| pnpm | 9+ | Gestor de paquetes |

### Librerías

| Librería | Uso |
|---|---|
| `next-mdx-remote/rsc` | Renderizado MDX en RSC |
| `gray-matter` | Parseo de frontmatter YAML |
| `next-themes` | Dark mode con persistencia |
| `lucide-react` | Iconos |
| `class-variance-authority` | Variantes de componentes |
| `clsx` + `tailwind-merge` | Utilidad `cn()` para clases |
| `@radix-ui/react-slot` | Composición de componentes |
| `@tailwindcss/typography` | Plugin de prosa para Markdown |

### Plugins Markdown

| Plugin | Uso |
|---|---|
| `remark-gfm` | GitHub Flavored Markdown |
| `remark-breaks` | Preservación de saltos de línea |
| `rehype-raw` | HTML embebido en Markdown |
| `rehype-slug` | IDs automáticos en headings |
| `rehype-autolink-headings` | Anchors en headings |

---

## Despliegue

### Vercel (recomendado)

1. Conecta el repositorio a Vercel
2. Framework Preset: **Next.js**
3. Build Command: `pnpm build` (auto-detectado)
4. Output Directory: `.next` (auto-detectado)
5. Deploy

### Docker

```bash
# Construir imagen
docker build -t curso-obsidian .

# Ejecutar contenedor
docker run -p 3000:3000 curso-obsidian
```

### Netlify

1. Conecta el repositorio a Netlify
2. Build Command: `pnpm build`
3. Publish Directory: `.next`
4. Deploy

### Build manual (estático)

```bash
pnpm build
# El output está en .next/ - sirve con cualquier servidor estático
pnpm start  # o usa un CDN
```

---

## Autor

**Esneider Ríos B.**

- Estadístico · Dev · Especialista Legaltech
- Medellín, Colombia
- Email: [eariosb@unal.edu.co](mailto:eariosb@unal.edu.co)
- WhatsApp: [+57 304 457 5399](https://wa.me/573044575399)

---

## Licencia

Este proyecto es de uso privado. Todos los derechos reservados © 2025 Esneider Ríos.
