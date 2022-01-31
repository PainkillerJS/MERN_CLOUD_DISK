import "./style.scss";

import { ImgDir } from "../../../../assets/ImgDir";
import ImgFile from "../../../../assets/file.png";
import type { IFiles } from "../../../../common/model/IFiles";

export const File = ({ name, size, type, date }: Partial<IFiles>) => {
  const icon = type === "dir" ? <ImgDir /> : <img src={ImgFile} />;

  return (
    <div className="file">
      <div className="file__name">
        {icon}
        {name}
      </div>
      <div className="file__date">{date?.slice(0, 10)}</div>
      <div className="file__size">{size}gb</div>
    </div>
  );
};
