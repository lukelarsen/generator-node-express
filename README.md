# generator-node-express

A generator for [Yeoman](http://yeoman.io).


## Getting Started

### What is Yeoman?

![](http://i.imgur.com/JHaAlBJ.png)

From the default Yeoman Generator:

>Basically, he wears a top hat, lives in your computer, and waits for you to tell him what kind of application you wish to create.

>Not every new computer comes with a Yeoman pre-installed. He lives in the [npm](https://npmjs.org) package repository. You only have to ask for him once, then he packs up and moves into your hard drive. *Make sure you clean up, he likes new and shiny things.*


To install Yeoman you will need to have npm (node packaged modules) installed. It comes with <a href="http://nodejs.org/" target="_blank">Node</a>. You can install Node by using the downloader or through <a href="http://brew.sh/" target="_blank">Brew</a>. I like Brew. If you use Brew you'll need to add this to your .bash_profile. 

```
homebrew=/usr/local/share/npm/bin
```

Here is a post on <a href="http://www.lukelarsen.com/post/02-installing-node" target="_blank">installing Node</a> if you need it.

Once Node is installed you'll have access to npm so you can use this to install Yeoman.


```
$ npm install -g yo
```

The -g means that you are installing Yeoman globally. If you wish to uninstall Yeoman you can do so with this command.

```
$ npm uninstall -g yo
```

### What's included in this generator

This generator uses some tools I find useful. Those include:

<ul>
    <li><a href="http://expressjs.com/" target="_blank">Express.js</a></li>
    <li><a href="https://github.com/ericf/express3-handlebars" target="_blank">Express3-Handlebars</a> for templating</li>
    <li><a href="http://sass-lang.com/" target="_blank">Sass</a> for styling</li>
    <li>Javascript linting</li>
    <li>It will open your project in your editor of choice</li>
    <li>It will open your project in a browser of your choice</li>
    <li>It will watch for changes to your files and recompile or restart the server if needed.</li>
    <li>Uses <a href="https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei?hl=en" target="_blank">LiveReload</a> to refresh the browser when saving</li>
    <li>It will build a production version of your app when you are ready to deploy</li>
    <li>It comes ready to deploy to <a href="http://heroku.com" target="_blank">Heroku</a></li>
</ul>

Optional tools
<ul>
    <li><a href="http://inuitcss.com/" target="_blank">Inuit.css</a> - A powerful designless Sass framework</li>
    <li><a href="http://bourbon.io/" target="_blank">Bourbon</a> - Sass mixin library</li>
    <li><a href="http://angularjs.org/" target="_blank">Angular</a></li>
    <li><a href="http://jquery.com/" target="_blank">jQuery</a></li>
</ul>

### Installing this generator

With Node and npm installed run this to install.

```
$ npm install -g generator-node-express
```


### Using this generator

With the generator installed it is time to run it. Create a directory on your computer somewhere and cd into it via the terminal. Then run:

```
$ yo node-express
```

Yeoman will ask you some questions. Answer them and it will install stuff based on your answers.

Once Yeoman is done setting up your project run this command to start working on it.

```
$ grunt workon
```

This starts the server, launches the project in your editor, opens the project in a browser, and starts watching the project for changes.

<h4>LiveReload</h4>

To enable LiveReload you'll need to install the Chrome extension.

<a href="https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei" target="_blank">Live Reload Chrome extension</a>

Once installed and the project is running just turn on the Chrome Extension.


<h4>Restarting the server</h4>

When you edit files that need the server to restart for you to see the changes, most of the time Grunt will just restart it for you. There are times when it gets stuck though. If this happens you can run this command to start it back up without reopening the project in your editor and browser.

```
$ grunt restart
```

<h4>Generate a production version of your app</h4>

Once your app is ready for production run this to generate a production build of your project.

```
$ grunt build
```

To test to see if the app is using the production version of the app you can shut down the server and start it again in production mode.

```
$ NODE_ENV=production node app.js
```

If it all works you are ready to deploy to Heroku. The Procfile at the root directory is for Heroku. Without it Heroku will choke. To deploy to Heroku you will need a <a href="http://heroku.com" target="_blank">Heorku account</a> and the <a href="https://toolbelt.heroku.com/" target="_blank">Heroku Toolbelt</a> installed.

Once that is setup use Git to commit and then Heroku to create and deploy.

```
$ git init
$ git add .
$ git commit -m 'init'
```

Create the app
```
heroku create
```

Deploy your code
```
git push heroku master
```

To ensure that Heroku is setup to use your production settings you'll need to run this:

```
$ heroku config:set NODE_ENV=production
```

Open the project
```
heroku open
```

### Things to do

<ul>
    <li>Add test driven development.</li>
</ul>
