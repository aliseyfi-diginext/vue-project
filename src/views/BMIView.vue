<template>
    <hr>
    <form class="" @submit.prevent="calc">
        <div class="form-group">
            <label> Weight (kg) </label>
            <input @input="calc" type="number" v-model="weight">
        </div>
        <div class="form-group">
            <label> Height (cm) </label>
            <input @input="calc" type="number" v-model="height">
        </div>
        <div class="form-group">
            <button type="submit"> Submit </button>
        </div>
    </form>

    <hr>

    <div v-if="weight && height && bmi" class="">
        <p> Weight : {{weight}} </p>
        <p> Height : {{height}} </p>
        <p> BMI : {{bmi}} </p>
        <p> Status : {{status}} </p>
    </div>
    <div v-else>
        Please Enter Your Height & Width
    </div>

</template>

<script>
    export default {
        data : function () {
            return {
                weight : null,
                height : null,
                bmi : null,
            }
        },
        methods : {
            calc : function () {
                var w = this.weight;
                var h = this.height / 100;
                var bmi = w / (h * h);
                this.bmi = bmi;
            }
        },
        computed : {
            status : function () {
                if (this.bmi < 18.5) {
                    return 'Skinny';
                }else if (this.bmi < 25) {
                    return 'Normal';
                }else if (this.bmi < 30) {
                    return 'Extra Weight';
                }else if (this.bmi < 35) {
                    return 'Fat';
                }else {
                    return 'Very Fat';
                }
            }
        }
    }
</script>

<style>

</style>
