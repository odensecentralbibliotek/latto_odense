/* For uncompressed version, see popin2.js */
var xact_gIntroURL = null;
var localized = new Array();
localized.da = new Array();
localized.da["yes"] = "Ja";
localized.da["no"] = "Nej";
localized.da["cookie"] = 'Husk mit valg - accept&eacute;r cookies [<a href="https://popin.survey-xact.dk/cookie.html" target="_blank">L\u00e6s mere</a>]';
localized.en = new Array();
localized.en["yes"] = "Yes";
localized.en["no"] = "No";
localized.en["cookie"] = 'Husk mit valg - accept&eacute;r cookies [<a href="https://popin.survey-xact.dk/cookie.html" target="_blank">L\u00e6s mere</a>]';
localized.de = new Array();
localized.de["yes"] = "Ja";
localized.de["no"] = "Nein";
localized.de["cookie"] = 'Husk mit valg - accept&eacute;r cookies [<a href="https://popin.survey-xact.dk/cookie.html" target="_blank">L\u00e6s mere</a>]';
localized.no = new Array();
localized.no["yes"] = "Ja";
localized.no["no"] = "Nei";
localized.no["cookie"] = 'Husk mit valg - accept&eacute;r cookies [<a href="https://popin.survey-xact.dk/cookie.html" target="_blank">L\u00e6s mere</a>]';
localized.sv = new Array();
localized.sv["yes"] = "Ja";
localized.sv["no"] = "Nej";
localized.sv["cookie"] = 'Godk&auml;nn att sidan anv&auml;nder Cookies och kom ih&aring;g mitt val. L&auml;s mer om Cookies [<a href="https://pts.se/sv/Bransch/Regler/Lagar/Lag-om-elektronisk-kommunikation/Cookies-kakor/" target="_blank">h&auml;r</a>]';
var dateIntervalFrom = new Array();
var dateIntervalTo = new Array();
var xact_allowCookie = false;
var xact_cookieOptOut = false;
var xact_BPNPopin = false;

function xact_getLocalizations(a) {
    if (localized[a]) {
        return localized[a]
    } else {
        return localized.en
    }
}

function xact_getBrowserLanguage() {
    var a = navigator.language;
    a = (a == undefined ? window.navigator.browserLanguage : a);
    a = (a == undefined ? navigator.userLanguage : a);
    if (a) {
        a = a.substring(0, 2)
    } else {
        a = "en"
    }
    return a
}
var xact_doCenterPopIn = true;

function xact_delayedCenterPopWin() {
    if (xact_doCenterPopIn) {
        xact_doCenterPopIn = false;
        window.setTimeout("xact_doCenterPopIn = true;xact_centerPopWin()", 100)
    }
}

function hasCookieForSurvey(a) {
    if (SurveyXactGetCookie(a) != null) {
        return true
    } else {
        return false
    }
}

function xact_loadPopIn() {

    if (xact_checkShowPopIn()) {
        var a = window.xact_popinDelay;
        if (!(typeof(a) == "undefined")) {
            setTimeout("xact_doPopIn();", a)
        } else {
            xact_doPopIn()
        }
    }
}

function xact_checkShowPopIn() {

    var a = window.xact_surveyKey;
    if (xact_isRelevant(a)) {
        return xact_determineShowPopIn()
    } else {
        return false
    }
}

function xact_isRelevant(a) {
    if (hasCookieForSurvey(a)) {
        return false
    } else {
        if (!(typeof(window.xact_surveyActive) == "undefined") && !window.xact_surveyActive) {
            return false
        } else {
            if (!xact_checkDateInterval(new Date())) {
                return false
            } else {
                return true
            }
        }
    }
}

function xact_determineShowPopIn() {
    if (!(typeof(xact_doShowPopin) == "undefined")) {
        return xact_doShowPopin
    } else {
        var b = Math.random();
        var a = b <= window.xact_probability;
        return a
    }
}

