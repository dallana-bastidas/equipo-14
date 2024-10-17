import { Component, ElementRef, ViewChild } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { HeaderComponent } from '../header/header.component';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { InventarioService } from '../services/inventario.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

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
    archivoImgAvatar: any;
    @ViewChild('inputFile') inputFile!: ElementRef;

    listaTallas: any[] = [
        { talla: 'XS', cantidad: 0 },
        { talla: 'S', cantidad: 0 },
        { talla: 'M', cantidad: 0 },
        { talla: 'L', cantidad: 0 },
        { talla: 'XL', cantidad: 0 },
    ]

    // Formulario reactivo
    formProducto: FormGroup

    constructor(private fb: FormBuilder, private _inventarioService: InventarioService, private router: Router) {
        this.formProducto = this.fb.group({
            producto: [null, [Validators.required]],
            descripcion: [null, [Validators.required]],
            precioProveedor: [null, [Validators.required]],
            precioPublico: [null, [Validators.required]],
            proveedor: [null, [Validators.required]],
            genero: [null, [Validators.required]],
            file: [null, Validators.required],
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

    cambioArchivoInput(event: any) {
        if (event.target.files.length > 0) {
            this.archivoImgAvatar = event.target.files[0];
        }
    }

    guardarProducto() {
        console.log(this.formProducto.get('inventario')!.value);
        let infoInventario = this.formProducto.get('inventario')!.value;
        infoInventario = JSON.stringify(infoInventario);

        const formData: FormData = new FormData();
        formData.append('file', this.archivoImgAvatar);
        formData.append('producto', this.formProducto.get('producto')!.value);
        formData.append('descripcion', this.formProducto.get('descripcion')!.value);
        formData.append('precioProveedor', this.formProducto.get('precioProveedor')!.value);
        formData.append('precioPublico', this.formProducto.get('precioPublico')!.value);
        formData.append('proveedor', this.formProducto.get('proveedor')!.value);
        formData.append('genero', this.formProducto.get('genero')!.value);
        formData.append('inventario', infoInventario);
        this._inventarioService.crearInventario(formData).subscribe({
            next: data => {
                this.formProducto.reset();
                Swal.fire({
                    title: 'Producto registrado',
                    text: 'El producto se ha registrado correctamente',
                    icon: 'success',
                    confirmButtonText: 'Aceptar'
                }).then((result) => {
                    if (result.isConfirmed) {
                        this.router.navigate(['/inventario']);
                    }
                });
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



    handleClickInputFile() {
        this.inputFile.nativeElement.click();
    }


}
