// import { ColumnConfig, G2 } from '@ant-design/charts'
import { Column } from '@ant-design/plots'
import { enumMemberType, PATH_MEMBER } from '@configs'
import { ActiveMember } from '@interfaces'
import { LogApp } from '@utils'
import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

interface IProps {
  activeMembers: ActiveMember[]
}
export const ActiveMemberChart = ({ activeMembers }: IProps) => {
  const navigate = useNavigate()

  // // G2.registerInteraction('hover-cursor', {
  // //   showEnable: [
  // //     { trigger: 'element:mouseenter', action: 'cursor:pointer' },
  // //     { trigger: 'element:mouseleave', action: 'cursor:default' },
  // //   ],
  // // })

  // const memoConfig: any = useMemo(() => {
  //   return {
  //     data: activeMembers,
  //     xField: 'date',
  //     yField: 'total',
  //     columnStyle: {},
  //     xAxis: {
  //       label: {
  //         autoHide: true,
  //         autoRotate: false,
  //       },
  //     },
  //     yAxis: {
  //       label: {
  //         autoHide: true,
  //         autoRotate: false,
  //       },
  //       tickInterval: 2,
  //     },
  //     meta: {
  //       date: {
  //         alias: 'Date',
  //       },
  //       total: {
  //         alias: 'Total',
  //       },
  //     },
  //     interactions: [{ type: 'hover-cursor' }],
  //     onReady: (plot) => {
  //       //@ts-ignore
  //       plot.on('element:click', (...args: any) => {
  //         LogApp('check click chart', args?.[0])
  //         const date = args?.[0]?.data?.data?.dateValue
  //         navigate(
  //           `${PATH_MEMBER}?date=${date}&m-type=${enumMemberType.ACTIVE}`
  //         )
  //       })
  //     },
  //   }
  // }, [activeMembers])
  return (
    <StyledActiveMemberChart>
      {/* <Column {...memoConfig} /> */}
    </StyledActiveMemberChart>
  )
}
const StyledActiveMemberChart = styled.div``
