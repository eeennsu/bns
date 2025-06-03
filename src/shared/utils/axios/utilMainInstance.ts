import axios from 'axios';

const axiosMain = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosMain;
