---
title: "Sintaxis Markdown para la redacción procesal"
slug: "sintaxis-markdown-redaccion-procesal"
subtitle: "Vocabulario de formato justo para redactar cualquier documento procesal sin distracciones, con enlaces, etiquetas y exportación a PDF."
objective:
  - "Crear enlaces internos con doble corchete para conectar normas, jurisprudencia y clientes."
  - "Clasificar notas mediante etiquetas (#civil, #penal, #tutela) y comprender su utilidad en la bóveda."
  - "Dominar listas numeradas, citas textuales, negritas y cursivas con atajos de teclado."
  - "Redactar los hechos de una demanda utilizando exclusivamente Markdown y exportarlos a PDF con formato forense."
order: 2
datasets:
  - "No aplica. Módulo de sintaxis."
---
# Módulo 2: Sintaxis Markdown para la redacción procesal
## 2.1 El doble corchete: enlazar personas, normas y precedentes
El mecanismo central de Obsidian es el enlace bidireccional. En Markdown, se crea escribiendo el nombre de la nota entre dobles corchetes: `[[Nombre de la nota]]`. Este gesto, que no requiere menús ni ratón, establece una conexión permanente entre dos piezas de información. En el contexto jurídico, los enlaces transforman una colección de archivos sueltos en una red de conocimiento navegable.
**Enlazar un cliente.** Si la ficha del cliente se llama `Cliente - Juan Pérez`, al escribir `[[Cliente - Juan Pérez]]` dentro de la nota de un caso, Obsidian genera un vínculo. Al hacer clic, se abre la ficha. Al abrir la ficha, la sección de *backlinks* muestra todos los casos que mencionan a ese cliente. Así se reconstruye el historial completo sin buscarlo.
**Enlazar una norma.** Puede crearse una nota por cada artículo relevante, por ejemplo `Artículo 2341 del Código Civil`. Al escribir `[[Artículo 2341 del Código Civil]]` en una demanda o en un análisis de responsabilidad, el enlace queda registrado. Esto permite, en el futuro, localizar todos los escritos donde se invocó ese artículo.
**Enlazar jurisprudencia.** Una nota de sentencia, como `Sentencia C-123-24`, se enlaza de igual forma: `[[Sentencia C-123-24]]`. El abogado puede navegar de la sentencia a los casos donde se citó, y de cada caso a su cliente y escritos.
**Sintaxis para renombrar el enlace.** Si se desea que el texto mostrado sea distinto al nombre de la nota, se utiliza la barra vertical: `[[Nombre de la nota|texto visible]]`. Por ejemplo: `[[Artículo 2341 del Código Civil|artículo 2341 C.C.]]`. Esto es útil para que la lectura sea fluida sin renunciar a la precisión del enlace.
La práctica recomendada es enlazar siempre que se mencione un cliente, una norma o una sentencia. No lleva más tiempo que escribir el nombre y construye, sin esfuerzo adicional, la trama de relaciones del despacho.
## 2.2 Etiquetas: clasificación por materias y temas procesales
Las etiquetas en Obsidian se escriben anteponiendo el símbolo numeral: `#civil`, `#penal`, `#laboral`, `#tutela`, `#prueba`. Pueden insertarse en cualquier parte de una nota, aunque es más eficaz ubicarlas en el frontmatter YAML o al inicio del texto.
A diferencia de las carpetas, una nota puede tener múltiples etiquetas. Un caso de responsabilidad médica puede etiquetarse simultáneamente como `#civil`, `#responsabilidad` y `#prueba-pericial`. Esto permite recuperar todas las notas que comparten una etiqueta con un solo clic, ya sea desde el panel de búsqueda o desde el panel de etiquetas de la barra lateral.
**Buenas prácticas para etiquetas jurídicas:**
- Use el singular y la minúscula: `#contrato`, no `#Contratos`.
- Evite los espacios; si necesita dos palabras, únalas con guion: `#prueba-documental`.
- Defina un conjunto controlado de etiquetas para el despacho y documéntelo en `Indice.md`. Esto previene la proliferación de etiquetas equivalentes (por ejemplo, `#civil` y `#derecho-civil`).
- No etiquete en exceso. Una nota debe tener entre una y cinco etiquetas, las indispensables para encontrarla después.
El buscador de Obsidian permite consultas como `tag:#civil` para listar todas las notas de derecho civil, o combinaciones como `tag:#civil tag:#prueba` para refinar.
## 2.3 Listas numeradas, citas textuales, negritas y cursivas sin recurrir al ratón
La redacción jurídica exige precisión en la estructura. Markdown ofrece la sintaxis mínima para construir documentos complejos sin apartar las manos del teclado.
### Listas numeradas
Para los hechos de una demanda o los fundamentos de derecho, las listas numeradas son esenciales. Se escriben simplemente con `1.`, `2.`, etc.:
```markdown
1. El día 15 de marzo de 2024, las partes suscribieron contrato de prestación de servicios.
2. La demandada incumplió la cláusula tercera a partir del 1 de junio de 2024.
3. Se agotó la conciliación extrajudicial el 10 de agosto de 2024, sin acuerdo.

Obsidian genera automáticamente la numeración correcta incluso si se escribe `1.` en todas las líneas.
```
### Citas textuales

Para transcribir un apartado de una sentencia o norma, se usa el signo mayor que (`>`) al inicio de la línea:

```markdown

> La culpa se presume en los casos de responsabilidad por actividades peligrosas, correspondiendo al demandado acreditar la causa extraña. (Corte Suprema de Justicia, Sala Civil, sentencia SC-456-2023)
```

Las citas pueden anidarse con `>>` y combinarse con enlaces a la nota que contiene el texto completo de la providencia.
### Negritas y cursivas

