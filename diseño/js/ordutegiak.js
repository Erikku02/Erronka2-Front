// Para formatear la hora y que salga con el formato hh:mm
Vue.filter('formatHour', function (value) {
    if (!value) return '';

    // Dividir la cadena de hora en partes utilizando ":"
    const parts = value.split(':');

    // Asegurarse de que hay al menos dos partes
    if (parts.length >= 2) {
        // Tomar las dos primeras partes y unirlas con ":"
        return `${parts[0]}:${parts[1]}`;
    }

    // Si no hay dos partes, devolver la cadena original
    return value;
});


new Vue({
    el: '#app',
    data: {
        selectedChecbox: null, // Almacena el id del checkbox seleccionado
        arrayId: [],
        listaOrdutegia: [],
        listaTalde: [],
        selectedTalde: "",
        kodeaSortu: "",
        egunaSortu: "",
        hasiera_dataSortu: "",
        amaiera_dataSortu: "",
        hasiera_orduaSortu: "",
        amaiera_orduaSortu: "",
    },
    methods: {
        async cargaOrdutegia() {
            try {
                const response = await fetch(window.ruta +'ordutegiaruta', {
                    // const response = await fetch('https://www.talde3-back.edu/Erronka2/laravel_e2t3/public/api/ordutegiaruta', {
                    method: 'GET',
                    // mode: "no-cors",
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                });

                if (!response.ok) {
                    console.log('Errorea eskaera egiterakoan');
                    throw new Error('Errorea eskaera egiterakoan');
                }

                const datuak = await response.json();
                // console.log(datuak);
                this.listaOrdutegia = datuak
                    .filter(ordutegia => ordutegia.deleted_at === null || ordutegia.deleted_at === "0000-00-00 00:00:00");

                this.ordenarPorKodea();
                console.log(datuak);
            } catch (error) {
                console.error('Errorea: ', error);
            }
        },
        async createOrdutegia() {
            try {
                const kodea = this.kodeaSortu;
                const eguna = this.egunaSortu;
                const hasiera_data = this.hasiera_dataSortu;
                const amaiera_data = this.amaiera_dataSortu;
                const hasiera_ordua = this.hasiera_orduaSortu;
                const amaiera_ordua = this.amaiera_orduaSortu;
                const arraySortu = {
                    "kodea": kodea,
                    "eguna": eguna,
                    "hasiera_data": hasiera_data,
                    "amaiera_data": amaiera_data,
                    "hasiera_ordua": hasiera_ordua,
                    "amaiera_ordua": amaiera_ordua
                }

                console.log(JSON.stringify(arraySortu));

                // console.log(arraySortu);

                const response = await fetch(window.ruta +'ordutegiagorde', {
                    // const response = await fetch('https://www.talde3-back.edu/Erronka2/laravel_e2t3/public/api/ordutegiagorde', {
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
                await this.cargaOrdutegia();
                location.reload();
            } catch (error) {
                console.log('Errorea: ', error);
            }
        },

        async actuOrdutegia() {
            try {
                const id = this.arrayId[0];
                const kodea = this.listaOrdutegia.find(ordutegia => ordutegia.id === this.arrayId[0]).kodea;
                const eguna = this.listaOrdutegia.find(ordutegia => ordutegia.id === this.arrayId[0]).eguna;
                const hasiera_data = this.listaOrdutegia.find(ordutegia => ordutegia.id === this.arrayId[0]).hasiera_data;
                const amaiera_data = this.listaOrdutegia.find(ordutegia => ordutegia.id === this.arrayId[0]).amaiera_data;
                const hasiera_ordua = this.listaOrdutegia.find(ordutegia => ordutegia.id === this.arrayId[0]).hasiera_ordua;
                const amaiera_ordua = this.listaOrdutegia.find(ordutegia => ordutegia.id === this.arrayId[0]).amaiera_ordua;

                console.log(eguna);

                const arrayActu = {
                    'id': id,
                    'kodea': kodea,
                    'eguna': eguna,
                    'hasiera_data': hasiera_data,
                    'amaiera_data': amaiera_data,
                    'hasiera_ordua': hasiera_ordua,
                    'amaiera_ordua': amaiera_ordua
                }
                const response = await fetch(window.ruta +'ordutegiaeguneratu/' + id, {
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
                await this.cargaOrdutegia();
                location.reload();

            } catch (error) {
                console.log('Errorea: ', error);
            }
        },
        async ezabOrdutegi() {
            try {
                for (let i = 0; i < this.arrayId.length; i++) {
                    console.log(this.arrayId[i]);
                    const response = await fetch(window.ruta +'ordutegiaezabatu/' + this.arrayId[i], {
                        // const response = await fetch('https://www.talde3.edu:8081/Erronka2/laravel_e2t3/public/api/ordutegiaezabatu/' + this.arrayId[i], {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                            'Access-Control-Allow-Origin': '*'
                        },
                        body: JSON.stringify(this.arrayId[i]),
                    });
                }
                alert('Ondo ezabatuta');
                await this.cargaOrdutegia();
                location.reload();
            } catch (error) {
                console.log('Errorea: ', error);
            }
        },
        egunaOrdutegia(numeroDia) {
            const diasSemana = ['', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
            return diasSemana[numeroDia];
        },
        async cargaTalde() {
            try {
                const response = await fetch(window.ruta +'taldearuta', {
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
                // console.log(datuak);
                this.listaTalde = datuak
                    .filter(talde => talde.deleted_at === null || talde.deleted_at === "0000-00-00 00:00:00");
                // console.log(datuak);

                if (this.listaTalde.length > 0) {
                    this.selectedTalde = this.listaTalde[0].kodea;
                }
                // console.log(listaTalde);

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
            this.ordenKodea = this.ordenKodea === 'asc' ? 'desc' : 'asc';
            this.listaOrdutegia.sort((a, b) => {
                return this.ordenKodea === 'asc' ?
                    this.alphanumCompare(a.kodea, b.kodea) :
                    this.alphanumCompare(b.kodea, a.kodea);
            });
        }
    },
    mounted() {
        this.cargaOrdutegia();
        this.cargaTalde();
    }
})