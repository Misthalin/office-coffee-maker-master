import React, { Component } from "react";
import { fetchBrews, voteForBrew, fetchMyVotes, updateVote } from "../../api/coffeeCalls";
import { AuthContext } from "../../utils/AuthContext";
import { dynamicSort } from "../../utils/functions";
import toast from 'react-hot-toast';

function brewHOC(WrappedComponent) {
    class BrewHOC extends Component {
        _isMounted = false;
        static contextType = AuthContext;
        constructor(props) {
            super(props);
            this.state = {
                error: null,
                loading: true,
                isVoting: false,
                hasVoted: false,
                votedFor: [{}],
                vote: null,
                myVotes: [],
                fetchMyVotes: [],
                selected: "",
                sortBy: "brewedAt",
                sortDirection: "descending",
                brews: [],
            };
        }

        componentDidMount() {
            this._isMounted = true;
        }
        componentWillUnmount() {
            this._isMounted = false;
        }

        fetchBrews = async () => {
            const header = this.context.generateHeaders();
            try {
                const response = await fetchBrews(header);
                const data = response.data;
                const brewsUnsorted = data.map((brew) => {
                    return brew;
                });
                // set default sort
                const brews = brewsUnsorted.sort(dynamicSort(this.state.sortBy, this.state.sortDirection));
                if (this._isMounted) {
                    this.setState({
                        brews,
                        fetchBrews: true,
                        error: null,
                        loading: false,
                    });
                }
            } catch (error) {
                if (this._isMounted) {
                    this.setState({
                        loading: true,
                        error,
                    });
                }
            }
        }

        fetchMyVotes = async () => {
            const header = this.context.generateHeaders();
            try {
                const response = await fetchMyVotes(header);
                const data = response.data;
                const myVotes = data.map((vote) => {
                    return vote;
                });
                if (this._isMounted) {
                    this.setState({
                        myVotes,
                        fetchMyVotes: true,
                        error: null,
                        loading: false,
                    });
                }
            } catch (error) {
                if (this._isMounted) {
                    this.setState({
                        loading: true,
                        error,
                    });
                }
            }
        }

        handleSort = (e) => {
            if (e) {
                const target = e.target;
                const value = target.value;
                const name = target.name;
                const brews = this.state.brews;
                if (name === 'sortDirection') {
                    const direction = value;
                    const property = this.state.sortBy;
                    brews.sort(dynamicSort(property, direction));
                    this.setState({ [name]: value });
                    return
                } else {
                    const direction = this.state.sortDirection;
                    const property = value;
                    brews.sort(dynamicSort(property, direction));
                    this.setState({ [name]: value });
                }
            }
        };

        setIsVoting = (bool, selected) => {
            this.setState({ isVoting: bool, selected })
        };

        handleVote = async (e) => {                                                               /////////////////////////////////////
            const header = this.context.generateHeaders();                                        // ⢸⣿⠿⠛⠛⠿⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⣶⣾⣗⣂⡀⠄⠄⠄⠄⠄⠄⠄⠄
            const userId = this.context.user.id;                                                  // ⢸⢀⣠⣤⣤⣄⠄⠉⠛⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⠋⠄⠄⠄⠄⠄⠄⠄⠄
            if (e) {                                                                              // ⢸⣿⠫⢁⣥⣤⣤⡁⠢⣤⣿⣿⣿⡿⠛⠻⣿⠿⠿⠙⠃⠄⠄⠄⠄⠄⠄⠄⠄⠄
                const target = e.target;                                                          // ⢸⣿⡇⠛⠉⠍⠉⠄⠄⠈⣿⣿⣿⠃⠄⠄⠄⠄⠄⠄⠄⠄⣀⠄⠄⠄⠄⠄⠄⠄
                const value = parseInt(target.value);                                             // ⢸⣿⣶⣤⡠⠄⠼⠗⠄⢠⣿⣿⡿⠂⠄⠄⠄⠄⢐⢛⠛⠥⠄⠄⠄⠄⠄⠄⠄⠄
                const name = target.name;                                                         // ⢸⣿⣿⣿⣅⣐⣀⣤⣴⣿⣿⡿⠄⠄⠄⠄⠈⣊⣁⠑⠠⠄⠄⠄⠄⠄⠄⠄⠐⠄
                const brewId = target.dataset.id;                                                 // ⢸⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠄⡀⠄⠄⠄⠄⠻⣿⣿⣶⣦⣤⣀⣤⣔⠄⠄⠄⠄
                const data = { brewId, userId, value }                                            // ⢸⣿⣿⣿⣿⠿⢋⣽⣿⣿⡿⠋⠄⠄⠄⠄⠄⠄⠈⠸⣿⣿⣿⡿⠉⠁⠄⠄⠄⠄
                this.setState({ [name]: value });                                                 // ⢸⣿⣿⡿⠁⣠⡾⠋⠉⠁⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠈⠙⠉⠄⠄⠄⠄⠄⠄⠄
                try {                                                                             // ⢸⣿⣿⣗⠜⠋⠄⠄⠄⣀⣀⣀⠄⠄⠄⠄⠄⠄⠄⠄⠄⠹⣤⠄⠄⠄⠄⠄⠄⠄
                    const response = await voteForBrew(header, data);                             // ⢸⣿⡿⢻⣿⣦⣼⣷⣦⣤⠭⠍⠉⠙⠈⠄⠄⠄⠄⠄⠄⠄⠘⣷⡀⠄⠄⠄⠄⠄
                    if (response.status === 200) {                                                // ⢸⣿⠄⣠⡿⢟⢿⣿⣿⡟⠉⠉⠉⠉⠓⠒⠄⠄⠄⠰⠊⠓⠂⠉⠁⠄⠄⠄⠄⠄
                        if(this._isMounted) {                                                     // ⢸⣿⠄⠄⠄⠄⠚⣿⣿⣿⣁⣠⣤⡀⡄⠄⢀⣀⣀⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄
                            const oldBrew = this.state.brews.filter(b => b._id === brewId)[0];    // ⢸⠏⠄⠄⠄⠄⠄⠹⠿⢿⣿⣿⠿⠛⠂⠊⠈⠉⠁⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄
                            const tempVoteCount = oldBrew.votes + 1;                              /////////////////////////////////////
                            const tempAvgRating = (oldBrew.rating + value - 1) / tempVoteCount
                            const newDetails = { votes: tempVoteCount, rating: tempAvgRating }
                            const newBrews = this.state.brews.map(brew => { 
                                // update array of objects without changing order
                                return brew._id === brewId ? {...brew, ...newDetails} : {...brew}
                            })
                            this.setState(prevState => ({
                                brews: newBrews,
                                hasVoted: true,
                                votedFor: [...prevState.votedFor, {brewId, value}],
                                loading: false,
                            }))
                            toast('Vote submitted!', {id: 'votebrewsuccess'})
                        } else {
                            toast.error('Vote failed!', {id: 'votebrewerror'})
                        }
                    }
                } catch (error) {
                    if (this._isMounted) {
                        this.setState({
                            loading: true,
                            hasVoted: true,
                            error,
                        });
                    }
                }
            }
        }

        handleEditVote = async (e) => {                                                          
            const header = this.context.generateHeaders();                                       
            const userId = this.context.user.id;                                                   
            if (e) {                                                                               
                const target = e.target;                                                          
                const value = parseInt(target.value);                                              
                const name = target.name;                                                          
                const brewId = target.dataset.id;                                                 
                const data = { brewId, userId, value }                                             
                this.setState({ [name]: value });                                                  
                try {                                                                              
                    const response = await updateVote(header, data);                              
                    if (response.status === 200) {                                                
                        if(this._isMounted) {                                                     
                            this.setState(prevState => ({
                                hasVoted: true,
                                isVoting: false,
                                selected: "",
                                votedFor: [{brewId, value}, ...prevState.votedFor ],
                                loading: false,
                            }))
                            toast('Vote submitted!', {id: 'votebrewsuccess'})
                        }
                    } else {
                        toast.error('Vote failed!', {id: 'votebrewerror'})
                    }
                    
                } catch (error) {
                    if (this._isMounted) {
                        this.setState({
                            loading: true,
                            hasVoted: true,
                            error,
                        });
                        
                    }
                }
            }
        }

        render() {
            return (
                <>
                    <WrappedComponent
                        loading={this.state.loading}
                        error={this.state.error}
                        isVoting={this.state.isVoting}
                        selected={this.state.selected}
                        votedFor={this.state.votedFor}
                        myVotes={this.state.myVotes}
                        fetchMyVotes={this.fetchMyVotes}
                        handleVote={this.handleVote}
                        handleEditVote={this.handleEditVote}
                        setIsVoting={this.setIsVoting}
                        fetchBrews={this.fetchBrews}
                        handleSort={this.handleSort}
                        sortBy={this.state.sortBy}
                        sortDirection={this.state.sortDirection}
                        brews={this.state.brews}
                        {...this.props}
                    />
                </>
            )
        }
    }
    return BrewHOC;
}
export default brewHOC;

