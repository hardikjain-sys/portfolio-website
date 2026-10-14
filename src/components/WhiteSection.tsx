import { motion } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';

const typographyProjects = [
  { 
    id: 'qwen3', 
    title: "Qwen3 in PyTorch", 
    fullTitle: "QWEN3 Implementation in PyTorch",
    indent: 0,
    hasLiveLink: false,
    githubUrl: "https://github.com/hardikjain-sys/Qwen3-implementation-in-PyTorch", // <-- Put your GitHub repo link here
    liveUrl: "",
    bullets: [
      "Implemented the QWEN3 Architecture in PyTorch from scratch.",
      "Trained on a part of TinyStories Dataset and model reached a perplexity of around 17 in just 4 epochs after which it started overfitting because the model is quite large (Trainable parameters: 78,214,656) for the amount of tokens it trained on (826,469)."
    ]
  },
  { 
    id: 'attention', 
    title: "Attention & Sparsity", 
    fullTitle: "Attention and Sparsity in Transformers",
    indent: 1,
    hasLiveLink: false,
    githubUrl: "https://github.com/hardikjain-sys/attention-and-sparsity", // <-- Put your GitHub repo link here
    liveUrl: "",
    bullets: [
      "Implemented Self Attention, Sliding Window Attention, Linear Attention, and Multi Query Attention from scratch.",
      "Compared memory consumption, throughput, and perplexity across different attention mechanisms.",
      "Implemented LoRA, AdaLoRA and SoRA on datasets and also same on xLSTMs to measure performance.",
      "Implemented RoPE, ALiBi, and Sinusoidal positional encodings.",
      "Created a plug and play system of different attention mechanisms, positional embeddings and Convolutional Layers and reported metrics in a research paper style."
    ]
  },
  { 
    id: 'repo-reviewer', 
    title: "GitHub Repo Reviewer", 
    fullTitle: "AI GitHub Repository Reviewer",
    indent: 2,
    hasLiveLink: true,
    githubUrl: "https://github.com/hardikjain-sys/github-repo-reviewer", // <-- Put your GitHub repo link here
    liveUrl: "https://github-repo-reviewer.vercel.app/", // <-- Put your Live Link here
    bullets: [
      "Developed an AI GitHub repository reviewer using RAG that analyzes large repositories and helps users to find issues.",
      "Generates project summaries, reviews code quality, detects potential issues, and suggests improvements.",
      "Built using Python, FastAPI, GitHub API, LangGraph, LangChain and frontend in React+Next.js.",
      "Supports repositories with large files and long codes while using less tokens."
    ]
  },
  { 
    id: 'payflow', 
    title: "AutoPay Blockchain", 
    fullTitle: "Payflow Blockchain AutoPay",
    indent: 1,
    hasLiveLink: true,
    githubUrl: "https://github.com/hardikjain-sys/PayFlow", // <-- Put your GitHub repo link here
    liveUrl: "https://payflowhackathon.netlify.app/", // <-- Put your Live Link here
    bullets: [
       "Built a decentralized recurring payment platform using Solidity smart contracts.",
       "Integrated Chainlink Automation and USDC on Sepolia.",
       "Developed the frontend using React.",
       "Created Merchant and user Dashboards and public listing of Subscriptions."
    ]
  },
  { 
    id: 'cnn', 
    title: "CNN Distillation", 
    fullTitle: "Distillation for Efficient CNNs on CIFAR10 Dataset",
    indent: 3,
    hasLiveLink: false,
    githubUrl: "https://github.com/hardikjain-sys/Knowledge-Distillation-for-Efficient-Image-Classification-on-CIFAR10", // <-- Put your GitHub repo link here
    liveUrl: "",
    bullets: [
      "Trained on 50,000 images from CIFAR10 dataset.",
      "Teacher model has 79.56% accuracy with 1,422,666 params taking 5.43 MB.",
      "Baseline Student model has 24,346 params taking 95.10 KB, Accuracy = 66.54%.",
      "Distilled Model has 24,346 params taking 95.10 KB, Accuracy 71.64%.",
      "Gained 5.1% accuracy while having a compression of 58.4×."
    ]
  },
];

