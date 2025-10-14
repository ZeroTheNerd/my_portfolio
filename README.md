# Zach Martim's Portfolio Website

A modern, interactive portfolio showcasing my professional experience, technical skills, and projects. Built with React and featuring a unique desktop-inspired interface with advanced UI/UX design patterns.

![Portfolio Preview](https://img.shields.io/badge/Status-Live-success)
![React](https://img.shields.io/badge/React-18.3.1-blue)
![License](https://img.shields.io/badge/License-MIT-green)

## Features

### Interactive Landing Page
- Engaging "error message" popup introducing myself as a Software Engineer
- Professional profile display with contact links
- Smooth animations and typing effects
- Responsive glassmorphism design

### Dynamic Skills Section
- Organized skill categories (Programming Languages, Frameworks, Tools)
- Visual proficiency indicators with animated progress bars
- Technology-specific icons (Python, JavaScript, React, Docker, AWS, etc.)
- Expandable skill tags showcasing additional expertise
- Modern card-based layout with hover effects

### Professional Timeline Resume
- Interactive career journey visualization
- Alternating timeline design for visual balance
- Expandable detail panels revealing key achievements
- Filter system (All, Work Experience, Education)
- Duration badges and location tags
- Company logos and role-specific icons
- Technology tags for each position

### Project Showcase
- Interactive project gallery
- Game jam entries and academic projects
- Video demonstrations and live demos
- GitHub integration with direct repository links
- Image previews and detailed descriptions

### AI-Powered Chatbot
- Integrated Supabase-powered chat widget
- Real-time conversation storage
- Context-aware responses about portfolio content
- Clean, modern chat interface

### Additional Features
- Smooth page transitions and animations
- Fully responsive design for all devices
- Dark-themed navigation bar
- Downloadable resume
- Privacy policy page

## Tech Stack

### Frontend
- **React** 18.3.1 - UI framework
- **React Router** 6.27.0 - Navigation
- **React Icons** 5.5.0 - Icon library
- **Framer Motion** 11.11.11 - Animations
- **GSAP** 3.12.7 - Advanced animations
- **React Awesome Reveal** 4.3.1 - Scroll animations
- **React Draggable** 4.5.0 - Interactive elements

### Backend & Database
- **Supabase** - Backend as a Service
  - PostgreSQL database
  - Edge Functions for chatbot
  - Real-time capabilities
  - Authentication ready

### Development Tools
- **Create React App** - Project setup
- **React Scripts** 5.0.1 - Build tools
- **Patch Package** 8.0.0 - Dependency patches
- **ESLint** - Code linting

## Project Structure

```
portfolio-website/
├── portfolio-frontend/          # React frontend application
│   ├── public/                  # Static assets
│   │   └── assets/             # Images, videos, files
│   ├── src/
│   │   ├── components/         # Reusable components
│   │   │   ├── ChatWidget/    # AI chatbot component
│   │   │   ├── Footer/        # Footer component
│   │   │   ├── Layout/        # Chrome-inspired layout
│   │   │   └── Navigation/    # Navigation bar
│   │   ├── Screens/           # Page components
│   │   │   ├── DigitalResume/ # Timeline resume
│   │   │   ├── Landing/       # Home page
│   │   │   ├── Projects/      # Project showcase
│   │   │   ├── Skills/        # Skills section
│   │   │   └── Extra/         # Additional pages
│   │   ├── context/           # React context providers
│   │   ├── lib/               # Utility libraries
│   │   └── styles/            # Global styles
│   └── package.json
├── portfolio-backend/          # Express backend (legacy)
├── supabase/                   # Supabase configuration
│   ├── functions/             # Edge functions
│   │   └── chatbot/          # Chatbot edge function
│   └── migrations/            # Database migrations
└── README.md
```

## Getting Started

### Prerequisites

- **Node.js** (v14 or higher)
- **npm** (comes with Node.js)
- **Supabase Account** (for backend features)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/ZeroTheNerd/portfolio-website.git
   cd portfolio-website
   ```

2. **Install dependencies**
   ```bash
   cd portfolio-frontend
   npm install
   ```

3. **Set up environment variables**

   Create a `.env` file in the `portfolio-frontend` directory:
   ```env
   REACT_APP_SUPABASE_URL=your_supabase_project_url
   REACT_APP_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Start the development server**
   ```bash
   npm start
   ```

   The application will open at [http://localhost:3000](http://localhost:3000)

### Building for Production

```bash
npm run build
```

Creates an optimized production build in the `build` folder.

## Supabase Setup

### Database Schema

The chatbot feature uses a Supabase database with the following table:

```sql
CREATE TABLE chat_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  message TEXT NOT NULL,
  sender TEXT NOT NULL,
  timestamp TIMESTAMPTZ DEFAULT now()
);
```

### Edge Function Deployment

The chatbot edge function is located in `supabase/functions/chatbot/`. It handles:
- Message storage
- AI-powered responses
- CORS configuration

Deploy using Supabase CLI or through the dashboard.

## Key Features Explained

### Skills Section
- **Visual Progress Bars**: Animated bars showing proficiency levels (70-90%)
- **Category Organization**: Three main categories with expandable details
- **Icon Integration**: Technology-specific icons from react-icons
- **Hover Effects**: Interactive cards with smooth transitions

### Timeline Resume
- **Alternating Layout**: Left-right pattern on desktop, single column on mobile
- **Expandable Details**: Click to reveal achievements and technologies
- **Smart Filtering**: Toggle between work experience and education
- **Duration Badges**: Visual indicators of time commitment

### Chat Widget
- **Real-time Storage**: Messages saved to Supabase
- **Minimizable Interface**: Collapsible widget in corner
- **Smooth Animations**: Elegant open/close transitions

## Customization

### Updating Personal Information

1. **Landing Page**: Edit `src/Screens/Landing/Landing.jsx`
2. **Skills**: Modify skill data in `src/Screens/Skills/Skills.jsx`
3. **Experience**: Update timeline in `src/Screens/DigitalResume/DigitalResume.jsx`
4. **Projects**: Edit project data in `src/Screens/Projects/Projects.jsx`

### Styling

- **Global Colors**: Brand colors are `#3399cc` (primary) and `#14666d` (secondary)
- **Background**: `#cacfca` (light gray-green)
- **Navbar**: `#72817e` (gray-blue)
- **CSS Files**: Each component has its own CSS file for easy customization

## Performance

- Optimized bundle size with code splitting
- Lazy loading for images
- Efficient animations using CSS transforms
- Responsive images for different screen sizes

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Deployment

### Recommended Platforms
- **Vercel** - Automatic deployments from Git
- **Netlify** - Continuous deployment
- **GitHub Pages** - Free hosting for static sites

### Vercel Deployment

```bash
npm install -g vercel
vercel
```

Follow the prompts to deploy.

## Contributing

This is a personal portfolio project, but suggestions and feedback are welcome!

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/improvement`)
3. Commit changes (`git commit -am 'Add new feature'`)
4. Push to branch (`git push origin feature/improvement`)
5. Open a Pull Request

## License

This project is open source and available under the [MIT License](LICENSE).

## Contact

**Zach Martim**
- Portfolio: [Your Live URL]
- LinkedIn: [linkedin.com/in/zachmartim](https://linkedin.com/in/zachmartim)
- GitHub: [github.com/ZeroTheNerd](https://github.com/ZeroTheNerd)
- Email: zachmartim101@gmail.com

## Acknowledgments

- University of Utah - ServiceNow Platform Team
- React community for excellent documentation
- Supabase for backend infrastructure
- Ludum Dare and game jam communities
- All open-source contributors

---

Built with ❤️ by Zach Martim | Student Software Engineer @ University of Utah
