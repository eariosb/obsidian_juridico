---
title: Trazabilidad
slug: escritos-vivos-trazabilidad
subtitle: Redacción de demandas, recursos y contratos directamente en Obsidian, con historial de cambios, transclusión de jurisprudencia y exportación a PDF con formato forense.
objective:
  - Redactar un escrito procesal completo en una nota única, apoyándose en plantillas con la estructura exigida por la normativa colombiana.
  - Utilizar el historial de versiones de Obsidian Sync para recuperar cualquier estado anterior de un escrito, sin necesidad de Git ni terminal.
  - Incorporar fragmentos de jurisprudencia mediante transclusión, manteniendo las citas actualizadas cuando la fuente cambia.
  - "Exportar el escrito a PDF con los márgenes, tipo de letra e interlineado requeridos por los juzgados colombianos, usando dos métodos: CSS snippet y Pandoc."
order: 8
datasets:
  - Caso de ejemplo EXP-2024-00045 y plantillas de escritos de módulos anteriores.
---
# Módulo 8: Trazabilidad
## 8.1 Redacción de un escrito en nota única a partir de plantillas

En el Módulo 3 se crearon plantillas para demanda ejecutiva singular y acción de tutela. Esas plantillas residen en la carpeta `Plantillas/` y están sincronizadas en toda la oficina. Para iniciar un escrito nuevo, el abogado no parte de un documento en blanco ni de un archivo de Word que copiar y renombrar; inserta la plantilla correspondiente y la completa con los datos del caso.
**Flujo de trabajo para un recurso de reposición:**
1. En la carpeta `Escritos/`, cree una nueva nota con un nombre descriptivo: `Recurso reposicion auto inadmite EXP-2024-00045`.
2. Invoque el comando «Insert template» (`Ctrl/Cmd + Shift + T`) y elija la plantilla `Recurso de reposicion` (si no existe, créela con la estructura que se muestra a continuación).
3. Complete los campos dinámicos (número de radicado, juzgado, argumentos).
4. Redacte el contenido del recurso.

**Plantilla de recurso de reposición (`Plantillas/Recurso de reposicion.md`):**

