import React, { useState } from "react";
import { Hotel } from "../../../models/Hotel";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const HotelRegister = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<Hotel>();

  // フォームに画像を表示するための値
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const navigate = useNavigate();

  // アップロード画像ファイルの管理
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const name = file.name;
      setImageUrl(URL.createObjectURL(file));
      setValue("imageName", name);
    } else {
      setValue("imageName", "");
    }
  };

  // 送信ボタン押下時
  const OnSubmit: SubmitHandler<Hotel> = (data) => {
    console.log("Form submitted:", data);
    const url = "http://localhost:8080/admin/hotels/register";
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

      // 成功したら画面一覧に戻る
      navigate(`/`);
    } catch (error) {
      console.log("failed・・・");
      console.error(`error = ${error}`);
    }
  };

  return (
    <>
      <div className="container pt-4 pb-5 samuraitravel-container">
        <div className="row justify-content-center">
          <div className="col-xl-5 col-lg-6 col-md-8">
            <nav className="mb-4" aria-label="breadcrumb">
              <ol className="breadcrumb mb-0">
                <li className="breadcrumb-item">
                  <a href="/admin/hotels">民宿一覧</a>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  民宿登録
                </li>
              </ol>
            </nav>
            <h1 className="mb-4 text-center">民宿登録</h1>

            <form onSubmit={handleSubmit(OnSubmit)}>
              {/* 宿泊施設名 */}
              <div className="form-group row mb-3">
                <div className="col-md-4">
                  <label
                    htmlFor="name"
                    className="col-form-label text-md-left fw-bold"
                  >
                    宿泊施設名
                  </label>
                </div>

                <div className="col-md-8">
                  <input
                    placeholder="必須"
                    className="form-control"
                    type="text"
                    id="name"
                    {...register("name", {
                      required: "宿泊施設名は必須です。",
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

              {/* 施設画像 */}
              <div className="form-group row mb-3">
                <div className="col-md-4">
                  <label
                    className="col-form-label text-md-left fw-bold"
                    htmlFor="image"
                  >
                    画像
                  </label>
                </div>
                <div className="col-md-8">
                  <input
                    type="file"
                    className="form-control"
                    id="image"
                    accept="image/*"
                    {...register("image", {
                      required: "画像のアップロードは必須です。",
                      onChange: (e) => {
                        handleFileChange(e);
                        return e.target.files?.[0].name;
                      },
                    })}
                  />
                  {errors.image && (
                    <span className="text-danger small mb-2">
                      {errors.image.message}
                    </span>
                  )}
                </div>
              </div>
              {/* 選択された画像の表示場所 */}
              {imageUrl && (
                <div>
                  <img
                    src={imageUrl}
                    alt="Preview"
                    style={{
                      maxWidth: "65%",
                      marginTop: "10px",
                      marginBottom: "15px",
                      marginLeft: "185px",
                    }}
                  />
                </div>
              )}

              {/* 施設説明 */}
              <div className="form-group row mb-3">
                <div className="col-md-4">
                  <label
                    className="col-form-label text-md-left fw-bold"
                    htmlFor="description"
                  >
                    説明
                  </label>
                </div>

                <div className="col-md-8">
                  <textarea
                    placeholder="必須"
                    className="form-control"
                    id="description"
                    {...register("description", {
                      required: "宿泊説明は必須です。",
                    })}
                    cols={30}
                    rows={5}
                  />
                  {errors.description && (
                    <span className="text-danger small mb-2">
                      {errors.description.message}
                    </span>
                  )}
                </div>
              </div>

              {/* 宿泊料金 */}
              <div className="form-group row mb-3">
                <div className="col-md-4">
                  <label
                    htmlFor="price"
                    className="col-form-label text-md-left fw-bold"
                  >
                    宿泊料金(円)
                  </label>
                </div>

                <div className="col-md-8">
                  <input
                    placeholder="必須"
                    className="form-control"
                    type="text"
                    id="price"
                    {...register("price", {
                      required: "宿泊料金は必須です。",
                      pattern: {
                        value: /^[0-9]+$/,
                        message: "宿泊料金は数字で入力してください。",
                      },
                    })}
                  />
                  {errors.price && (
                    <span className="text-danger small mb-2">
                      {errors.price.message}
                    </span>
                  )}
                </div>
              </div>

              {/* 定員 */}
              <div className="form-group row mb-3">
                <div className="col-md-4">
                  <label
                    className="col-form-label text-md-left fw-bold"
                    htmlFor="capacity"
                  >
                    定員(人)
                  </label>
                </div>

                <div className="col-md-8">
                  <input
                    className="form-control"
                    placeholder="必須"
                    type="text"
                    id="capacity"
                    {...register("capacity", {
                      required: "定員は必須です。",
                      pattern: {
                        value: /^[0-9]+$/,
                        message: "定員は数字で入力してください。",
                      },
                    })}
                  />
                  {errors.capacity && (
                    <span className="text-danger small mb-2">
                      {errors.capacity.message}
                    </span>
                  )}
                </div>
              </div>

              {/* 郵便番号 */}
              <div className="form-group row mb-3">
                <div className="col-md-4">
                  <label
                    htmlFor="postalCode"
                    className="col-form-label text-md-left fw-bold"
                  >
                    郵便番号
                  </label>
                </div>

                <div className="col-md-8">
                  <input
                    placeholder="123-4567"
                    className="form-control"
                    type="text"
                    id="postalCode"
                    {...register("postalCode", {
                      required: "郵便番号は必須です。",
                      pattern: {
                        value: /^[0-9]{3}-?[0-9]{4}$/,
                        message:
                          "正しい郵便番号を入力してください（例: 123-4567）。",
                      },
                    })}
                  />
                  {errors.postalCode && (
                    <span className="text-danger small mb-2">
                      {errors.postalCode.message}
                    </span>
                  )}
                </div>
              </div>

              {/* 住所 */}
              <div className="form-group row mb-3">
                <div className="col-md-4">
                  <label
                    className="col-form-label text-md-left fw-bold"
                    htmlFor="address"
                  >
                    住所:
                  </label>
                </div>

                <div className="col-md-8">
                  <input
                    placeholder="必須"
                    className="form-control"
                    type="text"
                    id="address"
                    {...register("address", { required: "住所は必須です。" })}
                  />
                  {errors.address && (
                    <span className="text-danger small mb-2">
                      {errors.address.message}
                    </span>
                  )}
                </div>
              </div>

              {/* 電話番号 */}
              <div className="form-group row mb-3">
                <div className="col-md-4">
                  <label
                    className="col-form-label text-md-left fw-bold"
                    htmlFor="phoneNumber"
                  >
                    電話番号
                  </label>
                </div>

                <div className="col-md-8">
                  <input
                    className="form-control"
                    placeholder="090-XXXX-XXXX"
                    type="text"
                    id="phoneNumber"
                    {...register("phoneNumber", {
                      required: "電話番号は必須です。",
                      pattern: {
                        value: /^[0-9]{2,4}-[0-9]{2,4}-[0-9]{4}$/,
                        message:
                          "正しい電話番号を入力してください（例: 03-1234-5678）。",
                      },
                    })}
                  />
                  {errors.phoneNumber && (
                    <span className="text-danger small mb-2">
                      {errors.phoneNumber.message}
                    </span>
                  )}
                </div>
              </div>

              <div className="form-group d-flex justify-content-center my-4">
                <button
                  type="submit"
                  className="btn btn-primary shadow-sm w-50"
                >
                  登録
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export const AdminRegister = () => {
  return (
    <div>
      <HotelRegister />
    </div>
  );
};
