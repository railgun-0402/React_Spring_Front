import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { User } from "../../models/User";
import { SubmitHandler, useForm } from "react-hook-form";

export const Login = () => {
  const [loginFailed, setLoginFailed] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<User>();
  const navigate = useNavigate();

  // ログインボタン押下時
  const OnSubmit: SubmitHandler<User> = (data) => {
    console.log("Form submitted:", data);
    const url = "http://localhost:8080/login";
    try {
      // 旅館新規追加のAPI
      const result = fetch(url, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(data),
      });

      console.log("success!");
      console.log(result);

      // 成功したらTop画面へ遷移
      navigate(`/`);
    } catch (error) {
      setLoginFailed(true);
      console.log("failed・・・");
      console.error(`error = ${error}`);
    }
  };

  return (
    <main>
      <div className="container pt-4 pb-5 container">
        <div className="row justify-content-center">
          <div className="col-xl-3 col-lg-4 col-md-5 col-sm-7">
            <h1 className="mb-4 text-center">ログイン</h1>

            {/* ログイン失敗時のエラー文言 */}
            {loginFailed && (
              <div className="alert alert-danger">
                ユーザIDまたはパスワードが正しくありません。
              </div>
            )}

            <form onSubmit={handleSubmit(OnSubmit)}>
              <div className="form-group row mb-3">
                {/* ユーザ名 */}
                <div className="col-md-4">
                  <label
                    htmlFor="name"
                    className="col-form-label text-md-left fw-bold"
                  >
                    ID
                  </label>
                </div>
                <div className="col-md-8">
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    placeholder="ユーザID"
                    {...register("name", {
                      required: "ユーザ名は必須です。",
                      validate: (value) =>
                        (value && value.length < 255) ||
                        "255文字以内で入力してください。",
                    })}
                  />
                  {errors.name && (
                    <span className="text-danger small mb-2">
                      {errors.name.message}
                    </span>
                  )}
                </div>
              </div>

              {/* パスワード */}
              <div className="form-group row mb-3">
                <div className="col-md-4">
                  <label
                    htmlFor="password"
                    className="col-form-label text-md-left fw-bold"
                  >
                    パスワード
                  </label>
                </div>
                <div className="col-md-8">
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="パスワード"
                    {...register("password", {
                      required: "パスワードは必須です。",
                      validate: (value) =>
                        (value && value.length < 255) ||
                        "255文字以内で入力してください。",
                    })}
                  />
                  {errors.password && (
                    <span className="text-danger small mb-2">
                      {errors.password.message}
                    </span>
                  )}
                </div>
              </div>

              {/* ログインボタン */}
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
              <a href="/">会員登録</a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
