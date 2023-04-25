import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import {
  GetKpisResponse,
  GetProductsResponse,
  GetTransactionsResponse,
  GetHandstandsResponse,
  GetBacklogResponse,
} from "./types"

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_URL }),
  reducerPath: "main",
  tagTypes: ["Kpis", "Products", "Transactions", "Handstands", "Backlog"],

  endpoints: (build) => ({
    getKpis: build.query<Array<GetKpisResponse>, void>({
      query: () => "kpi/kpis/",
      providesTags: ["Kpis"],
    }),
    getProducts: build.query<Array<GetProductsResponse>, void>({
      query: () => "product/products/",
      providesTags: ["Products"],
    }),
    getTransactions: build.query<Array<GetTransactionsResponse>, void>({
      query: () => "transaction/transactions/",
      providesTags: ["Transactions"],
    }),
    getHandstands: build.query<Array<GetHandstandsResponse>, void>({
      query: () => "notion/handstands/",
      providesTags: ["Handstands"],
    }),
    getBacklog: build.query<Array<GetBacklogResponse>, void>({
      query: () => "notion/backlog/",
      providesTags: ["Backlog"],
    }),
  }),
})

export const {
  useGetKpisQuery,
  useGetProductsQuery,
  useGetTransactionsQuery,
  useGetHandstandsQuery,
  useGetBacklogQuery,
} = api
