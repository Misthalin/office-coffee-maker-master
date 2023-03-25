import React, { Component } from "react";
import { createBrew, fetchBeans } from "../../api/coffeeCalls";
import toast from "react-hot-toast";
import Loading from "../Loading/Loading";
import { AuthContext } from "../../utils/AuthContext";
import Error from "../Error/Error";

function coffeeMakerHoc(WrappedComponent) {
  class CoffeeMakerHoc extends Component {
    _isMounted = false;
    static contextType = AuthContext;
    constructor(props) {
      super(props);

      this.state = {
        loading: true,
        error: null,
        beans: [],
        brews: [],
      };
    }

    componentDidMount() {
      this._isMounted = true;
      const header = this.context.generateHeaders();
      this.fetchBeans(header);
    }
    componentWillUnmount() {
      this._isMounted = false;
    }

    fetchBeans = async (header) => {
      try {
        const response = await fetchBeans(header);
        const data = response.data;
        const beans = data.map((bean) => {
          return bean;
        });
        this.setState({
          beans,
          error: null,
          loading: false,
        });
      } catch (error) {
        this.setState({
          loading: false,
          error,
        });
      }
    };

    createBrew = async (data) => {
      const header = this.context.generateHeaders();
      try {
        const response = await createBrew(header, data);
        if (response.status === 200) {
          if (this._isMounted) {
            const _id = 1234; // tmp id
            const newBrew = { _id, ...data };
            this.setState((prev) => ({
              brews: [...prev, newBrew],
              loading: false,
            }));
            toast("Successfully brewed new coffee");
          }
        }
      } catch (error) {
        this.setState({
          loading: false,
          error,
        });
        toast("An error occured when brewing coffee");
      }
    };

    render() {
      if (this.state.error) {
        return <Error />;
      }
      if (this.state.loading) {
        return <Loading />;
      }
      return <WrappedComponent {...this.props} createBrew={this.createBrew} beans={this.state.beans} brews={this.state.brews} />;
    }
  }
  return CoffeeMakerHoc;
}
export default coffeeMakerHoc;
