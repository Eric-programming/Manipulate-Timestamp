import fs from "fs"

export default class FileAccessor<T>{
    private filePath: string;
    constructor(filePath: string) {
        this.filePath = filePath;
    }
    readToBuffer(): Buffer {
        return fs.readFileSync(this.filePath);
    }
    writeJSON(data: any): void {
        fs.writeFileSync(this.filePath, JSON.stringify(data));
    }
    write(data: any): void {
        fs.writeFileSync(this.filePath, data);
    }
    readJSON(): T[] {
        const buffer: Buffer = this.readToBuffer();
        return JSON.parse(buffer.toString());
    }
}