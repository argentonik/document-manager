import { inject, InjectionToken } from '@angular/core';
import { AuthService } from '../../../../core/auth/auth.service';
import { UserRole } from '../../../../core/auth/models/user-role.enum';
import { DocumentStatus } from '../../store/document';

export const DOCUMENTS_COLUMNS = new InjectionToken<string[]>(
  'List of columns for documents table',
);

export const documentColumnsFactory = () => {
  const authService = inject(AuthService);

  if (authService.user()?.role === UserRole.USER) {
    return ['name', 'status', 'updatedAt', 'delete', 'view'];
  } else if (authService.user()?.role === UserRole.REVIEWER) {
    return ['name', 'creator', 'review', 'updatedAt', 'view'];
  } else {
    return [];
  }
};

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
  'List of statuses from which document can be reviewed',
  {
    factory: () => {
      return [DocumentStatus.READY_FOR_REVIEW, DocumentStatus.UNDER_REVIEW];
    },
  },
);

export const DOCUMENTS_CAN_BE_REVOKED_STATUSES = new InjectionToken(
  'List of statuses from which document can be revoked',
  {
    factory: () => {
      return [DocumentStatus.READY_FOR_REVIEW];
    },
  },
);

export const DOCUMENTS_CAN_BE_SENT_FOR_REVIEW_STATUSES = new InjectionToken(
  'List of statuses from which document can be sent for review',
  {
    factory: () => {
      return [DocumentStatus.DRAFT];
    },
  },
);
