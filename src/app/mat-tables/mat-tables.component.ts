import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { RestfulService } from '../services/restful.service';
import { RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';  
import { MatInputModule } from '@angular/material/input';    
import { CommonModule } from '@angular/common';                        
import { MatTableModule } from '@angular/material/table'  
//import { MdePopoverModule } from '@material-extended/mde'; 
//[ERROR] TS-992012: Component imports must be standalone components, directives, pipes, or must be NgModules.

export interface FundingDocument {
  userCaseId: string; 
  userCaseLineNumberId: string;
  documentNumber: string;
  fundingControlTypeId: string;
  startFiscalYearId: string;
}

@Component({
  selector: 'app-mat-tables',
  standalone: true,
  imports: [RouterModule, MatFormFieldModule, CommonModule, MatTableModule, MatInputModule],
  templateUrl: './mat-tables.component.html',
  styleUrl: './mat-tables.component.css'
})
export class MatTablesComponent {

    //Property 'sort' has no initializer and is not definitely assigned in the constructor
    @ViewChild(MatSort, {static: true}) sort: MatSort | null = null;;

    //===1
    displayColumnsFD: string[] = ['userCaseId', 'userCaseLineNumberId', 'popOver']; 
    dsFundingDocs = new MatTableDataSource<FundingDocument>();
  
    selectedRow: FundingDocument | null = null;
    selectedRows: FundingDocument[] = [];
    fundingDocuments = [
      {"userCaseId":"SRBOOO", "userCaseLineNumberId":"001", "documentNumber":"GCC98BC9SROO01", "fundingControlTypeId":"AFTUITION", "startFiscalYearId":"2021"},
      {"userCaseId":"ADDDDD", "userCaseLineNumberId":"002", "documentNumber":"5GCC98BC9SROO2", "fundingControlTypeId":"AFTUITION", "startFiscalYearId":"2020"}
    ]
    //===2
    dsFinancialHistory = new MatTableDataSource();
    displayedColumns: string[] = ['createDt','cycleControlId','img'];
    expandedElement: any;
    displaySubcolumns = ['fiscalYearId','account'];  
  
    //===3
    personTypes: any[] = [{"id":1,"type":"Student"},{"id":2,"type":"Intern"},{"id":3,"type":"Exchange"}];
    displayedColumn: string[] = ['firstName','lastName','ssn','birthDay','personType','phone','delete'];
    dsPerson = new MatTableDataSource();
  
    //restService = inject(RestfulService);

    constructor(private restService: RestfulService) { }

  ngOnInit(): void {
    this.dsFundingDocs.sort = this.sort;
    this.dsFundingDocs.data = this.fundingDocuments;

    this.financialHistory();

    this.getPersonAll();
  }

  onRowClick(row:any) {
    this.selectedRow = row;
    this.selectedRows = row;
  }
  
  //=============
  financialHistory() {
    this.dsFinancialHistory.data =[
      {
         "createDt":"2006-10-18",
         "cycleControlId":"8",
         "historySubList":[
            {
               "fiscalYearId":"2002",
               "account":"123"
            }
         ]
      }
    ] 
  }

  //================
  getPersonAll() {
    this.restService.getPersonAllData()
    .subscribe({
      next: value => {
        this.dsPerson.data = value;
      },
      error: error => console.error('Error:', error),
      complete: () => console.log('Complete')
    }); 
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dsPerson.filter = filterValue.trim().toLowerCase();
  }  
  onClickDelete(id: string) {
    console.log("delete id: "+id)
    this.restService.deletePerson(id)
    .subscribe({
      next: value => {
        this.getPersonAll();
      },
      error: error => console.error('Error:', error),
      complete: () => console.log('Complete')
    }); 
  }
  
}
