import axios from 'axios'

const axiosInstance = axios.create({
  headers: {
    Authorization: 'Bearer ' + localStorage.getItem('token')
  },
  baseURL: 'https://localhost:5001/api'
});

export function updateAxiosHeader() {
  axiosInstance.defaults.headers.Authorization = 'Bearer ' + localStorage.getItem('token')
}

//TODO check if this behaves correctly after logout
export default axiosInstance;