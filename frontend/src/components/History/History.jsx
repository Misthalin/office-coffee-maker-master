import React, { useEffect } from "react";
import moment from "moment";
import Loading from "../Loading/Loading";
import Error from "../Error/Error";
import Sort from "../Sort/Sort";
import Rate from "../Rate/Rate";
import Button from "../Button/Button";
import StarRatingDisplay from "../Coffee/CoffeeRecipe/StarRatingDisplay";

import "./History.css";

const History = ({
  fetchBrews,
  handleSort,
  sortBy,
  sortDirection,
  brews,
  selected,
  fetchMyVotes,
  myVotes,
  handleVote,
  setIsVoting,
  isVoting,
  votedFor,
  loading,
  error,
}) => {
  useEffect(() => {
    fetchBrews();
    fetchMyVotes();
  }, [fetchBrews, fetchMyVotes]);

  if (error) {
    return <Error />;
  }

  // functions to avoid unecessesary fetches from database.
  const voteExists = (brewId) => {
    return myVotes.some((el) => {
      return el.brewId === brewId;
    });
  };
  const myRatingValue = (brewId) => {
    for (let i = 0; i < myVotes.length; i++) {
      if (brewId === myVotes[i].brewId) {
        return myVotes[i].value;
      }
    }
  };
  const newVoteExists = (brewId) => {
    return votedFor.some((el) => {
      return el.brewId === brewId;
    });
  };
  const newMyRatingValue = (brewId) => {
    for (let i = 0; i < votedFor.length; i++) {
      if (brewId === votedFor[i].brewId) {
        return votedFor[i].value;
      }
    }
  };

  const listBrews = brews.map((brew) => {
    return (
      <div key={brew._id} className="history">
        <p>
          Brewed at: <span className="text-bold">{moment(brew.brewedAt).format("DD/MM/YYYY")}</span>
        </p>
        <div className="history-container">
          <div className="history-details">
            <p className="history-text">
              <span>Coffee:</span>
              <span className="text-bold">{brew.typeOfBean}</span>
            </p>
            <p className="history-text">
              <span>Grinding Settings:</span>
              <span className="text-bold">{brew.grindingSettings}</span>
            </p>
            <p className="history-text">
              <span>Water:</span>
              <span className="text-bold">{brew.litersWater}</span>
            </p>
            <p className="history-text">
              <span>Number of votes:</span>
              <span className="text-bold">{brew.votes}</span>
            </p>
            <div className="history-text">
              <span>Rating: </span>
              <span>
                {/* A hack because starRatingDisplay doesn't recognice state change. */}
                {brew.rating === 1 && <StarRatingDisplay ratingValue={1} />}
                {brew.rating === 1.5 && <StarRatingDisplay ratingValue={1.5} />}
                {brew.rating === 2 && <StarRatingDisplay ratingValue={2} />}
                {brew.rating === 2.5 && <StarRatingDisplay ratingValue={2.5} />}
                {brew.rating === 3 && <StarRatingDisplay ratingValue={3} />}
                {brew.rating === 3.5 && <StarRatingDisplay ratingValue={3.5} />}
                {brew.rating === 4 && <StarRatingDisplay ratingValue={4} />}
                {brew.rating === 4.5 && <StarRatingDisplay ratingValue={4.5} />}
                {brew.rating === 5 && <StarRatingDisplay ratingValue={5} />}
              </span>
            </div>
            {
              /* 1. Display your rating if already voted */
              voteExists(brew._id) ? (
                <div className="history-text">
                  <span>Your rating: </span>{" "}
                  <span>
                    <StarRatingDisplay ratingValue={myRatingValue(brew._id)} />
                  </span>
                </div>
              ) : /* 2. Display your rating if you just voted */
                newVoteExists(brew._id) ? (
                  <div className="history-text">
                    <span>Your rating:</span>
                    <span>
                      <StarRatingDisplay ratingValue={newMyRatingValue(brew._id)} />
                    </span>
                  </div>
                ) : /* 3. Display button if not voting for this specific brew */
                  isVoting === false ? (
                    <div>
                      <Button title="Rate" variant="long" onClickEvent={() => setIsVoting(true, brew._id)} />
                    </div>
                  ) : /* 4. Display voting form if Rate button hase been pressed */
                    isVoting === true && selected === brew._id ? (
                      <Rate handleVote={handleVote} brewId={brew._id} />
                    ) : (
                        /* 5. Display Rate button */
                        <div>
                          <Button title="Rate" variant="long" onClickEvent={() => setIsVoting(true, brew._id)} />
                        </div>
                      )
            }
          </div>
        </div>
      </div>
    );
  });

  return (
    <>
      <Sort handleSort={handleSort} sortBy={sortBy} sortDirection={sortDirection} />
      {loading ? <Loading /> : listBrews}
    </>
  );
};

export default History;
