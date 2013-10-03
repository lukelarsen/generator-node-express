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
      name: 'useInuit',
      type: 'confirm',
      message: 'Would you like to use Inuit.css?',
      default: true
    },
    {
      name: 'useBourbon',
      type: 'confirm',
      message: 'Would you like to use Bourbon?',
      default: true
    }
  ];

  this.prompt(prompts, function (props) {
    this.projectName = props.projectName;
    this.useInuit = props.useInuit;
    this.useBourbon = props.useBourbon;
    cb();
  }.bind(this));
};

NodeExpressGenerator.prototype.app = function app() {
  this.mkdir('assets');
  this.mkdir('assets/font');
  this.mkdir('assets/images');
  this.mkdir('assets/scripts');
  this.mkdir('assets/styles');
  this.mkdir('assets/styles/sass');
  this.mkdir('assets/styles/sass/ui');
  this.mkdir('views');
  this.mkdir('views/layouts');
  this.mkdir('views/partials');

  this.copy('styles/sass/_mixins.scss', 'assets/styles/sass/_mixins.scss');
  this.copy('styles/sass/_vars.scss', 'assets/styles/sass/_vars.scss');

  if (this.useInuit && this.useBourbon) {
    this.copy('styles/sass/screenAll.scss', 'assets/styles/sass/screen.scss');
  } else if (this.useInuit && !this.useBourbon) {
    this.copy('styles/sass/screenInuit.scss', 'assets/styles/sass/screen.scss'); 
  } else if (!this.useInuit && this.useBourbon) {
    this.copy('styles/sass/screenBourbon.scss', 'assets/styles/sass/screen.scss');
  } else {
    this.copy('styles/sass/screenNone.scss', 'assets/styles/sass/screen.scss');
  }

  this.copy('styles/sass/ui/_buttons.scss', 'assets/styles/sass/ui/_buttons.scss');
  this.copy('styles/sass/ui/_color.scss', 'assets/styles/sass/ui/_color.scss');
  this.copy('styles/sass/ui/_footer.scss', 'assets/styles/sass/ui/_footer.scss');
  this.copy('styles/sass/ui/_forms.scss', 'assets/styles/sass/ui/_forms.scss');
  this.copy('styles/sass/ui/_header.scss', 'assets/styles/sass/ui/_header.scss');
  this.copy('styles/sass/ui/_helpers.scss', 'assets/styles/sass/ui/_helpers.scss');
  this.copy('styles/sass/ui/_navs.scss', 'assets/styles/sass/ui/_navs.scss');
  this.copy('styles/sass/ui/_scaffolding.scss', 'assets/styles/sass/ui/_scaffolding.scss');
  this.copy('styles/sass/ui/_typography.scss', 'assets/styles/sass/ui/_typography.scss');

  this.copy('views/index.handlebars', 'views/index.handlebars');
  this.copy('views/layouts/main.handlebars', 'views/layouts/main.handlebars');

  this.copy('favicon.ico', 'assets/favicon.ico');  

  this.copy('app.js', 'app.js');
  this.copy('Gruntfile.js', 'Gruntfile.js');
  this.copy('Procfile', 'Procfile');
  this.copy('README.md', 'README.md');

  if (this.useInuit && this.useBourbon) {
    this.copy('_bowerAll.json', 'bower.json');  
  } else if (this.useInuit && !this.useBourbon) {
    this.copy('_bowerInuit.json', 'bower.json');  
  } else if (!this.useInuit && this.useBourbon) {
    this.copy('_bowerBourbon.json', 'bower.json');  
  } else {
    this.copy('_bowerNone.json', 'bower.json');  
  }
  
  this.copy('_package.json', 'package.json');
  
};

NodeExpressGenerator.prototype.projectfiles = function projectfiles() {
  this.copy('bowerrc', '.bowerrc');
  this.copy('editorconfig', '.editorconfig');
  this.copy('gitignore', '.gitignore');
  this.copy('jshintrc', '.jshintrc');
};
