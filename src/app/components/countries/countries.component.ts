import { Component, OnInit } from '@angular/core';
import { DataServiceService } from 'src/app/services/data-service.service';
import { GlobalDataSummary } from 'src/app/models/global-data';
import { DateWiseData } from 'src/app/models/datewise-data';
import { GoogleChartInterface } from 'ng2-google-charts';
import { map } from 'rxjs/operators';
import { merge } from 'rxjs';


@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.css']
})
export class CountriesComponent implements OnInit {

  totalConfirmed = 0;
  totalActive    = 0;
  totalRecovered = 0;
  totalDeaths    = 0;
  dateWiseData;
  loading = true;
  data : GlobalDataSummary[];
  selectedCountry : DateWiseData[];
  countries : string[]=[];
  lineChart : GoogleChartInterface ={
    chartType: 'LineChart'
  }

  constructor(private service : DataServiceService) { }

  ngOnInit(): void {
    
    merge(
      this.service.getDatewiseData().pipe(
        map(result =>{
          this.dateWiseData = result;
        })
      ),
      this.service.getGlobalData().pipe(map(result=>{
        this.data = result;
        this.data.forEach(cs=>{
          this.countries.push(cs.country)
        })
      }))
    ).subscribe({
      complete: () =>{
        this.updateValues('US')
        this.loading = false;
      }
    })
  }

  updateChart(){
    let dataTable = [];
    dataTable.push(['Date','Cases']);
    this.selectedCountry.forEach(cs => {
      dataTable.push([cs.date,cs.cases])
      
    })
    console.log(dataTable);

    this.lineChart ={
      chartType: 'LineChart',
      dataTable : dataTable,
      options: {height:500 ,
        animation:{
          duration: 1000,
          easing: 'out',
          "startup" : true
        }
        
      }
    }
  }

  updateValues(country: string){
    this.data.forEach(cs=>{
      if(cs.country == country){
        this.totalActive = cs.active
        this.totalRecovered = cs.recovered
        this.totalConfirmed = cs.confirmed
        this.totalDeaths = cs.deaths 
      }
    })
    this.selectedCountry = this.dateWiseData[country]
    // console.log(this.selectedCountry)
    this.updateChart();
  }


}
