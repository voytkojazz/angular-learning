export type YearResult = {
    year: number,
    remainingAtYearStart: number,
    interest: number,
    creditAtYearsEnd: number,
    loanRate: number,
    remainingAtYearsEnd: number
}

export interface CreditOffer {
    interestRate: number,
    years: number,
    price: number
}

export interface Functor<A> {
    value: A;
    map: <B>(mapper: (a: A) => B) => B
}

export interface Some<A> {
    _tag: 'Some',
    value: A
}

export interface None {
    _tag: 'None'
}

export type Option<A> = Some<A> | None
export type Either<A, B> = Left<A> | Right<B>
export interface Left<A> {
    _tag: 'Left',
    left: A
}
export interface Right<A> {
    _tag: 'Right',
    right: A
}

export const isSome = <A>(o: Option<A>): o is Some<A> => o._tag === "Some"
export const isNone = <A>(o: Option<A>): o is None => o._tag === "None"
export const isRight = <A, B>(e: Either<A, B>) => e._tag === "Right"
export const isLeft = <A, B>(e: Either<A, B>) => e._tag === "Left"

export const some = <A>(some: A): Some<A> => ({_tag: "Some", value: some})
export const none = (): None => ({_tag: "None"})

export type Supplier<T> = () => T 
export type Function<I, O> = (a: I) => O
export type Predicate<A> = (a: A) => boolean
export type YearResultCounter = (fee: Supplier<number>, interestFee: Function<number, number>, remaining: number, year: number) => YearResult