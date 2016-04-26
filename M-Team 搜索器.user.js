// ==UserScript==
// @name         M-Team 搜索器
// @namespace    mteam-searcher
// @version      0.1
// @description  在 资源库 看到的影片、演员和类型，能够立即在 M-team 中搜索。
// @author       Samuel Cui
// @include     *://avmo.pw/*
// @include     *://avso.pw/*
// @include     *://avxo.pw/*
// @include     *://tp.m-team.cc/*
// @grant       none
// ==/UserScript==

(function() {
    if (/.+:\/\/(avmo|avso|avxo).+\/movie\/.+/.test(location.href)) {
        mteam_root = document.createElement('p');
        mteam = document.createElement('a');
        mteam.innerHTML = '在 M-team 中搜索';
        mteam.href = '//tp.m-team.cc/adult.php?incldead=1&spstate=0&inclbookmarked=0&search=' + $('.header')[0].nextElementSibling.innerHTML + '&search_area=0&search_mode=0';
        mteam.target = '_blank';
        mteam_root.appendChild(mteam);
        $(mteam_root).insertAfter($('.info').find('p')[0]);
    } else if (/.+:\/\/(avmo|avso|avxo).+\/star\/.+/.test(location.href)) {
        mteam_root = document.createElement('p');
        mteam = document.createElement('a');
        mteam.innerHTML = '在 M-team 中搜索';
        mteam.href = '//tp.m-team.cc/adult.php?incldead=1&spstate=0&inclbookmarked=0&search=' + $('.pb10')[0].innerHTML + '&search_area=0&search_mode=0';
        mteam.target = '_blank';
        mteam_root.appendChild(mteam);
        $(mteam_root).insertAfter($('.pb10'));
    } else if (/.+:\/\/(avmo|avso|avxo).+\/genre\/.+/.test(location.href)) {
        url = location.href.replace('/cn/', '/ja/').replace('/tw/', '/ja/').replace('/en/', '/ja/');
        var nav = $('.nav.navbar-nav')[0];
        (function () {
            $.ajax({
                method: "GET",
                url: url,
                dataType: 'text',
                success: function(response) {
                    mteam_root = document.createElement('li');
                    mteam = document.createElement('a');
                    mteam.innerHTML = '在 M-team 中搜索 类别 ' + $('title').text().match(/(.+?) - .+/)[1];
                    mteam.href = '//tp.m-team.cc/adult.php?tagname=' + response.match(/<title>(.+) - ジャンル - 映画 - AVMOO<\/title>/)[1];
                    mteam.target = '_blank';
                    $(mteam_root).append(mteam);
                    $(nav).append(mteam_root);
                }
            });
        }) () ;
    } else if (/.+:\/\/tp\.m-team\.cc\/adult\.php.*/.test(location.href)) {
        if (/&search=(.+?)&/.test(location.href)) {
            mteam = document.createElement('a');
            mteam.innerHTML = '在 JAV 中搜索';
            mteam.href = '//avmo.pw/cn/search/' + location.href.match(/&search=(.+?)&/)[1];
            mteam.target = '_blank';
            target = document.querySelectorAll('select[name=search_area]')[0];
            target.parentElement.appendChild(mteam);
        }

        var list = document.querySelectorAll('table.torrents')[0].children[0].children;
        var line_num = null;
        jQuery.each(list, function (index, line) {
            if (line.querySelectorAll('img[alt$="Censored"]').length === 0) {
                return;
            }
            var mteam = document.createElement('a');
            mteam.innerHTML = '<img src="https://avmo.pw/app/jav/View/img/favicon.ico" height="16px" width="16px" />';
            mteam.href = '//avmo.pw/cn/search/' + line.querySelectorAll('a[href^="details.php"]')[0].title.match(/(.+?) /)[1];
            mteam.target = '_blank';
            var target = line.querySelectorAll('a[id^=bookmark]')[0];
            target.parentElement.appendChild(mteam);
        });
    } else if (/.+:\/\/tp\.m-team\.cc\/details\.php.*/.test(location.href)) {
        if (/\sCensored&nbsp;/.test(document.documentElement.innerHTML)) {
            mteam = document.createElement('a');
            mteam.innerHTML = '在 JAV 中搜索';
            mteam.href = '//avmo.pw/cn/search/' + jQuery('#top').text().match(/(.+?) /)[1];
            mteam.target = '_blank';
            mteam.style = 'color:#880000';
            target = jQuery('#top')[0];
            target.appendChild(document.createTextNode(' ['));
            target.appendChild(mteam);
            target.appendChild(document.createTextNode(']'));
        }
    }
})();