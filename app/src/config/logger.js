const winston = require('winston');
const winstonDaily = require('winston-daily-rotate-file');
const appRoot = require('app-root-path');



const logDir = `${appRoot}\\src\\logs`;
const { createLogger , format, transports} = winston;
const { combine, timestamp, colorize, label, printf , prettyPrint} = format;

const myFormat = printf(({
    level, 
    message, 
    label, 
    timestamp
})=>
    `${timestamp} [${label}] ${level} : ${message}` // log 출력 포맷 정의
);


// [level] 0:error , 1:warn , 2:info, 3:http, 4:verbose, 5:debug, 6:silly
const logger = winston.createLogger({
    format : combine(
        label({
            label: `${process.env.NODE_ENV}`,
        }),
        timestamp({
            format : 'YYYY-MM-DD HH:mm:ss:ms'
        }),
        myFormat,
    ),
    transports : [
        new winstonDaily({
            level : 'info',
            datePattern : 'YYYY-MM-DD',
            dirname : logDir,
            filename : `%DATE%.log`,
            maxFiles : 30,  // 30일치 
            zippedArchive : true,
        }),

        new winstonDaily({
            level : 'error', 
            datePattern : 'YYYY-MM-DD',
            dirname : logDir,
            filename : `%DATE%.error.log`,
            maxFiles : 30,  // 30일치 
            zippedArchive : true,
        }),
        
    ],
    exceptionHandlers : [
        new winstonDaily({
            level : 'error',
            datePattern : 'YYYY-MM-DD',
            dirname : logDir,
            filename : `%DATE%.exception.log`,
            maxFiles : 30,  // 30일치 
            zippedArchive : true,
        }),
    ],
});

// Production환경이 아닌경우( dev등 )
if(process.env.NODE_ENV !== 'production'){
    logger.add( new winston.transports.Console({
        format: winston.format.combine(
            winston.format.colorize(),
            myFormat
        )
    }));
} 

module.exports = logger;