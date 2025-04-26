interface DayInput {
  order: number;
  name: string;
}

interface StepInput {
  order: number;
  name: string;
  days?: DayInput[];
}

export interface ProposalsSortArgs {
  field: "CREATED_AT" | "NAME";
  direction: "asc" | "desc";
}

export interface ProposalInput {
  name: string;
  steps?: StepInput[];
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