function xact_doPopIn() {
    var b = determineLanguage();
    xact_pre_initPopIn(b, window.xact_baseURL.replace("http://", "https://"), window.xact_surveyKey);
    xact_initPopUp(window.xact_baseURL.replace("http://", "https://"));
    xact_post_initPopIn(b);
    var a = xact_cookieOptOut || xact_BPNPopin;
    xact_showPopWin(xact_gIntroURL.replace("http://", "https://"), window.xact_width, window.xact_height, null, true)
}

function determineLanguage() {
    if (window.xact_language) {
        return window.xact_language
    } else {
        return xact_getBrowserLanguage()
    }
}

function xact_startPopIn() {
    xact_addEvent(window, "load", xact_loadPopIn)
}
Date.prototype.setISO8601 = function(b) {
    var c = "([0-9]{4})(-([0-9]{1,2})(-([0-9]{1,2})(T([0-9]{1,2}):([0-9]{1,2})(:([0-9]{1,2})(.([0-9]+))?)?(Z|(([-+])([0-9]{1,2}):([0-9]{1,2})))?)?)?)?";
    var g = b.match(new RegExp(c));
    var f = 0;
    var a = new Date(g[1], 0, 1);
    if (g[3]) {
        a.setMonth(g[3] - 1)
    }
    if (g[5]) {
        a.setDate(g[5])
    }
    if (g[7]) {
        a.setHours(g[7])
    }
    if (g[8]) {
        a.setMinutes(g[8])
    }
    if (g[10]) {
        a.setSeconds(g[10])
    }
    if (g[12]) {
        a.setMilliseconds(Number("0." + g[12]) * 1000)
    }
    if (g[14]) {
        f = (Number(g[16]) * 60) + Number(g[17]);
        f *= ((g[15] == "-") ? 1 : -1)
    }
    var e = (Number(a) + (f * 60 * 1000));
    this.setTime(Number(e))
};

function xact_dateInterval(d, c) {
    var b = new Date();
    b.setISO8601(d);
    dateIntervalFrom[dateIntervalFrom.length] = b;
    var a = new Date();
    a.setISO8601(c);
    dateIntervalTo[dateIntervalTo.length] = a
}

function xact_checkDateInterval(b) {
    var a = false;
    if (dateIntervalFrom.length > 0) {
        for (var c = 0; c < dateIntervalFrom.length; c++) {
            if ((b >= dateIntervalFrom[c]) && b <= dateIntervalTo[c]) {
                a = true
            }
        }
    } else {
        if (dateIntervalFrom == 0) {
            a = true
        }
    }
    return a
}

function xact_pre_initPopIn(c, b, a) {
    if (window.xact_introPageURL) {
        xact_gIntroURL = window.xact_introPageURL
    } else {
        xact_gIntroURL = b + "/PopinIntroduction?key=" + a + "&lang=" + c
    }
}

function xact_post_initPopIn(d) {
    var h = document.getElementById("xact_popupInner");
    var f = document.createElement("div");
    f.id = "xact_popinButtons";
    var j = xact_getLocalizations(d);
    if (!(window.xact_handleCookie === false)) {
        var e = document.createElement("div");
        var g = document.createElement("input");
        g.type = "checkbox";
        g.id = "xact_popCheck";
        g.onclick = function() {
            if (g.checked === true) {
                window.xact_allowCookie = true
            } else {
                window.xact_allowCookie = false
            }
        };
      
        /* OC HACK  START */
        var c = document.createElement("div");
        c.innerHTML = "<span>" + "Ønsker du at deltage i undersøgelsen?" + "<span><br/>";
        c.id = "xact_popText";
        e.appendChild(c);
        
        /* OC HACK  STOP */
        
        e.appendChild(g);
        var c = document.createElement("div");
        c.innerHTML = "<span>" + j.cookie + "</span>";
        c.id = "xact_popText";
        e.appendChild(c);
        e.id = "xact_popContainer"
    }
    var b = document.createElement("button");
    b.id = "xact_popInYes";
    b.style.width = "50px";
    b.style.height = "35px";
    b.style.cursor = "pointer";
    b.onclick = function() {
        xact_doHidePopIn(true, xact_allowCookie)
    };
    b.innerHTML = j.yes;
    
    var a = document.createElement("button");
    a.id = "xact_popInNo";
    a.style.width = "25px";
    a.style.height = "35px";
    a.style.cursor = "pointer";
    a.onclick = function() {
        xact_doHidePopIn(false, xact_allowCookie)
    };
    a.innerHTML = j.no;
    if (!(window.xact_handleCookie === false) && (!(window.xact_cookieOptOut === true) || !(window.xact_BPNPopin === true))) {
        h.appendChild(e)
    }
    f.appendChild(b);
    f.appendChild(a);
    h.appendChild(f);
    if ((window.xact_cookieOptOut === true) || (window.xact_BPNPopin === true)) {
        h.appendChild(e);
        window.xact_allowCookie = true;
        c.innerHTML = "<label for='xact_popCheck'>" + j.cookie + "</label></label>";
        g.checked = true
    }
}

