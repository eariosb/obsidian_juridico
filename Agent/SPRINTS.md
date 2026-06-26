# Curso Obsidian para Despachos Jurídicos

> **Arquitectura:** Next.js 14+ (App Router) · SSG · Tailwind · shadcn/ui · Markdown/MDX · `localStorage`  
> **Estrategia:** 6 sprints de 1 bloque cada uno, diseñados para sesiones de 3–5 horas con asistencia de IA.  
> **Objetivo:** Entregar un MVP funcional, estático, responsive y con seguimiento de progreso local.

A continuación se desglosan los 6 sprints. Cada uno incluye un **prompt optimizado** que puedes copiar y pegar directamente en tu asistente de IA (Windsurf, Cursor, Copilot) para guiar la implementación.

---

## Resumen de Sprints

|Sprint|Nombre|Duración estimada|Entregable clave|
|---|---|---|---|
|**1**|Fundación y entorno de desarrollo|3–4h|Proyecto Next.js + shadcn/ui funcionando|
|**2**|Capa de datos y contenido|3–4h|`lib/content.ts` y tipado de módulos|
|**3**|Generación estática y navegación|3–4h|Páginas de listado y detalle + Sidebar|
|**4**|Progreso del estudiante (`localStorage`)|3–4h|Hook `useProgress` y check de completado|
|**5**|UX avanzada: búsqueda, dark mode y responsive|3–4h|Modo oscuro, menú móvil y buscador|
|**6**|CI/CD, despliegue y preparación para producción|3–4h|Pipeline CI + despliegue en Vercel + Docker|

---

## Sprint 1: Fundación y entorno de desarrollo

**Objetivo:** Inicializar el monorepo de Next.js, instalar dependencias, configurar Tailwind y shadcn/ui, y establecer la estructura de carpetas.

**Criterio de hecho:**

- `npm run dev` levanta el servidor sin errores.
    
- La página `http://localhost:3000` muestra el mensaje "Curso en construcción".
    
- Los componentes de shadcn (Button, Card) se pueden importar y renderizar.
    

**Prompt optimizado para Vibe Coding:**

text

Actúa como un experto en Next.js 14+ con App Router. Quiero crear la base del proyecto "Curso Obsidian para despachos jurídicos".
1. Inicializa un proyecto Next.js con TypeScript, ESLint y Tailwind CSS:
   `npx create-next-app@latest curso-obsidian --typescript --tailwind --eslint`
2. Instala y configura shadcn/ui siguiendo la documentación oficial:
   - Inicializa con `npx shadcn-ui@latest init` (elige estilo New York, neutral, CSS variables).
   - Instala los componentes base: `button`, `card`, `sheet`, `sidebar` (si está disponible) o `navigation-menu`.
3. Crea la siguiente estructura de carpetas en la raíz:
   - `app/`
   - `components/ui/` (donde irán los componentes shadcn)
   - `components/layout/`
   - `components/course/`
   - `lib/`
   - `content/modulos/`
   - `hooks/`
   - `types/`
4. Configura `app/page.tsx` para mostrar un Hero simple con el título "Curso Obsidian para Despachos Jurídicos" y un botón "Comenzar" que enlace a `/modulos/introduccion` (aunque la ruta aún no exista).
5. Asegura que los estilos globales (`app/globals.css`) incluyan las directivas de Tailwind y que las variables CSS de shadcn estén correctas.
No generes lógica de negocio aún. Solo quiero el entorno funcionando.

---

## Sprint 2: Capa de datos y contenido (Markdown/MDX)

**Objetivo:** Crear la abstracción de datos que lea los archivos `.mdx` del curso, extraiga el frontmatter y exponga funciones para consumir el contenido en el resto de la aplicación.

**Criterio de hecho:**

- La función `getAllModules()` devuelve un array con los metadatos de todos los módulos, ordenados por `order`.
    
- La función `getModuleBySlug(slug)` devuelve el contenido parseado de un módulo específico.
    
