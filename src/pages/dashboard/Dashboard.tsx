import { Card, DatePicker, Skeleton } from 'antd'
import { format } from 'date-fns'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { NewUserChart, RevenueChart } from '@components'
import { EUserGender } from '@configs'
import {
  RootState,
  getNewUserStatAction,
  getRevenueStatAction,
  selectDashboardLoading,
  useAppDispatch,
} from '@redux'
import moment from 'moment'
import { SharedTable } from 'src/common'
import { useMemo } from 'react'

type Props = {}

const { RangePicker } = DatePicker

export const Dashboard = (props: Props) => {
  const navigate = useNavigate()
  const [dates, setDates] = useState([
    moment().subtract(7, 'days').format('YYYY-MM-DD'),
    moment().format('YYYY-MM-DD'),
  ])

  const dispatch = useAppDispatch()
  const getRevenueStatActionLoading = useSelector((state: RootState) =>
    selectDashboardLoading(state, 'getRevenueStatActionLoading')
  )
  const getNewUserStatActionLoading = useSelector((state: RootState) =>
    selectDashboardLoading(state, 'getNewUserStatActionLoading')
  )
  const { users, userStats, revenueStats } = useSelector(
    (state: RootState) => state.dashboard
  )

  const getDashboard = () => {
    dispatch(
      getRevenueStatAction({
        from: dates[0],
        to: dates[1],
      })
    )
    dispatch(
      getNewUserStatAction({
        from: dates[0],
        to: dates[1],
      })
    )
  }

  const handleSelect = (_: any, dateStrings: any) => {
    setDates(dateStrings)
  }

  const columns = [
    {
      title: 'No',
      dataIndex: 'no',
      key: '_id',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
      key: 'gender',
      render: (e: any) => {
        return (
          <>
            {
              {
                [EUserGender.FEMALE as any]: 'Female',
                [EUserGender.MALE]: 'Male',
              }[e]
            }
          </>
        )
      },
    },
    {
      title: 'Sickness',
      dataIndex: 'sickness',
      key: 'sickness',
      render: (e: any) => {
        return <span className="capitalize">{e.join(', ')}</span>
      },
    },
    {
      title: 'Created Time',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (e: any) => {
        return <>{format(new Date(e), 'dd/MM/yyyy HH:mm:ss')}</>
      },
    },
    {
      title: 'Status',
      dataIndex: 'isActive',
      key: 'isActive',
      render: (e: any) => {
        return <>{e ? 'Active' : 'Inactive'}</>
      },
    },
  ]

  useEffect(() => {
    getDashboard()
  }, [dispatch, dates])

  const totalNewUser = useMemo(() => {
    return userStats?.reduce((acc, cur) => {
      return acc + cur.newUser
    }, 0)
  }, [userStats])

  return (
    <Card>
      <div className="sm:pl-[0.75rem] sm:pr-[0.5rem] sm:max-w-[500px] flex items-center sm:justify-between flex-col sm:flex-row">
        <RangePicker
          defaultValue={[moment(dates[0]), moment(dates[1])]}
          allowClear={false}
          onChange={handleSelect}
        />
      </div>
      <div className="flex justify-between max:[50%]:flex-col mt-4 mb-4">
        <div className="flex-1 sm:flex-[0_0_50%] sm:max-w-[50%] min-h-[1px] flex flex-col items-center">
          <div className="text-center border-2 rounded-lg w-3/4 mb-4">
            <h1 className="text-xl">Total revenue</h1>
            <h1 className="text-2xl font-semibold">
              ${' '}
              {revenueStats
                ? revenueStats?.monthlyTotal + revenueStats?.yearlyTotal
                : 0}
            </h1>
          </div>
          <div>
            <RevenueChart revenueStats={revenueStats} />
          </div>
        </div>
        <div className="flex-1 sm:flex-[0_0_50%] sm:max-w-[50%] min-h-[1px] flex flex-col items-center">
          <div className="text-center border-2 rounded-lg w-3/4 mb-4">
            <h1 className="text-xl">Total of new user</h1>
            <h1 className="text-2xl font-semibold">{totalNewUser}</h1>
          </div>
          <div>
            <NewUserChart userStats={userStats} />
          </div>
        </div>
      </div>
      <div>
        <h1 className="text-xl">Summary</h1>
        {getNewUserStatActionLoading ? (
          <Skeleton paragraph={{ rows: 4 }} />
        ) : (
          <SharedTable
            columns={columns}
            dataSource={users?.map((user: any, index: number) => {
              return {
                ...user,
                key: user._id,
                no: index + 1,
                sickness: user?.userData?.sickness ?? [],
                gender: user?.userData?.gender,
              }
            })}
          />
        )}
      </div>
    </Card>
  )
}
