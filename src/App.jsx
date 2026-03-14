import Topbar from './components/Topbar';
import Header from './components/Header';
import Hero from './components/Hero';
import Highlights from './components/Highlights';
import Itinerary from './components/Itinerary';
import Pricing from './components/Pricing';
import Reviews from './components/Reviews';
import CTA from './components/CTA';
import Contact from './components/Contact';
import Footer from './components/Footer';
import './styles/globals.css';

function App() {
  return (
    <>
      <Topbar />
      <Header />
      <main>
        <Hero />
        <Highlights />
        <Itinerary />
        <Pricing />
        <Reviews />
        <CTA />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

export default App;
