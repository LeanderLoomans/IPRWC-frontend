import { Component, OnInit } from '@angular/core';

declare var particlesJS: any;

@Component({
  selector: 'app-background',
  templateUrl: './background.component.html',
  styleUrls: ['./background.component.css']
})
export class BackgroundComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

    particlesJS.load('particles-js', '../../../assets/particles/particlesjs-config.json', function() {

    });
  }

}

