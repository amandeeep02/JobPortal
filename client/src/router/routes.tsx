import { AuthProvider } from '@/context/AuthContext'
import { Landing } from '@/pages/Landing'
import { Route, Routes } from 'react-router-dom'
import { Jobs } from '@/pages/Jobs'
import { UserDetails } from '@/pages/UserDetails'
import { Admin } from '@/pages/Admin'

const AppRoutes = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route path="*" element={<Landing />} />
        <Route path="user-details" element={<UserDetails />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </AuthProvider>
  )
}

export default AppRoutes
