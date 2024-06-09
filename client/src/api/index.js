import axios from "axios";
import { PATHS, SERVER_URL } from "../utils/constants";

export const apiClient = axios.create({
    baseURL: SERVER_URL
})