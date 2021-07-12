import './404.scss';

(function () {
    window.application = {}
    window.application.errorPage = {
        backToMain: function() {
            window.location = '/'
        }
    }
})()