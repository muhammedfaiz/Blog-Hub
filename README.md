
# Blog Hub

**Blog Hub** is a modern and elegant platform for bloggers and readers to explore insightful articles on various topics. It offers an intuitive interface, making it easy to browse, read, and manage blog posts.

## 📖 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Folder Structure](#folder-structure)
- [Scripts](#scripts)
- [Contributing](#contributing)
- [License](#license)

## 🌟 Features

- User-friendly design.
- Dynamic blog listing with the ability to view detailed blog posts.
- Integration of rich content formatting for blog descriptions.
- Smooth navigation between pages using React Router.
- Organized code structure for easy scalability and maintenance.

## 🔧 Tech Stack

- **Frontend**: React, Tailwind CSS
- **Backend**: Node.js, Express (for API integration)
- **Icons**: React Icons
- **API**: Blog post data fetching using Axios

## 🚀 Getting Started

To get a local copy of this project up and running, follow these simple steps.

### Prerequisites

- **Node.js** (v14 or later)
- **npm** or **yarn**

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/muhammedfaiz/Blog-Hub.git
   cd blog-hub
   ```

2. **Install the dependencies:**

   Using npm:

   ```bash
   npm install
   ```

   Or using yarn:

   ```bash
   yarn install
   ```

3. **Start the development server:**

   Using npm:

   ```bash
   npm start
   ```

   Or using yarn:

   ```bash
   yarn start
   ```

   The app will run locally on `http://localhost:5173`.

## 📂 Folder Structure

```
blog-hub/
├── public/
│   ├── index.html
│   └── ...
├── src/
│   ├── assets/          # Image and static files
│   ├── components/      # Reusable components (e.g., Header, Footer, ContentRenderer)
│   ├── pages/           # Page components (Home, Blog)
│   ├── service/         # API service (fetchBlogDetails)
│   ├── App.js           # Main App component
│   ├── index.js         # Entry point
│   └── styles/          # Custom styling files if any
└── README.md
```

## 📜 Scripts

- `npm start` or `yarn start` - Runs the app in development mode.
- `npm run build` or `yarn build` - Builds the app for production.
- `npm test` or `yarn test` - Launches the test runner.

## 🤝 Contributing

Contributions are welcome! If you'd like to improve or add new features to Blog Hub, follow these steps:

1. **Fork the repository**
2. **Create a new branch**: `git checkout -b feature/my-feature`
3. **Commit your changes**: `git commit -m 'Add some feature'`
4. **Push to the branch**: `git push origin feature/my-feature`
5. **Create a Pull Request**

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
