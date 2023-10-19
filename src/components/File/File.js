import {useState, useRef, useEffect} from "react";
import styles from "./File.module.css";
import cn from "classnames";
import Clip from "../../images/clip.svg";
import Cross from "../../images/cross.svg"

export const File = ({ className, many, valueSolo ,valueMany, ...props }) => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [selectedFilesSolo, setSelectedFilesSolo] = useState([]);
  const inputRef = useRef(null);

useEffect(() => {
  if (valueSolo && valueSolo !== "") {
    setSelectedFilesSolo([{ imageSrc: valueSolo, name: valueSolo }]);
  } else {
    setSelectedFilesSolo([]);
  }
}, [valueSolo]);


  const handleFileChange = (event) => {
    const files = event.target.files;

    if (many) {
      if (files && files.length <= 3) {
        const fileArray = Array.from(files).map((file) => ({
          ...file,
          imageSrc: URL.createObjectURL(file),
          name: file.name,
        }));
        setSelectedFiles((prevFiles) => [...prevFiles, ...fileArray]);
      }
    } else {
      if (files && files.length === 1) {
        const file = files[0];
        const customFile = {
          ...file,
          imageSrc: URL.createObjectURL(file),
          name: file.name,
        };
        setSelectedFilesSolo([customFile]);
      }
    }
  };

  const handleRemoveFile = (file) => {
    setSelectedFiles((prevFiles) => prevFiles.filter((f) => f !== file));
    URL.revokeObjectURL(file.imageSrc);
  };

    return (
      <div>
        <input
          className={cn(styles.input_invisible)}
          type="file"
          onChange={handleFileChange}
          {...props}
          style={{ display: "none" }}
          accept="image/*"
          ref={inputRef}
          multiple={many}
        />
        <div className={cn(styles.inputWrapper)}>
          <input
            placeholder="Выберите файлы"
            className={cn(styles.input)}
            onClick={() => inputRef.current?.click()}
            readOnly
            value={
            many ? (
                selectedFiles.length > 0 ? `Выбрано файлов: ${selectedFiles.length}` : ""
                ) : (
                selectedFilesSolo.length > 0 ? `Выбрано файлов: ${selectedFilesSolo.length}` : ""
            )
            }
          />
          <img
            src={Clip}
            alt="Clip"
            className={styles.clipIcon}
            onClick={() => inputRef.current?.click()}
          />
        </div>
        {(selectedFiles.length > 0 || selectedFilesSolo.length > 0) && (
          <div className={cn(styles.imageBlock)}>
            {many ?
                (selectedFiles.map((file, index) => (
              <div key={file.name + index} className={cn(styles.imageWrapper)}>
                <div className={cn(styles.imageContainer)}>
                  <img className={cn(styles.image)} src={file.imageSrc} alt={file.name} />
                </div>
                <input className={cn(styles.file_name)} readOnly value={file.name} />
                <img
                  src={Cross}
                  alt="Cross"
                  className={styles.crossIcon}
                  onClick={() => handleRemoveFile(file)}
                />
              </div>
            ))) :
                (selectedFilesSolo.map((file, index) => (
              <div key={file.name + index} className={cn(styles.imageWrapper)}>
                <div className={cn(styles.imageContainer)}>
                  <img className={cn(styles.image)} src={file.imageSrc} alt={file.name} />
                </div>
                <input className={cn(styles.file_name)} readOnly value={file.name} />
                <img
                  src={Cross}
                  alt="Cross"
                  className={styles.crossIcon}
                  onClick={() => handleRemoveFile(file)}
                />
              </div>
            )))
            }

          </div>
        )}
      </div>
    );
};