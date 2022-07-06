const helpers = require("./command-helpers");

module.exports = function cardOfTheDay(cardList, emoji, logger, bot) {

  const cards = cardList
    .filter(c => c.type_code == "hero" 
      || c.type_code == "ally" 
      || c.type_code == "attachment"
      || c.type_code == "event"
      || c.type_code == "player-side-quest"
      || c.type_code == "contract");

  const card = helpers.getRandomItem(cards);

  const channelId = '994005297150570557';

  bot.channels.fetch(channelId)
    .then(channel => {
      if (channel) {
        channel.send(`**Card of the Day**\n`);
        channel.send({
          files : [`${card.imagesrc}`]
        });
        channel.send(helpers.createCardMessage(emoji, card));
      } else {
        let e = 'Could not find #card-of-the-day channel';
        logger.error(e);
        console.log(e);
      }
    });
}