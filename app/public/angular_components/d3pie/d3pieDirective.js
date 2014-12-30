(function(){

  angular
    .module("components_d3pie")
    .directive('d3pie', d3pieDirective);

  function d3pieDirective() {
    return {
      restrict: 'A',
      scope: {
        "pieData": "="
      },
      link: function(scope, element, attr) {
        var previousWidth = $(window).width();
        element.addClass("d3pie");
        redrawPie(scope, element, attr);
        $(window).on("resize.d3pie", function() {
          if ($(window).width() !== previousWidth) {
            previousWidth = $(window).width();
            redrawPie(scope, element, attr);
          }
        });
      }
    };
  }

  // ========================================
  // Routines
  // ========================================

  function redrawPie(scope, element, attr) {
    var data = scope.pieData;
    element.find("*").remove();
    var pie = new d3pie(element[0], {
      labels: {
        outer: {
          format: "none"
        },
        inner: {
          format: "label",
          hideWhenLessThanPercentage: null
        },
        mainLabel: {
          color: "#fff",
          font: "roboto",
          fontSize: 13
        },
      },
      size: {
        canvasHeight: element.width(),
        canvasWidth: element.width(),
        pieInnerRadius: 0,
        pieOuterRadius: null
      },
      data: data
    });
  }

})();