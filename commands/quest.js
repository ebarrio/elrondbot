const helpers = require("./command-helpers");

module.exports = function quest(questList, author, channel, logger, filterUnofficial) {
  var questTypeFilter = (filterUnofficial)
    ? function(x) { return x.is_official; }
    : function(x) { return true; };

  const quests = questList.filter(q => questTypeFilter(q));
      
  const quest = helpers.getRandomItem(quests);

  channel.send(`<@${author.id}> ` + "Here's a quest for you: " + `**${quest.name}**\n${quest.product}\n\n${quest.url}`);
}
