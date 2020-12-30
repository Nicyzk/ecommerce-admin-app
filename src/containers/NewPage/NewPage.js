import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Layout from '../../components/Layout/Layout'
import Modal from '../../components/UI/Modal/Modal'
import Input from '../../components/UI/Input/Input'
import { Row, Col } from 'react-bootstrap'
import createCategoryOptions from '../../helpers/createCategoryOptions'
import { createPage } from '../../store/actions/pageActions'
import Spinner from '../../components/UI/Spinner/Spinner'

const NewPage = () => {
    const [showNewPageModal, setShowNewPageModal] = useState(false)
    const [pageTitle, setPageTitle] = useState('')
    const [pageCategory, setPageCategory] = useState('')
    const [description, setDescription] = useState('')
    const [bannerImages, setBannerImages] = useState([])
    const [productImages, setProductImages] = useState([])
    const category = useSelector(state => state.category)
    const page = useSelector(state => state.page)
    const dispatch = useDispatch()

    useEffect(() => {
        if (!page.loading) {
            setPageTitle('')
            setPageCategory('')
            setDescription('')
            setBannerImages([])
            setProductImages([])
        }
    }, [page.loading])

    const renderNewPageModal = () => {

        const onCreatePage = () => {
            const form = new FormData()
            form.append('title', pageTitle)
            form.append('category', pageCategory)
            form.append('description', description)
            for (let img of bannerImages) {
                form.append('banners', img)
            }
            for (let img of productImages) {
                form.append('products', img)
            }
            dispatch(createPage(form))
            setShowNewPageModal(false)
        }

        return (
            <Modal
                show={showNewPageModal}
                handleClose={() => setShowNewPageModal(false)}
                title="Create New Page"
                saveChanges={onCreatePage}
            >
                <Row>
                    <Col>
                        <Input
                            label="Title"
                            placeholder="Enter title"
                            value={pageTitle}
                            onChange={(e) => setPageTitle(e.target.value)}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Input
                            type="select"
                            label="Choose the page category"
                            id="category"
                            value={pageCategory}
                            onChange={(e) => setPageCategory(e.target.value)}
                            placeholder="Select category"
                            options={createCategoryOptions(category.categories)}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Input
                            label="Description"
                            placeholder="Enter page description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Input
                            label="Banner Images"
                            type="file"
                            onChange={(e) => setBannerImages([...bannerImages, e.target.files[0]])}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Input
                            label="Product Images"
                            type="file"
                            onChange={(e) => setProductImages([...productImages, e.target.files[0]])}
                        />
                    </Col>
                </Row>
            </Modal>
        )
    }

    if (page.loading) {
        return <Spinner/>
    }

    return (
        <Layout sidebar>
            <h1>page</h1>
            <button onClick={() => setShowNewPageModal(true)}>Click</button>
            {renderNewPageModal()}
        </Layout>
    )
}

export default NewPage