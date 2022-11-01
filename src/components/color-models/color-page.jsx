import {useEffect, useState, useRef} from "react";
import FooterPanel from "../footer-panel/footer-panel";
import {hsv2rgb, rgb2cmyk, rgb2hsv} from "../../utils/colors";
import "./styles.css";

// СMYK і HSV

const WIDHT = 600;
const HEIGHT = 500;

const ColorPage = () => {
    const canvasRef = useRef(null);
    const canvasCtxRef = useRef(null);
    const [width, setWidth] = useState(WIDHT);
    const [height, setHeight] = useState(HEIGHT);
    const [selectedImage, setSelectedImage] = useState(null);
    const [imageSrc,setImageSrc] = useState(null);
    const [RGB,setRGB] = useState(null);
    const [SMYK,setSMYK] = useState(null);
    const [HSV,setHSV] = useState(null);

    useEffect(() => {
        if (canvasRef.current) {
          canvasCtxRef.current = canvasRef.current.getContext("2d");
        }
    },[selectedImage]);

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

        const SMYK = rgb2cmyk(RGB);
        const HSV = rgb2hsv(RGB);

        console.log(RGB);
        console.log(SMYK);
        console.log(HSV);

        setRGB(RGB);
    }

    const handleSaturationClick = (event) => {
        const data = canvasCtxRef.current.getImageData(0,0,width,height).data;

        console.log(data);

        for(let i = 0; i < data.length; i += 4){
            const RGB = {R : data[i], G: data[i+1], B: data[i+2]};
            const hsv = rgb2hsv(RGB);

            hsv.S = 0.5;

            const nRGB = hsv2rgb(hsv);

            data[i] = nRGB.R;
            data[i+1] = nRGB.G;
            data[i+2] = nRGB.B;
        }   

        const n = new ImageData(data, width, height);

        console.log(n);

        canvasCtxRef.current.putImageData(n,width, height);
    }

    const handleInputChange = (event) => {
        const reader = new FileReader();
        reader.onloadend = (event) => {
          const src_image = new Image();
    
          src_image.onload = () => {
            if (canvasRef.current) {
              canvasCtxRef.current.drawImage(src_image, 0, 0, WIDHT, HEIGHT);
              let imageData = canvasRef.current.toDataURL("image/jpg");
              setImageSrc(imageData);
            }
          };
          src_image.src = event.target.result;
        };
        reader.readAsDataURL(event.target.files[0]);
      };

    return(
        <div className="color-page">
        {(
            <div className="wrapper">
                <canvas ref={canvasRef} width={width} height={height} onClick={handleClick}></canvas>
            </div>
        )}
      <br />
     
      <br /> 
      {selectedImage && <button onClick={()=>setSelectedImage(null)}>Remove</button>}
      <input
        type="file"
        name="myImage"
        onChange={handleInputChange}
      />
      {RGB && <div>
            <span>R: {RGB.R} </span><span>G: {RGB.G} </span><span>B: {RGB.B} </span>
        </div>}

      <button onClick={handleSaturationClick}>

      </button>
      <FooterPanel>

      </FooterPanel>
    </div>
    )
}

export default ColorPage;