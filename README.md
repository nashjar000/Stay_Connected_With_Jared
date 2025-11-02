# Stay Connected With Jared 🎬

A personal website featuring video journals, music, artwork, and seasonal themes that automatically change throughout the year.

## 🎯 Features

- **Automated Seasonal Themes**: Halloween (Sept 15 - Oct 31), Thanksgiving (Nov 1 - Thanksgiving), Christmas (Day after Thanksgiving - Jan 7), Normal (Jan 8 - Sept 14)
- **Mobile Responsive Design**: Complete mobile navigation with hamburger menu
- **Video Journal Archive**: Years of personal video journals organized by year
- **Interactive Elements**: Daily quotes, countdown timers, themed audio
- **Piano Performances**: Original piano recordings and covers
- **Art Gallery**: Personal paintings and artwork

## 📁 Project Structure

```
📁 Stay_Connected_With_Jared/
├── 🏠 index.html                    # Homepage
├── 📄 about-me.html                 # FAQ page
├── 📞 contact.html                  # Contact information
├── 🎵 favorite-music.html           # Music playlist
├── 🎹 piano.html                    # Piano recordings
├── 🎨 painting.html                 # Art gallery
├── 🍽️ recipies.html                 # Recipe collection
├── 🎬 videos.html                   # Other videos
├── 📱 mission.html                  # Mission audio files
├── 🚧 coming-soon.html              # Coming soon page
│
├── 📁 pages/                        # Video Journal Pages
│   ├── video-journals.html         # Video journal archive
│   ├── video-journal-2025.html     # 2025 journals
│   ├── video-journal-2024.html     # 2024 journals
│   └── ... (2017-2023)            # Previous years
│
├── 📁 js/                          # JavaScript Files
│   ├── 📁 themes/                   # Theme Management
│   │   ├── themeManager.js          # Main theme controller
│   │   ├── specialElements.js       # Seasonal elements
│   │   └── dailyQuote-themed.js     # Themed quotes
│   ├── 📁 components/               # UI Components
│   │   ├── header.js                # Navigation header
│   │   ├── footer.js                # Page footer
│   │   └── mobile-menu.js           # Mobile navigation
│   ├── 📁 counters/                 # Countdown Timers
│   │   ├── christmas-count.js       # Christmas countdown
│   │   ├── halloween-count.js       # Halloween countdown
│   │   ├── thanksgiving-count.js    # Thanksgiving countdown
│   │   └── countup.js               # General counter
│   └── 📄 [other utility scripts]   # Clocks, buttons, etc.
│
├── 📁 styles/                       # CSS Stylesheets
│   ├── style.css                    # Base styles
│   ├── Halloween-theme.css          # Halloween theme
│   ├── Christmas-theme.css          # Christmas theme
│   ├── Thanksgiving-theme.css       # Thanksgiving theme
│   └── [page-specific].css          # Individual page styles
│
├── 📁 images/                       # Images & Media
├── 📁 Audio/                        # Background music
├── 📁 mission-audio/                # Mission recordings
├── 📁 dev/                          # Development files
└── 📁 Stay Connected with Jared-logos/ # Logo variations
```

## 🚀 Getting Started

1. **Clone the repository**
2. **Open `index.html`** in your browser
3. **The site automatically detects** the current date and applies appropriate seasonal themes

## 🎨 Theme System

The site features an intelligent theme system that automatically switches based on the calendar:

- **🎃 Halloween Theme** (September 15 - October 31)
  - Spooky colors and effects
  - Halloween countdown timer
  - Themed background music

- **🦃 Thanksgiving Theme** (November 1 - Thanksgiving Day)
  - Autumn colors (browns, oranges)
  - Thanksgiving countdown
  - Gratitude messaging

- **🎄 Christmas Theme** (Day after Thanksgiving - January 7)
  - Red and green colors
  - Christmas countdown
  - Holiday music

- **🌟 Normal Theme** (January 8 - September 14)
  - Standard color scheme
  - Regular content

## 📱 Mobile Features

- **Hamburger Navigation**: Full mobile menu system
- **Responsive Design**: Optimized for all screen sizes
- **Touch-Friendly**: Large buttons and easy navigation
- **Theme Consistency**: All themes work perfectly on mobile

## 🛠️ Development

### File Organization
- **Components** are modular and reusable
- **Themes** are self-contained CSS files
- **Scripts** are organized by functionality
- **Pages** are separated for better maintenance

### Adding New Content
1. **Video Journals**: Add to `/pages/` directory
2. **Themes**: Create new CSS file in `/styles/`
3. **Scripts**: Organize in appropriate `/js/` subdirectory

## 📧 Contact

Visit the contact page for social media links and ways to stay connected!

---

**© 2022-2025 Jared Nash** | Built with ❤️ and lots of video journals
