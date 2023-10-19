import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LayoutBasic from '../layouts/LayoutBasic';
import Home from '../pages/Home/Home';
import Error404 from '../pages/Error404/Error404';
import User from '../pages/User';

const Navigation = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path='/'
          element={
            <LayoutBasic>
              <Home />
            </LayoutBasic>
          }
        />
        <Route
          path='/:username'
          element={
            <LayoutBasic>
              <User />
            </LayoutBasic>
          }
        />
        <Route
          path='*'
          element={
            <LayoutBasic>
              <Error404 />
            </LayoutBasic>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default Navigation;
