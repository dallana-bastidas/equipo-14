import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AñadirProductoComponent {
  constructor(private router: Router) {}

  onAvatarClick() {
    this.router.navigate(['/otra-pagina']);
  }
}