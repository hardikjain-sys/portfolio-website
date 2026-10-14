import { motion, useScroll, useTransform } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope, FaArrowDown } from 'react-icons/fa';

export const Hero = () => {
  const { scrollYProgress } = useScroll();

  // Fade out and scale down the hero slightly as we scroll down the first viewport
  const opacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.15], [1, 0.95]);
  const y = useTransform(scrollYProgress, [0, 0.15], [0, 50]);
  const footerPointerEvents = useTransform(scrollYProgress, (v) => (v > 0.12 ? 'none' : 'auto'));

  return (
    <motion.section
      style={{ opacity, scale, y }}
      className="hero-section"
    >
      <div className="hero-content">
        <div className="title-wrapper">
          <h1 className="hero-title">
            HARDIK
          </h1>
          <p className="hero-subtitle">BITS Goa</p>
        </div>
      </div>
      
      <motion.div 
        style={{ pointerEvents: footerPointerEvents }} 
        className="hero-footer"
      >
        <div className="social-links">
          <a href="https://github.com/hardikjain-sys" target="_blank" rel="noopener noreferrer" className="social-link cursor-hover" aria-label="GitHub">
            <FaGithub size={28} />
          </a>
          <a href="https://www.linkedin.com/in/hardik-jain-743588267/" target="_blank" rel="noopener noreferrer" className="social-link cursor-hover" aria-label="LinkedIn">
            <FaLinkedin size={28} />
          </a>
          <a href="mailto:f20250646@goa.bits-pilani.ac.in" className="social-link cursor-hover" aria-label="Email">
            <FaEnvelope size={28} />
          </a>
        </div>

        <motion.div 
          className="scroll-indicator cursor-hover"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          onClick={() => {
            window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
          }}
          aria-label="Scroll to content"
        >
          <FaArrowDown size={36} />
        </motion.div>
      </motion.div>

      <style>{`
        .hero-section {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100vh;
          height: 100dvh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          pointer-events: none;
          z-index: 10;
        }

        .hero-content {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .title-wrapper {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
        }

        .hero-title {
          font-family: var(--font-body);
          font-size: clamp(4rem, 15vw, 15rem);
          font-weight: 700;
          letter-spacing: -0.05em;
          line-height: 1;
          position: relative;
          color: var(--color-black);
          margin: 0;
        }

        .hero-subtitle {
          font-family: var(--font-body);
          font-size: clamp(1rem, 2vw, 1.5rem);
          font-weight: 400;
          letter-spacing: 0.1em;
          color: var(--color-black);
          margin: 0;
          opacity: 0.7;
        }

        .hero-footer {
          padding-bottom: clamp(1.5rem, 5vh, 3.5rem);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: clamp(1.2rem, 3.5vh, 2.8rem);
        }

        .social-links {
          display: flex;
          gap: clamp(1.5rem, 5vw, 2.5rem);
          align-items: center;
        }

        .social-link {
          color: var(--color-black);
          transition: transform 0.2s ease, opacity 0.2s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .social-link:hover {
          transform: scale(1.15);
          opacity: 0.7;
        }

        .scroll-indicator {
          color: var(--color-black);
          opacity: 0.55;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: opacity 0.2s ease;
        }

        .scroll-indicator:hover {
          opacity: 1;
        }
      `}</style>
    </motion.section>
  );
};
