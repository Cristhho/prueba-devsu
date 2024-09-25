import { defer, of } from 'rxjs'

export const asyncData = <T>(data: T) => {
  return defer(() => Promise.resolve(data))
}

export const asyncError = (error: unknown) => {
  return defer(() => Promise.reject(error))
}

export const mockObservable = <T>(data: T) => {
  return of(data)
}

export const mockPromise = <T>(data: T) => {
  return Promise.resolve(data)
}
