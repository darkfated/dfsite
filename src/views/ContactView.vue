<template>
    <div class="contact">
        <section class="hero">
            <div class="container">
                <h1 class="title">Ссылки</h1>
                <p class="subtitle">Мои контакты и социальные сети</p>
            </div>
        </section>

        <section class="links">
            <div class="container">
                <div class="links-grid">
                    <a v-for="link in socialLinks" :key="link.id" :href="link.url && !link.copyTag ? link.url : '#'"
                        class="link-card glass" :class="{ 'is-copy': link.copyTag, copied: copiedLinks[link.id] }"
                        @click.prevent="handleLinkClick(link)" role="button" :aria-label="link.name" tabindex="0"
                        @keydown.enter.prevent="handleLinkClick(link)" @keydown.space.prevent="handleLinkClick(link)">
                        <div class="link-info">
                            <h3 class="link-title">{{ link.name }}</h3>
                            <p class="link-meta" v-if="!link.copyTag">{{ formatUrl(link.url) }}</p>
                            <p class="link-meta" v-else>
                                <span class="copy-text" v-if="!copiedLinks[link.id]">{{ link.copyTag }}</span>
                                <span class="copy-text copied-text" v-else>Скопировано!</span>
                            </p>
                        </div>

                        <div class="link-action">
                            <button v-if="link.copyTag" class="btn-copy" @click.stop.prevent="copyToClipboard(link)"
                                :aria-label="`Копировать ${link.copyTag}`">
                                Копировать
                            </button>

                            <span v-else class="btn-open">Открыть</span>
                        </div>

                        <div class="link-glow" aria-hidden="true"></div>
                    </a>
                </div>
            </div>
        </section>

        <transition name="toast">
            <div v-if="toast.show" class="toast">{{ toast.text }}</div>
        </transition>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    name: 'ContactView',
    data() {
        return {
            copiedLinks: {},
            toast: { show: false, text: '' }
        }
    },
    computed: {
        ...mapGetters(['getSocialLinks']),
        socialLinks() {
            return this.getSocialLinks || []
        }
    },
    methods: {
        formatUrl(url) {
            if (!url) return ''
            return url.replace(/^https?:\/\/(www\.)?/, '')
        },
        handleLinkClick(link) {
            if (link.copyTag) {
                this.copyToClipboard(link)
                return
            }
            if (link.url && link.url !== '#') {
                window.open(link.url, '_blank', 'noopener,noreferrer')
            }
        },
        copyToClipboard(link) {
            const text = link.copyTag || link.url || ''
            if (!text) return
            navigator.clipboard.writeText(text).then(() => {
                this.$set(this.copiedLinks, link.id, true)
                this.showToast('Скопировано в буфер обмена')
                setTimeout(() => {
                    this.$set(this.copiedLinks, link.id, false)
                }, 2000)
            }).catch(() => {
                this.showToast('Не удалось скопировать')
            })
        },
        showToast(text) {
            this.toast.text = text
            this.toast.show = true
            clearTimeout(this._toastTimer)
            this._toastTimer = setTimeout(() => {
                this.toast.show = false
            }, 1800)
        }
    },
    beforeDestroy() {
        clearTimeout(this._toastTimer)
    }
}
</script>

<style scoped>
:root {
    --dark-bg: #0f1224;
    --glass-border: rgba(255, 255, 255, 0.06);
    --primary-color: #6f4bff;
    --text-color: #dbe5ff;
    --muted: #9aa7c7;
    --glass-shadow: 0 10px 30px rgba(6, 7, 14, 0.6);
    --glass-blur: 10px;
}

.contact {
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
    color: var(--text-color);
}

.subtitle {
    color: var(--muted);
    margin: 0 0 18px;
}

.links {
    padding-top: 12px;
    padding-bottom: 40px;
}

.links-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 18px;
}

