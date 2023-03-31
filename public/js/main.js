document.addEventListener('DOMContentLoaded', () => {

    //* VARIABLES *//
    const body = document.querySelector('body');
    const divMenu = document.querySelector('#divMenu');
    const txtSearch = document.querySelector('#title');
    const spnFO = document.querySelector('#spnFO');
    const divOpinions = document.querySelector('#divOpinions');
    const spnLoader = document.querySelector('.loader');

    const urlBaseBack = 'http://localhost:3000';
    // 'https://imdb-czpn.onrender.com';


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
                target.parentNode.classList.toggle('favorita');
            };
        }

    }); //!EV-CLICK


    //* FUNCIONES *//
    const fetchData = async (tipo, data) => {
        let options = {};
        let url;
        const bodyJSON = JSON.stringify(data);

        switch (tipo) {
            case 'getOpinionsRT':
                url = `${urlBaseBack}/api/scrapping/rt/?title=${data.title}&year=${data.year}`;
                break;

            case 'getOpinionsSC':
                url = `${urlBaseBack}/api/scrapping/sc/?title=${data.title}&year=${data.year}`;
                break;

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
            // console.log('url', url, 'options', options)
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

    const paintOpinions = (opinions, titulo) => {
        const fragment = document.createDocumentFragment();
        let cont = 0;
        console.log(titulo, opinions)
        const h3Titulo = document.createElement('H3');
        h3Titulo.textContent = titulo;
        fragment.append(h3Titulo);

        if (opinions) {
            opinions.forEach(op => {
                cont++;
                const aEscritor = document.createElement('A');
                aEscritor.classList.add('opA');
                aEscritor.href = op.url;
                aEscritor.textContent = op.escritor;
                aEscritor.target = "_blank";

                const pFecha = document.createElement('P');
                pFecha.classList.add('opFecha');
                pFecha.textContent = op.fecha;

                const pOpinion = document.createElement('P');
                pOpinion.classList.add('opOpinion');
                pOpinion.textContent = op.opinion;

                fragment.append(pOpinion, pFecha, aEscritor);
            });
        }
        if (cont == 0 || !opinions) {
            const pNoOpinion = document.createElement('P');
            pNoOpinion.textContent = 'No hay opiniones.';
            fragment.append(pNoOpinion);
        }

        divOpinions.append(fragment);
    }

    const getOpinions = async () => {
        if (spnFO.textContent == 'buscar') {
            let opinions;
            if (spnFO.dataset.movie_id.includes('tt')) {

                opinions = await fetchData('getOpinionsSC', {
                    title: spnFO.dataset.movie_title.replace('_', '%20'),
                    year: spnFO.dataset.movie_year
                })
                paintOpinions(opinions.data.data, 'SensaCine:');

                opinions = await fetchData('getOpinionsRT', {
                    title: spnFO.dataset.movie_title.replace('_', '%20'),
                    year: spnFO.dataset.movie_year
                })
                paintOpinions(opinions.data.data, 'RottenTomatoes:');

                spnLoader.classList.remove('loader');
            }
        }
    }

    const init = () => {
        if (spnFO) getOpinions();
    }

    init();

}); //!LOAD