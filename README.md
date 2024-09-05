# Hesti Assessment

This is a frontend assessment project using React, Vite, and MUI Joy for the UI components, along with Redux for state management. Google Maps integration is handled using the `@vis.gl/react-google-maps` library. The project also uses Tailwind CSS for additional styling and pnpm as the package manager.

## Project Setup

### Prerequisites

- [Node.js](https://nodejs.org/) (v18.x or higher recommended)
- [pnpm](https://pnpm.io/) (v8.x or higher)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/artemb315/Hesti-Assessment.git
   cd Hesti-Assessment
   ```

2. Install dependencies using pnpm:

   ```bash
   pnpm install
   ```

3. Create the `.env` file:

   You can use the `.env.example` file as a template. Copy the file and fill in the necessary environment variables:

   ```bash
   cp .env.example .env
   ```

   **Note:** Make sure you provide all required values in the `.env` file for the project to run properly.

### Scripts

- **Start Development Server:**

  ```bash
  pnpm dev
  ```

  Runs the development server on [http://localhost:5173](http://localhost:5173).

- **Build for Production:**

  ```bash
  pnpm build
  ```

  Builds the project for production use.

- **Preview Production Build:**

  ```bash
  pnpm preview
  ```

  Preview the production build locally.

- **Lint the Project:**

  ```bash
  pnpm lint
  ```

  Lints the project with ESLint.

### Styling

This project uses both Tailwind CSS and MUI Joy for styling. Tailwind can be used for utility-based styling, while MUI Joy components offer predefined UI components.

### Google Maps Integration

We use the `@vis.gl/react-google-maps` package to handle Google Maps rendering and interactions.

Make sure to provide your Google Maps API key in the `.env` file as follows:

```plaintext
VITE_GOOGLE_MAPS_API_KEY=your-api-key-here
```

### Environment Variables

Make sure to configure the following environment variables in your `.env` file:

```plaintext
# Example:
VITE_GOOGLE_MAPS_API_KEY=your-google-maps-api-key
```

### Deployment

This project is deployed on Vercel and can be accessed using the following URL:

[https://hesti-assessment.vercel.app/](https://hesti-assessment.vercel.app/)

### Folder Structure

- **src/**: Source code of the project.
- **public/**: Public assets.

### License

This project is licensed under the MIT License.
