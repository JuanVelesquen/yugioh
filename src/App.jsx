import CardDetails from './Paginas/CardDetails';
import { Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './Paginas/LandingPage'
import Login from './Paginas/Login'
import Register from './Paginas/Register'
import Home from './Paginas/Home'
import MyDecks from './Paginas/MyDecks';
import Profile from './Paginas/Profile';
import CheckDeck from './Paginas/CheckDeck.jsx'
import { AuthProvider } from './Context/AuthContext';
import './Style/Background.css'
import { ProtectedRoute } from './Componentes/ProtectedRoute';
import Deck from './Paginas/Deck';

function App() {
  return (
    <AuthProvider>
      <Routes>
            <Route path='/' element={<LandingPage/>} ></Route>

            <Route path='/Home' element={
              <ProtectedRoute>
                <Home/>
              </ProtectedRoute>
            } ></Route>

            <Route path='/Register' element={
            <Register/>} ></Route>

            <Route path='/Login' element={<Login/>} ></Route>
            
            <Route path='/Profile' element={
              <ProtectedRoute>
                <Profile/>
              </ProtectedRoute>} ></Route>

              <Route path='/Deck' element={
              <ProtectedRoute>
                <Deck/>
              </ProtectedRoute>} ></Route>

            <Route path='/MyDecks' element={
              <ProtectedRoute>
                <MyDecks/>
              </ProtectedRoute>
            } ></Route>

            <Route path='/CheckDeck' element={
              <ProtectedRoute>
                <CheckDeck/>
              </ProtectedRoute>
            } ></Route>

            <Route path='/CardDetails' element={<CardDetails/>} ></Route>
            <Route path='/*' element={<Navigate to="/"></Navigate>}></Route>
        </Routes>
    </AuthProvider>
  )
}

export default App
