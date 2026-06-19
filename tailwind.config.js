/**
 * --------------------------------------------------------------------------
 * ENTERPRISE DASHBOARD SANDBOX FRAMEWORK
 * --------------------------------------------------------------------------
 * @package    SaaSAdmin / AdminCore
 * @author     Long Tran <Senior IT Project Leader & Design Engineer>
 * @version    1.0.0 (Vue 3 + Tailwind CSS v3 Hybrid)
 * @created    June 2026
 * * NOTE: This project is custom-built from scratch to demonstrate 1-1 mapping 
 * efficiency between Figma Local Variables (UI3) and Tailwind CSS configuration.
 * --------------------------------------------------------------------------
 */
/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: { primary: 'var(--brand-primary)' },
        surface: {
          main: 'var(--surface-main)',
          card: 'var(--surface-card)',
        },
        text: {
          title: 'var(--text-title)',
          body: 'var(--text-body)',
        },
        status: {
          'success-bg': 'var(--status-success-bg)',
          'success-text': 'var(--status-success-text)',
          'warning-bg': 'var(--status-warning-bg)',
          'warning-text': 'var(--status-warning-text)',
        },
        // --- BỔ SUNG NHÓM SIDEBAR ---
        sidebar: {
          'bg': 'var(--sidebar-bg)',
          'text-inactive': 'var(--sidebar-text-inactive)',
          'text-active': 'var(--sidebar-text-active)',
          'item-active-bg': 'var(--sidebar-item-active-bg)',
        }
      },
      borderRadius: {
        'card': '12px',
        'button': '8px',
      }
    },
  },
  plugins: [],
}