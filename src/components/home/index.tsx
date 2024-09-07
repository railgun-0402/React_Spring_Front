import Admin from "../admin/index";
import { Login } from "../auth/login";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";

// 画面遷移制御
export function HomeScreen() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin/hotels" element={<Admin />} />
      </Routes>
    </Router>
  );
}

export const Home = () => {
  /** 画面遷移 */
  const navigate = useNavigate();

  const MoveToHotel = () => {
    navigate(`/admin/hotels`);
  };

  return (
    <>
      <h1>Top</h1>
      <button onClick={MoveToHotel}>ホテル一覧画面へ遷移</button>
    </>
  );
};
