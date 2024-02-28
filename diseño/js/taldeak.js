new Vue({
    el: '#app',
    data: {
        selectedCheckbox: null, // Esta variable almacenará la ID del checkbox seleccionado
        arrayKodea: [],
        kodeaSortu: "",
        izenaSortu: "",
        listaTalde: [],
        listaTaldeSinFiltro: [],
        /* IDIOMAS */
        selectedLanguage: 'es',
        // languageStrings: {},
        translations: translations,
    },
    methods: {
        async cargaTalde() {
            try {
                const response = await fetch(window.ruta + 'taldearuta', {
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
                this.listaTaldeSinFiltro = datuak;
                this.listaTalde = datuak

                    .filter(talde => talde.deleted_at === null || talde.deleted_at === "0000-00-00 00:00:00");
                console.log(datuak);

                this.ordenarPorKodea(); // para que los datos esten ordenados por defecto

            } catch (error) {
                console.error('Errorea:', error);
            }
        },
        async createTalde() {
            try {
                const kodea = this.kodeaSortu;
                const izena = this.izenaSortu;

                // Buscar si el grupo ya existe y está eliminado lógicamente
                const grupoExistente = this.listaTaldeSinFiltro.find(talde => talde.kodea == kodea && talde.deleted_at !== null);

                if (grupoExistente) {
                    // Reactivar el grupo (actualizar deleted_at a null y cambiar el nombre si es necesario)
                    await this.reactivarTalde(grupoExistente.kodea); // Laravel no lo permite, hay que cambiar la db y añadir una PK autoincremental
                } else if (this.listaTalde.some(talde => talde.kodea === kodea)) {
                    // Mostrar mensaje de error si el grupo ya existe y no está eliminado lógicamente
                    console.log('El grupo ya existe. Por favor, introduce un código diferente');
                    return;
                }
                const arraySortu = {
                    "kodea": kodea,
                    "izena": izena
                };

                console.log(JSON.stringify(arraySortu));

                const response = await fetch(window.ruta + 'taldeagorde', {
                    // const response = await fetch('https://www.talde3.edu:8081/Erronka2/laravel_e2t3/public/api/taldeagorde', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json', // Indicar el tipo de contenido como JSON
                        'Access-Control-Allow-Origin': '*'
                    },
                    body: JSON.stringify(arraySortu), // Convertir el objeto JSON a una cadena JSON
                });

                if (!response.ok) {
                    console.log('Errorea sortzerakoan', error);
                    throw new Error('Errorea sortzerakoan');
                }

                console.log('Sortu da');
                await this.cargaTalde();
                location.reload();


            } catch (error) {
                console.log('Errorea: ', error);
            }
        },

        /* FIXME: Alert: No se puede reactivar el grupo, ya que no existe o no está eliminado lógicamente. 
        Mirar por que no se puede poner a null el deleted_at de un grupo "borrado*/
        async reactivarTalde(kodeaParam) {
            try {
                console.log(kodeaParam);
                const izena = this.izenaSortu;

                console.log(kodeaParam);
                console.log(izena);
                // Buscar si el grupo ya existe en la lista y está eliminado lógicamente
                const grupoExistente = this.listaTalde.find(talde => talde.kodea === kodeaParam && talde.deleted_at !== null);

                if (grupoExistente) {
                    const arrayActu = {
                        "kodea": kodea,
                        "izena": izena,
                        "deleted_at": null
                    }
                    console.log(arrayActu);
                    // Actualizar deleted_at a null y cambiar el nombre si es necesario
                    // grupoExistente.deleted_at = null;
                    // grupoExistente.izena = this.izenaSortu;

                    // Realizar la actualización en la base de datos
                    const response = await fetch(window.ruta + `taldeaeguneratu/${kodea}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                            'Access-Control-Allow-Origin': '*'
                        },
                        body: JSON.stringify(arrayActu), // Enviar el objeto actualizado
                    });

                    if (!response.ok) {
                        console.log('Errorea taldea berrezartzeko');
                        throw new Error('Errorea taldea berrezartzeko');
                    }

                    console.log('Grupo reactivado/reactivado');
                    await this.cargaTalde();
                    location.reload();
                } else {
                    console.log('No se puede reactivar el grupo, ya que no existe o no está eliminado lógicamente.');
                }
            } catch (error) {
                console.log('Errorea: ', error);
            }
        },
        async actuTalde() {
            try {
                const kodea = this.arrayKodea[0];
                const izena = this.listaTalde.find(talde => talde.kodea === this.arrayKodea[0]).izena;
                // const izena = this.listaTalde.map(talde => talde.izena).join(', ');
                const arrayActu = {
                    "kodea": kodea,
                    "izena": izena
                };

                const response = await fetch(window.ruta + 'taldeaeguneratu/' + kodea, {
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
                await this.cargaTalde();
                location.reload();
            } catch (error) {
                console.log('Errorea: ', error);
            }
        },
        async ezabTalde() {
            try {
                for (var i = 0; i < this.arrayKodea.length; i++) {
                    const response = await fetch(window.ruta + 'taldeaezabatu/' + this.arrayKodea[i], {
                        // const response = await fetch('https://www.talde3.edu:8081/Erronka2/laravel_e2t3/public/api/taldeaezabatu/' + this.arrayKodea[i], {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                            'Access-Control-Allow-Origin': '*'
                        },
                        body: JSON.stringify(this.arrayKodea[i]),
                    });
                }

                // if(!response.ok){
                //   console.log('Errorea eguneratzerakoan');
                //   throw new Error('Errorea eguneratzerakoan');
                // }

                console.log('Ondo ezabatuta');
                await this.cargaTalde();
                location.reload();
            } catch (error) {
                console.log('Errorea: ', error);
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
        },
        changeLanguage(lang) {
            this.selectedLanguage = lang;
            console.log(this.selectedLanguage);
        },

    },
    mounted() {
        // Llama a tu función cargarPagina cuando el componente se monta
        this.cargaTalde();
    }
});