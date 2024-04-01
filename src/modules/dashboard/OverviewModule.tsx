import { Overview, TotalMembersIcon, TotalSpentIcon } from '@components'
import { PATH_MEMBER } from '@configs'
import {
  IDashboardPayload,
  OverviewStatistic,
  OverviewStatisticRoot,
} from '@interfaces'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

interface IProps {
  dashboardPayload: IDashboardPayload
}

export const OverviewModule = (props: IProps) => {
  const { dashboardPayload } = props
  const navigate = useNavigate()

  const [overviewStatistic, setOverviewStatistic] = useState<OverviewStatistic>(
    {
      totalMember: 0,
      totalSpending: 0,
    }
  )
  const getOverviewStatistic = async () => {
    try {
      // const res: OverviewStatisticRoot = await dashboardAPI.getOverviewStatistic();
      // setOverviewStatistic(res.data);
    } catch (error) {}
  }

  const linkDataToAnotherPage = (item?: string) => {
    switch (item) {
      case 'totalMember':
        navigate(PATH_MEMBER)
        break
      case 'totalSpending':
        break
      default:
        break
    }
  }

  const genOverviewIcon = (item?: string) => {
    switch (item) {
      case 'totalMember':
        return <TotalMembersIcon />
      case 'totalSpending':
        return <TotalSpentIcon />
      default:
        break
    }
  }

  useEffect(() => {
    getOverviewStatistic()
  }, [])
  return (
    <Overview
      overviewStatistic={overviewStatistic}
      onLinkData={linkDataToAnotherPage}
      genOverviewIcon={genOverviewIcon}
    />
  )
}
