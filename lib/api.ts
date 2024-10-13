export class RestClientError extends Error {
  readonly response: Omit<Response, keyof Body>;
  readonly data: object;

  constructor(response: Response, data: object) {
    const json = JSON.stringify(response, null, 2);
    super(`An API error with status ${response.status} occurred:\n${json}`);
    this.response = response;
    this.data = data;
  }
}

export interface RestClientOptions {
  baseUrl: string;
}

export type RestClientParams = Record<
  string,
  string | number | boolean | undefined | null
>;

export interface RestClientRequestInit extends Omit<RequestInit, "body"> {
  params?: RestClientParams;
  body?: object;
}

export class RestClient {
  readonly baseUrl: string;

  constructor(options: RestClientOptions) {
    this.baseUrl = options.baseUrl;
  }

  async post<T>(endpoint: string, options?: RestClientRequestInit) {
    return this.fetch<T>(endpoint, { ...options, method: "POST" });
  }

  async get<T>(endpoint: string, options?: RestClientRequestInit) {
    return this.fetch<T>(endpoint, { ...options, method: "GET" });
  }

  async put<T>(endpoint: string, options?: RestClientRequestInit) {
    return this.fetch<T>(endpoint, { ...options, method: "PUT" });
  }

  async delete<T>(endpoint: string, options?: RestClientRequestInit) {
    return this.fetch<T>(endpoint, { ...options, method: "DELETE" });
  }

  async patch<T>(endpoint: string, options?: RestClientRequestInit) {
    return this.fetch<T>(endpoint, { ...options, method: "PATCH" });
  }

  async head<T>(endpoint: string, options?: RestClientRequestInit) {
    return this.fetch<T>(endpoint, { ...options, method: "HEAD" });
  }

  async options<T>(endpoint: string, options?: RestClientRequestInit) {
    return this.fetch<T>(endpoint, { ...options, method: "OPTIONS" });
  }

  private async fetch<T>(endpoint: string, options?: RestClientRequestInit) {
    const requestBody = options?.body;
    const requestUrl = this.buildUrl(endpoint, options?.params);
    const request = new Request(requestUrl, {
      ...options,
      body: requestBody && JSON.stringify(requestBody),
      headers: {
        ...options?.headers,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    const response = await fetch(request);
    const responseBody = await response.json();
    if (!response.ok) {
      throw new RestClientError(response, responseBody);
    }

    return responseBody as T;
  }

  private buildUrl(endpoint: string, params?: RestClientParams): string {
    const endpointUrl = this.baseUrl + endpoint;
    if (!params) {
      return endpointUrl;
    }

    const filteredParams = Object.entries(params)
      .filter(([, v]) => v != null)
      .map(([k, v]) => [k, v?.toString()]);

    if (!filteredParams.length) {
      return endpointUrl;
    }

    const queryEntries = Object.fromEntries(filteredParams);
    const queryString = new URLSearchParams(queryEntries).toString();
    return endpointUrl + queryString;
  }
}
