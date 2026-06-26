---
title: "Anexo E: Bóveda de demostración"
slug: "anexo-e-ejemplo"
subtitle: "Bóveda funcional con tres casos simulados y dos abogados ficticios."
objective:
  - "Copiar la bóveda de demostración a una instalación nueva."
  - "Explorar funcionalidades sin riesgo para datos reales."
order: 104
type: "anexo"
---
## Anexo E: Bóveda de demostración con tres casos simulados, dos abogados ficticios y notas diarias de ejemplo

Este anexo proporciona una bóveda de demostración completamente funcional. Contiene tres expedientes de distintas áreas del derecho, sus clientes, la jurisprudencia vinculada, la doctrina aplicable y un conjunto de notas diarias que muestran el uso del protocolo de check‑out / check‑in por parte de dos abogados ficticios: Luis Méndez (director) y Ana Gómez (asociada).

La bóveda está diseñada para ser copiada directamente en una instalación nueva de Obsidian y sincronizada mediante Obsidian Sync, de modo que el despacho pueda explorar todas las funcionalidades descritas en el curso sin riesgo para sus datos reales. Cada archivo se presenta con su contenido íntegro; para usarlo, basta crear las carpetas y los archivos con los nombres indicados.

---

### E.1 Estructura general de la bóveda de demostración

La bóveda se llama `Bufete Demo` y respeta la organización estándar recomendada:

```text

Bufete Demo/
├── Indice.md
├── Clientes/
│   ├── María Gómez.md
│   ├── Pedro Rodríguez.md
│   └── Laura Castillo.md
├── Casos/
│   ├── EXP-2024-00045.md
│   ├── EXP-2024-00078.md
│   └── TUT-2024-00012.md
├── Doctrina/
│   ├── Artículo 2341 del Código Civil.md
│   ├── Artículo 422 del CGP.md
│   └── Artículo 239 del Código Penal.md
├── Jurisprudencia/
│   ├── Sentencia SC-456-2023.md
│   ├── Sentencia SC-789-2022.md
│   ├── Sentencia SC-101-2024.md
│   └── Sentencia SP-123-2024.md
├── Escritos/
│   ├── Demanda EXP-2024-00045.md
│   ├── Contestación EXP-2024-00078.md
│   └── Acción de tutela TUT-2024-00012.md
├── Agenda/
│   ├── 2024-07-15.md
│   ├── 2024-07-16.md
│   └── 2024-07-17.md
└── Plantillas/
    ├── Caso civil.md
    ├── Caso penal.md
    ├── Caso tutela.md
    ├── Demanda ejecutiva singular.md
    ├── Accion de tutela.md
    └── Recurso de reposicion.md
```

A continuación se detalla el contenido de cada archivo.

---

### E.2 Nota de índice (`Indice.md`)

```markdown

# Bóveda de demostración
Esta bóveda contiene tres casos simulados, dos abogados ficticios y notas diarias que ilustran el flujo de trabajo con Obsidian Sync, Dataview y el protocolo de check‑out / check‑in.
- [[Clientes/]] — Fichas de los clientes de prueba.
- [[Casos/]] — Tres expedientes (civil, penal, tutela).
- [[Doctrina/]] — Artículos del Código Civil, CGP y Código Penal.
- [[Jurisprudencia/]] — Sentencias de la Corte Suprema de Justicia (Sala Civil y Sala Penal) y Consejo de Estado.
- [[Escritos/]] — Demanda civil, contestación penal y acción de tutela.
- [[Agenda/]] — Notas diarias de los días 15, 16 y 17 de julio de 2024.
- [[Plantillas/]] — Plantillas de caso y de escritos procesales.
```
---

### E.3 Fichas de cliente

#### `Clientes/María Gómez.md`

```markdown

---
nombre: "María Gómez"
identificacion: "52.145.678"
tipo_documento: "CC"
domicilio: "Bogotá D.C."
telefono: "310-555-1234"
correo: "mariagomez@email.com"
calidad: "demandante"
tags: [cliente, persona-natural]
---
# Cliente - María Gómez
## Datos personales
- **Nombre completo:** María Gómez
- **Identificación:** CC 52.145.678
- **Domicilio:** Bogotá D.C.
- **Teléfono:** 310-555-1234
- **Correo electrónico:** mariagomez@email.com
## Calidad procesal habitual
demandante
## Casos relacionados
- [[EXP-2024-00045]]
```
#### `Clientes/Pedro Rodríguez.md`

