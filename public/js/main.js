document.addEventListener('DOMContentLoaded', () => {

    //* VARIABLES *//
    const body = document.querySelector('body');


    //* EVENTOS *//
    body.addEventListener('click', ({ target }) => {

        if (target.matches('i')) {
            if (target.parentNode.classList.contains('btnFav')) { //! aquí iría el atributo "id" del botón, que en el .ejs sería algo similar a: <%= item.id_movie %>
                const user_id = target.parentNode.dataset.user_id;
                const movie_id = target.parentNode.dataset.movie_id;
                const api_movie = movie_id.includes('tt') ? 'imdb' : 'mongodb';

                const data = { user_id, movie_id, api_movie };
                
                if (target.parentNode.classList.contains('favorita')) {
                    fetchData('deleteFavorite', data);
                } else {
                    fetchData('addFavorite', data);
                };
                target.parentNode.classList.toggle('favorita')

            };
        }

    }); //!EV-CLICK


    //* FUNCIONES *//
    const fetchData = async (tipo, data) => {

        const bodyJSON = JSON.stringify(data);

        switch (tipo) {

            case 'addFavorite':
                url = 'http://localhost:3000/api/favorites';
                options = {
                    method: 'POST',
                    body: bodyJSON,
                    headers: { 'Content-Type': 'application/json' }
                };
                break;

            case 'deleteFavorite':
                url = `http://localhost:3000/api/favorites/${data.user_id}?movie_id=${data.movie_id}`;
                options = { method: 'DELETE' };
                break;

        }; //SWITCH

        try {

            const request = await fetch(url, options);

            const response = await request.json();

            if (!response) return {
                ok: false,
                msg: 'ERROR: fetchData',
                response
            };

            return {
                ok: true,
                data: response
            };

        } catch (error) {

            console.log('Error:', error)
            return {
                ok: false,
                error
            };

        }; //TRY-CATCH

    }; //!FUNC-FETCHDATA

}); //!LOAD