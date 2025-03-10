import {useEffect} from "react";

const useNoScroll = (...args) => {
    useEffect(() => {
        document.body.style.overflow = args.some(Boolean) ? 'hidden' : 'unset';           
        return () => {
                document.body.style.overflow = 'unset';};

    }, [args] );
}
export default useNoScroll;