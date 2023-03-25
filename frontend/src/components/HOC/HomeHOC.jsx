import React, { Component } from "react";
import Loading from "../Loading/Loading";
import { getLatestBrew } from "../../api/coffeeCalls";
import Error from "../Error/Error";

function homeHoc(WrappedComponent) {
  class HomeHOC extends Component {
    constructor(props) {
      super(props);
      this.state = {
        error: null,
        latestBrew: {},
        loading: true,
      };
    }
    componentDidMount() {
      this.fetchLatest();
    }

    fetchLatest = async () => {
      try {
        const response = await getLatestBrew();
        const data = response.data;
        const latestBrew = data[0];
        this.setState({ loading: false, latestBrew });
      } catch (error) {
        this.setState({ error, loading: false });
      }
    };

    render() {
      if (this.state.error) {
        return <Error />;
      }
      if (this.state.loading) {
        return <Loading />;
      }
      return <WrappedComponent {...this.props} latestBrew={this.state.latestBrew} />;
    }
  }
  return HomeHOC;
}
export default homeHoc;
