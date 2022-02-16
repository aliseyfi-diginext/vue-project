<template>

    <!-- در این قسمت ما از دو
    event
    استفاده کردیم
    @submit.prevent = هنگامی که کاربر فرم را سابمیت میکند
    @input = هنگامی که کاربر در فیلد های مربوطه تایپ میکند -->
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

    <!-- اگر مقادیر لازم مانند
    weight و height و bmi
    موجود بود آنها را نمایش بده -->
    <div v-if="weight && height && bmi" class="">
        <p> Weight : {{weight}} </p>
        <p> Height : {{height}} </p>
        <p> BMI : {{bmi}} </p>
        <p> Status : {{status}} </p>
    </div>

    <!-- در غیر این صورت متن زیر را نمایش بده -->
    <div v-else>
        Please Enter Your Height & Width
    </div>

</template>

<script>
    export default {

        // در این بخش داده های مورد نیازمان را تعریف میکنیم
        data : function () {
            return {
                weight : null,
                height : null,
                bmi : null,
            }
        },

        // در این قسمت توابع یا متد های مورد نیازمان را تعریف میکنیم
        methods : {
            calc : function () {
                var w = this.weight;
                var h = this.height / 100;
                var bmi = w / (h * h);
                this.bmi = bmi;
            }
        },

        // در این قسمت داده هایی که برای تایین مقدار آنها به یک سری محاسبات نیاز داریم را تعریف میکنیم
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
