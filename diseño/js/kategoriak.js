new Vue({
    el: '#app',
    data: {
        selectedCheckbox: null, // Esta variable almacenará la ID del checkbox seleccionado
        arrayId: [],
        izenaEgu: "",
        izenaSortu: "",
        listaKategoria: [],
    },
    methods: {
        async cargaKategoria() {
            try {
                const response = await fetch(window.ruta +'kategoriaruta', {
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
                console.log(datuak);

            } catch (error) {
                console.error('Errorea:', error);
            }
        },
        async createKategoria() {
            try {
                const izena = this.izenaSortu;
                const arraySortu = {
                    "izena": izena
                };

                console.log(JSON.stringify(arraySortu));

                const response = await fetch(window.ruta +'kategoriagorde', {
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
                await this.cargaKategoria();
                location.reload();
            } catch (error) {
                console.log('Errorea: ', error);
            }
        },
        async actuKategoria() {
            try {
                const id = this.arrayId[0];
                const izena = this.listaKategoria.find(kategoria => kategoria.id === this.arrayId[0]).izena;
                const arrayActu = {
                    "id": id,
                    "izena": izena
                };

                const response = await fetch(window.ruta +'kategoriaeguneratu/' + id, {
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
                await this.cargaKategoria();
                location.reload();
            } catch (error) {
                console.log('Errorea: ', error);
            }
        },
        async ezabKategoria() {
            try {
                for (var i = 0; i < this.arrayId.length; i++) {
                    const response = await fetch(window.ruta +'kategoriaezabatu/' + this.arrayId[i], {
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
                await this.cargaKategoria();
                location.reload();
            } catch (error) {
                console.log('Errorea: ', error);
            }
        }
    },
    mounted() {
        // Llama a tu función cargarPagina cuando el componente se monta
        this.cargaKategoria();
    }
});