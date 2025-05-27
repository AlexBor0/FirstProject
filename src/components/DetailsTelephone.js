import formatPhoneNumber from "./FormatePhone";
import MobileLogo from './MobileLogo';

const DetailsTelephone = ({ tel, word = '', classTel='' }) => {

   const formatedTel = tel ? tel.replace(/\D/g, '') : tel;
    
    return (
         <p className={classTel}>{word} {tel
                ? <a href={`tel: +${formatedTel}`}>
                    { formatPhoneNumber(tel) }
                    </a> 
                : <span>не надано</span>
            } 
            <MobileLogo
                firstDigits={(tel && tel.slice(3, 5)) || null} 
                mobileClass={"mobileVacancyCard"}
            /> 
        </p>

    )
}

export default DetailsTelephone;