import { createStore } from "vuex"

export default createStore({
  state: {
    portfolioItems: [
      {
        id: 1,
        title: "mantle",
        description:
          "Библиотека для написания скриптов в Garry's Mod. Предоставляет множество полезных функций и улучшает процесс разработки.",
        tags: ["Garry's Mod", "Lua"],
        link: "https://github.com/darkfated/mantle",
      },
      {
        id: 2,
        title: "FreSpawnmenu",
        description:
          "Первое в своем роде независимое новое SpawnMenu для игры Garry's Mod с улучшенным интерфейсом и дополнительными функциями.",
        tags: ["Garry's Mod", "Lua"],
        link: "https://github.com/darkfated/FreSpawnmenu",
      },
      {
        id: 3,
        title: "gamecheck",
        description:
          "Веб-приложение по отслеживанию прогресса в видеоиграх. Позволяет создавать списки игр, отмечать прогресс и делиться коллекцией.",
        tags: ["Frontend", "Backend", "Go", "React", "Vue.js"],
        link: "https://github.com/darkfated/gamecheck",
      },
      {
        id: 4,
        title: "lamerhelper",
        description:
          "Программа с универсальными утилитами для упрощённого использования персонального компьютера. Включает инструменты для работы с файлами и системой.",
        tags: ["C#", "WPF"],
        link: "https://github.com/darkfated/lamerhelper",
      },
      {
        id: 5,
        title: "FatedGang",
        description:
          "Система банд для совместного времяпровождения в Garry's Mod. Позволяет создавать группировки, проводить совместные действия и управлять иерархией.",
        tags: ["Garry's Mod", "Lua"],
        link: "https://github.com/darkfated/fatedgang",
      },
      {
        id: 6,
        title: "moontab",
        description:
          "Tab меню для DarkRP режима в Garry's Mod с современным интерфейсом и множеством полезных функций для управления игровым процессом.",
        tags: ["Garry's Mod", "Lua"],
        link: "https://github.com/darkfated/moontab",
      },
      {
        id: 7,
        title: "gameprofile",
        description:
          "Внутриигровая система профиля для Garry's Mod с детальной статистикой, достижениями и персонализацией игрового опыта.",
        tags: ["Garry's Mod", "Lua"],
        link: "https://github.com/darkfated/gameprofile",
      },
    ],
    socialLinks: [
      {
        id: 1,
        name: "GitHub",
        url: "https://github.com/darkfated",
        icon: "github",
      },
      {
        id: 2,
        name: "Telegram группа",
        url: "https://t.me/darkfated_group",
        icon: "telegram",
      },
      {
        id: 3,
        name: "Мой Telegram",
        url: "https://t.me/darkfated",
        icon: "telegram",
      },
      {
        id: 4,
        name: "YouTube канал",
        url: "https://www.youtube.com/@darkfated",
        icon: "youtube",
      },
      {
        id: 5,
        name: "Steam профиль",
        url: "https://steamcommunity.com/id/darkfated/",
        icon: "steam",
      },
      {
        id: 6,
        name: "Discord тег",
        url: "#",
        copyTag: "darkfated",
        icon: "discord",
      },
    ],
    skills: [
      { name: "Golang", level: 90 },
      { name: "Python", level: 85 },
      { name: "Lua", level: 90 },
      { name: "JavaScript", level: 75 },
      { name: "C#", level: 70 },
      { name: "C++", level: 65 },
    ],
  },
  getters: {
    getPortfolioItems: state => state.portfolioItems,
    getSocialLinks: state => state.socialLinks,
    getSkills: state => state.skills,
    getPortfolioItemsByCategory: state => category => {
      if (category === "all") {
        return state.portfolioItems
      }

      if (category === "gmod") {
        return state.portfolioItems.filter(item =>
          item.tags.some(tag => tag.toLowerCase().includes("garry's mod"))
        )
      }

      if (category === "frontend") {
        return state.portfolioItems.filter(item =>
          item.tags.some(tag => tag.toLowerCase().includes("frontend"))
        )
      }

      if (category === "backend") {
        return state.portfolioItems.filter(item =>
          item.tags.some(tag => tag.toLowerCase().includes("backend"))
        )
      }

      if (category === "other") {
        return state.portfolioItems.filter(
          item =>
            !item.tags.some(
              tag =>
                tag.toLowerCase().includes("garry's mod") ||
                tag.toLowerCase().includes("frontend") ||
                tag.toLowerCase().includes("backend")
            )
        )
      }

      return []
    },
  },
  mutations: {},
  actions: {},
  modules: {},
})