- `npm run build` ejecuta estas funciones sin errores (se puede probar en un script o en el propio build).
    

**Prompt optimizado para Vibe Coding:**

text

Ahora necesito la capa de datos para el contenido del curso. Los módulos están en `content/modulos/` con extensión `.mdx`. Cada archivo tiene un frontmatter YAML con el siguiente esquema:
```yaml
---
title: string
slug: string
subtitle?: string
order: number
objective: string | string[]
---

1. Define los tipos TypeScript en `types/module.ts`:
    
    - `ModuleMeta` (con todos los campos del frontmatter).
        
    - `ModuleEntry` (meta + fileName).
        
    - `ModuleData` (meta + content).
        
2. Implementa `lib/content.ts` con las siguientes funciones:
    
    - `getAllModules(): ModuleEntry[]` → Lee `content/modulos/`, extrae frontmatter con `gray-matter`, ordena por `order`.
        
    - `getModuleBySlug(slug: string): ModuleData | undefined` → Busca el archivo cuyo `slug` coincida, devuelve el meta y el contenido en bruto (string).
        
    - `getAdjacentModules(slug: string): { prev?: ModuleEntry, next?: ModuleEntry }` → Usa `getAllModules()` para encontrar el anterior y siguiente.
        
3. Instala las dependencias necesarias:
    
    - `gray-matter`
        
    - `remark` y `rehype` (o `next-mdx-remote` para renderizar MDX en el cliente/servidor). Prefiero `next-mdx-remote` para simplificar.
        
4. Crea un script de prueba en `scripts/test-content.ts` (o ejecuta directamente en `npm run build`) que llame a `getAllModules()` y muestre en consola la lista de títulos para verificar que la lectura funciona.
    
5. Asegura que el tipado esté estricto y que los errores de archivo no encontrado se manejen correctamente.
    

text

---
## Sprint 3: Generación estática y navegación
**Objetivo:** Crear las páginas de listado y detalle usando `generateStaticParams` para pre-renderizar todo el contenido en tiempo de compilación. Implementar un `Sidebar` navegable.
**Criterio de hecho:**  
- `npm run build` genera HTML estático para todos los módulos.  
- La ruta `/` muestra un listado de módulos con tarjetas (Card).  
- La ruta `/modulos/[slug]` muestra el contenido completo del módulo.  
- El `Sidebar` (lateral) muestra todos los títulos y resalta el módulo activo.
**Prompt optimizado para Vibe Coding:**
```text
Vamos a construir las páginas y la navegación.
1. En `app/page.tsx` (landing):
   - Usa `getAllModules()` para obtener la lista de módulos.
   - Muestra un Hero con el título del curso y una breve descripción.
   - Debajo, muestra una cuadrícula de `Card` (shadcn) con el título, subtítulo y un botón "Ver módulo" que enlace a `/modulos/[slug]`.
2. En `app/modulos/[slug]/page.tsx`:
   - Usa `getModuleBySlug(slug)` para obtener el contenido.
   - Si no existe, lanza `notFound()`.
   - Renderiza el contenido MDX usando `next-mdx-remote` (o `react-markdown` con `remark-gfm`). Asegura que los estilos tipográficos sean legibles (puedes usar `@tailwindcss/typography`).
   - Muestra un `ModuleHeader` con el título y los objetivos.
   - Muestra `ModulePrevNext` con botones para navegar al módulo anterior/siguiente.
3. En `app/modulos/[slug]/generateStaticParams.ts`:
   - Exporta `generateStaticParams()` que retorna `{ slug: ... }` para cada módulo obtenido de `getAllModules()`. Esto habilita el SSG.
4. Crea `components/layout/Sidebar.tsx`:
   - Recibe la lista de módulos y el `slug` activo.
   - Muestra una lista con enlaces a cada módulo. Resalta el activo con un fondo o texto diferente.
   - (Opcional) Muestra el progreso global (aunque aún no esté implementado, deja el espacio).
