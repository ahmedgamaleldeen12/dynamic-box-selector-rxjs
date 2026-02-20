import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { BoxSelector } from './app/features/box-selector/box-selector';

// Bootstraps the BoxSelector feature directly as the root component.
// This allows us to load and develop this feature in isolation without a parent App component or routing.
bootstrapApplication(BoxSelector, appConfig)
  .catch((err) => console.error(err));
