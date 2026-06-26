---
title: "Dataview como motor de consulta del despacho"
slug: "dataview-motor-consulta-despacho"
subtitle: "Creación de tableros vivos que muestran casos activos, tareas pendientes y próximos vencimientos, extrayendo información directamente de los metadatos de cada nota."
objective:
  - "Instalar el plugin comunitario Dataview y verificar que la configuración se sincroniza en todos los equipos del despacho."
  - "Comprender la sintaxis básica de Dataview: TABLE, LIST, TASK, FROM, WHERE, SORT."
  - "Construir consultas para el índice general de casos activos, filtradas por estado y ordenadas por fecha de hito."
  - "Generar listas de tareas pendientes del equipo, agrupadas por abogado responsable."
  - "Diseñar un panel de control semanal consolidado en una nota de tablero."
order: 5
datasets:
  - "Bóveda del despacho con casos y metadatos creados en módulos anteriores."
---
# Módulo 5: Dataview como motor de consulta del despacho
## 5.1 Qué es Dataview y por qué transforma la gestión del despacho
Dataview es un plugin comunitario que permite realizar consultas sobre las notas de la bóveda utilizando un lenguaje similar a SQL, pero simplificado. Trata la bóveda como una base de datos donde cada nota es un registro, cada campo del frontmatter YAML es una columna, y las etiquetas y las carpetas son filtros naturales. El resultado de una consulta se muestra como una tabla, una lista o un conteo, incrustado directamente en cualquier nota.
Para un despacho jurídico, Dataview resuelve tres necesidades que antes requerían hojas de cálculo paralelas o memoria personal:
- **Radiografía instantánea del despacho.** Cuántos casos activos hay, en qué juzgados, con qué fechas de audiencia.
- **Seguimiento de tareas.** Qué escritos están pendientes, qué abogado los tiene a cargo, cuáles están vencidos.
- **Alertas tempranas.** Qué hitos procesales ocurren esta semana o están próximos a vencer.
Y todo ello sin duplicar información. Dataview lee los metadatos que ya existen en cada nota de caso. Si el despacho ha diligenciado correctamente el frontmatter (Módulo 3), las consultas funcionan desde el primer día.
## 5.2 Instalación y configuración sincronizada
### 5.2.1 Instalar Dataview
1. Abra «Settings > Community plugins» y, si el modo seguro está activo, desactívelo («Turn off safe mode»).
2. Busque «Dataview» en la lista de plugins comunitarios. El autor es Michael Brenan.
3. Instálelo y actívelo.
Este paso debe realizarlo cada miembro del despacho en su propio equipo. Sin embargo, como Obsidian Sync sincroniza la lista de plugins activos, basta con que el administrador active Dataview en su instalación y los demás lo verán como «pendiente de instalar». Al hacer clic en «Install», el plugin se descargará automáticamente sin necesidad de buscarlo otra vez.
### 5.2.2 Configuración recomendada
En la configuración de Dataview («Settings > Dataview»), ajuste:
- **Enable JavaScript Queries:** desactivado por ahora. Las consultas en lenguaje Dataview (DQL) son suficientes para todas las necesidades del despacho y no requieren conocimientos de programación.
- **Enable Inline Dataview:** activado. Permite insertar valores dinámicos en medio de un párrafo, como `= this.radicado`.
- **Automatic View Refreshing:** activado. Las consultas se actualizan cada vez que se abre la nota, reflejando cambios recientes.
No se requiere ninguna otra configuración. Dataview está listo para funcionar.
## 5.3 Fundamentos de la sintaxis Dataview (DQL)
Dataview ofrece varios tipos de consulta. Las tres fundamentales para el despacho son:
| Tipo | Propósito | Ejemplo |
|---|---|---|
| `TABLE` | Mostrar una tabla con columnas seleccionadas | `TABLE radicado, juzgado, estado` |
| `LIST` | Mostrar una lista simple de notas | `LIST FROM "Casos"` |
| `TASK` | Listar tareas (checkboxes) | `TASK FROM "Casos" WHERE !completed` |
Toda consulta se escribe dentro de un bloque de código con el lenguaje `dataview`:
````markdown
```dataview
TABLE radicado, juzgado, estado
FROM "Casos"
WHERE estado = "activo"
SORT radicado ASC

text

**FROM:** filtra por carpeta, etiqueta o enlace. Puede combinarse:
- `FROM "Casos"`: solo notas dentro de la carpeta `Casos/`.
- `FROM #civil`: solo notas con la etiqueta `#civil`.
- `FROM [[Juan Pérez]]`: solo notas que enlacen a la ficha de Juan Pérez.
- `FROM "Casos" AND #civil`: ambas condiciones.
**WHERE:** filtra por valores de campos del frontmatter. Los operadores disponibles son `=`, `!=`, `>`, `<`, `>=`, `<=`, y se pueden combinar con `AND` y `OR`.
**SORT:** ordena por uno o varios campos. `ASC` para ascendente, `DESC` para descendente.
**Funciones útiles:**
- `dateformat(campo, "formato")`: formatea una fecha. Ejemplo: `dateformat(proximo_hito, "yyyy-MM-dd")`.
- `default(campo, "valor")`: muestra un valor por defecto si el campo está vacío.
- `length(lista)`: cuenta el número de elementos en una lista.
- `contains(lista, "valor")`: verifica si una lista contiene un valor.
Con estos elementos, se pueden construir todas las consultas que necesita un despacho.
## 5.4 Consultas esenciales para la gestión jurídica
A continuación se presentan las consultas que, una vez insertadas en las notas correspondientes, proporcionan una vista en tiempo real del estado del despacho. Todas asumen que las notas de caso residen en la carpeta `Casos/` y que los metadatos incluyen los campos definidos en la plantilla de caso (Módulo 3): `cliente`, `radicado`, `juzgado`, `materia`, `estado`, `proximo_hito`, `tags`, `responsable`.
### 5.4.1 Índice general de casos activos
Inserte esta consulta en `Indice.md` o en una nota llamada `Tablero del despacho.md`:
````markdown
```dataview
TABLE radicado, cliente, juzgado, dateformat(proximo_hito, "yyyy-MM-dd") AS "Próximo hito"
FROM "Casos"
WHERE estado = "activo"
SORT proximo_hito ASC
```

