import axios, { AxiosResponse } from 'axios';
import config from 'config';
import storage from 'services/storage';
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

const getHeaders = () => {
  const data = storage.getCredentials();
  if (data) {
    return {
      [`access-token`]: data.token,
      uid: data.uid,
      client: data.client,
    };
  }
  return {};
};

const Auth = {
  signIn: async (data: SignInRequest): Promise<AxiosResponse<SignInResponse>> =>
    client.post<SignInResponse>('/auth/sign_in', data),
  signUp: async (data: SignUpRequest): Promise<AxiosResponse<SignInResponse>> =>
    client.post<SignInResponse>('/auth', data),
  uploadPhoto: async (photo: File): Promise<string> =>
    client
      .post(
        '/s3/signed_url',
        { name: photo.name },
        {
          headers: getHeaders(),
        }
      )
      .then((r) => {
        /* eslint-disable */ client.put(r.data.signedUrl);
        return (
          'https://baseballcloud-staging-assets.s3.us-east-2.amazonaws.com/' +
          r.data.fileKey
        );
      }),
  signOut: async (): Promise<AxiosResponse<{ success: boolean }>> =>
    client.delete('/auth/sign_out', {
      headers: getHeaders(),
    }),
};

export default Auth;
