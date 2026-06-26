---
title: "Anexo A: Plantillas completas para caso civil, penal, laboral y tutela"
slug: "anexo-a-plantillas"
subtitle: "Plantillas de nota de caso con metadatos YAML específicos para cada materia."
objective:
  - "Copiar y configurar plantillas de caso civil, penal, laboral y tutela."
  - "Entender los campos específicos de cada materia en el frontmatter."
order: 100
type: "anexo"
---
### Anexo A: Plantillas completas para caso civil, penal, laboral y tutela

Este anexo contiene cuatro plantillas de nota de caso, una por cada área de práctica, con metadatos YAML específicos para la materia. A diferencia de la plantilla genérica `Caso.md` del Módulo 3, estas versiones incluyen campos particulares del proceso civil, penal, laboral y de tutela. Todas se almacenan en `Plantillas/` y se sincronizan automáticamente con el resto del equipo.

Para usar cualquiera de ellas:

1. Copie el contenido completo de la plantilla.
    
2. En Obsidian, dentro de la carpeta `Plantillas/`, cree una nueva nota con el nombre indicado (por ejemplo, `Caso civil.md`).
    
3. Pegue el contenido y guarde.
    
4. Al crear una nueva nota en `Casos/`, inserte la plantilla correspondiente mediante `Insert template` (`Ctrl/Cmd + Shift + T`).
    

#### A.1 Plantilla de caso civil

Esta plantilla está pensada para procesos declarativos, ejecutivos y de responsabilidad civil. Los campos del frontmatter cubren las necesidades de las consultas Dataview y del seguimiento procesal.

Archivo: `Plantillas/Caso civil.md`

```markdown

---
cliente: "[[Ficha cliente]]"
radicado: ""
juzgado: ""
materia: "Civil"
tipo_proceso: ""
fecha_inicio: {{tp.date.now("YYYY-MM-DD")}}
estado: "activo"
proximo_hito: ""
cuantia: ""
tags: [civil]
---
# {{title}}
## Datos del proceso
- **Cliente:** {{cliente}}
- **Radicado:** {{radicado}}
- **Juzgado:** {{juzgado}}
- **Materia:** Civil
- **Tipo de proceso:** {{tipo_proceso}}
- **Cuantía:** {{cuantia}}
- **Fecha de inicio:** {{fecha_inicio}}
- **Estado:** {{estado}}
## Hechos relevantes
1. 
2. 
3. 
## Fundamentos de derecho
- 
- 
## Hitos procesales
- [ ] Presentar demanda 📅 {{proximo_hito}}
- [ ] Audiencia inicial (art. 372 CGP)
- [ ] Audiencia de pruebas
- [ ] Sentencia
## Escritos presentados
- 
## Notas y estrategia
...

**Campos relevantes:**

- `tipo_proceso`: verbal, verbal sumario, ejecutivo, pertenencia, etc.
    
- `cuantia`: cuantía del proceso, necesaria para determinar competencia.
    
- `materia`: se fija como "Civil" por defecto; puede subclasificarse mediante etiquetas (`#responsabilidad`, `#contratos`, etc.).
    
```
#### A.2 Plantilla de caso penal

Adaptada para asuntos penales. Incluye campos como `delito`, `fiscalia`, `etapa_procesal`, y una sección de sujetos procesales (indiciado, víctima). La estructura sigue la lógica del sistema penal acusatorio (Ley 906 de 2004).

Archivo: `Plantillas/Caso penal.md`

```markdown

---
cliente: "[[Ficha cliente]]"
radicado: ""
fiscalia: ""
juzgado: ""
delito: ""
etapa_procesal: "indagación"
fecha_inicio: {{tp.date.now("YYYY-MM-DD")}}
estado: "activo"
proximo_hito: ""
calidad_cliente: ""
tags: [penal]
---
# {{title}}
## Datos del proceso
- **Cliente:** {{cliente}}
- **Calidad en la que actúa:** {{calidad_cliente}}
- **Radicado / SPOA:** {{radicado}}
- **Fiscalía:** {{fiscalia}}
- **Juzgado de control de garantías / conocimiento:** {{juzgado}}
- **Delito:** {{delito}}
- **Etapa procesal:** {{etapa_procesal}}
- **Fecha de inicio:** {{fecha_inicio}}
- **Estado:** {{estado}}
## Sujetos procesales
- **Indiciado / acusado:** 
- **Víctima(s):** 
- **Defensor:** 
## Hechos relevantes
1. 
2. 
3. 
## Elementos materiales probatorios
- 
- 
## Hitos procesales
- [ ] Audiencia de imputación 📅 {{proximo_hito}}
- [ ] Audiencia de medida de aseguramiento
- [ ] Audiencia de acusación
- [ ] Audiencia preparatoria
- [ ] Juicio oral
## Escritos presentados
- 
## Notas y estrategia
...

**Campos relevantes:**

- `calidad_cliente`: indiciado, víctima, defensor. Determina el enfoque del caso.
    
- `etapa_procesal`: indagación, investigación, acusación, juicio, impugnación.
    
- `delito`: descripción jurídica del delito.
    
- `radicado`: puede ser el número SPOA o el radicado asignado por la fiscalía.
    
```
#### A.3 Plantilla de caso de tutela

Especializada para acciones de tutela. Recoge los presupuestos de procedencia y los derechos fundamentales vulnerados. Se integra con la plantilla de escrito de tutela del Módulo 3.

Archivo: `Plantillas/Caso tutela.md`

```markdown

