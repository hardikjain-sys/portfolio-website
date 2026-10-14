import { motion, useScroll, useTransform } from 'framer-motion';
import { CustomCursor } from './components/CustomCursor';
import { Hero } from './components/Hero';
import { WhiteSection } from './components/WhiteSection';

function App() {
  const { scrollYProgress } = useScroll();

  // Transition body background from red to off-white
  // Ensure it stays offwhite for the rest of the scroll
  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 0.15, 1],
    ['var(--color-red)', 'var(--color-offwhite)', 'var(--color-offwhite)']
  );

  return (
    <motion.div 
      style={{ backgroundColor, minHeight: '100vh' }}
      className="app-container"
    >
      <CustomCursor />
      <Hero />
      
      {/* Spacer to push content down so we can scroll past the fixed hero */}
      <div style={{ height: '100dvh' }} className="hero-spacer" />

      <WhiteSection />
    </motion.div>
  );
}

export default App;
