'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');


var NodeExpressGenerator = module.exports = function NodeExpressGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  this.on('end', function () {
    this.installDependencies({ skipInstall: options['skip-install'] });
  });

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(NodeExpressGenerator, yeoman.generators.Base);

NodeExpressGenerator.prototype.askFor = function askFor() {
  var cb = this.async();

  // have Yeoman greet the user.
  console.log(this.yeoman);

  var prompts = [
    {
      name: 'projectName',
      message: 'What would you like to call your project?'
    },
    {
      name: 'features',
      type: 'checkbox',
      message: 'Would you like to use any of these?\n    Use the arrow keys to move and space to check/uncheck.',
      choices: [{
        name: 'Inuit.css',
        value: 'useInuit',
        checked: true
      },
      {
        name: 'Bourbon',
        value: 'useBourbon',
        checked: true
      },
      {
        name: 'Angular',
        value: 'useAngular',
        checked: true
      },
      {
        name: 'jQuery',
        value: 'useJQuery',
        checked: false
      }]
    },
    {
      name: 'editors',
      type: 'checkbox',
      message: 'Which editor will you be developing in?\n    Please select only one.\n    (We use this to launch the project in your editor.)',
      choices: [{
        name: 'Sublime Text 2',
        value: 'useSublimeText2',
        checked: true
      },
      {
        name: 'WebStorm',
        value: 'useWebStorm',
        checked: false
      },
      {
        name: 'Coda2',
        value: 'useCoda2',
        checked: false
      },
      {
        name: 'Chocolat',
        value: 'useChocolat',
        checked: false
      },
      {
        name: 'TextMate',
        value: 'useTextMate',
        checked: false
      },
      {
        name: 'None',
        value: 'useNone',
        checked: false
      }]
    },
    {
      name: 'browsers',
      type: 'checkbox',
      message: 'Which browser do you primarily use in developement?\n    Please select only one.\n    (We use this to launch your project in your browser.)',
      choices: [{
        name: 'Google Chrome',
        value: 'useGoogleChrome',
        checked: true
      },
      {
        name: 'Firefox',
        value: 'useFirefox',
        checked: false
      },
      {
        name: 'Safari',
        value: 'useSafari',
        checked: false
      },
      {
        name: 'Opera',
        value: 'useOpera',
        checked: false
      }]
    },
    {
      name: 'heroku',
      type: 'confirm',
      message: 'Will you be deploying to Heroku?',
      default: true
    } 
  ];

  this.prompt(prompts, function (answers) {
  // this.prompt(prompts, function (answers) {

    this.projectName = answers.projectName;

    // features
    var features = answers.features;
    function hasFeature(feat) { return features.indexOf(feat) !== -1; }
    
    this.useInuit = hasFeature('useInuit');
    this.useBourbon = hasFeature('useBourbon');
    this.useAngular = hasFeature('useAngular');
    this.useJQuery = hasFeature('useJQuery');

    // editors
    var editors = answers.editors;
    function hasEditor(edit) { return editors.indexOf(edit) !== -1; }

    this.useSublimeText2 = hasEditor('useSublimeText2');
    this.useWebStorm = hasEditor('useWebStorm');
    this.useCoda2 = hasEditor('useCoda2');
    this.useChocolat = hasEditor('useChocolat');
    this.useTextMate = hasEditor('useTextMate');
    this.useNone = hasEditor('useNone');

    // browsers
    var browsers = answers.browsers;
    function hasBrowser(browse) { return browsers.indexOf(browse) !== -1; }

    this.useGoogleChrome = hasBrowser('useGoogleChrome');
    this.useFirefox = hasBrowser('useFirefox');
    this.useSafari = hasBrowser('useSafari');
    this.useOpera = hasBrowser('useOpera');

    // heroku
    this.heroku = answers.heroku;

    cb();
  }.bind(this));
};


NodeExpressGenerator.prototype.gruntfile = function gruntfile() {
  this.copy('Gruntfile.js', 'Gruntfile.js');
};

NodeExpressGenerator.prototype.packageJSON = function packageJSON() {
  this.copy('_package.json', 'package.json');
};

NodeExpressGenerator.prototype.git = function git() {
  this.copy('gitignore', '.gitignore');
};

NodeExpressGenerator.prototype.bower = function bower() {
  this.copy('bowerrc', '.bowerrc');
  this.copy('_bower.json', 'bower.json');
};

NodeExpressGenerator.prototype.jshint = function jshint() {
  this.copy('jshintrc', '.jshintrc');
};

NodeExpressGenerator.prototype.editorConfig = function editorConfig() {
  this.copy('editorconfig', '.editorconfig');
};

NodeExpressGenerator.prototype.views = function views() {
  this.mkdir('views');
  this.mkdir('views/layouts');
  this.mkdir('views/partials');
  this.copy('views/index.handlebars', 'views/index.handlebars');
  this.copy('views/layouts/main.handlebars', 'views/layouts/main.handlebars');
};

NodeExpressGenerator.prototype.assets = function assets() {
  this.mkdir('assets');
  this.mkdir('assets/font');
  this.mkdir('assets/images');
  this.mkdir('assets/scripts');
  this.mkdir('assets/styles');
  this.mkdir('assets/styles/sass');
  this.mkdir('assets/styles/sass/ui');
  
  this.copy('styles/sass/_mixins.scss', 'assets/styles/sass/_mixins.scss');
  this.copy('styles/sass/_vars.scss', 'assets/styles/sass/_vars.scss');

  this.copy('styles/sass/ui/_buttons.scss', 'assets/styles/sass/ui/_buttons.scss');
  this.copy('styles/sass/ui/_color.scss', 'assets/styles/sass/ui/_color.scss');
  this.copy('styles/sass/ui/_footer.scss', 'assets/styles/sass/ui/_footer.scss');
  this.copy('styles/sass/ui/_forms.scss', 'assets/styles/sass/ui/_forms.scss');
  this.copy('styles/sass/ui/_header.scss', 'assets/styles/sass/ui/_header.scss');
  this.copy('styles/sass/ui/_helpers.scss', 'assets/styles/sass/ui/_helpers.scss');
  this.copy('styles/sass/ui/_navs.scss', 'assets/styles/sass/ui/_navs.scss');
  this.copy('styles/sass/ui/_scaffolding.scss', 'assets/styles/sass/ui/_scaffolding.scss');
  this.copy('styles/sass/ui/_typography.scss', 'assets/styles/sass/ui/_typography.scss');
  
  this.copy('styles/sass/screen.scss', 'assets/styles/sass/screen.scss');

  this.copy('favicon.ico', 'assets/favicon.ico');  
};

NodeExpressGenerator.prototype.app = function app() {
  this.copy('app.js', 'app.js');
};

NodeExpressGenerator.prototype.procfile = function procfile() {
  if (this.heroku) {
    this.copy('Procfile', 'Procfile');
  }
};

NodeExpressGenerator.prototype.readme = function readme() {
  this.copy('README.md', 'README.md');
};