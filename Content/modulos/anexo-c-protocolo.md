---
title: "Anexo C: Protocolo escrito de check-out / check-in"
slug: "anexo-c-protocolo"
subtitle: "Política interna del despacho para edición colaborativa."
objective:
  - "Copiar y adaptar el protocolo de check-out/check-in."
  - "Asegurar que todos los miembros del equipo sigan el procedimiento."
order: 102
type: "anexo"
---
## Anexo C: Protocolo escrito de check-out / check-in

Este documento constituye la política interna del despacho en materia de edición colaborativa sobre la bóveda compartida de Obsidian. Se redacta en un lenguaje claro para que todos los miembros del equipo; abogados, practicantes, asistentes jurídicos, conozcan y apliquen el procedimiento sin necesidad de formación técnica adicional.

El protocolo puede copiarse tal cual en una nota de la bóveda (se sugiere `Plantillas/Protocolo check-out check-in.md`) o imprimirse para incorporarlo al manual de procedimientos del bufete.

---

### C.1 Objetivo

Establecer una regla de trabajo que impida la edición simultánea de un mismo documento por dos o más abogados del despacho, previniendo así conflictos de sincronización, pérdida de información y retrabajo. El protocolo se apoya en la nota diaria de Obsidian como registro público y permanente de cada movimiento editorial.

### C.2 Alcance

Aplica a todos los miembros del despacho que tengan acceso a la bóveda compartida mediante Obsidian Sync. Cubre cualquier nota ubicada en las carpetas `Escritos/`, `Casos/`, `Doctrina/` y `Jurisprudencia/` que pueda ser susceptible de modificación por más de una persona.

### C.3 Definiciones

- **Bóveda:** el conjunto de notas Markdown sincronizadas mediante Obsidian Sync que constituyen el repositorio jurídico del despacho.
    
- **Check-out:** acción de anunciar, en la nota diaria, que se va a iniciar la edición de una nota determinada, reservándola temporalmente para el abogado que lo anuncia.
    
- **Check-in:** acción de anunciar, también en la nota diaria, que la edición ha finalizado y que la nota queda nuevamente disponible para los demás.
    
- **Nota diaria:** archivo Markdown fechado que se crea automáticamente en la carpeta `Agenda/` mediante el plugin Daily Notes. Sirve como bitácora procesal colectiva y como registro del protocolo.
    
- **Conflicto de sincronización:** situación poco frecuente en la que dos personas editan la misma nota sin haber aplicado el protocolo y ambas versiones no pueden fusionarse automáticamente. Obsidian Sync genera un archivo adicional con el sufijo `-conflict`.
    

### C.4 Procedimiento

#### C.4.1 Antes de editar: verificar

Todo abogado que se disponga a modificar una nota debe:

1. Abrir la nota diaria del día. Si no existe, crearla mediante el comando `Daily Notes: Open today's daily note`.
    
2. Recorrer visualmente las anotaciones del día para comprobar si la nota que desea editar ya tiene un check-out vigente.
    
3. Si existe un check-out de otro abogado sobre esa misma nota, **abstenerse de editarla** y esperar al check-in correspondiente. En caso de urgencia, comunicarse directamente con el abogado que retiene el check-out.
    
4. Si no existe check-out alguno, proceder al paso siguiente.
    

#### C.4.2 Iniciar la edición: check-out

1. En la nota diaria, escribir una línea con el siguiente formato:
    

text

Check-out [[Nombre exacto de la nota]] - [Iniciales o nombre del abogado]. Inicio: [HH:MM].

Ejemplo:

text

Check-out [[Demanda EXP-2024-00123]] - LM. Inicio: 09:15.

2. Sincronizar la bóveda manualmente (`Ctrl/Cmd + P` > `Sync: Sync`) o esperar a que la sincronización automática propague la anotación al resto del equipo.
    
3. Iniciar la edición. Mientras el check-out esté vigente, el abogado puede modificar la nota con la seguridad de que ningún otro miembro del despacho lo hará simultáneamente.
    

#### C.4.3 Finalizar la edición: check-in

1. Una vez concluidos los cambios, sincronizar la bóveda para asegurar que la última versión de la nota queda registrada.
    
2. En la nota diaria, escribir una línea con el siguiente formato:
    

text

Check-in [[Nombre exacto de la nota]] - [Iniciales]. Cambios: [descripción breve]. Fin: [HH:MM].

Ejemplo:

