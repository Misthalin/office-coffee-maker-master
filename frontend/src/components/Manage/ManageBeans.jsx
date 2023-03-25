import React, { useEffect } from "react";
import moment from "moment";
import Loading from "../Loading/Loading";
import Error from "../Error/Error";
import EditBeanModal from "./Modal/EditBeanModal";
import NewBeanModal from "./Modal/NewBeanModal";
import Button from "../Button/Button";
import toast from "react-hot-toast";
import { confirm } from "../Confirm/Confirm";

import "./ManageBeans.css";

const ManageBeans = ({ fetchBeans, beans, _editBean, _addBean, _deleteBean, loading, error }) => {
  useEffect(() => {
    fetchBeans();
  }, [fetchBeans]);

  if (error) {
    return <Error />;
  }

  const handleOnClick = async (id) => {
    if (
      await confirm({
        confirmation: "Are you sure?",
      })
    ) {
      await _deleteBean(id);
    } else {
      toast("Delete canceled.");
    }
  };

  const listBeans = beans.map((bean) => {
    return (
      <div key={bean._id} className="bean">
        <p>
          Bean created: <span className="text-bold">{moment(bean.beanAdded).format("DD/MM/YYYY")}</span>
        </p>
        <div className="bean-container">
          <div className="bean-details">
            <p className="bean-text">
              <span>Type of bean</span>
              <span className="text-bold">{bean.typeOfBean}</span>
            </p>
            <p className="bean-text">
              <span>Brand:</span>
              <span className="text-bold">{bean.brand}</span>
            </p>
            <p className="bean-text">
              <span>Roast Profile:</span>
              <span className="text-bold">{bean.roastProfile}</span>
            </p>
            <p className="bean-text">
              <span>Roast Type:</span>
              <span className="text-bold">{bean.roastType}</span>
            </p>
            <p className="bean-text">
              <span>Price(KG/NOK):</span>
              <span className="text-bold">{bean.priceKg}</span>
            </p>
            <p className="bean-text">
              <span>Origin:</span>
              <span className="text-bold">{bean.origin}</span>
            </p>
          </div>
          <div className="btn-group">
            <EditBeanModal
              _id={bean._id}
              typeOfBean={bean.typeOfBean}
              brand={bean.brand}
              roastProfile={bean.roastProfile}
              roastType={bean.roastType}
              priceKg={bean.priceKg}
              origin={bean.origin}
              _editBean={_editBean}
            />
            <Button title="Delete" variant="small" onClickEvent={() => handleOnClick(bean._id)} disabled={bean._id === 123} />
          </div>
        </div>
      </div>
    );
  });
  // _deleteBean(bean._id)
  return (
    <div>
      <NewBeanModal _addBean={_addBean} />
      {loading ? <Loading /> : listBeans}
    </div>
  );
};

export default ManageBeans;
