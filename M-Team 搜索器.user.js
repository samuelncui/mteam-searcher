// ==UserScript==
// @name         M-Team 搜索器
// @namespace    mteam-searcher
// @version      0.5
// @description  在 资源库 看到的影片、演员和类型，能够立即在 M-team 中搜索。
// @author       Samuel Cui
// @include     *://avmo.club/*
// @include     *://avso.pw/*
// @include     *://avxo.pw/*
// @include     *://tp.m-team.cc/*
// @grant       none
// ==/UserScript==

(function() {
    if (/.+:\/\/(avmo).+\/movie\/.+/.test(location.href)) {
        var mteam_root = document.createElement('p');
        var mteam = document.createElement('a');
        mteam.innerHTML = '在 M-team 中搜索';
        mteam.href = '//tp.m-team.cc/adult.php?incldead=1&spstate=0&inclbookmarked=0&search=' + document.querySelector('.header').nextElementSibling.innerHTML + '&search_area=0&search_mode=0';
        mteam.target = '_blank';
        mteam_root.appendChild(mteam);
        var target = document.querySelector('.info');
        target.insertBefore(mteam_root, target.querySelectorAll('p')[1]);
    } else if (/.+:\/\/(avmo).+\/star\/.+/.test(location.href)) {
        var mteam_root = document.createElement('p');
        var mteam = document.createElement('a');
        mteam.innerHTML = '在 M-team 中搜索';
        mteam.href = '//tp.m-team.cc/adult.php?incldead=1&spstate=0&inclbookmarked=0&search=' + document.querySelector('.pb-10').innerHTML + '&search_area=0&search_mode=0';
        mteam.target = '_blank';
        mteam_root.appendChild(mteam);
        document.querySelector('.photo-info').appendChild(mteam_root);
    } else if (/.+:\/\/(avmo).+\/genre\/.+/.test(location.href)) {
        var url = location.href.replace('/cn/', '/ja/').replace('/tw/', '/ja/').replace('/en/', '/ja/');
        var nav = document.querySelector('.nav.navbar-nav');
        var ajax = new XMLHttpRequest();
        ajax.onreadystatechange=function() {
            if (ajax.readyState==4 && ajax.status==200) {
                var mteam_root = document.createElement('li');
                var mteam = document.createElement('a');
                mteam.innerHTML = '在 M-team 中搜索 类别 ' + document.querySelector('title').text.match(/(.+?) - .+/)[1];
                mteam.href = '//tp.m-team.cc/adult.php?tagname=' + ajax.responseText.match(/<title>(.+) - ジャンル - 映画 - AVMOO<\/title>/)[1];
                mteam.target = '_blank';
                mteam_root.appendChild(mteam);
                nav.appendChild(mteam_root);
            }
        };
        ajax.open("GET", url, true);
        ajax.send();
    } else if (/.+:\/\/tp\.m-team\.cc\/adult\.php.*/.test(location.href)) {
        if (/&search=(.+?)&/.test(location.href)) {
            var mteam = document.createElement('a');
            mteam.innerHTML = '在 JAV 中搜索';
            mteam.href = '//avmo.club/cn/search/' + location.href.match(/&search=(.+?)&/)[1];
            mteam.target = '_blank';
            var target = document.querySelectorAll('select[name=search_area]')[0];
            target.parentElement.appendChild(mteam);
        }

        var list = document.querySelectorAll('table.torrents')[0].children[0].children;
        var line_num = null;
        jQuery.each(list, function (index, line) {
            if (line.querySelectorAll('img[alt$="Censored"]').length === 0) {
                return;
            }
            var mteam = document.createElement('a');
            mteam.innerHTML = '<img src="https://avio.pw/app/jav/View/img/favicon.ico" height="16px" width="16px" />';
            mteam.href = '//avmo.club/cn/search/' + line.querySelectorAll('a[href^="details.php"]')[0].title.match(/(.+?) /)[1];
            mteam.target = '_blank';
            var target = line.querySelectorAll('a[id^=bookmark]')[0];
            target.parentElement.appendChild(mteam);
        });
    } else if (/.+:\/\/tp\.m-team\.cc\/details\.php.*/.test(location.href)) {
        if (/\sCensored&nbsp;/.test(document.documentElement.innerHTML)) {
            var mteam = document.createElement('a');
            mteam.innerHTML = '在 JAV 中搜索';
            mteam.href = '//avmo.club/cn/search/' + jQuery('#top').text().match(/(.+?) /)[1];
            mteam.target = '_blank';
            mteam.style = 'color:#880000';
            var target = jQuery('#top')[0];
            target.appendChild(document.createTextNode(' ['));
            target.appendChild(mteam);
            target.appendChild(document.createTextNode(']'));
        }
    }
})();
