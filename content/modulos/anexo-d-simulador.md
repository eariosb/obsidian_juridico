---
title: "Anexo D: Simulador interactivo de conflictos"
slug: "anexo-d-simulador"
subtitle: "Ejercicio guiado para resolver conflictos de sincronización."
objective:
  - "Ejecutar el simulador en entorno controlado con dos miembros."
  - "Aprender a detectar y resolver conflictos de Obsidian Sync."
order: 103
type: "anexo"
---
## Anexo D: Simulador interactivo de un conflicto de sincronización y su resolución paso a paso

Este anexo es un ejercicio guiado, diseñado para ejecutarse en un entorno controlado, preferiblemente con dos miembros del despacho, cada uno frente a su propio equipo. Su propósito es desmitificar los conflictos de sincronización de Obsidian Sync, entrenar al equipo en su detección y resolución, y reforzar el valor del protocolo de check-out / check-in. Al finalizar, los participantes habrán experimentado un conflicto real sin riesgo para los datos del despacho y sabrán exactamente cómo resolverlo en menos de cinco minutos.

---

### D.1 Objetivo del simulador

- Provocar deliberadamente un conflicto de sincronización sobre una nota de prueba.
    
- Observar cómo Obsidian Sync gestiona el conflicto sin pérdida de datos.
    
- Aplicar el procedimiento de resolución descrito en el Anexo C.
    
- Comprender por qué el protocolo de check-out / check-in previene esta situación en el día a día.
    

### D.2 Requisitos previos

- Dos equipos (Equipo A y Equipo B), cada uno con Obsidian instalado y sincronizado a la misma bóveda remota mediante Obsidian Sync.
    
- Ambos equipos deben tener acceso a la nota diaria y a la nota de prueba.
    
- La bóveda debe contener al menos una nota de prueba (por ejemplo, `Prueba conflicto.md`) en una ubicación acordada (se sugiere `Escritos/Prueba conflicto.md`).
    

**Nota importante:** No se debe usar información real de clientes. Utilice únicamente texto genérico o ficticio.

### D.3 Fase 1: Preparación del entorno

#### D.3.1 Crear la nota de prueba

1. En el **Equipo A**, cree la nota `Escritos/Prueba conflicto.md` con el siguiente contenido inicial:
    

markdown

---
titulo: "Nota de prueba para conflicto"
fecha: 2024-07-20
---
# Nota de prueba para conflicto
## Contenido original
Este es el texto que ambos equipos modificarán para generar un conflicto.
- Párrafo 1.
- Párrafo 2.

2. Sincronice la bóveda en el Equipo A (`Ctrl/Cmd + P > Sync: Sync`).
    
3. En el **Equipo B**, espere la sincronización automática o fuerce una sincronización manual. Verifique que la nota `Prueba conflicto.md` aparece en el explorador de archivos y que su contenido es idéntico al original.
    

#### D.3.2 Verificar la nota diaria

1. En ambos equipos, abran la nota diaria del día (se sugiere usarla como registro del ejercicio). Anoten en ella:
    

text

Inicio del simulacro de conflicto. Nota de prueba: [[Prueba conflicto]].

2. Sincronicen ambos equipos.
    

### D.4 Fase 2: Provocar el conflicto

El conflicto se produce cuando dos personas editan la misma nota sin que medie sincronización entre una edición y otra. Para simularlo, se desconectará la sincronización temporalmente en ambos equipos, se realizarán cambios contradictorios en cada uno y luego se restablecerá la conexión.

#### D.4.1 Desconectar la sincronización (modo avión o pausa manual)

En cada equipo, realicen una de las siguientes acciones para impedir que los cambios se sincronicen automáticamente:

- **Opción recomendada:** Activen el modo avión en ambos equipos (esto corta la conexión a internet). O bien,
    
- **Opción dentro de Obsidian:** Vayan a «Settings > Sync» y desactiven temporalmente «Sync vault» (el interruptor principal). Esto detiene la sincronización sin afectar otras aplicaciones.
    

