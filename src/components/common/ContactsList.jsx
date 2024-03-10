import { useCallback, useEffect, useRef, useState } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const ContactsList = ({ contactsInfo, setTriggerFetch }) => {
  const [showModalC, setShowModalC] = useState(false);
  const [contactInfo, setContactInfo] = useState(null);

  const loader = useRef(null);

  const handleClose = () => setShowModalC(false);
  const handleShow = (contactInfo) => {
    setContactInfo(contactInfo);
    setShowModalC(true);
  };

  const handleObserver = useCallback((entries) => {
    const target = entries[0];
    if (target.isIntersecting) {
      setTriggerFetch(true);
    }
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, { threshold: 0 });
    if (loader.current) observer.observe(loader.current);
  }, []);
  return (
    <>
      <ListGroup>
        {contactsInfo?.map((contact) => (
          <ListGroup.Item
            style={{ cursor: 'pointer' }}
            onClick={() => handleShow(contact.country)}
            key={contact.id}
          >
            {contact.phone}
          </ListGroup.Item>
        ))}
      </ListGroup>
      <div ref={loader} />
      <Modal show={showModalC} onHide={handleClose} backdrop={true}>
        <Modal.Header closeButton>
          <Modal.Title>Modal C</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ maxHeight: '400px', overflow: 'auto' }}>
          {JSON.stringify(contactInfo)}
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ContactsList;
