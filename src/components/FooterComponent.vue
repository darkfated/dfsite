<template>
    <footer class="footer">
        <div class="footer-waves">
            <div class="wave wave-1"></div>
            <div class="wave wave-2"></div>
            <div class="wave wave-3"></div>
        </div>

        <div class="container">
            <div class="footer-top">
                <div class="footer-brand">
                    <div class="logo-container">
                        <img src="@/assets/images/darkfated.jpeg" alt="DarkFated Logo" class="footer-logo-img" />
                        <h2 class="footer-logo-text">Dark<span class="accent">Fated</span></h2>
                    </div>
                    <p class="footer-tagline">Программирование • Медиа • Творчество</p>

                    <div class="footer-social">
                        <a href="https://github.com/darkfated" target="_blank" rel="noopener noreferrer"
                            class="social-link" aria-label="GitHub">
                            <img src="@/assets/svg/github.svg" alt="GitHub" class="social-icon" />
                        </a>
                        <a href="https://t.me/darkfated_group" target="_blank" rel="noopener noreferrer"
                            class="social-link" aria-label="Telegram">
                            <img src="@/assets/svg/telegram.svg" alt="Telegram" class="social-icon" />
                        </a>
                        <a href="https://www.youtube.com/@darkfated" target="_blank" rel="noopener noreferrer"
                            class="social-link" aria-label="YouTube">
                            <img src="@/assets/svg/youtube.svg" alt="YouTube" class="social-icon" />
                        </a>
                        <a href="https://steamcommunity.com/id/darkfated/" target="_blank" rel="noopener noreferrer"
                            class="social-link" aria-label="Steam">
                            <img src="@/assets/svg/steam.svg" alt="Steam" class="social-icon" />
                        </a>
                    </div>
                </div>

                <div class="footer-nav">
                    <div class="footer-nav-group">
                        <h3 class="footer-heading">Навигация</h3>
                        <ul class="footer-links">
                            <li><router-link to="/" class="footer-link">Главная</router-link></li>
                            <li><router-link to="/about" class="footer-link">Обо мне</router-link></li>
                            <li><router-link to="/portfolio" class="footer-link">Портфолио</router-link></li>
                            <li><router-link to="/blog" class="footer-link">Блог</router-link></li>
                            <li><router-link to="/contact" class="footer-link">Ссылки</router-link></li>
                        </ul>
                    </div>

                    <div class="footer-nav-group">
                        <h3 class="footer-heading">Категории</h3>
                        <ul class="footer-links">
                            <li><router-link to="/portfolio?cat=garrysmod" class="footer-link">Garry's Mod</router-link>
                            </li>
                            <li><router-link to="/portfolio?cat=backend" class="footer-link">Backend</router-link></li>
                            <li><router-link to="/portfolio?cat=frontend" class="footer-link">Frontend</router-link>
                            </li>
                            <li><router-link to="/blog" class="footer-link">Статьи блога</router-link></li>
                        </ul>
                    </div>
                </div>
            </div>

            <div class="footer-bottom">
                <div class="copyright">
                    <p>&copy; {{ currentYear }} DarkFated. Все права защищены.</p>
                </div>
                <div class="back-to-top" @click="scrollToTop">
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
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
    }
}
</script>

<style scoped>
.footer {
    position: relative;
    color: var(--text-color);
    padding: 80px 0 20px;
    margin-top: auto;
    overflow: hidden;
    background: linear-gradient(180deg, rgba(10, 10, 10, 0) 0%, rgba(10, 10, 10, 1) 100%);
}

/* Волны */
.footer-waves {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100px;
    z-index: -1;
}

.wave {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100px;
    background-size: 1000px 100px;
}

.wave-1 {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 120' preserveAspectRatio='none'%3E%3Cpath d='M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z' opacity='.25' fill='%232c2c2c'/%3E%3Cpath d='M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z' opacity='.5' fill='%232c2c2c'/%3E%3Cpath d='M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z' fill='%232c2c2c'/%3E%3C/svg%3E");
    animation: wave-animation 20s linear infinite;
}

.wave-2 {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 120' preserveAspectRatio='none'%3E%3Cpath d='M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z' fill='%23202020'/%3E%3C/svg%3E");
    animation: wave-animation 15s linear infinite reverse;
    opacity: 0.8;
}

.wave-3 {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 120' preserveAspectRatio='none'%3E%3Cpath d='M0,0V7.23C0,65.52,268.63,112.77,600,112.77S1200,65.52,1200,7.23V0Z' fill='%23151515'/%3E%3C/svg%3E");
    animation: wave-animation 30s linear infinite;
    opacity: 0.9;
}

