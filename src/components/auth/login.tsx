export const Login = () => {
  return (
    <main>
      <div className="container pt-4 pb-5 container">
        <div className="row justify-content-center">
          <div className="col-xl-3 col-lg-4 col-md-5 col-sm-7">
            <h1 className="mb-4 text-center">ログイン</h1>

            <div className="alert alert-danger">
              メールアドレスまたはパスワードが正しくありません。
            </div>

            <form method="post">
              <div className="form-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  name="username"
                  placeholder="メールアドレス"
                />
              </div>
              <div className="form-group mb-3">
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  placeholder="パスワード"
                />
              </div>

              <div className="d-flex justify-content-center my-4">
                <button
                  type="submit"
                  className="btn text-white shadow-sm w-100 btn btn-primary"
                >
                  ログイン
                </button>
              </div>
            </form>

            <div className="text-center">
              <a href="#">会員登録</a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
