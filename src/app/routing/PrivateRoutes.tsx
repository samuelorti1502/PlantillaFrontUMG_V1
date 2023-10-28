import {lazy, FC, Suspense} from 'react'
import {Route, Routes, Navigate} from 'react-router-dom'
import {MasterLayout} from '../../_metronic/layout/MasterLayout'
import TopBarProgress from 'react-topbar-progress-indicator'
import {DashboardWrapper} from '../pages/dashboard/DashboardWrapper'
import {MenuTestPage} from '../pages/MenuTestPage'
import {getCSSVariableValue} from '../../_metronic/assets/ts/_utils'
import {WithChildren} from '../../_metronic/helpers'
import BuilderPageWrapper from '../pages/layout-builder/BuilderPageWrapper'
import ComerRestaurante from '../pages/menu/restaurante/ComerRestaurane'
import Rol from '../pages/rol/'
import Usuarios from '../pages/usuarios/'
import Prov from '../pages/proveedores/'
import Menu from '../pages/menu'
import Prod from '../pages/productos'

const PrivateRoutes = () => {
  // const ProfilePage = lazy(() => import('../modules/profile/ProfilePage'))
  // const WizardsPage = lazy(() => import('../modules/wizards/WizardsPage'))
   const AccountPage = lazy(() => import('../modules/accounts/AccountPage'))
  // const WidgetsPage = lazy(() => import('../modules/widgets/WidgetsPage'))
  // const ChatPage = lazy(() => import('../modules/apps/chat/ChatPage'))
  // const UsersPage = lazy(() => import('../modules/apps/user-management/UsersPage'))

  return (
    <Routes>

      <Route element={<MasterLayout />}>


        {/* Redirect to Dashboard after success login/registartion */}
        <Route path='auth/*' element={<Navigate to='/menu' />} />
        {/* Pages */}
        <Route path='menu' element={<Menu />} />
        <Route path='dashboard' element={<DashboardWrapper />} />
        <Route path='rol' element={<Rol />} />
        <Route path='comer-restaurante' element={<ComerRestaurante />} />
        
         {/* Lazy Modules */}
         <Route
          path='administracion/usuarios/*'
          element={
            <SuspensedView>
              <Usuarios />
            </SuspensedView>
          }
        />
        <Route
          path='administracion/productos/*'
          element={
            <SuspensedView>
              <Prod />
            </SuspensedView>
          }
        />
        <Route
          path='administracion/proveedores/*'
          element={
            <SuspensedView>
              <Prov />
            </SuspensedView>
          }
        />
        {/* Page Not Found */}
        <Route path='*' element={<Navigate to='/error/404' />} />
      </Route>
    </Routes>


  )
}

const SuspensedView: FC<WithChildren> = ({children}) => {
  const baseColor = getCSSVariableValue('--kt-primary')
  TopBarProgress.config({
    barColors: {
      '0': baseColor,
    },
    barThickness: 1,
    shadowBlur: 5,
  })
  return <Suspense fallback={<TopBarProgress />}>{children}</Suspense>
}

export {PrivateRoutes}
