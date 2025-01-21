# React + Vite Project

This project provides a minimal setup for developing React applications with Vite. It leverages Vite's fast build and hot module replacement (HMR) capabilities along with some basic ESLint rules for code quality.

## Features

- **React with Vite:** A fast development experience with instant feedback.
- **Hot Module Replacement (HMR):** Instant updates during development without refreshing the page.
- **ESLint:** Basic linting rules to maintain code quality.
- **Plugin Options:** Choose between Babel or SWC for fast refresh.

## Available Plugins

### 1. [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md)
This plugin uses [Babel](https://babeljs.io/) for Fast Refresh, providing a seamless development experience.

### 2. [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc)
This plugin leverages [SWC](https://swc.rs/) for Fast Refresh, offering faster builds and updates.

## Getting Started

### Prerequisites
Ensure you have the following installed on your system:
- [Node.js](https://nodejs.org/) (version 14 or higher recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1. Clone the repository:
   ```bash
   git clone <repository_url>
   ```

2. Navigate to the project directory:
   ```bash
   cd <project_name>
   ```

3. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

### Development

To start the development server:
```bash
npm run dev
# or
yarn dev
```

Visit `http://localhost:5173` in your browser to see the app.

### Build

To build the project for production:
```bash
npm run build
# or
yarn build
```

The production-ready files will be available in the `dist` folder.

### Preview

To preview the production build locally:
```bash
npm run preview
# or
yarn preview
```

### Linting

To lint the project:
```bash
npm run lint
# or
yarn lint
```


