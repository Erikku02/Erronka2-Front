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
        listaLangile: [],
        izenaSortu: ""
    },
    methods: {
        async cargaLangile() {
            try {
                const response = await fetch(window.ruta +'langilearuta', {
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
                // this.listaTalde = datuak
                //      .filter(talde => talde.deleted_at === null || talde.deleted_at === "0000-00-00 00:00:00");
                this.listaLangile = datuak
                    .filter(langile => langile.deleted_at === null || langile.deleted_at === "0000-00-00 00:00:00");
                    //  console.log(this.listaLangile)
            } catch (error) {
                console.error('Errorea: ', error);
            }
            this.filtrarAlumnosPorGrupo();
        },
        async cargaMateriala() {    
            
            try {
                const response = await fetch(window.ruta +'materialaruta', {
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
                const response = await fetch(window.ruta +'materialaerabiliruta', {
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
            if (!this.materialaIzenaSortu && !this.izenaSortu) {
                this.listaFiltrada = this.listaMaterialaErabili
                    .sort((a, b) => new Date(b.hasiera_data) - new Date(a.hasiera_data));
            } else {
                this.listaFiltrada = this.listaMaterialaErabili
                    .sort((a, b) => new Date(b.hasiera_data) - new Date(a.hasiera_data))
                    .filter(registro => 
                        (!this.materialaIzenaSortu || (registro.materiala && registro.materiala.id == this.materialaIzenaSortu)) &&
                        (!this.izenaSortu || (registro.langilea && registro.langilea.id == this.izenaSortu))
                    );
            }
        }
    },
    watch:{
        materialaIzenaSortu: function () {
            this.actualizarListaFiltrada();
        },
        izenaSortu: function () {
            this.actualizarListaFiltrada();
        }
    },

    mounted() {
        this.cargaMateriala();
        this.cargaMaterialaErabili();
        this.cargaLangile(); // Llamar al método para cargar los alumnos

    }
});
