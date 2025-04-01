import { InjectionToken } from '@angular/core';
import { Config } from './config.interface';

export const CONFIG = new InjectionToken<Config>('Application Configuration');
