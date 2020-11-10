import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Details, TopMenu, ListDetails } from '../../../Components';
import takeSalesId from '../../../Services/apiSalesRequestId';

const AdminDetails = () => {
  const [status, setStatus] = useState('Pendente');
  const [info, setInfo] = useState(null);
  const { id } = useParams();
  const socket = useSelector(state => state.socketReducer.socket);
  

  async function chamarApi() {
    const data = await takeSalesId(id);
    return setInfo(data);
  }

  useEffect(() => {
    chamarApi();
  },[id]);


  socket.emit('Status-id', id);
  socket.on('Status', ({ status }) => setStatus(status));

  return (
    <div>
      <TopMenu />
      {info && (
        <Details
          info={ info }
          id={ info.id }
          total={ info.totalPrice }
          numeroPedido={ info.id }
          status={ status }
          data={ info.date }
          setInfo={ setInfo }
        >
          <ListDetails info={info} />
        </Details>
      )}
    </div>
  );
};

export default AdminDetails;
