require(['gtd'],function(gtd) {
    gtd.init();
    
    requirejs.config({
        paths: {
            hammer: './hammer.min',
            util: './util'
        }
    });
});