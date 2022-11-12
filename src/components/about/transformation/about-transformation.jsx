import React from "react";
import About from "../about";
import Move from "../../../static/images/affine-move.png";
import Scale from "../../../static/images/affine-scale.jpg";
import Turn from "../../../static/images/affine-turn.jpg";
import "./styles.css";

const AboutTransformation = () => {
    return (
        <About>
            <React.Fragment>
                <div className="about-header">
                    <h3>Афінні перетворення</h3>
                </div>
                <hr/>
                <p>
                    Математичною основою задачі створення рухомих зображень у КГ є афінні перетворення.
                </p>
                <p>
                    Відображення називається афінним, якщо його можна отримати наступним способом:
                </p>
                <p>
                    1. Обрати «новий» базис простору з «новим» початком координат;
                </p>
                <p>
                    2. Координатам x кожної точки простору поставити у відповідність нові координати f (x), які мають те саме положення в просторі відносно «нової» системи координат, яке координати x мали в «старій».
                </p>
                
                <hr/>

                <p>
                    Афінні перетворення трьох видів
                </p>
                <p>
                    - переміщення/зсув;
                </p>
                <p>
                    - масштабування (збільшення/зменшення);
                </p>
                <p>
                    - поворот на кут.
                </p>
                <hr />

                <div className="transformation-image">
                    <img alt="transformation-image" src={Move}></img>
                </div>

                <h5>Переміщенння/зсув</h5>

                <hr />  

                <div className="transformation-image">
                    <img alt="transformation-image" src={Scale}></img>
                </div>

                <h5>Масштабування об'єкта</h5>
            
                <hr />

                <div className="transformation-image">
                    <img alt="transformation-image" src={Turn}></img>
                </div>

                <h5>Поворот об'єкта</h5>
                
                <hr />

                <div className="extender">
                    ll
                </div>
            </React.Fragment>
        </About>
    )
}

export default AboutTransformation;