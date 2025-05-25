export const filterQuestsByStatus = (quests, status) => {
    return quests.filter((quest) => quest.status === status);
};