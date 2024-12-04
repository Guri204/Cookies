'use strict';

class CookieConsent {
  constructor() {
      this.overlay = document.getElementById('overlay');
      this.cookieDialog = document.getElementById('cookieDialog');
      this.settingsDialog = document.getElementById('settingsDialog');

      this.browserToggle = document.getElementById('browserToggle');
      this.screenToggle = document.getElementById('screenToggle');
      this.osToggle = document.getElementById('osToggle');

      this.init();
  }

  init() {
      if (!this.getCookie("userConsent")) {
          console.log("No cookies found.");
          setTimeout(() => {
              this.showDialog(this.cookieDialog);
          }, 500);
      } else {
          console.log("Cookie found:", this.getCookie("userConsent"));
      }

      document.getElementById('acceptAll').onclick = () => this.acceptAllCookies();
      document.getElementById('openSettings').onclick = () => this.showDialog(this.settingsDialog);
      document.getElementById('saveSettings').onclick = () => this.saveSettings();
  }

  getCookie(name) {
      const cookies = document.cookie.split("; ");
      for (let cookie of cookies) {
          if (cookie.startsWith(name + "=")) {
              return cookie.split("=")[1];
          }
      }
      return null;
  }

  setCookie(name, value, seconds) {
      const date = new Date();
      date.setTime(date.getTime() + (seconds * 1000));
      document.cookie = `${name}=${value}; expires=${date.toUTCString()}; path=/`;
      console.log(`Set cookie: ${name}=${value}`);
  }

  getBrowser() {
      const userAgent = navigator.userAgent;
      if (userAgent.includes("Chrome")) return "Chrome";
      if (userAgent.includes("Firefox")) return "Firefox";
      if (userAgent.includes("Safari")) return "Safari";
      if (userAgent.includes("Edge")) return "Edge";
      return "Unknown Browser";
  }

  getOS() {
      const platform = navigator.platform.toLowerCase();
      if (platform.includes("win")) return "Windows";
      if (platform.includes("mac")) return "MacOS";
      if (platform.includes("linux")) return "Linux";
      if (platform.includes("iphone") || platform.includes("ipad")) return "iOS";
      if (platform.includes("android")) return "Android";
      return "Unknown OS";
  }

  getScreenDimensions() {
      return `${window.screen.width} x ${window.screen.height}`;
  }

  showDialog(dialog) {
      this.overlay.classList.add('active');
      dialog.classList.add('active');
  }

  acceptAllCookies() {
      this.setCookie("userConsent", "accepted", 15);
      this.hideDialogs();
  }

  hideDialogs() {
      this.overlay.classList.remove('active');
      this.cookieDialog.classList.remove('active');
      this.settingsDialog.classList.remove('active');
  }

  saveSettings() {
      if (this.browserToggle.checked) {
          this.setCookie("browserInfo", this.getBrowser(), 15);
      } else {
          document.cookie = "browserInfo=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
      }

      if (this.screenToggle.checked) {
          this.setCookie("screenInfo", this.getScreenDimensions(), 15);
      } else {
          document.cookie = "screenInfo=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
      }

      if (this.osToggle.checked) {
          this.setCookie("osInfo", this.getOS(), 15);
      } else {
          document.cookie = "osInfo=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
      }

      this.hideDialogs();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new CookieConsent();
});
