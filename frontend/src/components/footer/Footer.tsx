import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer>
      <div
        style={{
          width: "100%",
          minHeight: "5vh",
          maxHeight: "10vh",
          marginTop: 100,
        }}
      >
        <p style={{ fontSize: "16px", textAlign: "center", padding: "20px" }}>
          You can find this repo here - 
          <span>
            <Link
              style={{ color: "white" }}
              className="nav-link"
              to={"https://github.com"}
            >
              github
            </Link>
          </span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;