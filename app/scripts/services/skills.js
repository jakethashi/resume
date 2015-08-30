(function() {
    'use strict';
    
    angular
        .module('mscv')
        .service('skills', skills);

    function skills() {    
        
        var response = {
            // TODO:initialize skill filter
            // - create map function from filtered items
            // _.unique(_.pluck(response.data.skills.items, 'type'))
            
            skillFilter: [{
                title: 'All',
                type: ''
            }, {
                title: 'Front-end',
                type: 'frontEnd'
            }, {
                title: 'Back-end',
                type: 'backEnd'
            }, {
                title: 'Frameworks',
                type: 'frameworks'
            },{
                title: 'Libraries',
                type: 'libraries'
            }, {
                title: 'Design',
                type: 'design'
            }, {
                title: 'Tools',
                type: 'tools'
            }]
        };
        
        return response;
    }    
})();
