import { inject, InjectionToken } from '@angular/core';
import { AuthService } from '../../../../core/auth/auth.service';
import { UserRole } from '../../../../core/auth/models/user-role.enum';
import { DocumentStatus } from '../../store/document';

export const DOCUMENTS_COLUMNS = new InjectionToken(
  'List of columns for documents table',
  {
    factory: () => {
      const authService = inject(AuthService);

      if (authService.user()?.role === UserRole.USER) {
        return ['name', 'status', 'updatedAt', 'delete', 'view'];
      } else if (authService.user()?.role === UserRole.REVIEWER) {
        return ['name', 'creator', 'review', 'updatedAt', 'view'];
      } else {
        return [];
      }
    },
  },
);

export const DOCUMENTS_USER_STATUSES = new InjectionToken(
  'List of statuses for user',
  {
    factory: () => {
      return [DocumentStatus.DRAFT, DocumentStatus.REVOKE];
    },
  },
);

export const DOCUMENTS_REVIEWER_STATUSES = new InjectionToken(
  'List of statuses for reviewer',
  {
    factory: () => {
      return [
        DocumentStatus.UNDER_REVIEW,
        DocumentStatus.APPROVED,
        DocumentStatus.DECLINED,
      ];
    },
  },
);

export const DOCUMENTS_CAN_BE_REVIEWED_STATUSES = new InjectionToken(
  'List of statuses for reviewer',
  {
    factory: () => {
      return [DocumentStatus.READY_FOR_REVIEW, DocumentStatus.UNDER_REVIEW];
    },
  },
);
