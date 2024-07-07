import axios from 'axios';
import React, { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
const UploadStudent = ({ show, handleClose, exam }) => {
    const ExamApi = process.env.REACT_APP_API_BASE_URL +'/StudentExam';
    const [selectedFile, setSelectedFile] = useState(null);
    const [errorMessage, setErrorMessage ] = useState("");
    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };
    const handleUploadStudent = async () => {
        if (!selectedFile) {
            setErrorMessage("Vui lòng chọn file để tải lên!")
            return;
        }
        const allowedExtensions = /(\.xls|\.xlsx)$/i;
        if (!allowedExtensions.exec(selectedFile.name)) {
            setErrorMessage("Vui lòng tải lên file Excel!")
            return;
        }
        const formData = new FormData();
        formData.append('file', selectedFile);
        try {
            handleClose();
            const response = await axios.post(ExamApi+'/Upload?examId=' + exam.examId, formData,
                                    { headers: { 'Content-Type': 'multipart/form-data'}});
            alert(response.data);
        } catch (error){
            setErrorMessage("Lỗi: " + error)
        }
    };
    return (
        <Modal show={show} onHide={handleClose} backdrop="static">
            <Modal.Header closeButton>
                <Modal.Title>Nhập danh sách thí sinh từ file Excel</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3">
                        <h2 className='text-danger'>{errorMessage}</h2>
                        <Form.Control type="file" accept=".xlsx, .xls" onChange={handleFileChange} />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="success" onClick={handleClose}>Cancel</Button>
                <Button variant="primary" type="submit" onClick={handleUploadStudent}>Upload</Button>
            </Modal.Footer>
        </Modal>
    );
};
export default UploadStudent;