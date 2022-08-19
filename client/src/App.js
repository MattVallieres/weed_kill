import { Route, BrowserRouter, Routes } from "react-router-dom";
import DeletionPage from "./././Pages/DeletionPage";
import Confirmation from "./././Pages/Confirmation";
import OurServices from "./././Pages/OurServices";
import GetQoute from "./././Pages/GetQoute";
import HomePage from "./././Pages/HomePage";
import GlobalStyles from "./GlobalStyles";
import AboutUs from "././Pages/AboutUs";
import styled from "styled-components";
import Header from "./Header";
import Footer from "./Footer"

const App = (props) => {
  return (
    <>
      <BrowserRouter>
        <GlobalStyles />
        <Header />
        <Div>
          <Routes>
            <Route exact path="/" element={<HomePage />} />
            <Route exact path="/about" element={<AboutUs />} />
            <Route exact path="/services" element={<OurServices />} />
            <Route exact path="/qoute" element={<GetQoute />} />
            <Route exact path="/confirmed" element={<Confirmation />} />
            <Route exact path="/delete" element={<DeletionPage />} />
          </Routes>
        </Div>
        <Footer />
      </BrowserRouter>
    </>
  );
};

const Div = styled.div`
  margin: auto;
  width: 70%;
  height: 135vh;
`;

export default App;
