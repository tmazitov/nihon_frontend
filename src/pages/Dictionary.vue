<template>
    <div class="fcc dictionary__page">
        <div class="page__content">
            <div class="dictionary__container card">
                <div class="main__title">Dictionary</div>
                <div class="dictionary__content">
                    <div class="dictionary__item"
                    v-for="dict, index in dictionaries" 
                    :key="`dictionary__${index}`">
                        <div class="title">{{dict.title}}</div>
                        <div class="count">Words: {{dict.wordsCount}}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {reactive} from 'vue'

export default {
    name: 'DictionaryPage',
    setup() {   
        const dictionaries = reactive([
            {
                title: "Japanese pets",
                wordsCount: 17,
            },
            {
                title: "English family",
                wordsCount: 12,
            }
        ])

        return {dictionaries}
    }
}
</script>

<style scoped>
.dictionary__container{
    height: 350px;
    display: flex;
    flex-direction: column;
    gap: 16px;
    background: white;
    border: 2.5px solid #e1e1e1
}

.dictionary__content{
    display: grid;
    grid-template-columns: repeat(2, auto);
    grid-column-gap: 16px;
}

.dictionary__item{
    border: 2.5px solid #3c6e71;
    border-radius: 7px;
    padding: 6px 8px;
    padding-bottom: 4px;
    background: white;
    cursor: pointer;
    position: relative;
}

.dictionary__item:hover{
    -webkit-box-shadow: 0px 0px 11px 4px rgba(60, 110, 113, 0.2);
-moz-box-shadow: 0px 0px 11px 4px rgba(60, 110, 113, 0.2);
box-shadow: 0px 0px 11px 4px rgba(60, 110, 113, 0.2);
}

.dictionary__item > .count {
    position: absolute;
    right: 8px;
    top: 6px;
    color:#9b9b9b;
}

.dictionary__item > .title {
    width: fit-content;
}
</style>                                