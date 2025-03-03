import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SplashScreen } from './pages/SplashScreen';
import { Home } from './pages/Home';
import { SendWish } from './pages/SendWish';
import { ReceiveWish } from './pages/ReceiveWish';
import { WishSent } from './pages/WishSent';
import { WishPool } from './pages/WishPool';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SplashScreen />} />
        <Route path="/home" element={<Home />} />
        <Route path="/send" element={<SendWish />} />
        <Route path="/receive" element={<ReceiveWish />} />
        <Route path="/wish-sent" element={<WishSent />} />
        <Route path="/wish-pool" element={<WishPool />} />
      </Routes>
    </Router>
  );
}

export default App;