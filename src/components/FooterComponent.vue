<template>
    <footer class="footer">
        <div class="container">
            <div class="footer-top">
                <div class="footer-brand glass">
                    <div class="logo-row">
                        <img src="@/assets/images/darkfated.jpeg" alt="DarkFated Logo" class="footer-logo-img" />
                        <div class="brand-text">
                            <h2 class="footer-logo-text">Dark<span class="accent">Fated</span></h2>
                            <p class="footer-tagline">Программирование • Медиа • Творчество</p>
                        </div>
                    </div>

                    <div class="footer-social">
                        <a href="https://t.me/darkfated_group" target="_blank" rel="noopener noreferrer"
                            class="social-link" aria-label="Telegram">
                            <img src="@/assets/svg/telegram.svg" alt="Telegram" class="social-icon" />
                        </a>
                        <a href="https://www.youtube.com/@darkfated" target="_blank" rel="noopener noreferrer"
                            class="social-link" aria-label="YouTube">
                            <img src="@/assets/svg/youtube.svg" alt="YouTube" class="social-icon" />
                        </a>
                    </div>
                </div>

                <div class="footer-nav glass">
                    <div class="nav-grid">
                        <div class="footer-nav-group">
                            <h3 class="footer-heading">Навигация</h3>
                            <ul class="footer-links">
                                <li><router-link to="/" class="footer-link">Главная</router-link></li>
                                <li><router-link to="/about" class="footer-link">Обо мне</router-link></li>
                                <li><router-link to="/blog" class="footer-link">Блог</router-link></li>
                                <li><router-link to="/contact" class="footer-link">Ссылки</router-link></li>
                            </ul>
                        </div>

                        <div class="footer-nav-group">
                            <h3 class="footer-heading">Контакты</h3>
                            <ul class="footer-links">
                                <li><a href="https://t.me/darkfated_group" target="_blank" rel="noopener noreferrer"
                                        class="footer-link">Telegram</a></li>
                                <li><a href="https://www.youtube.com/@darkfated" target="_blank"
                                        rel="noopener noreferrer" class="footer-link">YouTube</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <div class="footer-bottom">
                <div class="copyright">
                    <p>&copy; {{ currentYear }} DarkFated. Все права защищены.</p>
                </div>
                <div class="back-to-top" @click="scrollToTop" role="button" tabindex="0" @keydown.enter="scrollToTop">
                    <span class="arrow-up">↑</span>
                    <span class="top-text">Наверх</span>
                </div>
            </div>
        </div>
    </footer>
</template>

<script>
export default {
    name: 'FooterComponent',
    computed: {
        currentYear() {
            return new Date().getFullYear()
        }
    },
    methods: {
        scrollToTop() {
            window.scrollTo({ top: 0, behavior: 'smooth' })
        }
    }
}
</script>

<style scoped>
:root {
    --dark-bg: #0f1224;
    --card-bg: rgba(255, 255, 255, 0.02);
    --glass-border: rgba(255, 255, 255, 0.06);
    --primary-color: #6f4bff;
    --accent-color: #7cf2d6;
    --text-color: #dbe5ff;
    --light-text: #b9c6e8;
    --glass-shadow: 0 12px 40px rgba(6, 7, 14, 0.6);
    --glass-blur: 10px;
}

.footer {
    position: relative;
    color: var(--text-color);
    padding: 56px 0 28px;
    margin-top: auto;
    overflow: hidden;
    background: linear-gradient(180deg, rgba(10, 10, 10, 0) 0%, rgba(10, 10, 10, 1) 100%);
}

.container {
    max-width: 1100px;
    margin: 0 auto;
    padding: 0 16px;
    position: relative;
    z-index: 2;
}

.footer-top {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 28px;
    padding-bottom: 20px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.06);
    margin-bottom: 18px;
}

.footer-brand {
    padding: 18px;
    border-radius: 12px;
    background: linear-gradient(180deg, rgba(255, 255, 255, 0.015), rgba(255, 255, 255, 0.01));
    border: 1px solid var(--glass-border);
    box-shadow: var(--glass-shadow);
    backdrop-filter: blur(var(--glass-blur));
}

.logo-row {
    display: flex;
    align-items: center;
    gap: 12px;
}

.footer-logo-img {
    width: 46px;
    height: 46px;
    border-radius: 10px;
    object-fit: cover;
    border: 1px solid rgba(255, 255, 255, 0.04);
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.5);
}

