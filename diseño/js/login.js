new Vue({
    el: '#app',
    data: {
        username: '',
        password: '',

    },
    methods: {
        async login() {
            try {
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
                    window.location.assign('../html/hitzorduak.html')
                } else {
                    const responseData = await response.json(); // Obtener los datos del cuerpo de la respuesta
                    console.error("Error de autenticación:", responseData.error);
                    // console.log(response);
                }
            } catch (error) {
                console.error('Error: ', error);
            }


        }
    }
});