function xact_doHidePopIn(b, a) {
    if ((!xact_determineShowPopIn()) && a) {
        SurveyXactSetCookie(surveyKey, 1, getExpiry(false), "/")
    }
    if (a) {
        SurveyXactSetCookie(window.xact_surveyKey, 1, getExpiry(b), "/")
    }
    if (b) {
        if (window.xact_surveyURL != null) {
            window.open(window.xact_surveyURL)
        }
    }
    xact_hidePopWin()
}

function getExpiry(c) {
    var b = window.xact_cookieTTLYes;
    var a = window.xact_cookieTTLNo;
    if (c) {
        if (!(typeof(b) == "undefined")) {
            return new Date(new Date().getTime() + b * 24 * 60 * 60 * 1000)
        } else {
            return surveyXactExpiry
        }
    } else {
        if (!(typeof(a) == "undefined")) {
            return new Date(new Date().getTime() + a * 24 * 60 * 60 * 1000)
        } else {
            return surveyXactExpiry
        }
    }
}

function xact_addEvent(d, c, a) {
    if (d.addEventListener) {
        d.addEventListener(c, a, false);
        return true
    } else {
        if (d.attachEvent) {
            var b = d.attachEvent("on" + c, a);
            return b
        } else {
            return false
        }
    }
}

function xact_removeEvent(e, d, b, a) {
    if (e.removeEventListener) {
        e.removeEventListener(d, b, a);
        return true
    } else {
        if (e.detachEvent) {
            var c = e.detachEvent("on" + d, b);
            return c
        } else {
            alert("Handler could not be removed")
        }
    }
}

function xact_getViewportHeight() {
    if (window.innerHeight != window.undefined) {
        return window.innerHeight
    }
    if (document.compatMode == "CSS1Compat") {
        return document.documentElement.clientHeight
    }
    if (document.body) {
        return document.body.clientHeight
    }
    return window.undefined
}

function xact_getViewportWidth() {
    var b = 17;
    var a = null;
    if (window.innerWidth != window.undefined) {
        return window.innerWidth
    }
    if (document.compatMode == "CSS1Compat") {
        return document.documentElement.clientWidth
    }
    if (document.body) {
        return document.body.clientWidth
    }
}

function xact_getScrollTop() {
    if (self.pageYOffset) {
        return self.pageYOffset
    } else {
        if (document.documentElement && document.documentElement.scrollTop) {
            return document.documentElement.scrollTop
        } else {
            if (document.body) {
                return document.body.scrollTop
            }
        }
    }
}

function xact_getScrollLeft() {
    if (self.pageXOffset) {
        return self.pageXOffset
    } else {
        if (document.documentElement && document.documentElement.scrollLeft) {
            return document.documentElement.scrollLeft
        } else {
            if (document.body) {
                return document.body.scrollLeft
            }
        }
    }
}
var xact_gPopupMask = null;
var xact_gPopupContainer = null;
var xact_gPopFrame = null;
var xact_gReturnFunc;
var xact_gPopupIsShown = false;
var xact_gDefaultPage = "/popin/loading.html";
var xact_gHideSelects = false;
var xact_gReturnVal = null;
var xact_gTabIndexes = new Array();
var xact_gTabbableTags = new Array("A", "BUTTON", "TEXTAREA", "INPUT", "IFRAME");
if (!document.all) {
    document.onkeypress = xact_keyDownHandler
}

