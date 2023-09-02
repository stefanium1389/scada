import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-trending',
  templateUrl: './trending.component.html',
  styleUrls: ['./trending.component.css']
})
export class TrendingComponent implements OnInit {

  constructor() { }

  analog_input: any[] = [];
  digital_input: any[] = [];


  ngOnInit(): void {
    this.analog_input = [{title:"title", timestamp:"28.08.2003. 16:54:53.245", value:"69",unit:"C",priority:"normal"},{title:"title", timestamp:"28.08.2003. 16:54:53.245", value:"69",unit:"C",priority:"low"},{title:"title", timestamp:"28.08.2003. 16:54:53.245", value:"69",unit:"C",priority:"high"},{title:"title", timestamp:"28.08.2003. 16:54:53.245", value:"69",unit:"C",priority:"critical"}]
    this.digital_input = [{title:"title", timestamp:"28.08.2003. 16:54:53.245", value:"True"},{title:"title", timestamp:"28.08.2003. 16:54:53.245", value:"False"},{title:"title", timestamp:"28.08.2003. 16:54:53.245", value:"True"}]
  }

}
