import './About.css';
import profileImage from '/profile.jpg';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const About = () => {
  const [sectionRef, isVisible] = useScrollAnimation(0.2);

  return (
    <section id="about" className="about" ref={sectionRef}>
      <div className="about-container">
        <div className={`about-header scroll-animate ${isVisible ? 'visible' : ''}`}>
          <h2 className="section-title">About Me</h2>
          <div className="title-underline"></div>
        </div>
        
        <div className="about-content">
          <div className={`about-image scroll-animate-left ${isVisible ? 'visible' : ''}`}>
            <img src={profileImage} alt="Grace Conti" />
          </div>
          
          <div className={`about-text scroll-animate-right ${isVisible ? 'visible' : ''}`}>
            <h3>Creative Vision Meets Technical Excellence</h3>
            <p>
              Hi, I’m Grace Conti, a London-based showrunner and video editor specialising in narrative-driven and digital content. With over five years of experience in production and post-production, I have worked across independent films, documentaries, music videos and digital series.
            </p>
            <p>
              As Editor & Showrunner for a high-engagement YouTube format, I oversaw multi-episode content development, post-production workflow and delivery under tight deadlines, contributing to a series that reached multi-million views across platforms.
            </p>
            <p>
              My work focuses on structure, pacing and emotional clarity — shaping raw material into cohesive, audience-focused storytelling. I collaborate closely with directors, creatives and production teams to ensure each project maintains both narrative intention and technical precision. Outside of work, I draw inspiration from music, art, design and fashion — influences that inform my visual sensitivity and editorial style.
            </p>

            <div className="software-tools">
              <h4>Tools & Software</h4>
              <div className="tools-icons">
                <div className="tool-icon">
                  <img src="/icons/premiere.svg" alt="Adobe Premiere Pro" />
                  <span>Premiere Pro</span>
                </div>
                <div className="tool-icon">
                  <img src="/icons/aftereffects.svg" alt="After Effects" />
                  <span>After Effects</span>
                </div>
                <div className="tool-icon">
                  <img src="/icons/photoshop.svg" alt="Photoshop" />
                  <span>Photoshop</span>
                </div>
                <div className="tool-icon">
                  <img src="/icons/davinciresolve.svg" alt="DaVinci Resolve" />
                  <span>DaVinci Resolve</span>
                </div>
              </div>
            </div>
            
            <div className="about-skills">
              <div className="skill-item">
                <h4>Photography</h4>
                <p>Capturing authentic moments and stunning compositions</p>
              </div>
              <div className="skill-item">
                <h4>Videography</h4>
                <p>Creating compelling visual narratives</p>
              </div>
              <div className="skill-item">
                <h4>AI Art</h4>
                <p>Pushing boundaries with artificial intelligence</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
