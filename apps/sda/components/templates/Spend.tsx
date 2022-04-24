import { Suspense } from 'react'

import { useRecoilValue, waitForAll } from 'recoil'

import { nativeBalancesSelector } from '@dao-dao/state'
import { TokenInfoResponse } from '@dao-dao/state/clients/cw20-base'
import { cw20BalancesSelector } from '@dao-dao/state/recoil/selectors/clients/cw-governance'
import { tokenInfoSelector } from '@dao-dao/state/recoil/selectors/clients/cw20-base'
import {
  SpendComponent as StatelessSpendComponent,
  TemplateComponent,
} from '@dao-dao/ui/components/templates'

import { Logo } from '../Logo'
import { DAO_ADDRESS } from '@/util/constants'

const InnerSpendComponent: TemplateComponent = (props) => {
  const nativeBalances =
    useRecoilValue(nativeBalancesSelector(DAO_ADDRESS)) ?? []

  const cw20AddressesAndBalances =
    useRecoilValue(
      cw20BalancesSelector({ contractAddress: DAO_ADDRESS, params: [{}] })
    ) ?? []
  const cw20Infos =
    useRecoilValue(
      waitForAll(
        cw20AddressesAndBalances.map(({ addr }) =>
          tokenInfoSelector({ contractAddress: addr, params: [] })
        )
      )
    ) ?? []
  const cw20Balances = cw20AddressesAndBalances
    .map(({ addr, balance }, idx) => ({
      address: addr,
      balance,
      info: cw20Infos[idx],
    }))
    // If undefined token info response, ignore the token.
    .filter(({ info }) => !!info) as {
    address: string
    balance: string
    info: TokenInfoResponse
  }[]

  return (
    <StatelessSpendComponent
      {...props}
      options={{
        nativeBalances,
        cw20Balances,
      }}
    />
  )
}

export const SpendComponent: TemplateComponent = (props) => (
  <Suspense
    fallback={
      <div className="p-3 my-2 bg-primary rounded-lg">
        <div className="animate-spin">
          <Logo height={40} width={40} />
        </div>
      </div>
    }
  >
    <InnerSpendComponent {...props} />
  </Suspense>
)
