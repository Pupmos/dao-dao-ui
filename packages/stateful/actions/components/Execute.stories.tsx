import { ComponentMeta, ComponentStory } from '@storybook/react'

import { ReactHookFormDecorator } from '@dao-dao/storybook'
import { TokenType } from '@dao-dao/types'
import { NATIVE_DENOM } from '@dao-dao/utils'

import { ExecuteComponent } from './Execute'

export default {
  title: 'DAO DAO / packages / stateful / actions / components / Execute',
  component: ExecuteComponent,
  decorators: [ReactHookFormDecorator],
} as ComponentMeta<typeof ExecuteComponent>

const Template: ComponentStory<typeof ExecuteComponent> = (args) => (
  <ExecuteComponent {...args} />
)

export const Default = Template.bind({})
Default.args = {
  fieldNamePrefix: '',
  allActionsWithData: [],
  index: 0,
  data: {},
  isCreating: true,
  onRemove: () => alert('remove'),
  errors: {},
  options: {
    balances: [
      {
        token: {
          type: TokenType.Native,
          denomOrAddress: NATIVE_DENOM,
          decimals: 6,
          symbol: 'JUNO',
          imageUrl: '',
        },
        balance: '1231245124',
      },
      {
        token: {
          type: TokenType.Native,
          denomOrAddress: 'uatom',
          decimals: 6,
          symbol: 'ATOM',
          imageUrl: '',
        },
        balance: '984129741',
      },
    ],
  },
}
