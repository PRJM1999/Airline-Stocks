import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import {CaseStudies} from './pages/CaseStudies';
import CaseStudy from './pages/CaseStudy';
import Var from './pages/Var';
import Options from './pages/Options';

function App() {
  return (
    <Router>
        <Header />
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/casestudy" element={<CaseStudies/>} />
            <Route path="/casestudy/:airline" element={<CaseStudy/>} />
            <Route path="/var" element={<Var/>} />
            <Route path="/options" element={<Options/>} />
          </Routes>
        <Footer />
    </Router>
  )
}

export default App
