import React from "react";
import { IoCloseCircleSharp } from "react-icons/io5";

const UploadFileInfo = ({newCandidate, fileSize, hasFile, deleteImage}) => {
    if (!newCandidate.foto) return null;
        return (
        <div className="uploadFileInfo">
            <p>Ви завантажили файл: <strong>{newCandidate.foto.name}</strong> </p>
            <p>Розмір файлу: 
                <strong style={{color: (fileSize) < 120 ? 'green' : 'red'}} > {fileSize} kB</strong> 
                <IoCloseCircleSharp className="delete-img-icon"  onClick={hasFile ? deleteImage : undefined}  />
            </p>
        </div>
        )

}
export default UploadFileInfo