Asegúrense de que ambos equipos estén efectivamente sin conexión a la bóveda remota. El indicador de Sync en la barra de estado debe mostrar «Desconectado» o similar.

#### D.4.2 Realizar cambios contradictorios

**En el Equipo A:**

1. Abra la nota `Prueba conflicto.md`.
    
2. Modifique el texto del «Párrafo 1» de la siguiente manera:
    

markdown

- Párrafo 1. MODIFICADO POR EQUIPO A. Este es un cambio sustancial.

3. Guarde la nota (Ctrl/Cmd + S).
    

**En el Equipo B:**

1. Abra la misma nota `Prueba conflicto.md`.
    
2. Modifique el mismo «Párrafo 1» de forma diferente:
    

markdown

- Párrafo 1. MODIFICADO POR EQUIPO B. Texto completamente distinto al del Equipo A.

3. Guarde la nota.
    

Ambos equipos han cambiado la misma línea. Si la sincronización estuviera activa, Obsidian Sync detectaría la divergencia. Como está desactivada, cada equipo tiene su propia versión local.

#### D.4.3 Restablecer la sincronización

1. En el **Equipo A**, restablezca la conexión (desactive el modo avión o vuelva a activar «Sync vault»). Espere a que el indicador de Sync muestre «Conectado» y que finalice la primera sincronización. Esto subirá la versión del Equipo A al servidor remoto.
    
2. Un minuto después, en el **Equipo B**, restablezca la conexión. El Equipo B intentará sincronizar su versión local con la remota.
    

### D.5 Fase 3: Detectar el conflicto

1. En el **Equipo B**, tras la sincronización, aparecerá una notificación de Obsidian Sync indicando que se ha producido un conflicto en `Prueba conflicto.md`. El mensaje puede variar según la versión, pero generalmente dirá algo como «Conflicting changes detected» o «Conflict in Prueba conflicto.md».
    
2. En el explorador de archivos de Obsidian (barra lateral izquierda), debería aparecer un nuevo archivo con un nombre como `Prueba conflicto-conflict-2024-07-20.md` (la fecha puede variar). Este es el archivo de conflicto.
    

**Si no aparece el archivo de conflicto:** es posible que la sincronización se haya realizado en orden (Equipo B sincronizó primero y luego Equipo A, o viceversa). En ese caso, la última sincronización sobrescribió la anterior sin conflicto porque los cambios no llegaron al mismo tiempo. Para forzar el conflicto, asegúrense de que ambos equipos editen antes de que cualquiera de los dos sincronice. Repitan los pasos D.4.1 a D.4.3 si es necesario, asegurándose de que ambos equipos hayan guardado los cambios antes de que el primero reconecte.

### D.6 Fase 4: Resolver el conflicto

Ahora ambos equipos verán el conflicto (el Equipo B lo detectó primero; el Equipo A puede verlo tras sincronizar de nuevo). Sigan este procedimiento:

1. **Comunicación verbal o por chat interno:** Los abogados de los equipos A y B acuerdan quién resolverá el conflicto. Normalmente lo hará quien detectó el archivo de conflicto, pero puede ser cualquiera.
    
2. **Revisar las dos versiones:**
    
    - Abra la nota principal `Prueba conflicto.md`. Debería contener una de las dos versiones (generalmente la última que se sincronizó).
        
    - Abra el archivo de conflicto `Prueba conflicto-conflict-...md`. Contiene la otra versión.
        
3. **Comparar y decidir:**
    
    - Lean ambos textos.
        
    - Decidan cuál es la versión final que desean conservar. Pueden optar por una de ellas íntegramente, o tomar partes de ambas.
        
4. **Consolidar en la nota principal:**
    
    - Editen `Prueba conflicto.md` para que contenga la versión final acordada. Por ejemplo, pueden combinarlas:
        

markdown

- Párrafo 1. MODIFICADO POR AMBOS EQUIPOS. Equipo A: cambio sustancial. Equipo B: texto completamente distinto.

