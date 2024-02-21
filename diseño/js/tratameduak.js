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
    },
    methods: {
        changeLanguage(lang) {
            this.selectedLanguage = lang;
            console.log(this.selectedLanguage);
        },
        async cargaTratamendu() {
            try {
                const response = await fetch(window.ruta +'tratamenduaruta', {
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
                const isComfirmed = window.confirm("Ya existe un tratamiento con el mismo nombre. ¿Estás seguro de que quieres añadir el actual?");
                if (!isComfirmed) {
                    // Si el usuario cancela, no se realiza ninguna accion (no se añade el tratamiento)
                    return;
                }
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

                const response = await fetch(window.ruta +'tratamenduagorde', {
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

                const response = await fetch(window.ruta +'tratamenduaeguneratu/' + id, {
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
                await this.cargaTratamendu();
                location.reload();
            } catch (error) {
                console.log('Errorea: ', error);
            }
        },
        async ezabTratamendu() {
            try {
                for (var i = 0; i < this.arrayId.length; i++) {
                    const response = await fetch(window.ruta +'tratamenduaezabatu/' + this.arrayId[i], {
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

                alert('Ondo ezabatuta');
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