import { ScrollToTop } from '@/components/helpers/ScrollToTop';
import SignIn from '@/components/SignIn/SignIn';
import queryClient from '@/config/react-query';
import { AuthProvider } from '@/context/AuthContext';
import { GuestRoute, ProtectedRoute } from '@/guard/AuthGuards';
import NetworkStatusGuard from '@/guard/NetworkStatusGuard';
import { ThemeProvider } from '@/lib/theme-provider';
import { QueryClientProvider } from '@tanstack/react-query';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router';
import { Toaster } from 'sonner';
import Contacts from './features/contacts';
import ExhibitorEnquiries from './features/exhibitor-enquiries';
import Sidebar from './features/sidebar';
import SponsorEnquiries from './features/sponsor-enquiries';

const App = () => {
  return (
    <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
      <QueryClientProvider client={queryClient}>
        <Toaster />
        <NetworkStatusGuard>
          <AuthProvider>
            <Router>
              <ScrollToTop />
              <Routes>
                <Route element={<GuestRoute />}>
                  <Route path='/' element={<Navigate to='/signin' replace />} />
                  <Route path='/signin' element={<SignIn />} />
                </Route>

                <Route element={<ProtectedRoute />}>
                  <Route element={<Sidebar />}>
                    <Route path='/home' element={<Contacts />} />
                    <Route path='/exhibitor-enquiries' element={<ExhibitorEnquiries />} />
                    <Route path='/sponsor-enquiries' element={<SponsorEnquiries />} />
                  </Route>
                </Route>

                <Route
                  path='*'
                  element={
                    <div className='bg-background text-foreground flex min-h-screen items-center justify-center'>
                      <p className='text-muted-foreground text-sm'>404 — Page not found</p>
                    </div>
                  }
                />
              </Routes>
            </Router>
          </AuthProvider>
        </NetworkStatusGuard>
      </QueryClientProvider>
    </ThemeProvider>
  );
};

export default App;