- Negritas: `**texto**` (por ejemplo, `**pretensión principal**`).
    
- Cursivas: `*texto*` (por ejemplo, `*obiter dicta*`).
    

Se recomienda usar negritas para los títulos de los acápites dentro de un escrito (cuando no se usen encabezados) y cursivas para locuciones latinas o nombres de providencias.

### Encabezados

Los títulos y subtítulos se marcan con el símbolo `#`:

markdown

# Hechos
## Hecho primero
## Hecho segundo
# Pretensiones

Esta jerarquía se traduce luego, al exportar a PDF, en estilos tipográficos predefinidos que cumplen con los requisitos de presentación de los juzgados colombianos.

## 2.4 Ejemplo integral: redacción de los hechos de una demanda en Markdown

A continuación se presenta un fragmento realista de una demanda ejecutiva singular, redactada completamente en Markdown dentro de Obsidian:

markdown

# Demanda ejecutiva singular
**Juzgado:** [[Juzgado 1 Civil del Circuito de Bogotá]]
**Demandante:** [[Cliente - Inversiones ABC S.A.S.]]
**Demandado:** [[Deudor - Comercializadora XYZ Ltda.]]
**Radicado:** 11001310300120240012300
**Tags:** #civil #ejecutivo #pagaré
## Hechos
1. El 10 de enero de 2023, Comercializadora XYZ Ltda. suscribió pagaré a favor de Inversiones ABC S.A.S., por valor de $150.000.000, con fecha de vencimiento el 10 de enero de 2024.
2. El título valor fue presentado para su cobro en la fecha de vencimiento, sin que la demandada efectuara el pago.
3. Se adjunta el pagaré original y la carta de requerimiento de pago enviada el 15 de enero de 2024, recibida por la demandada el 17 de enero de 2024, sin respuesta.
## Fundamentos de derecho
- [[Artículo 422 del Código General del Proceso]]: el pagaré constituye título ejecutivo.
- [[Artículo 784 del Código de Comercio]]: requisitos del pagaré.
- [[Sentencia T-123-20]]: la Corte Constitucional ha reiterado que el proceso ejecutivo no vulnera el debido proceso cuando el título cumple los requisitos legales.
## Pretensiones
1. Se ordene el pago de $150.000.000 por capital insoluto.
2. Se ordene el pago de intereses moratorios desde el 11 de enero de 2024 hasta la fecha del pago efectivo.
3. Se condene en costas y agencias en derecho.
## Pruebas
- Documental: pagaré original, carta de requerimiento.
- Interrogatorio de parte al representante legal de la demandada.

Este documento, escrito sin tocar el ratón, contiene enlaces vivos a las notas del cliente, del juzgado, de los artículos del CGP y del Código de Comercio, y de la sentencia constitucional. No es un archivo aislado; es un nodo dentro de la red de conocimiento del despacho. Cualquier abogado del equipo puede abrir la nota del cliente y ver este escrito entre sus backlinks.

## 2.5 Exportación a PDF con formato forense

El objetivo no es litigar en Markdown, sino redactar en Markdown y presentar en PDF con el formato que exigen los estrados judiciales colombianos. Obsidian ofrece varias vías para exportar; aquí se describe la más directa, que se profundizará en el Módulo 8.

### Opción inmediata: exportar con plugin nativo

El plugin «PDF export» (incluido en el paquete básico de Obsidian) permite convertir cualquier nota a PDF aplicando una hoja de estilos CSS. El despacho puede definir un archivo CSS único que cumpla con los requisitos de presentación:

- Márgenes de 3 cm a cada lado (artículo 103 del CGP).
    
- Tipo de letra Arial o Times New Roman, tamaño 12.
    
- Interlineado doble.
    
- Numeración de páginas.
    
- Membrete del despacho en el encabezado.
    

Ese archivo CSS se configura una sola vez en «Settings > Appearance > CSS snippets» y se aplica automáticamente a todas las exportaciones. El flujo de trabajo es:

1. Redacte el escrito en la nota.
    
2. Presione `Ctrl/Cmd + P` y ejecute «Export to PDF».
    
3. El archivo PDF se guarda en una carpeta adyacente o en la ubicación elegida, listo para firmar digitalmente y radicar.
    

### Opción avanzada: Pandoc

Para mayor control tipográfico, se puede instalar Pandoc y el plugin «Pandoc Plugin» comunitario. Esto permite exportar a PDF y a `.docx` utilizando plantillas de formato predefinidas, compatibles con los requisitos de la Rama Judicial. Se abordará en el Módulo 8.

## 2.6 Ejercicio guiado

Para consolidar lo aprendido, realice el siguiente ejercicio dentro de la bóveda del despacho:

1. Cree una nota llamada `Ejercicio - Demanda verbal` en la carpeta `Escritos/`.
    
2. Copie la estructura del ejemplo anterior, pero adáptela a un caso de responsabilidad civil extracontractual por accidente de tránsito, con datos ficticios.
    
3. Incluya enlaces a:
    
    - Un cliente ficticio (cree la ficha en `Clientes/` si no existe).
        
    - El artículo 2356 del Código Civil (actividades peligrosas).
        
    - Una sentencia ficticia o real de la Sala Civil de la Corte Suprema.
        
4. Aplique etiquetas `#civil` y `#extracontractual`.
    
5. Exporte la nota a PDF y verifique que los enlaces internos no aparecen en el PDF (Obsidian los omite automáticamente en la exportación, dejando solo el texto del enlace).
    

Este ejercicio demuestra que en menos de quince minutos se puede producir un borrador de demanda estructurado, conectado con la base de conocimiento del despacho y listo para su revisión formal.