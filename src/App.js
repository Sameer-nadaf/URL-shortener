import { Routes, Route } from "react-router-dom";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Form from "./components/form";
import Redirect from "./components/redirect";

function App() {
  return (
    <div className="App">
      <div className="auth-wraper">
        <div className="auth-inner">

          <Routes>
            <Route path="/" element={<Form/>} />
            <Route path='/:alias' element={<Redirect/>} />
          </Routes>

        </div>
      </div>
    </div>
  );
}

export default App;
