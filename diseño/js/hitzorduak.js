new Vue({
    el: '#app',
    data: {
        // modalVisible: false, // Para controlarla visibilidad del modal
        selectedCheckbox: null, // Esta variable almacenará la ID del checkbox seleccionado
        arrayId: [],
        hitzorduId: [],
        etxekoaSortu: "",
        eserlekuaSortu: "",
        izenaSortu: "",
        telefonoaSortu: "",
        fechaSortu: "",
        deskribapenaSortu: "",
        dataSortu: "",
        hasiera_orduaSortu: "",
        amaiera_orduaSortu: "",
        asientoSortu: "",
        langileUpdate: "",

        fecha: '',
        fechaFormateada: '',

        idCitaSeleccionada: [],
        datosCitaSeleccionada: [],
        langileDatos: [],

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
            const fechaInput = this.fecha ? new Date(this.fecha) : new Date();
            /* console.log(fechaInput); */

            const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
            const numeroDiaSemana = fechaInput.getDay();
            const diasSemana = ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'];
            const fechaFormateada = fechaInput.toLocaleDateString('es-ES', options);

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
                // console.log(this.fecha);
                const fechaSeleccionada = new Date(this.fecha);


                const formattedFechaSeleccionada = fechaSeleccionada.toISOString().substring(0, 10);
                this.listaHitzordu = datuak
                    .filter(cita =>
                        cita.data.includes(formattedFechaSeleccionada)
                    );

                /* console.log(this.listaHitzordu); */

                this.hitzorduSinFiltro = datuak;

                /* console.log(datuak); */

                this.organizarCitasPorHora();


            } catch (error) {
                console.error('Errorea:', error);
            }

            try {
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

            } catch (error) {
                console.error('Errorea:', error);
            }
        },

        async cargaLangile() {
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
                this.langileDatos = datuak;
                /* console.log(this.langileDatos); */

                this.listaLangile = datuak

                    .filter(langile => langile.deleted_at === null && langile.kodea === this.grupoPorDia);
                this.totalLangile = this.listaLangile.length - 1;

            } catch (error) {
                console.error('Errorea: ', error);
            }
        },

        async cargaHorariosPorGrupo(fechaInput) {
            this.grupoPorDia = '';
            this.fechaFormateada = fechaInput;
            const fechaActual = fechaInput ? new Date(this.fechaFormateada) : new Date();

            const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
            const numeroDiaSemana = fechaActual ? fechaActual.getDay() : -1;

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
                    this.cargaLangile();
                } else {
                    console.error('No se encontró el día de trabajo para el grupo');
                }

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
        },

        async createHitzordu() {
            try {
                const eserlekua = this.eserlekuaSortu;
                const data = this.fechaSortu;
                const hasiera_ordua = this.hasiera_orduaSortu;
                const amaiera_ordua = this.amaiera_orduaSortu;
                const izena = this.izenaSortu;
                const telefonoa = this.telefonoaSortu;
                const deskribapena = this.deskribapenaSortu;
                const etxekoa = this.etxekoaSortu;
                const arraySortu = {
                    'eserlekua': eserlekua,
                    'data': data,
                    'hasiera_ordua': hasiera_ordua,
                    'amaiera_ordua': amaiera_ordua,
                    'hasiera_ordua_erreala': null,
                    'amaiera_ordua_erreala': null,
                    'izena': izena,
                    'telefonoa': telefonoa,
                    'deskribapena': deskribapena,
                    'etxekoa': etxekoa,
                    'prezio_totala': null,
                    'id_langilea': null
                };

                console.log(JSON.stringify(arraySortu));

                const response = await fetch('http://localhost/Erronka2/laravel_e2t3/public/api/hitzorduagorde', {
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
                // this.modalVisible = false;
                this.$emit('close')
                this.cargaHitzordu();
            } catch (error) {
                console.log('Errorea: ', error);
            }
        },
        async cargaHitzorduDatos(idCita) {
            try {
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

                this.datosCitaSeleccionada = datuak
                    .filter(cita => cita.id == idCita);
                console.log(this.datosCitaSeleccionada);

            } catch (error) {
                console.error('Errorea:', error);
            }
        },

        async ezabHitzordu(id) {
            try {
                const response = await fetch('http://localhost/Erronka2/laravel_e2t3/public/api/hitzorduaezabatu/' + id, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    body: JSON.stringify(id),
                });

                alert('Ondo ezabatuta');
                console.log(this.hitzorduId);
            } catch (error) {

            }
        },

        async updateHitzordu() {
            try {
                const id = this.idCitaSeleccionada[0];
                const eserlekua = this.datosCitaSeleccionada.find(cita => cita.id === this.idCitaSeleccionada[0]).eserlekua;
                const data = this.datosCitaSeleccionada.find(cita => cita.id === this.idCitaSeleccionada[0]).data;
                const hasiera_ordua = this.datosCitaSeleccionada.find(cita => cita.id === this.idCitaSeleccionada[0]).hasiera_ordua;
                const amaiera_ordua = this.datosCitaSeleccionada.find(cita => cita.id === this.idCitaSeleccionada[0]).amaiera_ordua;
                const hasiera_ordua_erreala = this.datosCitaSeleccionada.find(cita => cita.id === this.idCitaSeleccionada[0]).hasiera_ordua_erreala;
                const amaiera_ordua_erreala = this.datosCitaSeleccionada.find(cita => cita.id === this.idCitaSeleccionada[0]).amaiera_ordua_erreala;
                const izena = this.datosCitaSeleccionada.find(cita => cita.id === this.idCitaSeleccionada[0]).izena;
                const telefonoa = this.datosCitaSeleccionada.find(cita => cita.id === this.idCitaSeleccionada[0]).telefonoa;
                const deskribapena = this.datosCitaSeleccionada.find(cita => cita.id === this.idCitaSeleccionada[0]).deskribapena;
                const etxekoa = this.datosCitaSeleccionada.find(cita => cita.id === this.idCitaSeleccionada[0]).etxekoa;
                const prezio_totala = this.datosCitaSeleccionada.find(cita => cita.id === this.idCitaSeleccionada[0]).prezio_totala;
                var id_langilea = "";
                if (this.langileUpdate != "") {
                    id_langilea = this.langileUpdate;
                } else {
                    id_langilea = this.datosCitaSeleccionada.find(cita => cita.id === this.idCitaSeleccionada[0]).id_langilea;
                }
                const arrayActu = {
                    'id': id,
                    'eserlekua': eserlekua,
                    'data': data,
                    'hasiera_ordua': hasiera_ordua,
                    'amaiera_ordua': amaiera_ordua,
                    'hasiera_ordua_erreala': hasiera_ordua_erreala,
                    'amaiera_ordua_erreala': amaiera_ordua_erreala,
                    'izena': izena,
                    'telefonoa': telefonoa,
                    'deskribapena': deskribapena,
                    'etxekoa': etxekoa,
                    'prezio_totala': prezio_totala,
                    'id_langilea': id_langilea,
                };

                console.log(arrayActu);

                const response = await fetch('http://localhost/Erronka2/laravel_e2t3/public/api/hitzorduaeguneratu/' + id, {
                    // const response = await fetch('https://www.talde3.edu:8081/Erronka2/laravel_e2t3/public/api/taldeaezabatu/' + this.arrayKodea[i], {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    body: JSON.stringify(arrayActu),
                });

                alert('Ondo Updated');
            } catch (error) {
                console.log('Errorea: ', error);
            }
        }


    },
    mounted() {
        this.fecha = this.lortuData();
        this.obtenerFechaSeleccionada({ target: { value: undefined } }); // Llamar obtenerFechaSeleccionada al cargar la página
        this.cargaHitzordu();
        this.cargarDatos();



        // Actualizar fechaFormateada con la fecha actual
        const fechaActual = new Date();
        const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
        this.fechaFormateada = fechaActual.toLocaleDateString('es-ES', options);
        /* console.log(this.fechaFormateada); */

    },
    watch: {
        fecha: function (fecha) {
            this.cargaHorariosPorGrupo(fecha);
        }
    }
});