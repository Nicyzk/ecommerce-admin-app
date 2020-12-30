import React from 'react'
import Modal from '../../../components/UI/Modal/Modal'
import Input from '../../../components/UI/Input/Input'
import { Form } from 'react-bootstrap'


// Add New Category Modal 
const addCategoryModal = (props) => {
    const {
        show,
        handleClose,
        onAddNewCategory,
        setName,
        parentId,
        setParentId,
        createCategoryOptions,
        category,
        setImage,
        name
    } = props
    return (
        <Modal
            show={show}
            handleClose={handleClose}
            title="Add New Category"
            saveChanges={onAddNewCategory}
        >
            <Input
                controlId="name"
                label="Name"
                placeholder="Enter category name"
                value={name}
                onChange={(event) => { setName(event.target.value) }}
            />
            <Form.Group>
                <label for="parentId">Choose a parent category</label>
                <select
                    name="parentId"
                    id="parentId"
                    className="form-control"
                    value={parentId}
                    onChange={(e) => {
                        setParentId(e.target.value)
                    }}>
                    <option disabled selected value="">Select a parent category</option>
                    <option value="">None</option>
                    {createCategoryOptions(category.categories).map(cat => {
                        return <option
                            key={cat.name}
                            value={cat.id}
                        >{cat.name}</option>
                    })}
                </select>
            </Form.Group>
            <Input
                controlId="image"
                label="Category Image"
                name="categoryImage"
                type="file"
                onChange={(e) => { setImage(e.target.files[0]) }}
            />
        </Modal>
    )
}

export default addCategoryModal