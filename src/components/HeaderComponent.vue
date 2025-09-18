<template>
    <header class="header" :class="{ 'scrolled': isScrolled }">
        <div class="container header-container">
            <div class="logo">
                <router-link to="/">
                    <img src="@/assets/images/darkfated.jpeg" alt="DarkFated Logo" class="logo-img" />
                    <span>Dark<span class="accent">Fated</span></span>
                </router-link>
            </div>

            <button class="mobile-menu-toggle" @click="toggleMenu" aria-label="Меню">
                <div class="menu-icon" :class="{ 'active': mobileMenuOpen }">
                    <span></span>
                </div>
            </button>

            <nav class="desktop-nav">
                <ul class="nav-list">
                    <li v-for="item in navItems" :key="item.path" class="nav-item">
                        <router-link :to="item.path" class="nav-link">
                            <span class="nav-icon-wrapper">
                                <img :src="require(`@/assets/svg/${item.icon}.svg`)" :alt="item.title"
                                    class="nav-icon" />
                            </span>
                            <span>{{ item.title }}</span>
                        </router-link>
                    </li>
                </ul>
            </nav>
        </div>

        <!-- Мобильное меню -->
        <div class="mobile-menu" :class="{ 'active': mobileMenuOpen }">
            <div class="mobile-menu-inner">
                <ul class="mobile-nav-list">
                    <li v-for="(item, index) in navItems" :key="item.path" class="mobile-nav-item"
                        :style="{ animationDelay: `${index * 0.05}s` }">
                        <router-link :to="item.path" class="mobile-nav-link" @click="closeMenu">
                            <img :src="require(`@/assets/svg/${item.icon}.svg`)" :alt="item.title"
                                class="mobile-nav-icon" />
                            <span>{{ item.title }}</span>
                        </router-link>
                    </li>
                </ul>
            </div>
            <div class="mobile-menu-backdrop" @click="closeMenu"></div>
        </div>
    </header>
</template>

<script>
export default {
    name: 'HeaderComponent',
    data() {
        return {
            mobileMenuOpen: false,
            isScrolled: false,
            navItems: [
                { title: 'Главная', path: '/', icon: 'home' },
                { title: 'Обо мне', path: '/about', icon: 'about' },
                { title: 'Блог', path: '/blog', icon: 'blog' },
                { title: 'Ссылки', path: '/contact', icon: 'contact' },
            ]
        }
    },
    mounted() {
        window.addEventListener('scroll', this.handleScroll);
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768 && this.mobileMenuOpen) {
                this.closeMenu();
            }
        });
    },
    beforeUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
        window.removeEventListener('resize', this.closeMenu);
    },
    methods: {
        toggleMenu() {
            this.mobileMenuOpen = !this.mobileMenuOpen;
            document.body.style.overflow = this.mobileMenuOpen ? 'hidden' : '';
        },
        closeMenu() {
            this.mobileMenuOpen = false;
            document.body.style.overflow = '';
        },
        handleScroll() {
            this.isScrolled = window.scrollY > 50;
        }
    }
}
</script>

<style scoped>
.header {
    background-color: rgba(18, 18, 18, 0.8);
    padding: 15px 0;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 100;
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
    transition: all 0.3s ease;
}

.header.scrolled {
    padding: 10px 0;
    background-color: rgba(18, 18, 18, 0.95);
    border-bottom-color: rgba(142, 68, 173, 0.2);
}

.header-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.logo a {
    font-size: 1.8rem;
    font-weight: 700;
    color: var(--text-color);
    letter-spacing: 1px;
    text-transform: none;
    display: flex;
    align-items: center;
    gap: 10px;
    transition: transform 0.3s ease;
}

.logo a:hover {
    transform: translateY(-2px);
}

.logo-img {
    width: 42px;
    height: 42px;
    border-radius: 25%;
    transition: transform 0.3s ease;
}

.logo a:hover .logo-img {
    transform: rotate(5deg);
}

.accent {
    color: var(--primary-color);
    position: relative;
    display: inline-block;
}

.accent::after {
    content: '';
    position: absolute;
    bottom: 5px;
    left: 0;
    width: 100%;
    height: 2px;
    background: linear-gradient(90deg, transparent, var(--primary-color), transparent);
    transform: scaleX(0);
    transition: transform 0.3s ease;
}

.logo a:hover .accent::after {
    transform: scaleX(1);
}

/* Десктопная навигация */
.nav-list {
    display: flex;
    list-style: none;
    margin: 0;
    padding: 0;
}

