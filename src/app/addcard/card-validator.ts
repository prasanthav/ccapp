import { FormControl, AbstractControl } from '@angular/forms';
import { AbstractClassPart } from '@angular/compiler/src/output/output_ast';

export function cardValidator(control: AbstractControl) {
    var isValid = true;
    if (control && (control.value !== null || control.value !== undefined)) {
        const ccNumber = control.value + '';
        if (!ccNumber.length) {
            return false;
        }
        var length = ccNumber.length;
        var evenSum = 0, oddSum = 0, i;
        for (i = length - 1; i >= 0; i--) {
            var value = parseInt(ccNumber[i]);
            if (i % 2 == 0) {
                value = value * 2;
                evenSum += value > 9 ? value - 9 : value;
            } else {
                oddSum += value;
            }
        }
        var isValid = ((evenSum + oddSum) % 10) == 0;
        if (!isValid) {
            return {
                isError: true
            }
        }
    }
    return null;
}