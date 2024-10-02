import Commit from "../commit/commit.model";

type Branch = {
  name: string;
  commit: Commit;
  protected: boolean;
};

export default Branch;