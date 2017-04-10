export class LogService {
    error(message: string, ...data: any[]) {
        this.logMessage(EventLevel.Error, message, ...data);
    }

    warn(message: string, ...data: any[]) {
        this.logMessage(EventLevel.Warning, message, ...data);
    }

    info(message: string, ...data: any[]) {
        this.logMessage(EventLevel.Info, message, ...data);
    }

    debug(message: string, ...data: any[]) {
        this.logMessage(EventLevel.Debug, message, ...data);
    }

    fatal(message: string, ...data: any[]) {
        this.logMessage(EventLevel.Fatal, message, ...data);
    }

    private logMessage(eventLevel: EventLevel, message: string, ...data: any[]) {
        const logMessage: ILogMessage = {
            eventLevel: eventLevel,
            message: message,
            data: data,
        };
        console.log(logMessage);
    }
}

export enum EventLevel {
    Debug = 1,
    Info = 2,
    Warning = 3,
    Error = 4,
    Fatal = 5,
    Unknown = 100
}

/** Represents a log message for the system, along with environment data  */
export interface ILogMessage {
    /** The level of the event that occured */
    eventLevel: EventLevel;
    /** Details about the event */
    message: string;
    /** payload details */
    data?: any;
}
