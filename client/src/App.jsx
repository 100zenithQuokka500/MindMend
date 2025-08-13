import { BrowserRouter,Route,Routes,Navigate} from 'react-router-dom';
import Chat from './Chat';
import Home from './Home';
import Helplines from './components/Helplines';
import SignInPage from './SignInPage';
import SignUpPage from './SignUpPage';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chat" element={
          <ProtectedRoute>
            <Chat />
          </ProtectedRoute>
        } />
        <Route path="/helplines" element={<Helplines />} />

        <Route path="/signin" element={<SignInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

