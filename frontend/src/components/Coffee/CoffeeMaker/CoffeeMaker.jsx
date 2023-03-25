import { NavLink, Route, Routes, useNavigate, Navigate, useLocation  } from "react-router-dom";
import "./CoffeeMaker.css";
import NewBrew from "./NewBrew";

const CoffeeMaker = (props) => {
  let location = useLocation();
  const navigate = useNavigate();

  const handleSubmit = async (data) => {
    const { brewName, typeOfBean, gramsOfCoffee, grindingSettings, litersWater } = data;
    const formData = { brewName, typeOfBean, gramsOfCoffee, grindingSettings, litersWater };
    await props.createBrew(formData);
    navigate("/");
  };

  return (
    <>
      <nav className="internal--nav__container">
        <ul className="internal--nav__list">
          <li className="internal--nav__item">
            <NavLink className="internal--nav__link" to="new-brew">
              Create a new brew
            </NavLink>
          </li>
          <li className="internal--nav__item">
            <NavLink className="internal--nav__link" to="previous-brew">
              Select previous brew
            </NavLink>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" index element={<Navigate to="new-brew" state={{ from: location }} replace />  } />
        <Route path="new-brew" index element={<NewBrew onSubmit={handleSubmit} {...props} />} />
        <Route path="previous-brew" element={<h1>Coming Soon...</h1>} />
      </Routes>
    </>
  );
};

export default CoffeeMaker;
