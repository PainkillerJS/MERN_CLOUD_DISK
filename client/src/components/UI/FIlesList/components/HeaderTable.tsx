import { memo } from "react";

export const HeaderTable = memo(() => {
  return (
    <div className="files__header">
      <div className="files__name">Название</div>
      <div className="files__date">Дата создания</div>
      <div className="files__size">Размер</div>
    </div>
  );
});
