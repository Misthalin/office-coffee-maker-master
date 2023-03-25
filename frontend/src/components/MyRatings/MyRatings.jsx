import React, { useEffect } from "react";
import moment from "moment";
import Loading from "../Loading/Loading";
import Error from "../Error/Error";
import Sort from "../Sort/Sort";
import Rate from "../Rate/Rate";
import Button from "../Button/Button";
import StarRatingDisplay from "../Coffee/CoffeeRecipe/StarRatingDisplay";

import "./MyRatings.css";

const MyRatings = ({
  fetchBrews,
  handleSort,
  sortBy,
  sortDirection,
  brews,
  selected,
  fetchMyVotes,
  myVotes,
  handleEditVote,
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
    if (myRatingValue(brew._id) !== undefined) {
      return (
        <div key={brew._id} className="brew">
          <p>
            Brewed at: <span className="text-bold">{moment(brew.brewedAt).format("DD/MM/YYYY")}</span>
          </p>
          <div className="brew-container">
            <div className="brew-details">
              <p className="brew-text">
                <span>Coffee:</span>
                <span className="text-bold">{brew.typeOfBean}</span>
              </p>
              <p className="brew-text">
                <span>Grinding Settings:</span>
                <span className="text-bold">{brew.grindingSettings}</span>
              </p>
              <p className="brew-text">
                <span>Water:</span>
                <span className="text-bold">{brew.litersWater}</span>
              </p>
              <p className="brew-text">
                <span>Number of votes:</span>
                <span className="text-bold">{brew.votes}</span>
              </p>
              <div className="brew-text">
                <span>Your rating</span>
                <span>
                  {/* A hack because starRatingDisplay doesn't recognice state change. */}
                  {newVoteExists(brew._id) && newMyRatingValue(brew._id) === 0 && <StarRatingDisplay ratingValue={newMyRatingValue(brew._id)} />}
                  {newVoteExists(brew._id) && newMyRatingValue(brew._id) === 1 && <StarRatingDisplay ratingValue={newMyRatingValue(brew._id)} />}
                  {newVoteExists(brew._id) && newMyRatingValue(brew._id) === 2 && <StarRatingDisplay ratingValue={newMyRatingValue(brew._id)} />}
                  {newVoteExists(brew._id) && newMyRatingValue(brew._id) === 3 && <StarRatingDisplay ratingValue={newMyRatingValue(brew._id)} />}
                  {newVoteExists(brew._id) && newMyRatingValue(brew._id) === 4 && <StarRatingDisplay ratingValue={newMyRatingValue(brew._id)} />}
                  {newVoteExists(brew._id) && newMyRatingValue(brew._id) === 5 && <StarRatingDisplay ratingValue={newMyRatingValue(brew._id)} />}
                  {!newVoteExists(brew._id) && myRatingValue(brew._id) === 0 && <StarRatingDisplay ratingValue={0} />}
                  {!newVoteExists(brew._id) && myRatingValue(brew._id) === 1 && <StarRatingDisplay ratingValue={1} />}
                  {!newVoteExists(brew._id) && myRatingValue(brew._id) === 2 && <StarRatingDisplay ratingValue={2} />}
                  {!newVoteExists(brew._id) && myRatingValue(brew._id) === 3 && <StarRatingDisplay ratingValue={3} />}
                  {!newVoteExists(brew._id) && myRatingValue(brew._id) === 4 && <StarRatingDisplay ratingValue={4} />}
                  {!newVoteExists(brew._id) && myRatingValue(brew._id) === 5 && <StarRatingDisplay ratingValue={5} />}
                </span>
              </div>
              <div className="rating-buttons">
                {isVoting && selected === brew._id && <Rate handleVote={handleEditVote} brewId={brew._id} />}
                {!isVoting && selected !== brew._id && <Button title="Edit rating" variant="long" onClickEvent={() => setIsVoting(true, brew._id)} />}
                {isVoting && selected !== brew._id && <Button title="Edit rating" variant="long" onClickEvent={() => setIsVoting(true, brew._id)} />}
              </div>
            </div>
          </div>
        </div>
      );
    }
    return null;
  });

  return (
    <>
      <Sort handleSort={handleSort} sortBy={sortBy} sortDirection={sortDirection} />
      {loading ? <Loading /> : listBrews}
    </>
  );
};

export default MyRatings;
