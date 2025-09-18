<template>
    <div class="blog">
        <section class="hero">
            <div class="container">
                <h1 class="title">{{ currentPost ? currentPost.title : 'Блог' }}</h1>
                <p class="subtitle" v-if="!currentPost">Мои мысли :&gt;</p>
                <p class="subtitle" v-else>{{ formatDate(currentPost.date) }}</p>

                <div v-if="!currentPost" class="search-wrap">
                    <input v-model="searchQuery" class="search-input" type="text" placeholder="Поиск по блогу..." />
                </div>

                <div v-if="currentPost" class="post-nav">
                    <button @click="backToList" class="btn-back">← К списку</button>
                </div>
            </div>
        </section>

        <section class="content">
            <div class="container content-grid">
                <transition-group name="cards" tag="div" class="cards-grid" v-if="!currentPost && !loading && !error">
                    <article v-for="post in filteredPosts" :key="post.slug" class="card"
                        @click="navigateToPost(post.slug)" role="button" tabindex="0"
                        @keydown.enter.prevent="navigateToPost(post.slug)">
                        <h2 class="card-title">{{ post.title || 'Без названия' }}</h2>
                        <p class="card-desc">{{ post.description || 'Нет описания' }}</p>

                        <div class="card-meta">
                            <time class="date">{{ formatDate(post.date) }}</time>
                            <div class="tags" v-if="post.tags && post.tags.length">
                                <span v-for="(t, i) in post.tags.slice(0, 3)" :key="i" class="tag">{{ t }}</span>
                            </div>
                        </div>

                        <div class="card-actions">
                            <button class="btn-read" @click.stop.prevent="navigateToPost(post.slug)">Читать</button>
                        </div>
                    </article>
                </transition-group>

                <div v-if="!currentPost && filteredPosts.length === 0 && !loading && !error" class="empty glass">
                    <h3>Блоги не найдены</h3>
                    <p>Нет доступных публикаций или ничего не подходит под запрос.</p>
                </div>

                <div v-if="loading" class="loading glass">
                    <div class="spinner"></div>
                    <p>Загрузка...</p>
                </div>

                <div v-if="error" class="error glass">
                    <h3>Ошибка</h3>
                    <p>{{ error }}</p>
                    <button class="btn-back" @click="backToList">К списку</button>
                </div>

                <transition name="post">
                    <article v-if="currentPost && !loading && !error" class="post glass">
                        <div class="post-head">
                            <div class="post-tags" v-if="currentPost.tags && currentPost.tags.length">
                                <span v-for="(t, i) in currentPost.tags" :key="i" class="tag">{{ t }}</span>
                            </div>
                            <h2 class="post-title">{{ currentPost.title }}</h2>
                            <div class="post-info">{{ formatDate(currentPost.date) }}</div>
                        </div>

                        <div class="post-body markdown-body" v-html="currentPost.html"></div>

                        <div class="post-footer">
                            <button class="btn-back" @click="backToList">← Назад</button>
                        </div>
                    </article>
                </transition>
            </div>
        </section>
    </div>
</template>

<script>
import { getAllPosts, getPostBySlug, formatDate } from '@/blog/blogService';

