---
title: "Plantillas para la litigación colombiana"
slug: "plantillas-litigacion-colombiana"
subtitle: "Diseño y despliegue de plantillas reutilizables para fichas de cliente, casos, demanda ejecutiva y tutela, con metadatos YAML que alimentan consultas dinámicas."
objective:
  - "Configurar el plugin nativo Templates y el plugin comunitario Templater para inserción automática de fechas y nombres."
  - "Crear y parametrizar plantillas de ficha de cliente (persona natural y jurídica) con campos obligatorios."
  - "Crear una plantilla de caso con frontmatter completo (radicado, juzgado, materia, estado, tags)."
  - "Elaborar una plantilla de demanda ejecutiva singular con los requisitos del artículo 422 del CGP."
  - "Elaborar una plantilla de acción de tutela con los presupuestos de procedencia."
  - "Compartir las plantillas mediante la carpeta `Plantillas/` de la bóveda sincronizada."
order: 3
datasets:
  - "No aplica. Módulo de productividad y configuración."
---
# Módulo 3: Plantillas que hablan el lenguaje judicial colombiano
## 3.1 Los plugins de plantillas: nativo y Templater
Obsidian incluye un plugin básico de plantillas, suficiente para insertar el contenido de una nota predefinida en una nota nueva. Para dotar a las plantillas de dinamismo —insertar automáticamente la fecha actual, el nombre del archivo, el título de la nota u otras variables—, se requiere el plugin comunitario **Templater**. Ambos conviven sin conflicto y se recomienda usarlos de forma complementaria.
### 3.1.1 Activación del plugin nativo Templates
1. Vaya a «Settings > Core plugins».
2. Active «Templates».
3. En la configuración del plugin (icono de engranaje), establezca «Template folder location» como `Plantillas`. Esta carpeta ya existe en la estructura estandarizada definida en el Módulo 1.
4. Defina un atajo de teclado para «Insert template» desde «Settings > Hotkeys». Se sugiere `Ctrl/Cmd + Shift + T`.
A partir de ahora, al crear una nota nueva, puede invocar el comando «Insert template» y elegir cualquier archivo `.md` que esté dentro de `Plantillas/`. El contenido se vuelca en la nota activa.
### 3.1.2 Instalación y configuración de Templater
Templater permite insertar variables dinámicas como `{{date}}`, `{{title}}` o ejecutar pequeños scripts. Para instalarlo:
1. Vaya a «Settings > Community plugins» y, si es necesario, active el modo seguro («Turn off safe mode»).
2. Busque «Templater» e instálelo.
3. Active el plugin.
4. En la configuración de Templater, defina «Template folder location» como `Plantillas` (la misma carpeta, para centralizar todas las plantillas).
5. Active «Automatic jump to cursor» si desea que el cursor se posicione en un marcador `{{cursor}}` después de insertar la plantilla.
6. En «Trigger Templater on new file creation», active la opción y elija la plantilla que desea que se aplique automáticamente cuando se crea una nota dentro de una carpeta específica. Esto se configurará más adelante para los casos y clientes.
Con Templater, las plantillas pueden incluir comandos como `{{tp.date.now("YYYY-MM-DD")}}` o `{{tp.file.title}}`, que se expanden al insertar la plantilla.
## 3.2 Plantilla de ficha de cliente: persona natural
Todo cliente debe tener una ficha individual en la carpeta `Clientes/`. Esta plantilla recoge los datos mínimos que exige la gestión procesal y el deber de conocimiento del cliente (Ley 1123 de 2007, art. 28, num. 8). Se crea un archivo `Plantillas/Ficha cliente - persona natural.md` con el siguiente contenido:
```markdown
---
nombre: ""
identificacion: ""
tipo_documento: "CC"
domicilio: ""
telefono: ""
correo: ""
calidad: "demandante"
tags: [cliente]
---
# Cliente - {{title}}
## Datos personales
- **Nombre completo:** {{nombre}}
- **Identificación:** {{tipo_documento}} {{identificacion}}
- **Domicilio:** {{domicilio}}
- **Teléfono:** {{telefono}}
- **Correo electrónico:** {{correo}}
## Calidad procesal habitual
{{calidad}}
## Casos relacionados
- (Se enlazarán automáticamente desde las notas de caso)

**Notas sobre esta plantilla:**

- Los campos en el frontmatter YAML (`nombre`, `identificacion`, etc.) están vacíos intencionalmente. El abogado los llenará al crear la ficha concreta.
    
- El título de la nota será el nombre del cliente. Por eso se usa `{{title}}` como encabezado.
    
- La etiqueta `#cliente` permite localizar todas las fichas de clientes con una sola consulta.
    
