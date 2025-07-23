# Portfolio Website

A modern, responsive portfolio website built with React, Vite, and Tailwind CSS. This portfolio showcases your skills, projects, and provides a way for potential clients or employers to get in touch with you.

## 🚀 Features

- **Modern Design**: Clean, professional design with smooth animations
- **Responsive**: Fully responsive design that works on all devices
- **Smooth Scrolling**: Navigation with smooth scrolling between sections
- **Interactive Components**: Hover effects, animations, and interactive elements
- **Contact Form**: Functional contact form (ready for backend integration)
- **Skills Showcase**: Visual representation of your technical skills
- **Project Gallery**: Showcase your projects with descriptions and links
- **SEO Friendly**: Optimized for search engines

## 🛠️ Built With

- **React 18** - UI library
- **Vite** - Build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **JavaScript ES6+** - Modern JavaScript features

## 📦 Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd portfolio-website
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and visit `http://localhost:5173`

## 🎨 Customization

### Personal Information

1. **Update your name and details** in the following files:
   - `index.html` - Update the title and meta description
   - `src/components/Hero.jsx` - Update name, title, and description
   - `src/components/About.jsx` - Update your story and stats
   - `src/components/Contact.jsx` - Update contact information
   - `src/components/Footer.jsx` - Update footer information

### Profile Picture

Replace the placeholder avatar in `src/components/Hero.jsx`:
- Replace the `YN` initials with your actual profile picture
- You can use an `<img>` tag or upload an image to the `public` folder

### Skills

Update your skills in `src/components/Skills.jsx`:
- Modify the `skillCategories` array
- Adjust skill levels (0-100)
- Add or remove technologies

### Projects

Update your projects in `src/components/Projects.jsx`:
- Modify the `projects` array
- Add your actual project links
- Update project descriptions and technologies used
- Replace emoji placeholders with actual project images

### Colors and Styling

The color scheme is defined in `tailwind.config.js`:
- `primary` colors: Main brand colors (currently blue)
- `secondary` colors: Secondary colors (currently gray)
- You can customize these colors to match your personal brand

### Contact Form

The contact form in `src/components/Contact.jsx` is ready for backend integration:
- Currently shows an alert on submission
- You can integrate with services like:
  - Formspree
  - Netlify Forms
  - EmailJS
  - Your own backend API

## 📱 Sections

1. **Header** - Navigation with smooth scrolling
2. **Hero** - Introduction with call-to-action buttons
3. **About** - Personal story and background
4. **Skills** - Technical skills with progress bars
5. **Projects** - Portfolio of your work
6. **Contact** - Contact form and social links
7. **Footer** - Additional links and copyright

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

### Deploy to GitHub Pages

```bash
npm run deploy
```

### Other Deployment Options

- **Vercel**: Connect your GitHub repo to Vercel for automatic deployments
- **Netlify**: Drag and drop the `dist` folder or connect your repo
- **Firebase Hosting**: Use Firebase CLI to deploy
- **AWS S3**: Upload the `dist` folder to an S3 bucket

## 📝 Customization Checklist

- [ ] Update personal information (name, title, description)
- [ ] Add your profile picture
- [ ] Update skills and experience levels
- [ ] Add your actual projects with real links
- [ ] Update contact information and social links
- [ ] Customize colors to match your brand
- [ ] Set up contact form backend (optional)
- [ ] Add Google Analytics (optional)
- [ ] Update favicon and meta tags
- [ ] Test on different devices and browsers

## 🎯 SEO Optimization

- Update meta tags in `index.html`
- Add structured data (JSON-LD)
- Optimize images with proper alt tags
- Use semantic HTML elements
- Add a sitemap.xml file

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Feel free to fork this project and customize it for your own use. If you make improvements that could benefit others, pull requests are welcome!

## 📞 Support

If you have any questions or need help customizing your portfolio, feel free to reach out!

---

**Happy coding!** 🚀
