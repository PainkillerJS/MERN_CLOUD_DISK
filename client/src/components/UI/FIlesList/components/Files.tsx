import { useAppSelector } from "../../../../store/hooks/reduxHooks";
import { Preloader } from "../../common/Preloader";
import { BackBtn } from "../../BackBtn";
import { UploadFile } from "../../UploaderFile";
import { HeaderTable } from "./HeaderTable";
import { File } from "../../common/FIle";

export const Files = () => {
  const { isLoading, files, isSearch } = useAppSelector((state) => state.files);

  return (
    <>
      <div className="files__list">
        {isLoading ? (
          <Preloader />
        ) : (
          <>
            <div className="files__controller">
              {!isSearch && <BackBtn />}
              <UploadFile />
            </div>
            <HeaderTable />
            {files?.map(({ name, size, type, date, _id }) => (
              <File key={name} name={name} size={size} type={type} date={date} _id={_id} />
            ))}
          </>
        )}
      </div>
    </>
  );
};