El resultado es una tabla con columnas: radicado, cliente, juzgado, próximo hito. Los casos aparecen ordenados por la fecha del hito más cercano. Si un caso no tiene `proximo_hito`, la celda queda vacía.

### 5.4.2 Todos los casos, activos y archivados

Útil para una visión completa. Se puede añadir la columna `estado` para distinguir:

markdown

```dataview
TABLE radicado, cliente, materia, estado, dateformat(proximo_hito, "yyyy-MM-dd") AS "Próximo hito"
FROM "Casos"
SORT estado ASC, proximo_hito ASC
```

### 5.4.3 Casos por materia

Para ver solo los casos de una materia específica, por ejemplo, penal:

markdown

```dataview
TABLE radicado, cliente, juzgado, dateformat(proximo_hito, "yyyy-MM-dd") AS "Próximo hito"
FROM "Casos"
WHERE materia = "Penal"
SORT proximo_hito ASC
```

Si `materia` contiene variaciones como "Penal - Hurto" o "Penal - Homicidio", use `contains`:

markdown

```dataview
TABLE radicado, cliente, juzgado, dateformat(proximo_hito, "yyyy-MM-dd") AS "Próximo hito"
FROM "Casos"
WHERE contains(materia, "Penal")
SORT proximo_hito ASC
```

### 5.4.4 Casos por juzgado

markdown

```dataview
TABLE radicado, cliente, materia, estado
FROM "Casos"
WHERE juzgado = "Juzgado 3 Civil del Circuito de Bogotá"
SORT radicado ASC
```

### 5.4.5 Tareas pendientes del equipo

Dataview puede listar todas las tareas con checkbox (`- [ ]`) que estén dentro de las notas de una carpeta, y agruparlas por nota de origen. Esto convierte la bóveda en un gestor de tareas procesales.

markdown

```dataview
TASK
FROM "Casos"
WHERE !completed
GROUP BY file.link
SORT file.name ASC
```

El resultado muestra, para cada caso, las tareas que aún no tienen el check marcado. Por ejemplo:

- `[[EXP-2024-00045]]`: Presentar demanda, Audiencia inicial, etc.
    
- `[[EXP-2024-00056]]`: Contestar demanda, Solicitar prueba pericial.
    

Si el frontmatter incluye un campo `responsable` (por ejemplo, `responsable: "Luis"`), se puede refinar la consulta para ver solo las tareas de un abogado:

markdown

```dataview
TASK
FROM "Casos"
WHERE !completed AND responsable = "Luis"
GROUP BY file.link
SORT file.name ASC
```

Para que esto funcione, las notas de caso deben incluir en su frontmatter:

yaml

responsable: "Luis"

Este campo se añade a la plantilla de caso si el despacho desea asignar responsables por expediente.

### 5.4.6 Vencimientos próximos (próximos 7 días)

Esta consulta muestra los casos cuyo `proximo_hito` está dentro de los próximos siete días. Requiere una pequeña expresión de fecha:

markdown

