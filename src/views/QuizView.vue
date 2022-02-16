<template>
    <div v-if="finished" class="text-center container">
        <div class="alert alert-success">
            <p> You answered <b>{{corrects}}</b> question<span v-if="corrects > 1">s</span> currectly </p>
            <p> Your IQ is : <b>{{iq}}</b> </p>
        </div>
    </div>
    <div v-else class="d-flex justify-content-around">
        <div class="menu p-5 w-25">
            <button v-for="q in questions" @click="goTo(q)"
                :class="{'current' : currentQuestion == q, 'answered' : answers[q]}"
                type="button" class="btn btn-outline-primary m-2">
                {{q}}
            </button>
            <hr>
            <div class="text-center">
                <button type="button" class="btn btn-primary" @click="finalize"> Finalize </button>
            </div>
        </div>
        <div class="w-75 questions-container">
            <div v-for="q in questions" class="question">
                <div v-if="q == currentQuestion">
                    <img :src="`/img/q${q}.png`">
                    <div class="options">
                        <img @click="saveAnswer(char)" :class="answers[q] == char ? 'answered' : ''" v-for="char in options" :src="`/img/q${q}${char}.png`">
                    </div>
                    <hr>
                    <div class="navigation-links">
                        <button type="button" v-if="currentQuestion > 1" @click="prev" class="btn btn-outline-primary mx-1" name="button">
                            Previous Question
                        </button>
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

import correctAnswers from '../jsons/answers.json';

export default {
    data : function () {
        return {
            questions : Array.from({length: 35}, (x, i) => i+1),
            options : ['a', 'b', 'c', 'd', 'e', 'f'],
            currentQuestion : this.$route.params.number || 1,
            answers : {},
            finished : false,
            correctAnswers : correctAnswers
        }
    },
    methods : {
        next : function () {
            var q = Number(this.currentQuestion);
            this.goTo(q + 1);
        },
        prev : function () {
            var q = Number(this.currentQuestion);
            this.goTo(q - 1);
        },
        goTo : function (number) {
            this.currentQuestion = number;
            this.$router.push(`/quiz/${number}`);
        },
        saveAnswer : function (char) {
            var q = this.currentQuestion;
            this.answers[q] = char;
            this.next()
        },
        finalize : function () {
            this.finished = true;
        }
    },
    computed : {
        corrects : function () {
            var answers = this.answers;
            var corrects = 0;
            for (var key in answers) {
                if (correctAnswers[key] == answers[key]) {
                    corrects++;
                }
            }
            return corrects;
        },
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
