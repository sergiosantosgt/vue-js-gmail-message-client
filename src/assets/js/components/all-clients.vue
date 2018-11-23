<template>
    <div id="all-clients">
        <h1>Clients</h1>

        <p><router-link :to="{ name: 'all_messages' }" class="btn btn-primary">Messages</router-link></p>

        <div class="form-group">
            <input type="text" name="search" v-model="clientSearch" placeholder="Search clients name" class="form-control" v-on:keyup="searchClients">
        </div>

        <table class="table table-hover">
            <thead>
            <tr>
                <td>ID</td>
                <td>Name</td>
                <td>Email</td>
            </tr>
            </thead>

            <tbody>
                <tr v-for="client in clients">
                    <td>{{ client.id }}</td>
                    <td>{{ client.name }}</td>
                    <td>{{ client.email }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>

    export default{
        data(){
            return{
                clients: [],
                originalClient: [],
                clientSearch: ''
            }
        },

        created: function()
        {
            this.fetchClientData();
        },

        methods: {
            fetchClientData: function()
            {
                this.$http.get('http://localhost:8000/api/client').then((response) => {
                    this.clients = response.body.data;
                    this.originalClient = this.clients;
                }, (response) => {
                    
                });
            },

            searchClients: function()
            {   
                if(this.clientSearch == '')
                {
                    this.clients = this.originalClient;
                    return;
                }

                var searchedClient = [];
                for(var i = 0; i < this.originalClient.length; i++)
                {
                    var clientName = this.originalClient[i]['name'].toLowerCase();
                    if(clientName.indexOf(this.clientSearch.toLowerCase()) >= 0)
                    {
                        searchedClient.push(this.originalClient[i]);
                    }
                }

                this.clients = searchedClient;
            }
        }
    }
</script>
