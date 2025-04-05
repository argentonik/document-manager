import { TestBed } from '@angular/core/testing';

import { RouteStateService } from './route-state.service';
import { provideExperimentalZonelessChangeDetection } from '@angular/core';
import {
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
  RouterEvent,
} from '@angular/router';
import { ReplaySubject } from 'rxjs';

describe('RouteStateService', () => {
  let service: RouteStateService;
  let router: jasmine.SpyObj<Router>;
  const events = new ReplaySubject<RouterEvent>();

  beforeEach(() => {
    const routerMock = {
      navigate: jasmine.createSpy('navigate'),
      events: events.asObservable(),
      url: 'url',
    };
    TestBed.configureTestingModule({
      providers: [
        provideExperimentalZonelessChangeDetection(),
        {
          provide: Router,
          useValue: routerMock,
        },
      ],
    });
    service = TestBed.inject(RouteStateService);
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set loading to true on NavigationStart event', () => {
    events.next(new NavigationStart(1, ''));
    service = TestBed.inject(RouteStateService);

    expect(service.loading()).toBeTrue();
  });

  it('should set loading to false on NavigationEnd event', () => {
    events.next(new NavigationEnd(1, '', ''));
    service = TestBed.inject(RouteStateService);

    expect(service.loading()).toBeFalse();
  });

  it('should set loading to false on NavigationCancel event', () => {
    events.next(new NavigationCancel(1, '', ''));
    service = TestBed.inject(RouteStateService);

    expect(service.loading()).toBeFalse();
  });

  it('should set loading to false on NavigationError event', () => {
    events.next(new NavigationError(1, '', new Error('error')));
    service = TestBed.inject(RouteStateService);

    expect(service.loading()).toBeFalse();
  });
});
