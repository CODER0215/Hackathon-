/**
 * SentinelAI - Client-Side Privacy-Preserving QR Scanner
 * Decodes QR code images completely on-device using Canvas and jsQR.
 * Never uploads image data to external servers.
 */

import jsQR from 'jsqr';

export interface QRScanResult {
  success: boolean;
  data?: string;
  error?: string;
}

export class QRScannerService {
  /**
   * Decodes a QR code from an Image file or Blob
   */
  public static async decodeQRFromFile(file: File): Promise<QRScanResult> {
    return new Promise((resolve) => {
      const reader = new FileReader();

      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          try {
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d', { willReadFrequently: true });

            if (!context) {
              resolve({ success: false, error: 'Failed to initialize canvas graphics context' });
              return;
            }

            canvas.width = img.naturalWidth || img.width;
            canvas.height = img.naturalHeight || img.height;

            context.drawImage(img, 0, 0, canvas.width, canvas.height);
            const imageData = context.getImageData(0, 0, canvas.width, canvas.height);

            const code = jsQR(imageData.data, imageData.width, imageData.height, {
              inversionAttempts: 'attemptBoth',
            });

            if (code && code.data) {
              resolve({ success: true, data: code.data });
            } else {
              resolve({
                success: false,
                error: 'No valid QR code pattern detected in the uploaded image. Please try a clearer image.',
              });
            }
          } catch (err: unknown) {
            const errorMsg = err instanceof Error ? err.message : 'Unknown canvas decoding error';
            resolve({ success: false, error: errorMsg });
          }
        };

        img.onerror = () => {
          resolve({ success: false, error: 'Failed to load image format' });
        };

        img.src = e.target?.result as string;
      };

      reader.onerror = () => {
        resolve({ success: false, error: 'Failed to read image file' });
      };

      reader.readAsDataURL(file);
    });
  }

  /**
   * Generates a sample demo malicious QR canvas dataURL for hackathon testing
   */
  public static generateDemoQRUrl(targetUrl: string): string {
    // Return SVG data URI or simple dynamic QR rendering indicator
    return targetUrl;
  }
}
