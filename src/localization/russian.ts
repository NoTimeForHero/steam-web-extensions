import {ILocalization, MessagesType} from "./default";

const RuMessages : MessagesType = {
  generic: {
    closeModal: 'Закрыть'
  },
  modules: {
    CompareAchievements: {
      title: 'Сравнить достижения',
      getFriendsThatPlay: 'Получение списка друзей, играющих в эту же игру...',
      getAchievements: 'Загрузка достижений в игре...',
      loadingPlayer: 'Загрузка игрока',
      achievements: 'Достижения',
      friendsAchievements: 'Друзья с достижениями',
    }
  }
}

export const RuLocalization : ILocalization = {
  messages: RuMessages,
  names: ['ru-ru', 'ru']
}