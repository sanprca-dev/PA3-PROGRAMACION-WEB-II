# PA3 - Plataforma de Gestión de Solicitudes Académicas

**Curso:** Programación Web II · Código 30690 · NRC 4060
**Repositorio:** [PA3-PROGRAMACION-WEB-II](https://github.com/sanprca-dev/PA3-PROGRAMACION-WEB-II)

## Descripción y objetivo

Construir una SPA en React para consultar, registrar y organizar solicitudes académicas mediante componentes, Hooks, React Router, Context API y una introducción a Redux. La información se simulará localmente, según el corte curricular del examen.

## Estado de preparación

Este repositorio contiene el backend heredado de PA2 y las guías de implementación de PA3. El frontend React todavía debe ser desarrollado por los integrantes. No se presenta esta preparación como una aplicación PA3 terminada.

Se conserva `backend/` de [PA2, commit 4e8d3b2](https://github.com/sanprca-dev/PA2-PROGRAMACION-WEB-II/tree/4e8d3b25cc6d68eb4768a00edd2ffd2fa5340bbd), sin modificar su código. No se necesita ejecutar ese backend para esta evaluación. El frontend Angular, las capturas y el video de PA2 permanecen en su repositorio original y no se reutilizan como evidencias nuevas.

## Integrantes y participación prevista

| Integrante | Rol | Entrega | Estado |
|---|---|---|---|
| Santiago Prado Carrasco | Desarrollador | Base React/Vite, listado, búsqueda, useEffect y Context compartido | Implementado |
| Paola Gutiérrez Afata | Desarrolladora | Formulario, detalle, actualización de estado y navegación completa | Pendiente de implementar |
| Mariano Valderrama Shuña | Desarrollador | Favoritos con Redux, contador compartido y comparación con Context | Pendiente de implementar |

Los enlaces a PR y capturas se añadirán después de los aportes reales. La explicación detallada del código se realizará en el video; cada integrante prepara sus pruebas y conoce el flujo completo.

## Desarrollo y solución propuesta

- Santiago crea `frontend/` siguiendo la estructura React/Vite vista en clase.
- Context mantiene las solicitudes y expone acciones de creación/cambio de estado.
- React Router organiza Inicio, Solicitudes, Nueva solicitud, Detalle y Favoritos.
- Paola implementa las vistas de formulario y detalle consumiendo el mismo Context.
- Mariano utiliza Redux Toolkit para una necesidad pequeña: marcar/desmarcar solicitudes favoritas y mostrar el total en el menú.
- Redux almacena solo ids favoritos; Context conserva los documentos. No se duplica la lista en dos almacenes.
- Los datos se mantienen al navegar; al recargar se reinician. No se ofrece persistencia MongoDB, autenticación o consumo de APIs desde React en esta etapa.

## Cómo comenzar y ejecutar

1. Santiago sigue [su guía inicial](docs/02-SANTIAGO-PASO-A-PASO.md) e integra una base funcional.
2. Paola y Mariano actualizan main y continúan con [la guía de Paola](docs/03-PAOLA-PASO-A-PASO.md) y [la guía de Mariano](docs/04-MARIANO-PASO-A-PASO.md).
3. Todos respetan el [contrato de componentes y estado](docs/05-CONTRATO-DEL-EQUIPO.md) y el [flujo de Git, pruebas y video](docs/06-GIT-PR-Y-ENTREGA.md).

Entorno previsto: Node 24, React 19.2.0, Vite 7.3.1, React Router 7. Redux Toolkit 2 y React Redux 9 se instalarán en la etapa de Mariano. Cada instalación quedará registrada en package-lock.json.

**Una vez integrada la primera etapa de Santiago**, desde la raíz del repositorio:

```powershell
cd frontend
npm.cmd ci
npm.cmd run dev
```

Abrir la URL que muestre Vite. Para compilar: `npm.cmd run build`. Estos comandos no pueden ejecutarse en la base inicial hasta que exista frontend/package.json. No es necesario iniciar MongoDB ni instalar el backend de referencia.

## Evidencias y pruebas

Se incorporarán capturas nuevas en evidencias/santiago, evidencias/paola y evidencias/mariano. La lista de comprobaciones está en el documento 06. No hay pruebas de ejecución de los alumnos acreditadas por esta base inicial.

## Conclusiones

Pendientes de la implementación y las pruebas conjuntas. El equipo deberá explicar qué datos se comparten con Context, qué flujo se resolvió con Redux y cómo cambia la interfaz al navegar y actualizar estado.

## Video de exposición

**Video público de YouTube:** [PEGAR AQUÍ EL ENLACE]

Participan los tres integrantes con cámara encendida. Duración sugerida por el examen: 8 a 12 minutos.

## Referencias del curso

El reparto y las decisiones basadas en el examen y las cuatro clases están en [requisitos y reparto](docs/01-REQUISITOS-Y-REPARTO.md). Las transcripciones y el examen no se publican en este repositorio.

**Última actualización:** 01/11/2026
