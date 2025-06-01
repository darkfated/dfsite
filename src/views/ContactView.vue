<template>
    <div class="contact">
        <section class="section contact-hero">
            <div class="container">
                <h1 class="section-title">Ссылки</h1>
                <p class="section-subtitle">Мои контакты и социальные сети</p>
            </div>
        </section>

        <section class="section links-section">
            <div class="container">
                <div class="links-grid">
                    <a v-for="link in socialLinks" :key="link.id" :href="link.url" target="_blank"
                        rel="noopener noreferrer" class="link-card glass-card" :class="{ 'copy-card': link.copyTag }"
                        @click.prevent="handleLinkClick(link)">
                        <div class="link-icon">
                            <img v-if="link.icon" :src="require(`@/assets/svg/${link.icon}.svg`)" :alt="link.name"
                                class="social-svg" />
                        </div>
                        <div class="link-info">
                            <h3 class="link-title">{{ link.name }}</h3>
                            <p class="link-url" v-if="!link.copyTag">{{ formatUrl(link.url) }}</p>
                            <p class="link-url copy-text" v-else>{{ link.copyMessage || link.copyTag }}</p>
                        </div>
                        <div class="link-glow"></div>
                    </a>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    name: 'ContactView',
    data() {
        return {
            copiedLinks: {}
        }
    },
    computed: {
        ...mapGetters(['getSocialLinks']),
        socialLinks() {
            return this.getSocialLinks.map(link => {
                if (link.copyTag) {
                    return {
                        ...link,
                        copyMessage: this.copiedLinks[link.id] ? 'Скопировано!' : link.copyTag
                    }
                }
                return link
            })
        }
    },
    methods: {
        formatUrl(url) {
            return url.replace(/^https?:\/\/(www\.)?/, '')
        },
        handleLinkClick(link) {
            if (link.copyTag) {
                this.copyToClipboard(link)
            } else if (link.url && link.url !== '#') {
                window.open(link.url, '_blank')
            }
        },
        copyToClipboard(link) {
            navigator.clipboard.writeText(link.copyTag)
                .then(() => {
                    this.copiedLinks = {
                        ...this.copiedLinks,
                        [link.id]: true
                    }

                    setTimeout(() => {
                        this.copiedLinks = {
                            ...this.copiedLinks,
                            [link.id]: false
                        }
                    }, 2000)
                })
                .catch(err => {
                    console.error('Не удалось скопировать текст: ', err)
                })
        }
    }
}
</script>

<style scoped>
.contact-hero {
    background-color: var(--dark-bg);
    text-align: center;
    padding-bottom: 40px;
}

.links-section {
    padding-top: 40px;
}

.links-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 30px;
}

.link-card {
    display: flex;
    align-items: center;
    padding: 30px;
    transition: transform 0.3s, box-shadow 0.3s;
    cursor: pointer;
    overflow: hidden;
    position: relative;
    border-radius: 12px;
}

.link-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
    border-color: var(--primary-color);
}

.link-glow {
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle at center, rgba(142, 68, 173, 0.1), transparent 50%);
    transform: rotate(45deg);
    opacity: 0;
    transition: opacity 0.6s;
    z-index: -1;
}

.link-card:hover .link-glow {
    opacity: 1;
}

.copy-card {
    position: relative;
    overflow: hidden;
}

.copy-card::after {
    content: 'Нажмите, чтобы скопировать';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    background-color: var(--primary-color);
    color: white;
    font-size: 0.8rem;
    padding: 5px 0;
    text-align: center;
    transform: translateY(100%);
    transition: transform 0.3s;
}

.copy-card:hover::after {
    transform: translateY(0);
}

.link-icon {
    margin-right: 20px;
    width: 50px;
    text-align: center;
    transition: transform 0.3s;
    flex-shrink: 0;
}

.link-card:hover .link-icon {
    transform: scale(1.2);
}

.social-svg {
    width: 36px;
    height: 36px;
    filter: brightness(0) invert(1);
    transition: filter 0.3s;
}

.link-card:hover .social-svg {
    filter: brightness(0) invert(1) sepia(1) saturate(5) hue-rotate(255deg);
}

.link-info {
    flex: 1;
    overflow: hidden;
}

.link-title {
    color: var(--primary-color);
    margin: 0 0 5px;
    font-size: 1.2rem;
}

.link-url {
    margin: 0;
    color: var(--light-text);
    font-size: 0.9rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

@media (max-width: 992px) {
    .links-grid {
        grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
    }
}

@media (max-width: 768px) {
    .contact-hero {
        padding-bottom: 30px;
    }

    .links-section {
        padding-top: 30px;
    }

    .links-grid {
        grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
        gap: 20px;
    }

    .link-card {
        padding: 20px;
    }

    .social-svg {
        width: 30px;
        height: 30px;
    }

    .link-title {
        font-size: 1.1rem;
    }

    .link-url {
        font-size: 0.85rem;
    }
}

@media (max-width: 480px) {
    .links-grid {
        grid-template-columns: 1fr;
    }

    .link-card {
        padding: 15px;
    }

    .link-icon {
        width: 40px;
        margin-right: 15px;
    }

    .social-svg {
        width: 28px;
        height: 28px;
    }

    .copy-card::after {
        font-size: 0.7rem;
    }
}
</style>