```markdown

---
nombre: "Pedro Rodríguez"
identificacion: "79.321.654"
tipo_documento: "CC"
domicilio: "Medellín"
telefono: "311-555-9876"
correo: "pedror@email.com"
calidad: "indicado"
tags: [cliente, persona-natural]
---
# Cliente - Pedro Rodríguez
## Datos personales
- **Nombre completo:** Pedro Rodríguez
- **Identificación:** CC 79.321.654
- **Domicilio:** Medellín
- **Teléfono:** 311-555-9876
- **Correo electrónico:** pedror@email.com
## Calidad procesal habitual
indicado (defensa penal)
## Casos relacionados
- [[EXP-2024-00078]]
```
#### `Clientes/Laura Castillo.md`

```markdown

---
nombre: "Laura Castillo"
identificacion: "1.098.765.432"
tipo_documento: "CC"
domicilio: "Cali"
telefono: "312-555-4321"
correo: "laurac@email.com"
calidad: "accionante"
tags: [cliente, persona-natural]
---
# Cliente - Laura Castillo
## Datos personales
- **Nombre completo:** Laura Castillo
- **Identificación:** CC 1.098.765.432
- **Domicilio:** Cali
- **Teléfono:** 312-555-4321
- **Correo electrónico:** laurac@email.com
## Calidad procesal habitual
accionante en tutela
## Casos relacionados
- [[TUT-2024-00012]]
```
---

### E.4 Notas de caso

#### `Casos/EXP-2024-00045.md` (Civil – responsabilidad médica)

```markdown

---
cliente: "[[María Gómez]]"
radicado: "11001310300120240004500"
juzgado: "Juzgado 3 Civil del Circuito de Bogotá"
materia: "Civil - Responsabilidad civil médica"
fecha_inicio: 2024-03-15
estado: "activo"
proximo_hito: 2024-08-10
responsable: "Luis"
tags: [civil, responsabilidad-medica]
---
# EXP-2024-00045 - María Gómez vs. Clínica Norte
## Datos del proceso
- **Cliente:** [[María Gómez]]
- **Radicado:** 11001310300120240004500
- **Juzgado:** Juzgado 3 Civil del Circuito de Bogotá
- **Materia:** Civil - Responsabilidad civil médica
- **Fecha de inicio:** 2024-03-15
- **Estado:** activo
## Hechos relevantes
1. El 10 de octubre de 2023, María Gómez ingresó a la Clínica Norte para una colecistectomía laparoscópica programada.
2. Durante el procedimiento, el cirujano lesionó la vía biliar principal, lo que obligó a una segunda intervención no programada.
3. La paciente permaneció hospitalizada veinte días y desarrolló una infección por *Pseudomonas aeruginosa*.
4. La historia clínica reposa en el expediente y sus folios más relevantes están anotados en [[Historia clínica - María Gómez]].
## Fundamentos de derecho
- [[Artículo 2341 del Código Civil]]: responsabilidad civil extracontractual por culpa.
- [[Sentencia SC-456-2023]]: carga de la prueba en obligaciones de medio vs. resultado.
- [[Sentencia SC-789-2022]]: cuantificación del daño moral.
- [[Sentencia SC-101-2024]]: presunción de nexo causal en infecciones nosocomiales.
## Hitos procesales
- [x] Presentar demanda 📅 2024-03-15
- [x] Audiencia inicial 📅 2024-05-20
- [ ] Audiencia de pruebas 📅 2024-08-10
- [ ] Sentencia
## Escritos presentados
- [[Demanda EXP-2024-00045]]
```
#### `Casos/EXP-2024-00078.md` (Penal – hurto calificado)

