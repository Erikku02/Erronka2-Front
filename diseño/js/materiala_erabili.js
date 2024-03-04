new Vue({
    el: '#app',
    data: {
        selectedTalde: "",
        arrayKodea: [],
        kodeaSortu: "",
        izenaSortu: "",
        materialaSortu: "",
        listaTalde: [],
        listaLangile: [],
        fechaFormateada: '',
        listaOrdutegia: [],
        grupoPorDia: '',
        alumnosPorGrupo: [],
        listaMateriala: [],
        materialesDisponibles: [],
        materialesEnUso: [], // Nueva propiedad para almacenar los materiales en uso
        listaMaterialaErabili: [],
        registroBerri: [],
        guardarRegistro: [],
        registros: [],
        stockTotala: 0,
        actualizarMateriales: false,
        /* IDIOMAS */
        selectedLanguage: 'es',
        // languageStrings: {},
        translations: translations,
    },
    methods: {
        formatDate(dateString) {
            const date = new Date(dateString);
            const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' };
            return date.toLocaleString('es-ES', options);
        },
        changeLanguage(lang) {
            this.selectedLanguage = lang;
            console.log(this.selectedLanguage);
        },
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

                // Verificar si se encontró un grupo antes de acceder a 'kodea'
                const grupoEncontrado = this.listaOrdutegia.find(ordutegia => ordutegia.eguna === numeroDiaSemana && ordutegia.deleted_at === null);

                if (grupoEncontrado) {
                    this.grupoPorDia = grupoEncontrado.kodea;
                } else {
                    // Manejar el caso cuando no se encuentra un grupo
                    console.error('No se encontró un grupo para el día actual.');
                }

            } catch (error) {
                console.error('Error:', error);
            }
            this.cargaLangile();
        },

        filtrarAlumnosPorGrupo() {
            const grupoSeleccionado = this.grupoPorDia;
            // Filtrar la lista de alumnos por el grupo seleccionado
            this.alumnosPorGrupo = this.listaLangile.filter(langile => langile.kodea === this.grupoPorDia);
        },
        async actualizarMaterialesDisponibles() {
            try {
                const response = await fetch(window.ruta + 'materialaruta', {
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

                const datuak = await response.json();

                // Filtrar los materiales que no están en uso
                this.materialesDisponibles = datuak
                    .filter(materiala => materiala.deleted_at === null || materiala.deleted_at === "0000-00-00 00:00:00")
                    .filter(materiala => !this.materialesEnUso.includes(materiala.id));
                // Cambiar el valor de la variable para forzar la actualización
                this.actualizarMateriales = !this.actualizarMateriales;
            } catch (error) {
                console.error('Errorea: ', error);
            }
        },
        async cargaMateriala() {

            try {
                const response = await fetch(window.ruta + 'materialaruta', {
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
                this.materialesDisponibles = datuak
                    .filter(materiala => materiala.deleted_at === null || materiala.deleted_at === "0000-00-00 00:00:00")
                    .filter(materiala => !this.materialesEnUso.includes(materiala.id));
            } catch (error) {
                console.error('Errorea: ', error);
            }
            this.cargaMaterialaErabili();
        },


        async cargaMaterialaErabili() {
            this.actualizarMaterialesDisponibles();
            try {
                const response = await fetch(window.ruta + 'materialaerabiliruta', {
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
                this.listaMaterialaErabili = datuak.filter(materiala_erabili => materiala_erabili.amaiera_data === null || materiala_erabili.amaiera_data === "0000-00-00 00:00:00");

                // Actualizar la lista de materiales en uso
                this.materialesEnUso = this.listaMaterialaErabili.map(item => item.materiala.id);

            } catch (error) {
                console.error('Errorea: ', error);
            }
        },

        // // Nuevo método para filtrar la lista de materiales disponibles
        // materialesDisponibles() {
        //     return this.listaMateriala.filter(materiala => !this.materialesEnUso.includes(materiala.id));
        // },

        async createMaterialErabili() {
            try {
                const langile = this.izenaSortu;
                const materiala = this.materialaSortu;

                // Verificar si el material ya está en uso
                if (this.materialesEnUso.includes(materiala)) {
                    console.log('¡El material ya está en uso!');
                    return; // Detener la ejecución si el material ya está en uso
                }

                const arraySortu = {
                    "id_langilea": langile,
                    "id_materiala": materiala
                };

                console.log(JSON.stringify(arraySortu));

                const response = await fetch(window.ruta + 'materialaerabiligorde', {
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
                await this.cargaMaterialaErabili();
                await this.actualizarMaterialesDisponibles(); // Llamada a la nueva función
                
                // Reiniciar la variable izenaSortu
                this.izenaSortu = '';

            } catch (error) {
                console.log('Errorea: ', error);
            }
        },

        async materialaItzuli(id) {

            try {

                const response = await fetch(window.ruta + `materialaerabiliezabatu/` + id, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    body: JSON.stringify({}),
                });

                if (!response.ok) {
                    console.log('Errorea eguneratzerakoan');
                    throw new Error('Errorea eguneratzerakoan');
                }
                await this.cargaMaterialaErabili();
                location.reload();
            } catch (error) {
                console.log('Errorea: ', error);
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
                //  console.log(this.listaLangile)
            } catch (error) {
                console.error('Errorea: ', error);
            }
            this.filtrarAlumnosPorGrupo();
        },
    },

    mounted() {
        // Llama a tu función cargarPagina cuando el componente se monta
        this.cargaMaterialaErabili();
        this.obtenerFechaActual();
        this.cargaHorariosPorGrupo();
        this.cargaMateriala();
    }
});