.nav-item {
    margin-left: 35px;
    position: relative;
}

.nav-link {
    color: var(--text-color);
    font-weight: 500;
    font-size: 1rem;
    position: relative;
    padding: 5px 0;
    letter-spacing: 0.5px;
    display: flex;
    align-items: center;
    gap: 8px;
    transition: color 0.3s ease;
}

.nav-icon-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    border-radius: 6px;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
}

.nav-icon-wrapper::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(142, 68, 173, 0.1);
    border-radius: 6px;
    transform: scale(0);
    transition: transform 0.3s ease;
}

.nav-link:hover .nav-icon-wrapper::before {
    transform: scale(1);
}

.nav-icon {
    width: 16px;
    height: 16px;
    transition: transform 0.3s ease;
    position: relative;
    z-index: 1;
}

.nav-link:hover {
    color: var(--primary-color);
}

.nav-link::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 1px;
    background: linear-gradient(90deg, transparent, var(--primary-color), transparent);
    transform: scaleX(0);
    transform-origin: center;
    transition: transform 0.3s ease;
}

.nav-link:hover::after {
    transform: scaleX(1);
}

.nav-link:hover .nav-icon {
    transform: translateY(-2px);
}

.router-link-active {
    color: var(--primary-color);
}

.router-link-active::after {
    transform: scaleX(1);
    background: linear-gradient(90deg, transparent, var(--primary-color), transparent);
}

.router-link-active .nav-icon-wrapper::before {
    transform: scale(1);
}

/* Кнопка мобильного меню */
.mobile-menu-toggle {
    display: none;
    background: transparent;
    border: none;
    padding: 0;
    cursor: pointer;
    z-index: 200;
}

.menu-icon {
    width: 18px;
    height: 18px;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
}

.menu-icon span,
.menu-icon span::before,
.menu-icon span::after {
    display: block;
    width: 100%;
    height: 2px;
    background-color: var(--text-color);
    position: absolute;
    border-radius: 2px;
    transition: all 0.3s ease;
}

.menu-icon span {
    top: 50%;
    transform: translateY(-50%);
}

.menu-icon span::before {
    content: '';
    top: -6px;
}

.menu-icon span::after {
    content: '';
    bottom: -6px;
}

.menu-icon.active span {
    background-color: transparent;
}

.menu-icon.active span::before {
    top: 0;
    transform: rotate(45deg);
    background-color: var(--primary-color);
}

.menu-icon.active span::after {
    bottom: 0;
    transform: rotate(-45deg);
    background-color: var(--primary-color);
}

/* Мобильное меню */
.mobile-menu {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 0;
    background-color: rgba(18, 18, 18, 0.95);
    z-index: 100;
    overflow: hidden;
    transition: height 0.3s ease;
}

.mobile-menu.active {
    height: 100vh;
}

.mobile-menu-inner {
    padding: 80px 20px 20px;
    opacity: 0;
    transform: translateY(-20px);
    transition: opacity 0.3s ease, transform 0.3s ease;
    transition-delay: 0.1s;
}

.mobile-menu.active .mobile-menu-inner {
    opacity: 1;
    transform: translateY(0);
}

.mobile-nav-list {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.mobile-nav-item {
    opacity: 0;
    transform: translateY(10px);
    animation-fill-mode: forwards;
}

.mobile-menu.active .mobile-nav-item {
    animation: fadeInUp 0.5s ease forwards;
}

@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(10px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.mobile-nav-link {
    display: flex;
    align-items: center;
    gap: 15px;
    padding: 12px 15px;
    color: var(--text-color);
    font-size: 1.1rem;
    background-color: rgba(255, 255, 255, 0.03);
    border-radius: 8px;
    transition: all 0.3s ease;
}

.mobile-nav-link:hover,
.mobile-nav-link.router-link-active {
    background-color: rgba(142, 68, 173, 0.15);
    color: var(--primary-color);
}

.mobile-nav-icon {
    width: 18px;
    height: 18px;
}

.mobile-menu-backdrop {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
}

@media (max-width: 768px) {
    .mobile-menu-toggle {
        display: block;
    }

    .desktop-nav {
        display: none;
    }
}

@media (max-width: 480px) {
    .logo a span {
        font-size: 1.5rem;
    }

    .mobile-nav-link {
        padding: 10px 12px;
        font-size: 1rem;
        gap: 12px;
    }

    .mobile-nav-icon {
        width: 16px;
        height: 16px;
    }

    .mobile-menu-inner {
        padding-top: 70px;
    }
}
</style>
