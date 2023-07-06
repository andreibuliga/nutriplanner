import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Header from './components/Header'
import AdminRoute from './components/AdminRoute'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import CreateMealPlanPage from './pages/CreateMealPlan'
import SavedMealPlansPage from './pages/SavedMealPlan'
import RecipeDetailsPage from './pages/RecipeDetails'
import AdminDashboard from './pages/AdminDashboard'
import ValidatedRoute from './components/ValidatedRoute'

function App() {
  return (
    <>
      <Router>
        <div className='container'>
          <Header />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route
              path='/admin'
              element={
                <AdminRoute>
                  <AdminDashboard />
                </AdminRoute>
              }
            />
            <Route
              path='/create-meal-plan'
              element={
                <ValidatedRoute>
                  <CreateMealPlanPage />
                </ValidatedRoute>
              }
            />
            <Route
              path='/saved-meal-plans'
              element={
                <ValidatedRoute>
                  <SavedMealPlansPage />
                </ValidatedRoute>
              }
            />
            <Route path='/recipe-details/:id' element={<RecipeDetailsPage />} />
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </>
  )
}

export default App
