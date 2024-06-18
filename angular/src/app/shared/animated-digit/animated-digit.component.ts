import {
  Component,
  ElementRef,
  Input,
  AfterViewInit,
  ViewChild,
  OnChanges,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-animated-digit',
  templateUrl: './animated-digit.component.html',
  styleUrls: ['./animated-digit.component.scss'],
})
export class AnimatedDigitComponent implements AfterViewInit, OnChanges {
  @Input() duration: number = 1000;
  @Input() digit: any;
  @Input() steps: number = 12;
  @Input() currencyFormat: any = '';
  @Input() currencyFormatSuffix: any = '';
  @Input() decimalPlaces: any = 4;

  @ViewChild('animatedDigit') animatedDigit: ElementRef;

  animateCount() {
    if (typeof this.digit === 'number') {
      this.counterFunc(
        this.digit,
        this.duration,
        this.animatedDigit,
        this.currencyFormat,
        this.currencyFormatSuffix,
      );
    }
  }

  counterFunc(
    endValue,
    durationMs,
    element,
    currency = '',
    currencySuffix = '',
    decimalPlaces = this.decimalPlaces
  ) {
    const stepCount = Math.abs(durationMs / this.steps);
    const valueIncrement = (endValue - 0) / stepCount;
    const sinValueIncrement = Math.PI / stepCount;

    let currentValue = 0;
    let currentSinValue = 0;

    function step() {
      currentSinValue += sinValueIncrement;
      currentValue += valueIncrement * Math.sin(currentSinValue) ** 2 * 2;

      if (element?.nativeElement) {
        if (currentSinValue < Math.PI) {
          let value = Math.abs(currentValue).toFixed(decimalPlaces);
          setTextContent(value);
          window.requestAnimationFrame(step);
        } else {
          let value = Math.abs(endValue).toFixed(decimalPlaces);
          setTextContent(value);
        }
      }
    }

    function setTextContent(value) {
      let amount = parseFloat(value).toLocaleString(undefined, {
        minimumFractionDigits: 2,
      });

      element.nativeElement.textContent = `${currency}${amount} ${currencySuffix}`;
    }
    step();
  }

  ngAfterViewInit() {
    if (this.digit) {
      this.animateCount();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['digit']) {
      this.animateCount();
    }
  }
}
