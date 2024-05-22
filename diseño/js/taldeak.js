Vue.component('nav-component', {
    template: `
        <nav class="navbar bg-body-tertiary fixed-top">
            <div class="container d-flex align-items-center">
                <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar"
                    aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <a class="navbar-brand mx-auto h3 d-flex d-inline fs-2" href="#">
                {{ translations[selectedLanguage].nav.grupos }}
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
                                <a class="nav-link dropdown-toggle link-info fs-5 fw-bold text-light" href="#" role="button"
                                    data-bs-toggle="dropdown" aria-expanded="false">
                                    <i class="bi bi-scissors m-2"></i>
                                    {{ translations[selectedLanguage].nav.tratamientos }}
                                </a>
                                <ul class="dropdown-menu">
                                    <li><a class="dropdown-item" href="tratamenduak.html">{{ translations[selectedLanguage].nav.gestion_trata }}</a></li>
                                    <li v-if="esProfesor === true"><a class="dropdown-item" href="historiala_tratamenduak.html">{{ translations[selectedLanguage].nav.hist_trata }}</a></li>
                                </ul>
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
        arrayKodea: [],
        kodeaSortu: "",
        izenaSortu: "",
        listaTalde: [],
        listaTaldeSinFiltro: [],
        /* IDIOMAS */
        selectedLanguage: 'es',
        // languageStrings: {},
        translations: translations,

        selectAllTalde: false,
        visibleActu: true,
        
        //Cookies
        esAlumno: false,
        esProfesor: false,
    },
    methods: {
        async cargaTalde() {
            try {
                const response = await fetch(window.ruta + 'taldearuta', {
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
                this.listaTaldeSinFiltro = datuak;
                this.listaTalde = datuak

                    .filter(talde => talde.deleted_at === null || talde.deleted_at === "0000-00-00 00:00:00");
                console.log(datuak);

                this.ordenarPorKodea(); // para que los datos esten ordenados por defecto

            } catch (error) {
                console.error('Errorea:', error);
            }
        },
        async createTalde() {
            try {
                const kodea = this.kodeaSortu;
                const izena = this.izenaSortu;

                // Buscar si el grupo ya existe y está eliminado lógicamente
                const grupoExistente = this.listaTaldeSinFiltro.find(talde => talde.kodea == kodea && talde.deleted_at !== null);

                if (grupoExistente) {
                    // Reactivar el grupo (actualizar deleted_at a null y cambiar el nombre si es necesario)
                    await this.reactivarTalde(grupoExistente.kodea); // Laravel no lo permite, hay que cambiar la db y añadir una PK autoincremental
                } else if (this.listaTalde.some(talde => talde.kodea === kodea)) {
                    // Mostrar mensaje de error si el grupo ya existe y no está eliminado lógicamente
                    console.log('El grupo ya existe. Por favor, introduce un código diferente');
                    return;
                }
                const arraySortu = {
                    "kodea": kodea,
                    "izena": izena
                };

                console.log(JSON.stringify(arraySortu));

                const response = await fetch(window.ruta + 'taldeagorde', {
                    // const response = await fetch('https://www.talde3.edu:8081/Erronka2/laravel_e2t3/public/api/taldeagorde', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json', // Indicar el tipo de contenido como JSON
                        'Access-Control-Allow-Origin': '*'
                    },
                    body: JSON.stringify(arraySortu), // Convertir el objeto JSON a una cadena JSON
                });

                if (!response.ok) {
                    console.log('Errorea sortzerakoan', error);
                    throw new Error('Errorea sortzerakoan');
                }

                console.log('Sortu da');
                this.cargaTalde();
                this.kodeaSortu = "";
                this.izenaSortu = "";
                // location.reload();


            } catch (error) {
                console.log('Errorea: ', error);
            }
        },

        /* FIXME: Alert: No se puede reactivar el grupo, ya que no existe o no está eliminado lógicamente. 
        Mirar por que no se puede poner a null el deleted_at de un grupo "borrado*/
        async reactivarTalde(kodeaParam) {
            try {
                console.log(kodeaParam);
                const izena = this.izenaSortu;

                console.log(kodeaParam);
                console.log(izena);
                // Buscar si el grupo ya existe en la lista y está eliminado lógicamente
                const grupoExistente = this.listaTalde.find(talde => talde.kodea === kodeaParam && talde.deleted_at !== null);

                if (grupoExistente) {
                    const arrayActu = {
                        "kodea": kodea,
                        "izena": izena,
                        "deleted_at": null
                    }
                    console.log(arrayActu);
                    // Actualizar deleted_at a null y cambiar el nombre si es necesario
                    // grupoExistente.deleted_at = null;
                    // grupoExistente.izena = this.izenaSortu;

                    // Realizar la actualización en la base de datos
                    const response = await fetch(window.ruta + `taldeaeguneratu/${kodea}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                            'Access-Control-Allow-Origin': '*'
                        },
                        body: JSON.stringify(arrayActu), // Enviar el objeto actualizado
                    });

                    if (!response.ok) {
                        console.log('Errorea taldea berrezartzeko');
                        throw new Error('Errorea taldea berrezartzeko');
                    }

                    console.log('Grupo reactivado/reactivado');
                    await this.cargaTalde();
                    location.reload();
                } else {
                    console.log('No se puede reactivar el grupo, ya que no existe o no está eliminado lógicamente.');
                }
            } catch (error) {
                console.log('Errorea: ', error);
            }
        },
        async actuTalde() {
            try {
                const kodea = this.arrayKodea[0];
                const izena = this.listaTalde.find(talde => talde.kodea === this.arrayKodea[0]).izena;
                // const izena = this.listaTalde.map(talde => talde.izena).join(', ');
                const arrayActu = {
                    "kodea": kodea,
                    "izena": izena
                };

                const response = await fetch(window.ruta + 'taldeaeguneratu/' + kodea, {
                    // const response = await fetch('https://www.talde3.edu:8081/Erronka2/laravel_e2t3/public/api/taldeaeguneratu/' + kodea, {
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
                await this.cargaTalde();
                location.reload();
            } catch (error) {
                console.log('Errorea: ', error);
            }
        },
        // async ezabTalde() {
        //     try {
        //         for (var i = 0; i < this.arrayKodea.length; i++) {
        //             const response = await fetch(window.ruta + 'taldeaezabatu/' + this.arrayKodea[i], {
        //                 // const response = await fetch('https://www.talde3.edu:8081/Erronka2/laravel_e2t3/public/api/taldeaezabatu/' + this.arrayKodea[i], {
        //                 method: 'PUT',
        //                 headers: {
        //                     'Content-Type': 'application/json',
        //                     'Access-Control-Allow-Origin': '*'
        //                 },
        //                 body: JSON.stringify(this.arrayKodea[i]),
        //             });
        //         }

        //         // if(!response.ok){
        //         //   console.log('Errorea eguneratzerakoan');
        //         //   throw new Error('Errorea eguneratzerakoan');
        //         // }

        //         console.log('Ondo ezabatuta');
        //         await this.cargaTalde();
        //         location.reload();
        //     } catch (error) {
        //         console.log('Errorea: ', error);
        //     }
        // }, 
        
        
        async ezabTalde() {
            try {
                for (var i = 0; i < this.arrayKodea.length; i++) {
                    const responseComprobar = await fetch(window.ruta + 'taldeaComprobarLangileak/' + this.arrayKodea[i]);
                    const dataComprobar = await responseComprobar.json();
        
                    if (dataComprobar.message === 'Este grupo tiene langileak activos') {
                        const confirmacion = confirm(dataComprobar.message + '. ¿Seguro que quieres eliminarlo?');
                        if (!confirmacion) continue; // Si el usuario cancela, continuar con la siguiente iteración del bucle
                    }
        
                    const responseEliminar = await fetch(window.ruta + 'taldeaezabatu/' + this.arrayKodea[i], {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                            'Access-Control-Allow-Origin': '*'
                        },
                        body: JSON.stringify(this.arrayKodea[i]),
                    });
        
                    const dataEliminar = await responseEliminar.json();
                    console.log(dataEliminar.message);
                }
        
                console.log('Ondo ezabatuta');
                await this.cargaTalde();
                location.reload();
            } catch (error) {
                console.error('Errorea:', error);
            }
        },
        
        alphanumCompare(a, b) {
            const chunkRegExp = /(\D+|\d+)/g;

            // Función auxiliar para comparar partes alfanuméricas
            const compareChunks = (chunkA, chunkB) => {
                const isDigitA = !isNaN(chunkA);
                const isDigitB = !isNaN(chunkB);

                if (isDigitA && isDigitB) {
                    return parseInt(chunkA, 10) - parseInt(chunkB, 10);
                } else {
                    return chunkA.localeCompare(chunkB);
                }
            };

            const chunksA = String(a).match(chunkRegExp);
            const chunksB = String(b).match(chunkRegExp);

            const minLength = Math.min(chunksA.length, chunksB.length);

            for (let i = 0; i < minLength; i++) {
                const result = compareChunks(chunksA[i], chunksB[i]);
                if (result !== 0) {
                    return result;
                }
            }

            return chunksA.length - chunksB.length;
        },
        ordenarPorKodea() {
            this.ordenKodea = this.ordenKodea === 'asc' ? 'desc' : 'asc'; // no hace falta
            this.listaTalde.sort((a, b) => {
                return this.ordenKodea === 'asc' ?
                    this.alphanumCompare(a.kodea, b.kodea) :
                    this.alphanumCompare(b.kodea, a.kodea);
            });
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

        selectAllTaldeak() {
            if (this.selectAllTalde) {
                // Si el checkbox de seleccionar todo está marcado,
                // se añaden todos los IDs a arrayId
                this.arrayKodea = this.listaTalde.map(talde => talde.kodea);
            } else {
                // Si el checkbox de seleccionar todo está desmarcado,
                // se vacía arrayId
                this.arrayKodea = [];
            }

            // Marcar o desmarcar todos los checkboxes de la tabla
            const checkboxes = document.querySelectorAll('input[type="checkbox"]');
            checkboxes.forEach(checkbox => {
                checkbox.checked = this.selectAllTalde;
            });
        }
    },
    mounted() {
        // Llama a tu función cargarPagina cuando el componente se monta
        this.cargaTalde();
        this.checkCookies();
    },
    watch: {
        arrayKodea() {
            if (this.arrayKodea.length > 1) {
                this.visibleActu = false;
            } else {
                this.visibleActu = true;
            }
        }
    }
});