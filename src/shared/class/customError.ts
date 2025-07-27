export class ServerActionError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ServerActionError';
  }
}

export class FrontendError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'FrontendError';
  }
}

export class ServerError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ServerError';
  }
}

export class AxiosResponseError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'AxiosResponseError';
  }
}

export class ErrorPageError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ErrorPageError';
  }
}

export class GlobalErrorPageError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'GlobalErrorPageError';
  }
}

export class ServerSessionError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ServerSessionError';
  }
}

export class ApiError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ApiError';
  }
}

export class JWTError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'JWTError';
  }
}
