import {Address, BigInt, Bytes, ethereum} from '@graphprotocol/graph-ts';
import {createMockedFunction, newMockEvent} from 'matchstick-as';

import {AddresslistVotingProposal} from '../../generated/schema';
import {
  ProposalCreated,
  VoteCast,
  ProposalExecuted,
  VotingSettingsUpdated,
  AddressesAdded,
  AddressesRemoved
} from '../../generated/templates/AddresslistVoting/AddresslistVoting';
import {
  ADDRESS_ONE,
  DAO_ADDRESS,
  PROPOSAL_ENTITY_ID,
  PROPOSAL_ID,
  CONTRACT_ADDRESS,
  VOTING_MODE,
  SUPPORT_THRESHOLD,
  MIN_VOTING_POWER,
  START_DATE,
  END_DATE,
  SNAPSHOT_BLOCK,
  TOTAL_VOTING_POWER,
  CREATED_AT
} from '../constants';

// events

export function createNewProposalCreatedEvent(
  proposalId: string,
  creator: string,
  startDate: string,
  endDate: string,
  description: string,
  contractAddress: string
): ProposalCreated {
  let createProposalCreatedEvent = changetype<ProposalCreated>(newMockEvent());

  createProposalCreatedEvent.address = Address.fromString(contractAddress);
  createProposalCreatedEvent.parameters = [];

  let proposalIdParam = new ethereum.EventParam(
    'proposalId',
    ethereum.Value.fromSignedBigInt(BigInt.fromString(proposalId))
  );
  let creatorParam = new ethereum.EventParam(
    'creator',
    ethereum.Value.fromAddress(Address.fromString(creator))
  );
  let startDateParam = new ethereum.EventParam(
    'startDate',
    ethereum.Value.fromSignedBigInt(BigInt.fromString(startDate))
  );
  let endDateParam = new ethereum.EventParam(
    'endDate',
    ethereum.Value.fromSignedBigInt(BigInt.fromString(endDate))
  );
  let descriptionParam = new ethereum.EventParam(
    'description',
    ethereum.Value.fromBytes(Bytes.fromUTF8(description))
  );

  createProposalCreatedEvent.parameters.push(proposalIdParam);
  createProposalCreatedEvent.parameters.push(creatorParam);
  createProposalCreatedEvent.parameters.push(startDateParam);
  createProposalCreatedEvent.parameters.push(endDateParam);
  createProposalCreatedEvent.parameters.push(descriptionParam);

  return createProposalCreatedEvent;
}

export function createNewVoteCastEvent(
  proposalId: string,
  voter: string,
  creatorChoice: string,
  votingPower: string,
  contractAddress: string
): VoteCast {
  let createProposalCastEvent = changetype<VoteCast>(newMockEvent());

  createProposalCastEvent.address = Address.fromString(contractAddress);
  createProposalCastEvent.parameters = [];

  let proposalIdParam = new ethereum.EventParam(
    'proposalId',
    ethereum.Value.fromSignedBigInt(BigInt.fromString(proposalId))
  );
  let voterParam = new ethereum.EventParam(
    'voter',
    ethereum.Value.fromAddress(Address.fromString(voter))
  );
  let voteOptionParam = new ethereum.EventParam(
    'voteOption',
    ethereum.Value.fromUnsignedBigInt(BigInt.fromString(creatorChoice))
  );
  let votingPowerParam = new ethereum.EventParam(
    'voteOption',
    ethereum.Value.fromUnsignedBigInt(BigInt.fromString(votingPower))
  );

  createProposalCastEvent.parameters.push(proposalIdParam);
  createProposalCastEvent.parameters.push(voterParam);
  createProposalCastEvent.parameters.push(voteOptionParam);
  createProposalCastEvent.parameters.push(votingPowerParam);

  return createProposalCastEvent;
}

export function createNewProposalExecutedEvent(
  proposalId: string,
  contractAddress: string
): ProposalExecuted {
  let createProposalExecutedEvent = changetype<ProposalExecuted>(
    newMockEvent()
  );

  createProposalExecutedEvent.address = Address.fromString(contractAddress);
  createProposalExecutedEvent.parameters = [];

  let proposalIdParam = new ethereum.EventParam(
    'proposalId',
    ethereum.Value.fromSignedBigInt(BigInt.fromString(proposalId))
  );
  let execResultsParam = new ethereum.EventParam(
    'execResults',
    ethereum.Value.fromBytesArray([Bytes.fromUTF8('')])
  );

  createProposalExecutedEvent.parameters.push(proposalIdParam);
  createProposalExecutedEvent.parameters.push(execResultsParam);

  return createProposalExecutedEvent;
}