function xact_initPopUp(c) {
    theBody = document.getElementsByTagName("BODY")[0];
    popmask = document.createElement("div");
    popmask.id = "xact_popupMask";
    popcont = document.createElement("div");
    popcont.id = "xact_popupContainer";
    popcont.innerHTML = '<div id="xact_popupInner"><div id="xact_popupTitleBar"><div id="xact_popupTitle"></div><div id="xact_popupControls"><img src="' + c + '/images/close.gif" onclick="xact_hidePopWin(false);" id="popCloseBox" /></div></div><iframe src="' + c + xact_gDefaultPage + '" style="width:100%;height:100%;background-color:transparent;" scrolling="auto" frameborder="0" allowtransparency="true" id="xact_popupFrame" name="xact_popupFrame" width="100%" height="100%"></iframe></div>';
    theBody.insertBefore(popmask, theBody.firstChild);
    theBody.insertBefore(popcont, theBody.firstChild);
    xact_gPopupMask = document.getElementById("xact_popupMask");
    xact_gPopupContainer = document.getElementById("xact_popupContainer");
    xact_gPopFrame = document.getElementById("xact_popupFrame");
    var a = parseInt(window.navigator.appVersion.charAt(0), 10);
    if (a <= 6 && window.navigator.userAgent.indexOf("MSIE") > -1) {
        xact_gHideSelects = true
    }
    var b = document.getElementsByTagName("a");
    for (i = 0; i < b.length; i++) {
        if (b[i].className.indexOf("submodal") == 0) {
            b[i].onclick = function() {
                var e = 400;
                var d = 200;
                params = this.className.split("-");
                if (params.length == 3) {
                    e = parseInt(params[1]);
                    d = parseInt(params[2])
                }
                xact_showPopWin(this.href, e, d, null);
                return false
            }
        }
    }
}

function xact_showPopWin(b, f, a, d, c) {
    if (c == null || c) {
        document.getElementById("popCloseBox").style.display = "block"
    } else {
        document.getElementById("popCloseBox").style.display = "none"
    }
    xact_gPopupIsShown = true;
    xact_disableTabIndexes();
    xact_gPopupMask.style.display = "block";
    xact_gPopupContainer.style.display = "block";
    xact_centerPopWin(f, a);
    var e = parseInt(document.getElementById("xact_popupTitleBar").offsetHeight, 10);
    xact_gPopupContainer.style.width = f + "px";
    xact_setMaskSize();
    xact_gPopFrame.style.width = parseInt(document.getElementById("xact_popupTitleBar").offsetWidth, 10) + "px";
    xact_gPopFrame.style.height = (a) + "px";
    xact_gPopFrame.src = b;
    xact_gReturnFunc = d;
    if (xact_gHideSelects == true) {
        xact_hideSelectBoxes()
    }
    window.setTimeout("xact_setPopTitle();", 600)
}
var gi = 0;

