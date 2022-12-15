const helpers = require("./command-helpers");

module.exports = function video(
  { name, filters },
    videoList,
    emojiSymbols,
    channel,
    author,
    logger,
    filterUnofficial,
  ) {
    if (name === '') {
        channel.send('Silly human, I need a query to find video links');
        return;
    }
    logger.info(`Searching for video links labled with ${name}`);

var setTypeFilter = (filterUnofficial)
  ? function(x) { return x.is_official; }
  : function(x) { return true; };

let matches = videoList
  .filter(l => (l.title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, "")
    .indexOf(name) > -1)
    || 
    (l.labels && l.labels.some(lb => lb.toLowerCase().indexOf(name) > -1))
  );
  //.filter(c => setTypeFilter(c))
  //.filter(c => helpers.checkLinkFilters(c, filters));

if (!matches || matches.length == 0) {
  channel.send(`no video links found matching ${name}\n`);
  return;
}

let trueLength = 0;
if (matches.length > 20) {
    trueLength = matches.length;
    matches = matches.splice(0, 20);
}

logger.info(`found ${matches.length} video links, sending response`);
if (matches.length === 1) {
  const message = matches.reduce((acc, link) => {
      acc += helpers.createLinkMessage(emojiSymbols, link);
    return acc;
}, "");
channel.send(message);
} else if (matches.length > 1) {
    if (trueLength > 0) {
        channel.send(`I found ${trueLength} video links (max 20), reply with the number of the one you want:`);
    } else {
        channel.send(`I found ${matches.length} video links, reply with the number of the one you want:`);
    }
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