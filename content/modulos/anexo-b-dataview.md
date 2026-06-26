---
title: "Anexo B: Colección de consultas Dataview"
slug: "anexo-b-dataview"
subtitle: "Consultas Dataview probadas para el tablero de control del despacho."
objective:
  - "Copiar y configurar consultas Dataview para métricas del despacho."
  - "Entender cómo ajustar parámetros según las convenciones de la bóveda."
order: 101
type: "anexo"
---
## Anexo B: Colección de consultas Dataview para tablero de control del despacho

Este anexo reúne un conjunto completo de consultas Dataview, probadas y listas para copiar. Todas asumen que la bóveda del despacho respeta las convenciones definidas a lo largo del curso: las notas de caso residen en la carpeta `Casos/` y contienen en su frontmatter los campos `cliente`, `radicado`, `juzgado`, `materia`, `estado`, `proximo_hito`, `tags` y, cuando se trabaja en equipo, `responsable`. Las tareas con checkbox (`- [ ]`) se localizan dentro de esas mismas notas.

Cada consulta se presenta en un bloque de código `dataview` y va acompañada de una breve explicación de su propósito y, si es necesario, de cómo ajustar los parámetros. Para utilizar cualquiera de ellas, basta copiar el bloque y pegarlo en `Tablero del despacho.md` o en la nota que haga las veces de panel de control.

---

### B.1 Consultas esenciales para el seguimiento diario

#### B.1.1 Índice general de casos activos

Lista todos los expedientes en trámite, ordenados por la fecha del próximo hito procesal más cercana. Es la consulta que debe ocupar la parte superior del tablero.

```dataview

TABLE radicado, cliente, juzgado, dateformat(proximo_hito, "yyyy-MM-dd") AS "Próximo hito"
FROM "Casos"
WHERE estado = "activo"
SORT proximo_hito ASC
```
Si se desea incluir también los casos suspendidos, se puede ampliar la condición:

```dataview

TABLE radicado, cliente, juzgado, dateformat(proximo_hito, "yyyy-MM-dd") AS "Próximo hito"
FROM "Casos"
WHERE estado = "activo" OR estado = "suspendido"
SORT proximo_hito ASC
```
#### B.1.2 Vista completa de todos los casos (activos, archivados y suspendidos)

Útil para obtener una panorámica total del despacho.

```dataview

TABLE radicado, cliente, materia, estado, dateformat(proximo_hito, "yyyy-MM-dd") AS "Próximo hito"
FROM "Casos"
SORT estado ASC, proximo_hito ASC
```
#### B.1.3 Casos por materia

Filtra los casos según un área del derecho. Puede utilizarse con el operador de igualdad exacta (`=`) o con `contains` si el campo `materia` admite descripciones compuestas (por ejemplo, "Civil – Responsabilidad médica").

**Por coincidencia exacta:**

```dataview

TABLE radicado, cliente, juzgado, dateformat(proximo_hito, "yyyy-MM-dd") AS "Próximo hito"
FROM "Casos"
WHERE materia = "Penal"
SORT proximo_hito ASC
```
**Por subcadena (más flexible):**

```dataview

TABLE radicado, cliente, juzgado, dateformat(proximo_hito, "yyyy-MM-dd") AS "Próximo hito"
FROM "Casos"
WHERE contains(materia, "Civil")
SORT proximo_hito ASC
```
#### B.1.4 Casos por juzgado

Permite concentrar la atención en los asuntos que se tramitan ante un despacho judicial concreto, por ejemplo para preparar las audiencias del día.

```dataview

TABLE radicado, cliente, materia, estado
FROM "Casos"
WHERE juzgado = "Juzgado 3 Civil del Circuito de Bogotá"
SORT radicado ASC
```
#### B.1.5 Casos por cliente

Muestra todos los procesos en los que interviene una persona determinada, indispensable para atender consultas o evaluar la relación con el cliente.

