<template>
    <div class="blog">
        <section class="section blog-hero">
            <div class="container">
                <h1 class="section-title">{{ currentPost ? currentPost.title : 'Блог' }}</h1>
                <p v-if="!currentPost" class="section-subtitle">Мои заметки о программировании, играх и не только</p>
                <p v-else class="section-subtitle">{{ formatDate(currentPost.date) }}</p>

                <div v-if="!currentPost" class="blog-search">
                    <input type="text" v-model="searchQuery" placeholder="Поиск по блогу..." class="search-input">
                </div>

                <div v-if="currentPost" class="blog-nav">
                    <button @click="backToList" class="btn btn-back">
                        <span class="back-icon">←</span> К списку блогов
                    </button>
                </div>
            </div>
        </section>

        <section class="section blog-content">
            <div class="container blog-container">
                <!-- Страница со списком постов -->
                <div v-if="!currentPost">
                    <div v-if="filteredPosts.length > 0" class="blog-grid">
                        <div v-for="post in filteredPosts" :key="post.slug" class="blog-card glass-card"
                            @click="navigateToPost(post.slug)">
                            <h2 class="blog-title">{{ post.title || 'Без названия' }}</h2>
                            <p class="blog-description">{{ post.description || 'Нет описания' }}</p>

                            <div class="blog-meta">
                                <div class="blog-date">{{ formatDate(post.date) }}</div>
                                <div class="blog-tags" v-if="post.tags && post.tags.length">
                                    <span v-for="(tag, idx) in post.tags.slice(0, 3)" :key="idx" class="blog-tag">
                                        {{ tag }}
                                    </span>
                                </div>
                            </div>

                            <button class="read-more btn btn-primary">Читать</button>
                        </div>
                    </div>

                    <div v-else class="no-posts glass-card">
                        <div class="welcome-icon">📝</div>
                        <h2>Блоги не найдены</h2>
                        <p>В данный момент нет доступных блогов или ни один из них не соответствует поисковому запросу.
                        </p>
                    </div>
                </div>

                <!-- Страница отдельного поста -->
                <div v-else class="post-container">
                    <div class="blog-post glass-card">
                        <div v-if="currentPost.tags && currentPost.tags.length" class="post-tags">
                            <span v-for="(tag, index) in currentPost.tags" :key="index" class="post-tag">
                                {{ tag }}
                            </span>
                        </div>

                        <div class="post-content markdown-body" v-html="currentPost.html"></div>

                        <div class="post-footer">
                            <button @click="backToList" class="btn btn-primary">
                                <span class="back-icon">←</span> Назад к блогам
                            </button>
                        </div>
                    </div>
                </div>

                <div v-if="loading" class="loading-container">
                    <div class="loading-spinner"></div>
                    <p>Загрузка...</p>
                </div>

                <div v-if="error" class="error-container glass-card">
                    <h2>Ошибка</h2>
                    <p>{{ error }}</p>
                    <button @click="backToList" class="btn btn-primary">К списку блогов</button>
                </div>
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
        }
    },
    computed: {
        slug() {
            return this.$route.params.slug;
        },
        filteredPosts() {
            if (!this.searchQuery) return this.posts;

            const query = this.searchQuery.toLowerCase();
            return this.posts.filter(post =>
                (post.title?.toLowerCase() || '').includes(query) ||
                (post.description?.toLowerCase() || '').includes(query) ||
                (post.tags || []).some(tag => tag.toLowerCase().includes(query))
            );
        }
    },
    methods: {
        formatDate,
        async loadPosts() {
            this.loading = true;
            this.error = null;

            try {
                this.posts = await getAllPosts();
                if (this.slug) {
                    await this.loadCurrentPost();
                } else {
                    this.currentPost = null;
                }
            } catch (error) {
                console.error('Ошибка при загрузке постов:', error);
                this.error = 'Ошибка при загрузке данных. Пожалуйста, попробуйте позже.';
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
            } catch (error) {
                console.error('Ошибка при загрузке поста:', error);
                this.error = 'Ошибка при загрузке поста';
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
}
</script>

<style scoped>
.blog-hero {
    background-color: var(--dark-bg);
    text-align: center;
    padding-bottom: 20px;
}

.blog-container {
    max-width: 1400px;
}

/* Поиск */
.blog-search {
    max-width: 600px;
    margin: 20px auto 0;
}

.search-input {
    width: 100%;
    padding: 12px 16px;
    border-radius: 30px;
    border: 1px solid var(--glass-border);
    background-color: rgba(0, 0, 0, 0.2);
    color: var(--text-color);
    font-size: 1rem;
    transition: all 0.3s;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.search-input:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 4px 20px rgba(142, 68, 173, 0.2);
}

.blog-nav {
    margin: 15px 0 0;
}

/* Список блогов */
.blog-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
    gap: 25px;
    margin-bottom: 30px;
}

.blog-card {
    padding: 25px;
    border-radius: 12px;
    transition: all 0.3s ease;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    height: 100%;
}

.blog-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.4);
    border-color: var(--primary-color);
}

