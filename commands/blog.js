const helpers = require("./command-helpers");

module.exports = function blog(
  { name, filters },
    blogList,
    emojiSymbols,
    channel,
    author,
    logger,
    filterUnofficial,
  ) {
    if (name === '') {
        channel.send('Silly human, I need a query to find blog links');
        return;
    }
    logger.info(`Searching for blog links labled with ${name}`);

var setTypeFilter = (filterUnofficial)
  ? function(x) { return x.is_official; }
  : function(x) { return true; };

let matches = blogList
  .filter(l => (l.title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, "")
    .indexOf(name) > -1)
    || 
    (l.labels && l.labels.some(lb => lb.indexOf(name) > -1))
  );
  //.filter(c => setTypeFilter(c))
  //.filter(c => helpers.checkLinkFilters(c, filters));

logger.info(`found ${matches.length} blog links, sending response`);
if (matches.length === 1) {
  const message = matches.reduce((acc, link) => {
      acc += helpers.createLinkMessage(emojiSymbols, link);
    return acc;
}, "");
channel.send(message);
} else if (matches.length > 1) {
    channel.send(`I found ${matches.length} blog links, reply with the number of the one you want:`);
channel.send(matches.map((link, index) => {
    const message = helpers.createShortLinkMessage(emojiSymbols, link);
return `${index + 1}. ${message}`;
}).join('\n'));
channel.awaitMessages(helpers.fromUser(author), { max: 1, time: 60000, errors: ['time']})
.then(collected => {
    const response = parseInt(collected.first().content, 10) - 1;
if (response >= 0 && response < matches.length) {
    channel.send(helpers.createLinkMessage(emojiSymbols, matches[response]));
} else {
    channel.send("Invalid response received");
}
})
    .catch(collected => console.log('No reply received within 60 seconds'));
}
};