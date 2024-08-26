import './App.css';
import CarouselFadeExample from './component/caurosel';
import ContactSection from './component/ContactSection';
import NavbarComponent from './component/navebar';


function App() {
  return (
    <div>
      <h1 className='text-customgreen'>hello </h1>
      <ContactSection />
      <NavbarComponent />
      <CarouselFadeExample />
    </div>
  );
}


export default App;
