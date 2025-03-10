import React, { memo } from "react";

const Image = memo (({ url, alt }) => (
 
            <img loading="lazy" className = "firstWallpaper" src={url} alt={alt}/>
        
));

export default Image;