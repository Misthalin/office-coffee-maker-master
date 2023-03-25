import React from "react";
import "./Rate.css";

const Rate = ({ handleVote, brewId }) => {
  return (
    <>
      <form>
        <div className="rating-container">
          <div className="radio-input">
            <input onChange={handleVote} type="checkbox" name="vote" id="one" value="1" data-id={brewId} />
            <label htmlFor="one">1</label>
          </div>
          <div className="radio-input">
            <input onChange={handleVote} type="checkbox" name="vote" id="two" value="2" data-id={brewId} />
            <label htmlFor="two">2</label>
          </div>
          <div className="radio-input">
            <input onChange={handleVote} type="checkbox" name="vote" id="three" value="3" data-id={brewId} />
            <label htmlFor="three">3</label>
          </div>
          <div className="radio-input">
            <input onChange={handleVote} type="checkbox" name="vote" id="four" value="4" data-id={brewId} />
            <label htmlFor="four">4</label>
          </div>
          <div className="radio-input">
            <input onChange={handleVote} type="checkbox" name="vote" id="five" value="5" data-id={brewId} />
            <label htmlFor="five">5</label>
          </div>
        </div>
      </form>
    </>
  );
};

export default Rate;
