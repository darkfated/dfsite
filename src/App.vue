<template>
    <HeaderComponent />
    <router-view />
    <FooterComponent />
</template>

<script>
import HeaderComponent from '@/components/HeaderComponent.vue'
import FooterComponent from '@/components/FooterComponent.vue'

export default {
    name: 'App',
    components: {
        HeaderComponent,
        FooterComponent
    }
}
</script>

<style>
body {
    margin: 0;
    padding: 0;
    font-family: 'Roboto', sans-serif;
    background-color: var(--dark-bg);
    color: var(--text-color);
}

#app {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    padding-top: 70px;
}

.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
}

@media (max-width: 768px) {
    #app {
        padding-top: 60px;
    }
}
</style>