```dataview

TABLE radicado, materia, juzgado, estado
FROM "Casos"
WHERE cliente = [[Juan Pérez]]
SORT radicado ASC
```
#### B.1.6 Casos por etiqueta

Cuando se utilizan etiquetas temáticas (por ejemplo, `#ejecutivo` o `#tutela`) es posible recuperar todos los expedientes que comparten esa clasificación.

```dataview

TABLE radicado, cliente, juzgado, dateformat(proximo_hito, "yyyy-MM-dd") AS "Próximo hito"
FROM #ejecutivo
SORT proximo_hito ASC
```
Pueden combinarse varias etiquetas para acotar aún más la búsqueda:

```dataview

TABLE radicado, cliente, juzgado
FROM #civil AND #responsabilidad
SORT radicado ASC
```
---

### B.2 Control de vencimientos y plazos

#### B.2.1 Vencimientos en los próximos siete días

Alerta temprana que muestra los casos cuyo hito procesal cae dentro de la semana entrante. Se recomienda consultarla cada lunes.

```dataview

TABLE radicado, cliente, dateformat(proximo_hito, "yyyy-MM-dd") AS "Vence"
FROM "Casos"
WHERE proximo_hito != null
  AND proximo_hito <= date(today) + dur(7 days)
  AND estado = "activo"
SORT proximo_hito ASC
```
Para ampliar el horizonte a quince días, basta con reemplazar `7 days` por `15 days`.

#### B.2.2 Vencimientos para hoy

Consulta que puede incrustarse en la nota diaria o en un panel secundario para no pasar por alto las diligencias del día.

```dataview

TABLE radicado, cliente, juzgado
FROM "Casos"
WHERE proximo_hito = date(today) AND estado = "activo"
```
#### B.2.3 Casos sin hito programado

Identifica expedientes activos que no tienen una fecha de seguimiento. Suele indicar que el caso está estancado o que no se ha registrado el próximo paso.

```dataview

TABLE radicado, cliente, materia
FROM "Casos"
WHERE proximo_hito = null AND estado = "activo"
SORT radicado ASC
```
---

### B.3 Gestión de tareas procesales

Dataview puede leer todos los elementos de lista con checkbox (`- [ ]`) que se encuentren dentro de las notas de una carpeta, transformando la bóveda en un gestor de pendientes sin necesidad de herramientas externas.

#### B.3.1 Tareas pendientes agrupadas por caso

Muestra cada tarea no completada debajo del enlace al caso respectivo.

```dataview

TASK
FROM "Casos"
WHERE !completed
GROUP BY file.link
SORT file.name ASC
```
#### B.3.2 Tareas completadas

Útil para auditar lo que ya se ha avanzado en un período.

```dataview

TASK
FROM "Casos"
WHERE completed
GROUP BY file.link
SORT file.name ASC
```
#### B.3.3 Tareas con fecha de vencimiento (si se usa un formato de fecha en la tarea)

Si las tareas incluyen una fecha en el propio texto (por ejemplo, `- [ ] Presentar demanda 📅 2024-08-15`), es posible filtrarlas por urgencia. Dataview no extrae automáticamente la fecha de la tarea, pero sí puede listarlas y luego el abogado puede ordenar manualmente. Una alternativa más limpia es utilizar el campo `proximo_hito` del caso, como en los apartados anteriores.

---

### B.4 Consultas para equipos con campo `responsable`

Cuando el frontmatter de los casos incluye un campo `responsable` con el nombre o las iniciales del abogado a cargo, las consultas pueden segmentarse para reflejar la carga de trabajo individual y facilitar la distribución de tareas.

#### B.4.1 Casos activos por abogado responsable

```dataview

TABLE radicado, cliente, juzgado, dateformat(proximo_hito, "yyyy-MM-dd") AS "Próximo hito"
FROM "Casos"
WHERE estado = "activo" AND responsable = "Luis"
SORT proximo_hito ASC
```
Para ver los casos de otro abogado, se cambia el nombre entre comillas.

#### B.4.2 Conteo de casos activos por abogado

