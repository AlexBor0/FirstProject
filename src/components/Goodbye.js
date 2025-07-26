import {useEffect} from "react";

const Goodbye = ({ isOpen, onClose }) => {

    useEffect(() => {
        if(isOpen ){
            const timer = setTimeout(() => {
              onClose(null);
            }, 1000); 
      
            return () => clearTimeout(timer); // Очистка таймера при размонтировании
          }
        }, [isOpen, onClose]);
      
        if (!isOpen) return null;
    return (
        <div className="Rect">
            <div className="modalDialog">
                <div className="modalContent">
                <h2>Ви вийшли з вашого акаунта!</h2>
                </div>
            </div>
        </div>
    )
}

export default Goodbye