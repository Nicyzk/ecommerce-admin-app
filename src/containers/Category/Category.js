import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Layout from '../../components/Layout/Layout'
import { Container, Row, Col } from 'react-bootstrap'
import Spinner from '../../components/UI/Spinner/Spinner'
import { addCategory, updateCategories, deleteCategories } from '../../store/actions/categoryActions'
import CheckboxTree from 'react-checkbox-tree'
import 'react-checkbox-tree/lib/react-checkbox-tree.css';
import { IoIosAddCircleOutline, IoIosCheckboxOutline, IoIosCheckbox, IoIosArrowForward, IoIosArrowDown } from 'react-icons/io'
import { BiEditAlt } from 'react-icons/bi'
import { RiDeleteBin6Line } from 'react-icons/ri'
import UpdateCategoriesModal from './components/updateCategoriesModal'
import AddCategoryModal from './components/addCategoryModal'
import DeleteCategoriesModal from './components/deleteCategoriesModal'
import classes from './Category.module.css'

const Category = () => {
    const dispatch = useDispatch()
    const category = useSelector(state => state.category)
    //for AddCategory Modal
    const [name, setName] = useState('')
    const [image, setImage] = useState('')
    const [parentId, setParentId] = useState('')
    const [show, setShow] = useState(false)
    //
    const [checked, setChecked] = useState([])
    const [expanded, setExpanded] = useState([])
    const [checkedArray, setCheckedArray] = useState([])
    const [expandedArray, setExpandedArray] = useState([])
    const [showUpdateModal, setShowUpdateModal] = useState(false)
    const [showDeleteModal, setShowDeleteModal] = useState(false)

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const renderCategories = (categories) => {
        let list = []
        for (let cat of categories) {
            list.push({
                value: cat.id,
                label: cat.name,
                children: cat.children.length > 0 ? renderCategories(cat.children) : null
            }
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
        handleClose()
        const form = new FormData()
        form.append('name', name)
        form.append('parentId', parentId)
        form.append('categoryImage', image)
        dispatch(addCategory(form))
        setName('')
        setParentId('')
        setImage('')
    }

    const updateCheckedAndExpandedArray = () => {
        const categories = createCategoryOptions(category.categories)
        const checkedArray = []
        const expandedArray = []
        checked.length > 0 && checked.forEach(checkedItem => {
            const catObj = categories.find(cat => cat.id === checkedItem)
            catObj && checkedArray.push(catObj)
        })
        expanded.length > 0 && expanded.forEach(expandedItem => {
            const catObj = categories.find(cat => cat.id === expandedItem)
            catObj && expandedArray.push(catObj)
        })
        setCheckedArray(checkedArray)
        setExpandedArray(expandedArray)
    }

    const handleCategoryInput = (key, value, index, arrayType) => {
        if (arrayType === 'expanded') {
            const updatedArray = []
            expandedArray.forEach((item, _index) => {
                if (_index === index) {
                    updatedArray.push({ ...item, [key]: value })
                } else {
                    updatedArray.push({ ...item })
                }
            })
            setExpandedArray(updatedArray)
        } else if (arrayType === 'checked') {
            const updatedArray = []
            checkedArray.forEach((item, _index) => {
                if (_index === index) {
                    updatedArray.push({ ...item, [key]: value })
                } else {
                    updatedArray.push({ ...item })
                }
            })
            setCheckedArray(updatedArray)
        }
    }

    const onUpdateCategories = () => {
        const form = new FormData()
        expandedArray.forEach(item => {
            form.append('id', item.id)
            form.append('name', item.name)
            form.append('parentId', item.parentId ? item.parentId : "")
            form.append('type', item.type)
        })
        checkedArray.forEach(item => {
            form.append('id', item.id)
            form.append('name', item.name)
            form.append('parentId', item.parentId ? item.parentId : "")
            form.append('type', item.type)
        })
        setShowUpdateModal(false)
        dispatch(updateCategories(form))
    }

    const onDeleteCategories = () => {
        dispatch(deleteCategories(checked))
        setShowDeleteModal(false)
    }
    
    if (category.loading) {
        return <Spinner/>
    }

    return (
        <Layout sidebar>
            <Container>
                <Row>
                    <Col md={12}>
                        <div className={classes.titleContainer}>
                            <div>
                                <h3 style={{ margin: "0" }}>Categories</h3>
                            </div>
                            <div className={classes.buttonsContainer}>
                                <button onClick={handleShow}>
                                    <IoIosAddCircleOutline/>
                                    <span>Add</span>
                                </button>
                                <button onClick={() => {
                                    updateCheckedAndExpandedArray()
                                    setShowUpdateModal(true)
                                }}>
                                    <BiEditAlt/>
                                    <span>Edit</span>
                                </button>
                                <button onClick={() => {
                                    updateCheckedAndExpandedArray()
                                    setShowDeleteModal(true)
                                }}>
                                    <RiDeleteBin6Line/>
                                    <span>Delete</span>
                                </button>

                            </div>
                        </div>
                    </Col>
                    <Col md={12} className={classes.checkBoxContainer} >
                        <CheckboxTree
                            nodes={renderCategories(category.categories)}
                            checked={checked}
                            expanded={expanded}
                            onCheck={checked => setChecked(checked)}
                            onExpand={expanded => setExpanded(expanded)}
                            icons={{
                                check: <IoIosCheckbox />,
                                uncheck: <IoIosCheckboxOutline />,
                                halfCheck: <IoIosCheckboxOutline />,
                                expandClose: <IoIosArrowForward />,
                                expandOpen: <IoIosArrowDown />
                            }}
                        />
                        {/* {category.categories ? renderCategories(category.categories) : null} */}
                    </Col>
                </Row>
            </Container>
            <AddCategoryModal
                show={show}
                handleClose={handleClose}
                onAddNewCategory={onAddNewCategory}
                setName={setName}
                parentId={parentId}
                setParentId={setParentId}
                createCategoryOptions={createCategoryOptions}
                category={category}
                setImage={setImage}
                name={name}
            />
            <UpdateCategoriesModal
                showUpdateModal={showUpdateModal}
                setShowUpdateModal={setShowUpdateModal}
                parentId={parentId}
                setParentId={setParentId}
                onUpdateCategories={onUpdateCategories}
                checkedArray={checkedArray}
                expandedArray={expandedArray}
                handleCategoryInput={handleCategoryInput}
                createCategoryOptions={createCategoryOptions}
                category={category} />
            <DeleteCategoriesModal
                showDeleteModal={showDeleteModal}
                setShowDeleteModal={setShowDeleteModal}
                onDeleteCategories={onDeleteCategories}
                checkedArray={checkedArray}
            />
        </Layout>
    )
}

export default Category