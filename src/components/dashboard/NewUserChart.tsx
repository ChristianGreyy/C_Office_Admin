import { Line } from '@ant-design/plots'
import { IUserStat } from '@interfaces'
import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

interface IProps {
  userStats: IUserStat[] | null
}
export const NewUserChart = ({ userStats }: IProps) => {
  const navigate = useNavigate()

  const memoConfig: any = useMemo(() => {
    return {
      data: userStats,
      padding: 'auto',
      xField: 'date',
      yField: 'newUser',
      xAxis: {
        // type: 'timeCat',
        tickCount: 10,
      },
      smooth: true,
    }
  }, [userStats])
  return (
    <StyledNewUserChart>
      <Line {...memoConfig} />
    </StyledNewUserChart>
  )
}
const StyledNewUserChart = styled.div``
