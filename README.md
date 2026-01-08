# Grace Conti - Portfolio Website

A modern, responsive portfolio website built with React + Vite, featuring a dark theme and smooth scrolling navigation.

## 🌟 Features

- **Single Page Application** with smooth scrolling navigation
- **Dark Theme** with elegant gold accents
- **Responsive Design** optimized for all devices
- **Sections:**
  - Home: Hero section with introduction
  - About Me: Personal story and skills
  - Gallery: Interactive carousel with filters (Video, Photo, AI)
  - Contact: Social media links

## 🚀 Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/YOUR_USERNAME/GraceWebsite.git
cd GraceWebsite
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```

The site will be available at `http://localhost:5173/`

## 📦 Building for Production

```bash
npm run build
```

The build output will be in the `dist` folder.

## 🌐 Deployment to GitHub Pages

### First Time Setup

1. Update `package.json` - Replace `YOUR_GITHUB_USERNAME` with your actual GitHub username in the homepage field

2. Update `vite.config.js` - Make sure the base path matches your repository name

3. Create a GitHub repository named `GraceWebsite`

4. Push your code to GitHub:
```bash
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/GraceWebsite.git
git push -u origin main
```

5. Deploy to GitHub Pages:
```bash
npm run deploy
```

6. Enable GitHub Pages:
   - Go to your repository settings
   - Navigate to Pages
   - Select `gh-pages` branch as the source
   - Save

Your site will be live at `https://YOUR_USERNAME.github.io/GraceWebsite/`

### Updating the Site

After making changes, simply run:
```bash
npm run deploy
```

## 🎨 Customization

### Adding Your Content

1. **Home Section** (`src/components/Home.jsx`):
   - Update the title, subtitle, and description

2. **About Section** (`src/components/About.jsx`):
   - Replace placeholder image with your photo
   - Update your bio and skills

3. **Gallery Section** (`src/components/Gallery.jsx`):
   - Replace the sample items with your actual work
   - Add images/videos to the `public` folder
   - Update the `galleryItems` array

4. **Contact Section** (`src/components/Contact.jsx`):
   - Update social media links with your profiles
   - Change email address

### Color Scheme

Edit CSS variables in `src/index.css`:
```css
:root {
  --bg-primary: #0a0a0a;
  --accent-primary: #c9a961;
  /* ... other colors */
}
```

## 📁 Project Structure

```
GraceWebsite/
├── public/              # Static assets
├── src/
│   ├── components/      # React components
│   │   ├── Header.jsx   # Navigation header
│   │   ├── Home.jsx     # Hero section
│   │   ├── About.jsx    # About section
│   │   ├── Gallery.jsx  # Gallery carousel
│   │   └── Contact.jsx  # Contact section
│   ├── App.jsx          # Main app component
│   ├── index.css        # Global styles
│   └── main.jsx         # Entry point
├── package.json
├── vite.config.js       # Vite configuration
└── README.md
```

## 🛠️ Technologies Used

- **React** - UI library
- **Vite** - Build tool and dev server
- **CSS3** - Styling with CSS variables
- **gh-pages** - Deployment to GitHub Pages

## 📝 License

This project is open source and available under the MIT License.

## 👤 Author

**Grace Conti**

- Website: [graceconti.com](https://graceconti.com)
- Instagram: [@graceconti](https://instagram.com/graceconti)

---

Built with ❤️ using React + Vite
