import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, DropdownButton, DropdownItem, InputGroup, Modal, Table } from 'react-bootstrap';
import { format } from 'date-fns';
import ExamCreate from './ExamCreate';
import ExamEdit from './ExamEdit';
import UploadStudent from './UploadStudent';
import { FaRegEdit } from 'react-icons/fa';
import { MdDeleteForever, MdUpload } from 'react-icons/md';
const ExamList = () => {
  const ExamApi = process.env.REACT_APP_API_BASE_URL +'/exam';
  const [exams, setExams] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedExam, setSelectedExam] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const response = await axios.get(ExamApi);
      setExams(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  const handleShowCreateModal = () => {
    setShowCreateModal(true);
  };
  const handleCloseCreateModal = () => {
    setShowCreateModal(false);
  };
  const handleShowEditModal = (exam) => {
    setSelectedExam(exam);
    setShowEditModal(true);
  };
  const handleCloseEditModal = () => {
    setSelectedExam(null);
    setShowEditModal(false);
  };
  const handleShowDeleteModal = (exam) => {
    setSelectedExam(exam);
    setShowDeleteModal(true);
  };
  const handleCloseDeleteModal = () => {
    setSelectedExam(null);
    setShowDeleteModal(false);
  };
  const handleConfirmDelete = async () => {
    try {
      await axios.delete(`${ExamApi}/${selectedExam.examId}`);
      fetchData();
      handleCloseDeleteModal();
    } catch (error) {
      console.error(error);
    }
  };
  const handleShowUploadModal = (exam) => {
    setSelectedExam(exam);
    setShowUploadModal(true);
  };
  const handleCloseUploadModal = () => {
    setSelectedExam(null);
    setShowUploadModal(false);
  };
  return (
    <div className='m-3'>
      <div className="d-flex justify-content-between mb-2">
        <br/>
        <Button variant="primary" onClick={handleShowCreateModal}>
          + Create new
        </Button>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Mã</th>
            <th>Tên kỳ thi</th>
            <th>Ngày tạo</th>
            <th>Ghi chú</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {exams.map((exam) => (
            <tr key={exam.examId}>
              <td>{exam.examCode}</td>
              <td>{exam.examName}</td>
              <td>{format(exam.createDate,'dd/MM/yyyy')}</td>
              <td>{exam.note}</td>
              <td>
                <InputGroup className='mb-3'>
                  <DropdownButton variant="success" title="Actions" id="input-group-dropdown-1">
                    <DropdownItem onClick={() => handleShowEditModal(exam)}><FaRegEdit 
                        className="text-success ud-cursor mb-1 mx-1"/>Edit</DropdownItem>
                    <DropdownItem variant="danger" onClick={() => handleShowDeleteModal(exam)}>
                      <MdDeleteForever size={20} className="text-danger ud-cursor mb-1 mx-0"/>
                        Delete
                    </DropdownItem>
                    <DropdownItem variant="primary" onClick={() => handleShowUploadModal(exam)}>
                      <MdUpload size={20} className='text-primary'/>
                      Upload Student List
                    </DropdownItem>
                  </DropdownButton>
                </InputGroup>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <ExamCreate show={showCreateModal} handleClose={handleCloseCreateModal} 
        fetchData={fetchData} />
      {selectedExam && (
        <>
          <ExamEdit
            show={showEditModal}
            handleClose={handleCloseEditModal}
            fetchData={fetchData}
            exam={selectedExam}
          />
          <Modal show={showDeleteModal} onHide={handleCloseDeleteModal}>
            <Modal.Header closeButton>
              <Modal.Title>Bạn có muốn xoá bản ghi này không?</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p>{selectedExam.examName}</p>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseDeleteModal}>
                Cancel
              </Button>
              <Button variant="danger" onClick={handleConfirmDelete}>
                Delete
              </Button>
            </Modal.Footer>
          </Modal>
          <UploadStudent
            show={showUploadModal}
            handleClose={handleCloseUploadModal}
            exam={selectedExam}
          />
        </>
      )}
    </div>
  );
};
export default ExamList;