import './../css/MobileLogo.css';
const MobileLogo = ({ firstDigits, mobileClass }) => {

    const operatorsUA = {
        "67": "KVS", "68": "KVS", "96": "KVS", "97": "KVS", "98": "KVS",
        "50": "VDF", "66": "VDF", "95": "VDF", "99": "VDF",
        "63": "LFC", "73": "LFC", "93": "LFC", "94": "LFC"
    };

    const logo = operatorsUA[firstDigits] || null;

    return (
        <>
            <svg 
                
                xmlns= "http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                viewBox="0 0 200 200"
                className={mobileClass}
            >
                <defs>
                    <style type="text/css">
                    {`
                        .str0logo {stroke:#00A0FF;stroke-width:25;stroke-linecap:round;stroke-miterlimit:22.9256}
                        .fil2logo {fill:none;fill-rule:nonzero}
                        .fil0logo {fill:white;fill-rule:nonzero;stroke:black;strokeWidth:10}
                        .fil1logo {fill:black;fill-rule:nonzero}
                        .fil3logo {fill:red;fill-rule:nonzero}
                        .fil4logo {fill:#FFC40C;fill-rule:nonzero}
                    `}
                    </style>
                </defs>

                {logo === "KVS" && 
                    <g>
                        <rect className="fil0logo" width="200" height="200" />
                    
                        <path className="fil1logo" d="M99.78 19.21l0 45.31 0 -45.31zm0 0l0 0 0 0z"/>
                        <path className="fil2logo str0logo" d="M99.78 19.21l0 45.31m0 -45.31l0 0 0 0z"/>

                        <path className="fil1logo" d="M183 79.67l-43.09 14.01 43.09 -14.01zm0 0l0 0 0 0z"/>
                        <path className="fil2logo str0logo" d="M183 79.67l-43.09 14.01m43.09 -14.01l0 0 0 0z"/>
    
                        <path className="fil1logo" d="M151.22 177.5l-26.64 -36.66 26.64 36.66zm0 0l0 0 0 0z"/>
                        <path className="fil2logo str0logo" d="M151.22 177.5l-26.64 -36.66m26.64 36.66l0 0 0 0z"/>

                        <path className="fil1logo" d="M48.35 177.5l26.64 -36.66 -26.64 36.66zm0 0l0 0 0 0z"/>
                        <path className="fil2logo str0logo" d="M48.35 177.5l26.64 -36.66m-26.64 36.66l0 0 0 0z"/>

                        <path className="fil1logo" d="M16.57 79.67l43.09 14.01 -43.09 -14.01zm0 0l0 0 0 0z"/>
                        <path className="fil2logo str0logo" d="M16.57 79.67l43.09 14.01m-43.09 -14.01l0 0 0 0z"/>
                    </g>
                }
                {logo === "VDF" &&
                    <g>

                        <rect className="fil3logo" x="-3.5" y="-3.78" width="200" height="200"/>
                        <path className="fil0logo" d="M167.37 96.23c0,39.13 -31.74,70.85 -70.87,70.85 -39.13,0 -70.86,-31.73 -70.86,-70.86 0,-39.13 31.74,-70.86 70.87,-70.86 39.13,0 70.86,31.55 70.86,70.68l0 0.19zm0 0l0 0 0 0z"/>
                        <path className="fil3logo" d="M97.07 135.75c-19.46,0.06 -39.72,-16.55 -39.85,-43.24 -0.06,-17.65 9.47,-34.64 21.63,-44.72 11.84,-9.78 28.03,-16.19 43.46,-16.19 1.52,0 3.04,0.19 4.52,0.58 -12.37,2.56 -25.14,16.51 -23.02,29.44 21.57,5.26 31.37,18.28 31.43,36.29 0.06,18.01 -14.17,37.76 -38.2,37.84l0.03 0zm0 0l0 0 0 0z"/>

                    </g>
                }
                {logo === "LFC" &&
                    <g>

                        <rect className="fil0logo" y="4" width="200" height="200"/>
                        <path className="fil4logo" fillRule="nonzero" d="M173.55 56.88c-12.96,-20.45 -31.44,-33.51 -55.01,-39.03 -45.03,-10.56 -89.99,15.72 -103.98,59.21 -4.3,14.37 -0.27,22.31 6.06,15.66 10.97,-11.69 25.56,-23.96 40.76,-29.61 0,0 3.36,-1.54 4.25,-6.21 4.27,-22.52 35.37,-19.83 38.14,0.65 2.57,18.91 -20.02,29.18 -32.71,17.51 -1.57,-1.45 -4.04,-1.19 -5.67,0.02 -16.33,13.61 -29.16,32.91 -35.17,53.27 -8.1,27.76 6.49,43.79 18.72,27.04 15.72,-24.99 43.58,-48.89 72.77,-55.98 2.38,-0.62 5.24,-4.16 5.56,-6.53 2.49,-18.54 35.42,-20.83 37.98,2.48 1.87,17.05 -17.53,27.72 -30.61,17.82 -4.53,-1.89 -8.01,-0.68 -9.26,-0.09 -9.56,5.21 -17.93,11.79 -25.57,19.54 -11.18,11.6 -19.71,25.73 -24.62,41.1 -3.44,11.65 4.03,16.3 12.67,17.98 67.71,13.07 126.62,-70.28 85.69,-134.83z"/>

                    </g>
                }
                

            </svg>

        </>
    )

}
export default MobileLogo;