---
accionante: "[[Ficha cliente]]"
accionado: ""
radicado: ""
derecho_vulnerado: ""
fecha_presentacion: {{tp.date.now("YYYY-MM-DD")}}
estado: "activo"
proximo_hito: ""
medida_provisional: ""
tags: [tutela, constitucional]
---
# {{title}}
## Datos de la acción de tutela
- **Accionante:** {{accionante}}
- **Accionado:** {{accionado}}
- **Radicado:** {{radicado}}
- **Derecho(s) vulnerado(s):** {{derecho_vulnerado}}
- **Fecha de presentación:** {{fecha_presentacion}}
- **Medida provisional solicitada:** {{medida_provisional}}
## Procedencia de la tutela
1. **Legitimación activa:** 
2. **Legitimación pasiva:** 
3. **Inmediatez:** 
4. **Subsidiariedad:** 
## Hechos relevantes
1. 
2. 
3. 
## Fundamentos de derecho
- 
## Hitos procesales
- [ ] Radicación de la tutela
- [ ] Fallo de primera instancia 📅 {{proximo_hito}}
- [ ] Impugnación
- [ ] Fallo de segunda instancia
- [ ] Revisión eventual por la Corte Constitucional
## Escritos presentados
- 
## Notas y estrategia
...

**Campos relevantes:**

- `accionante`, `accionado`: enlaces a las fichas de cliente correspondientes.
    
- `derecho_vulnerado`: puede ser uno o varios derechos fundamentales.
    
- `medida_provisional`: se registra si se solicitó o no.
    
```

#### A.4 Plantilla de caso laboral

Adaptada para procesos laborales ordinarios y de seguridad social. Incluye campos como `tipo_proceso`, `fuero`, `etapa_procesal`, y una sección de sujetos procesales (trabajador, empleador). La estructura sigue la lógica del Código Procesal del Trabajo y de la Seguridad Social (CPTSS), considerando las dos audiencias del proceso ordinario laboral: audiencia obligatoria de conciliación, decisión de excepciones previas, saneamiento y fijación del litigio (art. 77 CPTSS) y audiencia de trámite y juzgamiento (art. 80 CPTSS).

Archivo: `Plantillas/Caso laboral.md`

```markdown

---
cliente: "[[Ficha cliente]]"
radicado: ""
juzgado: ""
materia: "Laboral"
tipo_proceso: "ordinario"
etapa_procesal: "demanda"
fecha_inicio: {{tp.date.now("YYYY-MM-DD")}}
estado: "activo"
proximo_hito: ""
cuantia: ""
fuero: "no"
reconvencion: "no"
tags: [laboral]
---
# {{title}}
## Datos del proceso
- **Cliente:** {{cliente}}
- **Radicado:** {{radicado}}
- **Juzgado laboral:** {{juzgado}}
- **Materia:** Laboral
- **Tipo de proceso:** {{tipo_proceso}}
- **Cuantía:** {{cuantia}}
- **Fuero sindical / circunstancial:** {{fuero}}
- **Fecha de inicio:** {{fecha_inicio}}
- **Estado:** {{estado}}
## Sujetos procesales
- **Trabajador / demandante:** 
- **Empleador / demandado:** 
- **Apoderado:** 
## Hechos relevantes
1. 
2. 
3. 
## Fundamentos de derecho
- 
- 
## Hitos procesales
- [ ] Admisión de la demanda
- [ ] Traslado y contestación (10 días, art. 74 CPTSS)
- [ ] Audiencia obligatoria de conciliación, excepciones previas y fijación del litigio (art. 77 CPTSS) 📅 {{proximo_hito}}
- [ ] Decreto y práctica de pruebas
- [ ] Audiencia de trámite y juzgamiento (art. 80 CPTSS)
- [ ] Sentencia de primera instancia
- [ ] Recurso de apelación (si aplica)
## Escritos presentados
- 
## Notas y estrategia
...

**Campos relevantes:**

- `tipo_proceso`: ordinario, ejecutivo, monitorio, fuero, arbitramento.

- `etapa_procesal`: demanda, contestación, conciliación, pruebas, juzgamiento, impugnación.

- `fuero`: sindical, maternidad, discapacidad, prepensionado, acoso laboral, circunstancial (art. 300 CPTSS).

- `reconvencion`: indica si se propuso demanda de reconvención (arts. 75-76 CPTSS).

- `cuantia`: necesaria para determinar competencia y tipo de proceso (ordinario, monitorio hasta 20 SMLMV).

```
---

### Anexo B: Colección de consultas Dataview para tablero de control del despacho

Contiene un conjunto completo de consultas Dataview listas para copiar, con variantes para equipos con varios abogados (campo `responsable`). Se presentan en formato de código dataview para pegar directamente en `Tablero del despacho.md` o en la nota diaria.

_(Este anexo se desarrollará a continuación si se requiere.)_

### Anexo C: Protocolo escrito de check-out / check-in

Documento formalizable como política interna del bufete, explicando el procedimiento, la sintaxis de las anotaciones y las consecuencias de no respetarlo. Incluye un ejemplo de nota diaria y respuestas a objeciones comunes.

### Anexo D: Simulador interactivo de un conflicto de sincronización y su resolución

Guía paso a paso para provocar un conflicto controlado y resolverlo, diseñada para entrenar a los abogados en la recuperación sin pérdida de datos.

### Anexo E: Bóveda de demostración con tres casos simulados

Estructura completa de una bóveda de ejemplo, con dos abogados ficticios, notas diarias de varios días, jurisprudencia y escritos entrelazados, lista para importar.

---

Cada anexo se entrega como archivo Markdown autónomo, integrable en el sitio del curso para visualización en línea o descarga directa. La intención es que el abogado pueda copiar, pegar y empezar a usar el material en cuestión de segundos, sin necesidad de volver a los módulos teóricos.