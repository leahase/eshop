import { NavLink } from "react-router-dom";

export const Navbar = () => {
  return (
      <nav>
        <ul>
          <li>
            <NavLink to={"/"}>Home</NavLink>
          </li>
          <li>
            <NavLink to={"/Admin"}>Admin</NavLink>
          </li>
          <li>
            <NavLink to={"/Products"}>Products</NavLink>
          </li>
        </ul>
      </nav>
  );
};