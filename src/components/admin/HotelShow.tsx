import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import "../../css/admin/style.css";

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

export const HotelShow = () => {
  const [hotels, setHotels] = useState<Hotel[]>();

  const HotelList: React.FC<HotelListProps> = ({ hotels }) => {
    return (
      <div className="wrapper">
        <main>
          <div className="container pt-4 pb-5 container">
            <div className="col-xxl-9 col-xl-10 col-lg-11">
              <h1 className="mb-4 text-center">民宿一覧</h1>

              <div className="d-flex justify-content-end">
                <a href="/" className="btn text-white shadow-sm mb-3 btn">
                  登録
                </a>
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
                        <a href="/">詳細</a>
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
