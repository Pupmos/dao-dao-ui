import { useCallback } from 'react'
import { useRecoilValue, constSelector, useSetRecoilState } from 'recoil'

import {
  proposalExecutionTXHashSelector,
  refreshProposalIdAtom,
  refreshProposalsIdAtom,
  useWallet,
} from '@dao-dao/state'
import { votingPowerAtHeightSelector } from '@dao-dao/state/recoil/selectors/clients/cw-core'
import {
  proposalSelector,
  getVoteSelector,
} from '@dao-dao/state/recoil/selectors/clients/cw-proposal-single'

import { useProposalModule } from '.'

interface UseProposalInfoOptions {
  // Used if the DAO has updated its governance module and would still
  // like to show those old proposals.
  oldProposalsAddress?: string
}

export const useProposalInfo = (
  coreAddress: string,
  proposalId?: number,
  { oldProposalsAddress }: UseProposalInfoOptions = {}
) => {
  const { address: walletAddress } = useWallet()

  const { proposalModuleAddress } = useProposalModule(coreAddress, {
    oldProposalsAddress,
  })

  const proposalResponse = useRecoilValue(
    proposalModuleAddress && proposalId !== undefined
      ? proposalSelector({
          contractAddress: proposalModuleAddress,
          params: [{ proposalId }],
        })
      : constSelector(undefined)
  )

  const voteResponse = useRecoilValue(
    proposalModuleAddress && proposalId !== undefined && walletAddress
      ? getVoteSelector({
          contractAddress: proposalModuleAddress,
          params: [{ proposalId, voter: walletAddress }],
        })
      : constSelector(undefined)
  )

  const votingPowerAtHeight = useRecoilValue(
    walletAddress && proposalResponse
      ? votingPowerAtHeightSelector({
          contractAddress: coreAddress,
          params: [
            {
              address: walletAddress,
              height: proposalResponse.proposal.start_height,
            },
          ],
        })
      : constSelector(undefined)
  )

  const txHash = useRecoilValue(
    proposalModuleAddress && proposalId !== undefined
      ? proposalExecutionTXHashSelector({
          contractAddress: proposalModuleAddress,
          proposalId,
        })
      : constSelector(undefined)
  )

  const setRefreshProposalsId = useSetRecoilState(refreshProposalsIdAtom)
  const setRefreshProposalId = useSetRecoilState(
    refreshProposalIdAtom({
      address: proposalModuleAddress ?? '',
      proposalId: proposalId ?? -1,
    })
  )
  const refreshProposal = useCallback(() => {
    setRefreshProposalId((id) => id + 1)
  }, [setRefreshProposalId])
  const refreshProposalAndAll = useCallback(() => {
    setRefreshProposalsId((id) => id + 1)
    refreshProposal()
  }, [setRefreshProposalsId, refreshProposal])

  return {
    proposalResponse,
    voteResponse,
    votingPowerAtHeight,
    txHash,
    refreshProposal,
    refreshProposalAndAll,
  }
}
