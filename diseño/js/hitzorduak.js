new Vue({
    el: '#app',
    data: {
        selectedCheckbox: null, // Esta variable almacenará la ID del checkbox seleccionado
        arrayId: [],
        izenaEgu: "",
        kategoriaEgu: "",
        izenaSortu: "",
        deskribSortu: "",
        kategoriaSortu: "",
        markaSortu: "",
        stockSortu: "",
        stock_alertaSortu: "",
        listaHitzordu: [],
        listaKategoria: [],
        ordenNombre: 'asc', // Para ordenar los datos de la tabla
        ordenKategoria: 'asc'
    },
    methods: {
        async cargaHitzordu() {
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
                this.listaHitzordu = datuak
                // FALTA AÑADIR EL FIlTER !!!!!!!
                .filter(produktu => produktu.deleted_at === null || produktu.deleted_at === "0000-00-00 00:00:00");
                // console.log(datuak);
                // this.ordenarPorNombre();

            } catch (error) {
                console.error('Errorea:', error);
            }
        },

        /* async createProduktu() {
            try {
                const izena = this.izenaSortu;
                const deskribapena = this.deskribSortu;
                const id_kategoria = this.kategoriaSortu;
                const marka = this.markaSortu;
                const stock = this.stockSortu;
                const stock_alerta = this.stock_alertaSortu;
                const arraySortu = {
                    "izena": izena,
                    "deskribapena": deskribapena,
                    "id_kategoria": id_kategoria,
                    "marka": marka,
                    "stock": stock,
                    "stock_alerta": stock_alerta
                };

                console.log(JSON.stringify(arraySortu));

                const response = await fetch('http://localhost/Erronka2/laravel_e2t3/public/api/produktuagorde', {
                    // const response = await fetch('https://www.talde3.edu:8081/Erronka2/laravel_e2t3/public/api/taldeagorde', {
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

                alert('Sortu da');
                await this.cargaHitzordu();
                location.reload();
            } catch (error) {
                console.log('Errorea: ', error);
            }
        }, */
        /* async actuProduktu() {
            try {
                const id = this.arrayId[0];
                const izena = this.listaHitzordu.find(talde => talde.id === this.arrayId[0]).izena;
                const deskribapena = this.listaHitzordu.find(talde => talde.id === this.arrayId[0]).deskribapena;
                const id_kategoria = this.kategoriaEgu;
                const marka = this.listaHitzordu.find(talde => talde.id === this.arrayId[0]).marka;
                const stock = this.listaHitzordu.find(talde => talde.id === this.arrayId[0]).stock;
                const stock_alerta = this.listaHitzordu.find(talde => talde.id === this.arrayId[0]).stock_alerta;
                const arrayActu = {
                    "id": id,
                    "izena": izena,
                    "deskribapena": deskribapena,
                    "id_kategoria": id_kategoria,
                    "marka": marka,
                    "stock": stock,
                    "stock_alerta": stock_alerta
                };

                console.log(arrayActu);
                const response = await fetch('http://localhost/Erronka2/laravel_e2t3/public/api/produktuaeguneratu/' + id, {
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

                alert('Ondo eguneratuta');
                await this.cargaHitzordu();
                location.reload();
            } catch (error) {
                console.log('Errorea: ', error);
            }
        }, */
        /* async ezabProduktu() {
            try {
                for (var i = 0; i < this.arrayId.length; i++) {
                    const response = await fetch('http://localhost/Erronka2/laravel_e2t3/public/api/produktuaezabatu/' + this.arrayId[i], {
                        // const response = await fetch('https://www.talde3.edu:8081/Erronka2/laravel_e2t3/public/api/taldeaezabatu/' + this.arrayKodea[i], {
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

                alert('Ondo ezabatuta');
                await this.cargaHitzordu();
                location.reload();
            } catch (error) {
                console.log('Errorea: ', error);
            }
        }, */
        /* async cargaKategoria() {
            try {
                const response = await fetch('http://localhost/Erronka2/laravel_e2t3/public/api/kategoriaruta', {
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
                this.listaKategoria = datuak

                    .filter(kategoria => kategoria.deleted_at === null || kategoria.deleted_at === "0000-00-00 00:00:00");
                console.log(this.listaKategoria);

            } catch (error) {
                console.error('Errorea:', error);
            }
        }, */

        // Para ordenar los datos de la tabla
        /* alphanumCompare(a, b) {
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
        }, */
        /* ordenarPorNombre() {
            this.ordenNombre = this.ordenNombre === 'asc' ? 'desc' : 'asc';
            this.listaHitzordu.sort((a, b) => {
                return this.ordenNombre === 'asc' ?
                    this.alphanumCompare(a.izena, b.izena) :
                    this.alphanumCompare(b.izena, a.izena);
            });
        }, */

        /* ordenarPorCategoria() {
            this.ordenKategoria = this.ordenKategoria === 'asc' ? 'desc' : 'asc';
            this.listaHitzordu.sort((a, b) => {
                return this.ordenKategoria === 'asc' ?
                    this.alphanumCompare(a.id_kategoria, b.id_kategoria) :
                    this.alphanumCompare(b.id_kategoria, a.id_kategoria);
            });
        }, */

        /* ordenarPorMarka() {
            this.ordenMarka = this.ordenMarka === 'asc' ? 'desc' : 'asc';
            this.listaHitzordu.sort((a, b) => {
                return this.ordenMarka === 'asc' ?
                    this.alphanumCompare(a.marka, b.marka) :
                    this.alphanumCompare(b.marka, a.marka);
            });
        }, */
        // TODO:ordenarPorStock
        /* ordenarPorStock() {
            this.ordenStock = this.ordenStock === 'asc' ? 'desc' : 'asc';
            this.listaHitzordu.sort((a, b) => {
                return this.ordenStock === 'asc' ?
                    this.alphanumCompare(a.stock, b.stock) :
                    this.alphanumCompare(b.stock, a.stock);
            });
        }, */
        // TODO: ordenarPorStockDeSeguridad
        /* ordenarPorStockAlerta() {
            this.ordenStockAlerta = this.ordenStockAlerta === 'asc' ? 'desc' : 'asc';
            this.listaHitzordu.sort((a, b) => {
                return this.ordenStockAlerta === 'asc' ?
                    this.alphanumCompare(a.stock_alerta, b.stock_alerta) :
                    this.alphanumCompare(b.stock_alerta, a.stock_alerta);
            });
        }, */
    },
    mounted() {
        // Llama a tu función cargarPagina cuando el componente se monta
        this.cargaHitzordu();
        // this.cargaKategoria();
        // this.ordenarPorNombre();
        // this.ordenKategoria();
    }
});