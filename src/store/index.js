import { createStore } from 'vuex'

export default createStore({
  state: {
    socialLinks: [
      {
        id: 1,
        name: 'GitHub',
        url: 'https://github.com/darkfated',
        icon: 'github',
      },
      {
        id: 2,
        name: 'Telegram группа',
        url: 'https://t.me/darkfated_group',
        icon: 'telegram',
      },
      {
        id: 3,
        name: 'Мой Telegram',
        url: 'https://t.me/darkfated',
        icon: 'telegram',
      },
      {
        id: 4,
        name: 'YouTube канал',
        url: 'https://www.youtube.com/@darkfated',
        icon: 'youtube',
      },
      {
        id: 5,
        name: 'Steam профиль',
        url: 'https://steamcommunity.com/id/darkfated/',
        icon: 'steam',
      },
      {
        id: 6,
        name: 'Discord тег',
        url: '#',
        copyTag: 'darkfated',
        icon: 'discord',
      },
    ],
    skills: [
      { name: 'Golang', level: 90 },
      { name: 'Python', level: 85 },
      { name: 'Lua', level: 90 },
      { name: 'JavaScript', level: 75 },
      { name: 'C#', level: 70 },
      { name: 'C++', level: 65 },
    ],
  },
  getters: {
    getSocialLinks: state => state.socialLinks,
    getSkills: state => state.skills,
  },
  mutations: {},
  actions: {},
  modules: {},
})
