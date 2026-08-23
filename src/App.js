import React from 'react';
import { Routes, Route } from 'react-router-dom';

import './App.css';

import Canal from './view/Canalpropio';
import Page from './view/Page';
import Internet from './view/Internet';
import EnVivo from './view/Senalenvivo';
import Television from './view/Television';
import Normativa from './view/Normativa';
import Lineatiempo from './view/Lineatiempo'
import TerminosCondicionesPQRSF from './view/TerminosCondicionesPQRSF';
import PoliticaTratamientoDatos from './view/PoliticaTratamientoDatos';

import FooterSection from './components/FooterSection';
import NavBarSection from './components/NavBarSection';
import FloatingSocialNetworks from './components/FloatingSocialNetworks';

import PagoEnLinea from './components/PagoEnLinea';
import FloatingButtons from './components/FloatingButtons';

import InstallPWA from './components/InstallPWA';

function App() {
  return (
    <div className="App">
      <NavBarSection />

      <FloatingSocialNetworks />

      <main>
        <Routes>
          <Route path="/" element={<Page />} />
          <Route path="/internet" element={<Internet />} />
          <Route path="/television" element={<Television />} />
          <Route path="/canal" element={<Canal />} />
          <Route path="/envivo" element={<EnVivo />} />
          <Route path="/normativa" element={<Normativa />} />
          <Route path="/terminos-y-condiciones" element={<TerminosCondicionesPQRSF />} />
          <Route path="/politica-tratamiento-datos" element={<PoliticaTratamientoDatos />} />
          <Route path="/pagos" element={<PagoEnLinea />} />
          <Route path="/historia" element={<Lineatiempo />} />
          <Route path="*" element={<Page />} />
        </Routes>
      </main>


      <FloatingButtons />

      <FooterSection />
      <InstallPWA />
    </div>
  );
}

export default App;