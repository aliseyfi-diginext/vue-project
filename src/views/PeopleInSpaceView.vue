<template>
    <div class="container">
        <h1> People Currently In Space </h1>
        <hr>

        <!-- اگر مقدار متغیر
        loading == true
        بود
        تصویر مربوز به لودینگ را نمایش بده -->
        <div class="text-center" v-if="loading">
            <img src="/loading.gif">
        </div>

        <!-- در غیر اینصورت داده هایی که از
        api
        برگشت داده شدند را نمایش بده -->
        <div v-else>

            <!-- داده هایی که از
            api
            برگشت داده میشوند را ما در قالب یک آبجکت داریم
            این آبجکت دو پراپرتی دارد که اسم یکی از آنها
            number
            است که یک اینتیجر است و تعداد افراد در فضا را به ما میگوید
            و اسم پراپرتی دیگر
            people
            است که یک آرایه ای از آبجکت هاست
            هر آبجکت موجود در این آرایه دو پراپرتی
            name و craft دارد
            که هردو استرینگ یا متن هستند -->

            <!-- کلاس های
            alert و alert
            از قبل توسط بوتسترپ تعریف شده اند
            جهت اطلاعات کامل تر راجع به این کلاس ها میتوانید داکیومنتیشن بوتسترپ را از لینک زیر مطالعه کنید
            https://getbootstrap.com/docs/5.0/components/alerts/ -->
            <div class="alert alert-info">

                <!-- تعداد افراد که از طریق
                result.number
                قابل دسترس است را در اینجا نمایش میدهیم
                پراپرتی
                number
                را از آبجکت
                result
                استخراج کن و نمایش بده -->

                There are currently <b>{{result.number}}</b> people in space

            </div>

            <div class="row">

                <!-- در پراپرتی
                people
                از آبجکت
                result
                لوپ بزن و برای هر آبجکت موجود در این آرایه اسم
                person
                را انتخاب کن و سپس
                پراپرتی های
                name و craft
                را در تگ های مربطه پرینت کن -->

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

// پکیج اکسیوس را ایمپرت کن این پکیج برای ریکوست زدن به
// api
// ها استفاده میشود
import axios from 'axios';


export default {

    // در این بخش دستوراتی را که قصد داریم هنگام باز شدن صفحه به صورت اتوماتیک اجرا شوند را مینویسیم
    mounted : function () {

        // به آدرس مربوطه یک ریکوست از نوع
        // GET
        // بزن و نتایج برگشت داده شده از این آدرس را در متغیری به اسم res
        // بریز
        axios.get('http://api.open-notify.org/astros.json').then( res => {

            // داده های برگشت داده شده از
            // api
            // همواره دو پراپرتی
            // status و data
            // دارند
            // status = یک عدد است و هر عدد یک مفهوم خاصی دارد. به عنوان مثال کد 200 بیانگر موفقیت آمیز بودن ریکوست است.

            if (res.status == 200) {
                // اگر ریکوست موفقیت آمیز بود داده های برگشتی که از طریق پراپرتی
                // data
                // قابل دسترس است را در متغیر
                // result
                // که در بخش
                // data
                // تعریف کردیم بریز
                this.result = res.data;
            }

            // مقدار لودینگ را برابر با
            // false
            // قرار بده چرا که پس از اجرای خطوط بالا لودینگ ما تمام شده
            this.loading = false;
        });


    },

    // در این بخش داده های مورد نیازمان را تعریف میکنیم
    data : function () {
        return {
            loading : true,
            result : {}
        }
    }
}
</script>
