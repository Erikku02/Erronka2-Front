new Vue({
    el: '#app',
    data: {
        selectedCheckbox: null, // Esta variable almacenará la ID del checkbox seleccionado
        arrayKodea: [],
        kodeaSortu: "",
        izenaSortu: "",
        listaBezero: [], // datos de hitzordua para mostrar en la tabla
        listaTaldeSinFiltro: [],
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
            let itemsFiltrados = this.listaBezero;


            // Calcular los índices de inicio y fin para la paginación
            const inicio = (this.paginaActual - 1) * this.itemsPorPagina;
            const fin = inicio + this.itemsPorPagina;

            // Paginar los datos filtrados
            return itemsFiltrados.slice(inicio, fin);
        },
        // Paginar
        cantidadPorPaginas() {
            return Math.ceil(this.listaBezero.length / this.itemsPorPagina)
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
        async cargaHItzordu() {
            try {
                const response = await fetch('http://localhost/Erronka2/laravel_e2t3/public/api/hitzorduaruta', {
                    // const response = await fetch('https://www.talde3.edu:8081/Erronka2/laravel_e2t3/public/api/hitzorduaruta', {
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
                // console.log(this.fecha);
                this.listaBezero = datuak;
                console.log(this.listaBezero);


            } catch (error) {
                console.error('Errorea:', error);
            }
        },

        // Para ordenar los datos de la tabla
        alphanumCompare(a, b) {
            const chunkRegExp = /(\D+|\d+)/g;

            // Función auxiliar para comparar partes alfanuméricas
            const compareChunks = (chunkA, chunkB) => {
                const isDigitA = !isNaN(chunkA);
                const isDigitB = !isNaN(chunkB);

                if (isDigitA && isDigitB) {
                    return parseInt(chunkA, 10) - parseInt(chunkB, 10);
                } else {
                    return chunkA.localeCompare(chunkB);
                }
            };

            const chunksA = String(a).match(chunkRegExp);
            const chunksB = String(b).match(chunkRegExp);

            const minLength = Math.min(chunksA.length, chunksB.length);

            for (let i = 0; i < minLength; i++) {
                const result = compareChunks(chunksA[i], chunksB[i]);
                if (result !== 0) {
                    return result;
                }
            }

            return chunksA.length - chunksB.length;
        },
        ordenarPorKodea() {
            this.ordenKodea = this.ordenKodea === 'asc' ? 'desc' : 'asc'; // no hace falta
            this.listaTalde.sort((a, b) => {
                return this.ordenKodea === 'asc' ?
                    this.alphanumCompare(a.kodea, b.kodea) :
                    this.alphanumCompare(b.kodea, a.kodea);
            });
        }

    },
    mounted() {
        // Llama a tu función cargarPagina cuando el componente se monta
        this.cargaHItzordu();
    }
});