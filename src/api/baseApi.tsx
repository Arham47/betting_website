import { constRoute } from "@utils/route";
import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosError,
  CancelTokenSource,
  CancelToken,
} from "axios";
import { camelCase, isArray, isObject, mapKeys, mapValues } from "lodash";
import { notification } from "../utils/notifications";
import { flushTokenFromCookies } from "./common-utils";

const tokenSources: {
  [key: string]: CancelTokenSource;
} = {};

export type ApiErrorType = {
  statusCode: number;
  errorCode: string;
  message: string;
};

function pushToLoginOrRegister() {
  flushTokenFromCookies();
  const nextUrl = window.location.pathname + window.location.search;
  const isJWT = window.location.search.includes("jwtToken=");
  if (
    window.location.pathname !== constRoute.login &&
    !isJWT
  ) {
    localStorage.setItem("nextUrl", nextUrl);
  }
  window.location.href = constRoute.login;
}

async function onCancelRequest(config) {
  // if cancelToken is defined, we will cancel previous request and create a new token for new request.
  if (config.cancelToken) {
    const key = config.url;
    let tokenSource = tokenSources[key ?? 0];
    if (tokenSource && tokenSource?.cancel) {
      tokenSource?.cancel("Operation canceled due to new request");
    }
    tokenSource = axios.CancelToken.source();
    config.cancelToken = tokenSource.token;
    tokenSources[key ?? 0] = tokenSource;
  }

  return config;
}

async function onError(
  error: AxiosError,
  axiosInstance: AxiosInstance,
  errorList?: ApiErrorType[]
) {
  let throwError = true;
  // return valid/empty response and exit
  if (axios.isCancel(error)) {
    console.warn(error);
    return Promise.resolve({ data: { isCancel: true } });
  }
  // Common error handling
  const { response }: any = error;
  if (!response) {
    notification.info("Something went wrong.");
  } else if (response.status === 401) {
    // Interceptor that retries 401s by refreshing
    // tokens automatically only if token exists.
    notification.info("Your session has expired. Please login again.");
    pushToLoginOrRegister();
  } else {
    // Any other error.
    const { status, data }: any = response;
    if (errorList && errorList.length) {
      const errorItem = errorList
        .filter(
          (err) => err.statusCode === status && err.errorCode === data.code
        )
        .pop();
      if (errorItem) {
        throwError = false;
        notification.info(errorItem.message);
      }
    }
  }
  if (throwError) {
    throw error;
  }
}

function keysToCamelCase<T>(obj: T): T {
  if (isArray(obj)) {
    // @ts-ignore
    return obj.map(keysToCamelCase);
  }
  if (!isObject(obj)) {
    return obj;
  }
  const fixedKeys = mapKeys(obj, (value, key) => camelCase(key));
  // @ts-ignore
  return mapValues(fixedKeys, keysToCamelCase);
}

// tslint:disable-next-line:no-any
function transformResponse(data: any): any {
  return keysToCamelCase(data);
}

function getDefaultTransformResponse(): any[] {
  const axiosDefault = axios.defaults.transformResponse;
  if (axiosDefault == null) {
    return [transformResponse];
  }
  if (isArray(axiosDefault)) {
    // @ts-ignore
    return axiosDefault?.concat(transformResponse);
  }
  // @ts-ignore
  return [axiosDefault, transformResponse];
}

const CAMEL_CASE_DEFAULT_CONFIG: AxiosRequestConfig = {
  transformResponse: getDefaultTransformResponse(),
};

export class BaseApi {
  axios: AxiosInstance;
  axiosWithoutAuth: AxiosInstance;
  cancelToken: CancelToken;

  constructor(baseURL?: string, errorList?: ApiErrorType[]) {
    this.axios = axios.create({ ...CAMEL_CASE_DEFAULT_CONFIG, baseURL });
    this.axios.interceptors.response.use(
      (res) => res,
      (err) => onError(err, this.axios, errorList)
    );
    this.axios.interceptors.request.use(onCancelRequest);
    this.axiosWithoutAuth = axios.create({
      ...CAMEL_CASE_DEFAULT_CONFIG,
      baseURL,
    });
    this.cancelToken = axios.CancelToken.source().token;
  }
}
