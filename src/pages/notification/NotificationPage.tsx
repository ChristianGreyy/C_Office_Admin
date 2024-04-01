import { EditOutlined, HeartOutlined, SearchOutlined } from '@ant-design/icons'
import { Card, Skeleton } from 'antd'
import { format } from 'date-fns'
import queryString from 'query-string'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'

import { EDeviceType, INITIAL_PAGINATION_SiZE, PATH_NOTIFICATION, PATH_USER_MANAGEMENT } from '@configs'
import {
  RootState,
  getAllNotificationsAction,
  selectNotificationsLoading,
  useAppDispatch,
} from '@redux'
import { Button, Input, SharedTable } from 'src/common'

type Props = {}

export const NotificationPage = (props: Props) => {
  const navigate = useNavigate()

  const dispatch = useAppDispatch()
  const getAllNotificationsActionLoading = useSelector((state: RootState) =>
    selectNotificationsLoading(state, 'getAllNotificationsAction')
  )
  const { notifications, notificationsCurrentPage, notificationsTotalItems } =
    useSelector((state: RootState) => state.notifications)

  const getAllNotifications = () => {
    dispatch(getAllNotificationsAction())
  }

  const columns = [
    {
      title: 'No',
      dataIndex: 'no',
      key: '_id',
    },
    {
      title: 'Title',
      dataIndex: 'titleEn',
      key: 'title',
    },
    {
      title: 'Content',
      dataIndex: 'contentEn',
      key: 'content',
    },
    {
      title: 'Condition',
      dataIndex: 'condition',
      key: 'condition',
    },
    {
      title: 'Device',
      dataIndex: 'type',
      key: 'type',
      render: (e: any) => {
        return (
          <>
            {
              {
                [EDeviceType.MOBILE_APP as any]: 'Mobile App',
                [EDeviceType.WATCH_APP]: 'Watch App',
                [EDeviceType.BOTH]: 'Both',
              }[e]
            }
          </>
        )
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
      title: 'Updated Time',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      render: (e: any) => {
        return <>{format(new Date(e), 'dd/MM/yyyy HH:mm:ss')}</>
      },
    },
    {
      title: 'Edit',
      key: 'edit',
      dataIndex: '_id',
      render: (id: any) => (
        <div className="flex space-x-4">
          <EditOutlined
            className="text-lg font-light mr-2.5 cursor-pointer text-[#184f64]"
            onClick={() => {
              navigate(`${PATH_NOTIFICATION}/edit/${id}`)
            }}
          />
        </div>
      ),
    },
  ]

  useEffect(() => {
    getAllNotifications()
  }, [dispatch])

  return (
    <Card>
      {getAllNotificationsActionLoading ? (
        <Skeleton paragraph={{ rows: 4 }} />
      ) : (
        <SharedTable
          columns={columns}
          dataSource={notifications?.map((notification: any, index: number) => {
            return {
              ...notification,
              key: notification._id,
              no: index + 1,
            }
          })}
          paginationProps={{
            total: !!notificationsTotalItems
              ? +notificationsTotalItems
              : undefined,
            pageSize: INITIAL_PAGINATION_SiZE,
            current: +notificationsCurrentPage,
            onChange(page) {},
          }}
        />
      )}
    </Card>
  )
}
