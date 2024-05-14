new Vue({
    el: '#app',
    data: {
        selectedCheckbox: null, // Esta variable almacenará la ID del checkbox seleccionado
        arrayId: [],
        izenaSortu: "",
        etxeSortu: "",
        kanpoSortu: "",
        listaTratamendua: [],
        listaTratamenduSinFiltro: [],
        /* IDIOMAS */
        selectedLanguage: 'es',
        translations: translations,
        // Paginar
        itemsPorPagina: 10,
        paginaActual: 1,
    },
    computed: {
        // Filtrar los datos basados en el término de búsqueda (busca en los campos izena, abizena, telefonoa)
        itemsFiltradosPaginados() {
            let itemsFiltrados = this.listaTratamendua;


            // Calcular los índices de inicio y fin para la paginación
            const inicio = (this.paginaActual - 1) * this.itemsPorPagina;
            const fin = inicio + this.itemsPorPagina;

            // Paginar los datos filtrados
            return itemsFiltrados.slice(inicio, fin);
        },
        // Paginar
        cantidadPorPaginas() {
            return Math.ceil(this.listaTratamendua.length / this.itemsPorPagina)
        },
    },
    methods: {
        paginaAnterior() {
            if (this.paginaActual > 1) {
                this.paginaActual--;
            }
        },
        paginaSiguiente() {
            if (this.paginaActual < this.cantidadPorPaginas) {
                this.paginaActual++;
            }
        },
        changeLanguage(lang) {
            this.selectedLanguage = lang;
            console.log(this.selectedLanguage);
        },
        async cargaTratamendu() {
            try {
                const response = await fetch(window.ruta + 'tratamenduaruta', {
                    // const response = await fetch('https://www.talde3.edu:8081/Erronka2/laravel_e2t3/public/api/taldearuta', {
                    method: 'GET',
                    // mode: "no-cors",
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                });

                if (!response.ok) {
                    console.log('Errorea eskera egiterakoan');
                    throw new Error('Errorea eskaera egiterakoan');
                }

                const datuak = await response.json();
                console.log(datuak);
                this.listaTratamenduSinFiltro = datuak;
                this.listaTratamendua = datuak

                    .filter(tratamendu => tratamendu.deleted_at === null || tratamendu.deleted_at === "0000-00-00 00:00:00");
                console.log(datuak);

            } catch (error) {
                console.error('Errorea:', error);
            }
        },
        async createTratamendu() {
            // Si ya hay un tratamiento con el mismo nombre, confirma que se quiere añadir al actual (datos del form)
            const tratamenduExiste = this.listaTratamenduSinFiltro.find(tratamendu => tratamendu.izena === this.izenaSortu);
            if (tratamenduExiste) {
                const isConfirmed = window.confirm("Ya existe un tratamiento con el mismo nombre. ¿Estás seguro de que quieres añadir el actual?");
                if (!isConfirmed) {
                    // Si el usuario cancela, no se realiza ninguna acción (no se añade el tratamiento)
                    return;
                }
            }

            // Validar que los valores ingresados sean números con hasta dos decimales
            const regex = /^\d+(\.\d{1,2})?$/; // Expresión regular para detectar números con hasta 2 decimales
            if (!regex.test(this.etxeSortu) || !regex.test(this.kanpoSortu)) {
                alert("El formato del precio es incorrecto. Por favor, ingresa un número válido.");
                return; // Detener la función si el formato del precio es incorrecto
            }

            try {
                const izena = this.izenaSortu;
                const etxeko_prezioa = this.etxeSortu;
                const kanpoko_prezioa = this.kanpoSortu;
                const arraySortu = {
                    "izena": izena,
                    "etxeko_prezioa": etxeko_prezioa,
                    "kanpoko_prezioa": kanpoko_prezioa
                };

                console.log(JSON.stringify(arraySortu));

                const response = await fetch(window.ruta + 'tratamenduagorde', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    body: JSON.stringify(arraySortu),
                });

                if (!response.ok) {
                    console.log('Errorea sortzerakoan');
                    throw new Error('Errorea sortzerakoan');
                }

                console.log('Sortu da');
                await this.cargaTratamendu();
                location.reload();
            } catch (error) {
                console.log('Errorea: ', error);
            }
        },

        async actuTratamendu() {
            try {
                const id = this.arrayId[0];
                const izena = this.listaTratamendua.find(tratamendu => tratamendu.id === this.arrayId[0]).izena;
                const etxeko_prezioa = this.listaTratamendua.find(tratamendu => tratamendu.id === this.arrayId[0]).etxeko_prezioa;
                const kanpoko_prezioa = this.listaTratamendua.find(tratamendu => tratamendu.id === this.arrayId[0]).kanpoko_prezioa;
                // const izena = this.listaTratamendua.map(talde => talde.izena).join(', ');
                const arrayActu = {
                    "id": id,
                    "izena": izena,
                    "etxeko_prezioa": etxeko_prezioa,
                    "kanpoko_prezioa": kanpoko_prezioa
                };

                const response = await fetch(window.ruta + 'tratamenduaeguneratu/' + id, {
                    // const response = await fetch('https://www.talde3.edu:8081/Erronka2/laravel_e2t3/public/api/taldeaeguneratu/' + kodea, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    body: JSON.stringify(arrayActu),
                });

                if (!response.ok) {
                    console.log('Errorea eguneratzerakoan');
                    throw new Error('Errorea eguneratzerakoan');
                }

                console.log('Ondo eguneratuta');
                await this.cargaTratamendu();
                location.reload();
            } catch (error) {
                console.log('Errorea: ', error);
            }
        },
        async ezabTratamendu() {
            try {
                for (var i = 0; i < this.arrayId.length; i++) {
                    const response = await fetch(window.ruta + 'tratamenduaezabatu/' + this.arrayId[i], {
                        // const response = await fetch('https://www.talde3.edu:8081/Erronka2/laravel_e2t3/public/api/taldeaezabatu/' + this.arrayId[i], {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                            'Access-Control-Allow-Origin': '*'
                        },
                        body: JSON.stringify(this.arrayId[i]),
                    });
                }

                // if(!response.ok){
                //   console.log('Errorea eguneratzerakoan');
                //   throw new Error('Errorea eguneratzerakoan');
                // }

                console.log('Ondo ezabatuta');
                await this.cargaTratamendu();
                location.reload();
            } catch (error) {
                console.log('Errorea: ', error);
            }
        }
    },
    mounted() {
        // Llama a tu función cargarPagina cuando el componente se monta
        this.cargaTratamendu();
    }
});