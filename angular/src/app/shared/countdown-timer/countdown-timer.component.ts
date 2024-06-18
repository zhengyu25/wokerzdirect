import {
  Component,
  OnInit,
  OnDestroy,
  Input,
  Output,
  EventEmitter,
  SimpleChanges,
  OnChanges,
} from '@angular/core';
import { DataService } from 'app/services';
import moment from 'moment';
import { Subscription, interval } from 'rxjs';

@Component({
  selector: 'app-countdown-timer',
  templateUrl: './countdown-timer.component.html',
  styleUrls: ['./countdown-timer.component.scss'],
})
export class CountdownTimerComponent implements OnInit, OnChanges, OnDestroy {
  @Input() title = null;
  @Input() dDay = null;
  @Input() shakeAlertIn = 0;
  @Input() unsubscribeNow: boolean = false;
  @Output() timesUp = new EventEmitter<boolean>();

  private subscription: Subscription;

  public dateNow = new Date();

  milliSecondsInASecond = 1000;
  hoursInADay = 24;
  minutesInAnHour = 60;
  SecondsInAMinute = 60;

  public timeDifference: any;
  public secondsToDday: any;
  public minutesToDday: any;
  public hoursToDday: any;
  public daysToDday: any;

  page = {
    en: {
      title: 'In',
      days: 'Days',
      hours: 'Hours',
      mins: 'Mins',
      sec: 'Sec',
    },
    zh_CN: {
      title: '倒数',
      days: '天',
      hours: '小时',
      mins: '分钟',
      sec: '秒',
    },
  };

  lang: any = this.page[this._dataService.language];
  lang$: Subscription = new Subscription();

  private getTimeDifference() {
    this.timeDifference = this.dDay.getTime() - new Date().getTime();

    if (this.timeDifference > 0) {
      this.timesUp.emit(false);
      this.allocateTimeUnits(this.timeDifference);
    } else {
      this.secondsToDday = 0;
      this.minutesToDday = 0;
      this.hoursToDday = 0;
      this.daysToDday = 0;
      this.timesUp.emit(true);
      this.subscription.unsubscribe();
    }
  }

  private allocateTimeUnits(timeDifference) {
    this.secondsToDday = Math.floor(
      (timeDifference / this.milliSecondsInASecond) % this.SecondsInAMinute
    );
    this.minutesToDday = Math.floor(
      (timeDifference / (this.milliSecondsInASecond * this.minutesInAnHour)) %
        this.SecondsInAMinute
    );
    this.hoursToDday = Math.floor(
      (timeDifference /
        (this.milliSecondsInASecond *
          this.minutesInAnHour *
          this.SecondsInAMinute)) %
        this.hoursInADay
    );
    this.daysToDday = Math.floor(
      timeDifference /
        (this.milliSecondsInASecond *
          this.minutesInAnHour *
          this.SecondsInAMinute *
          this.hoursInADay)
    );
  }

  constructor(private _dataService: DataService) {}

  ngOnInit() {
    this.lang$ = this._dataService.language$.subscribe((lang) => {
      this.lang = this.page[lang];
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes?.unsubscribeNow?.currentValue) this.ngOnDestroy();
    if (changes?.dDay?.currentValue) {
      if (typeof this.dDay === 'string') this.dDay = new Date(this.dDay);

      this.subscription = interval(1000).subscribe((x) => {
        this.getTimeDifference();
      });
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
