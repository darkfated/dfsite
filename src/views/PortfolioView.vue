<template>
    <div class="portfolio">
        <section class="section portfolio-hero">
            <div class="container">
                <h1 class="section-title">Моё портфолио</h1>
                <p class="section-subtitle">Мои проекты и разработки</p>

                <div class="category-tabs">
                    <button v-for="cat in categories" :key="cat.value" @click="setCategory(cat.value)"
                        :class="['category-tab', category === cat.value ? 'active' : '']">
                        {{ cat.label }}
                    </button>
                </div>
            </div>
        </section>

        <section class="section portfolio-grid-section">
            <div class="container">
                <div class="portfolio-grid">
                    <div v-for="item in filteredPortfolioItems" :key="item.id" class="portfolio-card glass-card">
                        <div class="portfolio-content">
                            <h3 class="portfolio-title">{{ item.title }}</h3>
                            <p class="portfolio-description">{{ item.description }}</p>
                            <div class="portfolio-tags">
                                <span v-for="(tag, index) in item.tags" :key="index" class="portfolio-tag">
                                    {{ tag }}
                                </span>
                            </div>
                            <a :href="item.link" target="_blank" rel="noopener noreferrer"
                                class="portfolio-btn btn btn-primary">
                                Посмотреть на GitHub
                            </a>
                        </div>
                    </div>
                </div>

                <div v-if="filteredPortfolioItems.length === 0" class="no-items">
                    <p>Проекты в данной категории пока не добавлены.</p>
                    <button @click="resetFilters()" class="btn btn-primary">Показать все проекты</button>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    name: 'PortfolioView',
    data() {
        return {
            category: 'all',
            categories: [
                { value: 'all', label: 'Все проекты' },
                { value: 'gmod', label: 'Garry\'s Mod' },
                { value: 'backend', label: 'Backend' },
                { value: 'frontend', label: 'Frontend' },
                { value: 'other', label: 'Остальное' }
            ]
        }
    },
    computed: {
        ...mapGetters(['getPortfolioItemsByCategory']),
        filteredPortfolioItems() {
            return this.getPortfolioItemsByCategory(this.category);
        }
    },
    methods: {
        setCategory(category) {
            this.category = category;
            // Прокрутка к проектам при смене категории на мобильных устройствах
            if (window.innerWidth <= 768) {
                setTimeout(() => {
                    const gridSection = document.querySelector('.portfolio-grid-section');
                    if (gridSection) {
                        gridSection.scrollIntoView({ behavior: 'smooth' });
                    }
                }, 100);
            }
        },
        resetFilters() {
            this.category = 'all';
        }
    }
}
</script>

<style scoped>
.portfolio-hero {
    background-color: var(--dark-bg);
    text-align: center;
    padding-bottom: 40px;
}

.portfolio-grid-section {
    padding-top: 40px;
}

.portfolio-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
    gap: 30px;
}

.portfolio-card {
    display: flex;
    flex-direction: column;
    height: 100%;
    position: relative;
    overflow: hidden;
    border-radius: 12px;
    transition: all 0.4s ease;
}

.portfolio-card:hover {
    transform: translateY(-8px);
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.4);
}

.portfolio-content {
    padding: 25px;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
}

.portfolio-title {
    color: var(--primary-color);
    font-size: 1.5rem;
    margin: 0 0 15px;
    position: relative;
}

.portfolio-title::after {
    content: '';
    position: absolute;
    bottom: -8px;
    left: 0;
    width: 40px;
    height: 2px;
    background-color: var(--accent-color);
}

.portfolio-description {
    margin: 0 0 20px;
    color: var(--light-text);
    line-height: 1.6;
    flex-grow: 1;
}

.portfolio-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-bottom: 20px;
}

.portfolio-tag {
    background-color: rgba(142, 68, 173, 0.15);
    color: var(--primary-color);
    font-size: 0.8rem;
    padding: 6px 12px;
    border-radius: 20px;
    border: 1px solid rgba(142, 68, 173, 0.3);
    transition: all 0.3s;
}

.portfolio-tag:hover {
    background-color: rgba(142, 68, 173, 0.3);
}

.portfolio-btn {
    align-self: flex-start;
}

.no-items {
    text-align: center;
    padding: 50px 0;
}

.no-items p {
    margin-bottom: 20px;
    font-size: 1.1rem;
    color: var(--light-text);
}

@media (max-width: 992px) {
    .portfolio-grid {
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    }
}

@media (max-width: 768px) {
    .portfolio-hero {
        padding-bottom: 30px;
    }

    .portfolio-grid-section {
        padding-top: 30px;
    }

    .portfolio-grid {
        grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
        gap: 20px;
    }

    .category-tabs {
        gap: 8px;
        margin-bottom: 25px;
    }

    .category-tab {
        padding: 10px 15px;
        font-size: 0.9rem;
        width: calc(50% - 4px);
        text-align: center;
    }

    .portfolio-content {
        padding: 20px;
    }

    .portfolio-title {
        font-size: 1.3rem;
    }

    .portfolio-description {
        font-size: 0.95rem;
    }

    .portfolio-btn {
        align-self: center;
        width: 100%;
    }

    .portfolio-tags {
        justify-content: center;
    }
}

@media (max-width: 480px) {
    .portfolio-grid {
        grid-template-columns: 1fr;
    }

    .category-tab {
        font-size: 0.8rem;
        padding: 8px 10px;
    }

    .portfolio-title {
        font-size: 1.2rem;
        text-align: center;
    }

    .portfolio-title::after {
        left: 50%;
        transform: translateX(-50%);
    }
}
</style>