```dataview
TABLE radicado, cliente, dateformat(proximo_hito, "yyyy-MM-dd") AS "Vence"
FROM "Casos"
WHERE proximo_hito != null AND proximo_hito <= date(today) + dur(7 days) AND estado = "activo"
SORT proximo_hito ASC
```

### 5.4.7 Casos sin hito programado

Para detectar casos que requieren atención inmediata porque no tienen una próxima fecha definida:

markdown

```dataview
TABLE radicado, cliente, materia
FROM "Casos"
WHERE proximo_hito = null AND estado = "activo"
SORT radicado ASC
```

## 5.5 Construcción del panel de control semanal: «Tablero del despacho»

En lugar de abrir cada consulta por separado, el despacho puede consolidar las más relevantes en una sola nota. Cree `Tablero del despacho.md` en la raíz de la bóveda con el siguiente contenido:

markdown

---
tags: [sistema]
---
# Tablero del despacho
Última actualización: `= date(today)`
---
## Próximos vencimientos (7 días)
```dataview
TABLE radicado, cliente, dateformat(proximo_hito, "yyyy-MM-dd") AS "Vence"
FROM "Casos"
WHERE proximo_hito != null AND proximo_hito <= date(today) + dur(7 days) AND estado = "activo"
SORT proximo_hito ASC
```
---
## Casos activos
```dataview
TABLE radicado, cliente, juzgado, dateformat(proximo_hito, "yyyy-MM-dd") AS "Próximo hito"
FROM "Casos"
WHERE estado = "activo"
SORT proximo_hito ASC
```
---
## Tareas pendientes
```dataview
TASK
FROM "Casos"
WHERE !completed
GROUP BY file.link
SORT file.name ASC
```
---
## Casos sin hito programado
```dataview
TABLE radicado, cliente, materia
FROM "Casos"
WHERE proximo_hito = null AND estado = "activo"
SORT radicado ASC
```

Esta nota se convierte en la primera pantalla que el abogado ve al abrir Obsidian. Basta con abrirla y la información está actualizada al segundo. Si se desea, se puede fijar como nota de inicio en «Settings > Start here > Open on startup».

## 5.6 Buenas prácticas de metadatos para que Dataview funcione

Dataview es tan bueno como los metadatos que lee. Para que las consultas sean fiables, el despacho debe seguir unas normas mínimas de consistencia:

1. **Nombres de campo uniformes.** Todos los casos deben usar exactamente los mismos nombres en el frontmatter: `radicado`, `juzgado`, `materia`, `estado`, `proximo_hito`. Si un abogado escribe `próximo_hito` con tilde, Dataview lo tratará como un campo distinto y la consulta no lo encontrará.
    
2. **Valores controlados para `estado`.** Use solo `activo`, `archivado`, `suspendido`. No use sinónimos como `en trámite` o `vigente`. La plantilla de caso debe incluir un comentario que recuerde los valores permitidos.
    
3. **Formato de fecha ISO 8601.** Todas las fechas deben escribirse como `YYYY-MM-DD`. Es el único formato que Dataview interpreta como fecha. `10/03/2024` o `10 de marzo de 2024` no funcionarán en las comparaciones.
    
4. **Campo `responsable` opcional pero útil.** Si el despacho tiene varios abogados, añadir `responsable` al frontmatter permite filtrar tareas y casos por persona. Mantenga una lista controlada de nombres (evite «Luis», «Luis M.», «LMP»).
    
5. **No mueva las notas de carpeta sin necesidad.** Las consultas que usan `FROM "Casos"` dejarán de mostrar una nota si se cambia de carpeta. Si se reorganiza la bóveda, actualice también las consultas.
    

## 5.7 Ejercicio guiado

1. Verifique que Dataview está instalado en todos los equipos del despacho.
    
2. Abra la nota `Tablero del despacho.md` (créela si no existe) e inserte las cuatro consultas de la sección 5.5.
    
3. Verifique que los casos creados en el Módulo 4 aparecen en la tabla de «Casos activos».
    
4. Añada un campo `responsable: "Luis"` al frontmatter del caso `EXP-2024-00045`.
    
5. Cree una tarea con checkbox en ese mismo caso: `- [ ] Revisar contestación de la demanda`.
    
6. Inserte la consulta de tareas pendientes y confirme que la tarea aparece listada.
    
7. Modifique el campo `proximo_hito` del caso a una fecha dentro de los próximos siete días y verifique que aparece en «Próximos vencimientos».
    
8. Proponga al equipo una reunión breve de diez minutos para revisar el tablero y discutir si las consultas reflejan correctamente la carga de trabajo. Ajuste las consultas según el criterio del despacho.