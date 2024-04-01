import { TopSpentUserTable } from '@components'
import {
  IDashboardPayload,
  TopSpentData,
  TopSpentRoot,
  TopSpentUserColumn,
} from '@interfaces'
import { setTableLoading } from '@redux'
import { ColumnsType } from 'antd/lib/table'
import { useEffect, useMemo, useState } from 'react'
import { useDispatch } from 'react-redux'

interface IProps {
  limit: number
  dashboardPayload: IDashboardPayload
}
export const TopSpentUserTableModule = ({
  limit,
  dashboardPayload,
}: IProps) => {
  const dispatch = useDispatch()
  const [topSpentUsers, setTopSpentUsers] = useState<TopSpentData>({
    limit,
    count: 0,
    data: [],
  })
  const [currentPage, setCurrentPage] = useState(1)
  const columns: ColumnsType<TopSpentUserColumn> = useMemo(() => {
    return [
      {
        title: 'No.',
        dataIndex: 'no',
        key: 'no',
        render: (text, record, index) => index + (currentPage - 1) * 10 + 1,
        width: '10%',
      },
      { title: 'Name', dataIndex: 'name', key: 'name' },
      { title: 'Total spent', dataIndex: 'total', key: 'total' },
    ]
  }, [currentPage])
  const getTopSpentUsers = async (limitInp: number, page: number) => {
    try {
      dispatch(setTableLoading(true))
      setTopSpentUsers({ ...topSpentUsers, data: [] })
      // const res: TopSpentRoot = await dashboardAPI.getTopSpentUsers({
      //   limit: limitInp,
      //   page,
      // })
      // const newResponse: TopSpentUserColumn[] = res.data.result.map(
      //   (item, index) => {
      //     return {
      //       key: item.member_id,
      //       no: index + 1,
      //       name: item.name,
      //       total: `$${item.total}`,
      //     }
      //   }
      // )
      // setTopSpentUsers({
      //   limit: res.data.limit,
      //   count: res.data.total,
      //   data: newResponse,
      // })
    } catch (error) {
    } finally {
      dispatch(setTableLoading(false))
    }
  }
  const onPageChange = (pageNum: number) => {
    setCurrentPage(pageNum)
    getTopSpentUsers(limit, pageNum)
  }

  useEffect(() => {
    getTopSpentUsers(limit, 1)
  }, [limit])
  return (
    <TopSpentUserTable
      currentPage={currentPage}
      topSpentUsers={topSpentUsers}
      columns={columns}
      onPageChange={onPageChange}
    />
  )
}
