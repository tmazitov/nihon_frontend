<template>
    <div class="fcc about__page">
        <div class="page__content">
            <div class="fcc title__cont card">
                <div class="title">Nihon</div>
                <div class="descriprion">
                    Application for learning and repeating words. Test your knowledges!
                </div>
            </div>

            <div class="card">
                Write down new words to record the process of learning a language
            </div>

            <div class="card">
                Compete with your friends in the knowledge of words
            </div>
        </div>

    </div>
</template>

<script>
export default {
    name: 'AboutPage',
}
</script>

<style scoped>

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