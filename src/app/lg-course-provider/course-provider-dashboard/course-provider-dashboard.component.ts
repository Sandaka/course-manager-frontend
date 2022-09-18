import { AfterViewInit, Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';



export interface UserData {
  id: string;
  name: string;
  startDate: string;
  fruit: string;
}

/** Constants used to fill up our data base. */
const FRUITS: string[] = [
  '12-12-2024',
  '10-12-2025',
  '12-10-2024',
  '12-10-2022',
  '30-09-2024',
  '08-10-2024',
  '11-12-2024',
  '15-12-2025',
];
const NAMES: string[] = [
  'Maia',
  'Asher',
  'Olivia',
  'Atticus',
  'Amelia',
  'Jack',
  'Charlotte',
  'Theodore',
  'Isla',
  'Oliver',
  'Isabella',
  'Jasper',
  'Cora',
  'Levi',
  'Violet',
  'Arthur',
  'Mia',
  'Thomas',
  'Elizabeth',
];

@Component({
  selector: 'app-course-provider-dashboard',
  templateUrl: './course-provider-dashboard.component.html',
  styleUrls: ['./course-provider-dashboard.component.scss']
})
export class CourseProviderDashboardComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['id', 'name', 'startDate', 'fruit'];
  dataSource: MatTableDataSource<UserData>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  public doughnutChartLabels: string[] = ['MSc in SE', 'Diploma in IT', 'BSc in BM', 'Certification'];
  public doughnutChartData: number[] = [26, 50, 50,70];
  chartOptions = {
    responsive: false,
    
  };

  constructor() {
    // Create 100 users
    const users = Array.from({ length: 100 }, (_, k) => createNewUser(k + 1));

    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(users);
  }

  ngOnInit(){
    
  }
  

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}

/** Builds and returns a new User. */
function createNewUser(id: number): UserData {
  const name =
    NAMES[Math.round(Math.random() * (NAMES.length - 1))] +
    ' ' +
    NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) +
    '.';

  return {
    id: id.toString(),
    name: name,
    startDate: '01-01-2019',
    // startDate: Math.round(Math.random() * 100).toString(),
    fruit: FRUITS[Math.round(Math.random() * (FRUITS.length - 1))],
  };

}
