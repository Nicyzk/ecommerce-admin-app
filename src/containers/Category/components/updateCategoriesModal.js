import React from 'react'
import {Row, Col} from 'react-bootstrap'
import Input from '../../../components/UI/Input/Input'
import Modal from '../../../components/UI/Modal/Modal'

// Edit Category Modal 
const updateCategoriesModal = (props) => {

    const {
        showUpdateModal, 
        setShowUpdateModal, 
        onUpdateCategories, 
        checkedArray,
        expandedArray, 
        handleCategoryInput, 
        createCategoryOptions,
        category
    } = props

    return (
        <Modal
            show={showUpdateModal}
            handleClose={() => setShowUpdateModal(false)}
            title="Update Category"
            saveChanges={onUpdateCategories}
            size="lg"
        >
            <p>Expanded</p>
            {expandedArray.length > 0 ? (
                expandedArray.map((item, index) => {
                    return (
                        <Row key={index}>
                            <Col>
                                <Input
                                    placeholder="Enter category name"
                                    value={expandedArray[index].name}
                                    onChange={(e) => handleCategoryInput('name', e.target.value, index, 'expanded')}
                                />
                            </Col>
                            <Col>
                                <select
                                    name="parentId"
                                    id="parentId"
                                    className="form-control"
                                    value={expandedArray[index].parentId}
                                    onChange={(e) => handleCategoryInput('parentId', e.target.value, index, 'expanded')}>
                                    <option disabled value="">Select a parent category</option>
                                    <option value="">None</option>
                                    {createCategoryOptions(category.categories).map(cat => {
                                        return <option
                                            key={cat.name}
                                            value={cat.id}
                                        >{cat.name}</option>
                                    })}
                                </select>
                            </Col>
                            <Col>
                                <select
                                    name="type"
                                    id="type"
                                    className="form-control"
                                    value={expandedArray[index].type}
                                    onChange={(e) => {handleCategoryInput('type', e.target.value, index, 'expanded')}}>
                                    <option disabled value="">Select a category type</option>
                                    <option value="">None</option>
                                    <option value="Page">Page</option>
                                    <option value="Products">Products</option>
                                    <option value="Store">Store</option>
                                </select>
                            </Col>
                        </Row>
                    )
                })
            ) : <p>No categories selected</p>
            }

            <p>Checked</p>
            {checkedArray.length > 0 ? (
                checkedArray.map((item, index) => {
                    return (
                        <Row key={index}>
                            <Col>
                                <Input
                                    placeholder="Enter category name"
                                    value={checkedArray[index].name}
                                    onChange={(e) => handleCategoryInput('name', e.target.value, index, 'checked')}
                                />
                            </Col>
                            <Col>
                                <select
                                    name="parentId"
                                    id="parentId"
                                    className="form-control"
                                    value={checkedArray[index].parentId}
                                    onChange={(e) => handleCategoryInput('parentId', e.target.value, index, 'checked')}>
                                    <option disabled value="">Select a parent category</option>
                                    <option value="">None</option>
                                    {createCategoryOptions(category.categories).map(cat => {
                                        return <option
                                            key={cat.name}
                                            value={cat.id}
                                        >{cat.name}</option>
                                    })}
                                </select>
                            </Col>
                            <Col>
                                <select
                                    name="type"
                                    id="type"
                                    className="form-control"
                                    value={checkedArray[index].type}
                                    onChange={(e) => {handleCategoryInput('type', e.target.value, index, 'checked')}}>
                                    <option disabled value="">Select a category type</option>
                                    <option value="">None</option>
                                    <option value="Page">Page</option>
                                    <option value="Products">Products</option>
                                    <option value="Store">Store</option>
                                </select>
                            </Col>
                        </Row>
                    )
                })
            ) : <p>No categories selected</p>
            }
        </Modal>
    )
}

export default updateCategoriesModal