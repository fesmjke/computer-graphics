import "./styles.css";

const FooterPanel = (props) => {
    return (
        <div className="footer-panel">
            {props.children}
        </div>
    )
}

export default FooterPanel;