new Vue({
    el: '#app',
    data: {
        selectedCheckbox: null, // Esta variable almacenará la ID del checkbox seleccionado
        arrayKodea: [],
        kodeaSortu: "",
        izenaSortu: "",
        listaBezero: [], // datos de hitzordua para mostrar en la tabla
        listaTaldeSinFiltro: []
    },
    methods: {
        async cargaHitzordu() {
            try {
                const response = await fetch('http://localhost/Erronka2/laravel_e2t3/public/api/hitzorduaruta', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                });
    
                if (!response.ok) {
                    throw new Error('Error al cargar los datos de hitzordua');
                }
    
                const datuak = await response.json();
                this.listaBezero = datuak;
            } catch (error) {
                console.error('Error al cargar los datos:', error);
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
        this.cargaHitzordu();
    }
});