const fetch = require("node-fetch");
const helpers = require("./command-helpers");

module.exports = function ringsimg(
    { name, filters }, 
    cardList, 
    emojiSymbols, 
    channel, 
    author, 
    logger, 
    filterUnofficial
) {
    if (name === '') {
        channel.send('I am sorry, but I need at least a name to find a card');
        return;
    }
    logger.info(`Searching for ${name} (filterUnofficial=${filterUnofficial})`);

  var setTypeFilter = (filterUnofficial)
    ? function(x) { return x.is_official; }
    : function(x) { return true; };

  const imgMatches = cardList
    .filter(c => c.name
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, "")
      .indexOf(name) > -1
    )
    .filter(c => setTypeFilter(c))
    .filter(c => helpers.checkFilters(c, filters));
    let searchParams = `q=${name}`;
    const searchFilters = filters.map(f => `${f.filterKey}%3A${f.value}`).join('+');
    if (searchFilters.length > 0) {
      searchParams += `+${searchFilters}`;
    }

  logger.info(`found ${imgMatches.length} cards, sending response`);
  channel.send(`Cards found: ${imgMatches.length}\n\n`);
  if (imgMatches.length === 1) {
    const firstCard = imgMatches[0];
    if (firstCard.imagesrc2) {
      channel.send({
        files: [`${firstCard.imagesrc}`, `${firstCard.imagesrc2}`]
      });
    } else {
      channel.send({
        files: [`${firstCard.imagesrc}`]
      });
    }
  } else if (imgMatches.length > 1) {
    channel.send(`I found ${imgMatches.length} cards, reply with the number of the one you want:`);
    channel.send(imgMatches.map((card, index) => {
      const message = helpers.createShortCardMessage(emojiSymbols, card);
      return `${index + 1}. ${message}`;
    }).join('\n'));
    channel.awaitMessages(helpers.fromUser(author), { max: 1, time: 60000, errors: ['time']})
    .then(collected => {
      const response = parseInt(collected.first().content, 10) - 1;
      if (response >= 0 && response < imgMatches.length) {
        const selectedCard = imgMatches[response];
        if (selectedCard.imagesrc2) {
          channel.send({
            files: [`${selectedCard.imagesrc}`, `${selectedCard.imagesrc2}`]
          });
        } else {
          channel.send({
            files : [`${imgMatches[response]}`]
          });
        }
      } else {
        channel.send("Invalid response received");
      }
    })
    .catch(collected => console.log('No reply received within 60 seconds'));
  }
};
