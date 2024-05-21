
Vue.component('nav-component', {
    template: `
        <nav class="navbar bg-body-tertiary fixed-top">
            <div class="container d-flex align-items-center">
                <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar"
                    aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <a class="navbar-brand mx-auto h3 d-flex d-inline fs-2" href="#">
                {{ translations[selectedLanguage].nav.login_usuarios }}
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

            // if (document.cookie == "rol=ik") {
            //     window.location.assign("./login.html");
            // }
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
        selectedCheckbox: null, // Esta variable almacenará la ID del checkbox seleccionado
        listaErabiltzaile: [],
        arrayErabiltzaile: [],
        erabiltzaileaSortu: "",
        pasahitzaSortu: "",
        rolaSortu: "",
        //ordenNombre: 'asc', // para ordenar los datos
        //ordenApellidos: 'asc',
        /* IDIOMAS */
        selectedLanguage: 'es',
        // languageStrings: {},
        translations: translations,
        esProfesor: false,
        esAlumno: false,
        visibleActu: true,
        selectAllErabil: false
    },
    methods: {
        async cargaErabiltzaile() {
            try {
                const response = await fetch(window.ruta + 'erabiltzailearuta', {
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
                // console.log(datuak);
                this.listaErabiltzaile = datuak
                    .filter(erabiltzaile => erabiltzaile.deleted_at === null || erabiltzaile.deleted_at === "0000-00-00 00:00:00");

                // this.ordenarPorNombre();
            } catch (error) {
                console.error('Errorea: ', error);
            }
        },
        async createErabiltzaile() {
            try {
                const username = this.erabiltzaileaSortu;
                const pasahitza = this.pasahitzaSortu;
                const rola = this.rolaSortu;
                const arraySortu = {
                    "username": username,
                    "pasahitza": pasahitza,
                    "rola": rola
                };

                console.log(JSON.stringify(arraySortu));

                const response = await fetch(window.ruta + 'erabiltzaileagorde', {
                    // const response = await fetch('https://www.talde3-back.edu/Erronka2/laravel_e2t3/public/api/langileagorde', {
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

                console.log('Sortu da');
                this.cargaErabiltzaile();
                // location.reload();
                this.erabiltzaileaSortu = "";
                this.pasahitzaSortu = "";
                this.rolaSortu = "";

            } catch (error) {
                console.log("Errorea: ", error);
            }
        },

        async actuErabiltzaile() {
            try {
                const username = this.listaErabiltzaile.find(erabiltzaile => erabiltzaile.username === this.arrayErabiltzaile[0]).username;
                const pasahitza = this.listaErabiltzaile.find(erabiltzaile => erabiltzaile.username === this.arrayErabiltzaile[0]).pasahitza;
                const rola = this.listaErabiltzaile.find(erabiltzaile => erabiltzaile.username === this.arrayErabiltzaile[0]).rola;
                const arrayActu = {
                    "username": username,
                    "pasahitza": pasahitza,
                    "rola": rola
                }

                const response = await fetch(window.ruta + 'erabiltzaileaeguneratu/' + username, {
                    // const response = await fetch('https://www.talde3-back.edu/Erronka2/laravel_e2t3/public/api/langileaeguneratu/' + id, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    body: JSON.stringify(arrayActu),
                });

                if (!response.ok) {
                    console.log('Errorea eguneratzerakoan');
                    throw new Error('Errorea eguneratzerakoan');
                }

                console.log('Ondo eguneratuta');
                await this.cargaErabiltzaile();
                location.reload();

            } catch (error) {
                console.log('Errorea: ', error);
            }
        },
        async ezabErabiltzaile() {
            try {
                for (var i = 0; i < this.arrayErabiltzaile.length; i++) {
                    const response = await fetch(window.ruta + 'erabiltzaileaezabatu/' + this.arrayErabiltzaile[i], {
                        // const response = await fetch('https://www.talde3.edu:8081/Erronka2/laravel_e2t3/public/api/taldeaezabatu/' + this.arrayKodea[i], {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                            'Access-Control-Allow-Origin': '*'
                        },
                        body: JSON.stringify(this.arrayErabiltzaile[i]),
                    });
                }


                // if(!response.ok){
                //   console.log('Errorea eguneratzerakoan');
                //   throw new Error('Errorea eguneratzerakoan');
                // }

                console.log('Ondo ezabatuta');
                await this.cargaErabiltzaile();
                location.reload();
            } catch (error) {
                console.log('Errorea: ', error);
            }
        },
          
        changeLanguage(lang) {
            this.selectedLanguage = lang;
            console.log(this.selectedLanguage);
        },

        checkCookies () {
            this.esProfesor = document.cookie == "rol=ir";
            this.esAlumno = document.cookie == "rol=ik";

            if (document.cookie == "") {
                window.location.assign("./login.html");
            } 

            // if (document.cookie == "rol=ik") {
            //     window.location.assign("./login.html");
            // } 
        },
        selectAllErabiltzaileak() {
            if (this.selectAllErabil) {
                // Si el checkbox de seleccionar todo está marcado,
                // se añaden todos los IDs a arrayId
                this.arrayErabiltzaile = this.listaErabiltzaile.map(erabiltzaile => erabiltzaile.username);
            } else {
                // Si el checkbox de seleccionar todo está desmarcado,
                // se vacía arrayId
                this.arrayErabiltzaile = [];
            }

            // Marcar o desmarcar todos los checkboxes de la tabla
            const checkboxes = document.querySelectorAll('input[type="checkbox"]');
            checkboxes.forEach(checkbox => {
                checkbox.checked = this.selectAllErabil;
            });
        },
        
    },
    mounted() {
        // Llama a tu función cargarPagina cuando el componente se monta
        this.cargaErabiltzaile();
        // this.ordenarPorNombre();
        this.checkCookies();

    },
    watch: {
        arrayErabiltzaile() {
            if (this.arrayErabiltzaile.length > 1) {
                this.visibleActu = false;
            } else {
                this.visibleActu = true;
            }
        }
    }
});