```markdown

---
cliente: "[[Pedro Rodríguez]]"
radicado: "05001600000020240007800"
fiscalia: "Fiscalía 15 Seccional de Medellín"
juzgado: "Juzgado 8 Penal Municipal con Función de Control de Garantías"
delito: "Hurto calificado (art. 240 C.P.)"
etapa_procesal: "investigación"
fecha_inicio: 2024-06-10
estado: "activo"
proximo_hito: 2024-07-28
calidad_cliente: "indicado"
responsable: "Luis"
tags: [penal, hurto]
---
# EXP-2024-00078 - Defensa de Pedro Rodríguez
## Datos del proceso
- **Cliente:** [[Pedro Rodríguez]]
- **Calidad:** indicado
- **Radicado / SPOA:** 05001600000020240007800
- **Fiscalía:** Fiscalía 15 Seccional de Medellín
- **Juzgado:** Juzgado 8 Penal Municipal con Función de Control de Garantías
- **Delito:** Hurto calificado
- **Etapa procesal:** investigación
- **Fecha de inicio:** 2024-06-10
- **Estado:** activo
## Hechos relevantes
1. El 5 de junio de 2024, el señor Rodríguez fue capturado en flagrancia en un establecimiento de comercio, acusado de sustraer varios elementos.
2. La fiscalía formuló imputación por hurto calificado, con base en el presunto valor de los bienes.
3. La defensa considera que no existe suficiente evidencia sobre la cuantía y que no se configura la calificación del hurto.
## Elementos materiales probatorios
- Acta de captura y denuncia.
- Registro de cámaras de seguridad.
- Declaración del testigo único.
## Hitos procesales
- [x] Audiencia de imputación 📅 2024-06-11
- [ ] Audiencia de medida de aseguramiento 📅 2024-07-28
- [ ] Audiencia de acusación
- [ ] Juicio oral
## Fundamentos de derecho
- [[Artículo 239 del Código Penal]]: hurto simple.
- [[Sentencia SP-123-2024]]: diferencia entre hurto simple y calificado.
```
#### `Casos/TUT-2024-00012.md` (Tutela contra EPS)

```markdown

---
accionante: "[[Laura Castillo]]"
accionado: "EPS SaludVida"
radicado: "76001400900120240001200"
derecho_vulnerado: "Salud (art. 49 C.P.)"
fecha_presentacion: 2024-07-10
estado: "activo"
proximo_hito: 2024-07-20
responsable: "Ana"
tags: [tutela, constitucional]
---
# TUT-2024-00012 - Laura Castillo vs. EPS SaludVida
## Datos de la acción de tutela
- **Accionante:** [[Laura Castillo]]
- **Accionado:** EPS SaludVida
- **Radicado:** 76001400900120240001200
- **Derecho vulnerado:** Salud (art. 49 C.P.)
- **Fecha de presentación:** 2024-07-10
- **Medida provisional solicitada:** Entrega inmediata del medicamento.
## Procedencia de la tutela
1. **Legitimación activa:** Laura Castillo, directamente afectada.
2. **Legitimación pasiva:** EPS SaludVida, particular que presta servicio público de salud.
3. **Inmediatez:** La negación del medicamento ocurrió el 5 de julio de 2024 y la tutela se radicó el 10 de julio.
4. **Subsidiariedad:** No existe mecanismo judicial idóneo para proteger el derecho a la salud de manera urgente.
## Hechos relevantes
1. Laura Castillo padece una enfermedad crónica que requiere el medicamento Inmunoglobulina.
2. La EPS negó la autorización argumentando exclusión del POS.
3. La paciente no puede costear el medicamento por sus propios medios.
## Fundamentos de derecho
- Artículo 49 de la Constitución Política.
- [[Sentencia T-456-2022]]: derecho a la salud como fundamental autónomo.
```
---

### E.5 Doctrina

Se incluyen solo los artículos citados en los casos. Los contenidos son mínimos para que la bóveda funcione, pero pueden ampliarse posteriormente.

#### `Doctrina/Artículo 2341 del Código Civil.md`

```markdown

---
cuerpo_normativo: "Código Civil"
numero: "2341"
tema: "Responsabilidad extracontractual"
tags: [civil, responsabilidad]
---
# Artículo 2341 del Código Civil
> "El que ha cometido un delito o culpa que ha inferido daño a otro, es obligado a la indemnización; y si son dos o más los culpables, cada uno de ellos responderá solidariamente por la indemnización."
```
#### `Doctrina/Artículo 422 del CGP.md`

```markdown

---
cuerpo_normativo: "Código General del Proceso"
numero: "422"
tema: "Título ejecutivo"
tags: [civil, ejecutivo]
---
# Artículo 422 del CGP
> "Pueden demandarse ejecutivamente las obligaciones claras, expresas y actualmente exigibles que consten en documento que provenga del deudor o de su causante y constituya plena prueba contra él, o las que emanen de una sentencia de condena proferida por juez o tribunal de cualquier jurisdicción, o de otra providencia judicial, o de las providencias que en procesos contencioso‑administrativos o de policía aprueben liquidación de costas o señalen honorarios de auxiliares de la justicia, y en los demás casos previstos en la ley."
```
#### `Doctrina/Artículo 239 del Código Penal.md`