const RepulsiveWord = ({ word, mouseX, mouseY }: { word: string, mouseX: number, mouseY: number }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [shadow, setShadow] = useState('none');

  useEffect(() => {
    if (!ref.current || mouseX === 0 || mouseY === 0) {
      setX(0);
      setY(0);
      setShadow('none');
      return;
    }
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const dx = mouseX - centerX;
    const dy = mouseY - centerY;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    const maxDist = 150; // Radius of repulsion
    if (distance < maxDist && distance > 0) {
      const force = (maxDist - distance) / maxDist;
      // Repel away from cursor
      setX(-dx * force * 0.3);
      setY(-dy * force * 0.3);
      // Add red glow based on force
      setShadow(`0px 0px ${10 + force * 15}px rgba(242, 29, 10, ${force * 0.5})`);
    } else {
      setX(0);
      setY(0);
      setShadow('none');
    }
  }, [mouseX, mouseY]);

  return (
    <span 
      ref={ref} 
      style={{ 
        display: 'inline-block', 
        transform: `translate(${x}px, ${y}px)`, 
        textShadow: shadow,
        transition: 'transform 0.1s ease-out, text-shadow 0.1s ease-out', 
        marginRight: '0.25em' 
      }}
    >
      {word}
    </span>
  );
};

const RepulsiveText = ({ text, className = "" }: { text: string, className?: string }) => {
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);
  const [relX, setRelX] = useState(0);
  const [relY, setRelY] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div 
      ref={ref}
      className={className}
      style={{ position: 'relative' }}
      onMouseMove={(e) => {
        setMouseX(e.clientX);
        setMouseY(e.clientY);
        if (ref.current) {
          const rect = ref.current.getBoundingClientRect();
          setRelX(e.clientX - rect.left);
          setRelY(e.clientY - rect.top);
        }
      }}
      onMouseLeave={() => {
        setMouseX(0);
        setMouseY(0);
      }}
    >
      {/* Unbounded glow orb that tracks cursor without clipping */}
      {mouseX !== 0 && (
        <div 
          style={{
            position: 'absolute',
            top: relY,
            left: relX,
            width: 400,
            height: 400,
            transform: 'translate(-50%, -50%)',
            background: 'radial-gradient(circle, rgba(242, 29, 10, 0.08) 0%, transparent 70%)',
            pointerEvents: 'none',
            zIndex: -1,
          }}
        />
      )}
      {text.split(' ').map((word, i) => (
        <RepulsiveWord key={i} word={word} mouseX={mouseX} mouseY={mouseY} />
      ))}
    </div>
  );
};

