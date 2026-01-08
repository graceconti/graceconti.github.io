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
              Hello! I'm Grace Conti, a passionate visual artist specializing in photography, 
              videography, and AI-generated art. My work explores the intersection of traditional 
              artistic techniques and emerging technologies.
            </p>
            <p>
              With years of experience in visual storytelling, I've developed a unique style 
              that combines emotional depth with technical precision. Whether capturing moments 
              through the lens or creating entirely new worlds with AI, my goal is to evoke 
              emotion and spark imagination.
            </p>
            
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
