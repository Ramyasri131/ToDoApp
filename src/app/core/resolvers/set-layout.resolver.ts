import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { inject } from '@angular/core';
import { PageLayoutService } from '../services/page-layout.service';
import { PageLayout } from '../enums/page-layout';

export const setLayoutResolver = (inputLayout:PageLayout): ResolveFn<void> => (route:ActivatedRouteSnapshot, state:RouterStateSnapshot) => {
  inject(PageLayoutService).setLayout(inputLayout);
};
