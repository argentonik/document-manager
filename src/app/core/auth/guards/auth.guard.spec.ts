import { TestBed } from '@angular/core/testing';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';

import { authGuard } from './auth.guard';
import { AuthService } from '../auth.service';
import { provideExperimentalZonelessChangeDetection } from '@angular/core';

describe('authGuard', () => {
  let authService: jasmine.SpyObj<AuthService>;
  let router: jasmine.SpyObj<Router>;
  let activatedRouteSnapshot: jasmine.SpyObj<ActivatedRouteSnapshot>;
  let routerStateSnapshot: jasmine.SpyObj<RouterStateSnapshot>;

  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => authGuard(...guardParameters));

  beforeEach(() => {
    const spyAuthService = jasmine.createSpyObj('AuthService', [
      'isAuthenticated',
    ]);
    const spyRouter = jasmine.createSpyObj('Router', ['createUrlTree']);
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
        {
          provide: AuthService,
          useValue: spyAuthService,
        },
        {
          provide: Router,
          useValue: spyRouter,
        },
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
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    activatedRouteSnapshot = TestBed.inject(
      ActivatedRouteSnapshot,
    ) as jasmine.SpyObj<ActivatedRouteSnapshot>;
    routerStateSnapshot = TestBed.inject(
      RouterStateSnapshot,
    ) as jasmine.SpyObj<RouterStateSnapshot>;
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });

  it('should return true if the user is authenticated', () => {
    authService.isAuthenticated.and.returnValue(true);
    expect(
      executeGuard(activatedRouteSnapshot, routerStateSnapshot),
    ).toBeTrue();
  });

  it('should return UrlTree if the user is not authenticated', () => {
    const urlTree = new UrlTree();
    authService.isAuthenticated.and.returnValue(false);
    router.createUrlTree.and.returnValue(urlTree);
    expect(executeGuard(activatedRouteSnapshot, routerStateSnapshot)).toBe(
      urlTree,
    );
  });
});