.blog-title {
    font-size: 1.5rem;
    color: var(--primary-color);
    margin: 0 0 15px;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

.blog-description {
    color: var(--light-text);
    margin-bottom: 20px;
    flex-grow: 1;
    line-height: 1.6;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

.blog-meta {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    flex-wrap: wrap;
    gap: 10px;
}

.blog-date {
    font-size: 0.85rem;
    color: var(--light-text);
}

.blog-tags {
    display: flex;
    gap: 5px;
    flex-wrap: wrap;
}

.blog-tag {
    background-color: rgba(142, 68, 173, 0.15);
    color: var(--primary-color);
    font-size: 0.75rem;
    padding: 3px 8px;
    border-radius: 12px;
}

.read-more {
    align-self: flex-start;
    margin-top: auto;
}

/* Отдельный пост */
.post-container {
    max-width: 900px;
    margin: 0 auto;
}

.blog-post {
    padding: 30px;
    border-radius: 12px;
    margin-bottom: 30px;
}

.post-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-bottom: 25px;
}

.post-tag {
    background-color: rgba(142, 68, 173, 0.15);
    color: var(--primary-color);
    font-size: 0.85rem;
    padding: 5px 12px;
    border-radius: 20px;
    border: 1px solid rgba(142, 68, 173, 0.3);
}

.post-footer {
    margin-top: 40px;
    padding-top: 20px;
    border-top: 1px solid var(--glass-border);
}

.back-icon {
    font-size: 1.2rem;
}

.btn-back {
    background-color: transparent;
    color: var(--primary-color);
    border: 1px solid var(--primary-color);
    padding: 8px 15px;
    font-size: 0.9rem;
    transition: all 0.3s;
}

.btn-back:hover {
    background-color: rgba(142, 68, 173, 0.1);
    transform: translateX(-5px);
}

/* Загрузка и ошибки */
.loading-container,
.error-container {
    text-align: center;
    padding: 40px;
    margin: 30px auto;
    max-width: 600px;
}

.loading-spinner {
    width: 50px;
    height: 50px;
    border: 5px solid rgba(142, 68, 173, 0.2);
    border-top-color: var(--primary-color);
    border-radius: 50%;
    margin: 0 auto 20px;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    to {
        transform: rotate(360deg);
    }
}

.error-container h2 {
    color: var(--primary-color);
    margin-bottom: 15px;
}

.no-posts {
    text-align: center;
    padding: 50px;
    margin: 50px auto;
    max-width: 600px;
}

.welcome-icon {
    font-size: 3rem;
    margin-bottom: 20px;
}

/* Стили для контента поста */
:deep(.markdown-body) {
    color: var(--text-color);
    line-height: 1.6;
    font-size: 1.05rem;
}

:deep(.markdown-body h1) {
    font-size: 2rem;
    margin: 0.8em 0;
    color: var(--primary-color);
}

:deep(.markdown-body h2) {
    font-size: 1.8rem;
    margin: 1.4em 0 0.8em;
    color: var(--text-color);
    border-bottom: 1px solid var(--border-color);
    padding-bottom: 0.3em;
}

:deep(.markdown-body h3) {
    font-size: 1.5rem;
    margin: 1.3em 0 0.6em;
    color: var(--text-color);
}

:deep(.markdown-body p) {
    margin: 1em 0;
    line-height: 1.7;
}

:deep(.markdown-body a) {
    color: var(--primary-color);
    text-decoration: none;
    border-bottom: 1px dashed var(--primary-color);
    transition: all 0.2s;
}

:deep(.markdown-body a:hover) {
    color: var(--highlight);
    border-bottom-color: var(--highlight);
}

:deep(.markdown-body img) {
    max-width: 100%;
    border-radius: 5px;
    display: block;
    margin: 1.5em auto;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
}

:deep(.markdown-body pre) {
    background-color: rgba(0, 0, 0, 0.3);
    padding: 1.2em;
    border-radius: 5px;
    overflow-x: auto;
    margin: 1.5em 0;
    border: 1px solid var(--border-color);
}

:deep(.markdown-body code) {
    font-family: 'Roboto Mono', monospace;
    background-color: rgba(0, 0, 0, 0.2);
    padding: 0.2em 0.4em;
    border-radius: 3px;
    font-size: 0.9em;
    border: none;
    outline: none;
    text-shadow: none;
    box-shadow: none;
}

:deep(.markdown-body pre code) {
    background-color: transparent;
    padding: 0;
    color: inherit;
    font-size: 0.9em;
    white-space: pre;
    word-break: normal;
    overflow-wrap: normal;
    border: none;
    outline: none;
    text-shadow: none;
    box-shadow: none;
    display: block;
    width: 100%;
    -webkit-text-fill-color: var(--text-color);
}

:deep(.markdown-body pre code *) {
    border: none;
    outline: none;
    text-shadow: none;
    box-shadow: none;
    background-color: transparent;
}

:deep(.markdown-body ul),
:deep(.markdown-body ol) {
    padding-left: 2em;
    margin: 1em 0;
    list-style-position: outside;
}

:deep(.markdown-body ul li),
:deep(.markdown-body ol li) {
    margin-bottom: 0.5em;
    padding-left: 0.5em;
    display: list-item;
}

:deep(.markdown-body li > ul),
:deep(.markdown-body li > ol) {
    margin: 0.5em 0;
    padding-left: 1.5em;
}

:deep(.markdown-body blockquote) {
    margin: 1em 0;
    padding: 0.5em 1em;
    border-left: 4px solid var(--primary-color);
    background-color: rgba(0, 0, 0, 0.2);
}

:deep(.markdown-body table) {
    width: 100%;
    margin: 1em 0;
    border-collapse: collapse;
}

:deep(.markdown-body table th),
:deep(.markdown-body table td) {
    padding: 0.5em;
    border: 1px solid var(--border-color);
    text-align: left;
}

:deep(.markdown-body table th) {
    background-color: rgba(0, 0, 0, 0.2);
}

:deep(.markdown-body hr) {
    border: none;
    height: 1px;
    background-color: var(--border-color);
    margin: 2em 0;
}

/* Медиазапросы для адаптивности */
@media (max-width: 1200px) {
    .blog-grid {
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    }
}

@media (max-width: 768px) {
    .blog-grid {
        grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
        gap: 15px;
    }

    .blog-card,
    .blog-post {
        padding: 20px;
    }

    .blog-title {
        font-size: 1.3rem;
    }

    :deep(.markdown-body) {
        font-size: 1rem;
    }

    :deep(.markdown-body h1) {
        font-size: 1.7rem;
    }

    :deep(.markdown-body h2) {
        font-size: 1.5rem;
    }

    :deep(.markdown-body pre) {
        padding: 1em;
    }

    .section-title {
        font-size: 1.8rem;
    }

    .blog-search {
        max-width: 90%;
    }

    .blog-meta {
        flex-direction: column;
        align-items: flex-start;
    }
}

@media (max-width: 480px) {

    .blog-card,
    .blog-post {
        padding: 15px;
    }

    .blog-title {
        font-size: 1.2rem;
        margin-bottom: 10px;
    }

    .blog-description {
        margin-bottom: 15px;
        font-size: 0.95rem;
    }

    .blog-date {
        margin-bottom: 5px;
    }

    .search-input {
        padding: 10px 15px;
        font-size: 0.9rem;
    }

    .post-tags {
        margin-bottom: 15px;
    }

    .post-tag {
        font-size: 0.8rem;
        padding: 3px 10px;
    }

    .loading-container,
    .error-container,
    .no-posts {
        padding: 25px 15px;
    }

    :deep(.markdown-body) {
        font-size: 0.95rem;
    }

    :deep(.markdown-body h1) {
        font-size: 1.5rem;
    }

    :deep(.markdown-body h2) {
        font-size: 1.3rem;
    }

    :deep(.markdown-body h3) {
        font-size: 1.2rem;
    }
}
</style>
