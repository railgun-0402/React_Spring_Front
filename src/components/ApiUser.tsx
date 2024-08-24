import React, { useState, useEffect } from "react";

export const ApiUser = () => {
  interface User {
    id: number;
    name: string;
    password: string;
    coin: number;
  }

  const [user, setUser] = useState<User>();

  useEffect(() => {
    // API Fetch
    fetch("http://localhost:8080/test", { method: "GET" })
      // レスポンスのデータ形式をjsonに設定
      .then((res) => res.json())
      // レスポンスのデータのセット
      .then((data) => {
        setUser(data);
      });
  }, []);

  if (user) {
    return (
      <div>
        <ul>
          <li>{user?.id}</li>
          <li>{user?.name}</li>
          <li>{user?.coin}</li>
        </ul>
      </div>
    );
  }
  return <p>No Data</p>;
};
