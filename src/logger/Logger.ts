export class Logger{

    private dateColor: string;
    private processColor: string;
    private pathColor: string;
    private infoColor: string;
    private warningColor: string;
    private errorColor: string;

    constructor(
        dateColor = "\x1b[36m%s\x1b[0m",
        processColor = "\x1b[35m",
        pathColor = "\x1b[34m",
        infoColor = "\x1b[32mINFO\x1b[0m",
        warningColor = "\x1b[33mWARNING\x1b[0m",
        errorColor = "\x1b[31mERROR\x1b[0m"
    ){
        this.dateColor = dateColor;
        this.processColor = processColor;
        this.pathColor = pathColor;
        this.infoColor = infoColor;
        this.warningColor = warningColor;
        this.errorColor = errorColor;
    }

    public getCurrentDateFormat(){
        let date = new Date();
        return {color: this.dateColor, date:`${date.getFullYear()}-${date.getMonth() < 10? "0" + (date.getMonth()+1): (date.getMonth()+1)}-${date.getDate() < 10? "0" + date.getDate():date.getDate()} ${date.getHours() + 2 < 10?"0" + date.getHours() + 2:date.getHours() + 2}:${date.getMinutes() < 10? "0" + date.getMinutes():date.getMinutes()}:${date.getSeconds() < 10? "0" + date.getSeconds(): date.getSeconds()}.${date.getMilliseconds()}`}
    }

    public getCallerFile(position = 2){
        if (position >= Error.stackTraceLimit) {
            throw new TypeError('getCallerFile(position) requires position be less then Error.stackTraceLimit but position was: `' + position + '` and Error.stackTraceLimit was: `' + Error.stackTraceLimit + '`');
          }
        
          const oldPrepareStackTrace = Error.prepareStackTrace;
          Error.prepareStackTrace = (_, stack)  => stack;
          const stack = new Error().stack;
          Error.prepareStackTrace = oldPrepareStackTrace;
          
          var errorPath: string | undefined = "";
        
          if (stack !== null && typeof stack === 'object') {
            errorPath = stack[position] ? (stack[position] as any).getFileName() : undefined;
          }
      
          var fileName:string | undefined = "";
      
          for(var i=errorPath.length-1; i > 0 ; i--){
              if (errorPath[i] === "\\")
                  break;
      
              fileName += errorPath[i];
          }
      
          return fileName.split("").reverse().join("");
    }

    public info(...args: any[]){
        let date = this.getCurrentDateFormat();
        console.log(date.color, date.date, this.processColor, process.pid, this.pathColor, this.getCallerFile(), this.infoColor, ...args);
    }

    public warning(...args: any[]){
        let date = this.getCurrentDateFormat();
        console.log(date.color, date.date, this.processColor, process.pid, this.pathColor, this.getCallerFile(), this.warningColor, ...args);
    }

    public error(...args: any[]){
        let date = this.getCurrentDateFormat()
        console.log(date.color, date.date, this.processColor, process.pid, this.pathColor, this.getCallerFile(), this.errorColor, ...args);
    }
}