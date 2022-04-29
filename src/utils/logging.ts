
export enum LogLevel {
  Trace,
  Debug,
  Info ,
  Warning,
  Error,
  Critical,
}

export interface FormatterOptions {
  logger: string,
  level: LogLevel,
  message: string,
  params: string[],
}
type Formatter = (options: FormatterOptions) => string|string[];

export class Logger {

  name: string;
  formatter: Formatter;
  level: LogLevel;

  constructor(name: string, level: LogLevel) {
    this.name = name;
    this.level = level;
    this.formatter = ({logger, level, message, params}) =>
      `[${LogLevel[level]}][${logger}]${message}${params.join(' ')}`;
  }

  setFormatter(formatter: Formatter) : Logger {
    this.formatter = formatter;
    return this;
  }

  log(level: LogLevel, message: string, ...params: any[]) {
    if (level < this.level) return;
    const stringParams = params.map(x => x.toString());
    let pretty = this.formatter({
      level,
      logger: this.name,
      message: message,
      params: stringParams
    })
    if (!Array.isArray(pretty)) pretty = [pretty];
    console.log.apply(null, pretty);
  }

  info(message: string, ...params: any[]) { return this.log(LogLevel.Info, message, params) }
  debug(message: string, ...params: any[]) { return this.log(LogLevel.Debug, message, params) }
  trace(message: string, ...params: any[]) { return this.log(LogLevel.Trace, message, params) }
}


type PrettyFormatter = () => Formatter;
export const makePrettyFormatter : PrettyFormatter = () => (all) => {
  const {logger, level, message, params} = all;
  return [
    `%c[${LogLevel[level]}] [${logger}] %c${message} %c${params.join(' ')}`,
    'color: #88ff00',
    'color: #ffff00',
    'color: #00ffff',
  ];
}

export const getLogger = (name: string) => new Logger(name, LogLevel.Trace).setFormatter(makePrettyFormatter());