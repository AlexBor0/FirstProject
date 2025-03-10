import {useEffect} from "react";

const useEsc = (func) => {
    useEffect(() => {
                    const handlKeyDown = (e) => {
                        if (e.key === 'Escape') {
                          func();}
                    }
                        
                    document.addEventListener('keydown', handlKeyDown);
                  
                    return () => {
                      document.removeEventListener('keydown', handlKeyDown);
                    };
                  }, [func]);
}
export default useEsc;