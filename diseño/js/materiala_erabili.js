

/* ESTA SIN HACER
    Es la kudeakea del material del almacen */


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
    },
    methods: {
        // Para cargar los grupos que estan activos
        async cargaMaterialaErabili() {
            try {
                const response = await fetch('http://localhost/Erronka2/laravel_e2t3/public/api/materialaruta', {
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
            } catch (error) {
                console.error('Errorea:', error);
            }
        },

        /*async createMateriala() {
            try {
                // const id = this.kodeaSortu;
                const etiketa = this.etiketaSortu;
                const izena = this.izenaSortu;
                const arraySortu = {
                    "etiketa": etiketa,
                    "izena": izena
                };

                console.log(JSON.stringify(arraySortu));

                const response = await fetch('http://localhost/Erronka2/laravel_e2t3/public/api/materialagorde', {
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

                alert('Sortu da');
                await this.cargaMateriala();
                location.reload();

            } catch (error) {
                console.log("Errorea: ", error);
            }
        },*/

        // TODO:ordenar tabla por columnas
        /*ordenarColumna(){
            for (let i = 0; i < th.length; i++) {
                const element = th[i];
                
            }
        }*/
        // TODO: actuMateriala
        /*async actuMateriala() {
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

                const response = await fetch('http://localhost/Erronka2/laravel_e2t3/public/api/materialaeguneratu/' + id, {
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

                alert('Ondo eguneratuta');
                await this.cargaMateriala();
                location.reload();

            } catch (error) {
                console.log('Errorea: ', error);
            }
        },*/
        /*async ezabMateriala() {
            try {
                for (var i = 0; i < this.arrayId.length; i++) {
                    const response = await fetch('http://localhost/Erronka2/laravel_e2t3/public/api/materialaezabatu/' + this.arrayId[i], {
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

                alert('Ondo ezabatuta');
                await this.cargaMateriala();
                location.reload();
            } catch (error) {
                console.log('Errorea: ', error);
            }
        },*/

        /*async filtermateriala(materiala) {
            this.selectedmateriala = materiala;
            console.log("rfrfr");
            try {
                const kodea = this.selectedmateriala;
                console.log(kodea);

                if (!kodea) {
                    // Si no se selecciona ningún grupo, cargar todos los trabajadores
                    this.cargaLangile();
                } else {
                    const response = await fetch('http://localhost/Erronka2/laravel_e2t3/public/api/langilearuta/' + kodea, {
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
        },*/
    },
    mounted() {
        // Llama a tu función cargarPagina cuando el componente se monta
        this.cargaMateriala();
    }
});