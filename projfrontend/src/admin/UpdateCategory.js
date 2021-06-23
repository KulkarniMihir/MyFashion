import React, {useState, useEffect} from 'react';
import { Link, Redirect } from 'react-router-dom';
import { isAuthenticated } from '../auth/helper/index';
import Base from '../core/Base';
import { getAllCategory, getCategoryById, updateCategory } from './helper/adminapicall';
import { Spinner } from "react-bootstrap";

//destructure and call in preload
const UpdateCategory = ({match}) => {

    const categoryId = match.params.categoryId;
    const {user, token} = isAuthenticated();

    const [values, setValues] = useState({
        categoryName: "",
        err: "",
        success: false,
        loading: false,
        getaRedirect: false,
      });
    
      const { 
        categoryName,
        err,
        success,
        loading,
        getaRedirect,
      } = values;
    
      const preload = () => {
        getCategoryById(categoryId).then((data) => {
            setValues({
                ...values,
                categoryName: data.name, 
            });
        });
      };

      useEffect(() => {
        preload();
      }, [])

      const onChange = (event) => {
        setValues({
            ...values,
            err: "",
            categoryName: event.target.value,
        });
      }

      const onSubmit = (event) => {
        event.preventDefault();
        setValues({
            ...values,
            loading: true,
        });
        updateCategory(categoryId, user._id, token, { name: categoryName }).then(
            (data) => {
              if (data.err) {
                setValues({
                  ...values,
                  loading: false,
                  err: data.err,
                });
              } else {
                setValues({
                  ...values,
                  loading: false,
                  success: true,
                });
                setTimeout(() => {
                    setValues({ ...values, getaRedirect: true });
                  }, 2000);
              }
            }
          );
        };

      const errorMessage = () => {
        return (
          <div className="row">
            <div className="col col-lg-6 col-md-8 col-sm-12">
              <div className="alert alert-dark">{err}</div>
            </div>
          </div>
        );
      };
    
      const successMessage = () => {
        return (
          <div className="row">
            <div className="col col-lg-6 col-md-8 col-sm-12">
              <div className="alert alert-success">Success</div>
            </div>
          </div>
        );
      };

      const loadingSpinner = () => {
        return (
          <div className="row">
            <div className="col col-lg-6 col-md-8 col-sm-12">
              <Spinner animation="border" variant="success" />
            </div>
          </div>
        );
      };

    const categoryForm = () => (
        <div className="row">
            <form className="col col-lg-6 col-md-8 col-sm-12">
            <div className="form-group">
                <label htmlFor="categoryName" className="text-light">
                    Category Name
                </label>
                <input
                    type="text"
                    className="form-control"
                    name="categoryName"
                    value={categoryName}
                    onChange={onChange}
                    id="categoryName"
                    placeholder="Ex. Winter"
                    required
                    autoFocus
                />
                <button
                    type="submit"
                    className="btn btn-success mt-2"
                    onClick={onSubmit}
                >
                    Update Category
                </button>
            </div>
            </form>
        </div>
    );

    return (
      //perform redirect with timeout
      <Base
      title="Update Category"
      description="Category updation center"
      className="container"
    >
      {err && errorMessage()}
      {success && successMessage()}
      {loading && loadingSpinner()}
      {categoryForm()}
      {getaRedirect && <Redirect to="/admin/dashboard" />}
    </Base>
    )
}

export default UpdateCategory;
