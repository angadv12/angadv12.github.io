import Hero from "./components/Hero";
import HeroBackground from "./components/HeroBackground";
import About from "./components/About";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Footer from "./components/Footer";
import CursorGlow from "./components/CursorGlow";

export default function App() {
  return (
    <>
      <HeroBackground />
      <div className="container">
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Footer />
      </div>
      <CursorGlow />
    </>
  );
}
