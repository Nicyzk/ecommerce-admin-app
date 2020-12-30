import React from 'react'
import Modal from '../../../components/UI/Modal/Modal'

const deleteCategoriesModal = (props) => {
    const {
        showDeleteModal,
        setShowDeleteModal,
        onDeleteCategories,
        checkedArray
    } = props
    return (
        <Modal
            show={showDeleteModal}
            handleClose={() => setShowDeleteModal(false)}
            title="Confirm Delete"
            buttons={[
                {
                    label: "No",
                    variant: "primary",
                    onClick: () => { setShowDeleteModal(false) }
                },
                {
                    label: "Yes",
                    variant: "danger",
                    onClick: onDeleteCategories
                }
            ]}
        >
            <h6>Are you sure? You want to delete:</h6>
            {checkedArray.map(item => <div>{item.name}</div>)}
        </Modal>
    )
}

export default deleteCategoriesModal