@keyframes wave-animation {
    0% {
        background-position-x: 0;
    }

    100% {
        background-position-x: 1000px;
    }
}

/* Верхний блок футера */
.footer-top {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 40px;
    padding-bottom: 40px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    margin-bottom: 20px;
}

.footer-brand {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}

.logo-container {
    display: flex;
    align-items: center;
    margin-bottom: 15px;
}

.footer-logo-img {
    width: 42px;
    height: 42px;
    margin-right: 10px;
    border-radius: 25%;
}

.footer-logo-text {
    font-size: 2rem;
    margin: 0;
    font-weight: 700;
    letter-spacing: 0.5px;
}

.accent {
    color: var(--primary-color);
}

.footer-tagline {
    margin: 0 0 25px;
    color: var(--light-text);
    font-size: 1.1rem;
    letter-spacing: 0.5px;
}

.footer-social {
    display: flex;
    gap: 15px;
}

.social-link {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 42px;
    height: 42px;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 50%;
    transition: all 0.3s ease;
    border: 1px solid rgba(255, 255, 255, 0.1);
}

.social-icon {
    width: 20px;
    height: 20px;
    filter: brightness(0) invert(0.7);
    transition: all 0.3s ease;
}

.social-link:hover {
    background: var(--primary-color);
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(142, 68, 173, 0.3);
}

.social-link:hover .social-icon {
    filter: brightness(0) invert(1);
}

/* Навигация */
.footer-nav {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 30px;
}

.footer-heading {
    color: var(--primary-color);
    font-size: 1.2rem;
    margin: 0 0 20px;
    font-weight: 600;
    position: relative;
    padding-bottom: 12px;
}

.footer-heading::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    width: 30px;
    height: 2px;
    background: var(--primary-color);
}

.footer-links {
    list-style: none;
    padding: 0;
    margin: 0;
}

.footer-links li {
    margin-bottom: 12px;
}

.footer-link {
    color: var(--light-text);
    font-size: 0.95rem;
    transition: all 0.3s ease;
    display: inline-block;
    position: relative;
    padding-left: 0;
}

.footer-link::before {
    content: '→';
    margin-right: 8px;
    opacity: 0;
    transform: translateX(-10px);
    display: inline-block;
    transition: all 0.3s ease;
}

.footer-link:hover {
    color: var(--primary-color);
    transform: translateX(5px);
}

.footer-link:hover::before {
    opacity: 1;
    transform: translateX(0);
}

/* Нижняя часть футера */
.footer-bottom {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
}

.copyright {
    font-size: 0.9rem;
    color: var(--light-text);
}

.back-to-top {
    display: flex;
    align-items: center;
    cursor: pointer;
    padding: 8px 15px;
    background: rgba(142, 68, 173, 0.1);
    border-radius: 20px;
    transition: all 0.3s ease;
}

.arrow-up {
    font-size: 1.2rem;
    margin-right: 5px;
    transition: transform 0.3s ease;
}

.top-text {
    font-size: 0.9rem;
}

.back-to-top:hover {
    background: rgba(142, 68, 173, 0.2);
}

.back-to-top:hover .arrow-up {
    transform: translateY(-3px);
}

/* Адаптивность */
@media (max-width: 992px) {
    .footer-top {
        grid-template-columns: 1fr;
        gap: 30px;
    }

    .footer-nav {
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    }
}

@media (max-width: 768px) {
    .footer {
        padding-top: 60px;
    }

    .footer-brand,
    .footer-nav-group {
        align-items: center;
        text-align: center;
    }

    .footer-links li {
        text-align: center;
    }

    .footer-link {
        text-align: center;
        padding-left: 0;
    }

    .footer-link::before {
        display: none;
    }

    .footer-link:hover {
        transform: translateY(-3px);
    }

    .footer-heading::after {
        left: 50%;
        transform: translateX(-50%);
    }

    .footer-bottom {
        flex-direction: column;
        gap: 15px;
        text-align: center;
    }

    .back-to-top {
        margin: 0 auto;
    }
}

@media (max-width: 480px) {
    .footer-logo-text {
        font-size: 1.8rem;
    }

    .footer-tagline {
        font-size: 1rem;
    }

    .footer-social {
        gap: 10px;
    }

    .social-link {
        width: 38px;
        height: 38px;
    }

    .footer-nav {
        gap: 25px;
    }
}
</style>