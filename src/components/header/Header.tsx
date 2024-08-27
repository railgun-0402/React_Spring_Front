import "./style.css";
import logo from "../../images/header/logo.png";

export const Header = () => {
  return (
    <nav className="navbar navbar-expand-md navbar-light bg-white shadow-sm samuraitravel-navbar">
      <div className="container container">
        <a className="navbar-brand" href="/">
          <img className="logo me-1" src={logo} alt="Enjoyble Travel" />
        </a>
      </div>
    </nav>
  );
};
