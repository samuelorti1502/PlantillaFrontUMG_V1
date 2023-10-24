import {Route, Routes} from 'react-router-dom'
import {Registration} from './components/Registration'
import {ForgotPassword} from './components/ForgotPassword'
import {NewPassword} from './components/NewPassword'
import {Login} from './components/Login'
import {AuthLayout} from './AuthLayout'

const AuthPage = () => (
  <Routes>
    <Route element={<AuthLayout />}>
      <Route path='login' element={<Login />} />
      
      <Route path='forgot-password' element={<ForgotPassword />} />
      <Route path="forgot-password/:token" element={<NewPassword />} />
      <Route index element={<Login />} />
    </Route>
  </Routes>
)

export {AuthPage}
