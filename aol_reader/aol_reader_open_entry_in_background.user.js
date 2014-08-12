// ==UserScript==
// @name           AOL Reader - Open entry in background
// @description    Adds 'h' as a hotkey to open selected entry in background tab
// @namespace      userscripts.org/users/kodx
// @author         kodx
// @include        http://reader.aol.com/*
// @include        https://reader.aol.com/*
// @grant          GM_openInTab
// @version        1.0.0
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.10.1/jquery.min.js
// ==/UserScript==


jQuery.noConflict();

(function() {
    var background_key = 72;
        /* 72 is for the 'h'-key
        ** you can change this to any key you want (until I include a script command for that :)
        ** pick the corresponding number from here: http://www.cambiaresearch.com/articles/15/javascript-char-codes-key-codes
        */

    var open_entry = function() {
        var cur = jQuery('.article-item-active');
        if (cur.length) {
            // console.log("AOLReaderOpenEntryInBackgroundTab: GM_openInTab now "+cur.find('h2.article-title').find('a').attr('href'));
            GM_openInTab(cur.find('h2.article-title').find('a').attr('href'), true);
            return true;
        } else {
            return false;
        }
    };

    // bind key-handler
    jQuery(document).keydown(function(e) {
        if ( e.which == background_key && !(e.altKey || e.ctrlKey || e.metaKey) ) {
            var el = document.activeElement;

            // if in textfield, do nothing
            if (el && (el.tagName.toLowerCase() == 'input' && el.type == 'text' ||
                    el.tagName.toLowerCase() == 'textarea')) {
                return true;
            }
            return !open_entry(); // To supress default behavior of the event
            // Added for those who have "search as I type" features enabled, etc
        }
    });
})();

