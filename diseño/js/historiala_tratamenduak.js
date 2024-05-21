new Vue({
    el: '#app',
    data: {
        selectedTalde: "",
        kategoriaIzenaSortu: "",
        dataSortu: "",
        arrayKodea: [],
        listaTalde: [],
        listaLangile: [],
        fechaFormateada: '',
        listaOrdutegia: [],
        listaKategoria: [],
        listaProduktua: [],
        listaFiltrada: [],
        listaFiltrada2: [],
        listaMarka: [],
        listaProduktuMugimendua: [],
        listaTratamendua: [],
        registroBerri: [],
        guardarRegistro: [],
        registros: [],
        marcasUnicas: new Set(),
        listaMarkaFiltrada: [],
        uniqueMarcas: [0],
        stockTotala: 0,
        mapaProduktua: {},  // Mapa para almacenar datos adicionales de productos
        mapaLangilea: {},   // Mapa para almacenar datos adicionales de langileak
        /* IDIOMAS */
        selectedLanguage: 'es',
        // languageStrings: {},
        translations: translations, // Paginar
        itemsPorPagina: 10,
        paginaActual: 1,
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
        actualizarFecha() {
            if (!this.dataSortu) {
                this.dataSortu = new Date().toISOString().slice(0, 10); // Establecer la fecha actual si no hay fecha seleccionada
            }
            this.obtenerFechaActual();
            this.actualizarListaFiltrada();
        },
        actualizarFechaAutomaticamente() {
            // Función para actualizar automáticamente la fecha cada minuto
            setInterval(() => {
                this.obtenerFechaActual();
            }, 60000); // 60000 milisegundos = 1 minuto
        },
        formatProductName(produktua) {
            const truncatedName = produktua.izena.length > 30 ? produktua.izena.slice(0, 30) : produktua.izena;
            const truncatedDescription = produktua.deskribapena.length > 40 ? produktua.deskribapena.slice(0, 40) + '' : produktua.deskribapena;
            return `${truncatedName} - ${truncatedDescription}`;
        },
        obtenerFechaActual() {
            const fechaSeleccionada = new Date(this.dataSortu);
            const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
            this.fechaFormateada = `${fechaSeleccionada.toLocaleDateString('es-ES', options)}`;
        },
        async cargaTratamendua() {
            try {
                const response = await fetch(window.ruta + 'tratamenduaruta', {
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
                this.listaTratamendua = datuak
                    .filter(tratamendua => tratamendua.deleted_at === null || tratamendua.deleted_at === "0000-00-00 00:00:00");
                console.log(this.listaTratamendua);
            } catch (error) {
                console.error('Errorea: ', error);
            }
        },
        async cargaProduktuMugimendua() {
            try {
                const response = await fetch(window.ruta + 'produktumugimenduaruta', {
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
                this.listaProduktuMugimendua = datuak;
                this.actualizarListaFiltrada();
            } catch (error) {
                console.error('Errorea: ', error);
            }
        },
        compararFechas(fechaRegistro, fechaSeleccionada) {
            // Convierte las fechas a objetos Date para facilitar la comparación
            const fechaRegistroObj = new Date(fechaRegistro);
            const fechaSeleccionadaObj = new Date(fechaSeleccionada);

            // Compara solo el año, mes y día
            return fechaRegistroObj.toISOString().split('T')[0] === fechaSeleccionadaObj.toISOString().split('T')[0];
        },
        actualizarListaFiltrada() {
            if (!this.kategoriaIzenaSortu && !this.dataSortu) {
                this.listaFiltrada = this.listaProduktuMugimendua;

            } else {
                this.listaFiltrada = this.listaProduktuMugimendua
                    .filter(registro =>
                        (!this.kategoriaIzenaSortu || (registro.produktua && registro.produktua.kategoria.id == this.kategoriaIzenaSortu)) &&
                        (!this.dataSortu || this.compararFechas(registro.data, this.dataSortu)));
            }
        },
        changeLanguage(lang) {
            this.selectedLanguage = lang;
            console.log(this.selectedLanguage);
        },
    },

    watch: {
        kategoriaIzenaSortu: function () {
            this.actualizarListaFiltrada();
        }
    },

    mounted() {
        this.dataSortu = this.obtenerFechaActual();
        this.actualizarFecha();
        this.cargaKategoria();
        this.cargaProduktuMugimendua();
        this.actualizarFechaAutomaticamente();
    }
});