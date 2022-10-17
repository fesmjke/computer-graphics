import { Outlet } from "react-router-dom";
import HeaderPanel from "./components/panel/panel";

const App = () => {
  return (
    <div className="App">
      <HeaderPanel></HeaderPanel>
      <Outlet/>
    </div>
  );
}

export default App;
