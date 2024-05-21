new Vue({
    el: '#app',
    data: {
        username: '',
        password: '',
        errorMessage: '',
        translations: translations,
    },
    methods: {
        async login() {
            try {
                if (!this.username || !this.password) {
                    this.errorMessage = 'Por favor, complete ambos campos.';
                    // console.log(this.errorMessage);
                    return;
                } else {
                    const username = this.username;
                    const password = this.password;
                    const arraySortu = {
                        'username': username,
                        'pasahitza': password,
                    };

                    console.log(JSON.stringify(arraySortu));
                    console.log('Correo electrónico:', this.username);
                    console.log('Contraseña:', this.password);


                    const response = await fetch(window.ruta + 'login', {
                        // const response = await fetch('http://localhost/Erronka2/laravel_e2t3/public/api/login', {
                        // const response = await fetch('https://www.talde3-back.edu/Erronka2/laravel_e2t3/public/api/login', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Access-Control-Allow-Origin': '*'
                        },
                        body: JSON.stringify(arraySortu)
                    });

                    if (response.ok) {
                        // console.log("Conectado exitosamente");
                        // console.log(response);
                        // console.log(response.status);
                        try {
                            const response = await fetch(window.ruta + 'erabiltzailearuta/' + username,{
                                method: 'GET',
                                headers: {
                                    'Content-Type' : 'application/json',
                                    'Access-Control-Allow-Origin': '*'
                                }
                            });

                            if (!response.ok) {
                                console.log('Errorea eskera egiterakoan');
                                throw new Error('Errorea eskaera egiterakoan');
                            }

                            const datuak = await response.json();
                            console.log(datuak);
                            document.cookie = "rol=" + datuak.rola + ";";
                            console.log(document.cookie);
                            window.location.assign('../html/hitzorduak.html')
                        
                        } catch (error) {
                            console.error('Errorea:', error);
                        }

                    } else {
                        const responseData = await response.json(); // Obtener los datos del cuerpo de la respuesta
                        console.error("Error de autenticación:", responseData.error);
                        // console.log(response);
                        this.errorMessage = 'El usuario o la contraseña introducidos son incorrectos.';
                        return;
                    }
                    this.errorMessage = '';
                    return;
                }
            } catch (error) {
                console.error('Error: ', error);
            }


        }
    }
});