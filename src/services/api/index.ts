import axios from 'axios';
import config from 'config';
import { SignInRequest } from 'services/api/dto/SignInRequestTransformer';
import { SignInResponse } from 'services/api/dto/SignInResponseTransformer';
import { SignUpRequest } from 'services/api/dto/SignUpRequestTransformer';

const client = axios.create({
  baseURL: config.API_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  timeout: 3000,
});

const Auth = {
  signIn: async (data: SignInRequest) =>
    client.post<SignInResponse>('/auth/sign_in', data),
  signUp: async (data: SignUpRequest) =>
    client.post<SignInResponse>('/auth', data),
};

export default Auth;
