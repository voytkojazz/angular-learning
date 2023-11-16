import { Function, Predicate } from "../app/credit-calculator/types"

export declare function add<A>(a: A, b: A): A;

export type Exctractor<A> = (arr: A, key: string) => (arr: A) => {}

function* range(
    stopPredicate: (a: number) => boolean,
    start: number,
    addifier: (a: number) => number
): Generator {
    if (stopPredicate(start)) {
        return
    } else {
        yield start
        yield* range(stopPredicate, addifier(start), addifier)
    }
}

function createSupplier<A>(fn: (a: A, b: A) => A) {
    return (a: A) => (b: A) => () => fn(a, b)
}

function curry<A>(fn: (a: A, b: A) => A, b: A): Function<A, A> {
    return function (a: A) {
        return fn(a, b)
    }
}

const constructRecursivator = <A, B, C>(
        interruptor: Predicate<B>, 
        reduceA: (a: A) => A, 
        reduceB: (b: B) => B,
        concatinator: (c: C[], a: A, b: B) => C[]
    ): (a: A, b: B, res: C[]) => C[] => {
        const recursivator = (a: A, b: B, res: C[]): C[] => {
            if (interruptor(b)) return res
            return recursivator(reduceA(a), reduceB(b), concatinator(res, a, b))
        }
        return recursivator
}

export {range, createSupplier, curry, constructRecursivator}