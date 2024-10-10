# Project structure


```bash
recipe-square-frontend/
│
├── public/                 
│   ├── favicon.ico                           # Project icon
│   └── logo-transparent.png                  # Project logo
├── src/                 
│   ├── components/
│   │     ├── auth/                           # Authorization-related files 
│   │     │   ├── Auth-form.jsx
│   │     │   └── AuthContext.jsx
│   │     ├── pages/                          # Page components
│   │     │   ├── Admin-dashboard.jsx
│   │     │   ├── Home.jsx
│   │     │   ├── Login.jsx
│   │     │   ├── No-page.jsx
│   │     │   ├── Recipe-form.jsx
│   │     │   ├── Recipe-manager.jsx
│   │     │   ├── Recipe.jsx
│   │     │   ├── Request-password-reset.jsx
│   │     │   ├── Reset-password.jsx
│   │     │   ├── Results.jsx
│   │     │   ├── Search-suggestion.jsx
│   │     │   ├── Search-suggestions-list.jsx
│   │     │   └── Signup.jsx
│   │     ├── recipe/                         # Recipe-related components
│   │     │   ├── Recipe-card.jsx
│   │     │   ├── Recipe-container.jsx
│   │     │   └── Recipe-item.jsx
│   │     ├── search/                         # Search-related components
│   │     │   ├── Result-item.jsx
│   │     │   ├── Searchbar.jsx
│   │     ├── Navbar.jsx                    # Navigation bar component
│   │     └── User-card.jsx                 # User card component
│   ├── helpers/                            # Helper files
│   │     ├── API.jsx
│   │     └── Icons.jsx     
│   ├── style/                              # Styling files
│   │     ├── base/                         # Base styles
│   │     │   ├── colors&variables.scss
│   │     │   ├── generic.scss
│   │     │   └── mixins.scss
│   │     ├── components/                   # Component-specific styles
│   │     │     ├── auth/
│   │     │     │   └── auth-form.scss
│   │     │     ├── pages/
│   │     │     │   ├── admin-dashboard.scss
│   │     │     │   ├── home.scss
│   │     │     │   ├── recipe-form.scss
│   │     │     │   ├── recipe.scss
│   │     │     │   └── reset-password.scss
│   │     │     ├── recipe/
│   │     │     │   ├── recipe-card.scss
│   │     │     │   ├── recipe-container.scss
│   │     │     │   └── recipe-item.scss
│   │     │     ├── search/
│   │     │     │   ├── result-item.scss
│   │     │     │   ├── search-suggestion.scss
│   │     │     │   ├── search-suggestions-list.scss
│   │     │     │   └── searchbar.scss
│   │     │     ├── navbar.scss               # Navbar-specific styles
│   │     │     ├── react-draft-wysiwyg.scss  # WYSIWYG editor styles
│   │     │     └── user-card.scss            # User card-specific styles
│   │     └── main.scss                       # Main global styles
│   ├── App.jsx                               # App file
│   └── main.jsx                              # Entry point file
│
├── .gitignore                                # Git ignore file
├── readme.md                                 # Project structure
├── eslint.config                             # Linting configuration
├── index.html                                # Main HTML file
├── package-lock.json                         # Dependencies
├── package.json                              # Dependencies
└── vite.config.js                            # Vite configuration

```