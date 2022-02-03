import FileAccessor from "./repos/fileAccessor";
import { DONE, TEMPLATE, TODO } from "./constants/filePath";
import { AddTime } from "./implementation/addTime";
import { ITimestamp } from "./models/ITimestamp";

function main(
  srcTODO: string,
  srcDONE: string,
  srcTEMPLATE: string,
  adjustTimestamp: string
) {
  const todoAccessor = new FileAccessor<ITimestamp>(srcTODO);
  const doneAccessor = new FileAccessor<ITimestamp>(srcDONE);
  const templateAccessor = new FileAccessor<ITimestamp>(srcTEMPLATE);

  const generateResult = new AddTime(
    doneAccessor,
    todoAccessor,
    templateAccessor,
    adjustTimestamp
  );

  generateResult.save();
}

main(TODO, DONE, TEMPLATE, "0:01:25");
