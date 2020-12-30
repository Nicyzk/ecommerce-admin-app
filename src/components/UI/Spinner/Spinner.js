import { Spinner } from 'react-bootstrap'


const spinner = () => {
    return (
        <Spinner animation="border" variant="primary" style={{
            width: "100px",
            height: "100px",
            fontSize: "30px",
            position: "fixed",
            marginLeft: "calc((100vw - 100px)/2)",
            top: "35%"
        }} />
    )
}


export default spinner