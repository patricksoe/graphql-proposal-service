export interface ProposalInput {
  name: string;
}

export interface CreateProposalArgs {
  input: ProposalInput;
}

export interface UpdateProposalArgs {
  id: string;
  input: ProposalInput;
}

export interface DeleteProposalArgs {
  id: string;
}
