import moment, { Moment } from "moment";
import FileAccessor from "../repos/fileAccessor";

export default abstract class GenerateResult<T> {
    private todoAccessor: FileAccessor<T>;
    private doneAccessor: FileAccessor<T>;
    private templateAccessor: FileAccessor<T>;


    constructor(doneAccessor: FileAccessor<T>, todoAccessor: FileAccessor<T>, templateAccessor: FileAccessor<T>) {
        this.doneAccessor = doneAccessor;
        this.todoAccessor = todoAccessor;
        this.templateAccessor = templateAccessor;
    }
    save(): void {
        const input: T[] = this.todoAccessor.readJSON();
        const output: T[] = this.adjustTime(input);
        this.doneAccessor.writeJSON(output)
        const outputTemplate: string = this.generateTemplate(output);
        this.templateAccessor.write(outputTemplate);
    }
    protected abstract adjustTime(input: T[]): T[]

    protected abstract generateTemplate(input: T[]): string

    protected convertMomentTimestamp(timestamp: string) {
        return moment(timestamp, "h:mm:ss")
    }

    protected getTimeStamp(momentTimestamp: Moment) {
        function addZeroUpFront(num: number) {
            return num < 10 ? `0${num}` : num
        }

        var hours = addZeroUpFront(momentTimestamp.hour())
        var minutes = addZeroUpFront(momentTimestamp.minute())
        var seconds = addZeroUpFront(momentTimestamp.second())

        return `${hours}:${minutes}:${seconds}`
    }
}