export const WhiteSection = () => {
  return (
    <motion.section className="white-section">
      <div className="content-container">
        
        {/* Research Experience Section */}
        <div id="research" className="research-section">
          <div className="layout-grid">
            <div className="left-column">
              <h2 className="section-title">Research</h2>
            </div>

            <div className="right-column">
              <div className="research-card">
                <div className="research-header">
                  <RepulsiveText 
                    text="Research Assistant — Long Form AI Video Generation" 
                    className="research-role-title" 
                  />
                  <span className="research-location">BITS Pilani, Hyderabad Campus</span>
                </div>

                <div className="research-divider" />

                <div className="research-bullets">
                  <div className="research-bullet-item">
                    <span className="bullet-indicator">—</span>
                    <RepulsiveText 
                      className="detail-description"
                      text="Worked with Professor Abhijit Das on generating long form videos through diffusion models." 
                    />
                  </div>
                  <div className="research-bullet-item">
                    <span className="bullet-indicator">—</span>
                    <RepulsiveText 
                      className="detail-description"
                      text="Generated custom video datasets worth around 800GB of videos with avg. length of 3.4min with timed captions from the video's context frame by frame." 
                    />
                  </div>
                  <div className="research-bullet-item">
                    <span className="bullet-indicator">—</span>
                    <RepulsiveText 
                      className="detail-description"
                      text="Modeled an architecture to generate captions with just a single prompt where the model generated timed captions from the user's single caption." 
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="layout-grid">
          <div className="left-column">
            <h2 className="section-title">My Projects</h2>
          </div>
          
          <div className="right-column relative-container">
            {/* Curved line weaving through the items */}
            <svg className="curved-line" viewBox="0 0 100 100" preserveAspectRatio="none">
              <path 
                d="M 0 5 C 30 20, 80 15, 50 35 C 20 55, 60 70, 70 85 C 80 100, 40 95, 30 100" 
                fill="none" 
                stroke="black" 
                strokeWidth="0.5" 
                strokeLinecap="round" 
              />
            </svg>

            {typographyProjects.map((project, i) => (
              <motion.a 
                href={`#${project.id}`} 
                key={project.id}
                className="typo-project-link cursor-hover"
                style={{ '--indent': project.indent, position: 'relative', zIndex: 2 } as React.CSSProperties}
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, margin: "-20%" }}
                transition={{ duration: 0.8, delay: i * 0.1 }}
              >
                <h3 className="typo-project-text">
                  {project.title}
                </h3>
              </motion.a>
            ))}
          </div>
        </div>

        {/* Individual Project Details Sections */}
        <div className="project-details-container">
          {typographyProjects.map((project) => (
            <div id={project.id} key={project.id} className="project-detail-section">
              <div className="project-detail-header">
                <RepulsiveText text={project.fullTitle} className="detail-title" />
              </div>
              <div className="project-detail-content">
                <div className="project-bullets">
                  {project.bullets.map((bullet, idx) => (
                    <div key={idx} className="project-bullet-item">
                      <span className="bullet-indicator">—</span>
                      <RepulsiveText className="detail-description" text={bullet} />
                    </div>
                  ))}
                </div>
                
                <div className="detail-links">
                  {project.githubUrl && (
                    <a 
                      href={project.githubUrl} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="detail-button cursor-hover"
                    >
                      GITHUB
                    </a>
                  )}
                  {project.hasLiveLink && project.liveUrl && (
                    <a 
                      href={project.liveUrl} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="detail-button cursor-hover"
                    >
                      LIVE LINK
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* About Me Section */}
        <div id="about" className="about-section">
          <div className="about-header">
            <h2 className="section-title">About Me</h2>
          </div>
          <div className="about-content">
            <div className="about-image-wrapper">
              <img src="/profile.png" alt="Hardik" className="about-image cursor-hover" />
            </div>
            <div className="about-text">
              <RepulsiveText 
                className="about-paragraph" 
                text="I am a 2nd year CS student in BITS Pilani, Goa Campus. I am a passionate developer focused on the intersection of deep learning, software development, and system design. I build functional and usefull things and also like researching and exploring new technologies." 
              />
              <RepulsiveText 
                className="about-paragraph" 
                text="Currently exploring generative AI models and Reinforcement Learning. Always looking for the next challenging problem to solve." 
              />
            </div>
          </div>
        </div>

      </div>

      <style>{`
        .white-section {
          position: relative;
          min-height: 100vh;
          width: 100%;
          z-index: 20;
          pointer-events: auto;
          display: flex;
          flex-direction: column;
          background-color: var(--color-offwhite);
          overflow: hidden; 
        }

        .content-container {
          padding: clamp(3.5rem, 8vh, 12vh) clamp(1.25rem, 5vw, 4rem);
          max-width: 1800px;
          margin: 0 auto;
          width: 100%;
        }

        .layout-grid {
          display: flex;
          flex-direction: column;
          gap: 2.5rem;
        }

        .left-column {
          position: static;
        }

        .right-column {
          display: flex;
          flex-direction: column;
          gap: clamp(3rem, 7vh, 8rem);
          padding-top: 1rem;
          padding-bottom: 2rem;
        }

        @media (min-width: 1024px) {
          .layout-grid {
            flex-direction: row;
            gap: 5vw;
          }
          
          .left-column {
            flex: 0 0 280px;
            position: sticky;
            top: 15vh;
            align-self: flex-start;
          }
          
          .right-column {
            flex: 1;
            display: flex;
            flex-direction: column;
            gap: 15vh;
            padding-top: 5vh;
            padding-bottom: 18vh;
          }
        }

        .relative-container {
          position: relative;
        }

        .curved-line {
          position: absolute;
          top: 5%;
          left: 5%;
          width: 90%;
          height: 90%;
          z-index: 1;
          pointer-events: none;
          opacity: 0.25;
        }

        @media (max-width: 768px) {
          .curved-line {
            opacity: 0.12;
            width: 98%;
            left: 1%;
          }
        }

        .section-title {
          font-family: var(--font-body);
          font-size: clamp(2.2rem, 5vw, 4rem);
          font-weight: 500;
          letter-spacing: -0.04em;
          color: var(--color-black);
          line-height: 1.1;
        }

        .typo-project-link {
          text-decoration: none;
          color: var(--color-black);
          display: block;
          transition: transform 0.3s ease, color 0.3s ease;
          margin-left: 0;
        }

        @media (min-width: 1024px) {
          .typo-project-link {
            margin-left: calc(var(--indent, 0) * 7vw);
          }
        }

        @media (min-width: 640px) and (max-width: 1023px) {
          .typo-project-link {
            margin-left: calc(var(--indent, 0) * 3vw);
          }
        }
        
        .typo-project-link:hover {
          transform: scale(1.02);
          color: var(--color-red);
        }

        .typo-project-text {
          font-family: var(--font-body);
          font-size: clamp(2rem, 6.5vw, 7.5rem);
          font-weight: 700;
          line-height: 0.98;
          letter-spacing: -0.05em;
          margin: 0;
          word-break: break-word;
          overflow-wrap: break-word;
        }

        /* Research Section Styles */
        .research-section {
          margin-bottom: clamp(3.5rem, 10vh, 18vh);
          padding-bottom: clamp(2.5rem, 7vh, 12vh);
          border-bottom: 1px solid rgba(0, 0, 0, 0.1);
        }

        .research-card {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .research-header {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        @media (min-width: 640px) {
          .research-header {
            flex-direction: row;
            justify-content: space-between;
            align-items: baseline;
            gap: 1.5rem;
          }
        }

        .research-role-title {
          font-family: var(--font-body);
          font-size: clamp(1.4rem, 3vw, 2.4rem);
          font-weight: 700;
          letter-spacing: -0.03em;
          line-height: 1.25;
          color: var(--color-black);
          word-break: break-word;
        }

        .research-location {
          font-family: var(--font-body);
          font-size: clamp(0.85rem, 1.2vw, 1.1rem);
          font-weight: 500;
          letter-spacing: 0.05em;
          color: rgba(15, 15, 15, 0.65);
        }

        .research-divider {
          height: 1px;
          width: 100%;
          background-color: rgba(0, 0, 0, 0.12);
          margin: 0.25rem 0 1rem 0;
        }

        .research-bullets,
        .project-bullets {
          display: flex;
          flex-direction: column;
          gap: clamp(1.2rem, 2.5vh, 1.8rem);
        }

        .research-bullet-item,
        .project-bullet-item {
          display: flex;
          gap: clamp(0.75rem, 2vw, 1.25rem);
          align-items: flex-start;
        }

        .bullet-indicator {
          font-family: var(--font-body);
          font-size: clamp(1.1rem, 2vw, 1.4rem);
          font-weight: 700;
          color: var(--color-red);
          line-height: 1.5;
          flex-shrink: 0;
          user-select: none;
        }

        /* Project Details Styles */
        .project-details-container {
          position: relative;
          margin-top: clamp(3rem, 8vh, 14vh);
          display: flex;
          flex-direction: column;
          gap: clamp(4rem, 12vh, 20vh);
          padding-top: clamp(2rem, 5vh, 8vh);
          padding-bottom: clamp(3.5rem, 10vh, 18vh);
          border-bottom: 1px solid rgba(0,0,0,0.1);
        }

        .project-detail-section {
          position: relative;
          z-index: 2; 
          display: grid;
          grid-template-columns: 1fr;
          gap: clamp(1.5rem, 3vh, 2.5rem);
          scroll-margin-top: clamp(2rem, 8vh, 12vh);
        }

        @media (min-width: 1024px) {
          .project-detail-section {
            grid-template-columns: 1fr 2fr;
            gap: 8vw;
          }
        }

        .detail-title {
          font-family: var(--font-body);
          font-size: clamp(1.6rem, 3.5vw, 3rem);
          font-weight: 700;
          letter-spacing: -0.03em;
          margin: 0;
          word-break: break-word;
        }

        .project-detail-content {
          display: flex;
          flex-direction: column;
          gap: clamp(1.5rem, 3vh, 2.5rem);
        }

        .detail-description {
          font-family: var(--font-body);
          font-size: clamp(0.98rem, 1.5vw, 1.35rem);
          line-height: 1.6;
          letter-spacing: -0.01em;
          color: var(--color-black);
          max-width: 900px;
          word-break: break-word;
        }

        .detail-links {
          display: flex;
          gap: clamp(1.2rem, 3vw, 2rem);
          flex-wrap: wrap;
        }

        .detail-button {
          font-family: var(--font-body);
          font-size: clamp(0.95rem, 1.4vw, 1.2rem);
          font-weight: 600;
          letter-spacing: 0.05em;
          color: var(--color-black);
          text-decoration: none;
          transition: color 0.2s ease, transform 0.2s ease;
          background-color: transparent;
          border: none;
          padding: 0.4rem 0;
          position: relative;
          display: inline-block;
        }

        .detail-button::after {
          content: '';
          position: absolute;
          width: 0;
          height: 2px;
          bottom: 0;
          left: 0;
          background-color: var(--color-red);
          transition: width 0.3s ease;
        }

        .detail-button:hover {
          color: var(--color-red);
          transform: translateY(-2px);
        }

        .detail-button:hover::after {
          width: 100%;
        }

        /* About Section Styles */
        .about-section {
          position: relative;
          z-index: 2;
          padding: clamp(3.5rem, 10vh, 18vh) 0;
          display: grid;
          grid-template-columns: 1fr;
          gap: clamp(2rem, 5vw, 4rem);
        }

        @media (min-width: 1024px) {
          .about-section {
            grid-template-columns: 1fr 2fr;
            gap: 8vw;
          }
        }

        .about-content {
          display: flex;
          flex-direction: column;
          gap: clamp(1.8rem, 4vw, 3rem);
        }

        @media (min-width: 768px) {
          .about-content {
            flex-direction: row;
            align-items: flex-start;
          }
        }

        .about-image-wrapper {
          width: clamp(160px, 45vw, 260px);
          aspect-ratio: 1 / 1;
          flex-shrink: 0;
          overflow: hidden;
          background-color: var(--color-black);
          position: relative;
        }

        .about-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center 20%;
          transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
          display: block;
        }

        .about-image-wrapper:hover .about-image {
          transform: scale(1.06);
        }

        .about-text {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          max-width: 720px;
        }

        .about-paragraph {
          font-family: var(--font-body);
          font-size: clamp(1.02rem, 1.6vw, 1.35rem);
          line-height: 1.6;
          letter-spacing: -0.01em;
          color: var(--color-black);
          word-break: break-word;
        }
      `}</style>
    </motion.section>
  );
};
