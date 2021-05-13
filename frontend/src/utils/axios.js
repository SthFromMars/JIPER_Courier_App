import axios from 'axios'

//TODO check if this behaves correctly after logout
export default axios.create({
  headers: {
    Authorization: 'Bearer ' + localStorage.getItem('token')
  },
  baseURL: 'https://localhost:5001/api'
});