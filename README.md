

# Teclado — Aplicación Interactiva de Práctica de Mecanografía

Participantes:
- Alejandro Muñoz
- Gerson Hurtado


Qué hicimos
-----------
- Levantamos SonarQube localmente con Docker y ejecutamos `sonar-scanner` desde un contenedor para analizar el proyecto.
- Probamos y subimos un análisis exitoso a SonarQube local.
- Preparado uso del `Jenkinsfile` para integrar SonarQube y despliegue por SSH (requiere credenciales en Jenkins).

Estructura del repositorio
--------------------------
- `index.html` — vista principal con representación del teclado.
- `script.js` — lógica de selección aleatoria y manejo de teclas.
- `css/style.css` — estilos del teclado.
- `sonar-project.properties` — configuración de análisis Sonar (no incluir tokens en el repo idealmente).
- `Jenkinsfile` — pipeline propuesto para CI (Checkout, SonarQube, Build placeholder, Deploy via SSH).

Ejecutar el proyecto localmente
-------------------------------
Hay dos maneras sencillas:

1) Abrir el archivo directamente (método rápido):

```powershell
cd "c:\Users\alejo\Documents\SEMESTRE VIII\ingesoft 5\Teclado\Teclado"
Start-Process "index.html"
```
Verificación en el navegador
----------------------------
- Abre DevTools (F12) → Console: busca errores JS.
- Verifica que exista un elemento con clase `selected` dentro de `.keyboard`.
- Presiona la tecla que aparece seleccionada y observa la animación.

SonarQube — levantar localmente (Docker)
---------------------------------------
Recomendado para pruebas locales.

2) Levantar SonarQube (Docker Desktop recomendado):

```powershell
docker run -d --name sonarqube -p 9000:9000 sonarqube:9.9-community
```

> Nota: SonarQube suele necesitar una base de datos para producción; la imagen `sonarqube:9.9-community` funciona para pruebas locales y, en algunos casos, ya se expiró una base de datos temporal en otro contenedor. Si ya tenemos un contenedor `sonarqube-db`, Sonar puede estar configurado para usarlo.

3) Abrir interfaz: http://localhost:9000 (usuario por defecto: admin/admin).

Ejecutar SonarScanner desde Docker (sin instalar herramientas locales)
------------------------------------------------------------------
Recomendado para evitar instalación en Windows. Usamos `host.docker.internal` para que el contenedor vea el Sonar en el host:

```powershell
cd "c:\Users\alejo\Documents\SEMESTRE VIII\ingesoft 5\Teclado\Teclado"
docker run --rm -v "${PWD}:/usr/src" -w /usr/src \
	-e SONAR_SCANNER_OPTS="--add-opens java.base/java.lang=ALL-UNNAMED --add-opens java.base/java.lang.reflect=ALL-UNNAMED --add-opens java.base/java.lang.invoke=ALL-UNNAMED" \
	sonarsource/sonar-scanner-cli \
	-D "sonar.projectKey=teclado" \
	-D "sonar.sources=." \
	-D "sonar.host.url=http://host.docker.internal:9000" \
	-D "sonar.login=<TU_TOKEN_AQUI>"
```

Notas importantes:
- Sustituye `<TU_TOKEN_AQUI>` por un token válido que generes en SonarQube (My Account → Security → Generate Tokens).
- Si ves errores de reflexión (InaccessibleObjectException) al ejecutar el scanner, exporta `SONAR_SCANNER_OPTS` con `--add-opens ...` como en el comando anterior (ya incluido).
- Si el scanner indica `ANALYSIS SUCCESSFUL`, abre la URL que deja en la consola (ej. `http://host.docker.internal:9000/dashboard?id=teclado`).

sonar-project.properties
------------------------
- El archivo `sonar-project.properties` contiene configuración de proyecto. Evita incluir `sonar.login` en el repositorio. Para pruebas locales usar `sonar.host.url=http://host.docker.internal:9000` o `http://localhost:9000` según cómo ejecutes el scanner.

Jenkinsfile y CI
----------------
- El `Jenkinsfile` incluido propone un pipeline con etapas:
	- Checkout
	- SonarQube analysis (usa `sonar-scanner` y la credencial `SONAR_TOKEN` en Jenkins)
	- Build (placeholder)
	- Deploy via SSH (usa credencial `nginx-ssh` y copia archivos al servidor `20.168.193.87`)

Recomendaciones para Jenkins:
- Crear credencial `SONAR_TOKEN` (Secret text) en Jenkins con el token de Sonar.
- Crear credencial `nginx-ssh` (SSH Username with private key) para despliegue.
- Ajustar `SONAR_HOST_URL` en el `environment` del `Jenkinsfile` según dónde esté Sonar accesible desde el agente Jenkins (si Jenkins está en la misma máquina que Sonar local, usar `http://host.docker.internal:9000` o `http://localhost:9000`).
