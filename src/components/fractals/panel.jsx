import React ,{ useState } from 'react';
import { GithubPicker } from 'react-color';
import { FRACTAL_TYPES, LINES_TYPES } from "./types";

const FractalPanel = (props) => {
    const [display, setDisplay] = useState(false);

    const handleClick = () => {
        setDisplay(!display);
    };

    const handleClose = () => {
        setDisplay(false);
    };

    const handleChange = (color) => {
        props.changeColor(color.rgb);
    };


    const fractalTypes = Object.values(FRACTAL_TYPES);
    const lineStyles = Object.values(LINES_TYPES);

    const styles = ({
        'default': {
          color: {
            width: '100px',
            height: '14px',
            borderRadius: '2px',
            background: `rgba(${ props.color.r }, ${ props.color.g }, ${ props.color.b }, ${ props.color.a })`,
          },
          swatch: {
            padding: '2px',
            background: '#fff',
            borderRadius: '1px',
            boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
            display: 'inline-block',
            cursor: 'pointer',
          },
          popover: {
            position: 'absolute',
            padding: '0%',
            zIndex: '2',
          },
          cover: {
            position: 'fixed',
            top: '0px',
            right: '0px',
            bottom: '0px',
            left: '10px',
          },
        },
      });

    return (
        <React.Fragment>
            <div className="sm-container">
              <h5>Координати центру</h5>
              <h6>X: {props.center.x} </h6>
              <h6>Y: {props.center.y} </h6>
            </div>
            
            <div className="sm-container">
              <h5>Тип фракталу</h5>
              <select onChange={e => props.changeType(e.target.value)} className="form-select mb-3">
                  {fractalTypes.map((type) => { return <option value={type} key={type}>{type}</option>})}
              </select>
            </div>

            <div className="sm-container">
              {/* <input type="range" className="form-range" min="0" max="5" id="customRange2"/> */}
              <h5>Ітерація</h5>
              <div>
                <button onClick={props.decIter} className="cbtn btn btn-outline-light">-</button>
                <span style={{"fontSize":"18px"}}> {props.iteration + 1} </span>
                <button onClick={props.incIter} className="cbtn btn btn-outline-light">+</button>
              </div>
            </div>
            
            <div className="sm-container">
              <h5>Розмір лінії</h5>
              <div>
                <button onClick={props.decSize} className="cbtn btn btn-outline-light">-</button>
                <span style={{"fontSize":"18px"}}> {props.size} </span>
                <button onClick={props.incSize} className="cbtn btn btn-outline-light">+</button>
              </div>
            </div>
              
            <div className="sm-container">
              <h5>Налаштування</h5>
              <div className="sm-grid">
                <div>
                <p>Колір</p>
                    <div style={ styles.default.swatch } onClick={ handleClick }>
                        <div style={ styles.default.color } />
                    </div>
                    { display ? <div style={ styles.default.popover }>
                    <div style={ styles.default.cover } onClick={ handleClose }/>
                    <GithubPicker  color={ props.color } onChange={ handleChange } />
                    </div> : null }
                </div>
                
                <div>
                  <p>Тип лінії </p>
                  <select onChange={e => props.selectLine(e.target.value)} className="form-select mb-3">
                      {lineStyles.map((line) => { return <option value={line.pattern} key={line.text}>{line.text}</option>})}
                  </select>
                </div>

                
                {!props.connectionDisabled ? <div> 
                    <p>Заповнення </p> 
                    <input type="checkbox" onClick={() => props.changeConnection(!props.connection)} className="form-check-input"></input>
                </div> : null}
              </div>
            </div>
        </React.Fragment>
    )
}

export default FractalPanel;