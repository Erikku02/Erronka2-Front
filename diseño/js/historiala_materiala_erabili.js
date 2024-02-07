new Vue({
    el: '#app',
    data: {
        selectedTalde: "",
        materialaIzenaSortu: "",
        dataSortu: "",
        arrayKodea: [],
        fechaFormateada: '',
        listaOrdutegia: [],
        listaMateriala: [],
        listaMaterialaErabili: [],
        listaProduktua: [],
        listaFiltrada: [],
        listaMarka: [],
        registroBerri: [],
        guardarRegistro: [],
        registros: [],
        stockTotala: 0,
    },
    methods: {

        async cargaMateriala() {    
            
            try {
                const response = await fetch('http://localhost/Erronka2/laravel_e2t3/public/api/materialaruta', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                });

                if (!response.ok) {
                    console.log('Errorea eskera eskaera egiterakoan');
                    throw new Error('Errorea eskaera egiterakoan');
                }
                // Verificar si el material ya está en uso


                const datuak = await response.json();

                // Filtrar los materiales que no están en uso
                this.listaMateriala = datuak
                    .filter(materiala => materiala.deleted_at === null || materiala.deleted_at === "0000-00-00 00:00:00")
            } catch (error) {
                console.error('Errorea: ', error);
            }
            this.actualizarListaFiltrada();
        },
        async cargaMaterialaErabili() {
            try {
                const response = await fetch('http://localhost/Erronka2/laravel_e2t3/public/api/materialaerabiliruta', {
                    // const response = await fetch('https://www.talde3-back.edu/Erronka2/laravel_e2t3/public/api/txandaaruta', {
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
                this.listaMaterialaErabili = datuak;
                this.actualizarListaFiltrada();
            } catch (error) {
                console.error('Errorea: ', error);
            }
        },
        actualizarListaFiltrada() {
            if (!this.materialaIzenaSortu) {
                this.listaFiltrada = this.listaMaterialaErabili
                    .sort((a, b) => new Date(b.hasiera_data) - new Date(a.hasiera_data));
            } else {
                this.listaFiltrada = this.listaMaterialaErabili
                    .sort((a, b) => new Date(b.hasiera_data) - new Date(a.hasiera_data))
                    .filter(registro => 
                        (!this.materialaIzenaSortu || (registro.materiala && registro.materiala.id == this.materialaIzenaSortu))
                    );
            }
        }
    },
    watch:{
        materialaIzenaSortu: function () {
            this.actualizarListaFiltrada();
        }
    },

    mounted() {
        this.cargaMateriala();
        this.cargaMaterialaErabili();
    }
});