.link-card {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 18px;
    border-radius: 12px;
    overflow: hidden;
    cursor: pointer;
    text-decoration: none;
    transition: transform 0.22s ease, box-shadow 0.22s ease, border-color 0.22s;
    border: 1px solid var(--glass-border);
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.02), rgba(255, 255, 255, 0.01));
    box-shadow: var(--glass-shadow);
    backdrop-filter: blur(var(--glass-blur));
    -webkit-backdrop-filter: blur(var(--glass-blur));
    min-height: 72px;
}

.link-card:focus {
    outline: none;
    box-shadow: 0 12px 40px rgba(111, 75, 255, 0.12);
    transform: translateY(-4px);
}

.link-card:hover {
    transform: translateY(-6px);
    box-shadow: 0 20px 60px rgba(6, 7, 20, 0.6);
    border-color: rgba(111, 75, 255, 0.18);
}

.link-info {
    flex: 1;
    min-width: 0;
}

.link-title {
    margin: 0 0 4px;
    color: var(--primary-color);
    font-size: 1.05rem;
    font-weight: 600;
    line-height: 1.1;
}

.link-meta {
    margin: 0;
    color: var(--muted);
    font-size: 0.9rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.link-action {
    margin-left: 16px;
    display: flex;
    align-items: center;
    gap: 8px;
    flex-shrink: 0;
}

.btn-copy,
.btn-open {
    background: transparent;
    border: 1px solid rgba(255, 255, 255, 0.06);
    color: var(--text-color);
    padding: 8px 10px;
    border-radius: 10px;
    font-size: 0.85rem;
    cursor: pointer;
    transition: background 0.18s, transform 0.12s;
}

.btn-copy:hover,
.btn-open:hover {
    background: rgba(255, 255, 255, 0.02);
    transform: translateY(-2px);
}

.btn-copy:active {
    transform: translateY(0);
}

.is-copy::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(90deg, rgba(111, 75, 255, 0.04), rgba(124, 242, 214, 0.02));
    pointer-events: none;
    opacity: 0;
    transition: opacity 0.18s;
}

.link-card.copied {
    border-color: rgba(124, 242, 214, 0.18);
}

.link-card.copied .is-copy::after {
    opacity: 1;
}

.link-glow {
    position: absolute;
    top: -40%;
    left: -40%;
    width: 180%;
    height: 180%;
    background: radial-gradient(circle at center, rgba(111, 75, 255, 0.08), transparent 40%);
    transform: rotate(25deg);
    opacity: 0;
    transition: opacity 0.5s ease;
    z-index: 0;
}

.link-card:hover .link-glow {
    opacity: 1;
}

.toast {
    position: fixed;
    left: 50%;
    transform: translateX(-50%);
    bottom: 28px;
    background: rgba(20, 20, 30, 0.95);
    color: var(--text-color);
    padding: 10px 16px;
    border-radius: 10px;
    font-size: 0.95rem;
    box-shadow: 0 12px 36px rgba(6, 7, 20, 0.6);
    z-index: 9999;
}

/* Адаптив: планшет */
@media (max-width: 1000px) {
    .links-grid {
        grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
    }

    .link-action {
        margin-left: 12px;
    }

    .link-card {
        padding: 16px;
    }
}

/* Адаптив: мобильный */
@media (max-width: 600px) {
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

    .links-grid {
        grid-template-columns: 1fr;
        gap: 12px;
    }

    .link-card {
        padding: 14px;
        min-height: 68px;
        align-items: flex-start;
        gap: 10px;
    }

    .link-title {
        font-size: 1rem;
    }

    .link-meta {
        font-size: 0.9rem;
        white-space: normal;
    }

    .link-action {
        margin-left: 8px;
    }

    .btn-copy,
    .btn-open {
        padding: 7px 9px;
        font-size: 0.85rem;
    }
}

/* Маленькие экраны */
@media (max-width: 380px) {
    .title {
        font-size: 1.45rem;
    }

    .link-title {
        font-size: 0.98rem;
    }

    .btn-copy,
    .btn-open {
        padding: 6px 8px;
        font-size: 0.82rem;
    }
}

.toast-enter-active,
.toast-leave-active {
    transition: opacity 0.25s;
}

.toast-enter,
.toast-leave-to {
    opacity: 0;
}
</style>
