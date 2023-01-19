import { ProposalStatus } from './common'

export type Duration =
  | {
      height: number
    }
  | {
      time: number
    }
export type PreProposeInfo =
  | {
      anyone_may_propose: {}
    }
  | {
      module_may_propose: {
        info: ModuleInstantiateInfo
      }
    }
export type Admin =
  | {
      address: {
        addr: string
      }
    }
  | {
      core_module: {}
    }
export type Binary = string
export type VotingStrategy = {
  single_choice: {
    quorum: PercentageThreshold
  }
}
export type PercentageThreshold =
  | {
      majority: {}
    }
  | {
      percent: Decimal
    }
export type Decimal = string
export interface InstantiateMsg {
  allow_revoting: boolean
  close_proposal_on_execution_failure: boolean
  max_voting_period: Duration
  min_voting_period?: Duration | null
  only_members_execute: boolean
  pre_propose_info: PreProposeInfo
  voting_strategy: VotingStrategy
}
export interface ModuleInstantiateInfo {
  admin?: Admin | null
  code_id: number
  label: string
  msg: Binary
}
export type ExecuteMsg =
  | {
      propose: {
        choices: MultipleChoiceOptions
        description: string
        proposer?: string | null
        title: string
      }
    }
  | {
      vote: {
        proposal_id: number
        vote: MultipleChoiceVote
      }
    }
  | {
      execute: {
        proposal_id: number
      }
    }
  | {
      close: {
        proposal_id: number
      }
    }
  | {
      update_config: {
        allow_revoting: boolean
        close_proposal_on_execution_failure: boolean
        dao: string
        max_voting_period: Duration
        min_voting_period?: Duration | null
        only_members_execute: boolean
        voting_strategy: VotingStrategy
      }
    }
  | {
      update_pre_propose_info: {
        info: PreProposeInfo
      }
    }
  | {
      add_proposal_hook: {
        address: string
      }
    }
  | {
      remove_proposal_hook: {
        address: string
      }
    }
  | {
      add_vote_hook: {
        address: string
      }
    }
  | {
      remove_vote_hook: {
        address: string
      }
    }
export type CosmosMsgForEmpty =
  | {
      bank: BankMsg
    }
  | {
      custom: Empty
    }
  | {
      staking: StakingMsg
    }
  | {
      distribution: DistributionMsg
    }
  | {
      stargate: {
        type_url: string
        value: Binary
        [k: string]: unknown
      }
    }
  | {
      ibc: IbcMsg
    }
  | {
      wasm: WasmMsg
    }
  | {
      gov: GovMsg
    }
export type BankMsg =
  | {
      send: {
        amount: Coin[]
        to_address: string
        [k: string]: unknown
      }
    }
  | {
      burn: {
        amount: Coin[]
        [k: string]: unknown
      }
    }
export type Uint128 = string
export type StakingMsg =
  | {
      delegate: {
        amount: Coin
        validator: string
        [k: string]: unknown
      }
    }
  | {
      undelegate: {
        amount: Coin
        validator: string
        [k: string]: unknown
      }
    }
  | {
      redelegate: {
        amount: Coin
        dst_validator: string
        src_validator: string
        [k: string]: unknown
      }
    }
export type DistributionMsg =
  | {
      set_withdraw_address: {
        address: string
        [k: string]: unknown
      }
    }
  | {
      withdraw_delegator_reward: {
        validator: string
        [k: string]: unknown
      }
    }
export type IbcMsg =
  | {
      transfer: {
        amount: Coin
        channel_id: string
        timeout: IbcTimeout
        to_address: string
        [k: string]: unknown
      }
    }
  | {
      send_packet: {
        channel_id: string
        data: Binary
        timeout: IbcTimeout
        [k: string]: unknown
      }
    }
  | {
      close_channel: {
        channel_id: string
        [k: string]: unknown
      }
    }
export type Timestamp = Uint64
export type Uint64 = string
export type WasmMsg =
  | {
      execute: {
        contract_addr: string
        funds: Coin[]
        msg: Binary
        [k: string]: unknown
      }
    }
  | {
      instantiate: {
        admin?: string | null
        code_id: number
        funds: Coin[]
        label: string
        msg: Binary
        [k: string]: unknown
      }
    }
  | {
      migrate: {
        contract_addr: string
        msg: Binary
        new_code_id: number
        [k: string]: unknown
      }
    }
  | {
      update_admin: {
        admin: string
        contract_addr: string
        [k: string]: unknown
      }
    }
  | {
      clear_admin: {
        contract_addr: string
        [k: string]: unknown
      }
    }
