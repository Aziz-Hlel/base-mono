import { StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { TooltipProvider } from '@/components/ui/tooltip';
import './i18n';
import App from './App';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Suspense fallback={null}>
      <TooltipProvider>
        <App />
      </TooltipProvider>
    </Suspense>
  </StrictMode>,
);