export default {
    name: 'BlogView',
    data() {
        return {
            posts: [],
            currentPost: null,
            searchQuery: '',
            loading: false,
            error: null
        };
    },
    computed: {
        slug() {
            return this.$route.params.slug;
        },
        filteredPosts() {
            if (!this.searchQuery) return this.posts;
            const q = this.searchQuery.trim().toLowerCase();
            return this.posts.filter(p =>
                (p.title || '').toLowerCase().includes(q) ||
                (p.description || '').toLowerCase().includes(q) ||
                (p.tags || []).some(t => t.toLowerCase().includes(q))
            );
        }
    },
    methods: {
        formatDate,
        async loadPosts() {
            this.loading = true;
            this.error = null;
            try {
                this.posts = (await getAllPosts()) || [];
                if (this.slug) {
                    await this.loadCurrentPost();
                } else {
                    this.currentPost = null;
                }
            } catch (e) {
                this.error = 'Ошибка при загрузке постов. Попробуйте позже.';
                console.error(e);
            } finally {
                this.loading = false;
            }
        },
        async loadCurrentPost() {
            this.loading = true;
            this.error = null;
            try {
                this.currentPost = await getPostBySlug(this.slug);
                if (!this.currentPost) {
                    this.error = 'Пост не найден';
                }
            } catch (e) {
                this.error = 'Ошибка при загрузке поста';
                console.error(e);
            } finally {
                this.loading = false;
            }
        },
        navigateToPost(slug) {
            this.$router.push({ name: 'BlogPost', params: { slug } });
        },
        backToList() {
            this.$router.push({ name: 'Blog' });
        }
    },
    watch: {
        '$route.params.slug'() {
            if (this.slug) {
                this.loadCurrentPost();
            } else {
                this.currentPost = null;
            }
        }
    },
    created() {
        this.loadPosts();
    }
};
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
    --card-gap: 18px;
}

.blog {
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

.blog .container {
    padding-left: 22px;
    padding-right: 14px;
}

@media (max-width: 700px) {
    .blog .container {
        padding-left: 16px;
        padding-right: 12px;
    }
}

@media (max-width: 420px) {
    .blog .container {
        padding-left: 12px;
        padding-right: 10px;
    }
}

.title {
    font-size: 2.1rem;
    margin: 2px 0 6px;
    color: var(--text-color);
}

.subtitle {
    color: var(--muted);
    margin-bottom: 12px;
}

.search-wrap {
    max-width: 640px;
    margin: 10px auto 0;
}

.search-input {
    width: 100%;
    padding: 12px 16px;
    border-radius: 999px;
    border: 1px solid var(--glass-border);
    background: linear-gradient(180deg, rgba(255, 255, 255, 0.01), rgba(255, 255, 255, 0.00));
    color: var(--text-color);
    font-size: 1rem;
    box-shadow: 0 6px 18px rgba(7, 8, 15, 0.45);
    transition: box-shadow 0.18s, border-color 0.18s;
}

.search-input:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 12px 36px rgba(111, 75, 255, 0.08);
}

.content {
    padding-top: 20px;
}

.content-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: var(--card-gap);
}

.cards-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
    gap: var(--card-gap);
    width: 100%;
}

.card {
    padding: 20px;
    border-radius: 12px;
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.02), rgba(255, 255, 255, 0.01));
    border: 1px solid var(--glass-border);
    box-shadow: var(--glass-shadow);
    backdrop-filter: blur(var(--glass-blur));
    cursor: pointer;
    display: flex;
    flex-direction: column;
    min-height: 220px;
    transition: transform 0.18s ease, box-shadow 0.18s ease, border-color 0.18s;
}

.card:focus {
    outline: none;
    transform: translateY(-4px);
    box-shadow: 0 18px 50px rgba(111, 75, 255, 0.08);
}

.card:hover {
    transform: translateY(-6px);
    box-shadow: 0 20px 60px rgba(6, 7, 20, 0.6);
    border-color: rgba(111, 75, 255, 0.12);
}

