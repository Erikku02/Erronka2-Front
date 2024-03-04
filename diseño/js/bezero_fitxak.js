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
    },
    computed: {
        // Paginar
        cantidadPorPaginas() {
            return Math.ceil(this.listaFitxa.length / this.itemsPorPagina)
        },
        itemsPaginados() {
            const inicio = (this.paginaActual - 1) * this.itemsPorPagina;
            const fin = inicio + this.itemsPorPagina;
            console.log(this.listaFitxa.slice(inicio, fin));
            return this.listaFitxa.slice(inicio, fin);
        }
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
                        this.showMessage('error', 'Número de telefono no valido', 'botton');
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
    },
    mounted() {
        // Llama a tu función cargarPagina cuando el componente se monta
        this.cargaFitxa();
        this.cargaProduktu();
        this.itemsPaginados;
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