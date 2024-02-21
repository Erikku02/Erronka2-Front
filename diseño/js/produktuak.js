Vue.component('nav-component', {
    template: `
        <nav class="navbar bg-body-tertiary fixed-top">
            <div class="container d-flex align-items-center">
                <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar"
                    aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <a class="navbar-brand mx-auto h3 d-flex d-inline fs-2" href="#">
                    Productos
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
                                    Citas
                                </a>
                                <ul class="dropdown-menu">
                                    <li><a class="dropdown-item" href="hitzorduak.html">Gestión de citas</a></li>
                                    <li><a class="dropdown-item" href="ticket.html">Tickets</a></li>
                                </ul>
                            </li>

                            <!-- Productos -->
                            <li class="nav-item dropdown mb-3">
                                <a class="nav-link dropdown-toggle link-info fs-5 fw-bold text-light" href="#" role="button"
                                    data-bs-toggle="dropdown" aria-expanded="false">
                                    <i class="bi bi-tags-fill m-2"></i>
                                    Productos
                                </a>
                                <ul class="dropdown-menu">
                                    <li><a class="dropdown-item" href="produktu_mugimenduak.html">Extraer productos</a></li>
                                    <li><a class="dropdown-item" href="produktuak.html">Gestionar productos</a></li>
                                    <li><a class="dropdown-item" href="kategoriak.html">Gestionar categorías</a></li>
                                    <li><a class="dropdown-item" href="historiala_produktu_mugimenduak.html">Historial de
                                            extracción de productos</a></li>
                                </ul>
                            </li>

                            <!-- Material -->
                            <li class="nav-item dropdown mb-3">
                                <a class="nav-link dropdown-toggle link-info fs-5 fw-bold text-light" href="#" role="button"
                                    data-bs-toggle="dropdown" aria-expanded="false">
                                    <i class="bi bi-palette2 m-2"></i>
                                    Material
                                </a>
                                <ul class="dropdown-menu">
                                    <li><a class="dropdown-item" href="materiala.html">Gestionar material</a></li>
                                    <li><a class="dropdown-item" href="materiala_erabili.html">Extraer/Devolver Material</a>
                                    </li>
                                    <li><a class="dropdown-item" href="historiala_materiala_erabili.html">Historial de
                                            movimientos de material</a></li>
                                </ul>
                            </li>


                            <!-- Tratamientos -->
                            <li class="nav-item dropdown mb-3">
                                <a class="nav-link link-info fs-5 fw-bold text-light" href="tratamenduak.html" role="button"
                                    aria-expanded="false">
                                    <i class="bi bi-scissors m-2"></i>
                                    Tratamientos
                                </a>
                            </li>

                            <!-- Turnos -->
                            <li class="nav-item dropdown mb-3">
                                <a class="nav-link dropdown-toggle link-info fs-5 fw-bold text-light" href="#" role="button"
                                    data-bs-toggle="dropdown" aria-expanded="false">
                                    <i class="bi bi-calendar-check-fill m-2"></i>
                                    Turnos
                                </a>
                                <ul class="dropdown-menu">
                                    <li><a class="dropdown-item" href="txandak.html">Asignación de turnos</a></li>
                                    <li><a class="dropdown-item" href="gaurko_txandak.html">Turnos de hoy</a></li>
                                </ul>
                            </li>

                            <!-- Grupos -->
                            <li class="nav-item dropdown mb-3">
                                <a class="nav-link dropdown-toggle link-info fs-5 fw-bold text-light" href="#" role="button"
                                    data-bs-toggle="dropdown" aria-expanded="false">
                                    <i class="bi bi-people-fill m-2"></i>
                                    Grupos
                                </a>
                                <ul class="dropdown-menu">
                                    <li><a class="dropdown-item" href="taldeak.html">Gestionar grupos</a></li>
                                    <li><a class="dropdown-item" href="ordutegiak.html">Horarios por grupo</a></li>
                                </ul>
                            </li>

                            <!-- Usuarios -->
                            <li class="nav-item dropdown mb-3">
                                <a class="nav-link link-info fs-5 fw-bold text-light" href="langileak.html" role="button"
                                    aria-expanded="false">
                                    <i class="bi bi-person-fill m-2"></i>
                                    Usuarios
                                </a>
                            </li>

                            <!-- Ficha Clientes -->
                            <li class="nav-item dropdown mb-3">
                                <a class="nav-link link-info fs-5 fw-bold text-light" href="bezero_fitxak.html"
                                    role="button" aria-expanded="false">
                                    <i class="bi bi-person-vcard m-2"></i>
                                    Ficha-clientes
                                </a>
                            </li>
                            <li>
                                <!-- CAMBIAR EL IDIOMA (probisional) -->
                                <p @click="changeLanguageAndClose('es')" class="text-white">ES</p>
                                <p @click="changeLanguageAndClose('eus')">EUS</p>
                                <p> {{ translations }}</p>
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
        };
    },
    methods: {
        changeLanguage(lang) {
            this.selectedLanguage = lang;
            console.log(this.selectedLanguage);
            console.log(this.translations);
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
        getTranslation(key) {
            return this.translations[this.selectedLanguage][key] || '';
        }
    },
});


new Vue({
    el: '#app',
    data: {
        selectedCheckbox: null, // Esta variable almacenará la ID del checkbox seleccionado
        arrayId: [],
        izenaEgu: "",
        kategoriaEgu: "",
        izenaSortu: "",
        deskribSortu: "",
        kategoriaSortu: "",
        markaSortu: "",
        stockSortu: "",
        stock_alertaSortu: "",
        listaProduktu: [],
        listaKategoria: [],
        ordenNombre: 'asc', // Para ordenar los datos de la tabla
        ordenKategoria: 'asc',
        /* IDIOMAS */
        selectedLanguage: 'es',
        // languageStrings: {},
        translations: translations,
    },
    methods: {
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
                // FALTA AÑADIR EL FIlTER !!!!!!!
                //.filter(produktu => produktu.deleted_at === null || produktu.deleted_at === "0000-00-00 00:00:00");
                // console.log(datuak);
                this.ordenarPorNombre();

            } catch (error) {
                console.error('Errorea:', error);
            }
        },

        async createProduktu() {
            try {
                const izena = this.izenaSortu;
                const deskribapena = this.deskribSortu;
                const id_kategoria = this.kategoriaSortu;
                const marka = this.markaSortu;
                const stock = this.stockSortu;
                const stock_alerta = this.stock_alertaSortu;
                const arraySortu = {
                    "izena": izena,
                    "deskribapena": deskribapena,
                    "id_kategoria": id_kategoria,
                    "marka": marka,
                    "stock": stock,
                    "stock_alerta": stock_alerta
                };

                console.log(JSON.stringify(arraySortu));

                const response = await fetch(window.ruta + 'produktuagorde', {
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

                alert('Sortu da');
                await this.cargaProduktu();
                location.reload();
            } catch (error) {
                console.log('Errorea: ', error);
            }
        },
        async actuProduktu() {
            try {
                const id = this.arrayId[0];
                const izena = this.listaProduktu.find(talde => talde.id === this.arrayId[0]).izena;
                const deskribapena = this.listaProduktu.find(talde => talde.id === this.arrayId[0]).deskribapena;
                const id_kategoria = this.kategoriaEgu;
                const marka = this.listaProduktu.find(talde => talde.id === this.arrayId[0]).marka;
                const stock = this.listaProduktu.find(talde => talde.id === this.arrayId[0]).stock;
                const stock_alerta = this.listaProduktu.find(talde => talde.id === this.arrayId[0]).stock_alerta;
                const arrayActu = {
                    "id": id,
                    "izena": izena,
                    "deskribapena": deskribapena,
                    "id_kategoria": id_kategoria,
                    "marka": marka,
                    "stock": stock,
                    "stock_alerta": stock_alerta
                };

                console.log(arrayActu);
                const response = await fetch(window.ruta + 'produktuaeguneratu/' + id, {
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

                alert('Ondo eguneratuta');
                await this.cargaProduktu();
                location.reload();
            } catch (error) {
                console.log('Errorea: ', error);
            }
        },
        async ezabProduktu() {
            try {
                for (var i = 0; i < this.arrayId.length; i++) {
                    const response = await fetch(window.ruta + 'produktuaezabatu/' + this.arrayId[i], {
                        // const response = await fetch('https://www.talde3.edu:8081/Erronka2/laravel_e2t3/public/api/taldeaezabatu/' + this.arrayKodea[i], {
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

                alert('Ondo ezabatuta');
                await this.cargaProduktu();
                location.reload();
            } catch (error) {
                console.log('Errorea: ', error);
            }
        },
        async cargaKategoria() {
            try {
                const response = await fetch(window.ruta + 'kategoriaruta', {
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
                this.listaKategoria = datuak

                    .filter(kategoria => kategoria.deleted_at === null || kategoria.deleted_at === "0000-00-00 00:00:00");
                console.log(this.listaKategoria);

            } catch (error) {
                console.error('Errorea:', error);
            }
        },

        // Para ordenar los datos de la tabla
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
        ordenarPorNombre() {
            this.ordenNombre = this.ordenNombre === 'asc' ? 'desc' : 'asc';
            this.listaProduktu.sort((a, b) => {
                return this.ordenNombre === 'asc' ?
                    this.alphanumCompare(a.izena, b.izena) :
                    this.alphanumCompare(b.izena, a.izena);
            });
        },

        ordenarPorCategoria() {
            this.ordenKategoria = this.ordenKategoria === 'asc' ? 'desc' : 'asc';
            this.listaProduktu.sort((a, b) => {
                return this.ordenKategoria === 'asc' ?
                    this.alphanumCompare(a.id_kategoria, b.id_kategoria) :
                    this.alphanumCompare(b.id_kategoria, a.id_kategoria);
            });
        },

        ordenarPorMarka() {
            this.ordenMarka = this.ordenMarka === 'asc' ? 'desc' : 'asc';
            this.listaProduktu.sort((a, b) => {
                return this.ordenMarka === 'asc' ?
                    this.alphanumCompare(a.marka, b.marka) :
                    this.alphanumCompare(b.marka, a.marka);
            });
        },
        // TODO:ordenarPorStock
        ordenarPorStock() {
            this.ordenStock = this.ordenStock === 'asc' ? 'desc' : 'asc';
            this.listaProduktu.sort((a, b) => {
                return this.ordenStock === 'asc' ?
                    this.alphanumCompare(a.stock, b.stock) :
                    this.alphanumCompare(b.stock, a.stock);
            });
        },
        // TODO: ordenarPorStockDeSeguridad
        ordenarPorStockAlerta() {
            this.ordenStockAlerta = this.ordenStockAlerta === 'asc' ? 'desc' : 'asc';
            this.listaProduktu.sort((a, b) => {
                return this.ordenStockAlerta === 'asc' ?
                    this.alphanumCompare(a.stock_alerta, b.stock_alerta) :
                    this.alphanumCompare(b.stock_alerta, a.stock_alerta);
            });
        },
        changeLanguage(lang) {
            this.selectedLanguage = lang;
            console.log(this.selectedLanguage);
        },
    },
    mounted() {
        // Llama a tu función cargarPagina cuando el componente se monta
        this.cargaProduktu();
        this.cargaKategoria();
        this.ordenarPorNombre();
        // this.ordenKategoria();
    }
});