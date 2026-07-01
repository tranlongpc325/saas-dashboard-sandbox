# AI-Accelerated Design-to-Code Dashboard (Vue 3 + Tailwind)

A high-fidelity production SaaS dashboard built to showcase pixel-perfect design-to-code compilation. This application serves as a concrete validation of converting Figma UI3 local variables and semantic design tokens into a highly responsive, scalable, and atomic front-end interface.

## 🚀 Key Features & UI Engineering
- **Runtime Design Token Integration:** Dynamically fetches active token payloads from a remote decoupled Laravel API and injects them directly into the document root (`:root`) as native CSS custom properties at runtime, driving theme shifts seamlessly.
- **Pixel-Perfect Utility Layouts:** Developed with a modular, component-driven architecture using Tailwind CSS, ensuring rigid compliance with fluid spatial grids, precise layout boundaries, and flexible scaling behaviors.
- **Zero Cumulative Layout Shift (CLS):** Fully optimized structural skeleton loader states and container elements designed to completely eliminate UI flickering during async theme fetches or data pipeline loading.
- **Environment Agnostic Core:** Implements custom Vite bundler configurations to dynamically orchestrate API requests between local micro-services (`.env.development`) and cloud production API clusters (`.env.production`).

## 🛠️ Tech Stack & Dependencies
- **Core Framework:** Vue 3 (Composition API utilizing `<script setup>` syntax)
- **Build Tooling & Bundler:** Vite (Optimized asset pipelining, HMR, and ultra-fast compilation)
- **Styling Architecture:** Tailwind CSS (Utility-first, component-driven configuration)
- **Deployment Platform:** Vercel (Edge network global hosting with automated continuous deployment hooks)

## 🔗 Project Ecosystem Links
- **Figma Design Specification (View-Only):** [Figma Design](https://www.figma.com/design/NV1vGbz8QPH4VNaH6uYS1y/User-Management-Dashboard?node-id=30-3141&t=SmdUjnhahXkjV3vV-1)
- **Live Application Demo:** https://saas-dashboard-sandbox.vercel.app
- **Associated Micro-backend Repository:** https://github.com/tranlongpc325/design-tokens-api

## 💻 Local Setup & Development

### Prerequisites
- Node.js (v18.x or v20.x recommended)
- npm, yarn, or pnpm

### Step-by-Step Configuration
1. **Clone the repository and navigate to the project directory:**
   ```bash
   git clone https://github.com/your-github-username/saas-dashboard-sandbox.git
   ```

2. **Install all production and development dependencies:**
   ```bash
   npm install
   ```

3. **Configure local environment orchestration:**
Create a `.env.development` file in the root directory to define your local API endpoint:
   ```env
   VITE_API_BASE=http://127.0.0.1:8000/api/v1/themes
   ```

4. **Boot up the Vite local HMR development server:**
   ```bash
   npm run dev
   ```

   Open your browser and navigate to `http://localhost:5173` to see the live application.

## 🏗️ Production Build & Optimization

To compile and bundle the dashboard sandbox down to static HTML, highly minified production CSS, and tree-shaken JavaScript assets, execute:

```bash
npm run build
```

The compiled output directory `/dist` is fully configured for seamless continuous integration architectures on Vercel, utilizing the secure production backend cluster endpoint defined within your Vercel Environment Variables panel:

```env
VITE_API_BASE=https://design-tokens-api-production.up.railway.app/api/v1/themes
```