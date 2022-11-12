import React from "react";
import About from "../about";

import RandomFractal from "../../../static/images/random-fractal.png";
import Koch from "../../../static/images/koch.png";
import AlgebraicFractal from "../../../static/images/algebraic-random-fractal.png";
import StochasticFractal from "../../../static/images/stochastic-random-fractal.png";


import "./styles.css";

const AboutFractals = () => {
    return (
        <About>
            <React.Fragment>
                <div className="about-header">
                    <h3>Фрактали</h3>
                </div>
                <hr/>
                <p>
                    Слово фрактал утворено від латинського fractus і в перекладі означає той, що складається з фрагментів (подрібнений).
                </p>
                <p>
                    Термін “фрактал”запропоноване Бенуа Мандельбротом в 1975 році для позначення самоподібних структур. Народження фрактальної геометрії прийнято пов'язувати з виходом в 1977 році книги Мандельброта 'The Fractal Geometry of Nature'.
                </p>
                <p>
                    Фракталом називається структура, що складається з частин, які в якомусь сенсі подібні до цілого.
                </p>
                <p>
                    Однією з основних властивостей фракталів є самоподібність. У найпростішому випадку невелика частина фрактала містить інформацію про весь фрактал. Серед важливих властивостей фракталів з точки зору програмної реалізації ітераційність та рекурсивність фрактальних структур.
                </p>
                <p>
                    В основі цього явища лежить дуже проста ідея : нескінчену по красі і різноманітності множину фігур можна отримати з відносно простих конструкцій за допомогою всього двох операцій - копіювання і масштабування.
                </p>
                <hr/>
                <div className="fractal-image">
                    <img alt="fractal-image" src={RandomFractal}></img>
                </div>
                <hr />
                <p>
                    Фрактали знаходять все більше й більше практичних застосувань у науці. Основна причина цього полягає в тому, що вони описують реальний світ іноді навіть краще, ніж традиційна фізика чи математика. Більшість просторових систем у природі є нерегулярним і фрагментарним, форма цих систем погано піддається опису апаратом евклідової геометрії.                
                </p>
                <p>
                Фрактальна графіка, як і векторна, заснована на математичних обчисленнях. Однак, базовим елементом є математична формула, ніяких об'єктів у пам'яті комп'ютера не зберігається і зображення будується виключно за формулами,рівняннями.
                </p>
                <hr />

                <div className="fractal-image">
                    <img alt="fractal-image" src={Koch}></img>
                </div>

                <p>Геометричні</p>

                <hr />  

                <div className="fractal-image">
                    <img alt="fractal-image" src={AlgebraicFractal}></img>
                </div>

                <p>Алгебраїчні</p>

                <hr />

                <div className="fractal-image">
                    <img alt="fractal-image" src={StochasticFractal}></img>
                </div>

                <p>Стохастичні</p>

                <hr />

                <div className="extender">
                    ll
                </div>
            </React.Fragment>
        </About>
    )
}

export default AboutFractals;