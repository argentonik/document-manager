import { IsGrantedDirective } from './is-granted.directive';
import { TestBed } from '@angular/core/testing';
import { AuthService } from '../auth.service';
import {
  input,
  InputSignal,
  provideExperimentalZonelessChangeDetection,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { UserRole } from '../models/user-role.enum';

describe('IsGrantedDirective', () => {
  let directive: IsGrantedDirective;
  let authService: jasmine.SpyObj<AuthService>;
  let viewContainerRef: jasmine.SpyObj<ViewContainerRef>;
  let templateRef: jasmine.SpyObj<TemplateRef<any>>;

  beforeEach(() => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['user']);
    const viewContainerSpy = jasmine.createSpyObj('ViewContainerRef', [
      'clear',
      'createEmbeddedView',
    ]);
    const templateRefSpy = jasmine.createSpyObj('TemplateRef', ['']);

    TestBed.configureTestingModule({
      providers: [
        provideExperimentalZonelessChangeDetection(),
        { provide: ViewContainerRef, useValue: viewContainerSpy },
        { provide: TemplateRef, useValue: templateRefSpy },
        { provide: AuthService, useValue: authServiceSpy },
        {
          provide: 'CONFIG',
          useValue: {
            apiUrl: 'http://localhost:3000',
          },
        },
      ],
    });

    directive = TestBed.runInInjectionContext(() => {
      const directive = new IsGrantedDirective();
      directive.isGranted = input(UserRole.REVIEWER) as InputSignal<
        UserRole | undefined
      >;
      return directive;
    });

    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    viewContainerRef = TestBed.inject(
      ViewContainerRef,
    ) as jasmine.SpyObj<ViewContainerRef>;
    templateRef = TestBed.inject(TemplateRef) as jasmine.SpyObj<
      TemplateRef<any>
    >;
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });

  it('should display the template if the user role matches', () => {
    authService.user.and.returnValue({ role: UserRole.REVIEWER } as any);

    directive.ngOnInit();

    expect(viewContainerRef.clear).toHaveBeenCalled();
    expect(viewContainerRef.createEmbeddedView).toHaveBeenCalledWith(
      templateRef,
    );
  });

  it('should not display the template if the user role does not match', () => {
    authService.user.and.returnValue({ role: UserRole.USER } as any);

    directive.ngOnInit();

    expect(viewContainerRef.clear).not.toHaveBeenCalled();
    expect(viewContainerRef.createEmbeddedView).not.toHaveBeenCalled();
  });

  it('should not display the template if the user is null', () => {
    authService.user.and.returnValue(null);

    directive.ngOnInit();

    expect(viewContainerRef.clear).not.toHaveBeenCalled();
    expect(viewContainerRef.createEmbeddedView).not.toHaveBeenCalled();
  });
});
