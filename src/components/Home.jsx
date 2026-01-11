import './Home.css';

const Home = () => {
  return (
    <section id="home" className="home">
      <div className="home-overlay"></div>
      <div className="home-content">
        <div className="home-text">
          <h1 className="home-title">Grace Conti</h1>
          <p className="home-subtitle">Creative Artist & Visual Storyteller</p>
          <p className="home-description">
            Shaping engaging visual narratives through editing and storytelling.
            Bringing ideas to life through rhythm, emotion and visual sensibility.
          </p>
          <button className="home-cta" onClick={() => {
            document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' });
          }}>
            View My Work
          </button>
        </div>
      </div>
    </section>
  );
};

export default Home;
