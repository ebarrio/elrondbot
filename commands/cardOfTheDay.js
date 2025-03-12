const helpers = require("./command-helpers");

module.exports = function cardOfTheDay(cardList, emoji, logger, bot) {

  //Exclude First Age and Legacy of Numenor sets from Card of the Day
  const excludePacks = ['FA', 'TUtM', 'AtO', 'TBoM', 'TFoN', 'LoF', 'BTF'];

  const cards = cardList
    .filter(c => excludePacks.indexOf(c.pack_code) == -1 &&
      c.subtype_code != 'boon' &&
      c.sphere_code != 'baggins' &&
      c.sphere_code != 'fellowship' &&
      (c.type_code == "hero" 
      || c.type_code == "ally" 
      || c.type_code == "attachment"
      || c.type_code == "event"
      || c.type_code == "player-side-quest"
      || c.type_code == "contract"));

  const card = helpers.getRandomItem(cards);

  const channelId = '1348963907464855644';

  bot.channels.fetch(channelId)
    .then(channel => {
      if (channel) {
        try {
            channel.send(`**Card of the Day**\n`)
              .then(() => channel.send({ files : [`${card.imagesrc}`] }))
              .then(() => channel.send(helpers.createCardMessage(emoji, card)))
              .then(m => {
                  m.react('\u0031\ufe0f\u20e3')
                  m.react('\u0032\ufe0f\u20e3')
                  m.react('\u0033\ufe0f\u20e3')
                  m.react('\u0034\ufe0f\u20e3')
                  m.react('\u0035\ufe0f\u20e3')
              });
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
