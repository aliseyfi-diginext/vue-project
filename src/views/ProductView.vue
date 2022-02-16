<template>
    <hr>
    <div class="text-center">
        <button type="button" @click="add"> Add Another Product </button>
    </div>
    <hr>
    <div v-for="product in products" class="product-row">
        <div class="form-group">
            <label> Product Name </label>
            <input type="text" v-model="product.name">
        </div>
        <div class="form-group">
            <label> Product Price </label>
            <input @input="calcPayable(product)" type="number" v-model="product.price">
        </div>
        <div class="form-group">
            <label> Discount Percent </label>
            <input @input="calcPayable(product)" type="number" min="0" max="100" v-model="product.percent">
        </div>
        <div class="">
            <b> Payable : </b> <span> {{product.payable ? product.payable.toLocaleString() : null}} </span>
        </div>
    </div>
    <hr>
    <div v-if="sum" class="text-right">
        {{sum.toLocaleString()}}
    </div>
</template>


<script>

export default {
    data : function () {
        return {
            products : [{}]
        }
    },
    methods : {
        add : function () {
            this.products.push({})
        },
        calcPayable : function (product) {
            var price = product.price;
            var percent = product.percent || 0;
            if (percent < 0 || percent > 100) {
                percent = ''+percent;
                product.percent = percent.slice(0, -1);
                alert('Please enter a number between 0 to 100');
            }
            if (price) {
                var pyable = price - ((percent * price)/ 100);
            }else {
                var payable = price ? price : 0;
            }
            product.payable = pyable;
        }
    },
    computed : {
        sum : function () {
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

    .product-row > .form-group {

    }
</style>
