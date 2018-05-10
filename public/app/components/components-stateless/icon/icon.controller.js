// eslint-disable-next-line
(function(app) {
  const moduleName = 'icon';
  // eslint-disable-next-line
  const templateUrl = templateUrlGenerateStateless(moduleName);
  // '/app/components/head-search/head-search.template.html';
  // START MODULE
  // --------------------------------------------------

  const bindings = {
    fa: '@',
  };

  function controller() {
    this.hover = false;
  }

  // --------------------------------------------------
  // LOAD component
  app.component(moduleName, { templateUrl, controller, bindings });
  // END module
  // eslint-disable-next-line
})(app);