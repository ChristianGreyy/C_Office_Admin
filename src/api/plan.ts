import {
  ICreatePlanSuccessData,
  IDeletePlanSuccessData,
  IFetchPlansParams,
  IFetchPlansSuccessData,
  IGetPlanByIdSuccessData,
  TPlanPayload,
} from '@interfaces'
import axiosClient, { ApiClient } from './axiosClient'

export const getAllPlan = async (params?: IFetchPlansParams) => {
  return await ApiClient.get<IFetchPlansSuccessData>('/bundles', {
    params,
  })
}

export const getPlanById = async (id: string) => {
  return await ApiClient.get<IGetPlanByIdSuccessData>(`/bundles/${id}`)
}

export const deletePlanById = async (id: string) => {
  return await ApiClient.delete<IDeletePlanSuccessData>(`/bundles/${id}`)
}

export const createPlan = async (payload: TPlanPayload) => {
  return await ApiClient.post<ICreatePlanSuccessData, TPlanPayload>(
    `/bundles`,
    payload
  )
}

export const updatePlanById = async (
  payload: TPlanPayload & { id: string }
) => {
  const { id, ...passPayload } = payload
  return await axiosClient.patch(`/bundles/${id}`, passPayload)
}
