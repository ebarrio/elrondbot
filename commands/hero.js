const helpers = require("./command-helpers");

module.exports = function hero({ filters }, cardList, emoji, channel, logger, filterUnofficial) {
  var setTypeFilter = (filterUnofficial)
    ? function(x) { return x.is_official; }
    : function(x) { return true; };

  const heroes = cardList
    .filter(card => setTypeFilter(card))
    .filter(card => card.type_code === "hero")
    .filter(card => helpers.checkFilters(card, filters));
  const hero = helpers.getRandomItem(heroes);

  channel.send(helpers.createCardMessage(emoji, hero));
}