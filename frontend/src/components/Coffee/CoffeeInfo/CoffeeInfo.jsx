// Inspired by previous obligs
import "./CoffeeInfo.css";

import Moment from "react-moment";
import moment from "moment";
import "moment-timezone";

const [HOT_MINUTES, WARM_MINUTES, COLD_MINUTES] = [90, 150, 150];

function getCoffeeStatus(minutesSinceBrewed) {
  let status;
  switch (true) {
    case minutesSinceBrewed < HOT_MINUTES:
      status = "Hot";
      break;
    case minutesSinceBrewed >= HOT_MINUTES && minutesSinceBrewed < WARM_MINUTES:
      status = "Warm";
      break;
    case minutesSinceBrewed >= COLD_MINUTES:
      status = "Cold";
      break;
    default:
      status = "Unknown";
      break;
  }

  return status;
}

const CoffeeInfo = (props) => {
  // another way of declaring the props- Destructuring, props.brewedAt, etc... vs all the props inside an object props.settings
  //const CoffeeInfo = ({ brewedAt=new Date(), litersBrewed='Unknown', typeOfCoffee='Unknown', coffeeLeft='Unknown' }) => {

  // storing props in local variables and giving them default values
  const { brewedAt = new Date(), litersBrewed = "Unknown", typeOfCoffee = "Unknown", coffeeLeft = "Unknown" } = { ...props };

  const calendarStrings = {
    lastDay: "[Yesterday] ",
    sameDay: "[Today]",
    nextDay: "DD/MM/YYYY",
    lastWeek: "DD/MM/YYYY",
    sameElse: "DD/MM/YYYY",
  };

  const diff = moment().diff(brewedAt, "minutes");
  // console.log("dif - ", diff);
  //Less than 90' -> hot
  //90' to 150' -> warm
  // >150' -> cold

  return (
    <ul className="info--list">
      <li className="info--list__item">
        <span className="text-light">Brewed</span>
        <Moment className="text-bold" calendar={calendarStrings}>
          {brewedAt}
        </Moment>
      </li>
      <li className="info--list__item">
        <span className="text-light">Time</span>
        <Moment className="text-bold" format="hh:mm[h]">
          {brewedAt}
        </Moment>
      </li>
      <li className="info--list__item">
        <span className="text-light">Liters brewed</span>
        <span className="text-bold">{litersBrewed}</span>
      </li>
      <li className="info--list__item">
        <span className="text-light">Type of coffee</span>
        <span className="text-bold">{typeOfCoffee}</span>
      </li>
      <li className="info--list__item">
        <span className="text-light">Coffee left</span>
        <span className="text-bold">{coffeeLeft}</span>
      </li>
      <li className="info--list__item">
        <span className="text-light">Status</span>
        {/* Option a - declarative with JSX */}
        {/* {diff < 90 && `Hot`}
                    {diff >= 90 && diff < 150 && `Warm`}
                    {diff >= 150 && `Cold`} */}
        {/* Option b - using function */}
        <span className="text-bold">{getCoffeeStatus(diff)}</span>
      </li>
    </ul>
  );
};

export default CoffeeInfo;
