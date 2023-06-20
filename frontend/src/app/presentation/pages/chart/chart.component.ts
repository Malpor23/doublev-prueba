import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgApexchartsModule } from 'ng-apexcharts';
import { SearchModel } from '../../../domain/model';
import { IParams, SearchResponse } from '../../../domain/base';
import { SearchUseCase } from '../../../domain/uses-cases';
import {
    ApexChart,
    ApexAxisChartSeries,
    ApexDataLabels,
    ApexPlotOptions,
    ApexYAxis,
    ApexLegend,
    ApexGrid
} from 'ng-apexcharts';

type ApexXAxis = {
    type?: "category" | "datetime" | "numeric";
    categories?: any;
    labels?: {
        style?: {
            colors?: string | string[];
            fontSize?: string;
        };
    };
};

export type ChartOptions = {
    series: ApexAxisChartSeries;
    chart: ApexChart;
    dataLabels: ApexDataLabels;
    plotOptions: ApexPlotOptions;
    yaxis: ApexYAxis;
    xaxis: ApexXAxis;
    grid: ApexGrid;
    colors: string[];
    legend: ApexLegend;
};

@Component({
    selector: 'app-chart',
    standalone: true,
    imports: [CommonModule, NgApexchartsModule],
    templateUrl: './chart.component.html',
    styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {

    @ViewChild("chart") chart!: ChartComponent;
    public chartOptions: Partial<ChartOptions> | any;

    users: Array<SearchModel> = [];
    query: IParams = {
        filter: 'manuel',
        page: 1,
        perPage: 10
    }

    private searchUseCase: SearchUseCase = inject(SearchUseCase);

    ngOnInit(): void {
        this.getUsers();
    }

    getChart() {
        this.chartOptions = {
            series: [
                {
                    name: 'Seguidores',
                    data: [21, 22, 10, 28, 16, 21, 13, 30, 27, 19]
                }
            ],
            chart: {
                height: 450,
                type: 'bar',
            },
            colors: [
                "#008FFB",
                "#00E396",
                "#FEB019",
                "#FF4560",
                "#775DD0",
                "#546E7A",
                "#26a69a",
                "#D10CE8",
                "#C0ADDB",
                "#CDD7B6",
            ],
            plotOptions: {
                bar: {
                    columnWidth: "45%",
                    distributed: true
                }
            },
            dataLabels: {
                enabled: false
            },
            legend: {
                show: false
            },
            grid: {
                show: false
            },
            xaxis: {
                categories: this.users.map((item: SearchModel) => item.login),
                labels: {
                    style: {
                        colors: [
                            "#008FFB",
                            "#00E396",
                            "#FEB019",
                            "#FF4560",
                            "#775DD0",
                            "#546E7A",
                            "#26a69a",
                            "#D10CE8",
                            "#C0ADDB",
                            "#CDD7B6",
                        ],
                        fontSize: "12px"
                    }
                }
            }
        };
    }

    getUsers(): void {
        this.searchUseCase.search(this.query).subscribe({
            next: (resp: SearchResponse<SearchModel[]>) => {
                if (resp.items) {
                    this.users = resp.items;
                    this.getChart();
                }
            }
        });
    }
}