.brand-text {
    display: flex;
    flex-direction: column;
}

.footer-logo-text {
    font-size: 1.6rem;
    margin: 0;
    font-weight: 700;
}

.accent {
    color: var(--primary-color);
}

.footer-tagline {
    margin: 4px 0 12px;
    color: var(--light-text);
    font-size: 0.95rem;
}

.footer-social {
    display: flex;
    gap: 12px;
    margin-top: 6px;
}

.social-link {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 44px;
    height: 44px;
    background: rgba(255, 255, 255, 0.02);
    border-radius: 10px;
    border: 1px solid rgba(255, 255, 255, 0.04);
    transition: transform 0.18s, box-shadow 0.18s, background 0.18s;
}

.social-icon {
    width: 20px;
    height: 20px;
    filter: brightness(0) invert(0.78);
    transition: filter 0.18s;
}

.social-link:hover {
    transform: translateY(-6px);
    background: linear-gradient(90deg, rgba(111, 75, 255, 0.14), rgba(124, 242, 214, 0.06));
    box-shadow: 0 14px 40px rgba(111, 75, 255, 0.08);
}

.social-link:hover .social-icon {
    filter: brightness(0) invert(1);
}

.footer-nav {
    padding: 18px;
    border-radius: 12px;
    background: linear-gradient(180deg, rgba(255, 255, 255, 0.015), rgba(255, 255, 255, 0.01));
    border: 1px solid var(--glass-border);
    box-shadow: var(--glass-shadow);
    display: flex;
    align-items: stretch;
    backdrop-filter: blur(var(--glass-blur));
}

.nav-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 18px;
    width: 100%;
}

.footer-nav-group {
    display: flex;
    flex-direction: column;
}

.footer-heading {
    color: var(--primary-color);
    font-size: 1rem;
    margin: 0 0 10px;
    font-weight: 600;
    padding-bottom: 8px;
    position: relative;
}

.footer-heading::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    width: 34px;
    height: 2px;
    background: var(--primary-color);
}

.footer-links {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.footer-link {
    color: var(--light-text);
    font-size: 0.95rem;
    text-decoration: none;
    transition: color 0.18s, transform 0.18s;
}

.footer-link:hover {
    color: var(--primary-color);
    transform: translateX(6px);
}

.footer-bottom {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 12px;
    flex-wrap: wrap;
    padding-top: 8px;
}

.copyright {
    font-size: 0.9rem;
    color: var(--light-text);
}

.back-to-top {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;
    padding: 8px 14px;
    background: rgba(111, 75, 255, 0.08);
    border-radius: 999px;
    transition: transform 0.16s, box-shadow 0.16s;
    user-select: none;
}

.arrow-up {
    font-size: 1.1rem;
    color: var(--primary-color);
}

.top-text {
    color: var(--text-color);
    font-weight: 600;
}

.back-to-top:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 36px rgba(111, 75, 255, 0.08);
}

.glass {
    background: linear-gradient(180deg, rgba(255, 255, 255, 0.015), rgba(255, 255, 255, 0.01));
    border: 1px solid var(--glass-border);
    box-shadow: var(--glass-shadow);
    backdrop-filter: blur(var(--glass-blur));
    border-radius: 12px;
}

@media (max-width: 992px) {
    .footer-top {
        grid-template-columns: 1fr;
    }

    .nav-grid {
        grid-template-columns: repeat(2, 1fr);
    }

    .footer-brand {
        align-items: center;
        text-align: center;
    }

    .logo-row {
        justify-content: center;
    }

    .brand-text {
        align-items: center;
    }
}

@media (max-width: 768px) {
    .container {
        padding: 0 12px;
    }

    .nav-grid {
        grid-template-columns: 1fr;
    }

    .footer-nav {
        padding: 14px;
    }

    .footer-logo-text {
        font-size: 1.4rem;
    }

    .footer-tagline {
        font-size: 0.95rem;
    }

    .social-link {
        width: 40px;
        height: 40px;
    }

    .footer-bottom {
        flex-direction: column;
        align-items: center;
        gap: 10px;
        text-align: center;
    }
}

@media (max-width: 420px) {
    .footer {
        padding: 46px 0 18px;
    }

    .footer-logo-text {
        font-size: 1.2rem;
    }

    .social-link {
        width: 36px;
        height: 36px;
    }
}
</style>
