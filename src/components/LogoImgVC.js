
const LogoImgVC = ( {
        conditions,
        host,
        pcv,
        pcsc,
        isLogo,
    } ) => {
 
    return (
        <>
            {((conditions && isLogo) || ((pcv || pcsc) && isLogo)) && 
                    <img 
                        width="100px"
                        height="100px"
                        className="companyLogo" 
                        src={host + (isLogo.formats?.thumbnail?.url || isLogo.url)} 
                        alt="Логотип компанії"
                    />
            }
  
        </>
    )
};

export default LogoImgVC;