5. En `app/layout.tsx`, integra el `Sidebar` y el área principal (`MainContent`). Usa un layout de dos columnas (ej. `grid-cols-[280px,1fr]`).
Asegura que la navegación sea fluida y que el contenido se vea limpio.

---

## Sprint 4: Progreso del estudiante con `localStorage`

**Objetivo:** Implementar el seguimiento de progreso utilizando `localStorage` para que el usuario pueda marcar módulos como completados y persistir el estado entre sesiones.

**Criterio de hecho:**

- Al hacer clic en "Marcar como completado", el checkmark aparece en el `Sidebar`.
    
- Al recargar la página, el progreso persiste.
    
- La barra de progreso global se actualiza correctamente.
    

**Prompt optimizado para Vibe Coding:**

text

Implementa el seguimiento de progreso con `localStorage`.
1. Crea `hooks/useProgress.ts`:
   - Define un estado `completedSlugs: Set<string>`.
   - Carga desde `localStorage` al montar usando la clave `course-progress-obsidian`.
   - Expone funciones `markCompleted(slug: string)`, `unmarkCompleted(slug: string)` y `toggleCompleted(slug: string)`.
   - Expone `progressPct` (número, 0-100) calculado como `(completedSlugs.size / totalModules) * 100`.
   - Persiste automáticamente en `localStorage` cada vez que cambia el Set.
2. En `app/modulos/[slug]/page.tsx`:
   - Usa el hook `useProgress`.
   - Muestra un botón "Marcar como completado" (o "Desmarcar" si ya está completado) usando `Button` de shadcn con el icono `Check`.
   - Al hacer clic, llama a `toggleCompleted(slug)`.
3. En `components/layout/Sidebar.tsx`:
   - Recibe el progreso desde el hook (o desde el layout).
   - Para cada módulo, muestra un checkmark (✅) o un círculo vacío (○) al lado del título, indicando si está completado.
   - Muestra una `ProgressBar` (componente de shadcn) en la parte superior del Sidebar con el porcentaje global.
4. Asegura que el hook sea un Client Component (`'use client'`) y maneje correctamente la hidratación (no hay diferencia entre SSR y cliente porque la UI cambia después del montaje).
Prueba manualmente: marca un módulo, recarga, verifica que persiste.

---

## Sprint 5: UX avanzada — Dark mode, responsive y búsqueda

**Objetivo:** Dar el acabado profesional: modo oscuro, diseño completamente responsive (Sidebar convertido en Sheet en móvil) e integración de búsqueda full‑text (Pagefind).

**Criterio de hecho:**

- El toggle de tema (claro/oscuro) funciona y recuerda la preferencia.
    
- En móvil (< 768px), el Sidebar se oculta detrás de un botón de hamburguesa (Sheet).
    
- La búsqueda encuentra módulos por título o contenido y enlaza directamente.
    
- Animaciones suaves al cambiar de ruta.
    

**Prompt optimizado para Vibe Coding:**

text

Ahora dale el toque profesional a la UI.
1. Modo oscuro:
   - Instala `next-themes`.
   - Envuelve `app/layout.tsx` con `ThemeProvider` (del ejemplo oficial).
   - Añade un `ToggleTheme` en el header (un botón con el icono de sol/luna).
   - Asegura que todos los colores de shadcn y Tailwind se adapten correctamente (ya están preparados por defecto si usaste variables CSS).
2. Responsive (mobile-first):
   - Modifica `app/layout.tsx` para que en pantallas menores a 768px, el `Sidebar` desaparezca y se muestre un botón de hamburguesa (☰).
   - Implementa el Sidebar móvil usando el componente `Sheet` de shadcn (se abre desde la izquierda).
   - Asegura que el contenido principal ocupe el 100% del ancho en móvil.
