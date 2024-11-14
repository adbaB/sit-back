export class CreatedResponse<E> {
  status: number;
  message: string;
  data: E;
}

export class LoginResponse {
  status: number;
  message: string;
  data: {
    accessToken: string;
    refreshToken: string;
  };
}
