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
        abizenakSortu: "",
        listaTalde: [],
        ordenNombre: 'asc', // para ordenar los datos
        ordenApellidos: 'asc',
        /* IDIOMAS */
        selectedLanguage: 'es',
        // languageStrings: {},
        translations: translations,
    },
    methods: {
        // Para cargar los grupos que estan activos
        async cargaTalde() {
            try {
                const response = await fetch(window.ruta + 'taldearuta', {
                    // const response = await fetch('https://www.talde3-back.edu/Erronka2/laravel_e2t3/public/api/taldearuta', {
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
                this.listaTalde = datuak

                    .filter(talde => talde.deleted_at === null || talde.deleted_at === "0000-00-00 00:00:00");
                // console.log(datuak);
            } catch (error) {
                console.error('Errorea:', error);
            }
        },
        async cargaLangile() {
            try {
                const response = await fetch(window.ruta + 'langilearuta', {
                    // const response = await fetch('https://www.talde3-back.edu/Erronka2/laravel_e2t3/public/api/langilearuta', {
                    method: 'GET',
                    // mode: "no-cors",
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                });
                if (!response.ok) {
                    console.log('Errorea eskera eskaera egiterakoan');
                    throw new Error('Errorea eskaera egiterakoan');
                }

                const datuak = await response.json();
                // console.log(datuak);
                this.listaLangile = datuak

                    .filter(langile => langile.deleted_at === null || langile.deleted_at === "0000-00-00 00:00:00");

                this.ordenarPorNombre();
            } catch (error) {
                console.error('Errorea: ', error);
            }
        },
        async createLangile() {
            try {
                const kodea = this.kodeaSortu;
                const izena = this.izenaSortu;
                const abizenak = this.abizenakSortu;
                const arraySortu = {
                    "kodea": kodea,
                    "izena": izena,
                    "abizenak": abizenak
                };

                console.log(JSON.stringify(arraySortu));

                const response = await fetch(window.ruta + 'langileagorde', {
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
                await this.cargaLangile();
                location.reload();

            } catch (error) {
                console.log("Errorea: ", error);
            }
        },
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

        ordenarPorNombre() {
            this.ordenNombre = this.ordenNombre === 'asc' ? 'desc' : 'asc';
            this.listaLangile.sort((a, b) => {
                const compareResult = this.alphanumCompare(a.izena, b.izena);
                return this.ordenNombre === 'asc' ? compareResult : -compareResult;
            });
        },

        ordenarPorApellidos() {
            this.ordenApellidos = this.ordenApellidos === 'asc' ? 'desc' : 'asc';
            this.listaLangile.sort((a, b) => {
                const compareResult = this.alphanumCompare(a.abizenak, b.abizenak);
                return this.ordenApellidos === 'asc' ? compareResult : -compareResult;
            });
        },

        async actuLangile() {
            try {
                const id = this.arrayId[0];
                const izena = this.listaLangile.find(langile => langile.id === this.arrayId[0]).izena;
                const abizenak = this.listaLangile.find(langile => langile.id === this.arrayId[0]).abizenak;
                console.log(izena);
                console.log(abizenak);
                const arrayActu = {
                    "id": id,
                    "izena": izena,
                    "abizenak": abizenak
                }

                const response = await fetch(window.ruta + 'langileaeguneratu/' + id, {
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
                await this.cargaLangile();
                location.reload();

            } catch (error) {
                console.log('Errorea: ', error);
            }
        },
        async ezabLangile() {
            try {
                for (var i = 0; i < this.arrayId.length; i++) {
                    const response = await fetch(window.ruta + 'langileaezabatu/' + this.arrayId[i], {
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

                console.log('Ondo ezabatuta');
                await this.cargaLangile();
                location.reload();
            } catch (error) {
                console.log('Errorea: ', error);
            }
        },

        async filterTaldea(talde) {
            this.selectedTalde = talde;
            try {
                const kodea = this.selectedTalde;
                console.log(kodea);

                if (!kodea) {
                    // Si no se selecciona ningún grupo, cargar todos los trabajadores
                    this.cargaLangile();
                } else {
                    const response = await fetch(window.ruta + 'langilearuta/' + kodea, {
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
                    console.log(datuak);
                    this.listaLangile = datuak
                        .filter(langile => langile.deleted_at === null || langile.deleted_at === "0000-00-00 00:00:00");
                    console.log(datuak);
                }
            } catch (error) {
                console.error('Error:', error);
            }
        },
        changeLanguage(lang) {
            this.selectedLanguage = lang;
            console.log(this.selectedLanguage);
        },
    },
    mounted() {
        // Llama a tu función cargarPagina cuando el componente se monta
        this.cargaLangile();
        this.cargaTalde();
        this.ordenarPorNombre();
    }
});