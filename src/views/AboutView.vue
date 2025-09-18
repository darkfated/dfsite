<template>
    <div class="about">
        <section class="hero">
            <div class="container">
                <h1 class="title">Обо мне</h1>
                <p class="subtitle">Кем я являюсь?</p>

                <div class="card glass">
                    <h2>Разработчик</h2>
                    <p>Создаю backend-микросервисы на Golang и Python. Поддерживаю архитектуру, пишу техническую
                        документацию, занимаюсь DevOps и проектированием.</p>
                    <p>Интересуюсь моддингом в играх: Garry's Mod, Unturned, CS2, Rust, s&box.</p>
                </div>

                <div class="card glass">
                    <h2>Медиа</h2>
                    <p>Веду YouTube-канал и Telegram-канал. Публикую обучающий и развлекательный контент, делюсь опытом
                        и идеями.</p>
                </div>
            </div>
        </section>

        <section class="skills">
            <div class="container">
                <h2 class="section-title">Мои знания</h2>

                <div class="skills-grid">
                    <div class="skill-card glass">
                        <h3>Языки</h3>
                        <div class="chips">
                            <span v-for="(lang, i) in languages" :key="i" class="chip">{{ lang }}</span>
                        </div>
                    </div>

                    <div class="skill-card glass">
                        <h3>Фреймворки и инструменты</h3>
                        <div class="list">
                            <div class="item"><strong>Go:</strong> Gin, Beego</div>
                            <div class="item"><strong>Python:</strong> FastAPI, Django, Flask</div>
                            <div class="item"><strong>Frontend:</strong> Vue.js</div>
                            <div class="item"><strong>DevOps:</strong> Docker, Nginx, Kubernetes</div>
                            <div class="item"><strong>Тестирование:</strong> Pytest, Testify</div>
                        </div>
                    </div>

                    <div class="skill-card glass">
                        <h3>Базы данных и очереди</h3>
                        <div class="chips">
                            <span v-for="(db, i) in databases" :key="i" class="chip">{{ db }}</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
export default {
    name: 'AboutView',
    data() {
        return {
            languages: ['Golang', 'Python', 'C#', 'C++', 'JavaScript', 'Lua', 'HTML/CSS'],
            databases: ['PostgreSQL', 'MySQL', 'SQLite', 'MongoDB', 'Redis', 'ClickHouse', 'Kafka', 'RabbitMQ']
        }
    }
}
</script>

<style scoped>
:root {
    --dark-bg: #0f1224;
    --card-bg: rgba(255, 255, 255, 0.03);
    --glass-border: rgba(255, 255, 255, 0.06);
    --primary-color: #6f4bff;
    --text-color: #dbe5ff;
    --muted: #9aa7c7;
    --glass-shadow: 0 8px 30px rgba(7, 8, 15, 0.6);
    --glass-blur: 10px;
}

.about {
    min-height: 100vh;
    background: linear-gradient(180deg, rgba(12, 13, 20, 1) 0%, rgba(18, 19, 32, 1) 100%);
    color: var(--text-color);
    padding: 36px 16px;
    font-family: Inter, "Segoe UI", Roboto, system-ui, -apple-system, "Helvetica Neue", Arial;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}

.container {
    max-width: 1100px;
    margin: 0 auto;
    padding: 0 14px;
}

.title {
    font-size: 2.1rem;
    margin: 2px 0 6px;
    letter-spacing: -0.02em;
    color: var(--text-color);
}

.subtitle {
    color: var(--muted);
    margin: 0 0 18px;
}

.hero {
    padding: 12px 0 28px;
}

.card {
    padding: 18px;
    border-radius: 12px;
    margin-bottom: 16px;
    line-height: 1.6;
    transition: transform 0.18s ease, box-shadow 0.18s ease;
}

.card:hover {
    transform: translateY(-6px);
    box-shadow: 0 18px 40px rgba(5, 6, 12, 0.6);
}

.card h2 {
    margin: 0 0 8px;
    color: var(--primary-color);
    font-size: 1.05rem;
}

.card p {
    margin: 0 0 10px;
    color: var(--text-color);
    font-size: 0.98rem;
}

.glass {
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.02), rgba(255, 255, 255, 0.01));
    border: 1px solid var(--glass-border);
    box-shadow: var(--glass-shadow);
    backdrop-filter: blur(var(--glass-blur));
    -webkit-backdrop-filter: blur(var(--glass-blur));
}

.skills {
    padding-bottom: 30px;
}

.section-title {
    margin: 12px 0 14px;
    font-size: 1.4rem;
    color: var(--text-color);
}

.skills-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 14px;
}

.skill-card {
    padding: 16px;
    border-radius: 12px;
    transition: transform 0.22s ease, box-shadow 0.22s ease;
}

.skill-card:hover {
    transform: translateY(-8px);
    box-shadow: 0 18px 50px rgba(15, 12, 40, 0.6);
}

.chips {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-top: 10px;
}

.chip {
    padding: 8px 12px;
    border-radius: 999px;
    background: linear-gradient(180deg, rgba(255, 255, 255, 0.02), rgba(255, 255, 255, 0.01));
    border: 1px solid rgba(255, 255, 255, 0.04);
    color: var(--text-color);
    font-size: 0.9rem;
    box-shadow: 0 6px 18px rgba(7, 8, 15, 0.45);
    white-space: nowrap;
}

.list {
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-top: 10px;
    color: var(--text-color);
    font-size: 0.95rem;
}

.item strong {
    color: var(--primary-color);
    margin-right: 6px;
    font-weight: 700;
}

/* Адаптив: планшет */
@media (max-width: 1000px) {
    .skills-grid {
        grid-template-columns: repeat(2, 1fr);
    }

    .title {
        font-size: 1.95rem;
    }

    .card {
        padding: 16px;
    }
}

/* Адаптив: мобильный */
@media (max-width: 600px) {
    .about {
        padding: 20px 12px;
    }

    .container {
        padding: 0 10px;
    }

    .title {
        font-size: 1.6rem;
    }

    .subtitle {
        font-size: 0.95rem;
        margin-bottom: 12px;
    }

    .card {
        padding: 14px;
        border-radius: 10px;
    }

    .card h2 {
        font-size: 1rem;
    }

    .card p {
        font-size: 0.95rem;
    }

    .skills-grid {
        grid-template-columns: 1fr;
        gap: 12px;
    }

    .chip {
        padding: 7px 10px;
        font-size: 0.88rem;
    }

    .list {
        font-size: 0.92rem;
    }
}

/* Маленькие экраны */
@media (max-width: 380px) {
    .title {
        font-size: 1.45rem;
    }

    .subtitle {
        font-size: 0.9rem;
    }

    .card p {
        font-size: 0.9rem;
    }

    .chip {
        font-size: 0.82rem;
        padding: 6px 8px;
    }
}
</style>