- La sección «Casos relacionados» no necesita llenarse manualmente. Los backlinks de Obsidian mostrarán allí todos los casos que enlacen a esta ficha.
    

**Flujo de uso:**

1. Cree una nueva nota en `Clientes/` con el nombre del cliente, por ejemplo `Juan Pérez`.
    
2. Invoque «Insert template» (`Ctrl/Cmd + Shift + T`) y seleccione `Ficha cliente - persona natural`.
    
3. Llene los campos del frontmatter y complete los datos personales.
    
4. Enlace la ficha desde la nota del caso escribiendo `[[Juan Pérez]]`.
    

## 3.3 Plantilla de ficha de cliente: persona jurídica

Para personas jurídicas, la plantilla se adapta ligeramente. Cree `Plantillas/Ficha cliente - persona juridica.md`:

markdown

---
razon_social: ""
nit: ""
domicilio: ""
representante_legal: ""
telefono: ""
correo: ""
calidad: "demandante"
tags: [cliente, persona-juridica]
---
# {{title}}
## Identificación
- **Razón social:** {{razon_social}}
- **NIT:** {{nit}}
- **Domicilio principal:** {{domicilio}}
## Representante legal
- **Nombre:** {{representante_legal}}
- **Teléfono:** {{telefono}}
- **Correo:** {{correo}}
## Calidad procesal habitual
{{calidad}}
## Casos relacionados
- (backlinks automáticos)

La lógica es idéntica. La distinción mediante etiqueta (`#persona-juridica`) permite filtrar después.

## 3.4 Plantilla de caso con frontmatter completo

El corazón del sistema es la nota de caso. Debe contener todos los metadatos necesarios para las consultas de Dataview y la trazabilidad procesal. Cree `Plantillas/Caso.md`:

markdown

---
cliente: "[[Ficha cliente]]"
radicado: ""
juzgado: ""
materia: ""
fecha_inicio: {{tp.date.now("YYYY-MM-DD")}}
estado: "activo"
proximo_hito: ""
tags: []
---
# {{title}}
## Datos del proceso
- **Cliente:** {{cliente}}
- **Radicado:** {{radicado}}
- **Juzgado:** {{juzgado}}
- **Materia:** {{materia}}
- **Fecha de inicio:** {{fecha_inicio}}
- **Estado:** {{estado}}
## Hitos procesales
- [ ] Presentar demanda 📅 {{proximo_hito}}
- [ ] Audiencia inicial
- [ ] Audiencia de pruebas
- [ ] Sentencia
## Notas y estrategia
...

**Detalles de la plantilla:**

- `{{tp.date.now("YYYY-MM-DD")}}` inserta la fecha actual en formato ISO 8601, esencial para ordenar y comparar fechas en Dataview.
    
- `{{title}}` se expande al nombre del archivo, que debe ser el número de radicado o un identificador claro del caso (ejemplo: `EXP-2024-00123`).
    
- El campo `estado` puede tomar valores como `activo`, `archivado`, `suspendido`. El módulo 5 los usará para listar casos activos.
    
- `proximo_hito` es una fecha que alimentará el tablero de control.
    
- Las tareas con checkbox (`- [ ]`) serán rastreadas por Dataview.
    

Para usar esta plantilla automáticamente cada vez que se crea una nota en la carpeta `Casos/`, configure Templater:

1. Abra la configuración de Templater.
    
2. En «Folder templates», añada una regla: carpeta `Casos/`, plantilla `Plantillas/Caso.md`.
    
3. Marque «Create on folder creation» si desea que al crear la carpeta se genere la nota automáticamente. En la práctica, con crear el archivo dentro de `Casos/` es suficiente.
    

Ahora, cuando cree una nueva nota en `Casos/` (por ejemplo, `EXP-2024-0056`), la plantilla se insertará automáticamente. Solo deberá llenar los campos del frontmatter y los datos particulares.

## 3.5 Plantilla de demanda ejecutiva singular (artículo 422 del CGP)

