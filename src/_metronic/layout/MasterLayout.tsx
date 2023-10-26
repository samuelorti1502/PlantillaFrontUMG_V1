import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { HeaderWrapper } from './components/header';
import { ScrollTop } from './components/scroll-top';
import { Content } from './components/content';
import { FooterWrapper } from './components/footer';
import { Sidebar } from './components/sidebar';
import { ThemeModeProvider } from '../partials';
import { PageDataProvider } from './core';
import { reInitMenu } from '../helpers';

const MasterLayout = () => {
  const location = useLocation();
  const hiddenRoutes = ['menu', 'comer-restaurante']; // Rutas que ocultan el Sidebar
  const isHiddenRoute = hiddenRoutes.some(route => location.pathname.includes(route));

  useEffect(() => {
    reInitMenu();
  }, [location.key]);

  return (
    <PageDataProvider>
      <ThemeModeProvider>
        <div className='d-flex flex-column flex-root app-root' id='kt_app_root'>
          <div className='app-page flex-column flex-column-fluid' id='kt_app_page'>
            <HeaderWrapper />
            <div className='app-wrapper flex-column flex-row-fluid' id='kt_app_wrapper'>
              {!isHiddenRoute && <Sidebar />} {/* Mostrar el Sidebar si no es una de las rutas ocultas */}
              <div className='app-main flex-column flex-row-fluid' id='kt_app_main'>
                <div className='d-flex flex-column flex-column-fluid'>
                  <Content>
                    <Outlet />
                  </Content>
                </div>
                <FooterWrapper />
              </div>
            </div>
          </div>
        </div>

        <ScrollTop />
      </ThemeModeProvider>
    </PageDataProvider>
  );
};

export { MasterLayout };
