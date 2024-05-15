/* eslint-disable no-unused-vars */
import { Outlet, useNavigation } from 'react-router-dom';
import CartOverview from '../features/cart/CartOverview';
import Header from './Header';
import Loader from './Loader';

function AppLayout() {
  const navigation = useNavigation();
  // console.log(navigation);
  const isLoading = navigation.state === 'loading';

  return (
    //h-screen will give entire height of veiwprot
    // grid-rows-[auto_1fr_auto] will give header at top and footer at bottom and main at center
    <div className="grid h-screen grid-rows-[auto_1fr_auto]">
      {isLoading && <Loader />}
      <Header />
      {/* Outlet is used to render child routes */}
      {/* overflow-scroll will give scroll bar in main section */}
      {/* make the inner child that is marginally centered by using mx-auto and max-w-3xl to avoid not taking full width */}
      {/* <div className="overflow-scroll"> */}
      <div className="overflow-auto">
        <main className="mx-auto max-w-3xl">
          <Outlet />
        </main>
      </div>

      <CartOverview />
    </div>
  );
}

export default AppLayout;
