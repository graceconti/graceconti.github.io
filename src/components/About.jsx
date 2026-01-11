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
              Hi there! I'm Grace Conti, a London-based showrunner and video editor with a passion for storytelling and visual artistry. With over 4 years of experience, I have contributed to the production and post-production of a diverse range of independent films, documentaries, music videos, and behind-the-scenes film content.
            </p>
            <p>
              My journey has allowed me to work closely with filmmakers, artists, and production teams, bringing creative visions to life while aiming for high-quality standards. My work is characterized by meticulous attention to detail, a creative and problem-solving mindset, and strong communication and collaboration skills.
            </p>
            <p>
              Outside of work, I'm inspired by music, art, design and fashion — everything that feeds imagination and creative vision.
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
