module.exports = function help(channel) {
  channel.send(
    "**BeornBot** - Lord of the Rings: The Card Game bear bot - List of commands\n" +
      "!help - This help message\n" +
      "!hob <query> - Find and display offical card text from Hall of Beorn\n" +
      "!hob+ <query> - Find and display card text from Hall of Beorn (including community cards)\n" +
      "!hobimg <query> - Find and display offical card image from Hall of Beorn\n" +
      "!hobimg+ <query> - Find and display card image from Hall of Beorn (including community cards)\n" +
      "!quest - Select a random quest\n" +
      "!hero - Select a random hero\n" +
      "!card - Select a random card (skipping heroes)\n" +
      "!faq <text> - Finds questions in FAQ containing <text>\n" +
      "!glossary <text> - Finds questions in Glossary containing <text>\n" +
      "!errata <cardname> - Finds errata for card with name <cardname>\n" +
      "!myrings - Display your links from RingsDB\n" +
      "**I do not need your service, thank you, but I expect you need mine.**"
  );
};
