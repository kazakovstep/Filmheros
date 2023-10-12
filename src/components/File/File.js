import {useState, useRef} from "react";
import styles from "./File.module.css";
import cn from "classnames";
import Clip from "../../images/clip.svg";
import Cross from "../../images/cross.svg"

export const File = ({
  className,
    many,
  ...props
}) => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [showLoading, setShowLoading] = useState(false);
  const inputRef = useRef(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
   const files = event.target.files;
  if (many) {
    if (files && files.length <= 5) {
      const fileArray = Array.from(files).map((file: File) => ({
        ...file,
        imageSrc: URL.createObjectURL(file),
        name: file.name
      }));
      setSelectedFiles(prevFiles => [...prevFiles, ...fileArray]);
      setShowLoading(true);

      Promise.all(
        fileArray.map(file => {
          return new Promise((resolve, reject) => {
            setTimeout(() => {
              reject();
            }, 500);
          });
        })
      )
        .then(() => {
          setShowLoading(false);
        })
        .catch(error => {
          console.error(error);
          setShowLoading(false);
        });
    }
   }
   else{
      if (files && files.length === 1) {
    const file = files[0];
    const customFile = {
      ...file,
      imageSrc: URL.createObjectURL(file),
      name: file.name
    };
    setSelectedFiles([customFile]);
    setShowLoading(true);

    new Promise((resolve, reject) => {
      setTimeout(() => {
        reject();
      }, 500);
    })
      .then(() => {
        setShowLoading(false);
      })
      .catch(error => {
        console.error(error);
        setShowLoading(false);
      });
    }
   }

};



  const handleRemoveFile = (file: CustomFile) => {
  setSelectedFiles(prevFiles => prevFiles.filter(f => f !== file));
  URL.revokeObjectURL(file.imageSrc); // Освобождаем URL-адрес изображения

  // Remove the file from the input file list
  const inputFiles = inputRef.current?.files;
  if (inputFiles) {
    const updatedFiles = Array.from(inputFiles).filter(f => f !== file);
    const newInputFiles = new DataTransfer();
    updatedFiles.forEach(f => newInputFiles.items.add(f));
    inputRef.current.files = newInputFiles.files;
  }
};

  return (
    <>
      <input
        className={cn(styles.input_invisible)}
        type="file"
        onChange={handleFileChange}
        {...props}
        style={{display:"none"}}
        accept={"image/*"}
        ref={inputRef}
        multiple
      />
      <div className={cn(styles.inputWrapper)}>
        <input
          placeholder={
            "Выберите файлы"
          }
          className={cn(styles.input)}
          onClick={() => inputRef.current?.click()}
          readOnly
          value={showLoading ? "Загрузка 20%" : selectedFiles.length > 0 ? "Выбрано файлов: " + selectedFiles.length :  ""}
        />
        <img src={Clip} alt={"Clip"} className={styles.clipIcon} onClick={() => inputRef.current?.click()} />
      </div>
      {selectedFiles.length > 0 && (
      <div className={cn(styles.imageBlock)}>
        {selectedFiles.map((file, index) => (
          <div key={file.name + index} className={cn(styles.imageWrapper)}>
              <div className={cn(styles.imageContainer)}>
                  <img className={cn(styles.image)} src={file.imageSrc} alt={file.name} />
              </div>
              <input
                className={cn(styles.file_name)}
                readOnly
                value={file.name}
              />
              <img src={Cross} alt={"Cross"} className={styles.crossIcon} onClick={() => handleRemoveFile(file)}/>
          </div>
        ))}
      </div>
)}
    </>
  );
};