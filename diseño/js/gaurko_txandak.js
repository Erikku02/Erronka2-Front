new Vue({
    el: '#app',
    data: {
        selectedTalde: "",
        listaTxanda: [],
        arrayKodea: [],
        kodeaSortu: "",
        listaTalde: [],
        listaLangile: [],
        fechaFormateada: '',
        listaOrdutegia: [],
        grupoPorDia: '',
        listaTxandaM: [],
        listaTxandaG: [],
        /* IDIOMAS */
        selectedLanguage: 'es',
        // languageStrings: {},
        translations: translations,
        lang: '',
    },
    methods: {
        obtenerFechaActual() {
            const fechaActual = new Date();
            const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
            const numeroDiaSemana = fechaActual.getDay();
            const diasSemana = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
            this.fechaFormateada = `${fechaActual.toLocaleDateString('es-ES', options)}`;
        },
        // Para cargar los grupos que están activos
        async cargaHorariosPorGrupo() {
            const fechaActual = new Date();
            const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
            const numeroDiaSemana = fechaActual.getDay();

            console.log(numeroDiaSemana);
            try {
                const response = await fetch(window.ruta + 'ordutegiaruta', {
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
                this.listaOrdutegia = datuak;
                this.grupoPorDia = this.listaOrdutegia.find(ordutegia => ordutegia.eguna === numeroDiaSemana && ordutegia.deleted_at === null).kodea
            } catch (error) {
                console.error('Error:', error);
            }
            this.cargaLangile();
        },
        async cargaTxanda() {
            try {
                const response = await fetch(window.ruta + 'txandaruta', {
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
                this.listaTxanda = datuak;

                // .filter(txanda => txanda.deleted_at === null || txanda.deleted_at === "0000-00-00 00:00:00");

            } catch (error) {
                console.error('Errorea: ', error);
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
                // this.listaTalde = datuak
                //      .filter(talde => talde.deleted_at === null || talde.deleted_at === "0000-00-00 00:00:00");
                this.listaLangile = datuak
                    .filter(langile => langile.deleted_at === null || langile.deleted_at === "0000-00-00 00:00:00");
                console.log(this.listaLangile)
            } catch (error) {
                console.error('Errorea: ', error);
            }
            this.cargaLangileakG();
            this.cargaLangileakM();
        },
        async cargaLangileakG() {
            try {
                const response = await fetch(window.ruta + 'txandaGarbiketa/' + this.grupoPorDia, {
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
                this.listaTxandaG = datuak;

                // .filter(txanda => txanda.deleted_at === null || txanda.deleted_at === "0000-00-00 00:00:00");
                console.log(this.listaTxandaG);
            } catch (error) {
                console.error('Errorea: ', error);
            }
        },

        async cargaLangileakM() {
            try {
                const response = await fetch(window.ruta + 'txandaMostradorea/' + this.grupoPorDia, {
                    // const response =listaTxandaMdatuak await fetch('https://www.talde3-back.edu/Erronka2/laravel_e2t3/public/api/txandaaruta', {
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
                this.listaTxandaM = datuak;

                // .filter(txanda => txanda.data === const fechaActual = new Date(); || txanda.deleted_at === "0000-00-00 00:00:00");
                console.log(this.listaTxandaM);
            } catch (error) {
                console.error('Errorea: ', error);
            }
        },
        changeLanguage(lang) {
            this.selectedLanguage = lang;
            window.selectedLanguage = lang;
            // console.log(this.selectedLanguage);
            // console.log(this.translations);
        },
        changeLanguageAndClose(lang) {
            // Cerrar la barra de navegación lateral
            const offcanvasNavbar = document.getElementById('offcanvasNavbar');
            const offcanvasInstance = new bootstrap.Offcanvas(offcanvasNavbar);
            offcanvasInstance.hide();

            // Cambiar el idioma
            this.changeLanguage(lang);

            // Enviar la variable al método changeLanguage de la instancia de Vue
            this.$root.changeLanguage(lang);
        },


        /* creo que no se usa */
        getTranslation(key) {
            return this.translations[this.selectedLanguage][key] || '';
        }
    },
    mounted() {
        // Llama a tu función cargarPagina cuando el componente se monta
        this.obtenerFechaActual();
        this.cargaHorariosPorGrupo();
        // this.filterTaldea();
        this.cargaTxanda();
        // this.cargaTalde();
    }
});
