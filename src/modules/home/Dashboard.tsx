import { useEffect, useState } from 'react'

import { AppDashboard } from '@components'
import { enumDashboardFilterTime } from '@configs'
import {
  FilterDataItem,
  IDashboardPayload,
  StoreRoot,
  StoresInfo,
} from '@interfaces'
import { useAppDispatch } from '@redux'

export const DashboardNodule = () => {
  const dispatch = useAppDispatch()
  const [payload, setPayload] = useState<IDashboardPayload>({
    filterTime: enumDashboardFilterTime.ALL_DAYS,
    startTime: 0,
    endTime: 0,
    filterBranhGroup: '',
    filterStore: '',
  })

  const [stores, setStores] = useState<FilterDataItem[]>([])

  const getStores = async () => {
    try {
      const storePayload = {
        page: 1,
        title: '',
        limit: 20,
      }
      // dispatch(setLoading(true));
      // const res: StoreRoot = await storeAPI.getStores(storePayload)
      // const data = res.data.storesInfo as StoresInfo[]
      // const storesFilterData = data?.map((item) => {
      //   return {
      //     value: item?.id,
      //     label: item?.name,
      //   }
      // })
      // setStores(storesFilterData)
    } catch (error) {
    } finally {
      // dispatch(Loading(false));
    }
  }

  useEffect(() => {
    getStores()
  }, [])

  return (
    <AppDashboard
      payload={payload}
      setPayload={setPayload}
      storesFilterData={stores}
    />
  )
}