5. **Eliminar el archivo de conflicto:**
    
    - Hagan clic derecho sobre `Prueba conflicto-conflict-...md` y seleccionen «Eliminar» o «Delete». Confirmen.
        
6. **Sincronizar:**
    
    - En el equipo que resolvió el conflicto, fuercen una sincronización manual. El servidor remoto recibirá la versión consolidada y el archivo de conflicto ya no existirá.
        
    - En el otro equipo, sincronicen. El archivo de conflicto desaparecerá también allí, porque ya no existe en el remoto.
        
7. **Verificar:**
    
    - Abran `Prueba conflicto.md` en ambos equipos. Deben ver el texto consolidado, sin archivos adicionales.
        

### D.7 Fase 5: Registrar en la nota diaria

En la nota diaria, anoten la resolución del ejercicio:

text

Conflicto en [[Prueba conflicto]] detectado y resuelto por [iniciales]. Consolidación manual. Archivo de conflicto eliminado.

Sincronicen.

### D.8 Moraleja y buenas prácticas

- Los conflictos son raros si se sigue el protocolo de check-out / check-in. Este simulador demuestra que, incluso cuando ocurren por descuido, no hay pérdida de datos.
    
- Obsidian Sync nunca elimina información sin dejar un rastro. El archivo de conflicto es una red de seguridad.
    
- La resolución toma menos de cinco minutos si se aborda de inmediato. Dejar el archivo de conflicto abandonado puede generar confusión futura.
    
- La comunicación directa entre los editores es clave. Si ambos abogados están en la misma oficina, hablen; si están en sedes distintas, usen un mensaje o una llamada breve.
    

### D.9 Repetición opcional con roles invertidos

Para afianzar el aprendizaje, repitan el ejercicio invirtiendo los roles: que el Equipo B haga el primer cambio y el Equipo A el segundo. También pueden probar a editar secciones diferentes de la misma nota (sin conflicto real) para comprobar que Obsidian Sync fusiona los cambios automáticamente sin generar conflicto.

### D.10 Cierre del simulador

Una vez completado el ejercicio, eliminen la nota de prueba `Prueba conflicto.md` y cualquier archivo remanente para mantener la bóveda limpia. El aprendizaje queda registrado en la nota diaria.

---

Este simulador convierte el temor a los conflictos en una competencia adquirida. A partir de ahora, cuando un conflicto real aparezca —algo infrecuente si se respeta el protocolo—, el despacho lo tratará con la misma naturalidad con que resuelve cualquier otro imprevisto procesal.## Anexo D: Simulador interactivo de un conflicto de sincronización y su resolución paso a paso

Este anexo es un ejercicio guiado, diseñado para ejecutarse en un entorno controlado, preferiblemente con dos miembros del despacho, cada uno frente a su propio equipo. Su propósito es desmitificar los conflictos de sincronización de Obsidian Sync, entrenar al equipo en su detección y resolución, y reforzar el valor del protocolo de check-out / check-in.

**Advertencia previa:** No utilice información real de clientes. Todo el ejercicio se realiza sobre una nota de prueba con contenido ficticio, que será eliminada al finalizar.

---

### D.1 Objetivo del simulador

- Provocar deliberadamente un conflicto de sincronización sobre una nota de prueba.
    
- Observar cómo Obsidian Sync gestiona el conflicto sin pérdida de datos.
    
- Aplicar el procedimiento de resolución descrito en el Anexo C.
    
- Comprender por qué el protocolo de check-out / check-in previene esta situación en el día a día.
    

### D.2 Requisitos previos

- Dos equipos (Equipo A y Equipo B), cada uno con Obsidian instalado y sincronizado a la misma bóveda remota mediante Obsidian Sync.
    
- Ambos equipos deben tener acceso a la nota diaria y a la carpeta `Escritos/` de la bóveda.
    
- La sincronización debe estar funcionando correctamente antes de iniciar el simulacro. Verifiquen que ambos equipos ven las mismas notas y que el indicador de Sync está en reposo.
    
- Opcional: un tercer equipo o una segunda bóveda de prueba si se desea mayor seguridad y no usar la bóveda real. En ese caso, creen una bóveda desechable con Sync temporal y dos dispositivos.
    

