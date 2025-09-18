<template>
    <div class="home">
        <section class="hero">
            <div class="container">
                <div class="hero-content">
                    <h1 class="hero-title">Привет, я <span class="accent">DarkFated</span></h1>
                    <p class="hero-subtitle">Знаток во всём, но понемногу</p>
                    <div class="hero-buttons">
                        <router-link to="/contact" class="btn btn-accent">Мои ссылки</router-link>
                    </div>
                </div>
            </div>
            <div class="hero-shapes">
                <div class="shape shape-1"></div>
                <div class="shape shape-2"></div>
                <div class="shape shape-3"></div>
            </div>
        </section>

        <section class="section about-preview">
            <div class="container">
                <div class="about-preview-content glass-card">
                    <div class="about-preview-icon">🧩</div>
                    <h2 class="about-preview-title">Создаю <span class="text-accent">современные</span> решения</h2>
                    <p class="about-preview-text">
                        Являюсь backend-разработчиком и медиа создателем. Обычном пишу код на Golang и Python. Также
                        разрабатываю аддоны для Garry's Mod
                    </p>
                    <router-link to="/about" class="about-preview-link">Узнать больше обо мне <i
                            class="fas fa-arrow-right"></i></router-link>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    name: 'HomeView',
    computed: {
        skills() {
            return this.getSkills
        }
    }
}
</script>

<style scoped>
.hero {
    min-height: 100vh;
    display: flex;
    align-items: center;
    background: linear-gradient(135deg, #121212 0%, #000000 100%);
    color: var(--text-color);
    position: relative;
    overflow: hidden;
    padding: 60px 0;
}

.hero::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(circle at 20% 50%, rgba(142, 68, 173, 0.15) 0%, transparent 50%);
}

.hero-content {
    max-width: 800px;
    text-align: center;
    margin: 0 auto;
    position: relative;
    z-index: 2;
}

.hero-title {
    font-size: 4rem;
    margin: 0 0 20px;
    animation: fadeInDown 1s ease;
}

.hero-subtitle {
    font-size: 1.5rem;
    margin: 0 0 40px;
    color: var(--light-text);
    animation: fadeInUp 1s ease;
    line-height: 1.5;
}

.accent {
    color: var(--primary-color);
    background: linear-gradient(to right, var(--primary-color), var(--highlight));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}

.hero-buttons {
    display: flex;
    justify-content: center;
    gap: 20px;
    animation: fadeIn 1.5s ease;
}

.hero-shapes {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
    pointer-events: none;
}

.shape {
    position: absolute;
    border-radius: 50%;
    filter: blur(60px);
    opacity: 0.15;
}

.shape-1 {
    top: 20%;
    left: 15%;
    width: 300px;
    height: 300px;
    background: var(--primary-color);
    animation: float 12s ease-in-out infinite;
}

.shape-2 {
    bottom: 15%;
    right: 10%;
    width: 400px;
    height: 400px;
    background: var(--accent-color);
    animation: float 15s ease-in-out infinite reverse;
}

.shape-3 {
    top: 50%;
    left: 50%;
    width: 200px;
    height: 200px;
    background: var(--highlight);
    animation: float 10s ease-in-out infinite;
}

.about-preview {
    padding: 100px 0;
}

.about-preview-content {
    max-width: 800px;
    margin: 0 auto;
    text-align: center;
    padding: 60px 40px;
    position: relative;
    border-radius: 15px;
}

.about-preview-icon {
    font-size: 3rem;
    margin-bottom: 20px;
}

.about-preview-title {
    font-size: 2rem;
    margin-bottom: 25px;
    color: var(--text-color);
}

.text-accent {
    color: var(--primary-color);
}

.about-preview-text {
    font-size: 1.2rem;
    line-height: 1.6;
    margin-bottom: 30px;
    color: var(--light-text);
}

.about-preview-link {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    font-size: 1.1rem;
    transition: all 0.3s;
}

.about-preview-link:hover {
    transform: translateX(5px);
}

@keyframes float {
    0% {
        transform: translateY(0);
    }

    50% {
        transform: translateY(-20px);
    }

    100% {
        transform: translateY(0);
    }
}

@keyframes fadeInDown {
    from {
        opacity: 0;
        transform: translateY(-50px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(50px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes fadeIn {
    from {
        opacity: 0;
    }

    to {
        opacity: 1;
    }
}

@media (max-width: 768px) {
    .hero {
        padding: 100px 0 60px;
    }

    .hero-title {
        font-size: 3rem;
    }

    .hero-subtitle {
        font-size: 1.2rem;
        margin-bottom: 30px;
    }

    .about-preview {
        padding: 60px 0;
    }

    .about-preview-content {
        padding: 40px 30px;
    }

    .about-preview-title {
        font-size: 1.7rem;
    }

    .about-preview-text {
        font-size: 1.1rem;
    }
}

@media (max-width: 480px) {
    .hero-title {
        font-size: 2.5rem;
    }

    .hero-subtitle {
        font-size: 1rem;
    }

    .hero-buttons {
        flex-direction: column;
        gap: 15px;
        width: 100%;
        max-width: 250px;
        margin: 0 auto;
    }

    .btn {
        width: 100%;
        text-align: center;
    }

    .about-preview-content {
        padding: 30px 20px;
    }

    .about-preview-title {
        font-size: 1.5rem;
    }

    .about-preview-text {
        font-size: 1rem;
    }

    .shape {
        filter: blur(40px);
    }
}
</style>