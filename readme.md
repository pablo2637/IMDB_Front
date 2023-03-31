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

***

## APIs

### NoSQL: MongoDB

Base de datos para las películas creadas por el admin.
- **Base de datos:** *IMDB*
    - **Colección:** *movies*
        - **Documentos:**
            - *title:* título de la película.
            - *image:* url de la imagen de la película guardada en la carpeta public/images del repositorio del front.
            - *year:* año de estreno.
            - *directors:* director de la película.
            - *stars:* actores principales.
            - *genres:* género(s) de la película.
            - *runtimeStr:* duración en minutos.
            - *plot:* trama de la película.
            - *imdbRating:* valoración.
            - *opinions:*
                - *escritor:* autor de la crítica.
                - *fecha:* fecha de publicación.
                - *opinión:* crítica de la película.

### SQL: PostgreSQL

Base de datos donde almacenamos en tablas la siguiente información:
- *users:* usuarios registrados en la app.
    - *user_id (PK).*
    - *auth0_id.*
    - *name.*
    - *e-mail.*
- *favorites:* películas favoritas guardadas por los usuarios.
    - *favorite_id (PK).*
    - *user_id (FK).*
    - *movie_id (FK).*
    - *api_movie:* imdb o mongodb.
- *rols*: diferenciar roles en la app.
    - *rol_id (PK).*
    - *rol.*
    - *user_id (FK).*
- *logs:* histórico de logins de los usuarios.
    - *log_id (PK).*
    - *date.*
    - *event:* register, login, logout.
    - *user_id (FK).*