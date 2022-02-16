<template>

    <div class="text-center">
        <!-- هنگامی که روی این دکمه کلیک شد متد
        add
        را صدا بزن -->
        <button type="button" @click="add"> Add Another Product </button>
    </div>

    <hr>

    <!-- در بین داده
    products
    لوپ بزن و برای هر عنصر موجود در این آرایه نام
    product
    را انتخاب کن -->
    <div v-for="product in products" class="product-row">

        <div class="form-group">
            <label> Product Name </label>
            <input type="text" v-model="product.name">
        </div>

        <div class="form-group">
            <!-- هنگامی که کاربر روی این اینپوت تایپ میکند متد
            calcPayable
            را صدا بزن و آبجکت
            product
            را به عنوان آرگومان به آن پاس بده -->
            <label> Product Price </label>
            <input @input="calcPayable(product)" type="number" v-model="product.price">
        </div>

        <div class="form-group">
            <!-- هنگامی که کاربر روی این اینپوت تایپ میکند متد
            calcPayable
            را صدا بزن و آبجکت
            product
            را به عنوان آرگومان به آن پاس بده -->
            <label> Discount Percent </label>
            <input @input="calcPayable(product)" type="number" min="0" max="100" v-model="product.percent">
        </div>

        <div class="">
            <!-- اگر برای آبجکت
            product
            پراپرتی
            payable
            ست شده بود
            آنرا به صورت
            toLocaleString
            نمایش بده در غیر اینصورت چیزی نمایش نده
            toLocaleString = اعداد را با کاما از هم جدا میکند -->
            <b> Payable : </b> <span> {{product.payable ? product.payable.toLocaleString() : null}} </span>
        </div>
    </div>

    <hr>

    <!-- اگر مقدار
    sum
    که از بخش
    computed
    به دست می آید موجود بود، تگ زیر را نمایش بده -->
    <div v-if="sum" class="text-right">
        <!-- toLocaleString = اعداد را با کاما از هم جدا میکن -->
        {{sum.toLocaleString()}}
    </div>

</template>


<script>

export default {

    // در این بخش داده های مورد نیازمان را تعریف میکنیم
    data : function () {
        return {
            products : [{}]
        }
    },

    // در این قسمت توابع یا متد های مورد نیازمان را تعریف میکنیم
    methods : {

        add : function () {

            // این متد یک آبجکت خالی به آرایه‌ی
            // products
            // اضافه میکند

            this.products.push({});

            // برای آشنایی بیشتر با تابع
            // push
            // میتوانید لینک زیر را مطالعه کنید
            // https://www.w3schools.com/jsref/jsref_push.asp

        },

        calcPayable : function (product) {

            // این متد محصوله مربوطه را به عنوان آرگومان دریافت میکند و با توجه به قیمت و درصد تخفیف که از پراپرتی های
            // price و percent
            // قابل دسترس هستند مقدار قابل پرداخت را محاسبه میکند و آن را در یک پراپرتی جدید با نام
            // payable
            // ذخیره میکند

            // قیمت محصول را دریک متغیر تعریف میکنیم
            var price = product.price;

            // اگر کاربر درصد تخفیف وارد کرده بود آن را در متغیر مربوطه بریز درغیر اینصورت درصد تخفیف را صفر در نظر بگیر
            var percent = product.percent || 0;

            // در این قسمت چک میکنیم که درصد تخفیف بین صفر تا صد باشد
            if (percent < 0 || percent > 100) {

                // اگر درصد تخفیفی که کاربر وارد کرده بیش  از 100 باشد باید آخرین کاراکتر آن را حذف کنیم
                // به عنوان مثال اگر کاربر تایپ کند 145، ما باید 5 را از آن حذف کنیم
                // ما میتوانیم از تایع
                // slice
                // برای حذف آخرین کاراکتر استفاده کنیم فقط ابتدا نیاز داریم درصد تخفیف که یک عدد هست را به متن تبدیل کنیم

                percent = ''+percent; // تیدیل از عدد به متن
                product.percent = percent.slice(0, -1); // حذف کردن آخرین کاراکتر متن مربوطه

                // برای آشنایی بیشتر با تابع
                // slice
                // میتوانید لینک زیر را مطالعه کنید
                // https://www.w3schools.com/jsref/jsref_slice_array.asp

                // از تابع زیر جهت نمایش پیغام به کاربر میتوانیم استفاده کنیم
                alert('Please enter a number between 0 to 100');

            }

            // حال که از صحت درصد تخفیف اطمینان پیدا کردیم باید مقدار قابل پرداخت را محاسبه کنیم
            if (price) {
                // اگر کاربر قیمت اولیه موجود بود، یا صفر نبود مقدار قابل پرداخت اینگونه محاسبه میشود
                var pyable = price - ((percent * price)/ 100);
            }else {
                // در غیر این صورت قابل پرداخت صفر است
                var payable = 0;
            }

            // مقدار قابل پرداخت که محاسبه شد را در یک پراپرتی جدید با نام
            // payable
            // بریز
            product.payable = pyable;

        }
    },

    // در این قسمت داده هایی که برای تایین مقدار آنها به یک سری محاسبات نیاز داریم را تعریف میکنیم

    computed : {

        sum : function () {
            // داده‌ی
            // products
            // یک آرایه از آبجکت هاست.
            // هر آبجکت میتواند یک پراپرتی با نام
            // payable
            // داشته باشد.
            // کد زیر مقدار
            // payable
            // موجود در همه آبجکت ها را با هم جمع میکند و آنرا بر میگرداند
            return this.products.reduce((a, b) => +a + +b.payable, 0);
        }

    }
}

</script>


<style>

    .text-center {
        text-align: center;
    }

    .text-right {
        text-align: right;
    }

    .product-row {
        margin: 10px 0;
        display: flex;
        justify-content: space-around;
    }

</style>
