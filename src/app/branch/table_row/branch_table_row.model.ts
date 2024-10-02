import Branch from "../branch.model";

export type BranchTableRow = {
  name: string;
  commitSha: string,
  commitUrl: string,
  protected: boolean;
};

export type BranchTableRowSortAttribute = 'name' | 'protected' | 'commitSha';
export type BranchTableRowSortDirection = 'ASC' | 'DESC';

export type BranchTableRowSort = {
  attribute: BranchTableRowSortAttribute,
  direction: BranchTableRowSortDirection
};

export type BranchTableRowFilter = {
  name?: string | null;
  commitSha?: string,
  protected?: boolean;
}

