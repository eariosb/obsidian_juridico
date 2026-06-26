---
title: "Privacidad, ética y respaldo del sistema compartido"
slug: "privacidad-etica-respaldo-sistema-compartido"
subtitle: "Cerrar el círculo de seguridad garantizando que la sincronización no vulnera el secreto profesional y que existe un plan de contingencia ante cualquier fallo."
objective:
  - "Comprender el funcionamiento del cifrado de extremo a extremo en Obsidian Sync y su conformidad con el deber de secreto profesional."
  - "Establecer una política de dispositivos autorizados con discos cifrados para todos los equipos del despacho."
  - "Implementar una copia de seguridad complementaria semanal, cifrada y externa al ecosistema de Obsidian Sync."
  - "Ejecutar la destrucción segura de la bóveda local y remota en caso de cese de un abogado."
order: 9
datasets:
  - "No aplica. Módulo de seguridad y ética profesional."
---
# Módulo 9: Privacidad, ética y respaldo del sistema compartido
## 9.1 La seguridad como deber profesional
La información que maneja un abogado está amparada por el secreto profesional, un deber consagrado en el artículo 34 de la Ley 1123 de 2007 (Código Disciplinario del Abogado). Ese deber no se circunscribe a no revelar los datos del cliente; se extiende a la obligación positiva de adoptar las medidas necesarias para protegerlos. En la era digital, esa protección se traduce en decisiones técnicas concretas sobre dónde y cómo se almacenan los archivos, quién puede acceder a ellos y qué sucede si un dispositivo se pierde o un miembro del equipo se desvincula del despacho.
El sistema de bóveda compartida con Obsidian Sync ofrece, por diseño, una base sólida de seguridad. Pero esa base debe complementarse con políticas explícitas del despacho y con prácticas de respaldo que no dependan exclusivamente de un único proveedor. Este módulo aborda los cuatro pilares que cierran el círculo de la confianza: cifrado, control de dispositivos, copia de seguridad independiente y protocolo de cese.
## 9.2 Cifrado de extremo a extremo en Obsidian Sync: las llaves las retiene el despacho
### 9.2.1 Qué significa «extremo a extremo»
En un servicio de nube convencional, los archivos se transmiten de forma cifrada (cifrado en tránsito) y se almacenan cifrados en el servidor (cifrado en reposo), pero las claves de descifrado suelen estar bajo control del proveedor. Esto implica que, técnicamente, el proveedor puede acceder al contenido si recibe una orden judicial extranjera o si un empleado malintencionado vulnera los controles internos. Para un abogado colombiano, esa posibilidad es inaceptable a la luz del artículo 34 citado.
Obsidian Sync implementa un modelo de conocimiento cero (*zero-knowledge*). Antes de que cualquier dato salga del dispositivo del abogado, se cifra con una clave que solo existe en los equipos autorizados. El servidor de Obsidian recibe un conjunto de bits opacos que no puede descifrar porque no posee la clave. La contraseña de cifrado que se configuró en el Módulo 1 es, en realidad, el material del que se deriva esa clave. Obsidian nunca la ve, nunca la almacena y no puede recuperarla.
### 9.2.2 Cómo se establece la cadena de confianza
1. Al crear la bóveda remota (Módulo 1, sección 1.1), el administrador definió una «Encryption password» robusta.
2. Esa contraseña, combinada con un *salt* aleatorio generado por el cliente, se transforma mediante una función de derivación de claves (PBKDF2 o similar) en una clave maestra simétrica (AES-256-GCM).
3. Cada archivo, antes de enviarse, se cifra con una clave derivada de esa clave maestra. Los metadatos de sincronización también se cifran.
4. Ningún dato sale del dispositivo en texto plano. El servidor solo ve fragmentos cifrados y los retransmite a los demás dispositivos autorizados.
Este diseño ha sido auditado por terceros y está documentado en el sitio oficial de Obsidian. Para el despacho, la implicación práctica es clara: la información del cliente está tan protegida en tránsito y en reposo como lo está en el disco duro local.
### 9.2.3 Custodia de la contraseña de cifrado
La seguridad del sistema depende enteramente de que la contraseña de cifrado no caiga en manos equivocadas y de que no se pierda. Las siguientes prácticas son indispensables:
- **No almacenar la contraseña en la misma bóveda.** Parece obvio, pero un administrador poco precavido podría crear una nota con la contraseña «para no olvidarla». Eso anularía el cifrado.
- **No compartirla por canales inseguros.** La contraseña debe transmitirse verbalmente o mediante un gestor de contraseñas cifrado (Bitwarden, 1Password) compartido exclusivamente entre los miembros del despacho. Nunca por correo electrónico, WhatsApp o mensaje de texto.
- **Almacenar una copia física de respaldo.** En un sobre sellado, dentro de la caja fuerte del despacho, debe reposar una copia manuscrita de la contraseña. Esto previene la pérdida total de acceso si el administrador queda incapacitado y los demás no recuerdan la contraseña.
La pérdida irrecuperable de la contraseña implica la pérdida de todos los datos de la bóveda remota. Obsidian no puede restablecerla. Por eso, la copia de seguridad local complementaria (sección 9.4) es vital.
## 9.3 Política de dispositivos autorizados: solo equipos del bufete con disco cifrado
El cifrado extremo a extremo protege los datos en tránsito y en el servidor, pero no protege el dispositivo local si este es robado o requisado sin las debidas precauciones. La primera línea de defensa es una política estricta de dispositivos autorizados.
### 9.3.1 Principios de la política
1. **Solo los equipos de propiedad del despacho** pueden sincronizar la bóveda. No se autorizan dispositivos personales de los abogados, salvo que el despacho los haya suministrado y configurado.
2. **No se autorizan celulares o tabletas con acceso a la bóveda completa**, a menos que sea estrictamente necesario (por ejemplo, para consultar una nota durante una audiencia). En ese caso, el dispositivo móvil debe tener cifrado de almacenamiento activado y bloqueo por biometría o PIN robusto.
3. **Cada equipo debe tener el disco duro completamente cifrado** mediante la herramienta nativa del sistema operativo.
4. **La sesión de Obsidian debe cerrarse al terminar la jornada o al ausentarse del equipo.** Si el equipo permanece encendido, la bóveda está accesible para cualquiera que tome el control.
### 9.3.2 Cómo activar el cifrado de disco
**Windows:** Active BitLocker (disponible en ediciones Pro, Enterprise y Education). Si la edición es Home, se puede usar el cifrado de dispositivo estándar o actualizar a Pro.

