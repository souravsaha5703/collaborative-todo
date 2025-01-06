import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import AppRouter from './Routes.tsx';
import { ThemeProvider } from './components/Theme/Theme-provider.tsx';
import { Provider } from 'react-redux';
import { store } from './store/store.ts';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
        <AppRouter />
      </ThemeProvider>
    </Provider>
  </StrictMode>,
)
