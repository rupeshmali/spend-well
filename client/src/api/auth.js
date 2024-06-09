import { apiClient } from ".";

const prefix = '/auth';

export const signUp = async (payload) => apiClient.post(`${prefix}/sign-up`, payload);

export const signIn = async (payload) => apiClient.post(`${prefix}/sign-in`, payload);