import { TestBed } from '@angular/core/testing';

import { RouteStateService } from './route-state.service';
import { provideExperimentalZonelessChangeDetection } from '@angular/core';
import { Router } from '@angular/router';
import { of } from 'rxjs';

describe('RouteStateService', () => {
  let service: RouteStateService;
  let router: jasmine.SpyObj<Router>;

  beforeEach(() => {
    const routerSpy = jasmine.createSpyObj('Router', [], {
      events: of([]),
    });

    TestBed.configureTestingModule({
      providers: [
        provideExperimentalZonelessChangeDetection(),
        {
          provide: Router,
          useValue: routerSpy,
        },
      ],
    });
    service = TestBed.inject(RouteStateService);
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
