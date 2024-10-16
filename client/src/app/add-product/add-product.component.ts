import { Component } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { HeaderComponent } from '../header/header.component';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { InventarioService } from '../services/inventario.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-add-product',
    standalone: true,
    imports: [SidebarComponent, HeaderComponent, ReactiveFormsModule, CommonModule],
    templateUrl: './add-product.component.html',
    styleUrls: ['./add-product.component.css']
})
export class AddProductComponent {
    priceProviderInput: string = '';
    priceSaleInput: string = '';

    listaTallas: any[] = [
        { talla: 'XS', cantidad: 0 },
        { talla: 'S', cantidad: 0 },
        { talla: 'M', cantidad: 0 },
        { talla: 'L', cantidad: 0 },
        { talla: 'XL', cantidad: 0 },
    ]

    // Formulario reactivo
    formProducto: FormGroup

    constructor(private fb: FormBuilder, private _inventarioService: InventarioService) {
        this.formProducto = this.fb.group({
            producto: [null, [Validators.required]],
            descripcion: [null, [Validators.required]],
            precioProveedor: [null, [Validators.required]],
            precioPublico: [null, [Validators.required]],
            proveedor: [null, [Validators.required]],
            genero: [null, [Validators.required]],
            urlImagen: ['https://placehold.co/200x200'],
            inventario: this.fb.array(this.listaTallas.map(talla => this.fb.group({
                talla: [talla.talla],
                cantidad: [talla.cantidad, [Validators.min(0)]],
                checked: [false]  // Para capturar si está marcado o no el checkbox
            })))
        })
    }
    get inventario(): FormArray {
        return this.formProducto.get('inventario') as FormArray;
    }

    guardarProducto() {
        this._inventarioService.crearInventario(this.formProducto.value).subscribe({
            next: data => {
                Swal.fire({
                    title: 'Producto registrado',
                    text: 'El producto se ha registrado correctamente',
                    icon: 'success',
                    confirmButtonText: 'Aceptar'
                })
                this.formProducto.reset();
            },
            error: error => {
                Swal.fire({
                    title: 'Error al registrar',
                    text: 'Ha ocurrido un error al registrar el producto, por favor comuníquese con el administrador',
                    icon: 'error',
                    confirmButtonText: 'Aceptar'
                })
            }
        })
    }

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
