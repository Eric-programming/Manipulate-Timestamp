import SaveJSONChanges from "../abstraction/generateResult";
import { ITimestamp } from "../models/ITimestamp";
import FileAccessor from "../repos/fileAccessor";

export class AddTime extends SaveJSONChanges<ITimestamp>{
    private addTimestamp: string;
    constructor(doneAccessor: FileAccessor<ITimestamp>, todoAccessor: FileAccessor<ITimestamp>, templateAccesor: FileAccessor<ITimestamp>, addTimestamp: string) {
        super(doneAccessor, todoAccessor, templateAccesor);
        this.addTimestamp = addTimestamp
    }
    protected adjustTime(input: ITimestamp[]): ITimestamp[] {
        const addMomentTimestamp = this.convertMomentTimestamp(this.addTimestamp)
        return input.map((timestramp: ITimestamp) => {
            const { time, title } = timestramp;
            const curMomentTimestamp = this.convertMomentTimestamp(time);
            curMomentTimestamp.add({
                hours: addMomentTimestamp.hours(),
                minutes: addMomentTimestamp.minutes(),
                seconds: addMomentTimestamp.seconds()
            })
            return {
                time: this.getTimeStamp(curMomentTimestamp),
                title,
            }
        })
    }

    protected generateTemplate(input: ITimestamp[]): string {
        let text = "";

        input.forEach((timestamp: ITimestamp) => {
            text += `\r\n⌨️ (${timestamp.time}) - ${timestamp.title}`
        })

        return `⭐️ Course Contents ⭐️ ${text}`
    }
}