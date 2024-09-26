import { Producto } from "@app/domain";
import { ProductoDto } from "@app/domain/dto";

export const producto: Producto = {
  descripcion: '',
  fechaLiberacion: new Date('2024-01-01'),
  fechaRevision: new Date('2025-01-01'),
  id: '123',
  logo: 'http://dominio.com/logo.png',
  nombre: 'producto'
};

export const productoDto: ProductoDto = {
  date_release: '2024-01-01',
  date_revision: '2025-01-01',
  description: '',
  id: '123',
  logo: 'http://dominio.com/logo.png',
  name: 'producto'
};
