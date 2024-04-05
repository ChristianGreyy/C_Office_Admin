import {
  CalendarOutlined,
  HomeOutlined,
  NotificationOutlined,
  ProductOutlined,
  ShoppingOutlined,
  StockOutlined,
  UserOutlined
} from '@ant-design/icons'
import { enumNavKey } from '@configs'
import { ICon } from '@interfaces'
import { useTheme } from '@theme'
import { useLocation } from 'react-router-dom'
import styled from 'styled-components'

interface IProps extends ICon {
  pathKey: enumNavKey
}

export const NavMenuIcon = (props: IProps) => {
  const { pathKey } = props

  const location = useLocation()

  const { theme } = useTheme()

  const genIcon = () => {
    switch (pathKey) {
      case enumNavKey.DASHBOARD:
        return (
          <HomeOutlined
            className="mr-2"
            style={{ fontSize: '16px', verticalAlign: 'middle' }}
          />
        )
      // case enumNavKey.LOYALTY_SETTING:
      //   return (
      //     <LoyaltyMenuIcon
      //       color={navCurrentKey === pathKey ? theme?.colors?.sidebar?.active : undefined}
      //       {...props}
      //     />
      //   );
      case enumNavKey.USER_MANAGEMENT:
        return (
          <UserOutlined
            className="mr-2"
            style={{ fontSize: '16px', verticalAlign: 'middle' }}
          />
        )
      case enumNavKey.POSITION_MANAGEMENT:
        return (
          <ProductOutlined
            className="mr-2"
            style={{ fontSize: '16px', verticalAlign: 'middle' }}
          />
        )
      case enumNavKey.LEVEL_MANAGEMENT:
        return (
          <StockOutlined
            className="mr-2"
            style={{ fontSize: '16px', verticalAlign: 'middle' }}
          />
        )
      case enumNavKey.UNIVERSITY_MANAGEMENT:
        return (
          <ShoppingOutlined 
          className="mr-2"
            style={{ fontSize: '16px', verticalAlign: 'middle' }}
          />
        )
      case enumNavKey.PLAN_MANAGEMENT:
        return (
          <CalendarOutlined
            className="mr-2"
            style={{ fontSize: '16px', verticalAlign: 'middle' }}
          />
        )

      case enumNavKey.NOTIFICATION:
        return (
          <NotificationOutlined
            className="mr-2"
            style={{ fontSize: '16px', verticalAlign: 'middle' }}
          />
        )
      // case enumNavKey.CASHBACK_RULES:
      //   return <CashbackRuleMenuIcon {...props} />;
      // case enumNavKey.BIRTHDAY_SPECIAL:
      //   return <BirthdaySpecialMenuIcon {...props} />;
      // case enumNavKey.MARKETING:
      //   return <MarketingMenuIcon {...props} />;
      // case enumNavKey.ANNOUNCEMENT:
      //   return <AnnouncementMenuIcon {...props} />;
      // case enumNavKey.MEMBERS:
      //   return (
      //     <MemberMenuIcon
      //       color={navCurrentKey === pathKey ? theme?.colors?.sidebar?.active : undefined}
      //       {...props}
      //     />
      //   );
      // case enumNavKey.GROUP:
      //   return (
      //     <GroupMenuIcon
      //       color={navCurrentKey === pathKey ? theme?.colors?.sidebar?.active : undefined}
      //       {...props}
      //     />
      //   );
      // case enumNavKey.STORES:
      //   return (
      //     <Store
      //       color={navCurrentKey === pathKey ? theme?.colors?.sidebar?.active : undefined}
      //       {...props}
      //     />
      //   );
      // case enumNavKey.BRANCH_GROUP:
      //   return (
      //     <BranchGroupIcon
      //       color={navCurrentKey === pathKey ? theme?.colors?.sidebar?.active : undefined}
      //       {...props}
      //     />
      //   );
      default:
        return <></>
    }
  }

  return <>{genIcon()}</>
}

const StyledNavMenuIcon = styled.div<{
  $appTheme?: string
}>``
