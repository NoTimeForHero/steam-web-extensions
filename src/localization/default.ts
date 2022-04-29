export const DefaultMessages = {
  generic: {
    closeModal: 'Close'
  },
  modules: {
    CompareAchievements: {
      title: 'Compare achievements',
      getFriendsThatPlay: 'Getting friends that play this game...',
      getAchievements: 'Get game achievements...',
      loadingPlayer: 'Loading player',
      achievements: 'Achievements',
      friendsAchievements: 'Friends with achievements',
    }
  },
}

export type MessagesType = typeof DefaultMessages;

export type ILocalization = {
  names: string[],
  messages: MessagesType,
}