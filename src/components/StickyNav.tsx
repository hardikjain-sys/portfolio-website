import { motion, useScroll, useTransform } from 'framer-motion';

export const StickyNav = () => {
  const { scrollYProgress } = useScroll();

  // The nav should fade in as we leave the hero section
  const opacity = useTransform(scrollYProgress, [0.1, 0.2], [0, 1]);
  const y = useTransform(scrollYProgress, [0.1, 0.2], [-20, 0]);

  return (
    <motion.nav 
      style={{ opacity, y }}
      className="sticky-nav"
    >
      <ul className="nav-list">
        <li><a href="#about" className="nav-link">[ABOUT]</a></li>
        <li><a href="#work" className="nav-link">[WORK]</a></li>
        <li><a href="#links" className="nav-link">[LINKS]</a></li>
      </ul>

      <style>{`
        .sticky-nav {
          position: sticky;
          top: 0;
          width: 100%;
          padding: 2rem 0;
          z-index: 50;
          display: flex;
          justify-content: center;
          /* Mix blend mode to ensure it's visible or you can just use solid color */
          mix-blend-mode: difference;
          color: var(--color-offwhite);
        }

        .nav-list {
          display: flex;
          gap: 3rem;
          list-style: none;
        }

        .nav-link {
          font-family: var(--font-hand);
          font-size: 1.5rem;
          text-decoration: none;
          color: inherit;
          transition: opacity 0.3s ease;
        }

        .nav-link:hover {
          opacity: 0.6;
        }
      `}</style>
    </motion.nav>
  );
};
