import React, { useEffect, useContext } from "react";
import moment from "moment";
import { AuthContext } from "../../utils/AuthContext";
import Loading from "../Loading/Loading";
import Error from "../Error/Error";
import EditUserModal from "./Modal/EditUserModal";
import NewUserModal from "./Modal/NewUserModal";
import Button from "../Button/Button";
import toast from 'react-hot-toast';
import { confirm } from '../Confirm/Confirm';
import "./ManageUsers.css";

const ManageUsers = ({ fetchAccounts, accounts, _editUser, _addUser, _deleteUser, loading, error }) => {
  const contextData = useContext(AuthContext);
  const user = contextData.user;

  useEffect(() => {
    fetchAccounts();
  }, [fetchAccounts]);

  if (error) {
    return <Error />;
  }

  const handleOnClick = async (id) => {
    if (await confirm({
      confirmation: 'Are you sure?'
    })) {
      await _deleteUser(id);
    } else {
      toast('Delete canceled.')
    }
  }

  const listAccounts = accounts.map((account) => {
    return (
      <div key={account.email} className="account">
        <p className="account-created">
          Account created: <span className="text-bold">{moment(account.created).format("DD/MM/YYYY")}</span>
        </p>
        <div className="account-container">
          <div className="account-details">
            <p className="account-text">
              <span>Username:</span>
              <span className="text-bold">{account.username}</span>
            </p>
            <p className="account-text">
              <span>Email:</span>
              <span className="text-bold">{account.email}</span>
            </p>
            <p className="account-text account-text__role">
              <span>Role:</span>
              <span className="text-bold">{account.role}</span>
            </p>
          </div>

          <div className="btn-group">
            <EditUserModal
              id={account.id}
              username={account.username}
              email={account.email}
              role={account.role}
              _editUser={_editUser}
              fetchAccounts={fetchAccounts}
            />
            {user.id === account.id ? (
              <Button title="Delete" variant="small" disabled={true} />
            ) : (
                <Button title="Delete" variant="small" onClickEvent={() => handleOnClick(account.id)} disabled={(account.id === 123)} />
              )}
          </div>
        </div>


      </div>
    );
  });

  return (
    <div>
      <NewUserModal role="User" _addUser={_addUser} />
      {loading ? <Loading /> : listAccounts}
    </div>
  );
};

export default ManageUsers;