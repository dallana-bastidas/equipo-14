import { Component } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [ SidebarComponent, HeaderComponent],
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent {
  priceProviderInput: string = '';
  priceSaleInput: string = '';

  handlePriceProviderInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    const value = input.value.replace(/\D/g, ''); // Solo mantener números
    this.priceProviderInput = this.formatPrice(value);
  }

  handlePriceSaleInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    const value = input.value.replace(/\D/g, ''); // Solo mantener números
    this.priceSaleInput = this.formatPrice(value);
  }

  formatPrice(value: string): string {
    if (!value) return '';
    const numberValue = parseInt(value, 10);
    return `$ ${numberValue.toLocaleString('es-AR')}`;
  }

  handleProviderFocus(event: Event): void {
    const input = event.target as HTMLInputElement;
    input.value = this.priceProviderInput.replace('$', '').trim(); // Quitar el símbolo de peso al enfocar
  }

  handleSaleFocus(event: Event): void {
    const input = event.target as HTMLInputElement;
    input.value = this.priceSaleInput.replace('$', '').trim(); // Quitar el símbolo de peso al enfocar
  }

  handleProviderBlur(event: Event): void {
    const input = event.target as HTMLInputElement;
    const value = input.value.replace(/\D/g, ''); // Solo mantener números
    this.priceProviderInput = this.formatPrice(value);
  }

  handleSaleBlur(event: Event): void {
    const input = event.target as HTMLInputElement;
    const value = input.value.replace(/\D/g, ''); // Solo mantener números
    this.priceSaleInput = this.formatPrice(value);
  }
}