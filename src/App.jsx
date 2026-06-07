import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Home from "./pages/Home";
import Gallery from "./pages/Gallery";
import ProductDetails from "./pages/ProductDetails";
import RequestQuote from "./pages/RequestQuote";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Industries from "./pages/Industries";
import QuoteCartDrawer from "./components/products/QuoteCartDrawer";
import { AppStateProvider } from "./context/AppStateContext";

function App() {
  return (
    <AppStateProvider>
      <Router>
        <div className="min-h-screen w-full flex flex-col bg-slate-50 text-slate-900 selection:bg-slate-900 selection:text-white antialiased">
          <Navbar />

          <main className="flex-grow w-full flex flex-col">
            <Routes>
              {/* Routes remain exactly unchanged */}
              <Route path="/" element={<Home />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/product/:id" element={<ProductDetails />} />
              <Route path="/request-quote" element={<RequestQuote />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/industries" element={<Industries />} />
            </Routes>
          </main>

          <Footer />
          <QuoteCartDrawer />
        </div>
      </Router>
    </AppStateProvider>
  );
}

export default App;
