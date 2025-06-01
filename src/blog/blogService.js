import { marked } from "marked"

import firstpost from "!raw-loader!./posts/firstpost.md"

const postFiles = {
  firstpost: firstpost,
}

function parseFrontMatter(content) {
  const frontMatterRegex = /^---\s*\n([\s\S]*?)\n\s*---/
  const match = content.match(frontMatterRegex)

  if (!match) {
    console.warn("Фронтматтер не найден:", content.substring(0, 100))
    return { content, metadata: {} }
  }

  const frontMatter = match[1]
  const metadata = {}

  frontMatter.split("\n").forEach(line => {
    const colonIndex = line.indexOf(":")
    if (colonIndex !== -1) {
      const key = line.slice(0, colonIndex).trim()
      const value = line.slice(colonIndex + 1).trim()
      metadata[key] = value
    }
  })

  const contentWithoutFrontMatter = content.replace(match[0], "").trim()

  return {
    content: contentWithoutFrontMatter,
    metadata,
  }
}

function parseDate(dateStr) {
  if (!dateStr) return new Date(0)
  return new Date(dateStr)
}

export async function getAllPosts() {
  const posts = []

  for (const [slug, content] of Object.entries(postFiles)) {
    if (typeof content !== "string") {
      console.error(`Ошибка: содержимое ${slug} не является строкой:`, content)
      continue
    }

    const { content: postContent, metadata } = parseFrontMatter(content)

    posts.push({
      slug,
      content: postContent,
      html: marked(postContent),
      title: metadata.title || "Без названия",
      date: metadata.date || "",
      parsedDate: parseDate(metadata.date),
      description: metadata.description || "",
      tags: metadata.tags
        ? metadata.tags.split(",").map(tag => tag.trim())
        : [],
    })
  }

  return posts.sort((a, b) => b.parsedDate - a.parsedDate)
}

export async function getPostBySlug(slug) {
  const posts = await getAllPosts()
  return posts.find(post => post.slug === slug)
}

export async function getPostsByTag(tag) {
  const posts = await getAllPosts()
  return posts.filter(post =>
    post.tags.some(t => t.toLowerCase() === tag.toLowerCase())
  )
}

export function formatDate(dateStr) {
  if (!dateStr) return ""

  const date = new Date(dateStr)
  return date.toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })
}
