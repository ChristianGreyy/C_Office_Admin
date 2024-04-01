import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { deletePlanAction, fetchPlansAction, useAppDispatch } from '@redux'
import { Card, Skeleton } from 'antd'
import { DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons'
import { Layout } from 'antd'
import { useNavigate } from 'react-router-dom'

import { SharedTable, Button, SwitchButton } from 'src/common'
import { EPlanType, PATH_PLAN } from '@configs'
import { RootState, selectPlansLoading } from '@redux'

export const { Header, Content } = Layout

export const PlanManagement = () => {
  const navigate = useNavigate()

  const dispatch = useAppDispatch()
  const fetchPlansActionLoading = useSelector((state: RootState) =>
    selectPlansLoading(state, 'fetchPlansAction')
  )
  const { plans, plansCurrentPage, plansTotalItems } = useSelector(
    (state: RootState) => state.plans
  )

  const columns = [
    {
      title: 'Plan Id',
      dataIndex: '_id',
      key: '_id',
    },
    {
      title: 'Title',
      dataIndex: 'titleEn',
      key: 'titleEn',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      render: (e: any) => {
        return <>{Number(e) === EPlanType.MONTHLY ? 'Monthly' : 'Yearly'}</>
      },
    },
    {
      title: 'Discount',
      dataIndex: 'discount',
      key: 'discount',
      render: (e: any) => {
        return <>{e}%</>
      },
    },
    {
      title: 'Discount Status',
      dataIndex: '_id',
      key: 'discountStatus',
      render: (id: string) => {
        const selectedPlan = plans?.find((item) => item._id === id)
        return (
          <SwitchButton size="small" checked={selectedPlan?.discountStatus} />
        )
      },
    },
    {
      title: 'Action',
      key: 'action',
      dataIndex: '_id',
      render: (id: any) => (
        <div className="flex space-x-4">
          <EyeOutlined
            className="text-lg font-light mr-2.5 cursor-pointer text-[#184f64]"
            onClick={() => {
              navigate(`${PATH_PLAN}/view?planId=${id}`)
            }}
          />
          <EditOutlined
            className="text-lg font-light mr-2.5 cursor-pointer text-[#184f64]"
            onClick={() => {
              navigate(`${PATH_PLAN}/edit?planId=${id}`)
            }}
          />
          <DeleteOutlined
            className="text-lg font-light mr-2.5 cursor-pointer text-[#184f64]"
            onClick={() => {
              dispatch(deletePlanAction(id))
            }}
          />
        </div>
      ),
    },
  ]

  useEffect(() => {
    dispatch(fetchPlansAction())
  }, [dispatch])

  return (
    <Card>
      {fetchPlansActionLoading ? (
        <Skeleton paragraph={{ rows: 4 }} />
      ) : (
        <SharedTable
          columns={columns}
          dataSource={plans?.map((plan) => {
            return {
              key: plan._id,
              ...plan,
            }
          })}
          paginationProps={{
            total: !!plansTotalItems ? +plansTotalItems : undefined,
            pageSize: 10,
            current: +plansCurrentPage,
            onChange(page) {
              dispatch(
                fetchPlansAction({
                  page: page,
                  size: 10,
                })
              )
            },
          }}
        />
      )}
      <div className="flex justify-end items-center mt-8 mb-6 mr-3">
        <Button
          type="primary"
          onClick={() => {
            navigate(`${PATH_PLAN}/add`)
          }}
        >
          Add Plan
        </Button>
      </div>
    </Card>
  )
}
