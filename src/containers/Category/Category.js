import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Layout from '../../components/Layout/Layout'
import { Container, Row, Col, Button, Modal } from 'react-bootstrap'
import { getAllCategories, addCategory } from '../../store/actions/categoryActions'
import Input from '../../components/UI/Input/Input'

const Category = () => {
    const dispatch = useDispatch()
    const auth = useSelector(state => state.auth)
    const category = useSelector(state => state.category)
    const [name, setName] = useState('')
    const [image, setImage] = useState('')
    const [parentId, setParentId] = useState('')
    const [show, setShow] = useState(false)

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    useEffect(() => {
        if (auth.authenticated) {
            dispatch(getAllCategories())
        }
    }, [])

    const renderCategories = (categories) => {
        let list = []
        for (let cat of categories) {
            list.push(
                <li key={cat.name}>
                    {cat.name}
                    {cat.children.length > 0 ? <ul>{renderCategories(cat.children)}</ul> : null}
                </li>
            )
        }
        return list
    }

    const createCategoryOptions = (categories, options = []) => {
        for (let cat of categories) {
            options.push(cat)
            if (cat.children.length > 0) {
                createCategoryOptions(cat.children, options)
            }
        }
        return options
    }

    const onAddNewCategory = () => {
        const form = new FormData()
        form.append('name', name)
        form.append('parentId', parentId)
        form.append('categoryImage', image)
        dispatch(addCategory(form))
    }

    return (
        <Layout sidebar>
            <Container>
                <Row>
                    <Col md={12}>
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <h3>Category</h3>
                            <button onClick={handleShow}>
                                Add
                            </button>
                        </div>
                    </Col>
                    <Col md={12}>
                        {category.categories ? renderCategories(category.categories) : null}
                    </Col>
                </Row>
            </Container>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                style={{top: "70px"}}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Add New Category</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Input
                        controlId="name"
                        label="Name"
                        placeholder="Enter category name"
                        value={name}
                        onChange={(event) => {setName(event.target.value)}}
                    />
                    <label for="parentId">Choose a parent category</label>
                    <select 
                        name="parentId" 
                        id="parentId" 
                        className="form-control"
                        value={parentId}
                        onChange={(e) => {
                            setParentId(e.target.value)}}>
                        <option disabled selected value="">Select a parent category</option>
                        {createCategoryOptions(category.categories).map(cat => {
                            return <option 
                            key={cat.name} 
                            value={cat.id} 
                            >{cat.name}</option>
                        })}
                    </select>
                    <Input
                        controlId="image"
                        label="Category Image"
                        name="categoryImage"
                        type="file"
                        onChange={(e) => { setImage(e.target.files[0])}}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button 
                    variant="primary" 
                    onClick={() => {
                        handleClose()
                        onAddNewCategory()
                    }}>Add</Button>
                </Modal.Footer>
            </Modal>
        </Layout>
    )
}

export default Category