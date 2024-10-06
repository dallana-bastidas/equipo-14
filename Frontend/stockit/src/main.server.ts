import { enableProdMode, getPlatform, destroyPlatform } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { config } from './app/app.config.server';

if (config.production) {
    enableProdMode();
}

const platform = getPlatform();
if (platform) {
    destroyPlatform();
}

bootstrapApplication(AppComponent, config).catch(err => console.error(err));

export default bootstrapApplication;
