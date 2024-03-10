import React, { useState } from 'react';
import AllContactsBtn from './Problem-2/AllContactsBtn';
import UsContactsBtn from './Problem-2/UsContactsBtn';

const Problem2 = () => {
  const [showModalA, setShowModalA] = useState(false);
  const [showModalB, setShowModalB] = useState(false);

  return (
    <div className='container'>
      <div className='row justify-content-center mt-5'>
        <h4 className='text-center text-uppercase mb-5'>Problem-2</h4>

        <div className='d-flex justify-content-center gap-3'>
          <AllContactsBtn
            showModalA={showModalA}
            setShowModalA={setShowModalA}
            setShowModalB={setShowModalB}
          />
          <UsContactsBtn
            showModalB={showModalB}
            setShowModalB={setShowModalB}
            setShowModalA={setShowModalA}
          />
        </div>
      </div>
    </div>
  );
};

export default Problem2;
