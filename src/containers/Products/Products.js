import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addProduct } from '../../store/actions/productActions'
import Layout from '../../components/Layout/Layout'
import { Container, Row, Col, Table } from 'react-bootstrap'
import Input from '../../components/UI/Input/Input'
import Modal from '../../components/UI/Modal/Modal'
import classes from './Product.module.css'
import { generatePublicURL } from '../../urlConfig'

const Products = () => {

    const dispatch = useDispatch()
    const category = useSelector(state => state.category)
    const products = useSelector(state => state.products)
    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [quantity, setQuantity] = useState(0)
    const [description, setDescripton] = useState('')
    const [categoryId, setCategoryId] = useState('')
    const [productPicture, setProductPicture] = useState([])
    const [show, setShow] = useState(false)
    const [showProductDetailModal, setShowProductDetailModal] = useState(false)
    const [productDetails, setProductDetails] = useState(null)

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

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
        handleClose()
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

    const renderAddProductModal = () => {
        return (
            <Modal
                show={show}
                handleClose={handleClose}
                title="Add New Product"
                saveChanges={onAddProduct}
            >
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
                        setCategoryId(e.target.value)
                    }}>
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
            </Modal>
        )
    }

    const handleCloseProductDetailModal = () => {
        setShowProductDetailModal(false)
    }
    const handleShowProductDetailModal = (product) => {
        setProductDetails(product)
        setShowProductDetailModal(true)
    }

    const renderProductDetailModal = () => {
        if (!productDetails) {
            return null
        }
        return (
            <Modal
                show={showProductDetailModal}
                handleClose={handleCloseProductDetailModal}
                title="Product Details"
                saveChanges={onAddProduct}
                size="lg">
                <Row>
                    <Col md={6}>
                        <label className={classes.key}>Name</label>
                        <p className={classes.value}>{productDetails.name}</p>
                    </Col>
                    <Col md={6}>
                        <label className={classes.key}>Price</label>
                        <p className={classes.value}>{productDetails.price}</p>
                    </Col>
                </Row>
                <Row>
                    <Col md={6}>
                        <label className={classes.key}>Quantity</label>
                        <p className={classes.value}>{productDetails.quantity}</p>
                    </Col>
                    <Col md={6}>
                        <label className={classes.key}>Category</label>
                        <p className={classes.value}>{productDetails.category.name}</p>
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        <label className={classes.key}>Description</label>
                        <p className={classes.value}>{productDetails.description}</p>
                    </Col>
                </Row>
                <Row>
                    <Col md={12} >
                        <label className={classes.key}>Product Pictures</label>
                        <div style={{display: "flex"}}>
                            {productDetails.productPictures.map(pic => {
                                return (
                                    <div className={classes.productPicsContainer} key={pic._id}>
                                        <img
                                            alt=""
                                            src={generatePublicURL(pic.img)}
                                            className={classes.productImg} />
                                    </div>
                                )
                            })}
                        </div>
                    </Col>
                </Row>
            </Modal>
        )
    }

    const renderProducts = () => {
        return (
            <Table responsive="sm" style={{ fontSize: "15" }}>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Category</th>
                    </tr>
                </thead>
                <tbody>
                    {products.products.map(p => {
                        return (
                            <tr 
                            key={p._id} 
                            onClick={() => handleShowProductDetailModal(p)} 
                            style={{cursor: "pointer"}}>
                                <td>1</td>
                                <td>{p.name}</td>
                                <td>{p.price}</td>
                                <td>{p.quantity}</td>
                                <td>{p.category.name}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
        )
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
                <Row>
                    <Col md={12}>
                        {renderProducts()}
                    </Col>
                </Row>
                {renderAddProductModal()}
                {renderProductDetailModal()}
            </Container>
        </Layout>
    )
}

export default Products