Muestra la carga cuantitativa de cada miembro del despacho.

```dataview

TABLE length(rows) AS "N.º de casos"
FROM "Casos"
WHERE estado = "activo"
GROUP BY responsable
```
El resultado es una tabla con dos columnas: el nombre del responsable y el número de casos activos que tiene asignados.

#### B.4.3 Tareas pendientes por responsable

Lista las tareas no completadas y las agrupa por el responsable del caso en que se encuentran.

```dataview

TASK
FROM "Casos"
WHERE !completed
GROUP BY responsable
SORT responsable ASC
```
Si se desea ver las tareas de un único abogado, se añade una condición:

```dataview

TASK
FROM "Casos"
WHERE !completed AND responsable = "María"
GROUP BY file.link
SORT file.name ASC
```
#### B.4.4 Vencimientos próximos por responsable

```dataview

TABLE radicado, cliente, dateformat(proximo_hito, "yyyy-MM-dd") AS "Vence"
FROM "Casos"
WHERE proximo_hito != null
  AND proximo_hito <= date(today) + dur(7 days)
  AND estado = "activo"
  AND responsable = "Luis"
SORT proximo_hito ASC
```
---

### B.5 Tablero consolidado (plantilla)

A continuación se ofrece un modelo de `Tablero del despacho.md` que integra las consultas más utilizadas en una sola nota. Puede copiarse íntegro y luego ajustar los nombres de los responsables o añadir secciones propias.

```markdown

---
tags: [sistema]
---
# Tablero del despacho
Actualización automática al abrir la nota.
---
## Próximos vencimientos (7 días)
```dataview
TABLE radicado, cliente, dateformat(proximo_hito, "yyyy-MM-dd") AS "Vence"
FROM "Casos"
WHERE proximo_hito != null
  AND proximo_hito <= date(today) + dur(7 days)
  AND estado = "activo"
SORT proximo_hito ASC
```
---
## Casos activos por responsable
### Luis
```dataview
TABLE radicado, cliente, juzgado, dateformat(proximo_hito, "yyyy-MM-dd") AS "Próximo hito"
FROM "Casos"
WHERE estado = "activo" AND responsable = "Luis"
SORT proximo_hito ASC
```
### María
```dataview
TABLE radicado, cliente, juzgado, dateformat(proximo_hito, "yyyy-MM-dd") AS "Próximo hito"
FROM "Casos"
WHERE estado = "activo" AND responsable = "María"
SORT proximo_hito ASC
```
### Sin asignar
```dataview
TABLE radicado, cliente, juzgado, dateformat(proximo_hito, "yyyy-MM-dd") AS "Próximo hito"
FROM "Casos"
WHERE estado = "activo" AND (responsable = null OR responsable = "")
SORT proximo_hito ASC
```
---
## Tareas pendientes (por responsable)
```dataview
TASK
FROM "Casos"
WHERE !completed
GROUP BY responsable
SORT responsable ASC
```
---
## Casos sin hito programado
```dataview
TABLE radicado, cliente, materia
FROM "Casos"
WHERE proximo_hito = null AND estado = "activo"
SORT radicado ASC
```

---

### B.6 Recomendaciones para mantener las consultas actualizadas

- Si se añade un nuevo campo al frontmatter (por ejemplo, `urgencia`), basta con agregar una columna en la consulta: `TABLE radicado, cliente, urgencia`.
    
- Las consultas son sensibles a mayúsculas y minúsculas. Asígnele un valor uniforme al campo `responsable` en todos los casos (siempre "Luis" y no "luis" o "Luis M.").
    
- Para que la tabla de «casos activos por responsable» funcione correctamente, todos los casos deben tener el campo `responsable` diligenciado, aunque sea con un valor por defecto como "Por asignar".
    
- Al actualizar el tablero para un nuevo abogado, no es necesario escribir consultas nuevas; basta con duplicar el bloque correspondiente y cambiar el nombre en la condición `WHERE`.