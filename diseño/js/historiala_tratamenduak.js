new Vue({
    el: '#app',
    data: {
        listaLangileTratamenduOriginal: [], // Variable para almacenar la copia original
        listaLangileTratamendu: [],
        listaOrdutegia: [],
        listaTratamendu: [],
        selectedTratamiento: '', // Nuevo dato para almacenar el tratamiento seleccionado
        tratamientosDisponibles: [], // Lista de tratamientos disponibles
        /* IDIOMAS */
        selectedLanguage: 'es',
        // languageStrings: {},
        translations: translations, // Paginar
        itemsPorPagina: 10,
        paginaActual: 1,
    },
    computed: {
        // Filtrar los datos basados en el término de búsqueda (busca en los campos izena, abizena, telefonoa)
        itemsFiltradosPaginados() {
            let itemsFiltrados = this.listaLangileTratamendu;


            // Calcular los índices de inicio y fin para la paginación
            const inicio = (this.paginaActual - 1) * this.itemsPorPagina;
            const fin = inicio + this.itemsPorPagina;

            // Paginar los datos filtrados
            return itemsFiltrados.slice(inicio, fin);
        },
        // Paginar
        cantidadPorPaginas() {
            return Math.ceil(this.listaLangileTratamendu.length / this.itemsPorPagina)
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
        async cargaHorariosPorGrupo() {
            const fechaActual = new Date();
            const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
            const numeroDiaSemana = fechaActual.getDay();

            console.log(numeroDiaSemana);
            try {
                const response = await fetch(window.ruta + 'ordutegiaruta', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                });

                if (!response.ok) {
                    console.log('Error al solicitar trabajadores por grupo');
                    throw new Error('Error al realizar la solicitud');
                }

                const datuak = await response.json();
                this.listaOrdutegia = datuak;
                this.grupoPorDia = this.listaOrdutegia.find(ordutegia => ordutegia.eguna === numeroDiaSemana && ordutegia.deleted_at === null).kodea
                this.tratamenduByLangile();

            } catch (error) {
                console.error('Error:', error);
            }
        },
        async cargaTratamendu() {
            try {
                const response = await fetch(window.ruta + 'tratamenduaruta', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    method: "GET"
                });
                if (!response.ok) {
                    throw new Error('Errorea eskaera egiterakoan');
                }
                const datuak = await response.json();
                this.listaTratamendu = datuak;
            } catch (error) {
                console.log("Errorea: " + error);
            }
            console.log(this.listaTratamendu)
        },
        filtrarPorTratamiento() {
            if (this.selectedTratamiento === 'todos') {
                this.paginaActual = 1;
                this.listaLangileTratamendu = [...this.listaLangileTratamenduOriginal]; // Restaura la lista original
            } else {
                this.paginaActual = 1;
                this.listaLangileTratamendu = this.listaLangileTratamenduOriginal.filter(registro => registro.tratamendua === this.selectedTratamiento.izena);
        
                // Ordenar por cantidad en orden descendente
                this.listaLangileTratamendu.sort((a, b) => b.kantitatea - a.kantitatea);
            }
        },
        
        
        async tratamenduByLangile() {
            try {
                const response = await fetch(window.ruta + 'tratamenduastats/' + this.grupoPorDia, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    method: "GET"
                });
                if (!response.ok) {
                    throw new Error('Errorea eskaera egiterakoan');
                }
                const datuak = await response.json();
                this.listaLangileTratamendu = datuak;
                this.listaLangileTratamenduOriginal = [...datuak]; // Guarda una copia original
                console.log(this.listaLangileTratamendu);
            } catch (error) {
                console.log("Errorea: " + error);
            }
        },
        changeLanguage(lang) {
            this.selectedLanguage = lang;
            console.log(this.selectedLanguage);
        },
    },
    mounted() {
        this.cargaHorariosPorGrupo();
        this.cargaTratamendu();
        this.tratamenduByLangile();


    }
});