### Skills Esenciales para el Equipo

Estas son las competencias técnicas que el equipo (o el desarrollador) debe dominar para ejecutar el plan de 6 sprints.

1. **Next.js 14+ (App Router):** Dominio de `generateStaticParams` para SSG, Server Components, layouts anidados y API Routes (para futuras extensiones).
    
2. **TypeScript:** Tipado estricto, especialmente para los metadatos de los módulos (`ModuleMeta`) y las funciones de la capa de datos.
    
3. **React Hooks:** Creación de hooks personalizados como `useProgress` para la lógica de `localStorage`.
    
4. **Tailwind CSS y shadcn/ui:** Implementación de componentes headless, personalización de temas y uso de utility classes para un diseño responsive.
    
5. **Manejo de Contenido con MDX/Markdown:** Uso de `gray-matter` para frontmatter y `next-mdx-remote` para renderizar contenido MDX en el lado del servidor.
    
6. **Persistencia en el Cliente:** Gestión de estado con `localStorage` y sincronización con React.
    
7. **UX/UI:** Implementación de modo oscuro con `next-themes`, diseño mobile-first y animaciones con `framer-motion`.
    
8. **Búsqueda Full-Text:** Integración de librerías como `Pagefind` o `Flexsearch` para indexar y buscar en el contenido estático.
    
9. **DevOps y CI/CD:** Configuración de pipelines en GitHub Actions para linting, type-check y build, y despliegue en Vercel o mediante Docker.
    

---

### 🤖 Microagentes (Prompts Especializados)

Estos son prompts detallados que puedes usar con tu asistente de IA para ejecutar cada sprint de forma autónoma.

#### Sprint 1: Fundación y entorno de desarrollo

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

#### Sprint 2: Capa de datos y contenido (Markdown/MDX)

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

#### Sprint 3: Generación estática y navegación
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

#### Sprint 4: Progreso del estudiante con `localStorage`

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

#### Sprint 5: UX avanzada — Dark mode, responsive y búsqueda

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

#### Sprint 6: CI/CD, despliegue y preparación para producción

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

### 📚 Repositorios de GitHub de Referencia

Estos repositorios son ejemplos prácticos y bien mantenidos que cubren cada parte del stack.

#### 🏗️ Proyectos Base y Boilerplates

- **[kritsadapk/Next-js-Boilerplate-2024](https://github.com/kritsadapk/Next-js-Boilerplate-2024):** Un boilerplate con Next.js 14+, App Router, Tailwind CSS, TypeScript y un enfoque en la experiencia de desarrollo.
    
- **[prabothcharith/nextjs-template-static](https://github.com/prabothcharith/nextjs-template-static):** Starter para sitios estáticos con Next.js 15, Tailwind CSS 4, shadcn/ui y modo oscuro incorporado.
    
- **[tinsaeDev/Nextkick](https://github.com/tinsaeDev/Nextkick):** Starter full-stack con Next.js 15, Auth.js (NextAuth), shadcn/ui y Prisma.
    

#### 📝 Manejo de Contenido (MDX/Markdown)

- **[hashicorp/next-mdx-remote](https://github.com/hashicorp/next-mdx-remote):** La librería estándar para cargar contenido MDX en `getStaticProps` y renderizarlo en el cliente.
    
- **[vercel/next.js/tree/canary/examples/with-mdx-remote](https://github.com/vercel/next.js/tree/canary/examples/with-mdx-remote):** El ejemplo oficial de Next.js para usar `next-mdx-remote` con el App Router.
    
- **[talatkuyuk/next-mdx-remote-client-in-app-router](https://github.com/talatkuyuk/next-mdx-remote-client-in-app-router):** Demostración de `next-mdx-remote-client` en App Router.
    

#### 🎨 UI/UX y Estilos

- **[shadcn-ui/ui](https://github.com/shadcn-ui/ui):** El repositorio oficial de shadcn/ui con todos los componentes.
    
- **[tailwindlabs/tailwindcss-typography](https://github.com/tailwindlabs/tailwindcss-typography):** Plugin oficial de Tailwind para dar estilo a contenido HTML (como el renderizado desde Markdown).
    
- **[pacocoursey/next-themes](https://github.com/pacocoursey/next-themes):** La solución perfecta para manejar el modo oscuro en Next.js.
    
- **[theogenejr/next-app-router-transitions](https://github.com/theogenejr/next-app-router-transitions):** Componente para añadir transiciones suaves entre rutas en Next.js App Router.
    

#### 🔍 Búsqueda y Funcionalidades

- **[ministryofjustice/ministry-of-justice-developer-portal](https://github.com/ministryofjustice/ministry-of-justice-developer-portal):** Un ejemplo de uso de Pagefind para búsqueda en un sitio Next.js estático.
    
- **Flexsearch:** Aunque no hay un repositorio oficial de ejemplo, es una librería popular para búsqueda en el cliente. Puedes encontrar ejemplos en la documentación oficial y en foros.
    

#### 🧪 Testing y CI/CD

- **[dominicpam89/nextjs-app-router-starter-v1](https://github.com/dominicpam89/nextjs-app-router-starter-v1):** Starter con configuración de Vitest y Testing Library para pruebas unitarias.
    
- **[vercel/next.js/tree/canary/examples/with-vitest](https://github.com/vercel/next.js/tree/canary/examples/with-vitest):** El ejemplo oficial de Next.js para configurar Vitest.
    
- **GitHub Actions:** Puedes encontrar ejemplos de workflows en la documentación oficial de GitHub Actions y en repositorios como [sasmithaK/hands-on-CI-CD](https://github.com/sasmithaK/hands-on-CI-CD).
    

#### 🐳 Despliegue y Contenedores

- **[kristiyan-velkov/nextjs-prod-dockerfile](https://github.com/kristiyan-velkov/nextjs-prod-dockerfile):** Guía y ejemplos para optimizar Docker para Next.js en producción.
    
- **[gavink97/Next-JS-Docker-Template](https://github.com/gavink97/Next-JS-Docker-Template):** Template para desplegar Next.js en Docker.
    
- **[vercel-labs/openreview](https://github.com/vercel-labs/openreview):** Contiene ejemplos de buenas prácticas para self-hosting con Docker.