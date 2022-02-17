<template>
    <header>
        <div class="wrapper">
            <nav>
                <RouterLink :class="currentRoute == 'home' ? 'active' : ''" to="/">
                    Home
                </RouterLink>
                <RouterLink :class="currentRoute == 'bmi' ? 'active' : ''" to="/bmi">
                    Calculate BMI
                </RouterLink>
                <RouterLink :class="currentRoute == 'product' ? 'active' : ''" to="/product">
                    Product Form
                </RouterLink>
                <RouterLink :class="currentRoute == 'people-in-space' ? 'active' : ''" to="/people-in-space">
                    People In Space
                </RouterLink>
                <RouterLink :class="currentRoute == 'iqtest' ? 'active' : ''" to="/quiz">
                    IQ Test
                </RouterLink>
                <RouterLink :class="currentRoute == 'task-manager' ? 'active' : ''" to="/task-manager">
                    Task Manager
                </RouterLink>
            </nav>
        </div>
    </header>
    <hr>
    <RouterView />

</template>


<script>

import { RouterLink, RouterView, useRoute } from 'vue-router';

export default {
    data : function () {
        return {
            route : this.$route.name
        }
    },
    computed : {
        currentRoute : function () {
            return useRoute().name
        }
    }
}

</script>


<style scoped>
@import '@/assets/base.css';

nav  {
    text-align: center;
    padding: 20px;
}

nav > a {
    font-size: 1.5rem;
    text-decoration: none;
    margin: 0 10px;
    padding: 10px;
}

nav > a.active {
    border-bottom: 2px solid blue;
}

</style>
