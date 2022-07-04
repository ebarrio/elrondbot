const helpers = require("./command-helpers");

module.exports = function card({ filters } , cardList, emoji, channel, logger, filterUnofficial) {
  var setTypeFilter = (filterUnofficial)
    ? function(x) { return x.is_official; }
    : function(x) { return true; };

  const cards = cardList
    .filter(card => setTypeFilter(card))
    .filter(card => card.type_code == "hero" 
      || card.type_code == "ally" 
      || card.type_code == "attachment"
      || card.type_code == "event"
      || card.type_code == "player-side-quest"
      || card.type_code == "contract")
    .filter(card => helpers.checkFilters(card, filters));
  const card = helpers.getRandomItem(cards);

  channel.send(helpers.createCardMessage(emoji, card));
}