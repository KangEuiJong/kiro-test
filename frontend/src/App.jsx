import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import MyPage from './pages/MyPage';
import SocialCallbackPage from './pages/SocialCallbackPage';
import SearchPage from './pages/SearchPage';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <main className='main-content'>
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/search' element={<SearchPage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/register' element={<RegisterPage />} />
            <Route path='/social-callback' element={<SocialCallbackPage />} />
            <Route
              path='/mypage'
              element={
                <ProtectedRoute>
                  <MyPage />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
