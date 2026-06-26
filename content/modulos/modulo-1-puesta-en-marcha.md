---
title: "Puesta en marcha de la bóveda del despacho"
slug: "puesta-marcha-boveda-despacho"
subtitle: "Creación de la bóveda matriz y extensión al equipo mediante Obsidian Sync, con estructura de carpetas normalizada y configuración común."
objective:
  - "Crear una cuenta de Obsidian Sync y la bóveda remota."
  - "Invitar a los miembros del despacho y configurar la sincronización en cada equipo."
  - "Establecer la estructura de carpetas estandarizada para toda la oficina."
  - "Aplicar configuraciones comunes: plugin de plantillas, tema sobrio, fuentes legibles y barra lateral limpia."
order: 1
datasets:
  - "No aplica. Módulo de instalación y configuración."
---
## 1.1 Alta de Obsidian Sync y creación de la bóveda remota
Obsidian Sync es un servicio de pago que requiere una licencia por usuario. Sin embargo, una sola licencia permite crear una bóveda remota y compartirla con otros miembros del despacho que también posean su propia licencia. El primer paso es que el administrador del sistema —generalmente el director del bufete o el abogado encargado de la tecnología— cree la bóveda remota.
1. Abra Obsidian en su computador. Si aún no tiene ninguna bóveda, cree una nueva desde el botón «Create new vault» y asígnele el nombre del despacho, por ejemplo `Bufete`. Esta será la bóveda matriz, que luego se sincronizará.
2. Diríjase a la configuración de Obsidian (icono de engranaje en la esquina inferior izquierda) y seleccione la pestaña «Sync». Si nunca ha iniciado sesión, se le pedirá que lo haga con su cuenta de Obsidian. Cree una cuenta si no la tiene, o inicie sesión.
3. Una vez autenticado, verá la opción «Create remote vault». Haga clic en ella. Se le mostrará un diálogo con los siguientes campos:
   - **Vault name**: el nombre de la bóveda remota. Use el mismo nombre que la bóveda local para evitar confusiones, por ejemplo `Bufete`.
   - **Region**: elija la región del servidor donde se alojarán los datos cifrados. Para despachos colombianos, la latencia más baja suele ofrecerse en servidores de Estados Unidos (US East), pero puede elegir la que prefiera. Recuerde que los datos se almacenan cifrados de extremo a extremo; la ubicación física no compromete la confidencialidad.
   - **Encryption password**: aquí reside la seguridad del sistema. Esta contraseña **no se almacena en ningún servidor** y no se puede recuperar. Es la clave maestra de cifrado de la bóveda. Debe ser robusta (mínimo 12 caracteres, combinando mayúsculas, minúsculas, números y símbolos) y custodiarse como la llave de la caja fuerte del despacho. Anótela en un lugar físico seguro y compártala solo con los miembros autorizados, preferiblemente en persona o mediante un gestor de contraseñas cifrado. **Nunca la envíe por correo electrónico o mensajería instantánea sin cifrar.**
