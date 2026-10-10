import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import WhatsAppButton from './components/WhatsAppButton'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function App() {
  return (
    <>
      <ScrollToTop />
      <Navbar></Navbar>
      <main>
        <Outlet></Outlet>
      </main>
      <Footer></Footer>
      <WhatsAppButton></WhatsAppButton>
      <ToastContainer></ToastContainer>
    </>
  );
}

export default App;
