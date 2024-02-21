new Vue({
    el: '#app',
    data: {
        selectedTalde: "",
        selectedCheckbox: null, // Esta variable almacenará la ID del checkbox seleccionado
        listaTxanda: [],
        arrayId: [],
        arrayKodea: [],
        kodeaSortu: "",
        izenaSortu: "",
        tareaSortu: "",
        abizenakSortu: "",
        listaTalde: [],
        listaLangile: [],
        listaTxanda: [],
        alumnosPorGrupo: [],
        /* IDIOMAS */
        selectedLanguage: 'es',
        translations: translations,
    },
    computed: {
        nombresUnicos() {
            const nombres = new Set();
            this.listaTxanda.forEach((txanda) => {
                nombres.add(txanda.mota);
            });
            return Array.from(nombres);
        },
    },
    methods: {
        changeLanguage(lang) {
            this.selectedLanguage = lang;
            console.log(this.selectedLanguage);
        },
        contarTurnosPorAlumno() {
            const alumnos = {};

            this.listaTxanda.forEach((txanda) => {
                const nombre = txanda.izena;
                const mota = txanda.mota;

                if (!alumnos[nombre]) {
                    alumnos[nombre] = { nombre, turnos: {} };
                }

                if (!alumnos[nombre].turnos[mota]) {
                    alumnos[nombre].turnos[mota] = 1;
                } else {
                    alumnos[nombre].turnos[mota]++;
                }
            });

            return Object.values(alumnos);
        },
        contarTurnos(turnos, tipo) {
            return turnos[tipo] || 0;
        },

        // Para cargar los grupos que están activos
        async cargaTalde() {
            try {
                const response = await fetch(window.ruta +'taldearuta', {
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
                this.listaTalde = datuak
                    .filter(talde => talde.deleted_at === null || talde.deleted_at === "0000-00-00 00:00:00");
            } catch (error) {
                console.error('Errorea:', error);
            }
        },
        async cargaTxanda() {
            try {
                const response = await fetch(window.ruta +'txandaruta', {
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
        filtrarAlumnosPorGrupo() {
            const grupoSeleccionado = this.kodeaSortu;
            // Filtrar la lista de alumnos por el grupo seleccionado
            this.alumnosPorGrupo = this.listaLangile.filter(langile => langile.kodea === grupoSeleccionado);
        },
        async createTxanda() {
            try {
                //aqui hay que meter el id no el nombre
                const id_langilea = this.izenaSortu;
                const mota = this.tareaSortu;
                const arraySortu = {
                    "id_langilea": id_langilea,
                    "mota": mota
                };

                console.log(JSON.stringify(arraySortu));

                const response = await fetch(window.ruta +'txandagorde', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    body: JSON.stringify(arraySortu),
                });

                if (!response.ok) {
                    console.log('Errorea sortzerakoan');
                    throw new Error('Errorea sortzerakoan');
                }

                alert('Sortu da');

                // Cargar la lista de turnos después de insertar uno nuevo
                await this.cargaTxanda();

                // Actualizar la lista de tareas únicas
                //this.actualizarNombresUnicos();

                location.reload();
            } catch (error) {
                console.log("Errorea: ", error);
            }
        },
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

            } catch (error) {
                console.error('Errorea: ', error);
            }
        },

        async filterTaldea(talde) {
            this.selectedTalde = talde;
            try {
                const kodea = this.selectedTalde;
                if (!kodea) {
                    // Si no se selecciona ningún grupo, cargar todos los trabajadores
                    this.cargaLangile();
                } else {
                    const response = await fetch(window.ruta +'txandaruta/' + kodea, {
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
                    this.listaTxanda = datuak
                    //   .filter(langilea => langilea.deleted_at === null || langilea.deleted_at === "0000-00-00 00:00:00");
                    this.contarTurnosPorAlumno();
                    //this.contarTurnosByKodea(kodea);
                }

            } catch (error) {
                console.error('Error:', error);
            }
        },
    },
    mounted() {
        // Llama a tu función cargarPagina cuando el componente se monta
        this.filterTaldea();
        this.cargaTxanda();
        this.cargaTalde();
    }
});