4. Active las casillas de verificación que aparecen bajo «Vault content»: «Sync vault configuration» y «Sync community plugins (active)». Esto garantiza que la configuración del entorno, los temas y los plugins activos se compartan entre todos los equipos, ahorrando trabajo de configuración repetitivo.
5. Haga clic en «Create». El sistema generará la bóveda remota y, en pocos segundos, comenzará a sincronizar el contenido local con el servidor. Verá el indicador de sincronización en la barra de estado inferior (un ícono de flechas circulares) que, al estar quieto, confirma que todo está sincronizado.
En este punto, la bóveda remota ya existe. El administrador tiene su copia local sincronizada y cifrada.
## 1.2 Invitación a colaboradores y configuración de cada equipo local
Cada abogado del despacho necesita su propia licencia de Obsidian Sync y debe ser invitado a la bóveda remota.
### 1.2.1 Invitar a un colaborador
1. En la misma pestaña «Sync» de la configuración, localice la sección «Remote vaults» y haga clic en «Manage» junto al nombre de la bóveda `Bufete`.
2. Se abrirá una ventana de administración. Seleccione la pestaña «Sharing». Aquí verá un campo «Invite user by email». Ingrese la dirección de correo electrónico con la que el colaborador tiene registrada su cuenta de Obsidian. Haga clic en «Send invite».
3. El colaborador recibirá un correo electrónico con un enlace para aceptar la invitación. Al hacer clic, deberá iniciar sesión en su cuenta de Obsidian y aceptar. Una vez aceptada, el acceso remoto queda concedido. **Importante**: el colaborador aún no puede ver el contenido porque necesita la contraseña de cifrado.
### 1.2.2 Configurar el equipo local del colaborador
Cada colaborador, después de aceptar la invitación, debe realizar estos pasos en su propio computador:
1. Abra Obsidian y vaya a «Settings > Sync». Inicie sesión con la misma cuenta de correo que usó para aceptar la invitación.
2. En la sección «Remote vaults», haga clic en «Connect» junto a `Bufete`. El sistema le preguntará si desea crear una bóveda local nueva o vincular una existente. La primera vez, elija «Create new vault» y asígnele el nombre `Bufete`. Elija una ubicación en su disco duro. Idealmente, esa ubicación debe estar dentro de una carpeta que esté cifrada a nivel de sistema operativo (BitLocker en Windows, FileVault en macOS, LUKS en Linux), como se verá en el Módulo 9.
3. A continuación, le pedirá la **contraseña de cifrado** que el administrador configuró en el paso anterior. El colaborador debe ingresarla exactamente igual. Si no la conoce, debe solicitarla al administrador por un canal seguro. Una vez ingresada, la bóveda local comenzará a descargar y descifrar todo el contenido. Este proceso puede durar unos minutos si la bóveda ya contiene muchos archivos.
4. Una vez completada la sincronización inicial, el colaborador verá exactamente la misma estructura de carpetas y notas que el administrador. A partir de ahora, cualquier cambio que realice se sincronizará con los demás, respetando el cifrado de extremo a extremo.
Repita este proceso para cada miembro del despacho. Todos trabajarán sobre la misma bóveda.
## 1.3 Estructura de carpetas estandarizada
Una de las ventajas de partir de un sistema compartido es que se puede imponer una organización única para todo el despacho. A continuación se presenta la estructura de carpetas que se usará a lo largo del curso. Debe crearse dentro de la bóveda `Bufete` (el administrador puede crearla y automáticamente se sincronizará con el resto).

```text
Bufete/  
├── Indice.md  
├── Clientes/  
│ └── (fichas de cada cliente)  
├── Casos/  
│ └── (notas de cada caso, referenciando clientes)  
├── Doctrina/  
│ └── (notas de doctrina jurídica)  
├── Jurisprudencia/  
│ └── (notas de sentencias)  
├── Escritos/  
│ └── (borradores y versiones finales)  
├── Agenda/  
│ └── (notas diarias y calendario)  
└── Plantillas/  
└── (plantillas de notas, escritos, etc.)
```


Para crearlas, basta con hacer clic derecho en el panel del explorador de archivos de Obsidian (barra lateral izquierda) y elegir «New folder» con cada nombre. Alternativamente, puede crear la carpeta desde el sistema operativo; Obsidian la reconocerá automáticamente.
**`Indice.md`** es una nota especial que servirá como punto de partida. Se recomienda crearla con el siguiente contenido mínimo, que se irá enriqueciendo en módulos posteriores con consultas de Dataview:
```markdown
# Índice del despacho
- [[Casos/]] — Casos activos y archivados
- [[Clientes/]] — Fichas de clientes
- [[Doctrina/]] — Doctrina por materias
- [[Jurisprudencia/]] — Fichas jurisprudenciales
- [[Escritos/]] — Escritos procesales
- [[Agenda/]] — Notas diarias y plazos
```
Esta estructura es una convención, no una imposición técnica. Obsidian no obliga a usar carpetas; los enlaces funcionan aunque los archivos estén todos en la raíz. Pero la experiencia demuestra que un orden básico facilita la orientación, sobre todo para los nuevos miembros del equipo.

## 1.4 Configuraciones comunes: plugin de plantillas activado, tema sobrio, fuentes legibles, barra lateral limpia

