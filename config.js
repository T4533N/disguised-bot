module.exports = {
  app: {
    px: "m!",
    playing: "by Jockie Music ❤️",
  },

  opt: {
    DJ: {
      enabled: false,
      roleName: "DJ",
      commands: [
        "back",
        "clear",
        "filter",
        "loop",
        "pause",
        "resume",
        "seek",
        "shuffle",
        "skip",
        "stop",
        "volume",
      ],
    },
    maxVol: 100,
    loopMessage: false,
    discordPlayer: {
      ytdlOptions: {
        quality: "highestaudio",
        highWaterMark: 1 << 25,
      },
    },
  },
};