function xact_centerPopWin(g, a) {
    if (xact_gPopupIsShown) {
        if (g == null || isNaN(g)) {
            g = xact_gPopupContainer.offsetWidth
        }
        if (a == null) {
            a = xact_gPopupContainer.offsetHeight
        }
        var f = document.getElementsByTagName("BODY")[0];
        var c = parseInt(xact_getScrollTop(), 10);
        var e = parseInt(f.scrollLeft, 10);
        xact_setMaskSize();
        var d = xact_getViewportHeight();
        var b = xact_getViewportWidth();
        var h = 20;
        if (d > (a + 2 * h)) {
            xact_gPopupContainer.style.top = (c + ((d - (a)) / 2)) + "px"
        } else {
            if ((xact_gPopupContainer.offsetTop + a + h) < (c + d)) {
                xact_gPopupContainer.style.top = (c + d) - (a + h) + "px"
            }
            if (xact_gPopupContainer.offsetTop > c + h) {
                xact_gPopupContainer.style.top = (c + h) + "px"
            }
            if (xact_gPopupContainer.offsetTop < h) {
                xact_gPopupContainer.style.top = h + "px"
            }
        } if (b > g + 2 * h) {
            xact_gPopupContainer.style.left = (e + ((b - g) / 2)) + "px"
        } else {
            if ((xact_gPopupContainer.offsetLeft + g + h) < (e + b)) {
                xact_gPopupContainer.style.left = (e + b) - (g + h) + "px"
            }
            if (xact_gPopupContainer.offsetLeft > e + h) {
                xact_gPopupContainer.style.left = e + h + "px"
            }
            if (xact_gPopupContainer.offsetLeft < h) {
                xact_gPopupContainer.style.left = e + h + "px"
            }
        }
    }
}
xact_addEvent(window, "resize", xact_delayedCenterPopWin);
xact_addEvent(window, "scroll", xact_delayedCenterPopWin);
window.onscroll = xact_centerPopWin;

function xact_setMaskSize() {
    var b = document.getElementsByTagName("BODY")[0];
    var a = xact_getViewportHeight();
    var c = xact_getViewportWidth();
    if (a > b.scrollHeight) {
        popHeight = a
    } else {
        popHeight = b.scrollHeight
    } if (c > b.scrollWidth) {
        popWidth = c
    } else {
        popWidth = b.scrollWidth
    }
    xact_gPopupMask.style.height = popHeight + "px";
    xact_gPopupMask.style.width = popWidth + "px"
}

function xact_hidePopWin(a) {
    xact_gPopupIsShown = false;
    var b = document.getElementsByTagName("BODY")[0];
    b.style.overflow = "";
    xact_restoreTabIndexes();
    if (xact_gPopupMask == null) {
        return
    }
    xact_gPopupMask.style.display = "none";
    xact_gPopupContainer.style.display = "none";
    if (a && xact_gReturnFunc != null) {
        xact_gReturnVal = window.frames.xact_popupFrame.returnVal;
        window.setTimeout("xact_gReturnFunc(xact_gReturnVal);", 1)
    }
    if (xact_gHideSelects) {
        xact_displaySelectBoxes()
    }
}

function xact_setPopTitle() {
    return;
    if (window.frames.xact_popupFrame.document.title == null) {
        window.setTimeout("xact_setPopTitle();", 10)
    } else {
        document.getElementById("xact_popupTitle").innerHTML = window.frames.xact_popupFrame.document.title
    }
}

function xact_keyDownHandler(a) {
    if (xact_gPopupIsShown && a.keyCode == 9) {
        return false
    }
}

function xact_disableTabIndexes() {
    if (document.all) {
        var c = 0;
        for (var b = 0; b < xact_gTabbableTags.length; b++) {
            var d = document.getElementsByTagName(xact_gTabbableTags[b]);
            for (var a = 0; a < d.length; a++) {
                xact_gTabIndexes[c] = d[a].tabIndex;
                d[a].tabIndex = "-1";
                c++
            }
        }
    }
}

function xact_restoreTabIndexes() {
    if (document.all) {
        var c = 0;
        for (var b = 0; b < xact_gTabbableTags.length; b++) {
            var d = document.getElementsByTagName(xact_gTabbableTags[b]);
            for (var a = 0; a < d.length; a++) {
                d[a].tabIndex = xact_gTabIndexes[c];
                d[a].tabEnabled = true;
                c++
            }
        }
    }
}

function xact_hideSelectBoxes() {
    var a = document.getElementsByTagName("SELECT");
    for (i = 0; a && i < a.length; i++) {
        a[i].style.visibility = "hidden"
    }
}

function xact_displaySelectBoxes() {
    var a = document.getElementsByTagName("SELECT");
    for (i = 0; a && i < a.length; i++) {
        a[i].style.visibility = "visible"
    }
};
