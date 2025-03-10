import { ComponentMeta, ComponentStory } from '@storybook/react'

import { makeDappLayoutDecorator } from '@dao-dao/storybook/decorators'

import {
  DaoCard,
  IconButtonLink,
  LinkWrapper,
  ProfileDisconnectedCard,
  ProfileDisconnectedCardProps,
  ProfileHomeCard,
  ProfileHomeCardProps,
  SidebarWallet,
} from '../components'
import { FeaturedDaos as FeaturedDaosScrollerStory } from '../components/HorizontalScroller.stories'
import { Default as ProfileDisconnectedCardStory } from '../components/profile/ProfileDisconnectedCard.stories'
import { Default as ProfileHomeCardStory } from '../components/profile/ProfileHomeCard.stories'
import { Home } from './Home'

export default {
  title: 'DAO DAO / packages / stateless / pages / Home',
  component: Home,
} as ComponentMeta<typeof Home>

const Template: ComponentStory<typeof Home> = (args) => <Home {...args} />

export const Connected = Template.bind({})
Connected.args = {
  featuredDaosProps: {
    items: FeaturedDaosScrollerStory.args!.items!,
    Component: (props) => (
      <DaoCard
        {...props}
        IconButtonLink={IconButtonLink}
        LinkWrapper={LinkWrapper}
        follow={{
          following: true,
          updatingFollowing: false,
          onFollow: () => alert('follow ' + props.coreAddress),
        }}
      />
    ),
  },
  connected: true,
  followingDaosProps: {
    followingDaos: FeaturedDaosScrollerStory.args!.items!,
    DaoCard: (props) => (
      <DaoCard
        {...props}
        IconButtonLink={IconButtonLink}
        LinkWrapper={LinkWrapper}
        follow={{
          following: true,
          updatingFollowing: false,
          onFollow: () => alert('follow ' + props.coreAddress),
        }}
      />
    ),
    openSearch: () => alert('search'),
  },
  rightSidebarContent: (
    <ProfileHomeCard {...(ProfileHomeCardStory.args as ProfileHomeCardProps)} />
  ),
}
Connected.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/ZnQ4SMv8UUgKDZsR5YjVGH/DAO-DAO-2.0?node-id=272%3A64674',
  },
  nextRouter: {
    asPath: '/',
  },
}
Connected.decorators = [makeDappLayoutDecorator()]

export const Disconnected = Template.bind({})
Disconnected.args = {
  ...Connected.args,
  connected: false,
  rightSidebarContent: (
    <ProfileDisconnectedCard
      {...(ProfileDisconnectedCardStory.args as ProfileDisconnectedCardProps)}
    />
  ),
}
Disconnected.parameters = {
  ...Connected.parameters,
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/ZnQ4SMv8UUgKDZsR5YjVGH/DAO-DAO-2.0?node-id=272%3A64768',
  },
}
Disconnected.decorators = [
  makeDappLayoutDecorator({
    navigationProps: {
      walletConnected: false,
    },
    rightSidebarProps: {
      wallet: (
        <SidebarWallet connectedOrConnecting={false} onConnect={() => {}} />
      ),
    },
  }),
]
