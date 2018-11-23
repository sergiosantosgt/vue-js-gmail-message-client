<template>
    <div id="all-messages">
        <h1>Messages</h1>

        <p><router-link :to="{ name: 'all_clients' }" class="btn btn-primary">Clients</router-link></p>

        <div class="form-group">
            <input type="text" name="search" v-model="messageSearch" placeholder="Search messages" class="form-control" v-on:keyup="searchMessages">
        </div>

        <table class="table table-hover">
            <thead>
            <tr>
                <td>ID</td>
                <td>API ID</td>
                <td>Subject</td>
            </tr>
            </thead>

            <tbody>
                <tr v-for="message in messages">
                    <td>{{ message.id }}</td>
                    <td>{{ message.api_message_id }}</td>
                    <td>{{ message.subject }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>

    export default{
        data(){
            return{
                messages: [],
                originalMessage: [],
                messageSearch: ''
            }
        },

        created: function()
        {
            this.fetchMessageData();
        },

        methods: {
            fetchMessageData: function()
            {
                this.$http.get('http://localhost:8000/api/message').then((response) => {
                    this.messages = response.body.data;
                    this.originalMessage = this.messages;
                }, (response) => {
                    
                });
            },

            searchMessages: function()
            {   
                if(this.messageSearch == '')
                {
                    this.messages = this.originalMessage;
                    return;
                }

                var searchedMessage = [];
                
                for(var i = 0; i < this.originalMessage.length; i++)
                {
                    var messageName = this.originalMessage[i]['subject'].toLowerCase();
                    if(messageName.indexOf(this.messageSearch.toLowerCase()) >= 0)
                    {
                        searchedMessage.push(this.originalMessage[i]);
                    }
                }

                this.messages = searchedMessage;
            }
        }
    }
</script>
