import axios from "./axios";

// Brews
const fetchBrews = (header) => {
  return axios.get("/api/brews", header);
};
const createBrew = (header, data) => {
  return axios.post("/api/brews", data, header);
};
const updateBrew = (header, id, data) => {
  return axios.put(`api/brews/${id}`, data, header);
};
const deleteBrew = (header, id) => {
  return axios.delete(`api/brews/${id}`, header);
};
const getLatestBrew = (header) => {
  return axios.get("/api/brews/newest-brew", header);
};

// Beans
const fetchBeans = (header) => {
  return axios.get("/api/beans", header);
};
const addBean = (header, data) => {
  return axios.post("/api/beans", data, header);
};
const editBean = (header, id, data) => {
  return axios.put(`/api/beans/${id}`, data, header);
};
const deleteBean = (header, id) => {
  return axios.delete(`/api/beans/${id}`, header);
};

// Votes
const fetchMyVotes = (header) => {
  return axios.get(`/api/votes/my-votes`, header);
};
const updateVote = (header, data) => {
  return axios.put("/api/votes", data, header);
};
const voteForBrew = (header, data) => {
  return axios.post("/api/votes", data, header);
};
const getVotesForBrew = (header, id) => {
  return axios.get(`/api/votes/brew-specific`, id, header);
};

export {
  fetchBeans,
  fetchBrews,
  createBrew,
  addBean,
  editBean,
  deleteBean,
  fetchMyVotes,
  getLatestBrew,
  updateBrew,
  deleteBrew,
  updateVote,
  voteForBrew,
  getVotesForBrew,
};
