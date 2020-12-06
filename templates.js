function parseText(text, emoji) {
  let parsedText = text
    .replace(/<\/?b>/g, "**")
    .replace(/<\/?i>/g, "*")
    .replace(/<\/.*>/g, "");

  Object.keys(emoji).forEach(emoName => {
    parsedText = parsedText.replace(`[${emoName}]`, emoji[emoName]);
  });

  return parsedText;
}

function cardShort({
  sphere_code,
  pack_name,
  encounter_set,
  name,
  sphere_name,
  type_name,
}, emoji) {
    if (encounter_set) {
        return `**${name}**\n*${type_name} (${pack_name})*`;
    } else {
        return `${emoji[sphere_code] || ''} **${name}**\n*${sphere_name} ${type_name} (${pack_name})*`;
    }
}

function card({
  sphere_code,
  name,
  sphere_name,
  type_name,
  traits,
  cost,
  text,
  flavor,
  pack_name,
  position,
}, emoji) {
  let message = `${emoji[sphere_code] || ''} **${name}**\n*${sphere_name} ${type_name}* - Cost: **${cost}**\n`;
  if (traits) {
    message += `**${traits}**\n`;
  }
  message += `${parseText(text, emoji)}\n`;
  if (flavor) {
    message += `*${flavor.replace(/<cite>/g, " - ").replace(/<\/cite>/, "")}*\n`;
  }
  message += `\n*${pack_name}* - **#${position}**\n\n`;

  return message;
}

function hero({
  sphere_code,
  name,
  sphere_name,
  type_name,
  threat,
  willpower,
  attack,
  defense,
  health,
  traits,
  text,
  flavor,
  pack_name,
  position,
}, emoji) {
  let message = `${emoji[sphere_code] || ''} **${name}**\n*${sphere_name} ${type_name}* - Starting Threat: **${threat}**\n${emoji["willpower"]} ${willpower} ${emoji['attack']} ${attack} ${emoji['defense']} ${defense} ${emoji['hitpoints']} ${health}\n`;
  if (traits) {
    message += `**${traits}**\n\n`;
  }
  message += `${parseText(text, emoji)}\n`;
  if (flavor) {
    message += `*${flavor.replace(/<cite>/g, " - ").replace(/<\/cite>/, "")}*\n`;
  }
  message += `\n*${pack_name}* - **#${position}**\n\n`;

  return message;

}

function player_side_quest({
  sphere_code,
  name,
  sphere_name,
  type_name,
  quest_points,
  traits,
  text,
  flavor,
  pack_name,
  position,
}, emoji) {
    let message = `${emoji[sphere_code] || ''} **${name}**\n*${sphere_name} ${type_name}* - ${emoji['hitpoints']} ${quest_points}\n`;
    if (traits) {
        message += `**${traits}**\n\n`;
    }
    message += `${parseText(text, emoji)}\n`;
    if (flavor) {
        message += `*${flavor.replace(/<cite>/g, " - ").replace(/<\/cite>/, "")}*\n`;
    }
    message += `\n*${pack_name}* - **#${position}**\n\n`;

    return message;
}

function enemy({
  name,
  type_name,
  engagement_cost,
  encounter_set,
  threat_strength,
  attack,
  defense,
  health,
  traits,
  text,
  flavor,
  pack_name,
  position,
}, emoji) {
    let message = `Encounter Set: ${encounter_set} Engagement Cost: **${engagement_cost}**\n${emoji["threat"]} ${threat_strength} ${emoji['attack']} ${attack} ${emoji['defense']} ${defense} ${emoji['hitpoints']} ${health}\n`;
    if (traits) {
        message += `**${traits}**\n\n`;
    }
    message += `${parseText(text, emoji)}\n`;
    if (flavor) {
        message += `*${flavor.replace(/<cite>/g, " - ").replace(/<\/cite>/, "")}*\n`;
    }
    message += `\n*${pack_name}* - **#${position}**\n\n`;

    return message;
}

function location({
  name,
  type_name,
  encounter_set,
  threat_strength,
  quest_points,
  traits,
  text,
  flavor,
  pack_name,
  position,
}, emoji) {
    let message = `Encounter Set: ${encounter_set}\n${emoji["threat"]} ${threat_strength} ${emoji['hitpoints']} ${quest_points}\n`;
    if (traits) {
        message += `**${traits}**\n\n`;
    }
    message += `${parseText(text, emoji)}\n`;
    if (flavor) {
        message += `*${flavor.replace(/<cite>/g, " - ").replace(/<\/cite>/, "")}*\n`;
    }
    message += `\n*${pack_name}* - **#${position}**\n\n`;

    return message;
}

function treachery({
  name,
  type_name,
  encounter_set,
  traits,
  text,
  flavor,
  pack_name,
  position,
}, emoji) {
    let message = `Encounter Set: ${encounter_set}\n`;
    if (traits) {
        message += `**${traits}**\n\n`;
    }
    message += `${parseText(text, emoji)}\n`;
    if (flavor) {
        message += `*${flavor.replace(/<cite>/g, " - ").replace(/<\/cite>/, "")}*\n`;
    }
    message += `\n*${pack_name}* - **#${position}**\n\n`;

    return message;
}

function encounter_side_quest({
  name,
  type_name,
  encounter_set,
  quest_points,
  traits,
  text,
  flavor,
  pack_name,
  position,
}, emoji) {
    let message = `Encounter Set: ${encounter_set}\n$${emoji['hitpoints']} ${quest_points}\n`;
    if (traits) {
        message += `**${traits}**\n\n`;
    }
    message += `${parseText(text, emoji)}\n`;
    if (flavor) {
        message += `*${flavor.replace(/<cite>/g, " - ").replace(/<\/cite>/, "")}*\n`;
    }
    message += `\n*${pack_name}* - **#${position}**\n\n`;

    return message;
}

function ally({
  sphere_code,
  name,
  sphere_name,
  type_name,
  cost,
  willpower,
  attack,
  defense,
  health,
  traits,
  text,
  flavor,
  pack_name,
  position,
}, emoji) {
  let message = `${emoji[sphere_code] || ''} **${name}**\n*${sphere_name} ${type_name}* - Cost: **${cost}**\n${emoji["willpower"]} ${willpower} ${emoji['attack']} ${attack} ${emoji['defense']} ${defense} ${emoji['hitpoints']} ${health}\n`;
  if (traits) {
    message += `**${traits}**\n\n`;
  }
  message += `${parseText(text, emoji)}\n`;
  if (flavor) {
    message += `*${flavor.replace(/<cite>/g, " - ").replace(/<\/cite>/, "")}*\n`;
  }
  message += `\n*${pack_name}* - **#${position}**\n\n`;

  return message;
}

module.exports = {
  card,
  cardShort,
  hero,
  ally,
  player_side_quest,
  enemy,
  location,
  treachery,
  encounter_side_quest
};
