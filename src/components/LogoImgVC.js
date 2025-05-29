import { forwardRef } from 'react';

const LogoImgVC = forwardRef(( {
        conditions,
        host,
        pcv,
        pcsc,
        isLogo,
    }, ref ) => {
 

    return (
        <>
            {((conditions && isLogo) || ((pcv || pcsc) && isLogo)) && 
                    <img 
                        width="100px"
                        height="100px"
                        className="companyLogo" 
                        src={host + (isLogo.formats?.thumbnail?.url || isLogo.url)} 
                        alt="Логотип компанії"
                        ref={ref}
                    />
            }
  
        </>
    )
});

export default LogoImgVC;