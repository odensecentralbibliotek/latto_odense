    var obq_isSSL = ("https:" == document.location.protocol);
    var obq_app = 'odensebib';
    var obq_file = 'online-booking-blue.png';
    var obq_widget_url = obq_isSSL ? "https://widget.onlinebooq.dk/Widget/" : "http://widget.onlinebooq.dk/Widget/";
    document.write(unescape("%3Cscript src='" + obq_widget_url + "onlinebooq.js' type='text/javascript'%3E%3C/script%3E"));