import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from './pages/Home';
import Filme from './pages/Filme';
import Favoritos from './pages/Favoritos';
import Header from "./Components/Header";
import Error from './pages/Error';
import Sobre from './pages/Sobre';
import Footer from "./Components/footer";

function RoutesApp() {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/filme/:id" element={<Filme />} />
                <Route path="/favoritos" element={<Favoritos />} />
                <Route path="/sobre" element={<Sobre />} />


                <Route path="*" element={<Error />} />


            </Routes>
            <Footer/>
        </BrowserRouter>
    )

}
export default RoutesApp;