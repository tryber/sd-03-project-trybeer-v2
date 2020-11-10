import React, { useState } from "react";
import { useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import handleDate from '../../../Services/handleDate';
import convertBRL from "../../../Services/BRLFunction";
import "./style.css";

const SaleCard = ({ id, date, total, index }) => {
  const [status, setStatus] = useState('Pendente');
  const socket = useSelector(state => state.socketReducer.socket);

  socket.emit('Status-id', id);
  socket.on('Status', ({ status }) => setStatus(status));
  
  return (
    <Link to={`/orders/${id}`} className="sale-card">
      <h3 className="sale-detail" data-testid={`${index}-order-number`}>
        Pedido {id}
      </h3>
      <p className="sale-detail sale-date" data-testid={`${index}-order-date`}>
        {handleDate(date)}
      </p>
      <p className="sale-detail" data-testid={`${index}-order-total-value`}>
        {convertBRL(total)}
      </p>
      <p>{status}</p>
    </Link>
  );
};

export default SaleCard;
