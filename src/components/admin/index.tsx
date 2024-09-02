import React, { useEffect, useState } from "react";
import { AdminDetail } from "./detail/index";
import { AdminRegister } from "./register";
import Table from "react-bootstrap/Table";
import "./style.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";

interface Hotel {
  id: number;
  name: string;
  description: string;
  price: number;
  postalCode: string;
  address: string;
  phoneNumber: string;
}

interface HotelListProps {
  hotels: Hotel[];
}

// 画面遷移制御
export function Admin() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HotelShow />} />
        <Route path="/detail/:id" element={<AdminDetail />} />
        <Route path="/detail/register" element={<AdminRegister />} />
      </Routes>
    </Router>
  );
}

const HotelShow = () => {
  const [hotels, setHotels] = useState<Hotel[]>();
  const navigate = useNavigate();

  // 旅館詳細画面へ遷移
  const MoveToDetail = (id: number) => {
    navigate(`/detail/${id}`, { state: { id } });
  };

  // 新規登録画面へ遷移
  const MoveToRegister = () => {
    navigate(`/detail/register`);
  };

  const HotelList: React.FC<HotelListProps> = ({ hotels }) => {
    return (
      <div className="wrapper">
        <main>
          <div className="container pt-4 pb-5 container">
            <div className="col-xxl-9 col-xl-10 col-lg-11">
              <h1 className="mb-4 text-center">民宿一覧</h1>

              <div className="d-flex justify-content-end">
                <button onClick={MoveToRegister} className="btn btn-dark mb-3">
                  新規登録
                </button>
              </div>

              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th scope="col">ID</th>
                    <th scope="col">民宿名</th>
                    <th scope="col">料金/泊</th>
                    <th scope="col">住所</th>
                    <th scope="col">電話番号</th>
                    <th scope="col">詳細</th>
                    <th scope="col">削除</th>
                  </tr>
                </thead>
                <tbody>
                  {hotels.map((hotel) => (
                    <tr key={hotel.id}>
                      <td>{hotel.id}</td>
                      <td>{hotel.name}</td>
                      <td>{hotel.price}円</td>
                      <td>{hotel.address}</td>
                      <td>{hotel.phoneNumber}</td>
                      <td>
                        <button
                          className="btn btn-primary"
                          onClick={() => MoveToDetail(hotel.id)}
                        >
                          詳細
                        </button>
                      </td>
                      <td>
                        <button
                          className="btn btn-danger"
                          onClick={() => MoveToDetail(hotel.id)}
                        >
                          削除
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </div>
        </main>
      </div>
    );
  };

  useEffect(() => {
    // 旅館一覧画面(管理)のAPI
    fetch("http://localhost:8080/admin/hotels", { method: "GET" })
      .then((res) => res.json())
      .then((data) => {
        setHotels(data);
      });
  }, []);

  if (hotels?.length !== 0 && hotels !== undefined) {
    return (
      <div>
        <HotelList hotels={hotels} />
      </div>
    );
  }
  return <p>No Data</p>;
};

export default HotelShow;
