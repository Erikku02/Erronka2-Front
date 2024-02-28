new Vue({
    el: '#app',
    data: {
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
        /* IDIOMAS */
        selectedLanguage: 'es',
        // languageStrings: {},
        translations: translations,
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

                // Mostrar un mensaje de error (puedes reemplazar esto con tu lógica de pop-up)
                console.log("Por favor, completa los campos obligatorios: Producto y Cantidad");
                return; // No continuar con la función si hay campos obligatorios vacíos
            }

            const arrProduktuarenStock = await this.cargaProduktuaById(this.produktuIzenaSortu);
            const stockTotalProducto = arrProduktuarenStock[0];
            const stockSeguridadProducto = arrProduktuarenStock[1];

            console.log(stockSeguridadProducto);

            if (this.kantitateaSortu <= stockTotalProducto) {
                if ((stockTotalProducto - this.kantitateaSortu) <= stockSeguridadProducto) {
                    console.log("¡¡¡Stock de alerta superado!!!, ahora quedan " + (stockTotalProducto - this.kantitateaSortu) + " unidades.")
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
                console.log("No puede añadir esa cantidad porque el stock actual de este producto es de " + stockTotalProducto);
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

        // this.cargaTalde();
    }
});
