<template>

    <!-- اگر مقدار
    finished == true
    بود تگ زیر را نمایش بده -->
    <div v-if="finished" class="text-center container">
        <div class="alert alert-success">
            <p> You answered <b>{{corrects}}</b> question<span v-if="corrects > 1">s</span> currectly </p>
            <p> Your IQ is : <b>{{iq}}</b> </p>
        </div>
    </div>

    <!-- در غیر اینصورت تگ زیر را نمایش بده -->
    <div v-else class="d-flex justify-content-around">

        <!-- نمایش منو سوالات که با لوپ زدن بین آرایه‌ی
        questions
        اتفاق می‌افتد -->
        <div class="menu p-5 w-25">

            <!-- در این حلقه تکرار مقادیر
            q
            به ترتیب از 1 تا 35 است
            سوال فعلی که در حال نمایش است هم از طریق
            currentQuestion
            قابل دسترس است
            اگر
            currentQuestion == q
            کلاس
            current
            را به دکمه بده
            و اگر هم در آرایه‌ی
            answers
            برای
            q
            مورد نظر پاسخی موجود بود کلاس
            answered
            را نیز به دکمه بده -->
            <button v-for="q in questions" @click="goTo(q)"
                :class="{'current' : currentQuestion == q, 'answered' : answers[q]}"
                type="button" class="btn btn-outline-primary m-2">
                {{q}}
            </button>

            <hr>

            <!-- با کلیک بر روی این دکه متد
            finalize
            صدا زده میشود -->
            <div class="text-center">
                <button type="button" class="btn btn-primary" @click="finalize"> Finalize </button>
            </div>

        </div>

        <!-- در این قسمت با لوپ زدن بین سوالات آنها را نمایش میدهیم
        فقط توجه داشته باشید که در صورتی که شرط
        q == currentQuestion
        قرار داده شده که باعث میشود فقط سوال فعلی نمایش داده شود، نه همه سوالات -->

        <div class="w-75 questions-container">
            <div v-for="q in questions" class="question">
                <div v-if="q == currentQuestion">

                    <!-- مثلا اگر
                    q
                    برابر با 25 باشد تصویر
                    q25.png
                    ضمیمه میشود -->
                    <img :src="`/img/q${q}.png`">

                    <div class="options">

                        <!-- بین همه‌ی کاراکتر ها، یعنی کاراکتر های
                        a~f
                        که در متغیر
                        options
                        قابل دسترس است لوپ میزنیم و نام هر کاراکتر را
                        char
                        میگذاریم -->

                        <!-- حال مثلا اگر
                        q
                        برابر با 25 و
                        char
                        برابر با
                        e
                        باشد، تصویر
                        q25e.png
                        ضمیمه میشود -->

                        <!-- پاسخی که کاربر به این سوال داده از طریق
                        answers[q]
                        قابل دسترس است و اگر
                        answers[q] == char
                        کلاس
                        answered
                        را به این تصویر بده -->

                        <img @click="saveAnswer(char)" :class="answers[q] == char ? 'answered' : ''" v-for="char in options" :src="`/img/q${q}${char}.png`">

                        <!-- با کلیک بر روی این تصویر متد
                        saveAnswer
                        صدا زده میشود و کاراکتر مربوطه به آن پاس داده میشود -->

                    </div>

                    <hr>

                    <div class="navigation-links">

                        <!-- اگر سوال فعلی از یک بزرگتر بود این دکمه را نمایش بده و باکلیک روی این دکمه متد
                        prev
                        را صدا بزن -->
                        <button type="button" v-if="currentQuestion > 1" @click="prev" class="btn btn-outline-primary mx-1" name="button">
                            Previous Question
                        </button>

                        <!-- اگر سوال فعلی از تعداد کل سوالات کوچکتر بود این دکه را نمایش بده و با کلیک روی این دکمه متد
                        next
                        را صدا بزن -->
                        <button type="button" v-if="currentQuestion < questions.length" @click="next" class="btn btn-primary mx-1" name="button">
                            Next Question
                        </button>

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

