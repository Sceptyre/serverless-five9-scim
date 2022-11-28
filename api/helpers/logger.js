const { createLogger, format, transports } = require("winston");

const logger = createLogger({
    levels: {
        fatal: 0,
        error: 1,
        warn: 2,
        info: 3,
        debug: 4,
        trace: 5,
    },
    transports: [new transports.Console()],
});

module.exports = logger