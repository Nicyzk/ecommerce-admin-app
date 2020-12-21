import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getAllCategories } from '../../store/actions/categoryActions'
import { addProduct } from '../../store/actions/productActions'
import Layout from '../../components/Layout/Layout'
import { Container, Row, Col, Button, Modal } from 'react-bootstrap'
import Input from '../../components/UI/Input/Input'

const Products = () => {

    const dispatch = useDispatch()
    const auth = useSelector(state => state.auth)
    const category = useSelector(state => state.category)
    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [quantity, setQuantity] = useState(0)
    const [description, setDescripton] = useState('')
    const [categoryId, setCategoryId] = useState('')
    const [productPicture, setProductPicture] = useState([])
    const [show, setShow] = useState(false)

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        // the reason for below is because whenever our app reloads, in app, we check if auth.authenticated 
        // is false. If so, we dispatch action to check if user is logged in to update authenticated to true.
        //Since Product & Category page is within App, they will mount first and thus may dispatch getAllCategories,
        //before auth.authenticated is set to true. Then when app rerennders, the pages are treated to be mounted again, 
        //and so will dispatch the action again. This results in two dispatches, the first of which may result in an 
        //error from the backend if the user is not authenticated. 

        if (auth.authenticated) { 
            dispatch(getAllCategories())
        }
    }, [])

    const createCategoryOptions = (categories, options = []) => {
        for (let cat of categories) {
            options.push(cat)
            if (cat.children.length > 0) {
                createCategoryOptions(cat.children, options)
            }
        }
        return options
    }

    const handleProductPicture = e => {
        setProductPicture([
            ...productPicture,
            e.target.files[0]
        ])
    }

    const onAddProduct = () => {
        const form = new FormData()
        form.append('name', name)
        form.append('price', price)
        form.append('quantity', quantity)
        form.append('description', description)
        form.append('category', categoryId)
        for (let pic of productPicture) {
            form.append('productPicture', pic)
        }
        dispatch(addProduct(form))
    }

    return (
        <Layout sidebar>
            <Container>
                <Row>
                    <Col md={12}>
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <h3>Product</h3>
                            <button onClick={handleShow}>
                                Add
                            </button>
                        </div>
                    </Col>
                </Row>
            </Container>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Add New Category</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Input
                        controlId="name"
                        label="Name"
                        placeholder="Enter product name"
                        value={name}
                        onChange={(event) => { setName(event.target.value) }}
                    />
                    <Input
                        controlId="price"
                        label="Price"
                        placeholder="Enter product price"
                        value={price}
                        onChange={(event) => { setPrice(event.target.value) }}
                    />
                    <Input
                        controlId="quantity"
                        label="Quantity"
                        placeholder="Enter quantity"
                        value={quantity}
                        onChange={(event) => { setQuantity(event.target.value) }}
                    />
                    <Input
                        controlId="description"
                        label="Description"
                        placeholder="Enter product description..."
                        value={description}
                        onChange={(event) => { setDescripton(event.target.value) }}
                    />
                    <label for="categoryId">Choose a category</label>
                    <select 
                        name="categoryId" 
                        id="categoryId" 
                        className="form-control"
                        value={categoryId}
                        onChange={(e) => {
                            setCategoryId(e.target.value)}}>
                        <option selected disabled value="">Select product category</option>
                        {createCategoryOptions(category.categories).map(cat => {
                            return <option 
                            key={cat.name} 
                            value={cat.id} 
                            >{cat.name}</option>
                        })}
                    </select>
                    <Input
                        controlId="productPicture"
                        type="file"
                        onChange={handleProductPicture}
                    />
                    <label>Files picked:{productPicture.map(i => ' ' + i.name)}</label>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        ADD
                    </Button>
                    <Button variant="primary" onClick={() => {
                        handleClose()
                        onAddProduct()
                    }} >Add</Button>
                </Modal.Footer>
            </Modal>
        </Layout>
    )
}

export default Products