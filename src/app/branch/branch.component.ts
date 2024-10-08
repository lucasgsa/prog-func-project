import { Component, NgModule, OnInit } from '@angular/core';
import { BranchService } from './branch.service';
import { CommonModule } from '@angular/common';
import Branch from './branch.model';
import { BranchTableRow, BranchTableRowFilter, BranchTableRowSort, BranchTableRowSortAttribute } from './table_row/branch_table_row.model';
import { filter, map, orderBy, orderByDesc, compose4 } from '../utils/utils';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-branch',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './branch.component.html',
  styleUrl: './branch.component.css'
})
export class BranchComponent implements OnInit {

  allBranches: Branch[] = [];

  tableSorts: BranchTableRowSort = { attribute: 'name', direction: 'ASC' };
  tableFilters: BranchTableRowFilter = { name: '', protected: undefined, commitSha: ''};
  tableRows: BranchTableRow[] = [];

  constructor(private branchService: BranchService) { }

  ngOnInit(): void {
    this.branchService.findAll().subscribe((branches: Branch[]) => {
      this.allBranches = branches;
      this.makeTableRows();
    });
  }

  makeTableRows() {
    const rows: BranchTableRow[] = map((b: Branch) => 
      ({ name: b.name, protected: b.protected, commitSha: b.commit.sha, commitUrl: b.commit.url }), 
      this.allBranches
    );

    this.tableRows = compose4(
      (this.tableSorts.direction === 'ASC' ? orderBy : orderByDesc)(this.tableSorts.attribute),

      filter((row: BranchTableRow) => 
        this.tableFilters.name == null 
      || this.tableFilters.name.trim().length === 0 
      || row.name.toLowerCase().includes(this.tableFilters.name?.toLowerCase())),

      filter((row: BranchTableRow) => 
        this.tableFilters.protected == null 
      || row.protected === this.tableFilters.protected),
      
      filter((row: BranchTableRow) => 
          this.tableFilters.commitSha == null 
        || this.tableFilters.commitSha.trim().length === 0 
        || row.commitSha.toLowerCase().includes(this.tableFilters.commitSha?.toLowerCase()))
    )(rows);
  }

  applySort(column: BranchTableRowSortAttribute): void {
    this.tableSorts = { attribute: column, direction: this.tableSorts?.direction === 'ASC' ? 'DESC' : 'ASC' };
    this.makeTableRows();
  }

  applyFilterByProtected(event : Event): void {
    const input = (event.target as HTMLInputElement).value;
    this.tableFilters.protected = input === 'true' ? true : input === 'false' ? false : undefined;
    this.makeTableRows();
  }

  applyFilterByCommitSha(event : Event): void {
    const input = (event.target as HTMLInputElement).value;
    this.tableFilters.commitSha = input;
    this.makeTableRows();
  }

  applyFilterByName(event : Event): void {
    const input = (event.target as HTMLInputElement).value;
    this.tableFilters.name = input;
    this.makeTableRows();
  }

}