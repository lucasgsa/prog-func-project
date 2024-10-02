import { Component, NgModule, OnInit } from '@angular/core';
import { BranchService } from './branch.service';
import { CommonModule } from '@angular/common';
import Branch from './branch.model';
import { BranchTableRow, BranchTableRowFilter, BranchTableRowSort, BranchTableRowSortAttribute } from './table_row/branch_table_row.model';
import { compose, filter, fold, groupBy, map, orderBy } from '../utils/utils';
import { FormsModule } from '@angular/forms';
import { pipe } from 'rxjs';

@Component({
  selector: 'app-branch',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './branch.component.html',
  styleUrl: './branch.component.css'
})
export class BranchComponent implements OnInit {

  branches: Branch[] = [];
  sort: BranchTableRowSort = { attribute: 'name', direction: 'ASC' };
  filter: BranchTableRowFilter = { name: '', protected: undefined, commitSha: ''};
  rows: BranchTableRow[] = [];

  constructor(private branchService: BranchService) { }

  ngOnInit(): void {
    this.branchService.findAll().subscribe((branches: Branch[]) => {
      this.branches = branches;
      this.renderRows();
    });
  }

  renderRows() {
    const rows = map((b: Branch) => (
      { 
        name: b.name, protected: b.protected, 
        commitSha: b.commit.sha, commitUrl: b.commit.url 
      })
    )(this.branches);

    this.rows = pipe(
      filter((row: BranchTableRow) => 
        this.filter.name == null 
        || this.filter.name.trim().length === 0 
        || row.name.toLowerCase().includes(this.filter.name?.toLowerCase())),
      filter((row: BranchTableRow) => 
        this.filter.protected == null 
        || row.protected && this.filter.protected
        || !row.protected && !this.filter.protected),
      filter((row: BranchTableRow) => 
        this.filter.commitSha == null 
        || this.filter.commitSha.trim().length === 0 
        || row.commitSha.toLowerCase().includes(this.filter.commitSha?.toLowerCase()))
    )(rows);

    this.rows = orderBy<BranchTableRow>(this.sort.attribute)(this.rows);
    this.rows = this.sort.direction === 'ASC' ? this.rows : this.rows.reverse();
  }

  applySort(column: BranchTableRowSortAttribute): void {
    this.sort = { attribute: column, direction: this.sort?.direction === 'ASC' ? 'DESC' : 'ASC' };
    this.rows = orderBy<BranchTableRow>(column)(this.rows);
    this.rows = this.sort.direction === 'ASC' ? this.rows : this.rows.reverse();

    this.renderRows();
  }

  applyFilterByProtected(event : Event): void {
    const input = (event.target as HTMLInputElement).value;
    this.filter.protected = input === 'true' ? true : input === 'false' ? false : undefined;
    this.renderRows();
  }

  applyFilterByCommitSha(event : Event): void {
    const input = (event.target as HTMLInputElement).value;
    this.filter.commitSha = input;
    this.renderRows();
  }

  applyFilterByName(event : Event): void {
    const input = (event.target as HTMLInputElement).value;
    this.filter.name = input;
    this.renderRows();
  }

}