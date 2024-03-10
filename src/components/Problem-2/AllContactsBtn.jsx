import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function AllContactsBtn({ showModalA, setShowModalA, setShowModalB }) {
  const handleClose = () => setShowModalA(false);
  const handleShow = () => setShowModalA(true);
  const switchToModalB = () => {
    setShowModalA(false);
    setShowModalB(true);
  };

  return (
    <>
      <button
        className='btn btn-lg btn-outline-primary'
        type='button'
        onClick={handleShow}
      >
        All Contacts
      </button>
      <Modal show={showModalA} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading A</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you are reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant='primary'>All Contacts</Button>
          <Button variant='primary' onClick={switchToModalB}>
            US Contacts
          </Button>
          <Button variant='secondary' onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AllContactsBtn;