```markdown
---
caso: "[[EXP-2024-00000]]"
tipo: "Recurso de reposición"
fecha: {{tp.date.now("YYYY-MM-DD")}}
tags: [recurso, reposicion]
---
# Recurso de reposición
**Señor(a) Juez(a)** {{juzgado}}
**E. S. D.**
**Ref.:** Recurso de reposición contra auto de fecha {{fecha_auto_recurrido}}, dentro del proceso {{radicado}}.
**{{cliente}}**, actuando en calidad de {{calidad}}, respetuosamente interpongo recurso de reposición contra el auto proferido el {{fecha_auto_recurrido}}, mediante el cual se {{contenido_auto_recurrido}}, con fundamento en los siguientes:
## Fundamentos del recurso
1. {{argumento_1}}
2. {{argumento_2}}
3. {{argumento_3}}
## Petición
Solicito respetuosamente que se revoque el auto recurrido y, en su lugar, se {{peticion_concreta}}.
Atentamente,
{{cliente}}
C.C. {{identificacion}}

Una vez insertada, el abogado puede centrarse en el contenido jurídico sin preocuparse por la estructura formal, que ya está garantizada.

## 8.2 Trazabilidad sin Git: el historial de versiones de Obsidian Sync

Una de las ventajas más subestimadas de Obsidian Sync es que almacena automáticamente un historial de versiones de cada nota sincronizada. A diferencia de Git, que requiere comandos y una configuración aparte, el historial de versiones de Sync está integrado en la interfaz gráfica y se maneja con un par de clics. Para un abogado, esto significa que cada modificación importante de un escrito queda registrada y es recuperable, sin necesidad de mantener archivos con nombres como `v2`, `v3_final`, `v3_final_revisada`.

### 8.2.1 Cómo funciona el versionado en Obsidian Sync

Cada vez que una nota se sincroniza tras una edición, Sync guarda una instantánea de la versión anterior. El número de versiones retenidas y el tiempo de conservación dependen del plan contratado, pero incluso el plan básico mantiene un historial suficiente para el uso diario. Las versiones se almacenan cifradas en el servidor de Obsidian, con la misma clave de la bóveda.

### 8.2.2 Visualizar el historial de versiones

1. Abra la nota del escrito, por ejemplo `Recurso reposicion auto inadmite EXP-2024-00045`.
    
2. Ejecute el comando `Sync: View version history` desde la paleta (`Ctrl/Cmd + P`). También se puede acceder haciendo clic derecho sobre la pestaña de la nota y seleccionando «View version history».
    
3. Se abre un panel lateral con una lista cronológica de versiones. Cada entrada muestra la fecha, la hora y, si se ha configurado, un extracto del cambio.
    
4. Haga clic en una versión anterior para ver su contenido en modo solo lectura, con las diferencias resaltadas respecto a la versión actual.
    

### 8.2.3 Restaurar una versión anterior

Si se necesita recuperar el texto de una versión previa (por ejemplo, porque se eliminó un argumento que luego se consideró válido):

1. En el panel de historial, localice la versión deseada.
    
2. Haga clic en el botón «Restore» (Restaurar). Obsidian reemplazará el contenido actual de la nota con el de esa versión.
    
3. La versión restaurada se convierte en la nueva versión actual, pero las versiones posteriores no se pierden: siguen estando en el historial por si se necesita revertir la reversión.
    

Esta funcionalidad otorga una red de seguridad completa durante la redacción de cualquier documento. Si se produce un error de edición o un cambio no deseado, la solución está a tres clics de distancia, sin necesidad de haber guardado copias manuales ni de recurrir a software de control de versiones.

### 8.2.4 Trazabilidad para la ética profesional

El historial de versiones también sirve como evidencia interna de la evolución de un escrito. Si en el futuro un cliente cuestiona por qué se incluyó o se omitió determinado argumento, el despacho puede revisar el historial y demostrar cuándo y, presuntamente, quién realizó el cambio. Aunque no es una prueba con fuerza vinculante como una firma digital, sí constituye un elemento de convicción interna y un respaldo para la responsabilidad profesional del abogado (Ley 1123 de 2007, art. 34).

## 8.3 Integración de jurisprudencia por transclusión

En módulos anteriores se crearon notas de jurisprudencia con fragmentos clave. Por ejemplo, `Sentencia SC-456-2023.md` incluye una sección `## Ratio decidendi`. Al redactar los fundamentos de derecho de un recurso, el abogado puede incrustar directamente ese fragmento en lugar de copiarlo y pegarlo. La ventaja es que si más tarde la nota de la sentencia se corrige, se amplía o se actualiza con una aclaración de la Corte, el escrito que la transcluye reflejará automáticamente esos cambios la próxima vez que se abra.

### 8.3.1 Sintaxis de transclusión con secciones

Para incrustar una sección específica de una nota, se utiliza:

markdown