```markdown

---
cuerpo_normativo: "Código Penal"
numero: "239"
tema: "Hurto simple"
tags: [penal, hurto]
---
# Artículo 239 del Código Penal
> "El que se apodere de una cosa mueble ajena, con el propósito de obtener provecho para sí o para otro, incurrirá en prisión de treinta y dos (32) a ciento ocho (108) meses."

---
```
### E.6 Jurisprudencia

#### `Jurisprudencia/Sentencia SC-456-2023.md`

```markdown

---
corporacion: "Corte Suprema de Justicia - Sala Civil"
fecha: 2023-11-28
magistrado: "Luis Armando Tolosa Villabona"
asunto: "Responsabilidad médica - carga de la prueba"
tags: [civil, responsabilidad-medica, prueba]
---
# Sentencia SC-456-2023
## Ratio decidendi
> "En materia de responsabilidad médica, la carga de la prueba se distribuye según la naturaleza de la obligación. Tratándose de obligaciones de medio, corresponde al demandante acreditar la culpa; en las de resultado, esta se presume."
```
#### `Jurisprudencia/Sentencia SC-789-2022.md`

```markdown

---
corporacion: "Corte Suprema de Justicia - Sala Civil"
fecha: 2022-05-10
magistrado: "Aroldo Wilson Quiroz Monsalvo"
asunto: "Cuantificación del daño moral"
tags: [civil, daño-moral]
---
# Sentencia SC-789-2022
## Ratio decidendi
> "El daño moral se presume cuando la lesión a la integridad física es de tal entidad que afecta el bienestar anímico. Su cuantificación debe atender al principio de reparación integral y al arbitrio judicial."
```
#### `Jurisprudencia/Sentencia SC-101-2024.md`

```markdown

---
corporacion: "Corte Suprema de Justicia - Sala Civil"
fecha: 2024-02-14
magistrado: "Hilda González Neira"
asunto: "Nexo causal en infecciones nosocomiales"
tags: [civil, responsabilidad-medica, nexo-causal]
---
# Sentencia SC-101-2024
## Ratio decidendi
> "Cuando la infección se produce dentro del entorno hospitalario y no hay evidencia de que estuviera presente al ingreso, opera una presunción judicial de nexo causal que traslada la carga de la prueba a la institución."
```
#### `Jurisprudencia/Sentencia SP-123-2024.md`

```markdown

---
corporacion: "Corte Suprema de Justicia - Sala Penal"
fecha: 2024-04-03
magistrado: "Eugenio Fernández Carlier"
asunto: "Hurto calificado y simple - distinción"
tags: [penal, hurto]
---
# Sentencia SP-123-2024
## Ratio decidendi
> "La calificación del hurto no se configura automáticamente por el valor del bien; es necesario que el ente acusador demuestre, más allá de duda razonable, que la conducta se adecuó a alguna de las circunstancias del artículo 240 del Código Penal."
```
---

### E.7 Escritos procesales

#### `Escritos/Demanda EXP-2024-00045.md`

```markdown

---
caso: "[[EXP-2024-00045]]"
tipo: "Demanda"
fecha: 2024-03-15
tags: [escrito, demanda, civil]
---
# Demanda EXP-2024-00045
*(Contenido resumido; en una bóveda real se insertaría la plantilla completa y se completaría con los hechos y pretensiones.)*
## Hechos
1. El 10 de octubre de 2023, María Gómez ingresó a la Clínica Norte para colecistectomía laparoscópica.
2. El cirujano lesionó la vía biliar, obligando a una segunda cirugía.
3. La paciente sufrió infección nosocomial y hospitalización adicional de 20 días.
## Pretensiones
1. Indemnización de perjuicios materiales y morales.
2. Costas y agencias en derecho.
```
#### `Escritos/Contestación EXP-2024-00078.md`

```markdown

---
caso: "[[EXP-2024-00078]]"
tipo: "Contestación"
fecha: 2024-06-20
tags: [escrito, penal, contestacion]
---
# Contestación EXP-2024-00078
*(Resumen de la postura de la defensa.)*
La defensa sostiene que no hay evidencia suficiente para la calificación del hurto y que la conducta se adecua, en el peor de los casos, al tipo básico del artículo 239 del Código Penal. Se solicitará la práctica de pruebas periciales para establecer el valor real de los bienes.
```
#### `Escritos/Acción de tutela TUT-2024-00012.md`

