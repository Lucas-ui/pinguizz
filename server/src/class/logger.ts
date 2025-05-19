import { createLogger, format, transports } from "winston";
import path from "path";
import DailyRotateFile from "winston-daily-rotate-file";

const fileFormat = format.combine(
    format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    format.printf(({ level, message, timestamp }) => {
        return `[${timestamp}] ${level.toUpperCase()} : ${message}`;
    })
);

const consoleFormat = format.combine(
    format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    format.printf(({ level, message, timestamp }) => {
        return `[${timestamp}] ${level.toUpperCase()}: ${message}`;
    }),
    format.colorize({ all: true })
);

const createFileLogger = (filename: string) => {
    return createLogger({
        level: "info",
        format: fileFormat,
        transports: [
            new DailyRotateFile({
                filename: path.join(
                    __dirname,
                    `../../logs/${filename}/%DATE%.log`
                ),
                datePattern: "YYYY-MM-DD",
                maxSize: "10m",
                maxFiles: "7d",
                zippedArchive: false,
            }),
        ],
    });
};

const createConsoleLogger = () => {
    return createLogger({
        level: "debug",
        format: consoleFormat,
        transports: [new transports.Console()],
    });
};

class Logger {
    public loggerApi = createFileLogger("api");
    public loggerAuth = createFileLogger("auth");
    public loggerSequelize = createFileLogger("sequelize");

    public loggerConsole = createConsoleLogger();

    private static instance: Logger;

    private constructor() {}

    public static getInstance(): Logger {
        if (!Logger.instance) {
            Logger.instance = new Logger();
        }
        return Logger.instance;
    }
}

export const logger = Logger.getInstance();