Los escritos procesales también se benefician de una estructura predefinida. La siguiente plantilla sigue los lineamientos del Código General del Proceso para una demanda ejecutiva singular (art. 422 y ss.). Cree `Plantillas/Demanda ejecutiva singular.md`:

markdown

---
cliente: "[[Ficha cliente]]"
radicado: ""
juzgado: "Juzgado Civil Municipal de ..."
materia: "Ejecutivo singular"
tags: [civil, ejecutivo]
---
# Demanda ejecutiva singular
**Señor(a) Juez(a)** {{juzgado}}
**E. S. D.**
**Ref.:** Demanda ejecutiva singular de {{cliente}} contra {{demandado}}
**{{cliente}}**, mayor de edad, identificado con {{tipo_documento}} {{identificacion}}, domiciliado en {{domicilio}}, actuando en nombre propio, respetuosamente presento demanda ejecutiva singular contra **{{demandado}}**, mayor de edad, identificado con {{tipo_documento_demandado}} {{identificacion_demandado}}, domiciliado en {{domicilio_demandado}}, con fundamento en los siguientes:
## Hechos
1. {{hecho_1}}
2. {{hecho_2}}
3. {{hecho_3}}
## Título ejecutivo
Adjunto y se incorpora el título valor que reúne los requisitos del artículo 422 del CGP, consistente en:
- [ ] Pagaré
- [ ] Letra de cambio
- [ ] Cheque
- [ ] Contrato con constancia de incumplimiento
## Pretensiones
1. Se ordene el pago de la suma de {{capital}} por concepto de capital insoluto.
2. Se ordene el pago de intereses moratorios desde el {{fecha_exigibilidad}} hasta la fecha del pago efectivo, liquidados a la tasa máxima legal.
3. Se condene en costas y agencias en derecho.
## Fundamentos de derecho
- Artículo 422 del CGP: condiciones del título ejecutivo.
- Artículo 784 del Código de Comercio: requisitos del pagaré.
- Artículo 621 del Código de Comercio: mérito ejecutivo de los títulos valores.
- Jurisprudencia aplicable: [[Sentencia T-123-20]] (debido proceso en ejecutivos).
## Pruebas
1. Documental: título valor original, carta de requerimiento.
2. Interrogatorio de parte al demandado.
3. Las demás que el despacho estime pertinentes.
## Competencia y cuantía
Es competente el señor Juez por el domicilio del demandado (art. 28, num. 1, CGP) y por la cuantía, que asciende a {{cuantia}}.
## Anexos
- Título valor base de la ejecución.
- Carta de requerimiento.
- Poder debidamente conferido.
- Copia de la demanda para traslado.
Atentamente,
{{cliente}}
C.C. {{identificacion}}
```
**Uso de la plantilla:**

- Los marcadores `{{...}}` son de Templater o se llenan manualmente. Para mayor dinamismo, puede convertir esta plantilla en una plantilla de Templater con campos interactivos usando `{{tp.system.prompt("Nombre del demandado")}}` si se desea un formulario emergente.
    
- Al ser un archivo dentro de `Plantillas/`, se sincroniza con el resto del equipo. Cualquier mejora que haga un abogado a la estructura de la demanda beneficiará a todos al día siguiente.
    
- Los checkboxes (`- [ ]`) permiten marcar el tipo de título ejecutivo; no afectan la exportación pero ayudan a recordar qué documentos anexar.
    

## 3.6 Plantilla de acción de tutela

La acción de tutela (art. 86 de la Constitución Política) tiene requisitos de procedencia específicos. La siguiente plantilla se ajusta al Decreto 2591 de 1991. Cree `Plantillas/Accion de tutela.md`:

```markdown

