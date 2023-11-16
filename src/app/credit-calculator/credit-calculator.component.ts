import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreditOffer, Either, Function, Functor, Option, Supplier, YearResult, YearResultCounter, isNone, isSome, none, some } from './types';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { constructRecursivator, createSupplier, curry } from '../../util/Functions';
import { TableComponent } from '../table/table.component';

const add = (a: number, b: number) => a + b
const multiply = (a: number, b: number) => a * b
const divide = (a: number, b: number) => a / b
const substract = (a: number, b: number) => a - b

const getYearResult: YearResultCounter = (
    feeSupplier: Supplier<number>,
    countInterest: Function<number, number>,
    remaining: number,
    year: number,
  ): YearResult => ({
    year,
    remainingAtYearStart: remaining,
    interest: countInterest(remaining),
    loanRate: add(countInterest(remaining), feeSupplier()),
    remainingAtYearsEnd: remaining - feeSupplier(),
    creditAtYearsEnd: feeSupplier()
})


const getResult = (totalPrice: number, years: number, interestRate: number) => {
  const monthlyFeeSupplier = createSupplier(divide)(totalPrice)(years)
  const factorSupplier = createSupplier(divide)(interestRate)(100)
  const interestCalculator = curry(multiply, factorSupplier())
  const recursivator = constructRecursivator(
    (x: number) => x == 0,
    (a: number) => a - monthlyFeeSupplier(),
    (b: number) => b - 1,
    (c: YearResult[], a: number, b: number) => c.concat([getYearResult(monthlyFeeSupplier, interestCalculator, a, b)])
  )
  return recursivator(totalPrice, years, [])
}

@Component({
  selector: 'app-credit-calculator',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TableComponent],
  templateUrl: './credit-calculator.component.html',
  styleUrl: './credit-calculator.component.scss'
})
export class CreditCalculatorComponent {

  calculation: YearResult[] = []

  headers: string[] = ['year', 'remaining start', 'interest to pay', 'credit', 'total repayment', 'remaining end']

  creditForm = new FormGroup({
    years: new FormControl(''),
    price: new FormControl(''),
    interestRate: new FormControl('')
  })

  onSubmit() {
    const credit: CreditOffer = {
      years: parseFloat(this.creditForm.value.years ?? ""),
      price: parseFloat(this.creditForm.value.price ?? ""),
      interestRate: parseFloat(this.creditForm.value.interestRate ?? "")
    }
    console.log(credit)
    this.calculateCredit(credit)
  }

  calculateCredit(credit: CreditOffer) {
    this.calculation = getResult(credit.price, credit.years, credit.interestRate)
    console.log(this.calculation)
  }
}


