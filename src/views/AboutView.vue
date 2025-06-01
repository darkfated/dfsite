<template>
    <div class="about">
        <section class="section about-hero">
            <div class="container">
                <h1 class="section-title">Обо мне</h1>
                <p class="section-subtitle">Немного информации о том, кто я и чем занимаюсь</p>

                <div class="about-content glass-card">
                    <div class="about-text">
                        <h2>🖥️ Разработчик</h2>
                        <p>Привет! Меня зовут DarkFated, я программирую на Go, а также знаком с Python. Выбрал профессию
                            backend-разработчика, потому что люблю алгоритмы и низкий уровень понимания языка</p>
                        <p>Также увлекаюсь фронтом, на нём пишу свои проекты, а также участвую в разработке
                            информационных систем у других</p>
                        <p>Кроме этого, с детства занимаюсь моддингом в играх на языке Lua. Это и SAMP, и Garry's Mod
                            (до сих пор)</p>
                        <p>Знаток во всём, но понемногу. Поэтому стремлюсь к большему!</p>
                    </div>
                    <div class="about-decoration">
                        <div class="about-shape"></div>
                    </div>
                </div>

                <div class="about-content glass-card">
                    <div class="about-text">
                        <h2>📱 Медиа</h2>
                        <p>Занимаюсь ютуб-деятельностью, где количество подписчиков насчитывает свыше двух тысяч</p>
                        <p>Также развиваю Telegram канал с 300+ подписчиков, где делюсь контентом от своей личной жизни
                            до игр и кодинга</p>
                        <p>В свободное время люблю заниматься этим и дарить полезный контент зрителям.</p>
                    </div>
                    <div class="about-decoration">
                        <div class="about-shape media-shape"></div>
                    </div>
                </div>
            </div>
        </section>

        <section class="section skills-section">
            <div class="container">
                <h2 class="section-title">Мои знания</h2>

                <div class="tech-stack grid three-column">
                    <div class="tech-category glass-card">
                        <h3 class="tech-title">👨‍💻 Языки программирования</h3>
                        <ul class="tech-list">
                            <li>Golang</li>
                            <li>Python</li>
                            <li>C#</li>
                            <li>C++</li>
                            <li>JavaScript</li>
                            <li>Lua</li>
                            <li>HTML/CSS</li>
                        </ul>
                    </div>

                    <div class="tech-category glass-card">
                        <h3 class="tech-title">🛠️ Фреймворки и инструменты</h3>
                        <ul class="tech-list">
                            <li><strong>Go:</strong> Gin, Beego</li>
                            <li><strong>Python:</strong> Django, FastAPI, Flask, Pytest</li>
                            <li><strong>C#/C++:</strong> Qt6, WPF, ASP.NET, Entity Framework</li>
                            <li><strong>Frontend:</strong> Vue.js, React</li>
                            <li><strong>DevOps:</strong> Docker, Nginx, CMake</li>
                        </ul>
                    </div>

                    <div class="tech-category glass-card">
                        <h3 class="tech-title">🗄️ Базы данных</h3>
                        <ul class="tech-list">
                            <li>MySQL</li>
                            <li>PostgreSQL</li>
                            <li>SQLite</li>
                            <li>MongoDB</li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
export default {
    name: 'AboutView'
}
</script>

<style scoped>
.about-hero {
    background-color: var(--dark-bg);
    text-align: center;
    padding-bottom: 40px;
}

.about-content {
    padding: 40px;
    margin-bottom: 40px;
    position: relative;
    display: flex;
    border-radius: 12px;
}

.about-text {
    flex: 1;
    position: relative;
    z-index: 2;
}

.about-text h2 {
    color: var(--primary-color);
    margin-top: 0;
    margin-bottom: 20px;
    font-size: 1.8rem;
}

.about-text p {
    margin-bottom: 20px;
    line-height: 1.6;
    color: var(--text-color);
}

.about-decoration {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    width: 40%;
    overflow: hidden;
    z-index: 1;
}

.about-shape {
    position: absolute;
    top: -50%;
    right: -50%;
    width: 150%;
    height: 200%;
    background: radial-gradient(ellipse at center, rgba(142, 68, 173, 0.1) 0%, transparent 70%);
    border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
    transform: rotate(45deg);
}

.media-shape {
    background: radial-gradient(ellipse at center, rgba(231, 76, 60, 0.1) 0%, transparent 70%);
    transform: rotate(-45deg);
}

.tech-category {
    padding: 30px;
    border-radius: 12px;
    transition: transform 0.3s, box-shadow 0.3s;
}

.tech-category:hover {
    transform: translateY(-5px);
}

.tech-title {
    color: var(--primary-color);
    margin-bottom: 20px;
    font-size: 1.3rem;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
}

.tech-list {
    padding-left: 20px;
    margin: 0;
    line-height: 1.8;
}

.tech-list li {
    margin-bottom: 8px;
    color: var(--light-text);
}

.tech-list strong {
    color: var(--primary-color);
}

@media (max-width: 768px) {
    .about-content {
        padding: 25px;
        flex-direction: column;
        position: relative;
        overflow: hidden;
    }

    .about-decoration {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        right: 0;
        margin-top: 0;
        z-index: 1;
    }

    .about-shape {
        position: absolute;
        top: -50%;
        right: -50%;
        width: 150%;
        height: 200%;
    }

    .about-text {
        position: relative;
        z-index: 2;
    }

    .tech-category {
        padding: 25px;
    }

    .tech-title {
        font-size: 1.2rem;
    }

    .tech-list {
        padding-left: 15px;
    }

    .tech-list li {
        margin-bottom: 6px;
        font-size: 0.95rem;
    }
}

@media (max-width: 480px) {
    .about-content {
        padding: 20px;
    }

    .about-text h2 {
        font-size: 1.5rem;
        margin-bottom: 15px;
    }

    .about-text p {
        font-size: 0.95rem;
        margin-bottom: 15px;
    }

    .tech-category {
        padding: 20px;
    }

    .tech-title {
        font-size: 1.1rem;
    }

    .tech-list li {
        font-size: 0.9rem;
    }
}
</style>