import Branch from "../branch.model";

export type BranchTableRowSortAttribute = keyof BranchTableRow;

export type BranchTableRowSortDirection = 'ASC' | 'DESC';

export type BranchTableRowSort = {
  attribute: BranchTableRowSortAttribute,
  direction: BranchTableRowSortDirection
};

export type BranchTableRowFilter = {
  name?: string | null;
  commitSha?: string,
  commitUrl?: string
  protected?: boolean;
}

export type BranchTableRow = {
  name: string;
  commitSha: string,
  commitUrl: string
  protected: boolean;
};
