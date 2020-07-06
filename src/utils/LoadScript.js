exports.Css = url => {
  return new Promise((resolve, reject) => {
    let link = document.createElement('link');
    link.type = 'text/css';
    link.rel = 'stylesheet';
    link.href = url;
    link.onload = function() {
      resolve();
      console.log('style has loaded');
    };

    let headScript = document.querySelector('script');
    headScript.parentNode.insertBefore(link, headScript);
  });
};

// for load scripts
exports.Script = src => {
  return new Promise(function(resolve, reject) {
    //document.body.removeChild(script);

    var script = document.createElement('script');
    script.src = src;
    script.addEventListener('load', function() {
      resolve();
      console.log('script has loaded');
    });
    script.addEventListener('error', function(e) {
      reject(e);
    });
    document.body.appendChild(script);
    //document.body.removeChild(script);
    let headLink = document.querySelector('link');
    // headLink.parentNode.insertAfter(script, headLink);
    // headLink.parentNode.removeChild(headLink);
  });
};

exports.loadDataTableScript = () => {
  this.Script('assets/bower_components/datatables.net/js/jquery.dataTables.min.js');
  this.Script('assets/bower_components/datatables.net-bs/js/dataTables.bootstrap.min.js');
  this.Script('assets/bower_components/jquery/dist/jquery.min.js');
  // this.Script('assets/bower_components/jquery-ui/jquery-ui.min.js');
  // this.Script('assets/bower_components/bootstrap/dist/js/bootstrap.min.js');
  // this.Script('assets/bower_components/jquery-sparkline/dist/jquery.sparkline.min.js');
  // this.Script('assets/plugins/jvectormap/jquery-jvectormap-1.2.2.min.js');
  // this.Script('assets/plugins/jvectormap/jquery-jvectormap-world-mill-en.js');
  // this.Script('assets/bower_components/moment/min/moment.min.js');
  // this.Script('assets/bower_components/bootstrap-daterangepicker/daterangepicker.js');
  // this.Script('assets/bower_components/bootstrap-datepicker/dist/js/bootstrap-datepicker.min.js');
  // this.Script('assets/bower_components/jquery-slimscroll/jquery.slimscroll.min.js');
  // this.Script("assets/bower_components/fastclick/lib/fastclick.js");
  // this.Script('assets/dist/js/adminlte.min.js');
  // this.Script('assets/dist/js/demo.js');


};
exports.loadDataTableCss = () => {
  this.Css('assets/bower_components/datatables.net-bs/css/dataTables.bootstrap.min.css');
   this.Css('assets/bower_components/bootstrap/dist/css/bootstrap.min.css');
  // this.Css('assets/bower_components/font-awesome/css/font-awesome.min.css');
  // this.Css('assets/bower_components/Ionicons/css/ionicons.min.css');
  // this.Css('assets/dist/css/AdminLTE.min.css');
  // this.Css('assets/dist/css/skins/_all-skins.min.css');
  // this.Css('assets/bower_components/jvectormap/jquery-jvectormap.css');
  // this.Css('assets/bower_components/bootstrap-datepicker/dist/css/bootstrap-datepicker.min.css');
  // this.Css('assets/bower_components/bootstrap-daterangepicker/daterangepicker.css');
  // this.Css('https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,600,700,300italic,400italic,600italic');
  
  
};