// فایلی که درآن پاسخ صحیح سوالات موجود است را ایمپورت کن
import correctAnswers from '../jsons/answers.json';

export default {

    // در این بخش داده های مورد نیازمان را تعریف میکنیم
    data : function () {
        return {

            // تشکیل یک آرایه که حاوی اعداد یک تا 35 است
            questions : Array.from({length: 35}, (x, i) => i+1),

            // تشکیل یک آرایه از کاراکتر های مورد نیاز
            options : ['a', 'b', 'c', 'd', 'e', 'f'],

            // اگر در روت مورد نظر عدد سوال آورده شده که مقدار سوال فعلی را با آن قرار بده در غیر اینصورت سوال فعلی 1 میباشد
            currentQuestion : this.$route.params.number || 1,

            // جوابی که کاربر به سوالات میدهد در این متغیر ذخیر میشود
            answers : {},

            // متغیری برای تشخیص اینکه کاربر روی دکمه خاتمه دادن کلیک کرده یا خیر
            finished : false,

            // پاسخ های صحیح از فایل جیسان ایمپورت شد را در این متغیر میریزیم
            correctAnswers : correctAnswers
        }
    },

    // در این قسمت توابع یا متد های مورد نیازمان را تعریف میکنیم
    methods : {

        // تابعی جهت هدایت کردن کاربر به سوال بعدی
        next : function () {
            var q = Number(this.currentQuestion);
            this.goTo(q + 1);
        },

        // تابعی جهت هدایت کردن کاربر به سوال قبلی
        prev : function () {
            var q = Number(this.currentQuestion);
            this.goTo(q - 1);
        },
        goTo : function (number) {
            this.currentQuestion = number;
            this.$router.push(`/quiz/${number}`);
        },

        // این تابع کاراکتر مورد نظر را به عنوان ورودی میگیرد و آن را در در آرایه‌ای که پاسخ سوالات را در آن قرار میدادیم ذخیره میکند
        saveAnswer : function (char) {
            var q = this.currentQuestion;
            this.answers[q] = char;
            this.next()
        },

        // تابعی برای نهایی سازی و خاتمه دادن کویز
        finalize : function () {
            this.finished = true;
        }

    },

    // در این قسمت داده هایی که برای تایین مقدار آنها به یک سری محاسبات نیاز داریم را تعریف میکنیم
    computed : {

        // به دست آوردن تعداد پاسخ های صحیح کاربر
        corrects : function () {
            var answers = this.answers;
            var corrects = 0;

            // بین همه پاسخ های کاربر لوپ بزن و اگر پاسخی که کاربر به آن سوال داده با پاسخ صحیح برابر بود یک واحد به مقدار
            // corrects
            // اضافه کن
            for (var key in answers) {
                if (correctAnswers[key] == answers[key]) {
                    corrects++;
                }
            }

            return corrects;
        },

        // به دست آوردن آیکیو شخص با توجه به تعداد پاسخ های صحیح و فرمول از قبل تایین شده
        iq : function () {
            return 85 + Math.round((this.corrects*60)/35);
        }
    }

}

</script>


<style>
    .question {
        text-align: center;
    }

    .options {
        margin-top: 40px;
    }

    .options > img {
        margin: 0 10px;
        border: 3px solid white;
        cursor: pointer;
        padding: 10px;
        padding-left: 20px;
    }

    .options > img:hover {
        border-color: blue;
    }

    .options > img.answered {
        border-color: green;
    }

    .menu > button {
        width: 50px;
        border-width: 2px;
    }

    .menu > button.current {
        border-style: dashed;
    }

    .menu > button.answered {
        border-color: green;
        color: green;
        border-style: dashed;
    }

    .menu > button.answered:hover {
        background: none;
        border-style: solid;
    }

</style>
