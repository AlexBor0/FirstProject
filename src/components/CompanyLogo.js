

const CompanyLogo = ({ wordOne, wordTwo }) => {
    return (
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
  
  <rect x="0" y="0" width="200" height="200" rx="10" class="fil7" />
  
 
  <path class="fil5" d="M64.49 178.8c17.54,16.71 97.93,24.7 97.24,-33.44 -0.26,-21.24 -13.3,-29.47 -25.34,-47.61 -12.39,-18.68 -6.37,-36.14 -33.64,-36.14 -27,0 -16.21,21.13 -43.03,56.11 -13.81,18.01 -13.49,43.7 4.77,61.08z"/>
  <path class="fil5" d="M105.36 47.3l-0.39 10.17c51.6,1.96 55.46,-38.32 51.84,-49.45 -18.77,-0.71 -50.71,19.65 -51.45,39.28z"/>
  <path class="fil5" d="M99.45 50.12l1.17 7.29c-36.97,5.91 -43.26,-22.74 -41.62,-31.07 13.44,-2.15 38.21,9.72 40.45,23.78z"/>
  
  
  <text x="100" y="145" font-family="Arial, sans-serif" font-size="52" text-anchor="middle" class="fil4">{wordOne}</text>
  <text x="100" y="165" font-family="Arial, sans-serif" font-size="24" text-anchor="middle" class="fil4">{wordTwo}</text>
  
  <rect x="10" y="10" width="180" height="180" rx="8" fill="none" stroke="#a0a0a0" stroke-width="6" stroke-dasharray="5,5" />
</svg>)
}

export default CompanyLogo
