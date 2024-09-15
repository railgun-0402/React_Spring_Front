import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import "./style.css";

// public画像のパス
const publicHotelImageDir = "/images/hotel";
const noImageDir = "/images/404";

interface Hotel {
  id: number;
  name: string;
  imageName: string;
  description: string;
  price: number;
  capacity: number;
  postalCode: string;
  address: string;
  phoneNumber: string;
}

interface HotelListProps {
  hotel: Hotel;
}

const HotelDetail: React.FC<HotelListProps> = ({ hotel }) => {
  // 画像が見つからない場合やDBから読み込めない場合
  const handleErr = (event: any) => {
    // NO IMAGE画像を出す
    event.target.src = `${noImageDir}/404img.jpeg`;
    event.target.alt = "画像が見つかりませんでした";
  };

  return (
    <div className="container pt-4 pb-5 container">
      <div className="row justify-content-center">
        <div className="col-xl-5 col-lg-6 col-md-8">
          {/* パンクズリスト */}
          <nav className="mb-4" aria-label="breadcrumb">
            <ol className="breadcrumb mb-0">
              <li className="breadcrumb-item">
                <a href="/admin/hotels">民宿一覧</a>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                民宿詳細
              </li>
            </ol>
          </nav>

          {/* タイトル */}
          <h1 className="mb-4 text-center">{hotel.name}</h1>

          {/* 編集 */}
          <div className="d-flex justify-content-end align-items-end mb-3">
            <div>
              <a href="/">編集</a>
            </div>
          </div>
          {/* ホテルの画像 */}
          <div className="mb-3">
            {hotel.imageName ? (
              <img
                src={`${publicHotelImageDir}/${hotel.imageName}`}
                className="w-100"
                alt="NOIMAGE"
                onError={handleErr}
              />
            ) : null}
            ;
          </div>

          {/* ホテルの詳細 */}
          <div className="container mb-4">
            <div className="row pb-2 mb-2 border-bottom">
              {/* ホテルID */}
              <div className="col-4">
                <span className="fw-bold">ID</span>
              </div>
              <div className="col">
                <span>{hotel.id}</span>
              </div>
            </div>

            {/* ホテル名 */}
            <div className="row pb-2 mb-2 border-bottom">
              <div className="col-4">
                <span className="fw-bold">ホテル名</span>
              </div>
              <div className="col">
                <span>{hotel.name}</span>
              </div>
            </div>

            {/* 説明 */}
            <div className="row pb-2 mb-2 border-bottom">
              <div className="col-4">
                <span className="fw-bold">説明</span>
              </div>
              <div className="col">
                <span className="pre-wrap">{hotel.description}</span>
              </div>
            </div>

            {/* 宿泊料金 */}
            <div className="row pb-2 mb-2 border-bottom">
              <div className="col-4">
                <span className="fw-bold">宿泊料金</span>
              </div>
              <div className="col">
                <span className="pre-wrap">
                  一泊：{hotel.price}円 (お一人様につき)
                </span>
              </div>
            </div>

            {/* 宿泊定員 */}
            <div className="row pb-2 mb-2 border-bottom">
              <div className="col-4">
                <span className="fw-bold">定員</span>
              </div>
              <div className="col">
                <span className="pre-wrap">{hotel.capacity}人</span>
              </div>
            </div>

            {/* 郵便番号 */}
            <div className="row pb-2 mb-2 border-bottom">
              <div className="col-4">
                <span className="fw-bold">郵便番号</span>
              </div>
              <div className="col">
                <span className="pre-wrap">{hotel.postalCode}</span>
              </div>
            </div>

            {/* 住所 */}
            <div className="row pb-2 mb-2 border-bottom">
              <div className="col-4">
                <span className="fw-bold">住所</span>
              </div>
              <div className="col">
                <span className="pre-wrap">{hotel.address}</span>
              </div>
            </div>

            {/* 電話番号 */}
            <div className="row pb-2 mb-2 border-bottom">
              <div className="col-4">
                <span className="fw-bold">電話番号</span>
              </div>
              <div className="col">
                <span className="pre-wrap">{hotel.phoneNumber}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const AdminDetail = () => {
  const params = useParams();
  const [hotel, setHotel] = useState<Hotel>();

  useEffect(() => {
    // 旅館一覧画面(管理)のAPI
    fetch(`http://localhost:8080/admin/hotels/detail/${params.id}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        setHotel(data);
      });
  });

  if (hotel !== undefined) {
    return (
      <div>
        <HotelDetail hotel={hotel} />
      </div>
    );
  }
  return <p>No Data</p>;
};
