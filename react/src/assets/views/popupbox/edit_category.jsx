// src/PopupBox.js
 

import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const PopupBox = ({ show, handleClose,categoryData }) => {
    const [formData, setFormData] = useState({
        category_id: '',
        category_name: '',
        
    });



    useEffect(() => {
        if (categoryData) {
            setFormData({
                category_id: categoryData.category_id,
                category_name: categoryData.category_name,
                // Set other fields as needed
            });
        }
    }, [categoryData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        handleClose();
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Popup Form</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formField1">
                        <Form.Label>Field 1</Form.Label>
                        <Form.Control
                            type="text"
                            name="category_id"
                            placeholder="Cateogery ID"
                            value={formData.category_id}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="formField2">
                        <Form.Label>Field 2</Form.Label>
                        <Form.Control
                            type="text"
                            name="category_name"
                            placeholder="Cateogary Name"
                            value={formData.category_name}
                            onChange={handleChange}
                        />
                    </Form.Group>
                     
                   
                    <Button variant="primary" type="submit">
                        Save
                    </Button>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default PopupBox;