Dado que se activó la sincronización de la configuración, cualquier ajuste que haga el administrador se propagará a los colaboradores. Aprovechemos para establecer un entorno de trabajo uniforme y profesional.

### 1.4.1 Activar el plugin de plantillas

Obsidian incluye un plugin básico llamado «Templates». Para activarlo:

1. Vaya a «Settings > Core plugins».
    
2. Busque «Templates» y active el interruptor.
    
3. Haga clic en el engranaje junto a «Templates» para configurarlo.
    
4. En «Template folder location», ingrese `Plantillas`. De esta forma, cualquier nota que se cree dentro de la carpeta `Plantillas` podrá ser insertada como plantilla en nuevas notas.
    

Más adelante, en el Módulo 3, se explorará el plugin comunitario «Templater» para plantillas avanzadas. Por ahora, el plugin nativo basta.

### 1.4.2 Elegir un tema sobrio

Obsidian permite cambiar la apariencia mediante temas comunitarios. Para el despacho jurídico, se recomienda un tema que priorice la legibilidad, con tipografía clara y sin distracciones visuales.

1. Vaya a «Settings > Appearance».
    
2. En «Themes», haga clic en «Manage».
    
3. Busque y active un tema minimalista. Algunas opciones probadas en entornos profesionales:
    
    - **Minimal**: desarrollado por el propio equipo de Obsidian. Limpio, con buen soporte de tipografía y esquemas de color personalizables.
        
    - **Blue Topaz**: ofrece mayor densidad de información y múltiples opciones de ajuste, sin perder sobriedad.
        
    - **ProtocolBlue**: orientado a la productividad, con enfoque en la jerarquía visual.
        
4. Una vez instalado, actívelo. Luego, en la misma pestaña «Appearance», elija el esquema de color «Light» o «Dark» según la preferencia del despacho. Se sugiere el modo claro para la redacción de escritos, ya que reduce la fatiga visual al leer textos extensos.
    

### 1.4.3 Configurar fuentes legibles

Obsidian permite definir la fuente para la interfaz y para el texto de las notas.

1. En «Settings > Appearance», busque la sección «Font».
    
2. En «Text font», ingrese una fuente diseñada para lectura prolongada. Se recomienda **"iA Writer Quattro S"**, **"Lora"** o **"Georgia"** si está disponible en el sistema. Si no, la fuente por defecto es adecuada. Para uniformidad, puede instalarse la fuente **"Inter"** para la interfaz y **"Lora"** para el texto. Estas fuentes son gratuitas y de código abierto.
    
3. En «Interface font», deje **"Inter"**, que es moderna y nítida en pantalla.
    
4. Ajuste el tamaño de fuente a **16px** o **18px** para texto, y **14px** para la interfaz. Esto facilita la lectura de largas demandas sin forzar la vista.
    

### 1.4.4 Limpieza de la barra lateral

Una barra lateral sobrecargada distrae. Para un entorno jurídico, basta con tener visibles el explorador de archivos y el calendario (cuando se instale). Desactive los paneles innecesarios:

1. En la barra lateral izquierda, haga clic derecho sobre cualquier ícono y desmarque los que no vaya a usar en el día a día, como «Graph view» (vista de grafo) o «Starred» (favoritos). Estos siguen accesibles desde la paleta de comandos (`Ctrl/Cmd + P`) si se requieren.
    
2. Asegúrese de que el panel de «Files» (archivos) esté visible y anclado. Este será el principal punto de navegación.
    
3. En «Settings > Appearance», en la sección «Window frame», active «Hide tab title bar» y «Hide vault name» para ganar espacio vertical, especialmente en portátiles.
    

Estos ajustes se replicarán automáticamente en los equipos de los colaboradores gracias a la sincronización de la configuración.

## 1.5 Verificación final

Antes de continuar con el Módulo 2, realice una comprobación rápida:

- El administrador crea una nota de prueba en `Indice.md`, por ejemplo: `Prueba de sincronización - [fecha]`.
    
- Espera unos segundos hasta que el indicador de Sync se detenga.
    
- Un colaborador abre su Obsidian y verifica que la línea aparece en su `Indice.md`.
    
- El colaborador responde con otra línea: `Recibido - [nombre]`.
    
- El administrador confirma que ve la respuesta.