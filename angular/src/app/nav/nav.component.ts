import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  @Input() sidebarOpen: boolean = true; // Default to open on large screens
  accountId!: number; // Assuming accountId might be needed for dynamic links in nav
  userName: string = 'John Doe'; // Placeholder for user's name

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    // This part can remain if nav links depend on accountId, otherwise can be removed
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      if (idParam) {
        this.accountId = +idParam;
      }
    });
  }
}