export function createNewVotingSettingsUpdatedEvent(
  votingMode: string,
  supportThreshold: string,
  minParticipation: string,
  minDuration: string,
  minProposerVotingPower: string,
  contractAddress: string
): VotingSettingsUpdated {
  let newVotingSettingsUpdatedEvent = changetype<VotingSettingsUpdated>(
    newMockEvent()
  );

  newVotingSettingsUpdatedEvent.address = Address.fromString(contractAddress);
  newVotingSettingsUpdatedEvent.parameters = [];

  let votingModeParam = new ethereum.EventParam(
    'votingMode',
    ethereum.Value.fromSignedBigInt(BigInt.fromString(votingMode))
  );
  let supportThresholdParam = new ethereum.EventParam(
    'supportThreshold',
    ethereum.Value.fromSignedBigInt(BigInt.fromString(supportThreshold))
  );
  let minParticipationParam = new ethereum.EventParam(
    'minParticipation',
    ethereum.Value.fromSignedBigInt(BigInt.fromString(minParticipation))
  );
  let minDurationParam = new ethereum.EventParam(
    'minDuration',
    ethereum.Value.fromSignedBigInt(BigInt.fromString(minDuration))
  );
  let minProposerVotingPowerParam = new ethereum.EventParam(
    'minProposerVotingPower',
    ethereum.Value.fromSignedBigInt(BigInt.fromString(minProposerVotingPower))
  );

  newVotingSettingsUpdatedEvent.parameters.push(votingModeParam);
  newVotingSettingsUpdatedEvent.parameters.push(minParticipationParam);
  newVotingSettingsUpdatedEvent.parameters.push(supportThresholdParam);
  newVotingSettingsUpdatedEvent.parameters.push(minDurationParam);
  newVotingSettingsUpdatedEvent.parameters.push(minProposerVotingPowerParam);

  return newVotingSettingsUpdatedEvent;
}

export function createNewAddressesAddedEvent(
  addresses: Address[],
  contractAddress: string
): AddressesAdded {
  let newAddressesAddedEvent = changetype<AddressesAdded>(newMockEvent());

  newAddressesAddedEvent.address = Address.fromString(contractAddress);
  newAddressesAddedEvent.parameters = [];

  let usersParam = new ethereum.EventParam(
    'users',
    ethereum.Value.fromAddressArray(addresses)
  );

  newAddressesAddedEvent.parameters.push(usersParam);

  return newAddressesAddedEvent;
}

export function createNewAddressesRemovedEvent(
  addresses: Address[],
  contractAddress: string
): AddressesRemoved {
  let newAddressesRemovedEvent = changetype<AddressesRemoved>(newMockEvent());

  newAddressesRemovedEvent.address = Address.fromString(contractAddress);
  newAddressesRemovedEvent.parameters = [];

  let usersParam = new ethereum.EventParam(
    'users',
    ethereum.Value.fromAddressArray(addresses)
  );

  newAddressesRemovedEvent.parameters.push(usersParam);

  return newAddressesRemovedEvent;
}

// calls

export function getProposalCountCall(
  contractAddress: string,
  returns: string
): void {
  createMockedFunction(
    Address.fromString(contractAddress),
    'proposalCount',
    'proposalCount():(uint256)'
  )
    .withArgs([])
    .returns([ethereum.Value.fromSignedBigInt(BigInt.fromString(returns))]);
}

// state

export function createAddresslistVotingProposalEntityState(
  entityID: string = PROPOSAL_ENTITY_ID,
  dao: string = DAO_ADDRESS,
  pkg: string = CONTRACT_ADDRESS,
  creator: string = ADDRESS_ONE,
  proposalId: string = PROPOSAL_ID,

  open: boolean = true,
  executed: boolean = false,

  votingMode: string = VOTING_MODE,
  supportThreshold: string = SUPPORT_THRESHOLD,
  minVotingPower: string = MIN_VOTING_POWER,
  startDate: string = START_DATE,
  endDate: string = END_DATE,
  snapshotBlock: string = SNAPSHOT_BLOCK,

  totalVotingPower: string = TOTAL_VOTING_POWER,

  createdAt: string = CREATED_AT,
  creationBlockNumber: BigInt = new BigInt(0),
  executable: boolean = false
): AddresslistVotingProposal {
  let addresslistProposal = new AddresslistVotingProposal(entityID);
  addresslistProposal.dao = Address.fromString(dao).toHexString();
  addresslistProposal.plugin = Address.fromString(pkg).toHexString();
  addresslistProposal.proposalId = BigInt.fromString(proposalId);
  addresslistProposal.creator = Address.fromString(creator);

  addresslistProposal.open = open;
  addresslistProposal.executed = executed;

  addresslistProposal.votingMode = votingMode;
  addresslistProposal.supportThreshold = BigInt.fromString(supportThreshold);
  addresslistProposal.minVotingPower = BigInt.fromString(minVotingPower);
  addresslistProposal.startDate = BigInt.fromString(startDate);
  addresslistProposal.endDate = BigInt.fromString(endDate);
  addresslistProposal.snapshotBlock = BigInt.fromString(snapshotBlock);

  addresslistProposal.totalVotingPower = BigInt.fromString(totalVotingPower);

  addresslistProposal.createdAt = BigInt.fromString(createdAt);
  addresslistProposal.creationBlockNumber = creationBlockNumber;
  addresslistProposal.executable = executable;

  addresslistProposal.save();

  return addresslistProposal;
}