Panel de control > Sistema y seguridad > Cifrado de unidad BitLocker > Activar BitLocker.

text

**macOS:** Active FileVault.

Preferencias del Sistema > Seguridad y privacidad > FileVault > Activar FileVault.

text

**Linux:** Use LUKS durante la instalación del sistema operativo o, si ya está instalado, herramientas como `cryptsetup` para cifrar particiones.
El cifrado de disco protege contra el acceso no autorizado si el equipo es robado, extraviado o embargado. Sin la contraseña de inicio de sesión o la clave de recuperación, el disco es ilegible.
### 9.3.3 Verificación periódica
El administrador del sistema debe mantener una lista actualizada de los dispositivos autorizados y verificar, al menos trimestralmente, que el cifrado de disco sigue activo. También debe asegurarse de que las claves de recuperación de BitLocker o FileVault estén custodiadas de forma segura (por ejemplo, impresas y guardadas en la caja fuerte, o almacenadas en el gestor de contraseñas del despacho).
## 9.4 Copia de seguridad complementaria: exportación semanal a almacenamiento local cifrado
Obsidian Sync mantiene un historial de versiones en la nube cifrada. Sin embargo, confiar exclusivamente en un único proveedor para la recuperación ante desastres no es prudente. Un error grave del administrador (como cambiar la contraseña de cifrado y olvidarla), una suspensión imprevista de la cuenta o un incidente técnico en los servidores de Obsidian podrían dejar los datos inaccesibles temporal o permanentemente.
La solución es una copia de seguridad complementaria, externa a Obsidian Sync, que garantice que el despacho siempre tiene acceso a sus archivos en formato abierto (Markdown).
### 9.4.1 Procedimiento semanal de respaldo
**Responsable:** Un abogado designado (o el administrador del sistema) ejecutará este procedimiento cada viernes al cierre de la jornada, o el último día hábil de la semana.
**Pasos:**
1. Asegúrese de que la bóveda local está completamente sincronizada. El indicador de Sync debe estar en reposo.
2. Cierre Obsidian para evitar que se escriban cambios durante el proceso de copia.
3. Localice la carpeta de la bóveda en el explorador de archivos. Contiene todos los `.md`, la carpeta `.obsidian` (configuración) y los anexos que se hayan incorporado (PDF, imágenes).
4. Comprima la carpeta completa en un archivo `.zip` o `.7z`. En Windows: clic derecho > «Enviar a > Carpeta comprimida». En macOS: clic derecho > «Comprimir».
5. **Cifre el archivo comprimido.** No basta con comprimir: la copia debe estar cifrada con una contraseña robusta. Se recomienda usar **7-Zip** (Windows, gratuito) con algoritmo AES-256:

