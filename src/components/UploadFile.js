import IconUpload from "./IconUpload";


const UploadFile = ({getImage, inputFileRef}) => {


    return(
       <>
            <p>Виберіть фото (до 120кВ) для вашого резюме (як вас побачить работодавець)</p>
            <div className="inputWrapper" >
            
                <label required htmlFor="image" className="btnInputFile">
                    <span className="inputFileIconWrapper">
                        <IconUpload/>
                    </span>
                    <input type="file" id="image" className="inputFile" name="foto" accept=".png, .jpg, .jpeg, .webp" 
                        onChange={getImage} 
                        ref={inputFileRef}/>
                    <span className="inputFileBtnText">ЗАВАНТАЖИТИ ФОТО</span>
                </label>
            </div>
       </>)
  

}
export default UploadFile