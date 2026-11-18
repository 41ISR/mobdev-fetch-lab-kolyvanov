import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/global.css'
import App from './App.jsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage/HomePage.jsx'
import AboutPage from './pages/AboutPage/AboutPage.jsx'
import MovieDetailsPage from './pages/MovieDetailsPage/MovieDetailsPage.jsx'
import SearchBar from './components/SearchBar/SearchBar.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="about" element={<AboutPage />}/>
          <Route path="movie/:id" element={<MovieDetailsPage />}/>
        </Route>
      </Routes>
    </BrowserRouter> 
  </StrictMode>,
)
