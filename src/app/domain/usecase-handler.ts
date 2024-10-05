type UseCaseArg = {}

export interface UseCaseHandler<Args extends UseCaseArg = {}, Resultado = any> {
  execute(args: Args): Resultado | (() => Resultado);
}
