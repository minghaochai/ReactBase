import {
  isRejected,
  isRejectedWithValue,
  Middleware,
  MiddlewareAPI,
} from '@reduxjs/toolkit';
import { FetchBaseQueryMeta } from '@reduxjs/toolkit/dist/query';
import { t } from 'i18next';
import log from 'loglevel';

// import { showToast } from '../components/toast';
import { ErrorResponseModel } from '../models';
import { FlattenObject } from './FlattenObject';

const isReqError = (
  baseQueryMeta: any,
): baseQueryMeta is FetchBaseQueryMeta => {
  return (
    Object.hasOwn(baseQueryMeta, 'request') &&
    !Object.hasOwn(baseQueryMeta, 'response')
  );
};

const isRespError = (
  baseQueryMeta: any,
): baseQueryMeta is FetchBaseQueryMeta => {
  return Object.hasOwn(baseQueryMeta, 'response');
};

const isCustomErrorResponse = (
  payload: any,
): payload is { errors: ErrorResponseModel } => {
  return (
    Object.hasOwn(payload, 'data') &&
    Object.hasOwn(payload.data, 'errors') &&
    Array.isArray(payload.data.errors)
  );
};

export const rtkQueryErrorLogger: Middleware =
  (api: MiddlewareAPI) => (next) => (action) => {
    if (isRejectedWithValue(action) && isCustomErrorResponse(action.payload)) {
      const error = action.payload.data.errors[0]?.message
        ? action.payload.data.errors[0].message
        : t('common.errorDesc') ?? '';
      // showToast({
      //   description: error,
      //   title: t('common.errorTitle') ?? '',
      //   type: 'error',
      // });
    }

    if (isRejected(action) && Object.hasOwn(action.meta, 'baseQueryMeta')) {
      if (isReqError(action.meta.baseQueryMeta)) {
        log.error('Request error ==============');
        log.error(FlattenObject(action.meta.baseQueryMeta.request));
      }

      if (isRespError(action.meta.baseQueryMeta)) {
        log.error('Response error ==============');
        log.error(FlattenObject(action.meta.baseQueryMeta.response));
      }
    }

    return next(action);
  };
