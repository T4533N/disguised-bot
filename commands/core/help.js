const { MessageEmbed } = require("discord.js");
const config = require("../../config");

module.exports = {
  name: "help",
  aliases: ["h"],
  showHelp: false,
  utilisation: "{prefix}help",

  execute(client, message, args) {
    const embed = new MessageEmbed();

    embed.setColor("RED");
    // embed.setAuthor(
    //   client.user.username,
    //   client.user.displayAvatarURL({ size: 1024, dynamic: true })
    // );

    const commands = client.commands.filter((x) => x.showHelp !== false);
    const prefix = config.app.px;

    embed.setDescription(
      `**Play**
      ${prefix}p [music-name] (text) i.e \`${prefix}p hello\`\n
      **Resume**
      ${prefix}rs\n
      **Pause**
      ${prefix}p (same as \`playing\`) i.e \`${prefix}p\`\n
      **Clear Queue**
      ${prefix}cq\n
      **Loop**
      ${prefix}lp or repeat\n
      **Shuffle**
      ${prefix}sh\n
      **Now playing**
      ${prefix}np\n
      **Save**
      ${prefix}sv\n
      **Search**
      ${prefix}search\n
      **Volume**
      ${prefix}vol\n
      **Stop**
      ${prefix}disconnect\n
      **Back**
      ${prefix}previous\n
      **Progress**
      ${prefix}pbar\n
      **Queue**
      ${prefix}q\n
      **Skip**
      ${prefix}sk\n
      `
    );

    // embed.addField(
    //   `Enabled - ${commands.size}`,
    //   commands
    //     .map(
    //       (x) =>
    //         `\`${x.name}${
    //           x.aliases[0] ? ` (${x.aliases.map((y) => y).join(", ")})\`` : "`"
    //         }`
    //     )
    //     .join(" | ")
    // );

    embed.setTimestamp();
    embed.setFooter(
      "Music comes first ❤️",
      message.author.avatarURL({ dynamic: true })
    );

    message.channel.send({ embeds: [embed] });
  },
};
