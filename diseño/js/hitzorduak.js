new Vue({
    el: '#app',
    data: {
        selectedCheckbox: null, // Esta variable almacenará la ID del checkbox seleccionado
        /* arrayId: [], */
        /* etxekoaSortu: "",
        izenaSortu: "",
        telefonoaSortu: "",
        deskribapenaSortu: "",
        dataSortu: "",
        hasiera_orduaSortu: "",
        amaiera_orduaSortu: "",
        asientoSortu: "", */

        fecha: '',
        fechaFormateada: '',

        /* citas: [], */

        /* translations: {},
        currentLocale: '', */

        eserlekuKop: [],
        hoursArray: [],
        /* hitzorduArray: [], */
        /* datuak2: [], */
        listaHitzordu: [], // lista de citas con todos sus datos
        hitzorduSinFiltro: [],
        listaLangile: [], // lista de langilea
        listaOrdutegia: [],

        grupoPorDia: '',
        citasPorHora: {},

        /*  ordenNombre: 'asc', // Para ordenar los datos de la tabla
         ordenKategoria: 'asc', */

        /* calendario: {}, */ // Nueva propiedad para almacenar citas por fecha y hora
        horas: ["08:00:00", "08:30:00", "09:00:00", "09:30:00", "10:00:00", "10:30:00", "11:00:00", "11:30:00", "12:00:00", "12:30:00", "13:00:00", "13:30:00", "14:00:00", "14:30:00"],
        /* citasPorHora: {}, */ // Almacena citas oganizadas por hora
        /* selectedCita: null, */ // Cita seleccionada
        totalLangile: 0,
        /* hairdressersPerGroup: [] */

        asientosPorHora: [],
    },
    methods: {

        async cargarDatos(fechaInput) {
            try {
                // Si no se proporciona una fecha, usa la fecha actual
                const fechaSeleccionada = fechaInput ? new Date(fechaInput) : new Date();

                // Resto de la lógica de cargaHorariosPorGrupo
                this.obtenerFechaSeleccionada();
                await this.cargaHorariosPorGrupo(fechaSeleccionada);
                await this.cargaHitzordu();
            } catch (error) {
                console.error('Error al cargar datos:', error);
            }

        },
        obtenerFechaSeleccionada() {
            // FIXME: que coja la fecha del input y lo pase al formato que necesito
            const fechaInput = this.fecha ? new Date(this.fecha) : new Date();
            console.log(fechaInput);

            const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
            const numeroDiaSemana = fechaInput.getDay();
            const diasSemana = ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'];
            const fechaFormateada = fechaInput.toLocaleDateString('es-ES', options);
            /* console.log(this.fechaFormateada); */

            /* this.cargaLangile(); */
            /* this.cargaHorariosPorGrupo(); */
            // Llama a cargaHorariosPorGrupo y espera a que se complete antes de llamar a cargaHitzordu
            /* this.cargaHorariosPorGrupo().then(() => {
                this.cargaHitzordu();
            }); */
            try {
                // Llama a cargaHorariosPorGrupo solo si no hay una fecha proporcionada
                if (!this.fecha) {
                    this.cargaHorariosPorGrupo();
                }
                this.cargaHitzordu();
            } catch (error) {
                console.error('Error al cargar horarios y citas:', error);
            }
        },

        async cargaHitzordu() {
            try {
                // console.log("cargaHitzordu");
                const response = await fetch('http://localhost/Erronka2/laravel_e2t3/public/api/hitzorduaruta', {
                    // const response = await fetch('https://www.talde3.edu:8081/Erronka2/laravel_e2t3/public/api/hitzorduaruta', {
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
                console.log(this.fecha);
                const fechaSeleccionada = new Date(this.fecha);
                console.log("fecha filtrada");


                const formattedFechaSeleccionada = fechaSeleccionada.toISOString().substring(0, 10);
                this.listaHitzordu = datuak
                    .filter(cita =>
                        cita.data.includes(formattedFechaSeleccionada)
                    );

                console.log(this.listaHitzordu);

                this.hitzorduSinFiltro = datuak;

                console.log(datuak);


                // FALTA AÑADIR EL FIlTER !!!!!!!
                //.filter(produktu => produktu.deleted_at === null || produktu.deleted_at === "0000-00-00 00:00:00");

                /* this.cargaLangile(); */

                // Organizar las citas por hora y asiento
                this.organizarCitasPorHora();

                // Actualizar asientos por hora
                //this.actualizarAsientosPorHora();

                /* console.log(datuak); */

                /*  console.log(this.listaHitzordu); */

                // console.log("fin cargaHitzordu");


            } catch (error) {
                console.error('Errorea:', error);
            }

            try {
                // console.log("2 cargaHitzordu");
                this.eserlekuKop = [];

                /* const response2 = await fetch('http://localhost/Erronka2/laravel_e2t3/public/api/langilearuta' + this.dataSelec, { */
                const response2 = await fetch('http://localhost/Erronka2/laravel_e2t3/public/api/langilearuta', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    method: "GET"
                });
                if (!response2.ok) {
                    throw new Error('Errorea eskaera egiterakoan');
                }

                const datuak2 = await response2.json();
                this.eserlekuKop = [];
                for (let i = 1; i <= datuak2; i++) {
                    this.eserlekuKop.push({ id: i });
                }
                // console.log("2 fin cargaHitzordu");
            } catch (error) {
                console.error('Errorea:', error);
            }
        },

        fechaHoy() {
            /* this.fecha = new Date();
            console.log(this.fecha); */
        },

        async cargaLangile() {
            // console.log("cargaLangile");
            this.totalLangile = 0;
            try {
                const response = await fetch('http://localhost/Erronka2/laravel_e2t3/public/api/langilearuta', {
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
                /* console.log(datuak); */
                this.listaLangile = datuak

                    .filter(langile => langile.deleted_at === null && langile.kodea === this.grupoPorDia);
                this.totalLangile = this.listaLangile.length - 1;

                /* console.log(this.totalLangile); */

                /*                 console.log(this.listaLangile);
                 */
                // this.ordenarPorNombre();
            } catch (error) {
                console.error('Errorea: ', error);
            }
            // console.log("fin cargaLangile");
            /* console.log(this.citas); */
        },

        async cargaHorariosPorGrupo(fechaInput) {
            this.grupoPorDia = '';
            this.fechaFormateada = fechaInput;
            /* const fechaActual = new Date(); */
            const fechaActual = fechaInput ? new Date(this.fechaFormateada) : new Date();

            /* console.log(fechaActual);
            console.log(fechaActual.getDay()); */
            const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
            const numeroDiaSemana = fechaActual ? fechaActual.getDay() : -1;



            /* console.log(numeroDiaSemana); */
            try {
                const response = await fetch('http://localhost/Erronka2/laravel_e2t3/public/api/ordutegiaruta', {
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

                const diaGrupo = this.listaOrdutegia.find(ordutegia => ordutegia.eguna === numeroDiaSemana && ordutegia.deleted_at === null);

                if (diaGrupo) {
                    this.grupoPorDia = diaGrupo.kodea;
                    /* console.log(this.grupoPorDia); */
                    this.cargaLangile();
                } else {
                    console.error('No se encontró el día de trabajo para el grupo');
                }

                /* console.log(this.grupoPorDia); */

                this.cargaLangile();
            } catch (error) {
                console.error('Error:', error);
            }
        },

        organizarCitasPorHora() {
            /* this.cargaLangile(); */
            // console.log("organizarCitasPorHora");
            this.citasPorHora = {};
            this.asientosPorHora = [],

                // Organizar las citas por hora y asiento
                this.listaHitzordu.forEach(hitzordu => {
                    const hasieraOrdua = hitzordu.hasiera_ordua;

                    // Por hora
                    if (!this.citasPorHora[hasieraOrdua]) {
                        this.citasPorHora[hasieraOrdua] = [];
                    }

                    this.citasPorHora[hasieraOrdua].push(hitzordu);


                    // Por asiento
                    const asiento = hitzordu.eserlekua;

                    /*  console.log(asiento); */
                    if (!this.asientosPorHora[asiento]) {
                        this.asientosPorHora[asiento] = [];
                    }
                    this.asientosPorHora[asiento].push(hitzordu);
                });

            /* console.log(this.asientosPorHora); */

            // console.log("fin organizarCitasPorHora");
        },

        esCitaDelDia(cita) {
            const fechaCita = new Date(cita.data);

            // Formatear la fecha de la cita a yyyy-mm-dd
            const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
            const fechaFormateada = fechaCita.toLocaleDateString('es-ES', options);
            /* return fechaCita.toDateString() === this.fechaFormateada; */
            /* console.log('Cita:', cita);
            console.log('Fecha cita:', fechaCita);
            console.log('Fecha formateada cita:', fechaFormateada);
            console.log('Fecha seleccionada:', this.fecha); */
            return fechaFormateada === this.fecha;
        },
        isCeldaOcupada(cita, hora) {
            const citaStartHour = cita.hasiera_ordua.split(":")[0];
            const citaStartMinute = cita.hasiera_ordua.split(":")[1];

            const horaSlotStartHour = hora.split(":")[0];
            const horaSlotStartMinute = hora.split(":")[1];

            // Compare hours and minutes to check if citaStartHour is greater or equal to horaSlotStartHour
            // and citaStartMinute is greater or equal to horaSlotStartMinute
            return (
                citaStartHour >= horaSlotStartHour &&
                (citaStartMinute > horaSlotStartMinute || citaStartHour > horaSlotStartHour)
            );
        },

        si(hora, asiento) {
            /* console.log(hora);
            console.log(asiento); */

            // /* console.log(this.listaHitzordu); */
            /* console.log(hora);
            console.log(this.listaHitzordu[0].amaiera_ordua) */
            if (hora <= this.listaHitzordu[0].amaiera_ordua) {
                console.log("aa")
            }
            const citaActual = this.listaHitzordu.filter(hitzordu => hora >= hitzordu.hasiera_ordua && hora < hitzordu.amaiera_ordua && hitzordu.eserlekua == asiento);
            // console.log(citaActual);
            return citaActual;

        },
        lortuData() {
            var gaur = new Date();
            var urtea = gaur.getFullYear();
            var hilabetea = gaur.getMonth() + 1;
            var eguna = gaur.getDate();
            if (eguna < 10) {
                eguna = '0' + eguna
            }
            if (hilabetea < 10) {
                hilabetea = '0' + hilabetea
            }
            return urtea + '-' + hilabetea + '-' + eguna;
        }


    },
    mounted() {
        this.fecha = this.lortuData();
        this.obtenerFechaSeleccionada({ target: { value: undefined } }); // Llamar obtenerFechaSeleccionada al cargar la página
        // Llama a tu función cargarPagina cuando el componente se monta
        /* this.cargaHorariosPorGrupo(); */
        /* this.cargaLangile(); */
        this.cargaHitzordu();
        this.cargarDatos();
        this.fechaHoy();



        // Actualizar fechaFormateada con la fecha actual
        const fechaActual = new Date();
        const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
        this.fechaFormateada = fechaActual.toLocaleDateString('es-ES', options);
        console.log(this.fechaFormateada);

    },
    watch: {
        fecha: function (fecha) {
            this.cargaHorariosPorGrupo(fecha);
        }
    }
});