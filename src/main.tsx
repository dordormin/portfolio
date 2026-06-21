import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { SoundProvider } from '@/contexts/SoundContext';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LanguageProvider>
      <SoundProvider>
        <App />
      </SoundProvider>
    </LanguageProvider>
  </StrictMode>,
);
