<template>
    <div class="container">
        <h1> People Currently In Space </h1>
        <hr>
        <div class="text-center" v-if="loading">
            <img src="/loading.gif">
        </div>
        <div v-else>
            <div class="alert alert-info">
                There are currently <b>{{result.number}}</b> people in space
            </div>
            <div class="row">
                <div v-for="person in result.people" class="col-md-3">
                    <div class="card my-2">
                        <div class="card-body">
                            <h3> {{person.name}} </h3>
                            <p> {{person.craft}} </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import axios from 'axios';

export default {
    mounted : function () {
        axios.get('http://api.open-notify.org/astros.json').then( res => {
            if (res.status == 200) {
                this.result = res.data;
            }
            this.loading = false;
        });
    },
    data : function () {
        return {
            loading : true,
            result : {}
        }
    }
}
</script>
