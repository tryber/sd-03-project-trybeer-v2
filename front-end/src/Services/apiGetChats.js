import axios from 'axios';
import { catchRequestErr, NO_CONNECTIO } from './catchRequest';

const URL = 'http://localhost:3001/admin/chats';

const apiGetChats = () => axios
  .get(URL, { headers: { Authorization: localStorage.getItem('token') } })
  .then((chats) => chats.data || Promise.reject(NO_CONNECTIO))
  .catch(catchRequestErr);

export default apiGetChats;
