import { TestBed } from '@angular/core/testing';
import {
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterStateSnapshot,
} from '@angular/router';

import { userResolver } from './user.resolver';
import { provideExperimentalZonelessChangeDetection } from '@angular/core';
import { AuthService } from '../auth.service';
import { Observable, of } from 'rxjs';
import { User } from '../models/user.interface';
import { UserRole } from '../models/user-role.enum';

describe('userResolver', () => {
  let authService: jasmine.SpyObj<AuthService>;
  let activatedRouteSnapshot: jasmine.SpyObj<ActivatedRouteSnapshot>;
  let routerStateSnapshot: jasmine.SpyObj<RouterStateSnapshot>;

  const executeResolver: ResolveFn<boolean> = (...resolverParameters) =>
    TestBed.runInInjectionContext(
      () => userResolver(...resolverParameters) as any,
    );

  beforeEach(() => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', [
      'getCurrentUser',
    ]);
    const spyActivatedRouteSnapshot = jasmine.createSpyObj(
      'ActivatedRouteSnapshot',
      ['url'],
    );
    const spyRouterStateSnapshot = jasmine.createSpyObj('RouterStateSnapshot', [
      'url',
    ]);

    TestBed.configureTestingModule({
      providers: [
        provideExperimentalZonelessChangeDetection(),
        { provide: AuthService, useValue: authServiceSpy },
        {
          provide: ActivatedRouteSnapshot,
          useValue: spyActivatedRouteSnapshot,
        },
        {
          provide: RouterStateSnapshot,
          useValue: spyRouterStateSnapshot,
        },
      ],
    });

    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    activatedRouteSnapshot = TestBed.inject(
      ActivatedRouteSnapshot,
    ) as jasmine.SpyObj<ActivatedRouteSnapshot>;
    routerStateSnapshot = TestBed.inject(
      RouterStateSnapshot,
    ) as jasmine.SpyObj<RouterStateSnapshot>;
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });

  it('should return the current user when authenticated', () => {
    const user: User = {
      id: '1',
      fullName: 'John Doe',
      role: UserRole.USER,
      email: 'email',
    };
    authService.getCurrentUser.and.returnValue(of(user));

    const result = executeResolver(activatedRouteSnapshot, routerStateSnapshot);

    (result as unknown as Observable<User>).subscribe((resolvedUser) => {
      expect(resolvedUser).toEqual(user);
    });
  });
});
