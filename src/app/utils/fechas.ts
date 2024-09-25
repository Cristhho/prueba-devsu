export class FechasUtils {
  static formato(date: Date): string {
    const dia = String(date.getDate()).padStart(2, '0');
    const mes = String(date.getMonth() + 1).padStart(2, '0');
    const anho = date.getFullYear();
    return `${anho}-${mes}-${dia}`;
  }
}
