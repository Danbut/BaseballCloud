import axios, { AxiosResponse } from 'axios';
import config from 'config';
import { SignInRequest } from './dto/SignInRequestTransformer';
import { SignInResponse } from './dto/SignInResponseTransformer';
import { SignUpRequest } from './dto/SignUpRequestTransformer';

const client = axios.create({
  baseURL: config.API_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  timeout: 3000,
});

const Auth = {
  signIn: async (data: SignInRequest): Promise<AxiosResponse<SignInResponse>> =>
    client.post<SignInResponse>('/auth/sign_in', data),
  signUp: async (data: SignUpRequest): Promise<AxiosResponse<SignInResponse>> =>
    client.post<SignInResponse>('/auth', data),
};

export default Auth;
