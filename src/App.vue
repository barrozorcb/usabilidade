<template src="./index.html"></template>

<script>
    export default {
        data() {
            return {
                authenticated: false,
                admin: false,
                profile: '',
                contato: {
                    emailCotacao: '',
                    nomeCotacao: '',
                    telefoneCotacao: '',
                    msgCotacao: ''
                }

            }
        },
        methods: {
            login() {
                var self = this;
                var lock = new Auth0Lock('oE3GWDUYds8NN2gTMcI0lSq59rb1cGNK', 'rafaelrcb.auth0.com');

                lock.show({'rememberLastLogin': 'false',
                            'dict': 'pt-BR',
                            'icon': 'src/img/Logo.png',
                            'primaryColor': '#6a89f8'}, (err, profile, token) => {
                    if(err) {
                        // Handle the error
                        console.log(err)
                    } else {
                        // Set the token and user profile in local storage
                        localStorage.setItem('profile', JSON.stringify(profile));
                        localStorage.setItem('id_token', token);
                        self.authenticated = true;
                    }
                })
            },
            logout() {
                var self = this;
                localStorage.removeItem('id_token');
                localStorage.removeItem('profile');
                self.authenticated = false;
            },

        },
        watch: {
            authenticated (val) {
                if(val){
                    this.profile = JSON.parse(localStorage.getItem('profile'));
                }
                if(val && this.profile.email == "admin@admin.com"){
                    this.admin = true;
                }
            }
        },
        ready () {

            if (localStorage.getItem('id_token') && localStorage.getItem('profile')) {
                this.authenticated = true;
            }
        }
    }
</script>