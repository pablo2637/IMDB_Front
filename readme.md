# MOVIE APP

***

## Endpoints

| Endpoints                                     | Descripción                                              |
|-----------------------------------------------|----------------------------------------------------------|
| "/"                                           | Index                                                    |
|                                               |                                                          |
| "/dashboard"                                  | Pantalla principal del usuario                           |
| "/dashboard-usuario/userSearch/search"        | Página del buscador                                      |
| "/dashboard-usuario/userSearch/searchMovies"  | Muestra resultado de la búsqueda                         |
| "/dashboard-usuario/userSearch/showMovie/:id" | Muestra detalle de una película (desde buscar/favoritas) |
| "/dashboard-usuario/favoritas/:id"            | Muestra las películas guardas en favoritas               |
|                                               |                                                          |
| "/dashboard-admin"                            | Muestra todas las películas creadas en MongoDB           |
| "/dashboard-admin/nueva"                      | Muestra formulario crear nueva película                  |
| "/dashboard-admin/editar/:id"                 | Muestra formulario editar película                       |

***

## Inicializar app:

1) Arrancar con los repositorios (back y front):
* **npm run dev**

2) Acceder desde el navegador a la ruta:
* **localhost:3005/**