---
accionante: "[[Ficha cliente]]"
accionado: ""
derecho_vulnerado: ""
radicado: ""
fecha: {{tp.date.now("YYYY-MM-DD")}}
tags: [tutela, constitucional]
---
# Acción de tutela
**Señor(a) Juez(a) Constitucional**
**E. S. D.**
**Ref.:** Acción de tutela de {{accionante}} contra {{accionado}}
**{{accionante}}**, mayor de edad, identificado con {{tipo_documento}} {{identificacion}}, actuando en nombre propio, interpongo **acción de tutela** contra **{{accionado}}**, por la violación del derecho fundamental a {{derecho_vulnerado}}, consagrado en el artículo {{articulo_constitucional}} de la Constitución Política, con base en los siguientes:
## Hechos
1. {{hecho_1}}
2. {{hecho_2}}
3. {{hecho_3}}
## Derechos vulnerados
El(los) derecho(s) fundamental(es) cuya protección se invoca es(son):
- {{derecho_vulnerado}}
## Procedencia de la tutela
De conformidad con el artículo 86 de la Constitución y el Decreto 2591 de 1991, la presente acción es procedente porque:
1. **Legitimación activa:** El suscrito es titular del derecho vulnerado.
2. **Legitimación pasiva:** La entidad accionada es autoridad pública (o particular que presta servicio público).
3. **Inmediatez:** Los hechos ocurrieron el {{fecha_hechos}} y la acción se interpone dentro de un plazo razonable.
4. **Subsidiariedad:** No existe otro mecanismo judicial idóneo para evitar un perjuicio irremediable, por las siguientes razones: {{razon_subsidiariedad}}.
## Pretensiones
1. Se tutele el derecho fundamental a {{derecho_vulnerado}}.
2. Se ordene a {{accionado}} que {{accion_concreta}}.
3. Se ordene el cumplimiento inmediato del fallo.
## Pruebas
1. Documental: {{lista_documentos}}.
2. Las demás que el despacho considere necesarias.
## Medida provisional
Solicito respetuosamente se decrete como medida provisional {{medida_provisional}}, para evitar un perjuicio irremediable mientras se resuelve la tutela (art. 7 del Decreto 2591/91).
## Juramento
Bajo la gravedad del juramento, manifiesto que no he interpuesto otra acción de tutela por los mismos hechos y derechos.
Atentamente,
{{accionante}}
C.C. {{identificacion}}
```
**Puntos clave de la plantilla:**

- Incluye una sección específica para argumentar la procedencia, que es el primer filtro que examina el juez constitucional. Esto obliga al abogado a justificar cada presupuesto (legitimación, inmediatez, subsidiariedad) antes de radicar.
    
- El campo `derecho_vulnerado` y `accion_concreta` guían la redacción de la pretensión.
    
- Se recuerda la posibilidad de solicitar medida provisional.
    

## 3.7 Compartición y mantenimiento de las plantillas

Todas las plantillas residen en la carpeta `Plantillas/`, que está dentro de la bóveda sincronizada con Obsidian Sync. Esto significa que:

- Cualquier abogado del despacho puede insertar la misma plantilla de demanda o tutela, asegurando uniformidad en todos los escritos.
    
- Si el director del despacho decide actualizar la estructura de la demanda (por ejemplo, añadir un acápite sobre conciliación extrajudicial), modifica el archivo `Plantillas/Demanda ejecutiva singular.md` y los cambios se propagan a todos los equipos en minutos.
    
- Las plantillas incluyen metadatos YAML que alimentarán el motor de consultas Dataview (Módulo 5). Por eso es crucial mantener la consistencia de los nombres de los campos (`radicado`, `juzgado`, `materia`, `estado`, `cliente`) en todas las plantillas que generen notas de caso o de clientes.
    

**Recomendación final:** designe un responsable de las plantillas dentro del despacho. Esa persona revisa periódicamente que los campos del frontmatter sean los adecuados y que las plantillas reflejen los cambios normativos o las mejores prácticas de litigio. La inversión de tiempo en afinar estas plantillas se recupera exponencialmente con cada escrito que se inicia sin partir de cero.

## 3.8 Ejercicio guiado

1. En la bóveda del despacho, cree la carpeta `Plantillas/` si no existe.
    
2. Cree cada uno de los cinco archivos de plantilla descritos en este módulo.
    
3. Configure Templater para que asigne automáticamente la plantilla `Caso.md` a los nuevos archivos dentro de `Casos/`.
    
4. Cree una ficha de cliente ficticio (persona natural) y otra de persona jurídica usando las plantillas correspondientes.
    
5. Cree una nota de caso en `Casos/` con el nombre `EXP-2024-00100` y verifique que la plantilla se inserta automáticamente. Llene los metadatos y enlace la ficha del cliente recién creada.
    
6. Inserte la plantilla de demanda ejecutiva en una nueva nota dentro de `Escritos/` y complete los marcadores. Exporte a PDF para verificar que la estructura es correcta.
    
7. Repita el paso anterior con la plantilla de tutela.