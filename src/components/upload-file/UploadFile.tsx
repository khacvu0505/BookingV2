import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import "./FileUpload.css";
import { useTranslation } from "react-i18next";

const FileUpload = (_, ref) => {
  const { t } = useTranslation();
  const inputRef = useRef<any>();

  const [selectedFile, setSelectedFile] = useState<any[]>([]);

  const handleFileChange = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(Array.from(event.target.files).slice(0, 5));
    }
  };

  const onChooseFile = () => {
    inputRef?.current?.click();
  };

  const handleClickDeleteFile = (position) => {
    const newFiles = selectedFile.filter((file, index) => index !== position);
    setSelectedFile(newFiles);
  };

  useImperativeHandle(
    ref,
    () => ({
      selectedFile,
      setSelectedFile,
    }),
    [selectedFile]
  );

  return (
    <div>
      <p className="text-14 fw-500 text-neutral-800 mb-10">{t("COMMON.UPLOAD_IMAGE")}</p>
      <input
        ref={inputRef}
        type="file"
        onChange={handleFileChange}
        style={{ display: "none" }}
        accept="image/*"
        multiple
      />
      {selectedFile?.length === 0 && (
        <button
          className="file-btn lg:text-17 md:text-16"
          onClick={onChooseFile}
        >
          <span className="icon-upload-file lg:text-17 md:text-16"></span>{" "}
          Upload File
        </button>
      )}

      {selectedFile?.length > 0 && (
        <div className="d-flex align-items-center flex-wrap mt-10">
          {selectedFile.map((file, index) => (
            <div
              key={index}
              style={{
                position: "relative",
              }}
            >
              <img
                // eslint-disable-next-line no-undef
                src={URL.createObjectURL(file)} // Tạo URL cho từng file
                alt="img-revview"
                style={{
                  width: "250px",
                  height: "200px",
                  objectFit: "cover",
                  borderRadius: "8px",
                  marginRight: "10px",
                  marginBottom: "20px",
                }}
                className="shadow-5 md:size-200"
              />
              <i
                className="icon-trash"
                style={{
                  backgroundColor: "#fff",
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  position: "absolute",
                  top: "1px",
                  right: "12px",
                  textAlign: "center",
                  lineHeight: "40px",
                  cursor: "pointer",
                }}
                onClick={() => handleClickDeleteFile(index)}
              ></i>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default forwardRef(FileUpload);
