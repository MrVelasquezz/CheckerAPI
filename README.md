# CheckerAPI

Was loaded with folder 'node_modules' because of error in ubuntu with puppeteer

# Instalation

```
npm i
```

```
sudo apt-get install gconf-service libasound2 libatk1.0-0 libatk-bridge2.0-0 libc6 libcairo2 libcups2 libdbus-1-3 libexpat1 libfontconfig1 libgcc1 libgconf-2-4 libgdk-pixbuf2.0-0 libglib2.0-0 libgtk-3-0 libnspr4 libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 libxcomposite1 libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 libxtst6 ca-certificates fonts-liberation libappindicator1 libnss3 lsb-release xdg-utils wget
```
# Several problems and their solution

 ## Problem №1
 =======================
 ### Error: Failed to launch the browser process puppeteer
 ### Solution: 
 I solved this problem with folowing command: 
 ```
 sudo apt-get install -y libgbm-dev
 ```
### Description
  In my case problem was with ```libgbm.so.1``` library.
### Full error code
  ```
  error while loading shared libraries: libgbm.so.1: cannot open shared object file: No such file or directory
  ```

## Problem №2
=======================
### Error: Running as root without --no-sandbox is not supported.
### Solution
 I solved this problem by adding to ```puppeteer.launch()``` argument ```args: ['--no-sandbox', '--disable-setuid-sandbox']```

### Description
  No
  
### Full error code: 
  No
  
## Warning
### In this case installation of chromium-browser is not the solution. It causes errors and code 403 in site-firewall