7z a -p -mhe=on -t7z "respaldo-bufete-2024-06-28.7z" "C:\Ruta\Bufete*"

text

El parámetro `-p` solicitará una contraseña; `-mhe=on` cifra también los nombres de los archivos.
En macOS o Linux, puede usarse `zip` con cifrado AES (a través de `7z` también) o herramientas gráficas como **Cryptomator** (crear una bóveda cifrada y copiar allí la carpeta).
6. Almacene el archivo cifrado en al menos dos ubicaciones físicas distintas:
   - Un disco duro externo guardado en la caja fuerte del despacho.
   - Un segundo disco duro externo guardado fuera de la oficina (domicilio del director, por ejemplo), o un servicio de almacenamiento en la nube de confianza (incluso OneDrive o Google Drive), ya que el archivo está cifrado con una clave independiente de Obsidian. Esta redundancia geográfica protege contra incendio, inundación o hurto de la oficina.
7. Abra Obsidian de nuevo y continúe el trabajo.
### 9.4.2 Retención de copias
Se recomienda mantener las copias de seguridad de las últimas cuatro semanas. Cada copia semanal se almacena con su fecha en el nombre (`respaldo-bufete-2024-06-28.7z`). La copia más antigua se elimina al crear la quinta, salvo que se desee conservar un archivo histórico más extenso. Este esquema rotativo es suficiente para la mayoría de los despachos.
### 9.4.3 Prueba de restauración
Una copia de seguridad que nunca se ha probado no es una copia de seguridad confiable. Trimestralmente, el abogado designado debe realizar una prueba de restauración:
1. Descifre el archivo `.7z` en un equipo de prueba (no en el equipo principal).
2. Extraiga la bóveda y ábrala con Obsidian.
3. Verifique que las notas, los enlaces y los metadatos estén intactos.
4. Elimine la copia de prueba.
Esta prueba toma quince minutos y previene sorpresas desagradables en un escenario real de desastre.
### 9.4.4 Conformidad con el deber de custodia
El artículo 34 de la Ley 1123 de 2007 obliga al abogado a conservar la información relacionada con los servicios prestados por un término mínimo de cinco años, contados desde la terminación del encargo. Las copias de seguridad semanales, debidamente rotadas y almacenadas, constituyen un respaldo verificable de esa conservación. No dependen de la vigencia de la licencia de Obsidian Sync ni de la continuidad del proveedor; son archivos estándar, legibles con cualquier editor de texto, que el despacho puede conservar por sus propios medios.
## 9.5 Destrucción segura de la bóveda en caso de cese de un abogado
Cuando un abogado se retira del despacho, ya sea por renuncia, terminación del contrato o cualquier otra causa, es imperativo retirarle el acceso a la bóveda compartida para prevenir la divulgación no autorizada de información del cliente. El procedimiento debe ser inmediato y cubrir tanto la bóveda remota como la copia local.
### 9.5.1 Revocación del acceso a la bóveda remota
1. El administrador del despacho abre Obsidian en su equipo.
2. Va a «Settings > Sync > Remote vaults» y hace clic en «Manage» junto a la bóveda `Bufete`.
3. En la pestaña «Sharing», localiza al abogado cesante en la lista de usuarios con acceso.
4. Hace clic en «Remove access» (o el equivalente) y confirma.
5. A partir de ese momento, el cliente de Obsidian del abogado cesante ya no puede sincronizar con la bóveda remota. El servidor le denegará las solicitudes. Sus archivos locales no se ven afectados, pero cualquier cambio futuro no se propagará al despacho.
### 9.5.2 Destrucción de la copia local en el equipo del abogado cesante
Este paso es responsabilidad del abogado cesante, pero el despacho debe exigirlo y, si es posible, supervisarlo o realizarlo con autorización.
1. El abogado cesante debe eliminar la carpeta local de la bóveda. Basta con moverla a la papelera y vaciarla.
2. Para mayor seguridad, si el equipo tiene disco cifrado, la eliminación simple es suficiente porque los datos residen en sectores cifrados. Sin embargo, se recomienda usar una herramienta de borrado seguro si el equipo va a ser reasignado a otra persona ajena al despacho. En Windows, `cipher /w` sobre la carpeta; en macOS, `rm -rf` y luego `diskutil secureErase freespace` (si se quiere extremar). En la práctica, con el disco cifrado, la eliminación lógica es adecuada.
3. Se debe verificar que el abogado cesante no haya copiado la bóveda en un dispositivo personal antes del cese. Este es un asunto contractual y de confianza, no puramente técnico. La carta de terminación o el acta de entrega deben incluir una cláusula expresa donde el abogado manifiesta haber eliminado cualquier copia de la información del despacho y se compromete a no conservarla.
### 9.5.3 Cambio de la contraseña de cifrado (medida adicional opcional)
Si existe la sospecha fundada de que el abogado cesante pudo haber retenido la contraseña de cifrado y una copia no autorizada de la bóveda (por ejemplo, en un USB), el administrador puede cambiar la contraseña de cifrado de la bóveda remota. Esto no elimina la copia que el cesante tenga, pero sí la deja inaccesible porque esa copia está cifrada con la contraseña antigua y no podrá abrirse sin ella. El procedimiento de cambio de contraseña está documentado en la ayuda oficial de Obsidian Sync y debe ejecutarse con precaución, asegurándose primero de que todos los miembros legítimos conozcan la nueva contraseña.
## 9.6 Ejercicio guiado
### 9.6.1 Simulación de respaldo y restauración
1. El viernes por la tarde (o en un momento de baja actividad), el abogado designado cierra Obsidian en su equipo.
2. Localiza la carpeta de la bóveda y crea un archivo comprimido cifrado con contraseña, siguiendo los pasos de la sección 9.4.1. Use como contraseña una frase distinta de la de Obsidian Sync, por ejemplo: `BufetePrueba2024!`.
3. Guarde el archivo en un disco externo.
4. Espere al lunes siguiente y, en un equipo de prueba (puede ser el mismo, pero en una ubicación distinta), descifre el archivo y extraiga la bóveda.
5. Abra la bóveda con Obsidian y verifique que los casos recientes aparecen. Cree una nota de prueba (`Respaldo exitoso`) y ciérrela.
6. Elimine la bóveda extraída.
### 9.6.2 Simulación de cese de un abogado (con roles)
1. El administrador y un colega simulan el cese. El administrador revoca el acceso del colega en la pestaña «Sharing» de la bóveda remota.
2. El colega intenta forzar una sincronización (`Ctrl/Cmd + P > Sync: Sync`) y verifica que recibe un mensaje de error o que la sincronización no avanza.
3. El colega elimina la carpeta de la bóveda de su equipo (¡asegurarse de que es una bóveda de prueba o una copia prescindible para este ejercicio! No usar la bóveda real).
4. Ambos confirman que el acceso ha sido efectivamente revocado y que los datos del despacho quedan protegidos.
### 9.6.3 Discusión en equipo
Reúnanse por unos minutos y comenten:
- ¿Qué tan sencillo les resultó el proceso de respaldo?
- ¿Dónde guardarán físicamente los discos externos de respaldo?
- ¿El protocolo de cese está alineado con lo que estipulan los contratos de trabajo o de prestación de servicios del despacho?
- ¿Es necesario reforzar alguna cláusula contractual sobre la devolución de información?
---
Al completar este módulo, el despacho cuenta con una política de seguridad integral que va más allá de la herramienta. No se limita a confiar en Obsidian Sync; verifica, respalda y audita. Y sobre todo, honra el deber de secreto profesional con medidas concretas, documentadas y periódicamente puestas a prueba. El círculo de la confianza queda cerrado.