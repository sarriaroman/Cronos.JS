Cronos.JS
=========

## What is Cronos.JS
> Cronos.JS is just another application micro-framework but entire built on the top of Vanilla JS.

### Current support
- All desktop browsers ( And... no... IE 6, 7, 8, 9 are not browsers )
- Chrome Packaged
- Mobile browsers
- Cordova

## Getting Started

## Install Node.JS and Gulp.JS

### Node.JS
```
http://nodejs.org/
```

### Gulp.JS
```
[sudo ]npm install -g gulp
```

## How to work with Cronos.JS

### Views
> Inside this folder you will find the index.html and a templates folder

### JS
> Work with your code inside the JS Folder

#### App
> Your application code.  
> The package.json will manage the import of each library into the code.

#### Libs
> Put your external libraries here.  
> The package.json will manage the import of each library into the code.

### Core
> Here you will find the core of Cronos.JS, you can add your own module. Be care of add it into package.json ;)

## Documentation
> You can find the Core documentation into de Docs folder

## Server and Building

### Automatic building and serving
> Just use the next command on the root when you work on your code  

```
gulp
```

### See your changes on live
> Go to the browser and open:  

```
http://localhost:1234
```

## To-Do
- Break the core into sub-modules
- Create a repository for each sub-module
- Create a "cronos" command to make the work simpler