```markdown

---
caso: "[[TUT-2024-00012]]"
tipo: "Acción de tutela"
fecha: 2024-07-10
tags: [escrito, tutela]
---
# Acción de tutela TUT-2024-00012
*(Resumen de la pretensión.)*
Se solicita amparar el derecho fundamental a la salud de Laura Castillo y ordenar a la EPS SaludVida la entrega inmediata del medicamento Inmunoglobulina, así como el tratamiento integral.
```
---

### E.8 Notas diarias

Las siguientes notas diarias muestran un fragmento del trabajo de los días 15, 16 y 17 de julio de 2024. Los abogados Luis Méndez (LM) y Ana Gómez (AG) utilizan el protocolo de check‑out / check‑in y registran sus gestiones.

#### `Agenda/2024-07-15.md`

```markdown

# 2024-07-15
- [LM] Check-out [[Demanda EXP-2024-00045]] - LM. Inicio: 08:00.
- [LM] Ajuste de los hechos y adición de la nueva prueba documental.
- [AG] Revisada la tutela [[TUT-2024-00012]]. Se incorporó la respuesta de la EPS.
- [AG] Check-out [[Acción de tutela TUT-2024-00012]] - AG. Inicio: 09:30.
- [LM] Check-in [[Demanda EXP-2024-00045]] - LM. Cambios: hechos actualizados y anexo de historia clínica. Fin: 10:30.
- [AG] Check-in [[Acción de tutela TUT-2024-00012]] - AG. Cambios: inserción de la negativa de la EPS. Fin: 11:00.
- [LM] Revisado el estado del caso penal [[EXP-2024-00078]]; pendiente preparar memorial para audiencia.
```
#### `Agenda/2024-07-16.md`

```markdown

# 2024-07-16
- [LM] Check-out [[Contestación EXP-2024-00078]] - LM. Inicio: 08:15.
- [LM] Redacción de la contestación de la defensa penal.
- [AG] Lectura de la [[Sentencia SC-101-2024]] y actualización del análisis del caso civil.
- [AG] Check-out [[Demanda EXP-2024-00045]] - AG. Inicio: 10:00.
- [AG] Incorporación de la nueva ratio en los fundamentos de derecho.
- [LM] Check-in [[Contestación EXP-2024-00078]] - LM. Cambios: borrador completo de contestación. Fin: 12:00.
- [AG] Check-in [[Demanda EXP-2024-00045]] - AG. Cambios: se añadió cita de SC-101-2024. Fin: 12:30.
- Ambos sincronizaron la bóveda sin conflictos.
```
#### `Agenda/2024-07-17.md`

```markdown

# 2024-07-17
- [LM] Asistió a audiencia de control de garantías en [[EXP-2024-00078]]. Se dictó medida de aseguramiento no privativa de la libertad.
- [LM] Anotó el resultado en la nota del caso y actualizó próximo hito para 2024-08-15 (audiencia de acusación).
- [AG] Radicó la acción de tutela [[TUT-2024-00012]] en el juzgado. Pendiente reparto.
- [AG] Sincronizó y registró la radicación.
- Revisión del tablero Dataview: todos los hitos próximos están cubiertos.
```
---

### E.9 Plantillas

La carpeta `Plantillas/` contiene las siguientes plantillas, cuyo contenido detallado se describió en el Módulo 3 y en los anexos anteriores. Para la bóveda de demostración, basta con que existan como archivos vacíos o con el contenido mínimo; se recomienda copiar las versiones completas del curso.

- `Caso civil.md` (plantilla de caso civil)
    
- `Caso penal.md` (plantilla de caso penal)
    
- `Caso tutela.md` (plantilla de caso de tutela)
    
- `Demanda ejecutiva singular.md`
    
- `Accion de tutela.md`
    
- `Recurso de reposicion.md`
    

---

### E.10 Instrucciones para cargar la bóveda de demostración

1. Crear una bóveda vacía en Obsidian llamada `Bufete Demo`.
    
2. Dentro de ella, crear las carpetas `Clientes`, `Casos`, `Doctrina`, `Jurisprudencia`, `Escritos`, `Agenda`, `Plantillas`.
    
3. Crear los archivos `.md` con los nombres y contenidos exactos que aparecen en este anexo.
    
4. (Opcional) Sincronizar la bóveda mediante Obsidian Sync para que dos abogados puedan trabajar sobre ella y practicar el protocolo de check‑out / check‑in.
    
5. Una vez familiarizado con el sistema, eliminar la bóveda de demostración y trasladar las buenas prácticas a la bóveda real del despacho.