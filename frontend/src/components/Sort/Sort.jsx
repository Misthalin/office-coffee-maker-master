import React from "react";
import './Sort.css'

const Sort = ({ handleSort, sortBy, sortDirection }) => {
  return (
    <>
      <p>
        <span>Sort by: </span>
        <span className="text-bold">
          {sortBy === "brewedAt"
            ? "Date"
            : sortBy === "rating"
            ? "Rating"
            : sortBy === "typeOfBean"
            ? "Bean"
            : sortBy === "litersWater"
            ? "Water"
            : sortBy === "grindingSettings"
            ? "Grinding"
            : "None"}{" "}
          {sortDirection === "descending" ? "Descending" : sortDirection === "ascending" ? "Ascending" : " "}
        </span>
      </p>
      <form>
        <div className="radio-grid">
          <div className="radio-input">
            <input onChange={handleSort} type="radio" name="sortBy" id="brewedAt" value="brewedAt" defaultChecked />
            <label htmlFor="brewedAt">Date</label>
          </div>
          <div className="radio-input">
            <input onChange={handleSort} type="radio" name="sortBy" id="rating" value="rating" />
            <label htmlFor="rating">Rating</label>
          </div>
          <div className="radio-input">
            <input onChange={handleSort} type="radio" name="sortBy" id="typeOfBean" value="typeOfBean" />
            <label htmlFor="typeOfBean">Bean</label>
          </div>
          <div className="radio-input">
            <input onChange={handleSort} type="radio" name="sortBy" id="litersWater" value="litersWater" />
            <label htmlFor="litersWater">Water</label>
          </div>
          <div className="radio-input">
            <input onChange={handleSort} type="radio" name="sortBy" id="grindingSettings" value="grindingSettings" />
            <label htmlFor="grindingSettings">Grinding</label>
          </div>
        </div>
        <div className="radio-grid">
          <div className="radio-input">
            <input onChange={handleSort} type="radio" name="sortDirection" id="descending" value="descending" defaultChecked />
            <label htmlFor="descending">Descending</label>
          </div>
          <div className="radio-input">
            <input onChange={handleSort} type="radio" name="sortDirection" id="ascending" value="ascending" />
            <label htmlFor="ascending">Ascending</label>
          </div>
        </div>
      </form>
    </>
  );
};

export default Sort;
