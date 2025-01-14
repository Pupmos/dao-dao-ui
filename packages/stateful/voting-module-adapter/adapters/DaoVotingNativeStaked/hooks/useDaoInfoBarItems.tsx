import { LayersOutlined, PeopleAltOutlined } from '@mui/icons-material'
import { useTranslation } from 'react-i18next'

import { DaoInfoBarItem, TokenAmountDisplay } from '@dao-dao/stateless'
import { convertMicroDenomToDenomWithDecimals } from '@dao-dao/utils'

import { useGovernanceTokenInfo } from './useGovernanceTokenInfo'
import { useStakingInfo } from './useStakingInfo'

export const useDaoInfoBarItems = (): DaoInfoBarItem[] => {
  const { t } = useTranslation()
  const { loadingTotalStakedValue } = useStakingInfo({
    fetchTotalStakedValue: true,
  })

  if (loadingTotalStakedValue === undefined) {
    throw new Error(t('error.loadingData'))
  }

  const {
    governanceTokenInfo: { decimals, symbol, total_supply },
  } = useGovernanceTokenInfo()

  return [
    {
      Icon: PeopleAltOutlined,
      label: t('title.totalSupply'),
      value: (
        <TokenAmountDisplay
          amount={convertMicroDenomToDenomWithDecimals(total_supply, decimals)}
          decimals={decimals}
          symbol={symbol}
        />
      ),
    },
    {
      Icon: LayersOutlined,
      label: t('title.totalStaked'),
      value: (
        <TokenAmountDisplay
          amount={
            loadingTotalStakedValue.loading
              ? { loading: true }
              : {
                  loading: false,
                  data: convertMicroDenomToDenomWithDecimals(
                    loadingTotalStakedValue.data,
                    decimals
                  ),
                }
          }
          decimals={decimals}
          symbol={symbol}
        />
      ),
    },
  ]
}