### D.3 Fase 1: Preparación del entorno

#### D.3.1 Crear la nota de prueba

1. En el **Equipo A**, creen la nota `Escritos/Prueba conflicto.md` con el siguiente contenido inicial:
    

markdown

---
titulo: "Nota de prueba para conflicto"
fecha: 2024-07-20
---
# Nota de prueba para conflicto
## Contenido original
Este es el texto que ambos equipos modificarán para generar un conflicto.
- Párrafo 1.
- Párrafo 2.

2. Sincronicen manualmente en el Equipo A (`Ctrl/Cmd + P > Sync: Sync`).
    
3. En el **Equipo B**, esperen la sincronización automática o fuercen una sincronización manual. Verifiquen que la nota `Prueba conflicto.md` aparece en el explorador de archivos y que su contenido es idéntico al creado por el Equipo A.
    

#### D.3.2 Registrar el inicio en la nota diaria

En ambos equipos, abran la nota diaria del día y anoten:

text

Inicio del simulacro de conflicto. Nota de prueba: [[Prueba conflicto]].

Sincronicen ambos equipos para que la anotación quede visible.

### D.4 Fase 2: Provocar el conflicto

El conflicto se produce cuando dos personas editan la misma nota sin que medie sincronización entre una edición y otra, y ambas modifican la misma línea o líneas cercanas. Para simularlo, se desconectará la sincronización temporalmente en ambos equipos, se realizarán cambios contradictorios y luego se restablecerá la conexión.

#### D.4.1 Desconectar la sincronización

En cada equipo, elijan uno de estos métodos para impedir que los cambios se sincronicen mientras editan:

- **Método A (recomendado):** Activen el modo avión en el sistema operativo. Esto corta toda conexión a internet.
    
- **Método B:** Dentro de Obsidian, vayan a «Settings > Sync» y desactiven el interruptor principal «Sync vault». El indicador de estado cambiará a «Desconectado».
    

Asegúrense de que ambos equipos estén efectivamente sin conexión a la bóveda remota.

#### D.4.2 Realizar cambios contradictorios

**En el Equipo A:**

1. Abran la nota `Prueba conflicto.md`.
    
2. Modifiquen el texto del «Párrafo 1» de la siguiente manera:
    

markdown

- Párrafo 1. MODIFICADO POR EQUIPO A. Este es un cambio sustancial que solo hizo el Equipo A.

3. Guarden la nota (`Ctrl/Cmd + S`).
    

**En el Equipo B:**

1. Abran la misma nota `Prueba conflicto.md`.
    
2. Modifiquen el mismo «Párrafo 1» pero con un texto diferente:
    

markdown

- Párrafo 1. MODIFICADO POR EQUIPO B. Texto completamente distinto al del Equipo A.

3. Guarden la nota.
    

Ambos equipos han cambiado la misma línea. Si la sincronización estuviera activa, el segundo en sincronizar generaría un conflicto. Como está desactivada, cada equipo tiene su propia versión local divergente.

#### D.4.3 Restablecer la sincronización en orden

1. **Primero el Equipo A:** restablezcan la conexión (desactiven modo avión o activen «Sync vault»). Esperen hasta que el indicador de Sync complete el ciclo y quede en reposo. La versión del Equipo A se ha subido al servidor remoto.
    
2. **Luego el Equipo B:** restablezcan la conexión. El Equipo B intentará sincronizar su versión local con la remota.
    

### D.5 Fase 3: Detectar el conflicto

1. En el **Equipo B**, tras sincronizar, aparecerá una notificación de Obsidian Sync indicando que se ha producido un conflicto. El mensaje exacto puede variar según la versión, pero será similar a «Conflicting changes detected» o «Sync conflict in Prueba conflicto.md».
    
2. En el explorador de archivos de Obsidian (barra lateral izquierda), debería aparecer un nuevo archivo con un nombre como `Prueba conflicto-conflict-2024-07-20.md`. Este es el archivo de conflicto que contiene la versión que no pudo fusionarse automáticamente.
    

