import { Component, OnInit } from '@angular/core';
import { DataServiceService } from 'src/app/services/data-service.service';
import {HttpClientModule } from '@angular/common/http'; 
import { GlobalDataSummary } from 'src/app/models/global-data';
import { GoogleChartInterface } from 'ng2-google-charts';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  totalConfirmed = 0;
  totalActive    = 0;
  totalRecovered = 0;
  totalDeaths    = 0;
  loading = true;
  globalData     : GlobalDataSummary[];
  pieChart       : GoogleChartInterface = {
    chartType : 'PieChart'
  }
  columnChart : GoogleChartInterface = {
    chartType : 'ColumnChart'
  }

  

  constructor(private dataService : DataServiceService) { }

  updateChart(input : HTMLInputElement){
    console.log(input.value)
    this.initChart(input.value)
    }

  initChart(caseType : String) {

    let dataTable = [];
    dataTable.push(["Country" , "Cases"])
    
    this.globalData.forEach(cs=> {
      let val:number ;

      if (caseType == 'c'){
        if(cs.confirmed > 200000){
          val = cs.confirmed
          dataTable.push([
            cs.country , val
          ])
        }
      }  



      if (caseType == 'a'){
        if(cs.active > 70000){
          val = cs.active
          dataTable.push([
            cs.country , val
          ])
        }
      }  
    
      
      if (caseType == 'r'){
        if(cs.recovered > 90000){
          val = cs.recovered
          dataTable.push([
            cs.country , val
          ])
        }
      }  
  
      
      if (caseType == 'd'){
        if(cs.deaths > 6000){
          val = cs.deaths
          dataTable.push([
            cs.country , val
          ])
        }
      }
  })
    console.log(dataTable)

    this.pieChart= {
      chartType: 'PieChart',
      dataTable: dataTable,
      //firstRowIsData: true,
      options: {'Country': 'Cases',
    height: 500,
    animation:{
      duration: 1000,
      easing: 'out',
      "startup" : true
    }
  }
    };

    this.columnChart= {
      chartType: 'ColumnChart',
      dataTable: dataTable,
      //firstRowIsData: true,
      options: {'Country': 'Cases',
    height: 500
  }
    }
  
  }


  

  

  ngOnInit(): void {

      this.dataService.getGlobalData()
        .subscribe(
          {
            next: (result) => {
              // console.log(result);
              this.globalData = result;
              result.forEach(cs =>{
                
                if(!Number.isNaN(cs.confirmed)){
                  this.totalActive += cs.active
                  this.totalConfirmed += cs.confirmed
                  this.totalRecovered += cs.recovered
                  this.totalDeaths += cs.deaths
                }
              })
              
              this.initChart('d')
            },
            complete: () =>{
              this.loading = false
            }
          }
        )
      }
    }