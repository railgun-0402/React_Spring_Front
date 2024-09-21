import React, { useEffect, useState } from "react";
import { ConfirmDialog } from "../dialog/index";
import Table from "react-bootstrap/Table";
import axios from "axios";
import "./style.css";
import { Hotel } from "../../models/Hotel";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";

interface HotelListProps {
  hotels: Hotel[];
}

/* 検索ワード */
interface Search {
  word: string;
}

// 画面遷移制御
export function Admin() {
  return (
    <Router>
      <Routes>
        <Route path="/admin/hotels" element={<HotelShow />} />
      </Routes>
    </Router>
  );
}

const HotelShow = () => {
  /** アラート表示時間(ms) */
  const showAlertTime = 3000;
  /** 画面遷移 */
  const navigate = useNavigate();
  /** 削除API用 hotelId */
  const [id, setId] = useState(0);
  /** ホテル情報 */
  const [hotels, setHotels] = useState<Hotel[]>();
  /** ダイアログ表示制御 */
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  /** アラートメッセージ */
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  /** アラートデザイン */
  const [alertDesignName, setAlertDesignName] = useState<string | undefined>(
    ""
  );

  /* APIのURL*/
  const listAPIUrl = "http://localhost:8080/admin/hotels";
  const searchAPIUrl = "http://localhost:8080/admin/hotels/search";
  const deleteAPIUrl = "http://localhost:8080/admin/hotels/delete";

  const { register, handleSubmit } = useForm<Search>();

  // 旅館詳細画面へ遷移
  const MoveToDetail = (id: number) => {
    navigate(`/admin/hotels/detail/${id}`, { state: { id } });
  };

  // 新規登録画面へ遷移
  const MoveToRegister = () => {
    navigate(`/admin/hotels/detail/register`);
  };

  // 削除ボタン押下→ダイアログ表示
  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };

  // 確認ダイアログで「いいえ」を押下
  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  // 確認ダイアログで「はい」を押下
  const handleConfirm = async () => {
    // 施設削除APIを実行
    const response = await axios.get(`${deleteAPIUrl}/${id}`, {
      method: "GET",
    });
    console.log("API Response:", response);

    if (response.status === 200) {
      setAlertDesignName("alert alert-success");
      showAlert("削除が成功しました！");
    } else {
      setAlertDesignName("alert alert-danger");
      showAlert("削除が失敗しました・・・");
    }
    setIsDialogOpen(false);
  };

  // 検索ボタン押下時
  const handleSearch: SubmitHandler<Search> = async (data) => {
    // 空でAPIをリクエストするとエラーになる
    if (!data.word || data.word.trim() === "") return;

    // 施設検索API実行
    const url = `${searchAPIUrl}/${data.word}`;
    fetch(url, { method: "GET" })
      .then((res) => res.json())
      .then((data) => {
        setHotels(data);
      });
  };

  // アラート表示
  const showAlert = (message: string) => {
    setAlertMessage(message);
    setTimeout(() => {
      setAlertMessage(null);
    }, showAlertTime);
  };

  const HotelList: React.FC<HotelListProps> = ({ hotels }) => {
    return (
      <div className="wrapper">
        <main>
          <div className="container pt-4 pb-5 container">
            <div className="col-xxl-9 col-xl-10 col-lg-11">
              <h1 className="mb-4 text-center">民宿一覧</h1>

              {/* アラートの表示(追加/削除時に3秒間表示) */}
              {alertMessage && (
                <div className={alertDesignName} role="alert">
                  {alertMessage}
                </div>
              )}

              {/* 検索フォーム */}
              <div className="d-flex justify-content-between flex-wrap">
                <form className="mb-3" onSubmit={handleSubmit(handleSearch)}>
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control"
                      id="word"
                      placeholder="施設名"
                      {...register("word")}
                    />
                    <button
                      // onClick={handleSearch}
                      type="submit"
                      className="btn shadow-sm btn-primary"
                    >
                      検索
                    </button>
                  </div>
                </form>
              </div>

              {/* 新規登録ボタン */}
              <div className="d-flex justify-content-end">
                <button onClick={MoveToRegister} className="btn btn-dark mb-3">
                  新規登録
                </button>
              </div>

              {/* 削除時確認ダイアログ */}
              <ConfirmDialog
                isOpen={isDialogOpen}
                onClose={handleCloseDialog}
                onConfirm={handleConfirm}
              />

              {/* 施設一覧テーブル */}
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
                        {/* 施設詳細遷移 */}
                        <button
                          className="btn btn-primary"
                          onClick={() => MoveToDetail(hotel.id)}
                        >
                          詳細
                        </button>
                      </td>
                      <td>
                        {/* 施設詳細削除ボタン */}
                        <button
                          className="btn btn-danger"
                          onClick={() => {
                            setId(hotel.id);
                            handleOpenDialog();
                          }}
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
    fetch(listAPIUrl, { method: "GET" })
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
  // TODO: 見つからなかった用のページが欲しい
  return <p>No Data</p>;
};

export default HotelShow;