.card-title {
    margin: 0 0 10px;
    color: var(--primary-color);
    font-size: 1.25rem;
    line-height: 1.2;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

.card-desc {
    color: var(--muted);
    margin: 0 0 12px;
    flex-grow: 1;
    line-height: 1.5;
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

.card-meta {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
    margin-bottom: 12px;
    flex-wrap: wrap;
}

.date {
    font-size: 0.85rem;
    color: var(--muted);
}

.tags {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
}

.tag {
    background: rgba(111, 75, 255, 0.08);
    color: var(--primary-color);
    padding: 4px 8px;
    border-radius: 999px;
    font-size: 0.78rem;
    border: 1px solid rgba(111, 75, 255, 0.06);
}

.card-actions {
    display: flex;
    gap: 10px;
    align-items: center;
}

.btn-read {
    background: transparent;
    border: 1px solid rgba(255, 255, 255, 0.06);
    padding: 8px 12px;
    color: var(--text-color);
    border-radius: 10px;
    cursor: pointer;
}

.empty {
    text-align: center;
    padding: 40px;
    border-radius: 12px;
    margin: 0 auto;
    max-width: 640px;
}

.loading,
.error {
    text-align: center;
    padding: 28px;
    border-radius: 12px;
    max-width: 640px;
    margin: 0 auto;
}

.spinner {
    width: 44px;
    height: 44px;
    border: 5px solid rgba(111, 75, 255, 0.12);
    border-top-color: var(--primary-color);
    border-radius: 50%;
    margin: 6px auto 14px;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    to {
        transform: rotate(360deg);
    }
}

.post {
    margin: 0 auto;
    padding: 26px;
    border-radius: 12px;
    max-width: 900px;
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.02), rgba(255, 255, 255, 0.00));
    border: 1px solid var(--glass-border);
    box-shadow: var(--glass-shadow);
}

.post-head {
    margin-bottom: 18px;
}

.post-title {
    margin: 6px 0 8px;
    color: var(--text-color);
    font-size: 1.6rem;
}

.post-info {
    color: var(--muted);
    font-size: 0.9rem;
    margin-bottom: 12px;
}

.post-tags {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
    margin-bottom: 10px;
}

.post-body {
    margin-top: 6px;
    line-height: 1.7;
}

.post-footer {
    margin-top: 28px;
    border-top: 1px solid var(--glass-border);
    padding-top: 16px;
}

.btn-back {
    background: transparent;
    color: var(--primary-color);
    border: 1px solid var(--primary-color);
    padding: 8px 12px;
    border-radius: 10px;
    cursor: pointer;
}

.cards-enter-active,
.cards-leave-active {
    transition: all 0.25s;
}

.cards-enter,
.cards-leave-to {
    opacity: 0;
    transform: translateY(6px);
}

.post-enter-active,
.post-leave-active {
    transition: opacity 0.22s, transform 0.22s;
}

.post-enter,
.post-leave-to {
    opacity: 0;
    transform: translateY(6px);
}

:deep(.markdown-body) {
    color: var(--text-color);
    line-height: 1.7;
    font-size: 1.02rem;
}

:deep(.markdown-body h1) {
    font-size: 1.8rem;
    color: var(--primary-color);
    margin: 0.8em 0;
}

:deep(.markdown-body h2) {
    font-size: 1.4rem;
    margin: 1.2em 0 0.6em;
}

:deep(.markdown-body p) {
    margin: 0.9em 0;
}

:deep(.markdown-body pre) {
    background: rgba(0, 0, 0, 0.3);
    padding: 1em;
    border-radius: 6px;
    overflow-x: auto;
}

@media (max-width: 1000px) {
    .cards-grid {
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    }

    .card {
        min-height: 200px;
    }

    .post {
        padding: 22px;
    }
}

@media (max-width: 700px) {
    .container {
        padding: 0 12px;
    }

    .cards-grid {
        grid-template-columns: 1fr;
        gap: 14px;
    }

    .search-wrap {
        max-width: 100%;
        margin: 10px 0 8px;
    }

    .card {
        padding: 16px;
        min-height: 160px;
    }

    .card-title {
        font-size: 1.05rem;
    }

    .card-desc {
        display: -webkit-box;
        -webkit-line-clamp: 3;
    }

    .post {
        padding: 18px;
    }

    :deep(.markdown-body) {
        font-size: 0.98rem;
    }
}

@media (max-width: 420px) {
    .title {
        font-size: 1.45rem;
    }

    .search-input {
        padding: 10px 12px;
        font-size: 0.95rem;
    }

    .card {
        padding: 14px;
    }

    .card-title {
        font-size: 1rem;
    }

    .btn-read {
        padding: 6px 10px;
        font-size: 0.85rem;
    }

    .post {
        padding: 14px;
    }

    :deep(.markdown-body) {
        font-size: 0.95rem;
    }
}
</style>