**Si no aparece el archivo de conflicto:** es probable que uno de los dos equipos sincronizara antes de que el otro editara, y por tanto no hubo conflicto real. Repitan los pasos D.4.1 a D.4.3 asegurándose de que ambos equipos editen y guarden antes de que el primero reconecte.

### D.6 Fase 4: Resolver el conflicto

Ahora ambos equipos verán el conflicto (el Equipo B lo detectó primero; el Equipo A puede verlo tras sincronizar de nuevo). Sigan este procedimiento:

1. **Comunicación.** Los abogados de los equipos A y B acuerdan quién resolverá el conflicto. Normalmente lo hará quien detectó el archivo de conflicto, pero puede ser cualquiera. La comunicación puede ser verbal, por mensajería interna o por teléfono, pero debe ser inmediata.
    
2. **Revisar las dos versiones.**
    
    - Abran la nota principal `Prueba conflicto.md`. Contiene una de las dos versiones (generalmente la que se sincronizó primero, la del Equipo A).
        
    - Abran el archivo de conflicto `Prueba conflicto-conflict-...md`. Contiene la otra versión (la del Equipo B).
        
3. **Comparar y decidir.** Lean ambos textos. Decidan cuál es la versión final que desean conservar. Pueden:
    
    - Conservar íntegramente una de las dos versiones.
        
    - Tomar partes de ambas y combinarlas.
        
4. **Consolidar en la nota principal.** Editen `Prueba conflicto.md` para que contenga la versión final acordada. Por ejemplo:
    

markdown

- Párrafo 1. MODIFICADO POR AMBOS EQUIPOS. Equipo A: cambio sustancial. Equipo B: texto completamente distinto. Se consolidan ambas observaciones.

5. **Eliminar el archivo de conflicto.** Hagan clic derecho sobre `Prueba conflicto-conflict-...md` en el explorador de archivos y seleccionen «Eliminar» o «Delete». Confirmen la eliminación.
    
6. **Sincronizar.** En el equipo que resolvió el conflicto, fuercen una sincronización manual. El servidor remoto recibirá la versión consolidada y la eliminación del archivo de conflicto. En el otro equipo, sincronicen también. El archivo de conflicto desaparecerá de ambos lados.
    
7. **Verificar.** Abran `Prueba conflicto.md` en ambos equipos. Deben ver el texto consolidado, sin archivos adicionales en la carpeta.
    

### D.7 Fase 5: Registrar en la nota diaria

En la nota diaria del día, anoten la resolución:

text

Conflicto en [[Prueba conflicto]] detectado por [iniciales]. Resuelto mediante consolidación de ambas versiones. Archivo de conflicto eliminado.

Sincronicen.

### D.8 Moraleja y buenas prácticas

- Los conflictos son raros si se sigue el protocolo de check-out / check-in, pero es necesario saber resolverlos cuando ocurren por descuido o por fallos de conectividad.
    
- Obsidian Sync nunca elimina información sin dejar un rastro. El archivo de conflicto es una red de seguridad, no un error.
    
- La resolución toma menos de cinco minutos si se aborda de inmediato. Dejar el archivo de conflicto abandonado puede generar confusión futura.
    
- La comunicación directa y rápida entre los editores es la clave.
    

### D.9 Repetición opcional con variantes

Para afianzar el aprendizaje, pueden repetir el ejercicio:

- Invirtiendo los roles: que el Equipo B haga el primer cambio y el Equipo A el segundo.
    
- Modificando secciones diferentes de la nota (por ejemplo, un equipo cambia el Párrafo 1 y el otro el Párrafo 2) para comprobar que Obsidian Sync fusiona los cambios automáticamente sin generar conflicto.
    
- Simulando una desconexión más prolongada.
    

### D.10 Cierre del simulador

Una vez completado el ejercicio, eliminen la nota `Prueba conflicto.md` y cualquier archivo remanente para mantener la bóveda limpia. La experiencia queda registrada únicamente en la nota diaria.

=