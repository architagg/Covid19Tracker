import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-maincards',
  templateUrl: './maincards.component.html',
  styleUrls: ['./maincards.component.css']
})
export class MaincardsComponent implements OnInit {


  @Input('totalConfirmed')
  totalConfirmed;
  @Input('totalActive')
  totalActive;
  @Input('totalRecovered')
  totalRecovered;
  @Input('totalDeaths')
  totalDeaths;

  constructor() { }

  ngOnInit(): void {
  }

}
