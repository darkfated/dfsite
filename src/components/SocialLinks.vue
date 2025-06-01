<template>
    <div class="social-links">
        <a v-for="link in socialLinks" :key="link.id" :href="link.url" target="_blank" rel="noopener noreferrer"
            class="social-link">
            <img v-if="link.icon" :src="require(`@/assets/svg/${link.icon}.svg`)" :alt="link.name"
                class="social-icon" />
            <span>{{ link.name }}</span>
        </a>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    name: 'SocialLinks',
    computed: {
        ...mapGetters(['getSocialLinks']),
        socialLinks() {
            return this.getSocialLinks
        }
    }
}
</script>

<style scoped>
.social-links {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
}

.social-link {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    padding: 8px 15px;
    background-color: rgba(255, 255, 255, 0.1);
    border-radius: 4px;
    color: white;
    transition: background-color 0.3s, transform 0.2s;
}

.social-link:hover {
    background-color: var(--primary-color);
    transform: translateY(-2px);
}

.social-icon {
    width: 20px;
    height: 20px;
}
</style>