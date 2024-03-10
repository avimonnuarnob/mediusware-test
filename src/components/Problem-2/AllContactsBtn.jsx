import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ContactsList from '../common/ContactsList';

function AllContactsBtn({ showModalA, setShowModalA, setShowModalB }) {
  const [loading, setLoading] = useState(false);
  const [nextPage, setNextPage] = useState(null);
  const [triggerFetch, setTriggerFetch] = useState(false);
  const [contactsInfo, setContactsInfo] = useState(null);

  const handleClose = () => setShowModalA(false);
  const handleShow = () => setShowModalA(true);
  const switchToModalB = () => {
    setShowModalA(false);
    setShowModalB(true);
  };

  const fetchApi = (
    apiEndPoint = 'https://contact.mediusware.com/api/contacts/',
  ) => {
    setLoading(true);
    fetch(apiEndPoint)
      .then((response) => response.json())
      .then((result) => {
        if (contactsInfo?.length) {
          setContactsInfo(contactsInfo.concat(result.results));
        } else {
          setContactsInfo(result.results);
        }

        setNextPage(result.next);
      })
      .finally(() => {
        setLoading(false);
        setTriggerFetch(false);
      });
  };

  useEffect(() => {
    if (showModalA) {
      fetchApi();
    }
  }, [showModalA]);

  useEffect(() => {
    if (triggerFetch && nextPage) {
      fetchApi(nextPage);
    }
  }, [triggerFetch, nextPage]);

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
        <Modal.Body style={{ maxHeight: '400px', overflow: 'auto' }}>
          <ContactsList
            contactsInfo={contactsInfo}
            setTriggerFetch={setTriggerFetch}
          />
          {loading ? <p>Loading...</p> : null}
        </Modal.Body>
        <Modal.Footer>
          <Button variant='primary' disabled={loading}>
            All Contacts
          </Button>
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
