import {Link} from "react-router-dom";
import "./styles.css";

const HeaderPanel = () => {
    return (
        <div className="panel">
            <div className="panel-root">
                <button className="cbutton"><Link to={``}  style={{ textDecoration: 'none' }}>Головна</Link></button>
            </div>
            <div className="panel-side">
                <button className="cbutton"><Link to={`fractals`}  style={{ textDecoration: 'none' }}>Фрактали</Link></button>
                <button className="cbutton"><Link to={`colors`}  style={{ textDecoration: 'none' }}>Моделі</Link></button>
                <button className="cbutton"><Link to={`transformation`}  style={{ textDecoration: 'none' }}>Перетворення</Link></button>
            </div>
        </div>
    )
}

export default HeaderPanel;