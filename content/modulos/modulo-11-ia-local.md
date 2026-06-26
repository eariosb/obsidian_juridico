---
title: Inteligencia artificial local
slug: ia-local-boveda-juridica
subtitle: Consultar, resumir y redactar apoyándose en la base de conocimiento del despacho, sin que los datos abandonen el entorno de confianza.
objective:
  - Comprender el patrón wiki de Karpathy y su aplicación al contexto jurídico colombiano.
  - Instalar y servir un modelo de lenguaje local (Ollama) en un equipo del despacho.
  - Configurar los plugins Text Generator y Smart Connections en Obsidian para integrar la IA con la bóveda.
  - Aplicar búsqueda semántica de jurisprudencia, redacción asistida de escritos, resumen de actuaciones y detección de contradicciones.
  - Estructurar notas de contexto para mejorar la precisión de las respuestas del modelo.
  - "Aplicar límites éticos claros: el abogado conserva la autoría y la responsabilidad."
order: 11
datasets:
  - Bóveda del despacho con casos, jurisprudencia y doctrina.
---
# Inteligencia artificial local 
## 1. El patrón wiki de Karpathy aplicado al derecho
Andrej Karpathy, científico de la computación y una de las voces más influyentes en inteligencia artificial, popularizó un flujo de trabajo que denominó *LLM wiki pattern*. La idea es engañosamente simple: en lugar de escribir instrucciones largas y genéricas para un modelo de lenguaje (LLM), el usuario mantiene una wiki personal —en su caso, archivos Markdown— y la emplea como contexto vivo para las consultas. Cuando necesita una respuesta, recupera las notas más pertinentes de su propia base de conocimiento y las inyecta en el prompt. El LLM no razona sobre el vacío; razona sobre el archivo que el usuario ha construido durante meses o años.
Este patrón resuelve dos problemas clásicos de los LLM aplicados al derecho: la alucinación (invención de datos) y la generalidad. Un modelo de lenguaje no entrenado con los casos del despacho tenderá a dar respuestas basadas en patrones estadísticos genéricos, a veces incorrectos o desactualizados. En cambio, cuando se le proporciona el texto exacto de las sentencias y escritos que obran en la bóveda, sus respuestas se vuelven más precisas, pertinentes y verificables.
En el contexto jurídico colombiano, esto se traduce en la capacidad de formular preguntas como:
- *¿En qué casos hemos alegado la falta de legitimación en la causa y cómo se resolvió?*
- *Redacta una excepción previa de prescripción con base en la jurisprudencia almacenada en mi bóveda.*
- *Resume las notas de la audiencia del 4 de marzo para el caso EXP-2024-123.*
- *¿Qué sentencias de la Sección Tercera del Consejo de Estado tratan la pérdida de oportunidad como daño autónomo?*
El sistema no inventa. Responde usando las notas reales del despacho. Si la información no está en la bóveda, lo indicará (o debería indicarlo, si se configura adecuadamente). El abogado mantiene el control absoluto: la IA es un asistente de lectura y redacción, no un oráculo.
## 2. Privacidad como premisa innegociable
Antes de instalar ninguna herramienta, se fija la regla de oro que rige todo el módulo: el secreto profesional impide enviar datos de clientes a servicios externos sin consentimiento informado y sin garantías técnicas de confidencialidad. La Ley 1123 de 2007 (Código Disciplinario del Abogado), en su artículo 34, obliga a custodiar la información. Enviar un radicado, un nombre o un hecho concreto a un servidor en el extranjero para que un modelo comercial lo procese puede constituir una infracción a ese deber.
Por tanto, se trabajará con dos opciones:
- **Opción A (recomendada):** modelo de lenguaje local ejecutado en un equipo del despacho, mediante Ollama o LM Studio. La información nunca sale del disco duro. El cifrado de disco (BitLocker, FileVault, LUKS) protege el repositorio incluso en caso de robo del equipo.
- **Opción B:** uso de APIs externas (OpenAI, Anthropic, etc.) con extremo cuidado, anonimizando nombres, radicados y hechos identificables. Solo para tareas de apoyo doctrinal o de redacción genérica, nunca para analizar un caso con datos sensibles. Esta opción no se desarrolla en profundidad en este módulo, porque la opción local es la única que garantiza el cumplimiento pleno sin depender de la confianza en un tercero.
Este módulo se centra en la opción A.
## 3. Herramientas: el ecosistema mínimo
Para montar un asistente local sobre la bóveda se necesitan cuatro componentes, todos gratuitos y de código abierto, excepto Obsidian que ya se tiene. La instalación completa no toma más de 30 minutos y no requiere conocimientos de programación.
### 3.1 Ollama
Ollama es un servidor local de modelos de lenguaje. Empaqueta modelos como Llama 3, Mistral o Phi-3 en un ejecutable que se instala en Windows, macOS o Linux y expone una API REST en `http://localhost:11434`. Descarga el modelo elegido una sola vez y luego lo sirve para que otras aplicaciones (en nuestro caso, Obsidian) puedan consultarlo sin conexión a internet.
Ventajas:
- Privacidad total: los datos nunca salen de la máquina.
- Sin costos recurrentes: los modelos son abiertos (Llama 3.1 8B, Mistral 7B, etc.) y se ejecutan en el hardware local.
- Latencia baja si el equipo tiene suficiente RAM y, opcionalmente, GPU.
### 3.2 Plugin Obsidian Text Generator
Text Generator es un plugin comunitario que añade un panel de consulta a Obsidian. Se conecta a Ollama (o a APIs externas) y permite enviar prompts desde el editor. Soporta plantillas con variables como `{{title}}` (título de la nota) y `{{selected}}` (texto seleccionado). Así, el abogado puede seleccionar un párrafo de un escrito y pedir al modelo que lo reescriba, lo amplíe o lo resuma, sin salir del entorno de trabajo.
### 3.3 Plugin Smart Connections
Smart Connections es el componente que materializa el patrón wiki. Realiza dos funciones:
1. Calcula *embeddings* (representaciones vectoriales) de cada nota de la bóveda, usando un modelo ligero que se ejecuta localmente. Esto le permite encontrar las notas más similares semánticamente a una pregunta, incluso si no comparten palabras clave.
2. Al recibir una consulta, recupera esas notas relevantes y las inyecta como contexto en el prompt antes de enviarlo al LLM. Así, el modelo responde basándose en el contenido de la bóveda.
Smart Connections puede operar completamente offline si se configura para usar un modelo de embeddings local, como `all-MiniLM-L6-v2` a través de Transformers.js.
### 3.4 Dataview
Dataview (Módulo 5) ya es familiar. En este contexto, sirve para extraer metadatos estructurados que pueden alimentar prompts de forma masiva, aunque no se integra directamente con los LLM; es más bien una herramienta complementaria para preprocesar información.
## 4. Integración paso a paso
A continuación se detalla la instalación y configuración para dejar el sistema funcionando. Se asume un equipo con al menos 8 GB de RAM (16 GB recomendados si se usa un modelo de 8B parámetros). Si el equipo tiene menos, se puede optar por modelos más pequeños como Phi-3 Mini (3.8B) que ofrecen un rendimiento aceptable para tareas de resumen y búsqueda.
### 4.1 Instalar y servir un modelo local con Ollama
1. Visite [ollama.com](https://ollama.com/) y descargue el instalador para su sistema operativo. Ejecútelo y siga las instrucciones. En Windows, Ollama se instala como servicio en segundo plano.
2. Abra una terminal (Símbolo del sistema en Windows, Terminal en macOS/Linux).
3. Descargue el modelo. Se recomienda `llama3.1:8b` (8 mil millones de parámetros, buen equilibrio entre capacidad y velocidad). Ejecute:
```bash
ollama pull llama3.1:8b
```
La descarga puede tomar varios minutos, dependiendo de la conexión. El modelo ocupa aproximadamente 4.7 GB.

4. Para verificar que funciona, ejecute:
    

```bash

ollama run llama3.1:8b
```
Aparecerá un prompt interactivo. Escriba un mensaje breve (por ejemplo, "Explícame qué es la responsabilidad civil extracontractual en Colombia en dos frases.") y presione Enter. El modelo responderá. Para salir, escriba `/bye`.

5. El servidor de Ollama se inicia automáticamente al instalar y queda escuchando en `http://localhost:11434`. No es necesario ejecutar `ollama serve` manualmente, a menos que se haya detenido.
    

### 4.2 Configurar Text Generator en Obsidian

1. En Obsidian, vaya a «Settings > Community plugins» e instale «Text Generator» (autor: Noureddine Haouari).
    
2. Active el plugin.
    
3. En la configuración de Text Generator, busque la sección «LLM Settings» o «Provider Settings».
    
4. Seleccione como proveedor «Ollama» (o «Custom» si no aparece; en ese caso introduzca manualmente la URL base).
    
5. Establezca los siguientes parámetros:
    
    - **Base URL:** `http://localhost:11434`
        
    - **Model:** `llama3.1:8b`
        
    - **Max tokens:** 2048 (para respuestas extensas, 4096 si el equipo lo permite).
        
    - **Temperature:** 0.3 (valores bajos reducen la creatividad y mejoran la precisión factual, recomendado para derecho).
        
6. Guarde la configuración.
    

**Prueba rápida:**

- Cree una nota nueva.
    
- Ejecute el comando `Text Generator: Generate Text` desde la paleta (`Ctrl/Cmd + P`).
    
- En el panel que aparece, escriba: "Enumere los requisitos del título ejecutivo según el artículo 422 del CGP colombiano."
    
- Presione Enter. El modelo debería responder con una lista.
    

### 4.3 Configurar Smart Connections

1. Instale el plugin «Smart Connections» (autor: Brian Petro).
    
2. Active el plugin.
    
3. En la configuración de Smart Connections, localice la sección «Model» o «Embedding Model».
    
4. Para funcionamiento completamente local, seleccione «Transformers.js (local)» y elija el modelo `all-MiniLM-L6-v2` (es el predeterminado y funciona bien con textos en español, aunque está entrenado principalmente en inglés; en la práctica, para búsqueda semántica multilingüe es aceptable). Si el equipo tiene recursos, puede optar por modelos multilingües específicos si están disponibles en el plugin.
    
5. En «Chat Model», configure la conexión a Ollama de manera similar a como hizo con Text Generator:
    
    - **Provider:** Ollama
        
    - **Model:** llama3.1:8b
        
    - **Base URL:** [http://localhost:11434](http://localhost:11434/)
        
6. Smart Connections comenzará a indexar las notas de la bóveda. Esto puede tomar varios minutos la primera vez, dependiendo del tamaño de la bóveda. El índice se almacena localmente.
    
7. Una vez completada la indexación, puede probar la búsqueda semántica: ejecute el comando `Smart Connections: Find Notes` y escriba un concepto. El plugin mostrará una lista de notas relevantes, ordenadas por similitud semántica.
    

**Prueba de integración:**

- Abra una nota que tenga contenido, por ejemplo, una sentencia sobre responsabilidad médica.
    
- En el panel de Smart Connections (normalmente en la barra lateral derecha), haga clic en el ícono de chat.
    
- Escriba: "Resume en un párrafo los hechos relevantes de esta nota."
    
- El plugin inyectará el contenido de la nota activa como contexto y el modelo responderá.
    

## 5. Casos de uso inmediatos en el ejercicio del derecho

Con el sistema montado, el abogado dispone de un asistente que lee y razona sobre su propio archivo. A continuación se presentan los escenarios de mayor utilidad práctica, con ejemplos concretos.

### 5.1 Búsqueda semántica de jurisprudencia

El despacho acumula decenas o cientos de sentencias. Encontrar una por palabras clave exactas puede fallar si el lenguaje del fallo no coincide con la consulta. Smart Connections resuelve esto.

**Ejemplo realista:**

El abogado tiene treinta sentencias del Consejo de Estado en `Jurisprudencia/`. Abre el panel de chat de Smart Connections y escribe:

```text

¿Qué sentencias de la Sección Tercera hablan sobre la pérdida de oportunidad como daño autónomo?
```
Smart Connections busca las notas más similares semánticamente y las pasa al modelo. La respuesta será algo como:

> Según tu bóveda, las sentencias que tratan ese tema son:
> 
> - Sentencia 25000-23-26-000-2010-00345-01 (Consejo de Estado, Sección Tercera, 2015): reconoce la pérdida de oportunidad como daño autónomo.
>     
> - Sentencia 05001-23-31-000-2008-01234-01 (Consejo de Estado, 2018): analiza la diferencia entre lucro cesante y pérdida de oportunidad.
>     

El abogado copia esa referencia y la incorpora a su escrito. Todo ello sin haber abierto manualmente cada sentencia.

### 5.2 Redacción asistida de un acápite procesal

El abogado está redactando una demanda de responsabilidad médica. Ya tiene en su bóveda notas sobre los artículos 2341 y 2356 del Código Civil, así como varias sentencias de la Sala Civil. Quiere que el modelo le ayude a redactar el capítulo de «Fundamentos de derecho».

**Procedimiento:**

1. En la nota de la demanda, seleccione el texto de la sección «Fundamentos de derecho» (o deje el cursor allí si está vacía).
    
2. Ejecute un template de Text Generator con el siguiente prompt:
    

```text

Eres un abogado colombiano especializado en responsabilidad médica. A continuación se te proporcionan las notas de doctrina y jurisprudencia de mi bóveda que son relevantes. Redacta el capítulo de fundamentos de derecho para una demanda de responsabilidad civil médica, citando expresamente los artículos del Código Civil y las sentencias de la Corte Suprema de Justicia que aparecen en las notas. No inventes normas ni jurisprudencia. Si alguna nota no es pertinente, omítela.
Notas relevantes:
{{Smart Connections: 5}}

La variable `{{Smart Connections: 5}}` insertará automáticamente el contenido de las 5 notas más relevantes según el índice semántico.
```
3. El modelo redacta un borrador con citas reales, extraídas de las notas. El abogado lo revisa, corrige lo que sea necesario y mantiene la autoría total.
    

### 5.3 Resumen automático de una audiencia

Tras una audiencia, el abogado ha tomado notas manuscritas y las ha digitalizado mediante OCR, pegando el texto en una nota de `Agenda/`. El texto es extenso y desordenado.

**Procedimiento:**

1. Abra la nota de la audiencia.
    
2. Ejecute el comando de Smart Connections o Text Generator y escriba:
    

```text

Resume esta nota de audiencia en los siguientes apartados:
- Decisiones del juez.
- Hitos procesales fijados (fechas).
- Tareas pendientes para el despacho.
Usa viñetas y sé conciso.
```
El modelo procesa el texto y devuelve un resumen estructurado que el abogado puede insertar al final de la nota o en la nota del caso.

### 5.4 Detección de contradicciones o argumentos faltantes

Antes de radicar un recurso de apelación, el abogado quiere verificar que no está contradiciendo lo alegado en otro caso similar ni omitiendo un precedente importante que ya está en la bóveda.

**Procedimiento:**

1. Con el recurso abierto, ejecute un prompt como:
    

```text

Revisa este recurso de apelación contra sentencia de tutela. Identifica si:
- Falta citar algún precedente relevante que esté en mi bóveda.
- Algún argumento contradice lo dicho en otros escritos del despacho sobre temas similares.
Para ello, compara con las notas de jurisprudencia y escritos que te proporcione Smart Connections.
Texto del recurso:
{{selected}}
```
2. Smart Connections recupera las notas pertinentes y el modelo las contrasta con el texto seleccionado. Si encuentra una posible contradicción o una omisión, la señala. La decisión final de ajustar o no el recurso es exclusivamente del abogado.
    

## 6. El patrón wiki en la práctica: alimentar el contexto

La calidad de las respuestas del LLM depende directamente de la calidad y estructura de las notas que se le proporcionan. No basta con tener información; hay que prepararla para que el modelo la aproveche.

### 6.1 Notas de caso con secciones claras

Cada nota de caso debe tener una sección `## Hechos relevantes` redactada en prosa fluida, no telegráfica. El modelo entiende mejor los párrafos completos que las listas de viñetas inconexas. Por ejemplo:

```markdown

## Hechos relevantes
El 10 de octubre de 2023, la paciente María Gómez ingresó a la Clínica Norte para una colecistectomía laparoscópica programada. Durante el procedimiento, el cirujano lesionó la vía biliar principal, lo que obligó a una segunda intervención quirúrgica de urgencia. La paciente permaneció hospitalizada veinte días adicionales y desarrolló una infección por Pseudomonas aeruginosa. La historia clínica (folio 15) registra la lesión como un incidente intraoperatorio.

### 6.2 Sentencias con fragmentos extensos

En lugar de solo la ficha con metadatos, las notas de jurisprudencia deben contener fragmentos textuales bajo encabezados descriptivos:

markdown

## Ratio decidendi
> "En materia de responsabilidad médica, la carga de la prueba se distribuye según la naturaleza de la obligación. Tratándose de obligaciones de medio, corresponde al demandante acreditar la culpa; en las de resultado, esta se presume."
## Fragmentos clave
- Carga dinámica de la prueba.
- Consentimiento informado como deber autónomo.
```
Estos fragmentos son los que el modelo citará en sus respuestas, aumentando la precisión.

### 6.3 Notas de contexto

Una técnica poderosa es crear «notas de contexto» que reúnan, mediante transclusión, todo lo relevante para un tema recurrente. Por ejemplo, una nota `Prescripción extintiva.md`:

```markdown

# Prescripción extintiva
## Doctrina
![[Prescripción extintiva en el Código Civil Colombiano#Comentario]]
## Jurisprudencia
![[Sentencia SC-123-2022#Ratio decidendi]]
![[Sentencia SC-456-2023#Fragmentos clave]]
## Escritos previos
![[Contestación EXP-2023-00001#Excepción de prescripción]]
```
Cuando el abogado necesite redactar una excepción de prescripción, puede pasar esa nota de contexto al LLM con un prompt simple: «Con base en la siguiente nota, redacta una excepción de prescripción para el caso EXP-2024-00089.» El modelo tendrá acceso a doctrina, jurisprudencia y un ejemplo previo, todo extraído de la bóveda.

## 7. Límites y ética

La inteligencia artificial local es una herramienta, no un reemplazo del abogado. Su uso debe estar enmarcado en principios claros:

1. **Autoría y responsabilidad.** El contenido generado por el LLM es un borrador. El abogado que lo firma asume la autoría intelectual y la responsabilidad disciplinaria y civil por su contenido. No se puede delegar la función de revisión crítica.
    
2. **Verificación.** Toda cita jurisprudencial o normativa sugerida por el modelo debe ser verificada contra la fuente original. El modelo puede alucinar aunque esté trabajando con la bóveda, especialmente si la nota es muy corta o ambigua.
    
3. **Datos sensibles.** Incluso con modelos locales, se recomienda no ingresar datos completos de identificación de clientes si no es estrictamente necesario para la consulta. El sentido común indica que se puede preguntar sobre «el caso de la paciente con colecistectomía» sin mencionar nombres.
    
4. **Auditabilidad.** Es buena práctica mantener un registro (en la nota diaria) de las consultas relevantes hechas al modelo, especialmente aquellas cuyas respuestas se incorporaron a escritos. Esto facilita la trazabilidad si en el futuro surge una controversia sobre el origen de un argumento.
    
5. **Capacitación continua.** El abogado debe comprender los fundamentos del modelo que usa. No necesita ser programador, pero sí entender que el LLM predice palabras basándose en patrones, y que no «razona» en el sentido jurídico del término. Esa comprensión previene la sobreconfianza.
    

## 8. Ejercicio guiado

**Objetivo:** Realizar el ciclo completo de consulta a la bóveda, redacción asistida y verificación.

**Requisitos:** Tener instalado Ollama con Llama 3.1 (8B) o similar, y los plugins Text Generator y Smart Connections configurados.

### Paso 1: Preparar la bóveda

1. Asegúrese de que la bóveda tiene al menos tres sentencias del Consejo de Estado o de la Corte Suprema en `Jurisprudencia/`. Si no las tiene, cree tres notas con fragmentos reales o simulados, pero verosímiles. Cada nota debe tener un encabezado `## Ratio decidendi` y un fragmento.
    
2. Cree una nota de contexto llamada `Responsabilidad estatal.md` en `Doctrina/` que transcluya los fragmentos de ratio de esas tres sentencias:
    

```markdown

# Responsabilidad estatal por falla del servicio
## Jurisprudencia relevante
![[Sentencia CE-001-2019#Ratio decidendi]]
![[Sentencia CE-002-2021#Ratio decidendi]]
![[Sentencia CE-003-2023#Ratio decidendi]]
```
### Paso 2: Búsqueda semántica y respuesta contextual

1. Abra el panel de chat de Smart Connections.
    
2. Escriba: _«Según mis notas, ¿cuáles son los requisitos para declarar la falla del servicio en casos de lesiones causadas por la fuerza pública?»_
    
3. Observe la respuesta. Debería citar las sentencias cuyas ratios transcluyó. Si no lo hace, revise que Smart Connections haya indexado correctamente las notas.
    
4. Copie la respuesta en una nota nueva `Investigación - Falla del servicio.md`.
    

### Paso 3: Redacción asistida de un fundamento de derecho

1. Cree una nota simulando un borrador de demanda contra una entidad estatal por lesiones causadas por la fuerza pública.
    
2. Seleccione el apartado «Fundamentos de derecho».
    
3. Ejecute Text Generator con el prompt:
    

```text

Eres un abogado colombiano. A partir de las siguientes notas de jurisprudencia (que te proporcionará Smart Connections), redacta el capítulo de fundamentos de derecho para esta demanda. Cita las sentencias con su número de radicación y la ratio decidendi.
{{Smart Connections: 3}}
```
4. Revise el resultado. Verifique que las citas correspondan a las sentencias de la bóveda y que el razonamiento sea coherente.
    

### Paso 4: Detección de omisiones

1. Pida al modelo:
    

```text

Revisa los fundamentos de derecho que acabo de redactar. ¿Falta citar alguna sentencia relevante de mi bóveda sobre el tema de falla del servicio y fuerza pública? Si es así, indícala y sugiere cómo integrarla.
```
2. Evalúe la sugerencia y decida si incorpora la sentencia adicional.
    

### Paso 5: Verificación y cierre

1. Abra cada sentencia citada en el borrador y confirme que el fragmento referenciado existe y es correcto.
    
2. Haga los ajustes finales al escrito.
    
3. En la nota diaria, registre: «Asistencia de IA local para redacción de fundamentos de derecho en demanda contra la Nación. Respuestas verificadas contra fuentes originales.»
    
4. Sincronice la bóveda.
    

---

Con este módulo avanzado, el despacho trasciende el concepto de archivo digital para convertirse en un entorno de conocimiento aumentado. La inteligencia artificial no reemplaza al abogado; le devuelve tiempo y precisión al encargarse de leer, recordar y cruzar información, para que el criterio jurídico humano se aplique donde realmente importa: en la estrategia, la argumentación y la decisión final.