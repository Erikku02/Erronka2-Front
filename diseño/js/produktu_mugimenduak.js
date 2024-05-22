Vue.component('nav-component', {
    template: `
        <nav class="navbar bg-body-tertiary fixed-top">
            <div class="container d-flex align-items-center">
                <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar"
                    aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <a class="navbar-brand mx-auto h3 d-flex d-inline fs-2" href="#">
                {{ translations[selectedLanguage].nav.extraer_produ }}
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
        boolSeguridad: false,
        selectedTalde: "",
        arrayKodea: [],
        kodeaSortu: "",
        izenaSortu: "",
        kategoriaIzenaSortu: "",
        produktuIzenaSortu: "",
        kantitateaSortu: 0,
        casaSortu: "",
        listaTalde: [],
        listaLangile: [],
        fechaFormateada: '',
        listaOrdutegia: [],
        grupoPorDia: '',
        alumnosPorGrupo: [],
        listaKategoria: [],
        listaProduktua: [],
        listaFiltrada: [],
        listaFiltrada2: [],
        listaMarka: [],
        registroBerri: [],
        guardarRegistro: [],
        registros: [],
        marcasUnicas: new Set(),
        listaMarkaFiltrada: [],
        uniqueMarcas: [0],
        stockTotala: 0,
        stockTotalProducto: 0, 
        guardarStockTotal: 0,
        /* IDIOMAS */
        selectedLanguage: 'es',
        // languageStrings: {},
        translations: translations,

        //Cookies
        esProfesor: false,
        esAlumno: false,
    },
    methods: {
        formatProductName(produktua) {
            const truncatedName = produktua.izena.length > 30 ? produktua.izena.slice(0, 30) : produktua.izena;
            const truncatedDescription = produktua.deskribapena.length > 40 ? produktua.deskribapena.slice(0, 40) + '' : produktua.deskribapena;
            return `${truncatedName} - ${truncatedDescription}`;
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
        async cargaKategoria() {
            try {
                const response = await fetch(window.ruta + 'kategoriaruta', {
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
                this.listaKategoria = datuak
                    .filter(kategoria => kategoria.deleted_at === null || kategoria.deleted_at === "0000-00-00 00:00:00");
                console.log(this.listaKategoria);
            } catch (error) {
                console.error('Errorea: ', error);
            }
        },
        async cargaProduktuaById(idPro) {
            try {
                const response = await fetch(window.ruta + 'produktuaruta', {
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
                this.listaProduktua = datuak;

                const stockT = this.listaProduktua.find(produktua => produktua.id === idPro)?.stock;
                const stockS = this.listaProduktua.find(produktua => produktua.id === idPro)?.stock_alerta;

                stockT !== undefined ? stockT : 0;
                stockS !== undefined ? stockS : 0;

                const arrStock = [stockT, stockS];

                return (arrStock);
            } catch (error) {
                console.error('Errorea: ', error);
                return 0; // Devolver un valor por defecto en caso de error
            }
        },
        async cargaProduktua() {
            try {
                const response = await fetch(window.ruta + 'produktuaruta', {
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
                this.listaProduktua = datuak;
                this.listaFiltrada = datuak;

            } catch (error) {
                console.error('Errorea: ', error);
            }
        },
        async cargaMarka() {
            try {
                const response = await fetch(window.ruta + 'markaruta', {
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
                this.listaMarka = datuak;
                this.listaMarkaFiltrada = datuak;
                console.log(this.cargaMarka)
            } catch (error) {
                console.error('Errorea: ', error);
            }
        },
        async añadirFila() {
            // Validar que los campos obligatorios no estén vacíos
            if (!this.produktuIzenaSortu || this.kantitateaSortu <= 0) {
                alert("Por favor, completa los campos obligatorios: Producto y Cantidad");
                return; // No continuar con la función si hay campos obligatorios vacíos
            }
            
            const arrProduktuarenStock = await this.cargaProduktuaById(this.produktuIzenaSortu);
            this.stockTotalProducto = arrProduktuarenStock[0];
            const stockSeguridadProducto = arrProduktuarenStock[1];

            //FALTA QUE TENGA EN CUENTA QUE SI EL PRODUCTO ES DIFERENTE NO SE RESTE LA CANTIDAD DE ESE PRODUCTO SINO
            //DEL OTRO!!!

            if(this.registros.length > 0){
                for (let i = 0; i < this.registros.length; i++) {
                    if(this.registros[i].produktua == this.produktuIzenaSortu){
                        this.guardarStockTotal = this.stockTotalProducto - this.registros[i].kantitatea;
                    }
                }
                this.guardarStockTotal = this.guardarStockTotal - this.kantitateaSortu;
            }else{
                this.guardarStockTotal = this.stockTotalProducto - this.kantitateaSortu;
            }
            console.log(this.guardarStockTotal)

            if (this.guardarStockTotal >= 0) {
                if (this.guardarStockTotal <= stockSeguridadProducto) {
                    // console.log(this.stockTotalProducto - this.kantitateaSortu)
                    // Abre el pop-up modal
            
                    const modalId = 'stockAlertModal';
                    const modal = new bootstrap.Modal(document.getElementById(modalId));
                    modal.show();
                }
                
                const nuevaFila = {
                    "kategoria": this.kategoriaIzenaSortu ? this.listaKategoria.find(kategoria => kategoria.id == this.kategoriaIzenaSortu).izena : "",
                    "marka": this.casaSortu,
                    "produktua": this.produktuIzenaSortu ? this.listaFiltrada.find(produktua => produktua.id == this.produktuIzenaSortu).izena + ' - ' + this.listaFiltrada.find(produktua => produktua.id == this.produktuIzenaSortu).deskribapena : "",
                    "kantitatea": this.kantitateaSortu,
                    "idProduktua": this.produktuIzenaSortu
                };

                // Agregar la nueva fila al array
                this.registros.push(nuevaFila);

                // Limpiar los campos de entrada
                this.kategoriaIzenaSortu = "";
                this.casaSortu = "";
                this.produktuIzenaSortu = "";
                this.kantitateaSortu = 0;
            } else {
                if (this.guardarStockTotal <= stockSeguridadProducto) {
                    this.guardarStockTotal = parseInt(this.guardarStockTotal) + parseInt(this.kantitateaSortu);
                    const errorModalId = 'errorStockModal';
                    const errorModal = new bootstrap.Modal(document.getElementById(errorModalId));
                    errorModal.show();
                }
            }
        },
        eliminarFila(index) {
            this.registros.splice(index, 1);
        },
        actualizarListaFiltrada() {
            if (this.kategoriaIzenaSortu) {
                if (this.casaSortu) {
                    this.listaFiltrada = this.listaProduktua
                        .filter(produktuak => produktuak.id_kategoria == this.kategoriaIzenaSortu)
                        .filter(produktuak => produktuak.marka == this.casaSortu);
                } else {
                    this.listaFiltrada = this.listaProduktua
                        .filter(produktuak => produktuak.id_kategoria == this.kategoriaIzenaSortu);
                }
            } else {
                if (this.casaSortu) {
                    this.listaFiltrada = this.listaProduktua
                        .filter(produktuak => produktuak.marka == this.casaSortu);
                } else {
                    this.listaFiltrada = [...this.listaProduktua]; // Mostrar todos si no hay categoría ni marca seleccionada
                }
            }
        },
        actualizarListaMarkaFiltrada() {
            if (this.kategoriaIzenaSortu) {
                // Filtrar marcas para la categoría seleccionada
                this.listaMarkaFiltrada = this.listaMarka.filter(marka => marka.id_kategoria == this.kategoriaIzenaSortu);

                // Obtener marcas únicas para la categoría seleccionada
                this.uniqueMarcas = [...new Set(this.listaMarkaFiltrada.map(marka => marka.marka))];
            } else {
                // Obtener todas las marcas únicas
                this.uniqueMarcas = [...new Set(this.listaMarka.map(marka => marka.marka))];
                this.listaMarkaFiltrada = this.listaMarka; // Mantener todas las marcas si no hay categoría seleccionada
            }

            // Agregar marcas únicas al conjunto (¿marcasUnicas es necesario?)
            this.uniqueMarcas.forEach(marka => this.marcasUnicas.add(marka));
        },
        async createProduktu() {
            try {
                if (this.registros.length === 0) {
                    console.log('Añade al menos una fila antes de extraer.');
                    return;
                }

                const data1 = new Date();
                const data = data1.toISOString().split('T')[0];  // Obtener la fecha en formato 'YYYY-MM-DD'

                const registrosAEnviar = this.registros.map(registro => {
                    return {
                        'id_langilea': this.izenaSortu,
                        'id_produktua': registro.idProduktua,
                        'kopurua': registro.kantitatea
                    };
                });
                console.log(JSON.stringify(registrosAEnviar) + " aqu");

                const response = await fetch(window.ruta + 'produktumugimenduagorde', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    body: JSON.stringify(registrosAEnviar),
                });

                if (!response.ok) {
                    console.log('Errorea sortzerakoan');
                    throw new Error('Errorea sortzerakoan');
                }

                console.log('Sortu da');
                // Limpiar la lista de registros después de la extracción
                this.registros = [];
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
        }
    },

    watch: {
        kategoriaIzenaSortu: function () {
            this.actualizarListaFiltrada();
            this.actualizarListaMarkaFiltrada();
        },
        casaSortu: function () {
            this.actualizarListaFiltrada();
        }
    },
    mounted() {
        // Llama a tu función cargarPagina cuando el componente se monta
        this.obtenerFechaActual();
        this.cargaHorariosPorGrupo();
        this.cargaKategoria();
        this.cargaProduktua();
        this.cargaMarka();
        this.actualizarListaFiltrada(); // Añade esta línea para cargar la lista filtrada inicialmente
        this.checkCookies();
        // this.cargaTalde();
    }
});
