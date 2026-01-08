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
            Exploring the boundaries between imagination and reality through 
            photography, video, and artificial intelligence. Each piece tells 
            a unique story, blending traditional artistry with cutting-edge technology.
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