![[Sentencia SC-456-2023#Ratio decidendi]]

Obsidian buscará el encabezado exacto `## Ratio decidendi` dentro de la nota `Sentencia SC-456-2023` e insertará su contenido en el punto donde se escribe la transclusión.

También se puede incrustar la nota completa sin especificar sección:

markdown

![[Sentencia SC-456-2023]]

### 8.3.2 Aplicación en un escrito

En el recurso de reposición del ejemplo, los argumentos podrían reforzarse con jurisprudencia:

markdown

## Fundamentos del recurso
1. El auto impugnado aplica indebidamente la carga de la prueba, desconociendo que en materia de infecciones nosocomiales opera una presunción judicial de nexo causal, conforme lo ha sostenido la Sala Civil de la Corte Suprema de Justicia:
![[Sentencia SC-101-2024#Ratio decidendi]]
2. Adicionalmente, la negativa a decretar la prueba pericial contraviene el principio de necesidad de la prueba y el derecho de defensa, en los términos señalados por la Corte Constitucional en la [[Sentencia T-456-2022]].

Cuando el abogado exporte el escrito a PDF, la transclusión se resuelve y el texto de la sentencia aparece como parte del documento, sin indicación de que proviene de otra nota. Esto mantiene la fluidez de la redacción y evita saltos entre archivos.

### 8.3.3 Actualización dinámica de las citas

Suponga que, meses después, la Corte Suprema dicta una sentencia de unificación que matiza la doctrina de la `Sentencia SC-101-2024`. El abogado encargado de actualizar la jurisprudencia del despacho edita la nota `Sentencia SC-101-2024.md` y añade una advertencia:

markdown

> **Nota de actualización (2024-12-01):** La Sentencia SU-999-2024 unificó el criterio y precisó que la presunción solo opera cuando la infección es intrahospitalaria y no existen comorbilidades que la expliquen.

La próxima vez que se abra el recurso de reposición, la transclusión reflejará esta nota de actualización, alertando al abogado de que debe revisar si el argumento sigue siendo sólido a la luz del nuevo precedente. Así, la bóveda se convierte en un organismo vivo donde las correcciones doctrinales se propagan de forma natural.

## 8.4 Exportación a PDF con formato forense colombiano

La redacción en Markdown está pensada para la fase de creación y edición. La presentación ante los estrados judiciales exige un formato específico, regulado por el Código General del Proceso (art. 103) y por los acuerdos de cada corporación. A continuación se detallan dos métodos para exportar a PDF desde Obsidian, ambos capaces de cumplir esos requisitos.

### 8.4.1 Método 1: Exportación nativa con CSS snippet

El plugin «PDF export» de Obsidian genera un archivo PDF aplicando una hoja de estilos CSS sobre la vista previa del documento. El despacho puede crear un archivo CSS personalizado que establezca los márgenes, la tipografía, el interlineado y la numeración exigidos. Este archivo se guarda en la carpeta de snippets y se activa una sola vez.

**Requisitos de formato usuales en juzgados colombianos:**

- Márgenes: mínimo 3 cm en cada lado (algunos juzgados admiten 2.5 cm; se recomienda 3 cm).
    
- Tipo de letra: Arial o Times New Roman, tamaño 12.
    
- Interlineado: doble (o 1.5 líneas según el juzgado).
    
- Numeración de páginas: centrada en el pie de página o en la esquina inferior derecha.
    
- Membrete del despacho en el encabezado (opcional).
    

**Creación del snippet CSS:**

1. En la bóveda, cree la carpeta `.obsidian/snippets/` si no existe (ya existe por defecto al tener algún snippet).
    
2. Dentro de esa carpeta, cree un archivo `formato-juzgado.css` con el siguiente contenido:
    

css

/* formato-juzgado.css - Estilos para exportación a PDF de documentos judiciales colombianos */
@media print {
  @page {
    size: letter;
    margin: 3cm;
    @bottom-center {
      content: counter(page);
      font-family: "Times New Roman", serif;
      font-size: 12pt;
    }
  }
  body {
    font-family: "Times New Roman", serif !important;
    font-size: 12pt;
    line-height: 2; /* interlineado doble */
    text-align: justify;
  }
  h1, h2, h3, h4, h5, h6 {
    font-family: "Times New Roman", serif !important;
    margin-top: 0;
    margin-bottom: 0.5em;
  }
  /* Ocultar enlaces internos en la exportación (Obsidian lo hace por defecto, pero por si acaso) */
  a.internal-link {
    color: inherit;
    text-decoration: none;
  }
}

3. En Obsidian, vaya a «Settings > Appearance > CSS snippets» y haga clic en «Open snippets folder» si necesita copiar el archivo manualmente, o coloque el archivo directamente. Luego, active el snippet `formato-juzgado`.
    
4. Ahora, al exportar cualquier nota con «Export to PDF», se aplicarán estos estilos.
    

**Exportar el escrito:**

1. Abra la nota del recurso.
    
2. Ejecute `Ctrl/Cmd + P` y busque «Export to PDF».
    
3. El PDF se guardará en la ubicación por defecto (configurable en «Settings > PDF export > PDF export folder»). Lo habitual es guardarlo dentro de una subcarpeta `Exports/` o en la misma carpeta `Escritos/`.
    

**Verificación:** abra el PDF y compruebe que los márgenes, la fuente y el interlineado se ajustan a lo esperado. Si el juzgado requiere márgenes de 4 cm en el lado izquierdo para facilitar la encuadernación, modifique la línea `margin: 3cm` por `margin: 3cm 3cm 3cm 4cm` (arriba, derecha, abajo, izquierda).

### 8.4.2 Método 2: Exportación avanzada con Pandoc

Pandoc es un conversor universal de documentos. En combinación con el plugin comunitario «Pandoc Plugin» de Obsidian, permite exportar un archivo Markdown a PDF, Word (.docx), LaTeX y otros formatos, usando plantillas con control tipográfico profesional.

**Instalación de Pandoc:**

1. Descargue Pandoc desde [pandoc.org](https://pandoc.org/installing.html) e instálelo en su sistema operativo.
    
2. Para la generación de PDF, Pandoc requiere un motor de tipografía. Se recomienda instalar una distribución ligera de LaTeX como [MiKTeX](https://miktex.org/) (Windows) o [MacTeX](https://tug.org/mactex/) (macOS). En Linux, `texlive-latex-base` suele ser suficiente.
    

**Instalación del plugin Pandoc en Obsidian:**

1. En «Settings > Community plugins», busque «Pandoc Plugin» (autor: Oliver Balfour).
    
2. Instálelo y actívelo.
    
3. En la configuración del plugin, establezca la ruta al ejecutable de Pandoc (normalmente se detecta automáticamente). Seleccione como formato de salida preferido «PDF» y, si lo desea, «docx» como alternativa.
    

**Creación de una plantilla de referencia (opcional):**

Pandoc permite personalizar el PDF mediante una plantilla LaTeX. Puede crear un archivo `plantilla-juzgado.latex` con los márgenes, el membrete y los estilos deseados. Sin embargo, para la mayoría de los despachos, la configuración por defecto de Pandoc con algunas opciones en el frontmatter YAML de la nota es suficiente.

**Uso del plugin:**

1. En la nota del escrito, añada metadatos YAML específicos para Pandoc:
    

yaml

---
pandoc:
  pdf:
    margin-left: 3cm
    margin-right: 3cm
    margin-top: 3cm
    margin-bottom: 3cm
    mainfont: Times New Roman
    fontsize: 12pt
    linestretch: 2
---

2. Ejecute el comando «Pandoc Plugin: Export as PDF» desde la paleta (`Ctrl/Cmd + P`).
    
3. El PDF se generará aplicando esos parámetros y se abrirá automáticamente (según la configuración del plugin).
    

La ventaja de Pandoc frente a la exportación nativa es que ofrece mayor control tipográfico (espaciado posterior a párrafos, sangría de primera línea, control de viudas y huérfanas) y puede generar también el archivo .docx si el juzgado exige específicamente ese formato.

### 8.4.3 Elección del método

- Para la mayoría de los escritos diarios, la exportación nativa con CSS snippet es suficiente y más rápida.
    
- Para escritos de gran relevancia (demandas de casación, conceptos de fondo, contratos), el método Pandoc ofrece una presentación más pulida y la posibilidad de reutilizar la misma nota para generar versiones en Word si un coadyuvante o cliente las requiere.
    

Ambos métodos conservan la ventaja fundamental: el contenido del escrito sigue siendo texto Markdown, almacenado en la bóveda, con todo el historial de versiones y las conexiones a jurisprudencia y doctrina.

## 8.5 Ejercicio guiado

**Objetivo:** Redactar un recurso de reposición, experimentar el versionado, usar transclusión y exportar a PDF con formato de juzgado.

### 8.5.1 Preparación

1. Asegúrese de que el plugin Templates está activo y de que existe la plantilla `Recurso de reposicion.md` en `Plantillas/` con el contenido indicado en la sección 8.1.
    
2. Verifique que la nota `Sentencia SC-101-2024.md` en `Jurisprudencia/` tiene un encabezado `## Ratio decidendi` y un fragmento de texto (puede usar el que se creó en el Módulo 4).
    
3. Active el CSS snippet `formato-juzgado` (si opta por el método 1) o instale Pandoc y su plugin (si opta por el método 2).
    

### 8.5.2 Redacción

1. Cree una nueva nota en `Escritos/` con el nombre `Recurso reposicion EXP-2024-00045`.
    
2. Inserte la plantilla de recurso de reposición.
    
3. Llene los campos con datos del caso ficticio: radicado `11001310300120240004500`, juzgado `Juzgado 3 Civil del Circuito de Bogotá`, cliente `[[María Gómez]]`.
    
4. En la sección «Fundamentos del recurso», redacte dos argumentos, y en el segundo, incruste la ratio decidendi de la sentencia SC-101-2024 mediante transclusión:
    

markdown

## Fundamentos del recurso
1. El auto impugnado inadmite la demanda por falta de prueba del nexo causal, sin considerar que...
2. La providencia desconoce la doctrina consolidada de la Sala Civil en materia de infecciones nosocomiales:
![[Sentencia SC-101-2024#Ratio decidendi]]

### 8.5.3 Registro del historial de versiones

1. Después de redactar el primer argumento, sincronice manualmente la bóveda (`Ctrl/Cmd + P > Sync: Sync`).
    
2. Continúe con el segundo argumento y la transclusión. Vuelva a sincronizar.
    
3. Ejecute `Sync: View version history` y observe las dos (o más) versiones capturadas. Compruebe que puede ver la versión inicial, sin el segundo argumento.
    
4. Realice un cambio menor, como corregir una fecha, sincronice de nuevo y verifique que el historial crece.
    

### 8.5.4 Exportación a PDF

1. Con el recurso terminado, ejecute «Export to PDF» (método 1) o «Pandoc Plugin: Export as PDF» (método 2).
    
2. Abra el PDF generado y confirme:
    
    - Márgenes amplios en todos los lados.
        
    - Fuente Times New Roman (o Arial, si así se configuró).
        
    - Interlineado doble.
        
    - El fragmento de jurisprudencia aparece integrado en el cuerpo del recurso, sin marcas de transclusión.
        
    - La numeración de páginas está presente.
        

### 8.5.5 Simulación de actualización jurisprudencial

1. Pida a un compañero (o usted mismo) que edite la nota `Sentencia SC-101-2024.md` y añada una línea bajo el encabezado `## Ratio decidendi`:
    

markdown

> **Nota de actualización:** La Sentencia SU-999-2024 de la Corte Constitucional precisó que esta presunción no aplica cuando la infección es de origen comunitario.

2. Sincronice la bóveda.
    
3. Vuelva a abrir la nota del recurso. Observe que la transclusión ahora muestra la nota de actualización.
    
4. Decida si el recurso necesita ajustes a la luz de la nueva información. Si los hace, sincronice y compruebe el nuevo historial de versiones.
    

Este flujo completo demuestra que un escrito en Obsidian es un documento vivo, trazable y actualizable, listo para ser defendido en audiencia con la misma confianza que un documento tradicional, pero con una eficiencia muy superior.