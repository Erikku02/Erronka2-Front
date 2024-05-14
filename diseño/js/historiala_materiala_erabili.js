new Vue({
    el: '#app',
    data: {
        selectedTalde: "",
        materialaIzenaSortu: "",
        izenaSortu: "",
        dataSortu: "",
        arrayKodea: [],
        fechaFormateada: '',
        listaOrdutegia: [],
        grupoPorDia: '',
        alumnosPorGrupo: [],
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
        /* IDIOMAS */
        selectedLanguage: 'es',
        // languageStrings: {},
        translations: translations,
        // Paginar
        itemsPorPagina: 10,
        paginaActual: 1,
    },
    computed: {
        // Filtrar los datos basados en el término de búsqueda (busca en los campos izena, abizena, telefonoa)
        itemsFiltradosPaginados() {
            let itemsFiltrados = this.listaFiltrada;


            // Calcular los índices de inicio y fin para la paginación
            const inicio = (this.paginaActual - 1) * this.itemsPorPagina;
            const fin = inicio + this.itemsPorPagina;

            // Paginar los datos filtrados
            return itemsFiltrados.slice(inicio, fin);
        },
        // Paginar
        cantidadPorPaginas() {
            return Math.ceil(this.listaFiltrada.length / this.itemsPorPagina)
        },
    },
    methods: {
        paginaAnterior() {
            if (this.paginaActual > 1) {
                this.paginaActual--;
            }
        },
        paginaSiguiente() {
            if (this.paginaActual < this.cantidadPorPaginas) {
                this.paginaActual++;
            }
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
                this.listaMateriala = datuak
                    .filter(materiala => materiala.deleted_at === null || materiala.deleted_at === "0000-00-00 00:00:00")
            } catch (error) {
                console.error('Errorea: ', error);
            }
            this.actualizarListaFiltrada();
        },
        async cargaMaterialaErabili() {
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
                this.listaMaterialaErabili = datuak;
                this.actualizarListaFiltrada();

            } catch (error) {
                console.error('Errorea: ', error);
            }
        },
        actualizarListaFiltrada() {
            // Obtener el ID del material seleccionado
            const idMaterialSeleccionado = this.materialaIzenaSortu;

            // Obtener el ID del alumno seleccionado
            const idAlumnoSeleccionado = this.izenaSortu;

            // Filtrar la lista de registros por material y alumno seleccionados
            this.listaFiltrada = this.listaMaterialaErabili
                .filter(registro =>
                    (!idMaterialSeleccionado || registro.materiala.id == idMaterialSeleccionado) && // Filtrar por material si está seleccionado
                    (!idAlumnoSeleccionado || registro.langilea.id == idAlumnoSeleccionado) // Filtrar por alumno si está seleccionado
                )
                .sort((a, b) => new Date(b.hasiera_data) - new Date(a.hasiera_data)); // Ordenar los registros por fecha
        },
        changeLanguage(lang) {
            this.selectedLanguage = lang;
            console.log(this.selectedLanguage);
        },

        filtrarPorAlumno() {
            // Obtener el ID del alumno seleccionado
            const idAlumnoSeleccionado = this.izenaSortu;

            // Actualizar la lista filtrada solo con los registros del alumno seleccionado
            if (!idAlumnoSeleccionado) {
                // Si no se selecciona ningún alumno, mostrar todos los registros
                this.listaFiltrada = this.listaMaterialaErabili
                    .sort((a, b) => new Date(b.hasiera_data) - new Date(a.hasiera_data));
            } else {
                this.listaFiltrada = this.listaMaterialaErabili
                    .filter(registro => registro.langilea.id === idAlumnoSeleccionado)
                    .sort((a, b) => new Date(b.hasiera_data) - new Date(a.hasiera_data));
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
    watch: {
        materialaIzenaSortu: function () {
            this.actualizarListaFiltrada();
        },
        izenaSortu: function () {
            this.actualizarListaFiltrada();
        },
    },

    mounted() {
        this.cargaMateriala();
        this.obtenerFechaActual();
        this.cargaHorariosPorGrupo();
        this.cargaMaterialaErabili();
        this.itemsPaginados;
    }
});
