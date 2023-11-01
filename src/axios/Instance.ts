import axios from 'axios';
import {BASE_URL} from '../utils/constants';

const Instance = axios.create({
  baseURL: BASE_URL,
});

export default Instance;
