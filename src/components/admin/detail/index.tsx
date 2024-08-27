import { useParams } from "react-router-dom";

export const AdminDetail = () => {
  const params = useParams();
  return (
    <div className="hoge">
      <h1>画面遷移成功！</h1>
      <h2>{params.id}</h2>
    </div>
  );
};
