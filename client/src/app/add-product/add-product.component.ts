import { Component, ViewChild, ElementRef } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { HeaderComponent } from '../header/header.component';
import { CommonModule } from '@angular/common'; 
import { FormArray, FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { InventarioService } from '../services/inventario.service';
import Swal from 'sweetalert2';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [SidebarComponent, HeaderComponent, ReactiveFormsModule, CommonModule, RouterLink],
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
  ];

  // Formulario reactivo
  formProducto: FormGroup;

  // Array para almacenar las URLs de las imágenes seleccionadas
  imagenes: string[] = [];

  // Mensajes de error para validaciones
  errorMsg: string = '';

  // Constantes para la validación de imágenes
  maxImageCount = 5;  // Máximo número de imágenes permitidas
  minFileSize = 1 * 1024; // 1KB por imagen (mínimo)
  maxFileSize = 1 * 1024 * 1024; // 1MB por imagen (máximo)
  maxWidth = 1024; // Máximo ancho de imagen
  maxHeight = 1024; // Máximo alto de imagen

  // Referencia al input de archivos
  @ViewChild('fileInput', { static: false }) fileInput!: ElementRef;

  constructor(
    private fb: FormBuilder, 
    private _inventarioService: InventarioService
  ) {
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
    });
  }

  // Getter para acceder al array de inventario
  get inventario(): FormArray {
    return this.formProducto.get('inventario') as FormArray;
  }

  // Función para manejar la selección de imágenes
  onImageSelected(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files) {
      const files = Array.from(input.files);

      if (this.imagenes.length + files.length > this.maxImageCount) {
        this.errorMsg = `No se pueden subir más de ${this.maxImageCount} imágenes.`;
        return;
      }

      files.forEach(file => {
        const fileExtension = file.name.split('.').pop()?.toLowerCase();
        if (fileExtension !== 'jpg' && fileExtension !== 'png') {
          this.errorMsg = `El archivo ${file.name} debe ser de tipo JPG o PNG.`;
          return;
        }

        if (file.size < this.minFileSize || file.size > this.maxFileSize) {
          this.errorMsg = `El archivo ${file.name} no cumple con el tamaño permitido.`;
          return;
        }

        const reader = new FileReader();
        reader.onload = (e: any) => {
          const img = new Image();
          img.src = e.target.result;

          img.onload = () => {
            if (img.width > this.maxWidth || img.height > this.maxHeight) {
              this.errorMsg = `La imagen ${file.name} excede las dimensiones máximas de ${this.maxWidth}x${this.maxHeight} píxeles.`;
              return;
            }

            this.imagenes.push(e.target.result);
            this.errorMsg = ''; // Limpiar mensaje de error si todo es correcto
          };
        };
        reader.readAsDataURL(file);
      });
    }
  }

  // Función para eliminar una imagen seleccionada
  removeImage(index: number): void {
    this.imagenes.splice(index, 1);
  }

  // Función para manejar el input del precio por proveedor
  handlePriceProviderInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    const value = input.value.replace(/\D/g, '');
    this.priceProviderInput = this.formatPrice(value);
  }

  // Función para manejar el input del precio de venta
  handlePriceSaleInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    const value = input.value.replace(/\D/g, '');
    this.priceSaleInput = this.formatPrice(value);
  }

  formatPrice(value: string): string {
    if (!value) return '';
    const numberValue = parseInt(value, 10);
    return `$ ${numberValue.toLocaleString('es-AR')}`;
  }

  // Funciones para manejar el focus y blur de los campos de precio
  handleProviderFocus(event: Event): void {
    const input = event.target as HTMLInputElement;
    input.value = this.priceProviderInput.replace('$', '').trim();
  }

  handleProviderBlur(event: Event): void {
    const input = event.target as HTMLInputElement;
    const value = input.value.replace(/\D/g, '');
    this.priceProviderInput = this.formatPrice(value);
  }

  handleSaleFocus(event: Event): void {
    const input = event.target as HTMLInputElement;
    input.value = this.priceSaleInput.replace('$', '').trim();
  }

  handleSaleBlur(event: Event): void {
    const input = event.target as HTMLInputElement;
    const value = input.value.replace(/\D/g, '');
    this.priceSaleInput = this.formatPrice(value);
  }

  // Método para abrir el selector de archivos
  selectFile(): void {
    if (this.fileInput) {
      this.fileInput.nativeElement.click();
    }
  }

  // Método para guardar el producto
  guardarProducto(): void {
    this._inventarioService.crearInventario(this.formProducto.value).subscribe({
      next: () => {
        Swal.fire({
          title: 'Producto registrado',
          text: 'El producto se ha registrado correctamente',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        });
        this.formProducto.reset();
      },
      error: () => {
        Swal.fire({
          title: 'Error al registrar',
          text: 'Ha ocurrido un error, por favor comuníquese con el administrador',
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });
      }
    });
  }
}
