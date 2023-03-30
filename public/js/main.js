document.addEventListener('DOMContentLoaded', () => {

    //* VARIABLES *//
    const body = document.querySelector('body');
    const divMenu = document.querySelector('#divMenu');
    const txtSearch = document.querySelector('#title');

    const urlBaseBack = 'http://localhost:3000';


    //* EVENTOS *//
    body.addEventListener('click', ({ target }) => {

        if (target.matches('i')) {
            if (target.id == 'btnMenu') {
                divMenu.classList.toggle('mostrarNav');
            } else if (target.id == 'lupa') {
                txtSearch.classList.toggle('ocultar');
            } else if (target.parentNode.classList.contains('btnFav')) {
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
                url = `${urlBaseBack}/api/favorites`;
                options = {
                    method: 'POST',
                    body: bodyJSON,
                    headers: { 'Content-Type': 'application/json' }
                };
                break;

            case 'deleteFavorite':
                url = `${urlBaseBack}/api/favorites/${data.user_id}?movie_id=${data.movie_id}`;
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

    const init = () => {
        // divMenu.classList.add('ocultar');
    }

    init();

}); //!LOAD