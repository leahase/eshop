import { Link } from "react-router-dom"
import "../styles/Home.css";

export const Home = () => {
    return (
        <>
    <div className="hero">
      <div className="heroContainer">
        <h1>welcome</h1>
        <p>find timeless furniture</p>
        <Link to="/products">
          check it out
        </Link>
      </div>
    </div>
        </>
    )
}