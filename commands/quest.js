const helpers = require("./command-helpers");

module.exports = function quest(scenarios, author, channel, logger, filterUnofficial) {
  var questTypeFilter = (filterUnofficial)
    ? function(x) { return x.is_official; }
    : function(x) { return true; };

  const quests = scenarios.filter(s => questTypeFilter(s));
      
  const quest = helpers.getRandomItem(quests);

  channel.send(`<@${author.id}> ` + "Here's a quest for you: " + `**${quest.name}**\n${quest.url}\n\n${quest.hoburl}`);
}
