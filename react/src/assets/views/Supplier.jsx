import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Button } from 'react-bootstrap';
import axiosClient from "../../axios-client.js";

const Supplier = () => {
    const [suppliers, setSuppliers] = useState([]);
    const [errors, setErrors] = useState(null);

    const validationSchema = Yup.object().shape({
        name: Yup.string().required('Name is required'),
        address: Yup.string().required('Address is required'),
        mobileNumber: Yup.string()
            .matches(/^\d{10}$/, 'Mobile number must be 10 digits')
            .required('Mobile number is required'),
        email: Yup.string()
            .email('Invalid email address')
            .required('Email is required'),
    });

    const deleteItem = (index) => {

        axiosClient.delete(`/suppliers/${suppliers[index].id}`)
        const updatedSuppliers = [...suppliers];
        updatedSuppliers.splice(index, 1);
        setSuppliers(updatedSuppliers);
    };

    const formik = useFormik({
        initialValues: {
            name: '',
            address: '',
            mobileNumber: '',
            email: '',
        },
        validationSchema,
        onSubmit: (values, { resetForm }) => {
            console.log(values);
            const newSupplier = {
                supplier_name: values.name,
                supplier_address: values.address,
                supplier_phone: values.mobileNumber,
                supplier_email: values.email,
            };
 
            setSuppliers([...suppliers, newSupplier]);
            axiosClient.post("/suppliers", newSupplier).then(({ data }) => {
                  
                    console.log(data);
            })
                .catch((err) => {
                    const response = err.response;

                    if (response && response.status === 422) {
                        if (response.data.errors) {
                            setErrors(response.data.errors);
                        } else {
                            setErrors({ message: [response.data.message] });
                        }
                    }

                });

            resetForm();
        },
    });

    useEffect(() => {
        // Fetch suppliers data from the server
        axiosClient.get("/supplier-show-all").then(({ data }) => {
                console.log(data);
                setSuppliers(data);
            })
            .catch((err) => {
                console.error(err);
            });
    }, []);

    return (
        <div>
            <form onSubmit={formik.handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        className="form-control form-control-sm"
                        id="name"
                        name="name"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.name && formik.errors.name && (
                        <div className="text-danger">{formik.errors.name}</div>
                    )}
                </div>
                <div className="form-group">
                    <label htmlFor="address">Address</label>
                    <input
                        type="text"
                        className="form-control form-control-sm"
                        id="address"
                        name="address"
                        value={formik.values.address}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.address && formik.errors.address && (
                        <div className="text-danger">{formik.errors.address}</div>
                    )}
                </div>
                <div className="form-group">
                    <label htmlFor="mobileNumber">Mobile Number</label>
                    <input
                        type="text"
                        className="form-control form-control-sm"
                        id="mobileNumber"
                        name="mobileNumber"
                        value={formik.values.mobileNumber}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.mobileNumber && formik.errors.mobileNumber && (
                        <div className="text-danger">{formik.errors.mobileNumber}</div>
                    )}
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        className="form-control form-control-sm"
                        id="email"
                        name="email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.email && formik.errors.email && (
                        <div className="text-danger">{formik.errors.email}</div>
                    )}
                </div>
                <Button type="submit" className="btn btn-primary mt-4">
                    Add Supplier
                </Button>
            </form>

            <table className="table mt-4">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Address</th>
                        <th>Mobile Number</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {suppliers.map((supplier, index) => (
                        <tr key={index}>
                            <td>{supplier.supplier_name}</td>
                            <td>{supplier.supplier_address}</td>
                            <td>{supplier.supplier_phone}</td>
                            <td>{supplier.supplier_email}</td>
                            <td>
                                <Button variant="danger" onClick={() => deleteItem(index)}>
                                    Delete
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Supplier;