3. Búsqueda (Pagefind):
   - Instala `@pagefind/default-ui` o `pagefind` (para static sites).
   - Configura `next.config.js` para que en el build se ejecute `pagefind` sobre la carpeta `out` (si usas export estática) o sobre el directorio de salida. Si usas `output: 'standalone'`, ajusta el comando post-build.
   - Integra la UI de Pagefind en el `Sidebar` (un input que al escribir muestre resultados). O, si prefieres simplificar, implementa una búsqueda en memoria con `flexsearch` y `fuse.js` que filtre la lista de módulos localmente (más sencillo y no requiere post‑build). Elige `flexsearch` para mantenerlo simple.
4. Animaciones:
   - Instala `framer-motion`.
   - Envuelve `app/modulos/[slug]/page.tsx` con `motion.div` para transiciones de entrada (fade-in, slide-up).
   - Añade un hover sutil en las `Card` (sombra que se eleva).
Asegura que el rendimiento en móvil sea bueno (evita animaciones pesadas).

---

## Sprint 6: CI/CD, despliegue y preparación para producción

**Objetivo:** Automatizar el pipeline de integración continua, desplegar en Vercel (y/o Docker) y asegurar que el build de producción funciona sin errores.

**Criterio de hecho:**

- El pipeline de GitHub Actions ejecuta `npm run lint`, `npm run type-check`, `npm run test` y `npm run build`.
    
- La aplicación está desplegada en Vercel y accesible públicamente.
    
- `docker build` construye una imagen y `docker run` sirve la app correctamente.
    

**Prompt optimizado para Vibe Coding:**

text

Prepárate para producción.
1. Pipeline CI (GitHub Actions):
   - Crea `.github/workflows/ci.yml`.
   - Configura un job que ejecute en `ubuntu-latest`, con Node.js 20.
   - Steps:
     - Checkout
     - Setup Node
     - Cache `node_modules`
     - `npm ci`
     - `npm run lint`
     - `npm run type-check` (debe estar definido en `package.json` como `tsc --noEmit`)
     - `npm run test` (si tienes tests unitarios, aunque sea básico)
     - `npm run build` (esto valida que el SSG genera todas las páginas sin errores)
   - Asegura que el workflow se ejecute en `push` a `main` y en `pull_request`.
2. Despliegue en Vercel:
   - Conecta el repositorio de GitHub a Vercel (proyecto nuevo).
   - Configura el Framework Preset `Next.js`.
   - En `next.config.js`, verifica que `output` no esté en `'export'` a menos que quieras estático puro (Vercel soporta SSG nativamente, así que no es necesario).
   - Añade `NEXT_TELEMETRY_DISABLED=1` como variable de entorno.
3. Dockerfile (opcional pero recomendado para clientes):
   - Crea un `Dockerfile` multi‑stage:
     - Stage `deps`: `npm ci`
     - Stage `builder`: `npm run build`
     - Stage `runner`: Imagen `node:20-alpine`, copia `public`, `.next/standalone`, `.next/static`, y `package.json`.
     - Expón el puerto `3000` y ejecuta `node server.js`.
   - Crea un `docker-compose.yml` simple para desarrollo que monte el código y ejecute `npm run dev`.
4. Asegura que `npm run build` pasa localmente antes de hacer el push final.
5. Documenta en el `README.md` los pasos para desarrollo (`npm run dev`), build y despliegue.

---

## Consideraciones finales para el Vibe Coding

- **Reutiliza el contenido real**: Los archivos `.mdx` de los módulos (0 al 11) y los anexos deben colocarse en `content/modulos/` siguiendo el esquema de frontmatter. Puedes crear un script para renombrarlos o ajustarlos.
    
- **Testing mínimo**: Enfoca las pruebas unitarias en `lib/content.ts` (usando `memfs` para mockear el sistema de archivos) y en `hooks/useProgress.ts` (usando `@testing-library/react-hooks` y `jest-localstorage-mock`).
    
- **Itera rápido**: Cada sprint está aislado, pero si un bloque se alarga, divídelo en submódulos. La clave es que al final de cada sprint el producto sea _end‑to‑end_ verificable.