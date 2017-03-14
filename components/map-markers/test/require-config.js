'use strict';
/*
 * Copyright (c) 2014 GE Global Research. All rights reserved.
 *
 * The copyright to the computer software herein is the property of
 * GE Global Research. The software may be used and/or copied only
 * with the written permission of GE Global Research or in accordance
 * with the terms and conditions stipulated in the agreement/contract
 * under which the software has been supplied.
 */

/**
 * Local AMD config for this component.  Each application or Design System extension will declare its own
 * mappings and not use this config
 *
 * @author Martin Wragg
 */

require.config({
    baseUrl: './',
    config: { 'map-loader': {
        configFileName: 'base/test/unit/spec/map-test-config.json'
      }
    },
    paths: {
        'map-markers-component/map-markers' : 'js/map-markers',
        'map-markers-component/map-d3-overlay' : 'js/map-d3-overlay',
        'map-markers-component/map-marker-types' : 'js/map-marker-types',
        'map-markers-component/map-vector-data-layer' : 'js/map-vector-data-layer',
        'bootstrap' : 'components/bootstrap/js',
        'ge-bootstrap' : 'components/ge-bootstrap/js/ge-bootstrap',
        'map-core-component' : 'components/map-core/js',
        'map-popovers' : 'components/map-popovers/js/map-popovers',
        'jquery' : 'components/jquery/jquery',
        'OpenLayers' : 'components/open-layers/dist/OpenLayers',
        'hogan' : 'components/hogan/index',
        'd3-amd' : 'components/d3-amd/d3',
        'underscore' : 'components/underscore-amd/index',
        'map-google-component': 'components/map-google/js',
        'map-loader' : 'components/map-core/js/map-loader',
        'map-google': 'components/map-google/js/googlemaps',
        modernizr: 'components/modernizr/modernizr'
    },
    shim: {
      OpenLayers: {
          exports: 'OpenLayers'
      }
    }
});