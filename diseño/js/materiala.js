new Vue({
    el: '#app',
    data: {
        selectedTalde: "",
        selectedCheckbox: null, // Esta variable almacenará la ID del checkbox seleccionado
        listaLangile: [],
        arrayId: [],
        arrayKodea: [],
        kodeaSortu: "",
        izenaSortu: "",
        etiketaSortu: "",
        listaMateriala: [],
        ordenEtiketa: 'asc', // para ordenar los datos de la tabla
        ordenIzena: 'asc',
        /* IDIOMAS */
        selectedLanguage: 'es',
        // languageStrings: {},
        translations: translations,
        // Paginar
        itemsPorPagina: 10,
        paginaActual: 1,
    },
    computed: {
        // Filtrar los datos basados en el término de búsqueda (busca en los campos izena, abizena, telefonoa)
        itemsFiltradosPaginados() {
            let itemsFiltrados = this.listaMateriala;


            // Calcular los índices de inicio y fin para la paginación
            const inicio = (this.paginaActual - 1) * this.itemsPorPagina;
            const fin = inicio + this.itemsPorPagina;

            // Paginar los datos filtrados
            return itemsFiltrados.slice(inicio, fin);
        },
        // Paginar
        cantidadPorPaginas() {
            return Math.ceil(this.listaMateriala.length / this.itemsPorPagina)
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
        // Para cargar los grupos que estan activos
        async cargaMateriala() {
            try {
                const response = await fetch(window.ruta + 'materialaruta', {
                    // const response = await fetch('https://www.materiala3-back.edu/Erronka2/laravel_e2t3/public/api/materialaaruta', {
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
                // console.log(datuak);
                this.listaMateriala = datuak
                    .filter(materiala => materiala.deleted_at === null || materiala.deleted_at === "0000-00-00 00:00:00");
                console.log(datuak);
                this.ordenarPorEtiqueta();
            } catch (error) {
                console.error('Errorea:', error);
            }
        },

        async createMateriala() {
            try {
                // const id = this.kodeaSortu;
                const etiketa = this.etiketaSortu;
                const izena = this.izenaSortu;
                const arraySortu = {
                    "etiketa": etiketa,
                    "izena": izena
                };

                console.log(JSON.stringify(arraySortu));

                const response = await fetch(window.ruta + 'materialagorde', {
                    // const response = await fetch('https://www.talde3-back.edu/Erronka2/laravel_e2t3/public/api/langileagorde', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json', // Indicar el tipo de contenido como JSON
                        'Access-Control-Allow-Origin': '*'
                    },
                    body: JSON.stringify(arraySortu), // Convertir el objeto JSON a una cadena JSON
                });

                if (!response.ok) {
                    console.log('Errorea sortzerakoan');
                    throw new Error('Errorea sortzerakoan');
                }

                console.log('Sortu da');
                await this.cargaMateriala();
                location.reload();

            } catch (error) {
                console.log("Errorea: ", error);
            }
        },

        // TODO:ordenar tabla por columnas
        /*ordenarColumna(){
            for (let i = 0; i < th.length; i++) {
                const element = th[i];
                
            }
        }*/
        // Función de comparación alfanumérica
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

        ordenarPorEtiqueta() {
            this.ordenEtiqueta = this.ordenEtiqueta === 'asc' ? 'desc' : 'asc';
            this.listaMateriala.sort((a, b) => {
                return this.ordenEtiqueta === 'asc' ?
                    this.alphanumCompare(a.etiketa, b.etiketa) :
                    this.alphanumCompare(b.etiketa, a.etiketa);
            });
        },

        // Función para ordenar por nombre
        ordenarPorNombre() {
            this.ordenNombre = this.ordenNombre === 'asc' ? 'desc' : 'asc';
            this.listaMateriala.sort((a, b) => {
                return this.ordenNombre === 'asc' ?
                    this.alphanumCompare(a.izena, b.izena) :
                    this.alphanumCompare(b.izena, a.izena);
            });
        },
        // TODO: actuMateriala
        async actuMateriala() {
            try {
                const id = this.arrayId[0];
                const etiketa = this.listaMateriala.find(materiala => materiala.id === this.arrayId[0]).etiketa;
                const izena = this.listaMateriala.find(materiala => materiala.id === this.arrayId[0]).izena;
                console.log(id);
                console.log(etiketa);
                console.log(izena);

                const arrayActu = {
                    "id": id,
                    "etiketa": etiketa,
                    "izena": izena
                }

                const response = await fetch(window.ruta + 'materialaeguneratu/' + id, {
                    // const response = await fetch('https://www.talde3-back.edu/Erronka2/laravel_e2t3/public/api/langileaeguneratu/' + id, {
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
                await this.cargaMateriala();
                location.reload();

            } catch (error) {
                console.log('Errorea: ', error);
            }
        },
        async ezabMateriala() {
            try {
                for (var i = 0; i < this.arrayId.length; i++) {
                    const response = await fetch(window.ruta + 'materialaezabatu/' + this.arrayId[i], {
                        // const response = await fetch('https://www.talde3.edu:8081/Erronka2/laravel_e2t3/public/api/materialaaezabatu/' + this.arrayKodea[i], {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                            'Access-Control-Allow-Origin': '*'
                        },
                        body: JSON.stringify(this.arrayId[i]),
                    });
                }


                // if (!response.ok) {
                //     console.log('Errorea eguneratzerakoan');
                //     throw new Error('Errorea eguneratzerakoan');
                // }

                console.log('Ondo ezabatuta');
                await this.cargaMateriala();
                location.reload();
            } catch (error) {
                console.log('Errorea: ', error);
            }
        },
        changeLanguage(lang) {
            this.selectedLanguage = lang;
            console.log(this.selectedLanguage);
        },
    },
    mounted() {
        // Llama a tu función cargarPagina cuando el componente se monta
        this.cargaMateriala();
    }
});