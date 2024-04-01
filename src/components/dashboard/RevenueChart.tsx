import { Pie } from '@ant-design/plots'
import { IFetchRevenueStatSuccessData } from '@interfaces'
import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

interface IProps {
  revenueStats: IFetchRevenueStatSuccessData | null
}
export const RevenueChart = ({ revenueStats }: IProps) => {
  const navigate = useNavigate()

  const memoConfig: any = useMemo(() => {
    return {
      data: [
        {
          type: 'Monthly',
          value: revenueStats?.monthlyTotal,
        },
        {
          type: 'Yearly',
          value: revenueStats?.yearlyTotal,
        },
      ],
      appendPadding: 10,
      angleField: 'value',
      colorField: 'type',
      radius: 0.9,
      label: {
        type: 'inner',
        offset: '-30%',
        // content: ({ percent }) => `${(percent * 100).toFixed(0)}%`,
        style: {
          fontSize: 14,
          textAlign: 'center',
        },
      },
      interactions: [
        {
          type: 'element-active',
        },
      ],
      legend: {
        position: 'bottom',
      },
    }
  }, [revenueStats])
  return (
    <StyledRevenueChart>
      <Pie {...memoConfig} />
    </StyledRevenueChart>
  )
}
const StyledRevenueChart = styled.div``