export type GovMsg = {
  vote: {
    proposal_id: number
    vote: VoteOption
    [k: string]: unknown
  }
}
export type VoteOption = 'yes' | 'no' | 'abstain' | 'no_with_veto'
export interface MultipleChoiceOptions {
  options: MultipleChoiceOption[]
}
export interface MultipleChoiceOption {
  description: string
  msgs: CosmosMsgForEmpty[]
  title: string
}

export interface Coin {
  amount: Uint128
  denom: string
}
export interface Empty {
  [k: string]: unknown
}
export interface IbcTimeout {
  block?: IbcTimeoutBlock | null
  timestamp?: Timestamp | null
  [k: string]: unknown
}
export interface IbcTimeoutBlock {
  height: number
  revision: number
  [k: string]: unknown
}
export interface MultipleChoiceVote {
  option_id: number
}
export type QueryMsg =
  | {
      config: {}
    }
  | {
      proposal: {
        proposal_id: number
      }
    }
  | {
      list_proposals: {
        limit?: number | null
        start_after?: number | null
      }
    }
  | {
      reverse_proposals: {
        limit?: number | null
        start_before?: number | null
      }
    }
  | {
      proposal_count: {}
    }
  | {
      get_vote: {
        proposal_id: number
        voter: string
      }
    }
  | {
      list_votes: {
        limit?: number | null
        proposal_id: number
        start_after?: string | null
      }
    }
  | {
      proposal_creation_policy: {}
    }
  | {
      proposal_hooks: {}
    }
  | {
      vote_hooks: {}
    }
  | {
      dao: {}
    }
  | {
      info: {}
    }
export type MigrateMsg =
  | {
      from_v1: {
        close_proposal_on_execution_failure: boolean
        pre_propose_info: PreProposeInfo
      }
    }
  | {
      from_compatible: {}
    }
export type Addr = string
export interface Config {
  allow_revoting: boolean
  close_proposal_on_execution_failure: boolean
  dao: Addr
  max_voting_period: Duration
  min_voting_period?: Duration | null
  only_members_execute: boolean
  voting_strategy: VotingStrategy
}
export interface VoteResponse {
  vote?: VoteInfo | null
}
export interface VoteInfo {
  power: Uint128
  vote: MultipleChoiceVote
  voter: Addr
  votedAt?: string
}
export interface InfoResponse {
  info: ContractVersion
}
export interface ContractVersion {
  contract: string
  version: string
}
export enum MultipleChoiceOptionType {
  Standard = 'standard',
  None = 'none',
}

export type Expiration =
  | {
      at_height: number
    }
  | {
      at_time: Timestamp
    }
  | {
      never: {}
    }

export interface ProposalListResponse {
  proposals: ProposalResponse[]
}
export interface ProposalResponse {
  id: number
  proposal: MultipleChoiceProposal
  [k: string]: unknown
}
export interface MultipleChoiceProposal {
  allow_revoting: boolean
  choices: CheckedMultipleChoiceOption[]
  description: string
  expiration: Expiration
  min_voting_period?: Expiration | null
  proposer: Addr
  start_height: number
  status: ProposalStatus
  title: string
  total_power: Uint128
  votes: MultipleChoiceVotes
  voting_strategy: VotingStrategy
  [k: string]: unknown
}
export interface CheckedMultipleChoiceOption {
  description: string
  index: number
  msgs: CosmosMsgForEmpty[]
  option_type: MultipleChoiceOptionType
  title: string
  vote_count: Uint128
}
export interface MultipleChoiceVotes {
  vote_weights: Uint128[]
}
export interface VoteListResponse {
  votes: VoteInfo[]
}
export type ProposalCreationPolicyResponse =
  | {
      Anyone: {
        [k: string]: unknown
      }
    }
  | {
      Module: {
        addr: Addr
        [k: string]: unknown
      }
    }
export interface HooksResponse {
  hooks: string[]
}
