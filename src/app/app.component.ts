import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

import * as d3 from 'd3';
import * as dc from 'dc';
import * as crossfilter from 'crossfilter2';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'app works!';

  @ViewChild('test') test: ElementRef;
  chart: dc.BarChart;

  /**
   *
   */
  constructor() {
  }

  ngAfterViewInit() {
    this.chart = dc.barChart(this.test.nativeElement);

    let experiments = [];
    d3.json('assets/data.json').get((err: any, data: any) => {
      experiments = data;
      let ndx = crossfilter(experiments);
      let runDimension = ndx.dimension(d => +d.run);
      let speedSumGroup = runDimension.group().reduceSum(d => d.speed * d.run / 1000);
      this.chart.width(768)
        .height(480)
        .x(d3.scale.linear().domain([6, 20]))
        .brushOn(false)
        .yAxisLabel("This is the Y Axis!")
        .dimension(runDimension)
        .group(speedSumGroup)
        .on('renderlet', chart => {
          chart.selectAll('rect').on("click", d => {
            console.log("click!", d);
          });
        });

        this.chart.render();
    });
  }

  ngOnInit(): void {    
  }
}
