export class PayloadToken {
  readonly id: number;
  readonly username: string;
  readonly name: string;
  readonly permissions: number[];
}

export class JwtTokenPayload {
  readonly id: number;
  readonly username: string;
  readonly name: string;
  readonly permissions: number[];
  readonly iat: number;
  readonly exp: number;
}
