import { MemberTierChart } from '@components'
import { TierStatisticResponse, TierStatisticRoot } from '@interfaces'
import React, { useEffect, useState } from 'react'

export const TierChartModule = () => {
  const [memberTiers, setMemberTiers] = useState<TierStatisticResponse[]>([])
  const getMemberTiers = async () => {
    try {
      // const res: TierStatisticRoot = await dashboardAPI.getMemberTiers()
      // setMemberTiers(
      //   res.data.map((item) => {
      //     return {
      //       name: item.name,
      //       total: Number(item.total),
      //       id: item.tier_id,
      //     }
      //   })
      // )
    } catch (error) {}
  }
  useEffect(() => {
    getMemberTiers()
  }, [])
  return <MemberTierChart memberTiers={memberTiers} />
}
