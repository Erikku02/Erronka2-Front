
Vue.component('nav-component', {
    template: `
        <nav class="navbar bg-body-tertiary fixed-top">
            <div class="container d-flex align-items-center">
                <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar"
                    aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <a class="navbar-brand mx-auto h3 d-flex d-inline fs-2" href="#">
                {{ translations[selectedLanguage].nav.ficha_cliente }}
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
        arrayId: [],
        asd: "",
        izenaSortu: "",
        abizenaSortu: "",
        telefonoaSortu: "",
        sentikorraSortu: "",
        listaFitxa: [],
        listaProduktu: [],
        listaHistorial: [],
        histDataSortu: "",
        histMarkaSortu: "",
        histProduktuSortu: "",
        histKatitateaSortu: "",
        histBolumenaSortu: "",
        histOharraSortu: "",
        historialId: [],
        listaProduktuFilter: [],
        histMarkaUpdate: "",
        histProduktuUpdate: "",
        selectAllFitxa: false,
        selectAllHist: false,
        visibleFitxa: true,
        visibleHist: true,
        /* IDIOMAS */
        selectedLanguage: 'es',
        // languageStrings: {},
        translations: translations,
        errorMessageTop: '',
        statusMessageTop: '',
        errorMessageBotton: '',
        statusMessageBotton: '',

        // Paginar
        itemsPorPagina: 10,
        paginaActual: 1,

        // Ordenar los datos por columna
        ordenColumna: '', // Almacena el nombre de la columna por la que se ordena
        ordenAscendente: true, // Indica si el orden es ascendente o descendente

        // Buscador
        terminoBusqueda: '',
        campoSeleccionado: '',

        //Cookies
        esProfesor: false,
        esAlumno: false,

    },
    computed: {
        // Filtrar los datos basados en el término de búsqueda (busca en los campos izena, abizena, telefonoa)
        itemsFiltradosPaginados() {
            // Busca en todos los datos
            // Filtrar los datos basados en el término de búsqueda
            let itemsFiltrados = this.listaFitxa.filter(item => {
                // Convertir el valor de 'telefonoa' a string y luego buscar en minúsculas
                const izena = item.izena ? item.izena : '';
                const abizena = item.abizena ? item.abizena : '';
                const telefonoa = item.telefonoa ? item.telefonoa.toString() : '';
                return (
                    izena.toLowerCase().includes(this.terminoBusqueda.toLowerCase()) ||
                    abizena.toLowerCase().includes(this.terminoBusqueda.toLowerCase()) ||
                    telefonoa.toLowerCase().includes(this.terminoBusqueda.toLowerCase())
                );
            });


            // Calcular los índices de inicio y fin para la paginación
            const inicio = (this.paginaActual - 1) * this.itemsPorPagina;
            const fin = inicio + this.itemsPorPagina;

            // FIXME: Actualizar la cantidad de páginas
            // this.cantidadPorPaginas = Math.ceil(itemsFiltrados.length / this.itemsPorPagina);

            // Paginar los datos filtrados
            return itemsFiltrados.slice(inicio, fin);
        },
        // Paginar
        cantidadPorPaginas() {
            return Math.ceil(this.listaFitxa.length / this.itemsPorPagina)
        },
        /* itemsPaginados() {
            const inicio = (this.paginaActual - 1) * this.itemsPorPagina;
            const fin = inicio + this.itemsPorPagina;
            console.log(this.listaFitxa.slice(inicio, fin));
            return this.listaFitxa.slice(inicio, fin);
        } */
    },
    methods: {
        cambiarOrden(columna) {
            if (this.ordenColumna === columna) {
                // Si ya está ordenado por esta columna, cambia la dirección
                this.ordenAscendente = !this.ordenAscendente;
            } else {
                // Si es una nueva columna, establece el orden ascendente por defecto
                this.ordenAscendente = true;
                this.ordenColumna = columna;
            }

            // Ahora ordena la lista basándote en la columna seleccionada y la dirección
            this.listaFitxa.sort((a, b) => {
                return this.alphanumCompare(a, b, columna, this.ordenAscendente);
            });
        },
        alphanumCompare(a, b, columna, ordenAscendente) {
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

            // Obtener los valores de la columna especificada para comparar
            const valueA = a[columna];
            const valueB = b[columna];

            // Si los valores son nulos o indefinidos, colocarlos al final (o al principio para el orden descendente)
            if (valueA === null || valueA === undefined) {
                return ordenAscendente ? 1 : -1;
            }
            if (valueB === null || valueB === undefined) {
                return ordenAscendente ? 1 : -1;
            }

            // Obtener las partes alfanumericas de los valores
            const chunksA = String(valueA).match(chunkRegExp);
            const chunksB = String(valueB).match(chunkRegExp);

            // Comparar las partes alfanumericas
            const minLength = Math.min(chunksA.length, chunksB.length);
            for (let i = 0; i < minLength; i++) {
                const result = compareChunks(chunksA[i], chunksB[i]);
                if (result !== 0) {
                    return ordenAscendente ? result : -result;
                }
            }

            return chunksA.length - chunksB.length;
        },
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
        clearMessage() {
            this.errorMessageTop = '';
            this.errorMessageBotton = '';
            this.statusMessageTop = '';
            this.statusMessageBotton = '';
        },
        // para mostrar los mensajes de estado
        showMessage(messageType, message, place) {
            if (place === 'top') {
                if (messageType === 'error') {
                    this.errorMessageTop = message;
                    setTimeout(() => {
                        this.errorMessageTop = '';
                    }, 10000); // 15 segundos
                } else if (messageType === 'status') {
                    this.statusMessageTop = message;
                    setTimeout(() => {
                        this.statusMessageTop = '';
                    }, 10000); // 15 segundos
                }
            } else if (place === 'botton') {
                if (messageType === 'error') {
                    this.errorMessageBotton = message;
                    setTimeout(() => {
                        this.errorMessageBotton = '';
                    }, 10000); // 15 segundos
                } else if (messageType === 'status') {
                    this.statusMessageBotton = message;
                    setTimeout(() => {
                        this.statusMessageBotton = '';
                    }, 10000); // 15 segundos
                }
            }

        },
        changeLanguage(lang) {
            this.selectedLanguage = lang;
            console.log(this.selectedLanguage);
        },
        selectAllFitxaId() {
            if (this.selectAllFitxa) {
                // Si el checkbox de seleccionar todo está marcado,
                // se añaden todos los IDs a arrayId
                this.arrayId = this.listaFitxa.map(fitxa => fitxa.id);
            } else {
                // Si el checkbox de seleccionar todo está desmarcado,
                // se vacía arrayId
                this.arrayId = [];
            }

            // Marcar o desmarcar todos los checkboxes de la tabla
            const checkboxes = document.querySelectorAll('input[type="checkbox"]');
            checkboxes.forEach(checkbox => {
                checkbox.checked = this.selectAllFitxa;
            });
        },
        selectAllHistId() {
            if (this.selectAllHist) {
                // Si el checkbox de seleccionar todo está marcado,
                // se añaden todos los IDs a arrayId
                this.historialId = this.listaHistorial.map(historial => historial.id);
            } else {
                // Si el checkbox de seleccionar todo está desmarcado,
                // se vacía arrayId
                this.historialId = [];
            }

            // Marcar o desmarcar todos los checkboxes de la tabla
            const checkboxes = document.querySelectorAll('input[type="checkbox"]');
            checkboxes.forEach(checkbox => {
                checkbox.checked = this.selectAllHist;
            });
        },
        async cargaFitxa() {
            try {
                const response = await fetch(window.ruta + 'bezero_fixaruta', {
                    // const response = await fetch('https://www.talde3.edu:8081/Erronka2/laravel_e2t3/public/api/taldearuta', {
                    method: 'GET',
                    // mode: "no-cors",
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                });

                if (!response.ok) {
                    // console.log('Errorea eskera egiterakoan');
                    // throw new Error('Errorea eskaera egiterakoan');
                }

                const datuak = await response.json();
                console.log(datuak);
                this.listaFitxa = datuak

                    .filter(fitxa => fitxa.deleted_at === null || fitxa.deleted_at === "0000-00-00 00:00:00");
                console.log(datuak);

            } catch (error) {
                console.error("Errorea: ", error);
            }
        },
        async createFitxa() {
            try {
                // Eliminar el mensaje de error si existe
                this.clearMessage();

                if (this.izenaSortu && this.abizenaSortu && this.telefonoaSortu) {
                    const izena = this.izenaSortu;
                    const abizena = this.abizenaSortu;
                    const telefonoa = this.telefonoaSortu;
                    const azal_sentikorra = this.sentikorraSortu;

                    // para validar el numero de telefono
                    const telefonoRegex = /^\d{9}$/;
                    if (!telefonoRegex.test(telefonoa)) {
                        this.showMessage('error', 'Número de teléfono no válido', 'botton');
                        return;
                    } else {
                        const arraySortu = {
                            "izena": izena,
                            "abizena": abizena,
                            "telefonoa": telefonoa,
                            "azal_sentikorra": azal_sentikorra || 'E', // Por defecto -> piel sensible = no
                        };



                        console.log(JSON.stringify(arraySortu));

                        const response = await fetch(window.ruta + 'bezero_fixagorde', {
                            // const response = await fetch('https://www.talde3.edu:8081/Erronka2/laravel_e2t3/public/api/taldeagorde', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json', // Indicar el tipo de contenido como JSON
                                'Access-Control-Allow-Origin': '*'
                            },
                            body: JSON.stringify(arraySortu), // Convertir el objeto JSON a una cadena JSON
                        });

                        if (!response.ok) {
                            // console.log('Errorea sortzerakoan');
                            this.showMessage('error', 'Error al crear la ficha', 'top');
                            // throw new Error('Errorea sortzerakoan');
                        } else {

                            // console.log('Sortu da');
                            // para que el mensaje cambie al pasar 10seg
                            this.showMessage('status', 'Ficha creada correctamente', 'top');
                            this.cargaFitxa(); //para cargar los datos nuevos

                            // Vaciar los input
                            this.izenaSortu = '';
                            this.abizenaSortu = '';
                            this.telefonoaSortu = '';
                            this.sentikorraSortu = '';

                            // await this.cargaFitxa();
                            // location.reload();
                        }
                    }
                } else {
                    this.showMessage('error', 'Rellene todos los campos', 'botton');
                }
            } catch (error) {
                console.log('Errorea: ', error);
            }
        },
        async actuFitxa() {
            try {
                const id = this.arrayId[0];
                const izena = this.listaFitxa.find(fitxa => fitxa.id === this.arrayId[0]).izena;
                const abizena = this.listaFitxa.find(fitxa => fitxa.id === this.arrayId[0]).abizena;
                const telefonoa = this.listaFitxa.find(fitxa => fitxa.id === this.arrayId[0]).telefonoa;
                const azal_sentikorra = this.listaFitxa.find(fitxa => fitxa.id === this.arrayId[0]).azal_sentikorra;
                // const izena = this.listaFitxa.map(talde => talde.izena).join(', ');
                const arrayActu = {
                    "id": id,
                    "izena": izena,
                    "abizena": abizena,
                    "telefonoa": telefonoa,
                    "azal_sentikorra": azal_sentikorra,
                };

                const response = await fetch(window.ruta + 'bezero_fixaeguneratu/' + id, {
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
                await this.cargaFitxa();
                location.reload();
            } catch (error) {
                console.log('Errorea: ', error);
            }
        },
        async ezabFitxa() {
            try {
                for (var i = 0; i < this.arrayId.length; i++) {
                    const response = await fetch(window.ruta + 'bezero_fixaezabatu/' + this.arrayId[i], {
                        // const response = await fetch('https://www.talde3.edu:8081/Erronka2/laravel_e2t3/public/api/taldeaezabatu/' + this.arrayId[i], {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                            'Access-Control-Allow-Origin': '*'
                        },
                        body: JSON.stringify(this.arrayId[i]),
                    });
                }

                // if(!response.ok){
                //   console.log('Errorea eguneratzerakoan');
                //   throw new Error('Errorea eguneratzerakoan');
                // }

                console.log('Ondo ezabatuta');
                await this.cargaFitxa();
                location.reload();
            } catch (error) {
                console.log('Errorea: ', error);
            }
        },
        async cargaProduktu() {
            try {
                const response = await fetch(window.ruta + 'produktuaruta', {
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
                this.listaProduktu = datuak
                this.listaProduktuFilter = datuak
                // FALTA AÑADIR EL FIlTER !!!!!!!
                //.filter(produktu => produktu.deleted_at === null || produktu.deleted_at === "0000-00-00 00:00:00");
                // console.log(datuak);

            } catch (error) {
                console.error('Errorea:', error);
            }
        },

        async cargaHistorial(id) {
            try {
                this.asd = id;
                const response = await fetch(window.ruta + 'kolore_histruta', {
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
                this.listaHistorial = datuak
                    .filter(historial => historial.id_bezeroa == id);

            } catch (error) {
                console.error('Errorea:', error);
            }
        },
        async createHistorial() {
            try {
                const id_bezeroa = this.asd;
                const id_produktua = this.histProduktuSortu;
                const data = this.histDataSortu;
                const kantitatea = this.histKatitateaSortu;
                const bolumena = this.histBolumenaSortu;
                const oharrak = this.histOharraSortu;
                const arraySortu = {
                    "id_bezeroa": id_bezeroa,
                    "id_produktua": id_produktua,
                    "data": data,
                    "kantitatea": kantitatea,
                    "bolumena": bolumena,
                    "oharrak": oharrak
                };

                console.log(JSON.stringify(arraySortu));

                const response = await fetch(window.ruta + 'kolore_histgorde', {
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

                console.log('Sortu da');
                this.cargaHistorial(id);
            } catch (error) {
                console.log('Errorea: ', error);
            }
        },
        async updateHistorial() {
            try {
                const id = this.historialId[0];
                const id_bezeroa = this.asd;
                var id_produktua = "";
                if (this.histProduktuUpdate != "") {
                    id_produktua = this.histProduktuUpdate;
                } else {
                    id_produktua = this.listaHistorial.find(historial => historial.id === this.historialId[0]).id_produktua;
                }
                const data = this.listaHistorial.find(historial => historial.id === this.historialId[0]).data;
                const kantitatea = this.listaHistorial.find(historial => historial.id === this.historialId[0]).kantitatea;
                const bolumena = this.listaHistorial.find(historial => historial.id === this.historialId[0]).bolumena;
                const oharrak = this.listaHistorial.find(historial => historial.id === this.historialId[0]).oharrak;
                const arrayActu = {
                    "id": id,
                    "id_bezeroa": id_bezeroa,
                    "id_produktua": id_produktua,
                    "data": data,
                    "kantitatea": kantitatea,
                    "bolumena": bolumena,
                    "oharrak": oharrak
                };
                console.log(arrayActu)
                const response = await fetch(window.ruta + 'kolore_histeguneratu/' + id, {
                    // const response = await fetch('https://www.talde3.edu:8081/Erronka2/laravel_e2t3/public/api/taldeaezabatu/' + this.arrayKodea[i], {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    body: JSON.stringify(arrayActu),
                });


                // if(!response.ok){
                //   console.log('Errorea eguneratzerakoan');
                //   throw new Error('Errorea eguneratzerakoan');
                // }

                console.log('Ondo Updated');
            } catch (error) {
                console.log('Errorea: ', error);
            }
        },
        async ezabHistorial() {
            try {
                for (var i = 0; i < this.historialId.length; i++) {
                    const response = await fetch(window.ruta + 'kolore_histezabatu/' + this.historialId[i], {
                        // const response = await fetch('https://www.talde3.edu:8081/Erronka2/laravel_e2t3/public/api/taldeaezabatu/' + this.arrayKodea[i], {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                            'Access-Control-Allow-Origin': '*'
                        },
                        body: JSON.stringify(this.historialId[i]),
                    });
                }

                // if(!response.ok){
                //   console.log('Errorea eguneratzerakoan');
                //   throw new Error('Errorea eguneratzerakoan');
                // }

                console.log(); ('Ondo ezabatuta');
                console.log(this.historialId);
            } catch (error) {
                console.log('Errorea: ', error);
            }
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
        }
    },
    mounted() {
        // Llama a tu función cargarPagina cuando el componente se monta
        this.cargaFitxa();
        this.cargaProduktu();
        this.itemsPaginados;
        this.checkCookies();
    },
    watch: {
        // paginaActual() {
        //     this.itemsPaginados();
        // },
        histMarkaSortu() {
            if (this.histMarkaSortu != null) {
                this.listaProduktuFilter = this.listaProduktu.filter(produktu => produktu.marka === this.histMarkaSortu);
            } else {
                this.listaProduktuFilter = this.listaProduktu
            }
        },
        histMarkaUpdate() {
            if (this.histMarkaUpdate != null) {
                this.listaProduktuFilter = this.listaProduktu.filter(produktu => produktu.marka === this.histMarkaUpdate);
            } else {
                this.listaProduktuFilter = this.listaProduktu
            }
        },
        arrayId() {
            if (this.arrayId.length > 1) {
                this.visibleFitxa = false;
            } else {
                this.visibleFitxa = true;
            }
        },
        historialId() {
            if (this.historialId.length > 1) {
                this.visibleHist = false;
            } else {
                this.visibleHist = true;
            }
        }
    }
});