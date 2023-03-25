import React, { Component } from "react";
import { fetchAccounts, addAccount, editAccount, deleteAccount } from "../../api/userCalls";
import { fetchBeans, addBean, editBean, deleteBean } from "../../api/coffeeCalls";
import toast from 'react-hot-toast';
import { AuthContext } from "../../utils/AuthContext";
import { dynamicSort } from "../../utils/functions";

function manageHOC(WrappedComponent) {
    class ManageHOC extends Component {
        _isMounted = false;
        static contextType = AuthContext;
        constructor(props) {
            super(props);
            this.state = {
                error: null,
                loading: true,
                accounts: [],
                beans: [],
            };
        }
        componentDidMount() {
            this._isMounted = true;
        }
        componentWillUnmount() {
            this._isMounted = false;
        }

        fetchBeans = async () => {
            const header = this.context.generateHeaders();
            try {
                const response = await fetchBeans(header);
                const data = response.data;
                const unsortedBeans = data.map((bean) => {
                    return bean;
                });
                const beans = await unsortedBeans.sort(dynamicSort('beanAdded', 'descending'));
                if (this._isMounted) {
                    this.setState({
                        beans,
                        fetchBeans: true,
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

        _editBean = async (id, data) => {
            const header = this.context.generateHeaders();
            try {
                const results = await editBean(header, id, data);
                if (results.status === 200) {
                    if (this._isMounted) {
                        const oldBean = await this.state.beans.filter(b => b._id === id)[0]
                        const updatedBean = { ...oldBean, ...data };
                        this.setState(prevState => ({
                            beans: [updatedBean, ...prevState.beans.filter(b => b._id !== id)],
                            loading: false,
                        }))
                        toast('Bean updated!', {id: 'editbeansuccess'})
                    }
                }
            } catch (error) {
                if (this._isMounted) {
                    this.setState({
                        loading: true,
                        error,
                    });
                    toast('An error occured when attempting to update bean.', {id: 'editbeanerror'})
                }
            }
        };

        _addBean = async (data) => {
            const header = this.context.generateHeaders();
            try {
                const results = await addBean(header, data);
                if (results.status === 200) {
                    if (this._isMounted) {
                        const _id = 123; //a temporary id to keep unique bean ids for displaying reasons until page reload
                        const newBean = {_id, ...data }
                        this.setState(prevState => ({
                            beans: [newBean, ...prevState.beans],
                            loading: false,
                        }));
                        toast('Bean added!', {id: 'addbeansuccess'})
                        await this.fetchBeans()
                    }
                }
            } catch (error) {
                if (this._isMounted) {
                    this.setState({
                        loading: true,
                        error,
                    })
                    toast('An error occured when attempting to create bean.', {id: 'addbeanerror'})
                }
            }
        }

        _deleteBean = async (id) => {
            const header = this.context.generateHeaders();
            try {
                const results = await deleteBean(header, id);
                if (results.status === 200) {
                    if (this._isMounted) {
                        this.setState(prevState => ({
                            beans: [...prevState.beans.filter(b => b._id !== id)],
                            loading: false,
                        }))
                        toast('Bean deleted!', {id: 'deletebeansuccess'})
                    }              
            }
            } catch (error) {
                if (this._isMounted) {
                    this.setState({
                        loading: false,
                        error,
                    });
                    toast('An error occured when attempting to delete bean.', {id: 'deletebeanerror'})
                }
            }
        }

        fetchAccounts = async () => {
            const header = this.context.generateHeaders();
            try {
                const response = await fetchAccounts(header);
                const data = response.data;
                const unsortedAccounts = data.map((account) => {
                    return account;
                });
                const accounts = await unsortedAccounts.sort(dynamicSort('created', 'descending'));
                if (this._isMounted) {
                    this.setState({
                        accounts,
                        fetchAccounts: true,
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

        _editAccount = async (id, data) => {
            const header = this.context.generateHeaders();
            try {
                const results = await editAccount(header, id, data);
                if (results.status === 200) {
                    if (this._isMounted) {
                        const oldAccount = await this.state.accounts.filter(u => u.id === id)[0];
                        const updatedAccount = await { ...oldAccount, ...data };
                        this.setState(prevState => ({
                            accounts: [updatedAccount, ...prevState.accounts.filter(u => u.id !== id)],
                            loading: false,
                        }))
                        toast('User updated!', {id: 'editusersuccess'})
                    }
                }
            } catch (error) {
                if (this._isMounted) {
                    this.setState({
                        loading: true,
                        error,
                    });
                    toast('An error occured when attempting to update account.', {id: 'editusererror'})
                }
            }
        };

        _addAccount = async (username, email, password, confirmPassword, role) => {
            const header = this.context.generateHeaders();
            const data = { username, email, password, confirmPassword, role };
            try {
                const results = await addAccount(header, data);
                const id = 123; //a temporary id to keep unique bean ids for displaying reasons until page reload
                const newAccount = {id, ...data }
                if (results.status === 200) {
                    if (this._isMounted) {
                        this.setState(prevState => ({
                            accounts: [newAccount, ...prevState.accounts],
                            loading: false,
                        }));
                        toast('Account created!', {id: 'createusersuccess'})
                        await this.fetchAccounts()
                    }
                }
            } catch (error) {
                if (this._isMounted) {
                    this.setState({
                        loading: true,
                        error,
                    })
                    toast('An error occured when attempting to create account.', {id: 'createusererror'})
                }
            }
        }

        _deleteAccount = async (id) => {
            const header = this.context.generateHeaders();
            try {
                const results = await deleteAccount(header, id);
                if (results.status === 200) {
                    if (this._isMounted) {
                        this.setState(prevState => ({
                            accounts: [...prevState.accounts.filter(u => u.id !== id)],
                            loading: false,
                        }));
                        toast('Account deleted!', {id: 'deleteusersuccess'})
                    }
                }
            } catch (error) {
                if (this._isMounted) {
                    this.setState({
                        loading: true,
                        error,
                    })
                    toast('An error occured when attempting to delete account.', {id: 'deleteusererror'})
                }
            }
        }

        render() {
            return (
                <>
                    <WrappedComponent
                        loading={this.state.loading}
                        error={this.state.error}
                        fetchBeans={this.fetchBeans}
                        beans={this.state.beans}
                        _editBean={this._editBean}
                        _addBean={this._addBean}
                        _deleteBean={this._deleteBean}
                        fetchAccounts={this.fetchAccounts}
                        accounts={this.state.accounts}
                        _editUser={this._editAccount}
                        _addUser={this._addAccount}
                        _deleteUser={this._deleteAccount}
                        {...this.props}
                    />
                </>
            )
        }
    }
    return ManageHOC;
}
export default manageHOC;
