# Git, pruebas y entrega del equipo

## 1. Acceso e identidad

El repositorio público permite clonar, pero no concede escritura. Paola y Mariano pedirán a Santiago acceso con sus usuarios GitHub y aceptarán la invitación, o harán un fork y PR desde sus cuentas. No se han enviado invitaciones sin conocer esos usuarios.

En cada clon, antes de confirmar trabajo:

```powershell
git config user.name
git config user.email
git remote -v
```

Si hace falta, cada persona configura sus datos reales solo en este repositorio:

```powershell
git config user.name "Tu nombre completo"
git config user.email "Tu correo verificado o noreply real de GitHub"
```

No copiar la identidad de Santiago. La atribución del commit depende del correo de autor; el push no sustituye el trabajo individual. La importación del backend PA2 y las guías es preparación, no una contribución React de los tres.

## 2. Ramas y secuencia

| Integrante | Rama |
|---|---|
| Santiago | santiago-base-react |
| Paola | paola-formulario-rutas |
| Mariano | mariano-favoritos-redux |

Santiago entrega primero. Paola y Mariano esperan que su PR esté Merged, actualizan main y crean sus propias ramas. Después pueden trabajar en paralelo porque tienen archivos distintos. Si Git avisa cambios locales pendientes, no uses reset --hard ni borres archivos para cambiar de rama.

Si trabajas desde fork, origin apunta a tu copia. Añade upstream solo la primera vez:

```powershell
git remote add upstream https://github.com/sanprca-dev/PA3-PROGRAMACION-WEB-II.git
git fetch upstream
git switch main
git merge --ff-only upstream/main
```

Luego crea tu rama y haz push a origin. En el PR, el repositorio de destino será sanprca-dev/PA3-PROGRAMACION-WEB-II y la rama base main.

## 3. Commit y pull request paso a paso

1. Ejecuta tus pruebas y npm.cmd run build dentro de frontend.
2. Desde la raíz, revisa git status y git diff. Añade con git add solo tus archivos y evidencias.
3. Revisa git diff --cached. Excluye node_modules, dist, .env y archivos personales. Sal del visor con q.
4. Confirma con un mensaje concreto. No es necesario hacer un número fijo de commits; cada uno debe representar un avance real.
5. Haz git push -u origin seguido del nombre de tu rama.
6. Abre GitHub → repositorio PA3 → Pull requests → New pull request.
7. Base: main. Compare: tu rama. En fork usa compare across forks y selecciona tu cuenta.
8. Revisa la comparación y pulsa Create pull request.
9. Escribe un título concreto y una descripción: qué implementaste, qué pruebas ejecutaste, dónde están las capturas y qué queda fuera de tu etapa.
10. En el PR, revisa Files changed y Commits. Cada autor debe aparecer correctamente. Un compañero puede revisar antes de integrar.
11. Cuando no haya conflictos ni requisitos pendientes, en Conversation elige Create a merge commit → Merge pull request → Confirm merge. Así se conservan los commits originales. No inventar autores ni subir trabajo ajeno atribuyéndoselo a otro.
12. Comprueba Merged. Después, con árbol limpio: git switch main y git pull --ff-only origin main. En fork actualiza desde upstream.

Si falta corregir algo, haz otro commit en la misma rama y git push: el PR se actualiza. No abrir otro PR para cada corrección. Si main avanzó y hay conflicto, revisen los archivos afectados; no aceptar automáticamente todo un lado. No forzar el push.

Pueden conservar las ramas durante la evaluación. Los PR integrados siguen accesibles en Pull requests → Closed aunque después se borren las ramas. En README enlacen los PR reales para facilitar al profesor la revisión.

## 4. Prueba conjunta obligatoria antes de grabar

Usar la rama main con los tres aportes integrados. Instalar con npm ci dentro de frontend y ejecutar npm run dev. Nadie necesita iniciar backend ni MongoDB.

| Paso | Comprobación | Responsable de demostrar |
|---|---|---|
| 1 | Inicio y listado muestran los dos datos ficticios; búsqueda funciona | Santiago |
| 2 | Cambiar entre vistas no recarga el documento | Paola |
| 3 | Formulario inválido muestra error y no altera total | Paola |
| 4 | Crear válido lleva al detalle; lista y total reflejan el alta | Paola y Santiago |
| 5 | Cambiar estado actualiza listado y resumen de pendientes | Paola y Santiago |
| 6 | Favorito seleccionado cambia lista y contador del menú | Mariano |
| 7 | Navegar conserva solicitudes y favoritos | Todos |
| 8 | Vaciar favoritos muestra cero y estado vacío | Mariano |
| 9 | Ruta inexistente e id inexistente tienen mensaje y retorno | Paola |
| 10 | F5 reinicia ambos estados a su valor inicial, como se documenta | Todos |
| 11 | npm run build sin errores y consola sin errores de ejecución | Todos |

Ejecutar esta secuencia sobre main integrado; no asumir que dos ramas compiladas por separado garantizan que funcionan juntas. Cada captura debe permitir reconocer pantalla y resultado. La asistencia/seguimiento del curso se acredita con evidencia real, no se inventa a partir de commits.

## 5. README y video final

Actualizar README: funciones implementadas, integrantes y PR, comandos comprobados, capturas por persona, comparación Context/Redux, conclusiones y enlace de video. Mantener el nombre completo de todos. No marcarlo terminado si quedan pantallas provisionales.

Video sugerido de 9–11 minutos, todos con cámara:

- Santiago: problema, base React, componentes/props, useState/useEffect y Context (3–3.5 minutos).
- Paola: Router, formulario, validación, parámetros y actualización reflejada entre vistas (3–3.5 minutos).
- Mariano: Redux, selección/contador y comparación basada en el código (3–3.5 minutos).

Mostrar archivos y una prueba por persona. No leer el código completo ni usar el video de PA2. Antes de entregar, abrir el enlace de YouTube para comprobar acceso público.

Referencia: [correo de autor en GitHub](https://docs.github.com/en/account-and-profile/how-tos/email-preferences/setting-your-commit-email-address), [crear un PR](https://docs.github.com/en/pull-requests/how-tos/create-pull-requests/creating-a-pull-request).
