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


Vue.component('nav-component', {
    template: `
        <nav class="navbar bg-body-tertiary fixed-top">
            <div class="container d-flex align-items-center">
                <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar"
                    aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <a class="navbar-brand mx-auto h3 d-flex d-inline fs-2" href="#">
                {{ translations[selectedLanguage].nav.productos }}
                </a>

                <!-- Barra de navegacion fija -->
                <i class="bi bi-box-arrow-right h3"></i>
                <div class="offcanvas offcanvas-start" tabindex="-1" id="offcanvasNavbar"
                    aria-labelledby="offcanvasNavbarLabel">
                    <div class="offcanvas-header">
                        <h5 class="offcanvas-title" id="offcanvasNavbarLabel"></h5>
                        <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                    </div>

                    <!-- Barra de navegacion "oculta" -->
                    <div class="offcanvas-body">
                        <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
                            <!-- Citas -->
                            <li class="nav-item dropdown mb-3">
                                <a class="nav-link dropdown-toggle link-info fs-5 fw-bold text-light" href="#" role="button"
                                    data-bs-toggle="dropdown" aria-expanded="false">
                                    <i class="bi bi-calendar3 m-2"></i>
                                    {{ translations[selectedLanguage].nav.citas }}
                                </a>
                                <ul class="dropdown-menu">
                                    <li><a class="dropdown-item" href="hitzorduak.html">{{ translations[selectedLanguage].nav.gestion_citas }}</a></li>
                                    <li><a class="dropdown-item" href="ticket.html">{{ translations[selectedLanguage].nav.tickets }}</a></li>
                                </ul>
                            </li>

                            <!-- Productos -->
                            <li class="nav-item dropdown mb-3">
                                <a class="nav-link dropdown-toggle link-info fs-5 fw-bold text-light" href="#" role="button"
                                    data-bs-toggle="dropdown" aria-expanded="false">
                                    <i class="bi bi-tags-fill m-2"></i>
                                    {{ translations[selectedLanguage].nav.productos }}
                                </a>
                                <ul class="dropdown-menu">
                                    <li><a class="dropdown-item" href="produktu_mugimenduak.html">{{ translations[selectedLanguage].nav.extraer_produ }}</a></li>
                                    <li><a class="dropdown-item" href="produktuak.html">{{ translations[selectedLanguage].nav.gestionar_produ }}</a></li>
                                    <li><a class="dropdown-item" href="kategoriak.html">{{ translations[selectedLanguage].nav.gestionar_categ }}</a></li>
                                    <li><a class="dropdown-item" href="historiala_produktu_mugimenduak.html">{{ translations[selectedLanguage].nav.hist_produ }}</a></li>
                                </ul>
                            </li>

                            <!-- Material -->
                            <li class="nav-item dropdown mb-3">
                                <a class="nav-link dropdown-toggle link-info fs-5 fw-bold text-light" href="#" role="button"
                                    data-bs-toggle="dropdown" aria-expanded="false">
                                    <i class="bi bi-palette2 m-2"></i>
                                    {{ translations[selectedLanguage].nav.material }}
                                </a>
                                <ul class="dropdown-menu">
                                    <li><a class="dropdown-item" href="materiala.html">{{ translations[selectedLanguage].nav.gestion_mate }}</a></li>
                                    <li><a class="dropdown-item" href="materiala_erabili.html">{{ translations[selectedLanguage].nav.ext_dev_mate }}</a>
                                    </li>
                                    <li><a class="dropdown-item" href="historiala_materiala_erabili.html">{{ translations[selectedLanguage].nav.hist_mate }}</a></li>
                                </ul>
                            </li>


                            <!-- Tratamientos -->
                            <li class="nav-item dropdown mb-3">
                                <a class="nav-link link-info fs-5 fw-bold text-light" href="tratamenduak.html" role="button"
                                    aria-expanded="false">
                                    <i class="bi bi-scissors m-2"></i>
                                    {{ translations[selectedLanguage].nav.tratamientos }}
                                </a>
                            </li>

                            <!-- Turnos -->
                            <li class="nav-item dropdown mb-3">
                                <a class="nav-link dropdown-toggle link-info fs-5 fw-bold text-light" href="#" role="button"
                                    data-bs-toggle="dropdown" aria-expanded="false">
                                    <i class="bi bi-calendar-check-fill m-2"></i>
                                    {{ translations[selectedLanguage].nav.turnos }}
                                </a>
                                <ul class="dropdown-menu">
                                    <li><a class="dropdown-item" href="txandak.html">{{ translations[selectedLanguage].nav.asignar_turno }}</a></li>
                                    <li><a class="dropdown-item" href="gaurko_txandak.html">{{ translations[selectedLanguage].nav.turnos_hoy }}</a></li>
                                </ul>
                            </li>

                            <!-- Grupos -->
                            <li class="nav-item dropdown mb-3">
                                <a class="nav-link dropdown-toggle link-info fs-5 fw-bold text-light" href="#" role="button"
                                    data-bs-toggle="dropdown" aria-expanded="false">
                                    <i class="bi bi-people-fill m-2"></i>
                                    {{ translations[selectedLanguage].nav.grupos }}
                                </a>
                                <ul class="dropdown-menu">
                                    <li><a class="dropdown-item" href="taldeak.html">{{ translations[selectedLanguage].nav.gestion_grupos }}</a></li>
                                    <li><a class="dropdown-item" href="ordutegiak.html">{{ translations[selectedLanguage].nav.horario_grupos }}</a></li>
                                </ul>
                            </li>

                            <!-- Usuarios -->
                            <li class="nav-item dropdown mb-3">
                                <a class="nav-link link-info fs-5 fw-bold text-light" href="langileak.html" role="button"
                                    aria-expanded="false">
                                    <i class="bi bi-person-fill m-2"></i>
                                    {{ translations[selectedLanguage].nav.usuarios }}
                                </a>
                            </li>

                            <!-- Ficha Clientes -->
                            <li class="nav-item dropdown mb-3">
                                <a class="nav-link link-info fs-5 fw-bold text-light" href="bezero_fitxak.html"
                                    role="button" aria-expanded="false">
                                    <i class="bi bi-person-vcard m-2"></i>
                                    {{ translations[selectedLanguage].nav.ficha_cliente }}
                                </a>
                            </li>
                        </ul>
                        <hr class="border border-white">
                        <ul class="pt-3">
                            <li v-if="selectedLanguage === 'es'" 
                                class="d-flex justify-content-center pe-5">
                                <a @click="changeLanguage('es')" 
                                    class="text-white pe-2" 
                                    style="text-decoration: underline;" >ES </a> 
                                <p class="text-white"> / </p>
                                <a @click="changeLanguage('eus')"
                                    class="text-white ps-2"
                                    style="text-decoration: none;">EUS</a>
                            </li>
                            <li v-if="selectedLanguage === 'eus'" 
                                class="d-flex justify-content-center pe-5">
                                <a @click="changeLanguage('es')" 
                                    class="text-white pe-2"  
                                    style="text-decoration: none;">ES </a> 
                                <p class="text-white"> / </p>
                                <a @click="changeLanguage('eus')"
                                    class="text-white ps-2"
                                    style="text-decoration: underline;">EUS</a>
                            </li>
                            
                        </ul>
                    </div>
                </div>
            </div>
        </nav> 
    `,
    data() {
        return {
            selectedLanguage: 'es',
            translations: translations,
            lang: '',
        };
    },
    methods: {
        changeLanguage(lang) {
            this.selectedLanguage = lang;
            console.log(this.selectedLanguage);
            console.log(this.translations);
        },
        /* changeLanguageAndClose(lang) {
            // Cerrar la barra de navegación lateral
            const offcanvasNavbar = document.getElementById('offcanvasNavbar');
            const offcanvasInstance = new bootstrap.Offcanvas(offcanvasNavbar);
            offcanvasInstance.hide();

            // Cambiar el idioma
            this.changeLanguage(lang);

            // Enviar la variable al método changeLanguage de la instancia de Vue
            this.$root.changeLanguage(lang);
        }, */
        getTranslation(key) {
            return this.translations[this.selectedLanguage][key] || '';
        }
    },
});


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

        eserlekuKop: [],
        hoursArray: [],
        /* hitzorduArray: [], */
        /* datuak2: [], */
        listaHitzordu: [], // lista de citas con todos sus datos
        hitzorduSinFiltro: [],
        listaLangile: [], // lista de langilea
        listaOrdutegia: [],
        listaTratamenduSinFiltro: [],
        listaTratamendua: [],

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

        generarTicket: false,
        tratamientosSeleccionados: [],
        precioTotal: 0,

        idTratSelect: [], // lista de los id de tratamientos que se seleccionan
        /* IDIOMAS */
        selectedLanguage: 'es',
        // languageStrings: {},
        translations: translations,
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
                const response = await fetch(window.ruta + 'hitzorduaruta', {
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
                const response2 = await fetch(window.ruta + 'langilearuta', {
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

                const diaGrupo = this.listaOrdutegia.find(ordutegia => ordutegia.eguna === numeroDiaSemana && ordutegia.deleted_at === null);

                if (diaGrupo) {
                    this.grupoPorDia = diaGrupo.kodea;
                    /* this.cargaLangile(); */
                } else {
                    console.log('No se encontró el día de trabajo para el grupo');
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

        // encuentra citas para una hora y asiento específicos
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

                const response = await fetch(window.ruta + 'hitzorduagorde', {
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
                const response = await fetch(window.ruta + 'hitzorduaruta', {
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
                const response = await fetch(window.ruta + 'hitzorduaezabatu/' + id, {
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
                // const prezio_totala = this.datosCitaSeleccionada.find(cita => cita.id === this.idCitaSeleccionada[0]).prezio_totala;
                const prezio_totala = this.datosCitaSeleccionada.find(cita => cita.id === this.precioTotal);
                // const prezio_totala = this.precioTotal;
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
                    // 'prezio_totala': prezio_totala,
                    'prezio_totala': this.precioTotal,
                    'id_langilea': id_langilea,
                };

                console.log(arrayActu);

                const response = await fetch(window.ruta + 'hitzorduaeguneratu/' + id, {
                    // const response = await fetch('https://www.talde3.edu:8081/Erronka2/laravel_e2t3/public/api/taldeaezabatu/' + this.arrayKodea[i], {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    body: JSON.stringify(arrayActu),
                });

                alert('Ondo Updated');

                this.createTicketLerroa();
            } catch (error) {
                console.log('Errorea: ', error);
            }
        },

        async cargaTratamendu() {
            try {
                const response = await fetch(window.ruta + 'tratamenduaruta', {
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
                console.log(datuak);
                this.listaTratamenduSinFiltro = datuak;
                this.listaTratamendua = datuak

                    .filter(tratamendu => tratamendu.deleted_at === null || tratamendu.deleted_at === "0000-00-00 00:00:00");
                console.log(this.listaTratamendua);

            } catch (error) {
                console.error('Errorea:', error);
            }
        },

        // Función para calcular el precio total basado en los tratamientos seleccionados
        calcularPrecioTotal(idSelect) {
            /* console.log(this.idTratSelect); 
            console.log(idSelect); */
            // Filtrar los valores undefined del array idTratSelect
            this.idTratSelect = this.idTratSelect.filter(id => id !== undefined);

            this.precioTotal = this.tratamientosSeleccionados.reduce((total, tratamiento) => {
                if (this.etxekoaSortu === 'e') {
                    return total + parseFloat(tratamiento.etxeko_prezioa);
                } else {
                    return total + parseFloat(tratamiento.kanpoko_prezioa);
                }
            }, 0);

            if (this.idTratSelect.includes(idSelect)) {
                // si el tratamiento ya esta seleccionado, eliminarlo del array
                const index = this.idTratSelect.indexOf(idSelect);
                if (index > -1) {
                    this.idTratSelect.splice(index, 1);
                }
            } else {
                // si el tratamiento no esta seleccionado, agregarlo al array
                this.idTratSelect.push(idSelect);
            }

            /* console.log(this.idTratSelect);
            console.log(idSelect); */
        },

        async createTicketLerroa() {
            try {

                // Hacer un POST por cada tratamiento
                for (const idTratamiento of this.idTratSelect) {
                    // Obtener el precio del tratamiento segun etxekoaSortu
                    let precioTratamiento;
                    if (this.etxekoaSortu === 'e') {
                        precioTratamiento = this.listaTratamendua.find(tratamiento => tratamiento.id === idTratamiento)?.etxeko_prezioa;
                    } else {
                        precioTratamiento = this.listaTratamendua.find(tratamiento => tratamiento.id === idTratamiento)?.kanpoko_prezioa;
                    }

                    // verificar que se ha encontrado el precio del tratamiento
                    if (!precioTratamiento) {
                        console.error('No se encontró el precio del tratamiento con ID: ', idTratamiento);
                        continue;
                    }

                    // Extraer el primer elemento del array id_hitzordua
                    const idHitzordua = this.idCitaSeleccionada[0];

                    // crear el objeto con los datos a enviar 
                    const arraySortu = {
                        'id_hitzordua': idHitzordua,
                        'id_tratamendua': idTratamiento,
                        'prezioa': precioTratamiento
                    };

                    console.log(JSON.stringify(arraySortu));

                    const response = await fetch(window.ruta + 'ticketlerroagorde', {
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

                    console.log('ticket lerroa sortuta');
                }
            } catch (error) {
                console.log('Errorea: ', error);
            }
        },
        changeLanguage(lang) {
            this.selectedLanguage = lang;
            console.log(this.selectedLanguage);
        },


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
        },

        // Observador que se activa cuando cambia la selección de tratamientos
        tratamientosSeleccionados: {
            handler() {
                // Calcular el precio total al cambiar la selección de tratamientos
                this.calcularPrecioTotal();
            },
            deep: true // Observar cambios profundos en el array de tratamientos seleccionados
        }
    }
});