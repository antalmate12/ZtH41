import { Injectable } from '@angular/core';
import { Overlay, OverlayConfig } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';

import { LoginCompComponent } from '../login-comp/login-comp.component'
import { OverlayReference } from '../login-comp/overlay-ref'


interface FilePreviewDialogConfig {
  hasBackdrop?: boolean;
}

const DEFAULT_CONFIG: FilePreviewDialogConfig = {
  hasBackdrop: true,
}


@Injectable()
export class OverlayService {

  constructor(
    //private usersService: UsersService,
    private overlay: Overlay) { 

    }

  dialogRef;

  //OPEN LOGIN LAYOUT
  //----------------
  open(config: FilePreviewDialogConfig = {}) {
    // Override default configuration
    const dialogConfig = { ...DEFAULT_CONFIG, ...config };

    // Returns an OverlayRef (which is a PortalHost)
    const overlayRef = this.createOverlay(dialogConfig);

    // Instantiate remote control
    this.dialogRef = new OverlayReference(overlayRef);

    // Create ComponentPortal that can be attached to a PortalHost
    const filePreviewPortal = new ComponentPortal(LoginCompComponent);

    // Attach ComponentPortal to PortalHost
    overlayRef.attach(filePreviewPortal);

    // Subscribe to a stream that emits when the backdrop was clicked
    overlayRef.backdropClick().subscribe(_ => this.dialogRef.close());
    
    //console.log("done");
    return this.dialogRef;

  }
  startclose() {
    this.dialogRef.close();
  }
  //----------------
  private createOverlay(config: FilePreviewDialogConfig) {
    const overlayConfig = this.getOverlayConfig(config);
    return this.overlay.create(overlayConfig);
  }

  private getOverlayConfig(config: FilePreviewDialogConfig): OverlayConfig {
    const positionStrategy = this.overlay.position()
      .global()
      .centerHorizontally()
      .centerVertically();

    const overlayConfig = new OverlayConfig({
      hasBackdrop: config.hasBackdrop,
      positionStrategy
    });

    return overlayConfig;
  }
  
}