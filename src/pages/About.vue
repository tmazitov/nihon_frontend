<template>
    <div class="fcc about__page">
        <div class="fcc title__cont card">
            <div class="title">Nihon</div>
            <div class="descriprion">
                Application for learning and repeating words. Test your knowledge of words
            </div>
        </div>

        <div class="card">
            Write down new words to record the process of learning a language
        </div>

        <div class="card">
            Compete with your friends in the knowledge of words
        </div>
    </div>
</template>

<script>
export default {
    name: 'AboutPage',
}
</script>

<style scoped>
.card{
    border-radius: 7px;
    background: #e1e1e1;
    margin-top: 32px;
    width: 700px;
    padding: 15px;
}
.about__page{
    flex-direction: column;
}
.title__cont{
    gap: 15px;
}

.title{
    font-size: 96px
}
</style>