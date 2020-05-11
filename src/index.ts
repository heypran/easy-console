export default interface EConsole extends Console {
  history(): any;
  silentLog(...args: any): void;
  sl(...args: any): void;
  l(...args: any): void;
  debugMode(debug: boolean): void;
  isSaveLog(save: boolean): void;
  count(): number;
}

export const econsole: EConsole = (function (realConsole: Console) {
  let isDebug: boolean = true;
  let isSaveLog: boolean = true;
  const historyLog: any = {
    logs: [],
  };
  let logCount: number = 0;
  return {
    ...realConsole,
    silentLog(...args: any) {
      ++logCount;
      this.saveLog(args, "logs");
    },
    sl(...args: any) {
      ++logCount;
      this.saveLog(args, "logs");
    },
    log(...args: any[]) {
      ++logCount;
      this.saveLog(arguments, "logs");
      const stringify: string[] = this.stringifyArgs(arguments);
      isDebug && realConsole.log.apply(realConsole, stringify as any);
    },
    // exact copy of log()
    l(...args: any[]) {
      ++logCount;
      this.saveLog(arguments, "logs");
      isDebug && realConsole.log.apply(realConsole, args as any); // calling the overridden log
    },
    isDebug(bool: boolean) {
      isDebug = bool;
    },
    isSaveLog(save: boolean) {
      isSaveLog = save;
    },
    debugMode(debug: boolean) {
      isDebug = debug;
    },
    history() {
      // this is logged using original console & will not be stored in history
      isDebug && realConsole.log(historyLog);
    },
    saveLog(args: any, logType: string) {
      if (!isSaveLog) {
        return;
      }
      const stringify: string[] = this.stringifyArgs(args);
      historyLog[logType].push(stringify.join(" "));
    },
    stringifyArgs(args: any): string[] {
      let stringify: string[] = [];
      if (Array.isArray(args)) {
        stringify = args.map((arg: any) => {
          if (typeof arg === "object") return JSON.stringify(arg);
          return arg;
        });
      } else {
        stringify = Object.keys(args).map((key: string) => {
          if (typeof args[key] === "object") return JSON.stringify(args[key]);
          return args[key];
        });
      }
      return stringify;
    },
    count() {
      return logCount;
    },
  };
})(console);

export const ec: EConsole = econsole;
