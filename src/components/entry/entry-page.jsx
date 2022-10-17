import "./styles.css";
import FractalImage from "../../static/images/fractal.jpg";
import Models from "../../static/images/models.png";
import Af from "../../static/images/af-t.png";

const EntryPage = () => {
    return (
        <div className="main">
            <div className="card">
                <div className="image-frame">
                    <img src={FractalImage}></img>
                </div>
                <div className="info-text">
                    <p>
                        Фракта́л (від лат. fractus — подрібнений, дробовий) — у побутовому розумінні часто означають як деяку нерегулярну, самоподібну структуру.
                    </p>
                </div>
                <button>Детальніше</button>
            </div>
            <div className="card">
                <div className="image-frame">
                    <img src={Models}></img>
                </div>
                <div className="info-text">
                    <p>
                        Колірна модель — абстрактна модель опису представлення кольорів у вигляді кортежів чисел, зазвичай з трьох або чотирьох значень.
                    </p>
                </div>
                <button>Детальніше</button>
            </div>
            <div className="card">
                <div className="image-frame">
                    <img src={Af}></img>
                </div>
                <div className="info-text">
                    <p>
                        Афінне перетворення — відображення площини або простору в собі.
                    </p>
                </div>
                <button>Детальніше</button>
            </div>
        </div>
    )
}

export default EntryPage;