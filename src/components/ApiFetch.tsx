import React, { useState, useEffect } from "react";

export const ApiFetch = () => {
  interface Stone {
    month: string;
    color: string;
    name: string;
  }

  const [stones, setStone] = useState<Stone>();

  useEffect(() => {
    // API Fetch
    fetch("http://localhost:8080/api", { method: "GET" })
      // レスポンスのデータ形式をjsonに設定
      .then((res) => res.json())
      // レスポンスのデータのセット
      .then((data) => {
        setStone(data);
      });
  }, []);

  if (stones) {
    return (
      <div>
        <ul>
          <li>{stones?.month}</li>
          <li>{stones?.color}</li>
          <li>{stones?.name}</li>
        </ul>
      </div>
    );
  }
  return <p>No Data</p>;
};
