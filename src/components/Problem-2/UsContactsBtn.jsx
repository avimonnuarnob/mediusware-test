import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function UsContactsBtn({ showModalB, setShowModalB, setShowModalA }) {
  const handleClose = () => setShowModalB(false);
  const handleShow = () => setShowModalB(true);
  const switchToModalA = () => {
    setShowModalB(false);
    setShowModalA(true);
  };

  return (
    <>
      <button
        className='btn btn-lg btn-outline-warning'
        type='button'
        onClick={handleShow}
      >
        US Contacts
      </button>
      <Modal show={showModalB} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading B</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you are reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant='primary' onClick={switchToModalA}>
            All Contacts
          </Button>
          <Button variant='primary'>US Contacts</Button>
          <Button variant='secondary' onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default UsContactsBtn;
