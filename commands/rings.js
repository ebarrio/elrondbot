const helpers = require("./command-helpers");

module.exports = function rings(
  { name, filters },
  cardList,
  emojiSymbols,
  bot,
  channelID,
  logger
) {
  if (name === '') {
    bot.sendMessage({
      to: channelID,
      message: 'I am sorry, but I need at least a name to find a card'
    });
    return;
  }
  logger.info(`Searching for ${name.trim()}`);
  const matches = cardList
    .filter(c => c.name.toLowerCase().indexOf(name.trim()) > -1)
    .filter(c => helpers.checkFilters(c, filters));

  logger.info(`found ${matches.length} cards, sending response`);
  const message = matches.reduce((acc, card) => {
    acc += helpers.createCardMessage(emojiSymbols, card);
    return acc;
  }, "");
  bot.sendMessage({
    to: channelID,
    message
  });
}