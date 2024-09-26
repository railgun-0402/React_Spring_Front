import { useState, useEffect } from "react";
import { ConfirmDialog } from "../../../dialog/index";
import Table from "react-bootstrap/Table";
import { useNavigate } from "react-router-dom";
import { User } from "../../../../models/User";

interface UserProps {
  users: User[];
}

export const AdminUsers = () => {
  /** 画面遷移 */
  const navigate = useNavigate();
  /** ホテル情報 */
  const [users, setUsers] = useState<User[]>();
  /** 削除API用 hotelId */
  const [id, setId] = useState(0);
  /** ダイアログ表示制御 */
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  // 新規登録画面へ遷移
  const MoveToRegister = () => {
    navigate(`/admin/hotels/detail/register`);
  };
  /* APIのURL*/
  const usersListAPIUrl = "http://localhost:8080/admin/users";

  // 旅館詳細画面へ遷移
  const MoveToDetail = (id: number) => {
    navigate(`/admin/hotels/detail/${id}`, { state: { id } });
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
    console.log("handleConfirm");
  };

  const UsersList: React.FC<UserProps> = ({ users }) => {
    return (
      <div className="wrapper">
        <main>
          <div className="container pt-4 pb-5 container">
            <div className="col-xxl-9 col-xl-10 col-lg-11">
              <h1 className="mb-4 text-center">会員一覧</h1>

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
                    <th scope="col">氏名</th>
                    <th scope="col">ふりがな</th>
                    <th scope="col">メールアドレス</th>
                    <th scope="col">詳細</th>
                    <th scope="col">削除</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id}>
                      <td>{user.id}</td>
                      <td>{user.name}</td>
                      <td>{user.furigana}</td>
                      <td>{user.email}</td>
                      <td>
                        {/* 施設詳細遷移 */}
                        <button
                          className="btn btn-primary"
                          onClick={() => MoveToDetail(user.id)}
                        >
                          詳細
                        </button>
                      </td>
                      <td>
                        {/* 施設詳細削除ボタン */}
                        <button
                          className="btn btn-danger"
                          onClick={() => {
                            setId(user.id);
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
    fetch(usersListAPIUrl, { method: "GET" })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setUsers(data);
      });
  }, []);

  if (users?.length !== 0 && users !== undefined) {
    return (
      <div>
        <UsersList users={users} />
      </div>
    );
  }
  // TODO: 見つからなかった用のページが欲しい
  return <p>No Data</p>;
};
