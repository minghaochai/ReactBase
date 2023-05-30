import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/dist/query';
import {
  EndpointBuilder,
  MutationDefinition,
  QueryDefinition,
} from '@reduxjs/toolkit/dist/query/endpointDefinitions';

import { PageRequestModel, PageResponseModel } from '../models';

export class BaseActionApi<T> {
  protected route: string;
  protected baseUrl?: string = process.env.REACT_APP_API_BASE_URL;

  constructor(route: string) {
    this.route = route;
  }

  getById(
    builder: EndpointBuilder<
      BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError>,
      any,
      'api'
    >,
  ): QueryDefinition<
    {
      path?: string;
      id: string;
    },
    BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError>,
    any,
    T,
    'api'
  > {
    return builder.query<T, { path?: string; id: string }>({
      query: ({ path, id }) => {
        return {
          url: `${this.joinPath(path)}/${id}`,
          method: 'GET',
        };
      },
    });
  }

  getQueryList<TData = T, TModel = T>(
    builder: EndpointBuilder<
      BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError>,
      any,
      'api'
    >,
  ): QueryDefinition<
    { path?: string; params: PageRequestModel<TModel> },
    BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError>,
    any,
    PageResponseModel<TData>,
    'api'
  > {
    return builder.query<
      PageResponseModel<TData>,
      { path?: string; params: PageRequestModel<TModel> }
    >({
      query: ({ path, params }) => {
        return {
          url: `${this.joinPath(path)}`,
          method: 'GET',
          params: params,
        };
      },
    });
  }

  add<TData = T>(
    builder: EndpointBuilder<
      BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError>,
      any,
      'api'
    >,
  ): MutationDefinition<
    { path?: string; data: TData },
    BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError>,
    any,
    TData,
    'api'
  > {
    return builder.mutation<TData, { path?: string; data: TData }>({
      query: ({ path, data }) => {
        return {
          url: `${this.joinPath(path)}`,
          method: 'POST',
          body: data,
        };
      },
    });
  }

  delete(
    builder: EndpointBuilder<
      BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError>,
      any,
      'api'
    >,
  ): MutationDefinition<
    { path?: string; id: string },
    BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError>,
    any,
    any,
    'api'
  > {
    return builder.mutation<any, { path?: string; id: string }>({
      query: ({ path, id }) => {
        return {
          url: `${this.joinPath(path)}/${id}`,
          method: 'DELETE',
        };
      },
    });
  }

  edit<TData = T>(
    builder: EndpointBuilder<
      BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError>,
      any,
      'api'
    >,
  ): MutationDefinition<
    { path?: string; id?: string; data?: TData },
    BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError>,
    any,
    TData,
    'api'
  > {
    return builder.mutation<
      TData,
      { path?: string; id?: string; data?: TData }
    >({
      query: ({ path, id = '', data }) => {
        return {
          url: `${this.joinPath(path)}/${id}`,
          method: 'PUT',
          body: data,
        };
      },
    });
  }

  joinPath = (path?: string) =>
    `${this.baseUrl}${this.route}${path ? path : ''}`;
}
