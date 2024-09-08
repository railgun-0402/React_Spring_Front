import Admin from "../admin/index";
import { Login } from "../auth/login";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import "./style.css";

// 画面遷移制御
export function HomeScreen() {
  return (
    <Router>
      <Routes>
        {/* Top画面 */}
        <Route path="/" element={<Home />} />
        {/* Login画面 */}
        <Route path="/login" element={<Login />} />
        {/* ホテル管理画面 */}
        <Route path="/admin/hotels" element={<Admin />} />
      </Routes>
    </Router>
  );
}

export const Home = () => {
  /** 画面遷移 */
  const navigate = useNavigate();

  /** ホテル画面遷移 */
  const MoveToHotel = () => {
    navigate(`/admin/hotels`);
  };

  return (
    <>
      <div className="container">
        <div className="text-center my-5">
          <h1 className="mb-4 title">管理画面</h1>

          {/* 画面遷移メニュー */}
          <div className="row justify-content-center">
            {/* ホテル管理画面遷移 */}
            <div className="col-md-4">
              <div
                className="card custom-card"
                onClick={MoveToHotel}
                style={{ cursor: "pointer" }}
              >
                <div className="card-body">
                  <h5 className="card-title text-primary">ホテル管理</h5>
                  <p className="card-text">ホテルの一覧を管理します。</p>
                </div>
              </div>
            </div>

            {/* ユーザ管理画面遷移 */}
            <div className="col-md-4">
              <div className="card custom-card">
                <div className="card-body">
                  <h5 className="card-title text-success">ユーザ管理</h5>
                  <p className="card-text">ユーザの管理を行います。</p>
                </div>
              </div>
            </div>

            {/* その他管理画面遷移 */}
            <div className="col-md-4">
              <div className="card custom-card">
                <div className="card-body">
                  <h5 className="card-title text-warning">その他管理</h5>
                  <p className="card-text">その他の設定を管理します。</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
