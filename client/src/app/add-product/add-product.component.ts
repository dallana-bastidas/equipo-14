import { Component, ViewChild, ElementRef } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { HeaderComponent } from '../header/header.component';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [SidebarComponent, HeaderComponent, CommonModule],
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent {
  // Inputs para los precios
  priceProviderInput: string = '';
  priceSaleInput: string = '';

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

  // Función para manejar la selección de imágenes
  onImageSelected(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files) {
      const files = Array.from(input.files);

      // Validar número máximo de imágenes
      if (this.imagenes.length + files.length > this.maxImageCount) {
        this.errorMsg = `No se pueden subir más de ${this.maxImageCount} imágenes.`;
        return;
      }

      files.forEach((file) => {
        // Validar extensión del archivo
        const fileExtension = file.name.split('.').pop()?.toLowerCase();
        if (fileExtension !== 'jpg' && fileExtension !== 'png') {
          this.errorMsg = `El archivo ${file.name} debe ser de tipo JPG o PNG.`;
          return;
        }

        if (file.size < this.minFileSize) {
          this.errorMsg = `El archivo ${file.name} es demasiado pequeño. El tamaño mínimo es 1KB.`;
          return;
        }

        if (file.size > this.maxFileSize) {
          this.errorMsg = `El archivo ${file.name} es demasiado grande. El tamaño máximo es 1MB.`;
          return;
        }

        const reader = new FileReader();
        reader.onload = (e: any) => {
          const img = new Image();
          img.src = e.target.result;

          img.onload = () => {
            // Validar las dimensiones de la imagen
            if (img.width > this.maxWidth || img.height > this.maxHeight) {
              this.errorMsg = `La imagen ${file.name} excede las dimensiones máximas de ${this.maxWidth}x${this.maxHeight} píxeles.`;
              return;
            }

            // Si pasa las validaciones, agregarla al array de imágenes
            this.imagenes.push(e.target.result);
            this.errorMsg = ''; // Limpiar mensaje de error si todo es correcto
          };
        };
        reader.readAsDataURL(file); // Leer el archivo como Data URL
      });
    }
  }

  // Función para eliminar una imagen seleccionada
  removeImage(index: number): void {
    this.imagenes.splice(index, 1); // Remover la imagen del array
  }

  // Función para manejar el input del precio por proveedor
  handlePriceProviderInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    const value = input.value.replace(/\D/g, ''); // Solo mantener números
    this.priceProviderInput = this.formatPrice(value);
  }

  // Función para manejar el input del precio de venta
  handlePriceSaleInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    const value = input.value.replace(/\D/g, ''); // Solo mantener números
    this.priceSaleInput = this.formatPrice(value);
  }

  // Formatear los precios agregando el símbolo de $ y formato local
  formatPrice(value: string): string {
    if (!value) return '';
    const numberValue = parseInt(value, 10);
    return `$ ${numberValue.toLocaleString('es-AR')}`;
  }

  // Función para manejar el focus en el campo de precio por proveedor (quita el símbolo $)
  handleProviderFocus(event: Event): void {
    const input = event.target as HTMLInputElement;
    input.value = this.priceProviderInput.replace('$', '').trim(); // Quitar el símbolo de peso al enfocar
  }

  // Función para manejar el blur en el campo de precio por proveedor (añade el formato de $)
  handleProviderBlur(event: Event): void {
    const input = event.target as HTMLInputElement;
    const value = input.value.replace(/\D/g, ''); // Solo mantener números
    this.priceProviderInput = this.formatPrice(value);
  }

  // Función para manejar el focus en el campo de precio de venta (quita el símbolo $)
  handleSaleFocus(event: Event): void {
    const input = event.target as HTMLInputElement;
    input.value = this.priceSaleInput.replace('$', '').trim(); // Quitar el símbolo de peso al enfocar
  }

  // Función para manejar el blur en el campo de precio de venta (añade el formato de $)
  handleSaleBlur(event: Event): void {
    const input = event.target as HTMLInputElement;
    const value = input.value.replace(/\D/g, ''); // Solo mantener números
    this.priceSaleInput = this.formatPrice(value);
  }

  // Método para hacer clic en el botón y abrir el selector de archivos
  selectFile(): void {
    if (this.fileInput) {
      this.fileInput.nativeElement.click(); // Simula el clic en el input
    }
  }
}
