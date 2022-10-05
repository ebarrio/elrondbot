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
        try {
            channel.send(`**Card of the Day**\n`)
              .then(() => channel.send({ files : [`${card.imagesrc}`] }))
              .then(() => channel.send(helpers.createCardMessage(emoji, card))
                .then(m => {
                    m.react('\u0031\ufe0f\u20e3')
                    .then(m => m.react('\u0032\ufe0f\u20e3'))
                    .then(m => m.react('\u0033\ufe0f\u20e3'))
                    .then(m => m.react('\u0034\ufe0f\u20e3'))
                    .then(m => m.react('\u0035\ufe0f\u20e3'))
                    .catch(e => console.error('one of the emojis failed to react', e))
                })
              );
        } catch (err) {
            console.log(err);
            logger.error(err);
        }
      } else {
        let e = 'Could not find #card-of-the-day channel';
        logger.error(e);
        console.log(e);
      }
    });
}