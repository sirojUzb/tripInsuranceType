import { Route, Routes } from 'react-router-dom'
import Layout from './layouts/MainLayout'
import Home from './pages/Home'
import Insurance from './pages/Insurance'
import Shengen from './pages/Shengen'
import NotFound from './pages/NotFound'

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="straxovka" element={<Insurance />} />
        <Route path="visa/shengen" element={<Shengen />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export default App
