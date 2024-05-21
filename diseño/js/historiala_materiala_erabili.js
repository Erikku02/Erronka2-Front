
Vue.component('nav-component', {
    template: `
        <nav class="navbar bg-body-tertiary fixed-top">
            <div class="container d-flex align-items-center">
                <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar"
                    aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <a class="navbar-brand mx-auto h3 d-flex d-inline fs-2" href="#">
                {{ translations[selectedLanguage].nav.hist_mate }}
                </a>

                <!-- Barra de navegacion fija -->
                <i class="bi bi-box-arrow-right h3" @click="borrarCookies()"></i>
                <div class="offcanvas offcanvas-start" tabindex="-1" id="offcanvasNavbar"
                    aria-labelledby="offcanvasNavbarLabel">
                    <div class="offcanvas-header">
                        <h5 class="offcanvas-title" id="offcanvasNavbarLabel"></h5>
                        <img src="../img/sj.png" alt="Logo" width="200" height="60">
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
                                    <li v-if="esProfesor === true"><a class="dropdown-item" href="historiala_produktu_mugimenduak.html">{{ translations[selectedLanguage].nav.hist_produ }}</a></li>
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
                                    <li v-if="esProfesor === true"><a class="dropdown-item" href="historiala_materiala_erabili.html">{{ translations[selectedLanguage].nav.hist_mate }}</a></li>
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
                            <li class="nav-item dropdown mb-3" v-if="esProfesor === true">
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
                            <li class="nav-item dropdown mb-3" v-if="esProfesor === true">
                                <a class="nav-link link-info fs-5 fw-bold text-light" href="erabiltzaileak.html"
                                    role="button" aria-expanded="false">
                                    <i class="bi bi-person-vcard m-2"></i>
                                    {{ translations[selectedLanguage].nav.login_usuarios }}
                                </a>
                            </li>
                        </ul>
                        <hr class="border border-white">
                        <ul class="pt-3">
                            <li v-if="selectedLanguage === 'es'" 
                                class="d-flex justify-content-center pe-5">
                                <a @click="changeLanguageAndClose('es')" 
                                    class="text-white pe-2" 
                                    style="text-decoration: underline;" >ES </a> 
                                <p class="text-white"> / </p>
                                <a @click="changeLanguageAndClose('eus')"
                                    class="text-white ps-2"
                                    style="text-decoration: none;">EUS</a>
                            </li>
                            <li v-if="selectedLanguage === 'eus'" 
                                class="d-flex justify-content-center pe-5">
                                <a @click="changeLanguageAndClose('es')" 
                                    class="text-white pe-2"  
                                    style="text-decoration: none;">ES </a> 
                                <p class="text-white"> / </p>
                                <a @click="changeLanguageAndClose('eus')"
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
            selectedLanguage: window.selectedLanguage || 'es', // si window. esta definido se usa ese, sino el valor por defecto
            translations: translations,
            lang: '',
            esProfesor: false,
            esAlumno: false
        };
    },
    methods: {
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
        },

        checkCookies () {
            this.esProfesor = document.cookie == "rol=ir";
            this.esAlumno = document.cookie == "rol=ik";
           
            if (document.cookie == "") {
                window.location.assign("./login.html");
            } 

            if (document.cookie == "rol=ik") {
                window.location.assign("./login.html");
            }
        },

        borrarCookies (){
            document.cookie = "rol=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/Erronka2-Front/dise%C3%B1o/html;";
            if (document.cookie == "") {
                window.location.assign("./login.html");
            } 
        },
    },
    mounted() {
        this.checkCookies();
    }

});

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

        //Cookies
        esProfesor: false,
        esAlumno: false,
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
        checkCookies () {
            this.esProfesor = document.cookie == "rol=ir";
            this.esAlumno = document.cookie == "rol=ik";
           
            if (document.cookie == "") {
                window.location.assign("./login.html");
            } 

            if (document.cookie == "rol=ik") {
                window.location.assign("./login.html");
            }
        }
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
        this.checkCookies();
    }
});
