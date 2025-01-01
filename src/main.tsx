import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import AppRouter from './Routes.tsx';
import { ThemeProvider } from './components/Theme/Theme-provider.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
      <AppRouter />
    </ThemeProvider>
  </StrictMode>,
)
