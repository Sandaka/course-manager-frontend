import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip, SingleDataSet } from 'ng2-charts';
import { Color } from 'ng2-charts';

@Component({
  selector: 'app-profit-reports',
  templateUrl: './profit-reports.component.html',
  styleUrls: ['./profit-reports.component.scss']
})
export class ProfitReportsComponent implements OnInit {

  constructor() {
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
  }

  ngOnInit(): void {
  }

  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLabels: Label[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartPlugins = [];
  barChartData: ChartDataSets[] = [
    { data: [45, 37, 60, 70, 46, 33, 200, 100, 80, 90], label: 'Monthly Profit For Business Year 2022' }
  ];
  lineChartColors: Color[] = [
    {
      borderColor: 'rgba(0, 37, 38,0.40)',
      backgroundColor: 'rgba(3, 163, 168,0.50)',
    },
  ];

  exp_barChartData: ChartDataSets[] = [
    { data: [10, 5, 12, 12, 11, 5, 6, 8, 10, 11], label: 'Monthly Expenses For Business Year 2022' }
  ];
  exp_lineChartColors: Color[] = [
    {
      borderColor: 'rgba(0, 37, 38,0.40)',
      backgroundColor: 'rgba(200, 7, 7,0.50)',
    },
  ];

  public pieChartOptions: ChartOptions = {
    responsive: true,
  };
  public pieChartLabels: Label[] = [['$ 2022'], ['$ 2021'], '$ 2020'];
  public pieChartData: SingleDataSet = [300000, 500000, 250000];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];
}
