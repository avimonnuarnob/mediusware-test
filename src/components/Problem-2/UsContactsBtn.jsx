import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ContactsList from '../common/ContactsList';

function UsContactsBtn({ showModalB, setShowModalB, setShowModalA }) {
  const [loading, setLoading] = useState(false);
  const [nextPage, setNextPage] = useState(null);
  const [triggerFetch, setTriggerFetch] = useState(false);
  const [contactsInfo, setContactsInfo] = useState(null);

  const handleClose = () => setShowModalB(false);
  const handleShow = () => setShowModalB(true);
  const switchToModalA = () => {
    setShowModalB(false);
    setShowModalA(true);
  };

  const fetchApi = (
    apiEndPoint = 'https://contact.mediusware.com/api/country-contacts/united%20states/',
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
    if (showModalB) {
      fetchApi();
    }
  }, [showModalB]);

  useEffect(() => {
    if (triggerFetch && nextPage) {
      fetchApi(nextPage);
    }
  }, [triggerFetch, nextPage]);
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
        <Modal.Body style={{ maxHeight: '400px', overflow: 'auto' }}>
          <ContactsList
            contactsInfo={contactsInfo}
            setTriggerFetch={setTriggerFetch}
          />
          {loading ? <p>Loading...</p> : null}
        </Modal.Body>
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
