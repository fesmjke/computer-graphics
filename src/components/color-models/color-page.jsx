import React,{useEffect, useState, useRef} from "react";
import FooterPanel from "../footer-panel/footer-panel";
import {hsv2rgb, rgb2cmyk, rgb2hsv, toDegree} from "../../utils/colors";
import Upload from "../../static/images/upload.png";
import Download from "../../static/images/download.png";
import "./styles.css";

// СMYK і HSV

const WIDHT = 600;
const HEIGHT = 500;

const ColorPage = () => {
    const canvasRef = useRef(null);
    const canvasCtxRef = useRef(null);
    const [width, setWidth] = useState(WIDHT);
    const [height, setHeight] = useState(HEIGHT);
    const [loaded, setLoaded] = useState(false);
    const [imageSrc,setImageSrc] = useState(null);
    const [defaultDataImage, setDefaultDataImage] = useState(null);
    const [RGB,setRGB] = useState(null);
    const [CMYK,setCMYK] = useState(null);
    const [HSV,setHSV] = useState(null);
    const [saturation, setSaturation] = useState(5);

    useEffect(() => {
        if (canvasRef.current) {
          canvasCtxRef.current = canvasRef.current.getContext("2d");
        }
    });

    const getClickPosition = (event) => {
        const rect = canvasRef.current.getBoundingClientRect();

        const position = {
            x: Math.round(event.clientX - rect.left),
            y: Math.round(event.clientY - rect.top)
        }

        return position;
    }

    const handleClick = (event) => {
        const position = getClickPosition(event);

        const data = canvasCtxRef.current.getImageData(position.x,position.y,1,1);

        const RGB = {R : data.data[0], G: data.data[1], B: data.data[2]};

        const CMYK = rgb2cmyk(RGB);
        const HSV = rgb2hsv(RGB);

        console.log(RGB);
        console.log(CMYK);
        console.log({H: toDegree(HSV.H), S: HSV.S, V: HSV.V});

        setRGB(RGB);
        setCMYK(CMYK);
        setHSV({H: toDegree(HSV.H), S: HSV.S, V: HSV.V});
    }

    const handleSaturationChange = (event) => {
        if(saturation === 1) {
            setSaturation(saturation)
        }
        setSaturation(event.target.value)
    }

    useEffect(() => {
        if(!defaultDataImage) {
            return;
        }

        const nImageData = canvasCtxRef.current.createImageData(defaultDataImage);
        
        nImageData.data.set(defaultDataImage.data);
        
        const {data} = nImageData;

        for(let i = 0; i < data.length; i += 4){
            const RGB = {R : data[i], G: data[i+1], B: data[i+2]};
            
            const hsv = rgb2hsv(RGB);

            if(RGB.R === RGB.G && RGB.G === RGB.B) {
                continue;
            }

            if((toDegree(hsv.H) >= 220 && toDegree(hsv.H) <= 240)) {
                hsv.S = saturation / 10;
                
                const nRGB = hsv2rgb(hsv);

                data[i] = nRGB.R;
                data[i+1] = nRGB.G;
                data[i+2] = nRGB.B;
            }
        }   
        
        canvasCtxRef.current.putImageData(nImageData,0,0);
    },[saturation])
 
    const handleReset = () => {
        setDefaultDataImage(defaultDataImage);
        setSaturation(10);
    }

    const handleDownload = () => {
        const url = canvasRef.current.toDataURL("image/png");
        const link = document.createElement('a');
        link.download = 'filename.png';
        link.href = url;
        link.click();
    }

    const handleInputChange = (event) => {
        const reader = new FileReader();
        reader.onloadend = (event) => {
          const src_image = new Image();
    
          src_image.onload = () => {
            
            console.log(canvasRef.current)
            if (canvasRef.current) {
              canvasCtxRef.current.drawImage(src_image, 0, 0, WIDHT, HEIGHT);
              let imageData = canvasRef.current.toDataURL("image/jpg");
              setDefaultDataImage(canvasCtxRef.current.getImageData(0,0,width,height));
              setLoaded(true);
              setImageSrc(imageData);
            }
          };
          src_image.src = event.target.result;
        };
        reader.readAsDataURL(event.target.files[0]);
    };

    const dis = loaded ? "visible" : "hidden"

    return(
        <div className="color-page">
            <div className="wrapper border border-dark rounded">
                {!loaded && <div className="image-upload"><label htmlFor="file-input"><img src={Upload}></img></label><input id="file-input" type="file" onChange={handleInputChange}/></div>}
                <canvas ref={canvasRef} width={width} height={height} onClick={handleClick} style={{visibility : dis}}>
                </canvas>
                {loaded && <button className="download-image btn" onClick={handleDownload}><img src={Download}></img></button>}
            </div>
        {/* <button onClick={handleReset}>Reset</button> */}
      <FooterPanel>
        <React.Fragment>
            <div className="color-schema">
                <h5>CMYK</h5>
                <div className="cmyk">
                    {CMYK && Object.keys(CMYK).map((key) => {
                        return <p>{key} : {CMYK[key].toFixed(2)} </p>
                    })}
                </div>
            </div>
            <div className="color-schema">
                <h5>RGB</h5>
                <div className="rgb">
                    {RGB && Object.keys(RGB).map((key) => {
                        return <p>{key} : {RGB[key]}</p>
                    })}
                </div>
            </div>
            <div className="range">
                <h5>Blue saturation</h5>
                <input type="range" min={0} max={10} value={saturation} step={1} onChange={handleSaturationChange}/>
            </div>
            <div className="color-schema">
                <h5>HSV</h5>
                <div className="hsv">
                    {HSV && Object.keys(HSV).map((key) => {
                        return <p>{key} : {HSV[key].toFixed(2)}</p>
                    })}
                </div>
            </div>
        </React.Fragment>
      </FooterPanel>
    </div>
    )
}

export default ColorPage;