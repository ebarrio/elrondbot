module.exports = function help(channel) {
  channel.send(
    "**BeornBot** - Lord of the Rings: The Card Game Bear Bot 3.0.2 - List of commands\n" +
      "!help - This help message\n" +
      "!hob <query> - Find and display card text from Hall of Beorn\n" +
      "!hob+ <query> - Find and display card text from Hall of Beorn (including unofficial)\n" +
      "!hobimg <query> - Find and display card image from Hall of Beorn\n" +
      "!hobimg+ <query> - Find and display card image from Hall of Beorn (including unofficial)\n" +
      "!quest - Select a random quest\n" +
      "!hero - Select a random hero\n" +
      "!card - Select a random card (skipping heroes)\n" +
      "!faq <text> - Finds questions in FAQ containing <text>\n" +
      "!glossary <text> - Finds questions in Glossary containing <text>\n" +
      "!errata <cardname> - Finds errata for card with name <cardname>\n" +
      "!myrings - Display your links from RingsDB\n" +
      "**It was a good story, that of yours, but I like it still better now I am sure it is true.**" +
      "**Patreon support welcome: https://www.patreon.com/Beorn **\n"
  );
};
