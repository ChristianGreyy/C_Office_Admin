import styled from 'styled-components'

import {
  DASHBOARD_FILTER_TIME,
  dateFormat,
  enumDashboardFilterTime,
  enumThemeMode,
  TOP_FILTER,
} from '@configs'
import {
  ActiveMemberChartModule,
  OverviewModule,
  TierChartModule,
  TopSpentUserTableModule,
} from '@modules'
import { setThemeMode, useAppDispatch } from '@redux'
import { ShareDateSelect, ShareSelectInput } from '../shared'
import { Dispatch, SetStateAction, useState } from 'react'
import { FilterDataItem, IDashboardPayload, StoresInfo } from '@interfaces'
import { themes } from '@theme'

interface IProps {
  payload: IDashboardPayload
  setPayload: Dispatch<SetStateAction<IDashboardPayload>>
  storesFilterData: FilterDataItem[]
}

export const AppDashboard = (props: IProps) => {
  const { payload, storesFilterData, setPayload } = props
  const [limit, setLimit] = useState(10)
  const dispatch = useAppDispatch()

  const handleChangeTheme = () => {
    dispatch(setThemeMode(enumThemeMode.DARK))
  }

  const handleChangeLight = () => {
    dispatch(setThemeMode(enumThemeMode.LIGHT))
  }
  const onLimitChange = (num: number) => {
    setLimit(num)
  }

  return (
    <StyledDashboard>
      {process.env.NODE_ENV === 'development' && (
        <div className="filters mb-5">
          <div className="main-filters flex">
            <ShareSelectInput
              data={DASHBOARD_FILTER_TIME}
              onChange={(value: any) =>
                setPayload({ ...payload, filterTime: value })
              }
              placeholder="Time"
              className="time-select"
              defaultValue={DASHBOARD_FILTER_TIME[0].value}
            />
            <ShareSelectInput
              data={storesFilterData}
              onChange={(value: any) =>
                setPayload({ ...payload, filterStore: value })
              }
              placeholder="Store"
              className="store-select"
              containerClassName="ml-3"
              showSearch
            />
            <ShareSelectInput
              data={[]}
              onChange={(value: any) =>
                setPayload({ ...payload, filterBranhGroup: value })
              }
              placeholder="Branch groups"
              className="branch-group-select"
              containerClassName="ml-3"
            />
          </div>
          {payload.filterTime === enumDashboardFilterTime.CUSTOM && (
            <div className="flex items-center mt-3">
              <ShareDateSelect
                containerClassName="from-time"
                inputClassName={'time-select from-time-input'}
                placeholder="From"
                format={dateFormat}
                onChange={(date, dateString) => {
                  const startDate = date?.startOf('day')?.valueOf() || 0
                  setPayload({ ...payload, startTime: startDate })
                }}
              />
              <ShareDateSelect
                inputClassName={'time-select end-time-input'}
                containerClassName="to-time ml-4"
                placeholder="To"
                format={dateFormat}
                onChange={(date, dateString) => {
                  const endDate = date?.endOf('day')?.valueOf() || 0
                  setPayload({ ...payload, endTime: endDate })
                }}
              />
            </div>
          )}
        </div>
      )}
      <div className="dashboard-contain">
        <OverviewModule dashboardPayload={payload} />
      </div>
      <div className="grid grid-cols-12 gap-6">
        <div className="box col-span-12 lg:col-span-6 mt-8">
          <div>
            <ActiveMemberChartModule dashboardPayload={payload} />
          </div>
        </div>
        <div
          className="box col-span-12 sm:col-span-6 lg:col-span-6 mt-8 pr-10"
          id="tiers-chart_contain"
        >
          <h4>Member tier</h4>
          <TierChartModule />
        </div>
        <div className="box col-span-12">
          <div className="head__actions">
            <h4>Top spent users</h4>
            <ShareSelectInput
              data={TOP_FILTER}
              onChange={(value: any) => onLimitChange(Number(value))}
              placeholder="Top 10/20/50"
              required
              className="type-select"
            />
          </div>
          <TopSpentUserTableModule limit={limit} dashboardPayload={payload} />
        </div>
      </div>
    </StyledDashboard>
  )
}

export const StyledDashboard = styled.div`
  .filters {
    .main-filters {
      .time-select {
        width: fit-content;
        min-width: 12rem;
      }
      .store-select {
        width: fit-content;
        min-width: 12rem;
        max-width: 35rem;
      }
      .branch-group-select {
        width: fit-content;
        max-width: 20rem;
      }
    }
  }
  .box {
    /* margin-top: 4rem; */
    border-radius: 2rem;
    padding: 2rem;
    background: ${(p: any) => themes.theme.light.colors?.bgSection};
    h4 {
      margin-bottom: 2.5rem;
    }
  }
  .head__actions {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 2rem;
    justify-content: space-between;
    .ant-select {
      max-width: 15rem;
      .ant-select-selector {
        height: 4.5rem;
      }
    }
  }
`
