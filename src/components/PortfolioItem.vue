<template>
    <div class="portfolio-item">
        <div class="portfolio-image">
            <img :src="item.image" :alt="item.title">
            <div class="portfolio-overlay">
                <a :href="item.link" target="_blank" rel="noopener noreferrer" class="btn btn-primary">Подробнее</a>
            </div>
        </div>
        <div class="portfolio-content">
            <h3 class="portfolio-title">{{ item.title }}</h3>
            <p class="portfolio-description">{{ item.description }}</p>
            <div class="portfolio-tags">
                <span v-for="(tag, index) in item.tags" :key="index" class="portfolio-tag">{{ tag }}</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'PortfolioItem',
    props: {
        item: {
            type: Object,
            required: true
        }
    }
}
</script>

<style scoped>
.portfolio-item {
    background-color: white;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s, box-shadow 0.3s;
}

.portfolio-item:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
}

.portfolio-image {
    position: relative;
    height: 200px;
    overflow: hidden;
}

.portfolio-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s;
}

.portfolio-item:hover .portfolio-image img {
    transform: scale(1.1);
}

.portfolio-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 0;
    transition: opacity 0.3s;
}

.portfolio-item:hover .portfolio-overlay {
    opacity: 1;
}

.portfolio-content {
    padding: 20px;
}

.portfolio-title {
    margin: 0 0 10px;
    color: var(--secondary-color);
    font-size: 1.3rem;
}

.portfolio-description {
    margin: 0 0 15px;
    color: var(--text-color);
    font-size: 0.9rem;
    line-height: 1.5;
}

.portfolio-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 5px;
}

.portfolio-tag {
    background-color: var(--light-color);
    color: var(--secondary-color);
    font-size: 0.8rem;
    padding: 4px 8px;
    border-radius: 4px;
}
</style>