text

Check-in [[Demanda EXP-2024-00123]] - LM. Cambios: ajuste de hechos y adición de prueba documental. Fin: 11:00.

3. Sincronizar de nuevo la bóveda. A partir de ese momento, la nota queda liberada y cualquier otro abogado puede iniciar un nuevo check-out sobre ella.
    

#### C.4.4 Interrupción de la edición

Si el abogado debe ausentarse de manera imprevista y no puede terminar la edición, debe anotar inmediatamente:

text

Check-in temporal [[Demanda EXP-2024-00123]] - LM. Pendiente de continuación. Fin: 10:00.

Esto libera la nota mientras el abogado no está, evitando que el documento quede bloqueado innecesariamente.

### C.5 Sintaxis detallada

|Elemento|Formato|Observaciones|
|---|---|---|
|Apertura de edición|`Check-out [[Nota]] - Iniciales. Inicio: HH:MM.`|La hora es opcional pero recomendable.|
|Cierre de edición|`Check-in [[Nota]] - Iniciales. Cambios: descripción. Fin: HH:MM.`|La descripción de cambios debe ser breve pero informativa.|
|Cierre temporal|`Check-in temporal [[Nota]] - Iniciales. Pendiente de continuación. Fin: HH:MM.`|Úsese cuando la ausencia sea breve. Si la ausencia se prolonga, se recomienda hacer un check-in definitivo y luego un nuevo check-out al regresar.|
|Iniciales|`LM`, `AG`, `MR`|Deben ser únicas y previamente acordadas.|

### C.6 Ejemplo práctico de nota diaria

A continuación se muestra un fragmento de una nota diaria con varios check-out y check-in, tal como se vería en la bóveda:

markdown

# 2024-07-15
- Check-out [[Demanda EXP-2024-00123]] - LM. Inicio: 08:00.
- Check-out [[Recurso reposicion EXP-2024-00056]] - AG. Inicio: 08:30.
- Check-in [[Demanda EXP-2024-00123]] - LM. Cambios: corrección de hechos y adición de pretensión subsidiaria. Fin: 10:00.
- Revisado auto admisorio en [[EXP-2024-00078]]. Se prepara contestación.
- Check-in [[Recurso reposicion EXP-2024-00056]] - AG. Cambios: redacción de argumentos y cita de jurisprudencia. Fin: 11:00.
- Check-out [[Contestación EXP-2024-00078]] - LM. Inicio: 11:15.

### C.7 Conflicto de sincronización

Si, por no haberse aplicado el protocolo o por una sincronización inusualmente lenta, dos abogados editan la misma nota y se genera un archivo de conflicto, se procederá de la siguiente manera:

1. El abogado que detecte el archivo `-conflict` lo comunicará de inmediato al otro editor involucrado.
    
2. Ambos revisarán la versión principal y el archivo de conflicto.
    
3. Determinarán cuál de las dos versiones es la más completa o consolidarán manualmente los cambios en la nota principal.
    
4. Una vez consolidada la nota definitiva, eliminarán el archivo de conflicto.
    
5. Sincronizarán la bóveda.
    

Este procedimiento no debe tomar más de cinco minutos. La clave es resolverlo en el momento y no dejar el archivo de conflicto abandonado.

### C.8 Consecuencias del incumplimiento

El incumplimiento reiterado de este protocolo puede generar:

- **Conflictos de sincronización evitables**, con el consiguiente gasto de tiempo en su resolución.
    
- **Pérdida de información**, si un abogado sobrescribe accidentalmente el trabajo de otro durante la resolución del conflicto.
    
- **Deterioro de la confianza en el sistema**, lo que puede llevar a algunos miembros del despacho a eludir la bóveda y volver a prácticas anteriores.
    

Por tanto, el despacho podrá considerar el cumplimiento de este protocolo como un indicador en la evaluación del desempeño de sus abogados y asistentes.

### C.9 Vigencia y revisión

El presente protocolo entra en vigor desde el momento en que se publique en la carpeta `Plantillas/` de la bóveda compartida. Debe ser leído y comprendido por todo nuevo miembro del despacho antes de recibir acceso a la bóveda.

Se revisará al menos una vez al año, preferiblemente durante la revisión mensual del tablero de Dataview, para incorporar las mejoras que la práctica sugiera. Cualquier miembro del equipo puede proponer ajustes, que serán discutidos y aprobados por el director del despacho antes de su modificación.