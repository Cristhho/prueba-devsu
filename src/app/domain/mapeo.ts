export interface Mapeo<Modelo, Dto> {
  dtoModelo(datos: Dto): Modelo;
  modeloDto(modelo: Modelo | Partial<Modelo>): Dto;
}
