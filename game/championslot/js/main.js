/*
 Platform.js <https://mths.be/platform>
 Copyright 2014-2018 Benjamin Tan <https://bnjmnt4n.now.sh/>
 Copyright 2011-2013 John-David Dalton
 Available under MIT license <https://mths.be/mit>
*/
(function() {
    var a = "undefined" !== typeof window && "undefined" !== typeof window.document ? window.document : {},
        b = "undefined" !== typeof module && module.exports,
        d = function() {
            for (var e, k = ["requestFullscreen exitFullscreen fullscreenElement fullscreenEnabled fullscreenchange fullscreenerror".split(" "), "webkitRequestFullscreen webkitExitFullscreen webkitFullscreenElement webkitFullscreenEnabled webkitfullscreenchange webkitfullscreenerror".split(" "), "webkitRequestFullScreen webkitCancelFullScreen webkitCurrentFullScreenElement webkitCancelFullScreen webkitfullscreenchange webkitfullscreenerror".split(" "),
                    "mozRequestFullScreen mozCancelFullScreen mozFullScreenElement mozFullScreenEnabled mozfullscreenchange mozfullscreenerror".split(" "), "msRequestFullscreen msExitFullscreen msFullscreenElement msFullscreenEnabled MSFullscreenChange MSFullscreenError".split(" ")
                ], g = 0, l = k.length, c = {}; g < l; g++)
                if ((e = k[g]) && e[1] in a) {
                    for (g = 0; g < e.length; g++) c[k[0][g]] = e[g];
                    return c
                }
            return !1
        }(),
        p = {
            change: d.fullscreenchange,
            error: d.fullscreenerror
        },
        h = {
            request: function(e) {
                return new Promise(function(k, g) {
                    var l = function() {
                        this.off("change",
                            l);
                        k()
                    }.bind(this);
                    this.on("change", l);
                    e = e || a.documentElement;
                    Promise.resolve(e[d.requestFullscreen]())["catch"](g)
                }.bind(this))
            },
            exit: function() {
                return new Promise(function(e, k) {
                    if (this.isFullscreen) {
                        var g = function() {
                            this.off("change", g);
                            e()
                        }.bind(this);
                        this.on("change", g);
                        Promise.resolve(a[d.exitFullscreen]())["catch"](k)
                    } else e()
                }.bind(this))
            },
            toggle: function(e) {
                return this.isFullscreen ? this.exit() : this.request(e)
            },
            onchange: function(e) {
                this.on("change", e)
            },
            onerror: function(e) {
                this.on("error", e)
            },
            on: function(e, k) {
                var g = p[e];
                g && a.addEventListener(g, k, !1)
            },
            off: function(e, k) {
                var g = p[e];
                g && a.removeEventListener(g, k, !1)
            },
            raw: d
        };
    d ? (Object.defineProperties(h, {
        isFullscreen: {
            get: function() {
                return !!a[d.fullscreenElement]
            }
        },
        element: {
            enumerable: !0,
            get: function() {
                return a[d.fullscreenElement]
            }
        },
        isEnabled: {
            enumerable: !0,
            get: function() {
                return !!a[d.fullscreenEnabled]
            }
        }
    }), b ? module.exports = h : window.screenfull = h) : b ? module.exports = {
        isEnabled: !1
    } : window.screenfull = {
        isEnabled: !1
    }
})();
(function() {
    function a(r) {
        r = String(r);
        return r.charAt(0).toUpperCase() + r.slice(1)
    }

    function b(r, C) {
        var B = -1,
            w = r ? r.length : 0;
        if ("number" == typeof w && -1 < w && w <= t)
            for (; ++B < w;) C(r[B], B, r);
        else p(r, C)
    }

    function d(r) {
        r = String(r).replace(/^ +| +$/g, "");
        return /^(?:webOS|i(?:OS|P))/.test(r) ? r : a(r)
    }

    function p(r, C) {
        for (var B in r) z.call(r, B) && C(r[B], B, r)
    }

    function h(r) {
        return null == r ? a(r) : G.call(r).slice(8, -1)
    }

    function e(r, C) {
        var B = null != r ? typeof r[C] : "number";
        return !/^(?:boolean|number|string|undefined)$/.test(B) &&
            ("object" == B ? !!r[C] : !0)
    }

    function k(r) {
        return String(r).replace(/([ -])(?!$)/g, "$1?")
    }

    function g(r, C) {
        var B = null;
        b(r, function(w, x) {
            B = C(B, w, x, r)
        });
        return B
    }

    function l(r) {
        function C(R) {
            return g(R, function(O, L) {
                var S = L.pattern || k(L);
                !O && (O = RegExp("\\b" + S + " *\\d+[.\\w_]*", "i").exec(r) || RegExp("\\b" + S + " *\\w+-[\\w]*", "i").exec(r) || RegExp("\\b" + S + "(?:; *(?:[a-z]+[_-])?[a-z]+\\d+|[^ ();-]*)", "i").exec(r)) && ((O = String(L.label && !RegExp(S, "i").test(L.label) ? L.label : O).split("/"))[1] && !/[\d.]+/.test(O[0]) && (O[0] +=
                    " " + O[1]), L = L.label || L, O = d(O[0].replace(RegExp(S, "i"), L).replace(RegExp("; *(?:" + L + "[_-])?", "i"), " ").replace(RegExp("(" + L + ")[-_.]?(\\w)", "i"), "$1 $2")));
                return O
            })
        }

        function B(R) {
            return g(R, function(O, L) {
                return O || (RegExp(L + "(?:-[\\d.]+/|(?: for [\\w-]+)?[ /-])([\\d.]+[^ ();/_-]*)", "i").exec(r) || 0)[1] || null
            })
        }
        var w = q,
            x = r && "object" == typeof r && "String" != h(r);
        x && (w = r, r = null);
        var M = w.navigator || {},
            f = M.userAgent || "";
        r || (r = f);
        var A = x ? !!M.likeChrome : /\bChrome\b/.test(r) && !/internal|\n/i.test(G.toString()),
            H = x ? "Object" : "ScriptBridgingProxyObject",
            I = x ? "Object" : "Environment",
            P = x && w.java ? "JavaPackage" : h(w.java),
            V = x ? "Object" : "RuntimeObject";
        I = (P = /\bJava/.test(P) && w.java) && h(w.environment) == I;
        var F = P ? "a" : "\u03b1",
            N = P ? "b" : "\u03b2",
            Q = w.document || {},
            U = w.operamini || w.opera,
            X = u.test(X = x && U ? U["[[Class]]"] : h(U)) ? X : U = null,
            n, Z = r;
        x = [];
        var aa = null,
            Y = r == f;
        f = Y && U && "function" == typeof U.version && U.version();
        var J = function(R) {
                return g(R, function(O, L) {
                    return O || RegExp("\\b" + (L.pattern || k(L)) + "\\b", "i").exec(r) && (L.label ||
                        L)
                })
            }([{
                label: "EdgeHTML",
                pattern: "Edge"
            }, "Trident", {
                label: "WebKit",
                pattern: "AppleWebKit"
            }, "iCab", "Presto", "NetFront", "Tasman", "KHTML", "Gecko"]),
            y = function(R) {
                return g(R, function(O, L) {
                    return O || RegExp("\\b" + (L.pattern || k(L)) + "\\b", "i").exec(r) && (L.label || L)
                })
            }(["Adobe AIR", "Arora", "Avant Browser", "Breach", "Camino", "Electron", "Epiphany", "Fennec", "Flock", "Galeon", "GreenBrowser", "iCab", "Iceweasel", "K-Meleon", "Konqueror", "Lunascape", "Maxthon", {
                    label: "Microsoft Edge",
                    pattern: "Edge"
                }, "Midori", "Nook Browser",
                "PaleMoon", "PhantomJS", "Raven", "Rekonq", "RockMelt", {
                    label: "Samsung Internet",
                    pattern: "SamsungBrowser"
                }, "SeaMonkey", {
                    label: "Silk",
                    pattern: "(?:Cloud9|Silk-Accelerated)"
                }, "Sleipnir", "SlimBrowser", {
                    label: "SRWare Iron",
                    pattern: "Iron"
                }, "Sunrise", "Swiftfox", "Waterfox", "WebPositive", "Opera Mini", {
                    label: "Opera Mini",
                    pattern: "OPiOS"
                }, "Opera", {
                    label: "Opera",
                    pattern: "OPR"
                }, "Chrome", {
                    label: "Chrome Mobile",
                    pattern: "(?:CriOS|CrMo)"
                }, {
                    label: "Firefox",
                    pattern: "(?:Firefox|Minefield)"
                }, {
                    label: "Firefox for iOS",
                    pattern: "FxiOS"
                },
                {
                    label: "IE",
                    pattern: "IEMobile"
                }, {
                    label: "IE",
                    pattern: "MSIE"
                }, "Safari"
            ]),
            K = C([{
                    label: "BlackBerry",
                    pattern: "BB10"
                }, "BlackBerry", {
                    label: "Galaxy S",
                    pattern: "GT-I9000"
                }, {
                    label: "Galaxy S2",
                    pattern: "GT-I9100"
                }, {
                    label: "Galaxy S3",
                    pattern: "GT-I9300"
                }, {
                    label: "Galaxy S4",
                    pattern: "GT-I9500"
                }, {
                    label: "Galaxy S5",
                    pattern: "SM-G900"
                }, {
                    label: "Galaxy S6",
                    pattern: "SM-G920"
                }, {
                    label: "Galaxy S6 Edge",
                    pattern: "SM-G925"
                }, {
                    label: "Galaxy S7",
                    pattern: "SM-G930"
                }, {
                    label: "Galaxy S7 Edge",
                    pattern: "SM-G935"
                }, "Google TV", "Lumia", "iPad",
                "iPod", "iPhone", "Kindle", {
                    label: "Kindle Fire",
                    pattern: "(?:Cloud9|Silk-Accelerated)"
                }, "Nexus", "Nook", "PlayBook", "PlayStation Vita", "PlayStation", "TouchPad", "Transformer", {
                    label: "Wii U",
                    pattern: "WiiU"
                }, "Wii", "Xbox One", {
                    label: "Xbox 360",
                    pattern: "Xbox"
                }, "Xoom"
            ]),
            T = function(R) {
                return g(R, function(O, L, S) {
                    return O || (L[K] || L[/^[a-z]+(?: +[a-z]+\b)*/i.exec(K)] || RegExp("\\b" + k(S) + "(?:\\b|\\w*\\d)", "i").exec(r)) && S
                })
            }({
                Apple: {
                    iPad: 1,
                    iPhone: 1,
                    iPod: 1
                },
                Archos: {},
                Amazon: {
                    Kindle: 1,
                    "Kindle Fire": 1
                },
                Asus: {
                    Transformer: 1
                },
                "Barnes & Noble": {
                    Nook: 1
                },
                BlackBerry: {
                    PlayBook: 1
                },
                Google: {
                    "Google TV": 1,
                    Nexus: 1
                },
                HP: {
                    TouchPad: 1
                },
                HTC: {},
                LG: {},
                Microsoft: {
                    Xbox: 1,
                    "Xbox One": 1
                },
                Motorola: {
                    Xoom: 1
                },
                Nintendo: {
                    "Wii U": 1,
                    Wii: 1
                },
                Nokia: {
                    Lumia: 1
                },
                Samsung: {
                    "Galaxy S": 1,
                    "Galaxy S2": 1,
                    "Galaxy S3": 1,
                    "Galaxy S4": 1
                },
                Sony: {
                    PlayStation: 1,
                    "PlayStation Vita": 1
                }
            }),
            D = function(R) {
                return g(R, function(O, L) {
                    var S = L.pattern || k(L);
                    if (!O && (O = RegExp("\\b" + S + "(?:/[\\d.]+|[ \\w.]*)", "i").exec(r))) {
                        var W = O,
                            ba = L.label || L,
                            ca = {
                                "10.0": "10",
                                "6.4": "10 Technical Preview",
                                "6.3": "8.1",
                                "6.2": "8",
                                "6.1": "Server 2008 R2 / 7",
                                "6.0": "Server 2008 / Vista",
                                "5.2": "Server 2003 / XP 64-bit",
                                "5.1": "XP",
                                "5.01": "2000 SP1",
                                "5.0": "2000",
                                "4.0": "NT",
                                "4.90": "ME"
                            };
                        S && ba && /^Win/i.test(W) && !/^Windows Phone /i.test(W) && (ca = ca[/[\d.]+$/.exec(W)]) && (W = "Windows " + ca);
                        W = String(W);
                        S && ba && (W = W.replace(RegExp(S, "i"), ba));
                        O = W = d(W.replace(/ ce$/i, " CE").replace(/\bhpw/i, "web").replace(/\bMacintosh\b/, "Mac OS").replace(/_PowerPC\b/i, " OS").replace(/\b(OS X) [^ \d]+/i, "$1").replace(/\bMac (OS X)\b/,
                            "$1").replace(/\/(\d)/, " $1").replace(/_/g, ".").replace(/(?: BePC|[ .]*fc[ \d.]+)$/i, "").replace(/\bx86\.64\b/gi, "x86_64").replace(/\b(Windows Phone) OS\b/, "$1").replace(/\b(Chrome OS \w+) [\d.]+\b/, "$1").split(" on ")[0])
                    }
                    return O
                })
            }(["Windows Phone", "Android", "CentOS", {
                    label: "Chrome OS",
                    pattern: "CrOS"
                }, "Debian", "Fedora", "FreeBSD", "Gentoo", "Haiku", "Kubuntu", "Linux Mint", "OpenBSD", "Red Hat", "SuSE", "Ubuntu", "Xubuntu", "Cygwin", "Symbian OS", "hpwOS", "webOS ", "webOS", "Tablet OS", "Tizen", "Linux", "Mac OS X",
                "Macintosh", "Mac", "Windows 98;", "Windows "
            ]);
        J && (J = [J]);
        T && !K && (K = C([T]));
        if (n = /\bGoogle TV\b/.exec(K)) K = n[0];
        /\bSimulator\b/i.test(r) && (K = (K ? K + " " : "") + "Simulator");
        "Opera Mini" == y && /\bOPiOS\b/.test(r) && x.push("running in Turbo/Uncompressed mode");
        "IE" == y && /\blike iPhone OS\b/.test(r) ? (n = l(r.replace(/like iPhone OS/, "")), T = n.manufacturer, K = n.product) : /^iP/.test(K) ? (y || (y = "Safari"), D = "iOS" + ((n = / OS ([\d_]+)/i.exec(r)) ? " " + n[1].replace(/_/g, ".") : "")) : "Konqueror" != y || /buntu/i.test(D) ? T && "Google" != T &&
            (/Chrome/.test(y) && !/\bMobile Safari\b/i.test(r) || /\bVita\b/.test(K)) || /\bAndroid\b/.test(D) && /^Chrome/.test(y) && /\bVersion\//i.test(r) ? (y = "Android Browser", D = /\bAndroid\b/.test(D) ? D : "Android") : "Silk" == y ? (/\bMobi/i.test(r) || (D = "Android", x.unshift("desktop mode")), /Accelerated *= *true/i.test(r) && x.unshift("accelerated")) : "PaleMoon" == y && (n = /\bFirefox\/([\d.]+)\b/.exec(r)) ? x.push("identifying as Firefox " + n[1]) : "Firefox" == y && (n = /\b(Mobile|Tablet|TV)\b/i.exec(r)) ? (D || (D = "Firefox OS"), K || (K = n[1])) : !y ||
            (n = !/\bMinefield\b/i.test(r) && /\b(?:Firefox|Safari)\b/.exec(y)) ? (y && !K && /[\/,]|^[^(]+?\)/.test(r.slice(r.indexOf(n + "/") + 8)) && (y = null), (n = K || T || D) && (K || T || /\b(?:Android|Symbian OS|Tablet OS|webOS)\b/.test(D)) && (y = /[a-z]+(?: Hat)?/i.exec(/\bAndroid\b/.test(D) ? D : n) + " Browser")) : "Electron" == y && (n = (/\bChrome\/([\d.]+)\b/.exec(r) || 0)[1]) && x.push("Chromium " + n) : D = "Kubuntu";
        f || (f = B(["(?:Cloud9|CriOS|CrMo|Edge|FxiOS|IEMobile|Iron|Opera ?Mini|OPiOS|OPR|Raven|SamsungBrowser|Silk(?!/[\\d.]+$))", "Version", k(y),
            "(?:Firefox|Minefield|NetFront)"
        ]));
        if (n = "iCab" == J && 3 < parseFloat(f) && "WebKit" || /\bOpera\b/.test(y) && (/\bOPR\b/.test(r) ? "Blink" : "Presto") || /\b(?:Midori|Nook|Safari)\b/i.test(r) && !/^(?:Trident|EdgeHTML)$/.test(J) && "WebKit" || !J && /\bMSIE\b/i.test(r) && ("Mac OS" == D ? "Tasman" : "Trident") || "WebKit" == J && /\bPlayStation\b(?! Vita\b)/i.test(y) && "NetFront") J = [n];
        "IE" == y && (n = (/; *(?:XBLWP|ZuneWP)(\d+)/i.exec(r) || 0)[1]) ? (y += " Mobile", D = "Windows Phone " + (/\+$/.test(n) ? n : n + ".x"), x.unshift("desktop mode")) : /\bWPDesktop\b/i.test(r) ?
            (y = "IE Mobile", D = "Windows Phone 8.x", x.unshift("desktop mode"), f || (f = (/\brv:([\d.]+)/.exec(r) || 0)[1])) : "IE" != y && "Trident" == J && (n = /\brv:([\d.]+)/.exec(r)) && (y && x.push("identifying as " + y + (f ? " " + f : "")), y = "IE", f = n[1]);
        if (Y) {
            if (e(w, "global"))
                if (P && (n = P.lang.System, Z = n.getProperty("os.arch"), D = D || n.getProperty("os.name") + " " + n.getProperty("os.version")), I) {
                    try {
                        f = w.require("ringo/engine").version.join("."), y = "RingoJS"
                    } catch (R) {
                        (n = w.system) && n.global.system == w.system && (y = "Narwhal", D || (D = n[0].os || null))
                    }
                    y ||
                        (y = "Rhino")
                } else "object" == typeof w.process && !w.process.browser && (n = w.process) && ("object" == typeof n.versions && ("string" == typeof n.versions.electron ? (x.push("Node " + n.versions.node), y = "Electron", f = n.versions.electron) : "string" == typeof n.versions.nw && (x.push("Chromium " + f, "Node " + n.versions.node), y = "NW.js", f = n.versions.nw)), y || (y = "Node.js", Z = n.arch, D = n.platform, f = (f = /[\d.]+/.exec(n.version)) ? f[0] : null));
            else h(n = w.runtime) == H ? (y = "Adobe AIR", D = n.flash.system.Capabilities.os) : h(n = w.phantom) == V ? (y = "PhantomJS",
                f = (n = n.version || null) && n.major + "." + n.minor + "." + n.patch) : "number" == typeof Q.documentMode && (n = /\bTrident\/(\d+)/i.exec(r)) ? (f = [f, Q.documentMode], (n = +n[1] + 4) != f[1] && (x.push("IE " + f[1] + " mode"), J && (J[1] = ""), f[1] = n), f = "IE" == y ? String(f[1].toFixed(1)) : f[0]) : "number" == typeof Q.documentMode && /^(?:Chrome|Firefox)\b/.test(y) && (x.push("masking as " + y + " " + f), y = "IE", f = "11.0", J = ["Trident"], D = "Windows");
            D = D && d(D)
        }
        f && (n = /(?:[ab]|dp|pre|[ab]\d+pre)(?:\d+\+?)?$/i.exec(f) || /(?:alpha|beta)(?: ?\d)?/i.exec(r + ";" + (Y && M.appMinorVersion)) ||
            /\bMinefield\b/i.test(r) && "a") && (aa = /b/i.test(n) ? "beta" : "alpha", f = f.replace(RegExp(n + "\\+?$"), "") + ("beta" == aa ? N : F) + (/\d+\+?/.exec(n) || ""));
        if ("Fennec" == y || "Firefox" == y && /\b(?:Android|Firefox OS)\b/.test(D)) y = "Firefox Mobile";
        else if ("Maxthon" == y && f) f = f.replace(/\.[\d.]+/, ".x");
        else if (/\bXbox\b/i.test(K)) "Xbox 360" == K && (D = null), "Xbox 360" == K && /\bIEMobile\b/.test(r) && x.unshift("mobile mode");
        else if (!/^(?:Chrome|IE|Opera)$/.test(y) && (!y || K || /Browser|Mobi/.test(y)) || "Windows CE" != D && !/Mobi/i.test(r))
            if ("IE" ==
                y && Y) try {
                null === w.external && x.unshift("platform preview")
            } catch (R) {
                x.unshift("embedded")
            } else(/\bBlackBerry\b/.test(K) || /\bBB10\b/.test(r)) && (n = (RegExp(K.replace(/ +/g, " *") + "/([.\\d]+)", "i").exec(r) || 0)[1] || f) ? (n = [n, /BB10/.test(r)], D = (n[1] ? (K = null, T = "BlackBerry") : "Device Software") + " " + n[0], f = null) : this != p && "Wii" != K && (Y && U || /Opera/.test(y) && /\b(?:MSIE|Firefox)\b/i.test(r) || "Firefox" == y && /\bOS X (?:\d+\.){2,}/.test(D) || "IE" == y && (D && !/^Win/.test(D) && 5.5 < f || /\bWindows XP\b/.test(D) && 8 < f || 8 == f && !/\bTrident\b/.test(r))) &&
                !u.test(n = l.call(p, r.replace(u, "") + ";")) && n.name && (n = "ing as " + n.name + ((n = n.version) ? " " + n : ""), u.test(y) ? (/\bIE\b/.test(n) && "Mac OS" == D && (D = null), n = "identify" + n) : (n = "mask" + n, y = X ? d(X.replace(/([a-z])([A-Z])/g, "$1 $2")) : "Opera", /\bIE\b/.test(n) && (D = null), Y || (f = null)), J = ["Presto"], x.push(n));
            else y += " Mobile";
        if (n = (/\bAppleWebKit\/([\d.]+\+?)/i.exec(r) || 0)[1]) {
            n = [parseFloat(n.replace(/\.(\d)$/, ".0$1")), n];
            if ("Safari" == y && "+" == n[1].slice(-1)) y = "WebKit Nightly", aa = "alpha", f = n[1].slice(0, -1);
            else if (f ==
                n[1] || f == (n[2] = (/\bSafari\/([\d.]+\+?)/i.exec(r) || 0)[1])) f = null;
            n[1] = (/\bChrome\/([\d.]+)/i.exec(r) || 0)[1];
            537.36 == n[0] && 537.36 == n[2] && 28 <= parseFloat(n[1]) && "WebKit" == J && (J = ["Blink"]);
            Y && (A || n[1]) ? (J && (J[1] = "like Chrome"), n = n[1] || (n = n[0], 530 > n ? 1 : 532 > n ? 2 : 532.05 > n ? 3 : 533 > n ? 4 : 534.03 > n ? 5 : 534.07 > n ? 6 : 534.1 > n ? 7 : 534.13 > n ? 8 : 534.16 > n ? 9 : 534.24 > n ? 10 : 534.3 > n ? 11 : 535.01 > n ? 12 : 535.02 > n ? "13+" : 535.07 > n ? 15 : 535.11 > n ? 16 : 535.19 > n ? 17 : 536.05 > n ? 18 : 536.1 > n ? 19 : 537.01 > n ? 20 : 537.11 > n ? "21+" : 537.13 > n ? 23 : 537.18 > n ? 24 : 537.24 > n ? 25 : 537.36 >
                n ? 26 : "Blink" != J ? "27" : "28")) : (J && (J[1] = "like Safari"), n = (n = n[0], 400 > n ? 1 : 500 > n ? 2 : 526 > n ? 3 : 533 > n ? 4 : 534 > n ? "4+" : 535 > n ? 5 : 537 > n ? 6 : 538 > n ? 7 : 601 > n ? 8 : "8"));
            J && (J[1] += " " + (n += "number" == typeof n ? ".x" : /[.+]/.test(n) ? "" : "+"));
            "Safari" == y && (!f || 45 < parseInt(f)) && (f = n)
        }
        "Opera" == y && (n = /\bzbov|zvav$/.exec(D)) ? (y += " ", x.unshift("desktop mode"), "zvav" == n ? (y += "Mini", f = null) : y += "Mobile", D = D.replace(RegExp(" *" + n + "$"), "")) : "Safari" == y && /\bChrome\b/.exec(J && J[1]) && (x.unshift("desktop mode"), y = "Chrome Mobile", f = null, /\bOS X\b/.test(D) ?
            (T = "Apple", D = "iOS 4.3+") : D = null);
        f && 0 == f.indexOf(n = /[\d.]+$/.exec(D)) && -1 < r.indexOf("/" + n + "-") && (D = String(D.replace(n, "")).replace(/^ +| +$/g, ""));
        J && !/\b(?:Avant|Nook)\b/.test(y) && (/Browser|Lunascape|Maxthon/.test(y) || "Safari" != y && /^iOS/.test(D) && /\bSafari\b/.test(J[1]) || /^(?:Adobe|Arora|Breach|Midori|Opera|Phantom|Rekonq|Rock|Samsung Internet|Sleipnir|Web)/.test(y) && J[1]) && (n = J[J.length - 1]) && x.push(n);
        x.length && (x = ["(" + x.join("; ") + ")"]);
        T && K && 0 > K.indexOf(T) && x.push("on " + T);
        K && x.push((/^on /.test(x[x.length -
            1]) ? "" : "on ") + K);
        if (D) {
            var da = (n = / ([\d.+]+)$/.exec(D)) && "/" == D.charAt(D.length - n[0].length - 1);
            D = {
                architecture: 32,
                family: n && !da ? D.replace(n[0], "") : D,
                version: n ? n[1] : null,
                toString: function() {
                    var R = this.version;
                    return this.family + (R && !da ? " " + R : "") + (64 == this.architecture ? " 64-bit" : "")
                }
            }
        }(n = /\b(?:AMD|IA|Win|WOW|x86_|x)64\b/i.exec(Z)) && !/\bi686\b/i.test(Z) ? (D && (D.architecture = 64, D.family = D.family.replace(RegExp(" *" + n), "")), y && (/\bWOW64\b/i.test(r) || Y && /\w(?:86|32)$/.test(M.cpuClass || M.platform) && !/\bWin64; x64\b/i.test(r)) &&
            x.unshift("32-bit")) : D && /^OS X/.test(D.family) && "Chrome" == y && 39 <= parseFloat(f) && (D.architecture = 64);
        r || (r = null);
        w = {};
        w.description = r;
        w.layout = J && J[0];
        w.manufacturer = T;
        w.name = y;
        w.prerelease = aa;
        w.product = K;
        w.ua = r;
        w.version = y && f;
        w.os = D || {
            architecture: null,
            family: null,
            version: null,
            toString: function() {
                return "null"
            }
        };
        w.parse = l;
        w.toString = function() {
            return this.description || ""
        };
        w.version && x.unshift(f);
        w.name && x.unshift(y);
        D && y && (D != String(D).split(" ")[0] || D != y.split(" ")[0] && !K) && x.push(K ? "(" + D + ")" : "on " +
            D);
        x.length && (w.description = x.join(" "));
        return w
    }
    var c = {
            "function": !0,
            object: !0
        },
        q = c[typeof window] && window || this,
        v = c[typeof exports] && exports;
    c = c[typeof module] && module && !module.nodeType && module;
    var m = v && c && "object" == typeof global && global;
    !m || m.global !== m && m.window !== m && m.self !== m || (q = m);
    var t = Math.pow(2, 53) - 1,
        u = /\bOpera/;
    m = Object.prototype;
    var z = m.hasOwnProperty,
        G = m.toString,
        E = l();
    "function" == typeof define && "object" == typeof define.amd && define.amd ? (q.platform = E, define(function() {
            return E
        })) : v &&
        c ? p(E, function(r, C) {
            v[C] = r
        }) : q.platform = E
}).call(this);

function buildIOSMeta() {
    for (var a = [{
            name: "viewport",
            content: "width=device-width, height=device-height, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no"
        }, {
            name: "apple-mobile-web-app-capable",
            content: "yes"
        }, {
            name: "apple-mobile-web-app-status-bar-style",
            content: "black"
        }], b = 0; b < a.length; b++) {
        var d = document.createElement("meta");
        d.name = a[b].name;
        d.content = a[b].content;
        var p = window.document.head.querySelector('meta[name="' + d.name + '"]');
        p && p.parentNode.removeChild(p);
        window.document.head.appendChild(d)
    }
}

function hideIOSFullscreenPanel() {
    jQuery(".xxx-ios-fullscreen-message").css("display", "none");
    jQuery(".xxx-ios-fullscreen-scroll").css("display", "none");
    jQuery(".xxx-game-iframe-full").removeClass("xxx-game-iframe-iphone-se")
}

function buildIOSFullscreenPanel() {
    jQuery("body").append('<div class="xxx-ios-fullscreen-message"><div class="xxx-ios-fullscreen-swipe"></div></div><div class="xxx-ios-fullscreen-scroll"></div>')
}

function showIOSFullscreenPanel() {
    jQuery(".xxx-ios-fullscreen-message").css("display", "block");
    jQuery(".xxx-ios-fullscreen-scroll").css("display", "block")
}

function __iosResize() {
    window.scrollTo(0, 0);
    console.log(window.devicePixelRatio);
    console.log(window.innerWidth);
    console.log(window.innerHeight);
    if ("iPhone" === platform.product) switch (window.devicePixelRatio) {
        case 2:
            switch (window.innerWidth) {
                case 568:
                    320 !== window.innerHeight && jQuery(".xxx-game-iframe-full").addClass("xxx-game-iframe-iphone-se");
                    break;
                case 667:
                    375 === window.innerHeight ? hideIOSFullscreenPanel() : showIOSFullscreenPanel();
                    break;
                case 808:
                    414 === window.innerHeight ? hideIOSFullscreenPanel() : showIOSFullscreenPanel();
                    break;
                default:
                    hideIOSFullscreenPanel()
            }
            break;
        case 3:
            switch (window.innerWidth) {
                case 736:
                    414 === window.innerHeight ? hideIOSFullscreenPanel() : showIOSFullscreenPanel();
                    break;
                case 724:
                    375 === window.innerHeight ? hideIOSFullscreenPanel() : showIOSFullscreenPanel();
                    break;
                case 808:
                    414 === window.innerHeight ? hideIOSFullscreenPanel() : showIOSFullscreenPanel();
                    break;
                default:
                    hideIOSFullscreenPanel()
            }
            break;
        default:
            hideIOSFullscreenPanel()
    }
}

function iosResize() {
    __iosResize();
    setTimeout(function() {
        __iosResize()
    }, 500)
}

function iosInIframe() {
    try {
        return window.self !== window.top
    } catch (a) {
        return !0
    }
}

function isIOSLessThen13() {
    var a = platform.os,
        b = a.family.toLowerCase();
    a = parseFloat(a.version);
    return "ios" === b && 13 > a ? !0 : !1
}
$(document).ready(function() {
    platform && "iPhone" === platform.product && "safari" === platform.name.toLowerCase() && isIOSLessThen13() && !iosInIframe() && (buildIOSFullscreenPanel(), buildIOSMeta())
});
jQuery(window).resize(function() {
    platform && "iPhone" === platform.product && "safari" === platform.name.toLowerCase() && isIOSLessThen13() && !iosInIframe() && iosResize()
});
var s_iOffsetX, s_iOffsetY, s_iScaleFactor = 1,
    s_bIsIphone = !1,
    s_bFocus = !0;
(function(a) {
    (jQuery.browser = jQuery.browser || {}).mobile = /android|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(ad|hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|symbian|tablet|treo|up\.(browser|link)|vodafone|wap|webos|windows (ce|phone)|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|e\-|e\/|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(di|rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|xda(\-|2|g)|yas\-|your|zeto|zte\-/i.test(a.substr(0,
        4))
})(navigator.userAgent || navigator.vendor || window.opera);
$(window).resize(function() {
    sizeHandler()
});

function trace(a) {
    console.log(a)
}

function getSize(a) {
    var b = a.toLowerCase(),
        d = window.document,
        p = d.documentElement;
    if (void 0 === window["inner" + a]) a = p["client" + a];
    else if (window["inner" + a] != p["client" + a]) {
        var h = d.createElement("body");
        h.id = "vpw-test-b";
        h.style.cssText = "overflow:scroll";
        var e = d.createElement("div");
        e.id = "vpw-test-d";
        e.style.cssText = "position:absolute;top:-1000px";
        e.innerHTML = "<style>@media(" + b + ":" + p["client" + a] + "px){body#vpw-test-b div#vpw-test-d{" + b + ":7px!important}}</style>";
        h.appendChild(e);
        p.insertBefore(h, d.head);
        a = 7 == e["offset" + a] ? p["client" + a] : window["inner" + a];
        p.removeChild(h)
    } else a = window["inner" + a];
    return a
}
window.addEventListener("orientationchange", onOrientationChange);

function onOrientationChange() {
    window.matchMedia("(orientation: portrait)").matches && sizeHandler();
    window.matchMedia("(orientation: landscape)").matches && sizeHandler()
}

function isMobile() {
    return isIpad() ? !0 : jQuery.browser.mobile
}

function isIpad() {
    var a = -1 !== navigator.userAgent.toLowerCase().indexOf("ipad");
    return !a && navigator.userAgent.match(/Mac/) && navigator.maxTouchPoints && 2 < navigator.maxTouchPoints ? !0 : a
}

function isIOS() {
    var a = "iPad Simulator;iPhone Simulator;iPod Simulator;iPad;iPhone;iPod".split(";");
    if (-1 !== navigator.userAgent.toLowerCase().indexOf("iphone")) return s_bIsIphone = !0;
    for (; a.length;)
        if (navigator.platform === a.pop()) return s_bIsIphone = !0;
    return s_bIsIphone = !1
}

function getIOSWindowHeight() {
    return document.documentElement.clientWidth / window.innerWidth * window.innerHeight
}

function getHeightOfIOSToolbars() {
    var a = (0 === window.orientation ? screen.height : screen.width) - getIOSWindowHeight();
    return 1 < a ? a : 0
}

function sizeHandler() {
    window.scrollTo(0, 1);
    if ($("#canvas")) {
        var a = null !== platform.name && "safari" === platform.name.toLowerCase() ? getIOSWindowHeight() : getSize("Height");
        var b = getSize("Width");
        s_bFocus && _checkOrientation(b, a);
        var d = Math.min(a / CANVAS_HEIGHT, b / CANVAS_WIDTH),
            p = Math.round(CANVAS_WIDTH * d);
        d = Math.round(CANVAS_HEIGHT * d);
        if (d < a) {
            var h = a - d;
            d += h;
            p += CANVAS_WIDTH / CANVAS_HEIGHT * h
        } else p < b && (h = b - p, p += h, d += CANVAS_HEIGHT / CANVAS_WIDTH * h);
        h = a / 2 - d / 2;
        var e = b / 2 - p / 2,
            k = CANVAS_WIDTH / p;
        if (e * k < -EDGEBOARD_X ||
            h * k < -EDGEBOARD_Y) d = Math.min(a / (CANVAS_HEIGHT - 2 * EDGEBOARD_Y), b / (CANVAS_WIDTH - 2 * EDGEBOARD_X)), p = Math.round(CANVAS_WIDTH * d), d = Math.round(CANVAS_HEIGHT * d), h = (a - d) / 2, e = (b - p) / 2, k = CANVAS_WIDTH / p;
        s_iOffsetX = -1 * e * k;
        s_iOffsetY = -1 * h * k;
        0 <= h && (s_iOffsetY = 0);
        0 <= e && (s_iOffsetX = 0);
        null !== s_oInterface && s_oInterface.refreshButtonPos(s_iOffsetX, s_iOffsetY);
        null !== s_oMenu && s_oMenu.refreshButtonPos(s_iOffsetX, s_iOffsetY);
        $("#canvas").css("width", p + "px");
        $("#canvas").css("height", d + "px");
        0 > h || (h = (a - d) / 2);
        $("#canvas").css("top",
            h + "px");
        $("#canvas").css("left", e + "px")
    }
}

function _checkOrientation(a, b) {
    s_bMobile && ENABLE_CHECK_ORIENTATION && (a > b ? "landscape" === $(".orientation-msg-container").attr("data-orientation") ? ($(".orientation-msg-container").css("display", "none"), s_oMain.startUpdate()) : ($(".orientation-msg-container").css("display", "block"), s_oMain.stopUpdate()) : "portrait" === $(".orientation-msg-container").attr("data-orientation") ? ($(".orientation-msg-container").css("display", "none"), s_oMain.startUpdate()) : ($(".orientation-msg-container").css("display", "block"),
        s_oMain.stopUpdate()))
}

function createBitmap(a, b, d) {
    var p = new createjs.Bitmap(a),
        h = new createjs.Shape;
    b && d ? h.graphics.beginFill("#fff").drawRect(0, 0, b, d) : h.graphics.beginFill("#ff0").drawRect(0, 0, a.width, a.height);
    p.hitArea = h;
    return p
}

function createSprite(a, b, d, p, h, e) {
    a = null !== b ? new createjs.Sprite(a, b) : new createjs.Sprite(a);
    b = new createjs.Shape;
    b.graphics.beginFill("#000000").drawRect(-d, -p, h, e);
    a.hitArea = b;
    return a
}

function randomFloatBetween(a, b, d) {
    "undefined" === typeof d && (d = 2);
    return parseFloat(Math.min(a + Math.random() * (b - a), b).toFixed(d))
}

function shuffle(a) {
    for (var b = a.length, d, p; 0 !== b;) p = Math.floor(Math.random() * b), --b, d = a[b], a[b] = a[p], a[p] = d;
    return a
}

function formatTime(a) {
    a /= 1E3;
    var b = Math.floor(a / 60);
    a = parseFloat(a - 60 * b).toFixed(1);
    var d = "";
    d = 10 > b ? d + ("0" + b + ":") : d + (b + ":");
    return 10 > a ? d + ("0" + a) : d + a
}

function formatValue(a) {
    return TEXT_CURRENCY + a.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
}
(function() {
    function a(d) {
        var p = {
            focus: "visible",
            focusin: "visible",
            pageshow: "visible",
            blur: "hidden",
            focusout: "hidden",
            pagehide: "hidden"
        };
        d = d || window.event;
        d.type in p ? document.body.className = p[d.type] : (document.body.className = this[b] ? "hidden" : "visible", "hidden" === document.body.className ? (s_oMain.stopUpdate(), s_bFocus = !1) : (s_oMain.startUpdate(), s_bFocus = !0))
    }
    var b = "hidden";
    b in document ? document.addEventListener("visibilitychange", a) : (b = "mozHidden") in document ? document.addEventListener("mozvisibilitychange",
        a) : (b = "webkitHidden") in document ? document.addEventListener("webkitvisibilitychange", a) : (b = "msHidden") in document ? document.addEventListener("msvisibilitychange", a) : "onfocusin" in document ? document.onfocusin = document.onfocusout = a : window.onpageshow = window.onpagehide = window.onfocus = window.onblur = a
})();

function playSound(a, b, d) {
    return !1 === DISABLE_SOUND_MOBILE || !1 === s_bMobile ? (s_aSounds[a].play(), s_aSounds[a].volume(b), s_aSounds[a].loop(d), s_aSounds[a]) : null
}

function stopSound(a) {
    !1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile || s_aSounds[a].stop()
}

function setVolume(a, b) {
    !1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile || s_aSounds[a].volume(b)
}

function setMute(a, b) {
    !1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile || s_aSounds[a].mute(b)
}

function ctlArcadeResume() {
    null !== s_oMain && s_oMain.startUpdate()
}

function ctlArcadePause() {
    null !== s_oMain && s_oMain.stopUpdate()
}

function getParamValue(a) {
    for (var b = window.location.search.substring(1).split("&"), d = 0; d < b.length; d++) {
        var p = b[d].split("=");
        if (p[0] == a) return p[1]
    }
}

function fullscreenHandler() {
    ENABLE_FULLSCREEN && screenfull.isEnabled && (s_bFullscreen = screenfull.isFullscreen, null !== s_oInterface && s_oInterface.resetFullscreenBut(), null !== s_oMenu && s_oMenu.resetFullscreenBut())
}
if (screenfull.isEnabled) screenfull.on("change", function() {
    s_bFullscreen = screenfull.isFullscreen;
    null !== s_oInterface && s_oInterface.resetFullscreenBut();
    null !== s_oMenu && s_oMenu.resetFullscreenBut()
});

function CSpriteLibrary() {
    var a = {},
        b, d, p, h, e, k;
    this.init = function(g, l, c) {
        b = {};
        p = d = 0;
        h = g;
        e = l;
        k = c
    };
    this.addSprite = function(g, l) {
        if (!a.hasOwnProperty(g)) {
            var c = new Image;
            a[g] = b[g] = {
                szPath: l,
                oSprite: c,
                bLoaded: !1
            };
            d++
        }
    };
    this.getSprite = function(g) {
        return a.hasOwnProperty(g) ? a[g].oSprite : null
    };
    this._onSpritesLoaded = function() {
        d = 0;
        e.call(k)
    };
    this._onSpriteLoaded = function() {
        h.call(k);
        ++p === d && this._onSpritesLoaded()
    };
    this.loadSprites = function() {
        for (var g in b) b[g].oSprite.oSpriteLibrary = this, b[g].oSprite.szKey =
            g, b[g].oSprite.onload = function() {
                this.oSpriteLibrary.setLoaded(this.szKey);
                this.oSpriteLibrary._onSpriteLoaded(this.szKey)
            }, b[g].oSprite.onerror = function(l) {
                var c = l.currentTarget;
                setTimeout(function() {
                    b[c.szKey].oSprite.src = b[c.szKey].szPath
                }, 500)
            }, b[g].oSprite.src = b[g].szPath
    };
    this.setLoaded = function(g) {
        a[g].bLoaded = !0
    };
    this.isLoaded = function(g) {
        return a[g].bLoaded
    };
    this.getNumSprites = function() {
        return d
    }
}
var CANVAS_WIDTH = 1600,
    CANVAS_HEIGHT = 640,
    EDGEBOARD_X = 300,
    EDGEBOARD_Y = 0,
    GAME_NOME = "champions_slot",
    FPS = 30,
    FPS_TIME = 1E3 / FPS,
    DISABLE_SOUND_MOBILE = !1,
    SOUNDTRACK_VOLUME_IN_GAME = 1,
    PRIMARY_FONT = "ds-digitalbold",
    SECONDARY_FONT = "impact",
    STATE_LOADING = 0,
    STATE_MENU = 1,
    STATE_HELP = 1,
    STATE_GAME = 3,
    GAME_STATE_IDLE = 0,
    GAME_STATE_SPINNING = 1,
    GAME_STATE_SHOW_ALL_WIN = 2,
    GAME_STATE_SHOW_WIN = 3,
    REEL_STATE_START = 0,
    REEL_STATE_MOVING = 1,
    REEL_STATE_STOP = 2,
    ON_MOUSE_DOWN = 0,
    ON_MOUSE_UP = 1,
    ON_MOUSE_OVER = 2,
    ON_MOUSE_OUT = 3,
    ON_DRAG_START =
    4,
    ON_DRAG_END = 5,
    REEL_OFFSET_X = 445,
    REEL_OFFSET_Y = 100,
    ON_RELEASE_YES = 0,
    ON_RELEASE_NO = 1,
    NUM_REELS = 3,
    NUM_ROWS = 3,
    NUM_SYMBOLS = 8,
    WILD_SYMBOL = 8,
    NUM_PAYLINES = 3,
    SYMBOL_SIZE = 180,
    SYMBOL_ANIM_SIZE = 134,
    SPACE_BETWEEN_SYMBOLS = 88,
    MAX_FRAMES_REEL_EASE = 16,
    MIN_REEL_LOOPS, REEL_DELAY, REEL_START_Y = REEL_OFFSET_Y - 3 * SYMBOL_SIZE,
    REEL_ARRIVAL_Y = REEL_OFFSET_Y + 3 * SYMBOL_SIZE,
    TIME_SHOW_WIN, TIME_SHOW_ALL_WINS, BET, TOTAL_MONEY, WIN_OCCURRENCE, SLOT_CASH, MIN_WIN, ENABLE_FULLSCREEN, ENABLE_CHECK_ORIENTATION, SHOW_CREDITS, AD_SHOW_COUNTER;

function CSlotSettings(a) {
    this._init = function() {
        this._initSymbolSpriteSheets();
        this._initPaylines();
        this._initSymbolAnims();
        this._initSymbolsOccurence()
    };
    this._initSymbolSpriteSheets = function() {
        s_aSymbolData = [];
        for (var b = 1; b < NUM_SYMBOLS + 1; b++) {
            var d = {
                images: [s_oSpriteLibrary.getSprite("symbol_" + b)],
                frames: {
                    width: SYMBOL_SIZE,
                    height: SYMBOL_SIZE,
                    regX: 0,
                    regY: 0
                },
                animations: {
                    "static": [0, 1],
                    moving: [1, 2]
                }
            };
            s_aSymbolData[b] = new createjs.SpriteSheet(d)
        }
    };
    this._initPaylines = function() {
        s_aPaylineCombo = [{
            row: 1,
            col: 0
        }, {
            row: 1,
            col: 1
        }, {
            row: 1,
            col: 2
        }]
    };
    this._initSymbolAnims = function() {
        s_aSymbolAnims = [];
        var b = {
            framerate: 20,
            images: [s_oSpriteLibrary.getSprite("symbol_1_anim")],
            frames: {
                width: SYMBOL_ANIM_SIZE,
                height: SYMBOL_ANIM_SIZE,
                regX: 3,
                regY: -1
            },
            animations: {
                "static": [0, 1],
                anim: [1, 27]
            }
        };
        s_aSymbolAnims[0] = new createjs.SpriteSheet(b);
        b = {
            framerate: 20,
            images: [s_oSpriteLibrary.getSprite("symbol_2_anim")],
            frames: {
                width: SYMBOL_ANIM_SIZE,
                height: SYMBOL_ANIM_SIZE,
                regX: 1,
                regY: 1
            },
            animations: {
                "static": [0, 1],
                anim: [1, 27]
            }
        };
        s_aSymbolAnims[1] =
            new createjs.SpriteSheet(b);
        b = {
            framerate: 20,
            images: [s_oSpriteLibrary.getSprite("symbol_3_anim")],
            frames: {
                width: SYMBOL_ANIM_SIZE,
                height: SYMBOL_ANIM_SIZE,
                regX: 1,
                regY: 1
            },
            animations: {
                "static": [0, 1],
                anim: [1, 27]
            }
        };
        s_aSymbolAnims[2] = new createjs.SpriteSheet(b);
        b = {
            framerate: 20,
            images: [s_oSpriteLibrary.getSprite("symbol_4_anim")],
            frames: {
                width: SYMBOL_ANIM_SIZE,
                height: SYMBOL_ANIM_SIZE,
                regX: 0,
                regY: 3
            },
            animations: {
                "static": [0, 1],
                anim: [1, 27]
            }
        };
        s_aSymbolAnims[3] = new createjs.SpriteSheet(b);
        b = {
            framerate: 20,
            images: [s_oSpriteLibrary.getSprite("symbol_5_anim")],
            frames: {
                width: SYMBOL_ANIM_SIZE,
                height: SYMBOL_ANIM_SIZE,
                regX: -2,
                regY: 0
            },
            animations: {
                "static": [0, 1],
                anim: [1, 29]
            }
        };
        s_aSymbolAnims[4] = new createjs.SpriteSheet(b);
        b = {
            framerate: 20,
            images: [s_oSpriteLibrary.getSprite("symbol_6_anim")],
            frames: {
                width: SYMBOL_ANIM_SIZE,
                height: SYMBOL_ANIM_SIZE,
                regX: -1,
                regY: 0
            },
            animations: {
                "static": [0, 1],
                anim: [1, 29]
            }
        };
        s_aSymbolAnims[5] = new createjs.SpriteSheet(b);
        b = {
            framerate: 20,
            images: [s_oSpriteLibrary.getSprite("symbol_7_anim")],
            frames: {
                width: SYMBOL_ANIM_SIZE,
                height: SYMBOL_ANIM_SIZE,
                regX: 1,
                regY: -1
            },
            animations: {
                "static": [0, 1],
                anim: [1, 29]
            }
        };
        s_aSymbolAnims[6] = new createjs.SpriteSheet(b);
        b = {
            framerate: 20,
            images: [s_oSpriteLibrary.getSprite("symbol_8_anim")],
            frames: {
                width: SYMBOL_ANIM_SIZE,
                height: SYMBOL_ANIM_SIZE,
                regX: 0,
                regY: 0
            },
            animations: {
                "static": [0, 1],
                anim: [1, 24]
            }
        };
        s_aSymbolAnims[7] = new createjs.SpriteSheet(b)
    };
    this._initSymbolsOccurence = function() {
        s_aRandSymbols = [];
        var b;
        for (b = 0; b < SYMBOL_OCCURRENCE[0]; b++) s_aRandSymbols.push(1);
        for (b = 0; b < SYMBOL_OCCURRENCE[1]; b++) s_aRandSymbols.push(2);
        for (b = 0; b < SYMBOL_OCCURRENCE[2]; b++) s_aRandSymbols.push(3);
        for (b = 0; b < SYMBOL_OCCURRENCE[3]; b++) s_aRandSymbols.push(4);
        for (b = 0; b < SYMBOL_OCCURRENCE[4]; b++) s_aRandSymbols.push(5);
        for (b = 0; b < SYMBOL_OCCURRENCE[5]; b++) s_aRandSymbols.push(6);
        for (b = 0; b < SYMBOL_OCCURRENCE[6]; b++) s_aRandSymbols.push(7);
        for (b = 0; b < SYMBOL_OCCURRENCE[7]; b++) s_aRandSymbols.push(8)
    };
    SYMBOL_OCCURRENCE = a.prize_occurrence;
    this._init()
}
var s_aSymbolData, s_aPaylineCombo, s_aSymbolAnims, s_aRandSymbols, SYMBOL_OCCURRENCE, TEXT_PRELOADER_CONTINUE = "START",
    TEXT_RECHARGE = "YOU DON'T HAVE ENOUGH MONEY! RECHARGE?",
    TEXT_ARE_YOU_SURE = "ARE YOU SURE?",
    TEXT_CURRENCY = "$",
    TEXT_CREDIT = "CREDITS",
    TEXT_CURRENT_WIN = "CURRENT WIN",
    TEXT_CURRENT_BET = "CURRENT BET",
    TEXT_ONE_BET = "ONE BET",
    TEXT_MAX_BET = "MAX BET",
    TEXT_SPIN = "SPIN",
    TEXT_DEVELOPED = "DEVELOPED BY",
    TEXT_SHARE_IMAGE = "200x200.jpg",
    TEXT_SHARE_TITLE = "Congratulations!",
    TEXT_SHARE_MSG1 = "You collected <strong>",
    TEXT_SHARE_MSG2 = " points</strong>!<br><br>Share your score with your friends!",
    TEXT_SHARE_SHARE1 = "My score is ",
    TEXT_SHARE_SHARE2 = " points! Can you do better";

function CPreloader() {
    var a, b, d, p, h, e, k, g, l, c;
    this._init = function() {
        s_oSpriteLibrary.init(this._onImagesLoaded, this._onAllImagesLoaded, this);
        s_oSpriteLibrary.addSprite("progress_bar", "./sprites/progress_bar.png");
        s_oSpriteLibrary.addSprite("200x200", "./sprites/200x200.jpg");
        s_oSpriteLibrary.addSprite("but_start", "./sprites/but_start.png");
        s_oSpriteLibrary.loadSprites();
        c = new createjs.Container;
        s_oStage.addChild(c)
    };
    this.unload = function() {
        c.removeAllChildren();
        l.unload()
    };
    this._onImagesLoaded = function() {};
    this._onAllImagesLoaded = function() {
        this.attachSprites();
        s_oMain.preloaderReady()
    };
    this.attachSprites = function() {
        var q = new createjs.Shape;
        q.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        c.addChild(q);
        q = s_oSpriteLibrary.getSprite("200x200");
        k = createBitmap(q);
        k.regX = .5 * q.width;
        k.regY = .5 * q.height;
        k.x = CANVAS_WIDTH / 2;
        k.y = CANVAS_HEIGHT / 2 - 180;
        c.addChild(k);
        g = new createjs.Shape;
        g.graphics.beginFill("rgba(0,0,0,0.01)").drawRoundRect(k.x - 100, k.y - 100, 200, 200, 10);
        c.addChild(g);
        k.mask = g;
        q = s_oSpriteLibrary.getSprite("progress_bar");
        p = createBitmap(q);
        p.x = CANVAS_WIDTH / 2 - q.width / 2;
        p.y = CANVAS_HEIGHT / 2 + 50;
        c.addChild(p);
        a = q.width;
        b = q.height;
        h = new createjs.Shape;
        h.graphics.beginFill("rgba(0,0,0,0.01)").drawRect(p.x, p.y, 1, b);
        c.addChild(h);
        p.mask = h;
        d = new createjs.Text("", "40px " + PRIMARY_FONT, "#fff");
        d.x = CANVAS_WIDTH / 2;
        d.y = CANVAS_HEIGHT / 2 + 110;
        d.textBaseline = "alphabetic";
        d.textAlign = "center";
        c.addChild(d);
        q = s_oSpriteLibrary.getSprite("but_start");
        l = new CTextButton(CANVAS_WIDTH / 2, CANVAS_HEIGHT /
            2, q, TEXT_PRELOADER_CONTINUE, "Arial", "#000", " 50", c);
        l.addEventListener(ON_MOUSE_UP, this._onButStartRelease, this);
        l.setVisible(!1);
        e = new createjs.Shape;
        e.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        c.addChild(e);
        createjs.Tween.get(e).to({
            alpha: 0
        }, 500).call(function() {
            createjs.Tween.removeTweens(e);
            c.removeChild(e)
        })
    };
    this._onButStartRelease = function() {
        s_oMain.onRemovePreloader()
    };
    this.refreshLoader = function(q) {
        d.text = q + "%";
        100 === q && (s_oMain.onRemovePreloader(), d.visible = !1,
            p.visible = !1);
        h.graphics.clear();
        q = Math.floor(q * a / 100);
        h.graphics.beginFill("rgba(0,0,0,0.01)").drawRect(p.x, p.y, q, b)
    };
    this._init()
}

function CMain(a) {
    var b, d = 0,
        p = 0,
        h = STATE_LOADING,
        e, k;
    this.initContainer = function() {
        var l = document.getElementById("canvas");
        s_oStage = new createjs.Stage(l);
        createjs.Touch.enable(s_oStage, !0);
        s_bMobile = isMobile();
        !1 === s_bMobile && s_oStage.enableMouseOver(20);
        s_iPrevTime = (new Date).getTime();
        createjs.Ticker.addEventListener("tick", this._update);
        createjs.Ticker.framerate = FPS;
        navigator.userAgent.match(/Windows Phone/i) && (DISABLE_SOUND_MOBILE = !0);
        s_oSpriteLibrary = new CSpriteLibrary;
        seekAndDestroy() ? e = new CPreloader :
            window.location.href = "http://www.codethislab.com/contact-us.html"
    };
    this.preloaderReady = function() {
        !1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile || this._initSounds();
        this._loadImages();
        b = !0
    };
    this.soundLoaded = function() {
        d++;
        e.refreshLoader(Math.floor(d / p * 100))
    };
    this._initSounds = function() {
        Howler.mute(!s_bAudioActive);
        s_aSoundsInfo = [];
        s_aSoundsInfo.push({
            path: "./sounds/",
            filename: "press_but",
            loop: !1,
            volume: 1,
            ingamename: "click"
        });
        s_aSoundsInfo.push({
            path: "./sounds/",
            filename: "start_reel",
            loop: !1,
            volume: 1,
            ingamename: "start_reel"
        });
        s_aSoundsInfo.push({
            path: "./sounds/",
            filename: "reel_stop",
            loop: !1,
            volume: 1,
            ingamename: "reel_stop"
        });
        s_aSoundsInfo.push({
            path: "./sounds/",
            filename: "win",
            loop: !1,
            volume: 1,
            ingamename: "win"
        });
        s_aSoundsInfo.push({
            path: "./sounds/",
            filename: "reels",
            loop: !1,
            volume: 1,
            ingamename: "reels"
        });
        p += s_aSoundsInfo.length;
        s_aSounds = [];
        for (var l = 0; l < s_aSoundsInfo.length; l++) this.tryToLoadSound(s_aSoundsInfo[l], !1)
    };
    this.tryToLoadSound = function(l, c) {
        setTimeout(function() {
            s_aSounds[l.ingamename] =
                new Howl({
                    src: [l.path + l.filename + ".mp3"],
                    autoplay: !1,
                    preload: !0,
                    loop: l.loop,
                    volume: l.volume,
                    onload: s_oMain.soundLoaded,
                    onloaderror: function(q, v) {
                        for (var m = 0; m < s_aSoundsInfo.length; m++)
                            if (q === s_aSounds[s_aSoundsInfo[m].ingamename]._sounds[0]._id) {
                                s_oMain.tryToLoadSound(s_aSoundsInfo[m], !0);
                                break
                            }
                    },
                    onplayerror: function(q) {
                        for (var v = 0; v < s_aSoundsInfo.length; v++)
                            if (q === s_aSounds[s_aSoundsInfo[v].ingamename]._sounds[0]._id) {
                                s_aSounds[s_aSoundsInfo[v].ingamename].once("unlock", function() {
                                    s_aSounds[s_aSoundsInfo[v].ingamename].play();
                                    "soundtrack" === s_aSoundsInfo[v].ingamename && null !== s_oGame && setVolume("soundtrack", SOUNDTRACK_VOLUME_IN_GAME)
                                });
                                break
                            }
                    }
                })
        }, c ? 200 : 0)
    };
    this._loadImages = function() {
        s_oSpriteLibrary.init(this._onImagesLoaded, this._onAllImagesLoaded, this);
        s_oSpriteLibrary.addSprite("but_bg", "./sprites/but_play_bg.png");
        s_oSpriteLibrary.addSprite("but_exit", "./sprites/but_exit.png");
        s_oSpriteLibrary.addSprite("bg_menu", "./sprites/bg_menu.jpg");
        s_oSpriteLibrary.addSprite("bg_game", "./sprites/bg_game.jpg");
        s_oSpriteLibrary.addSprite("max_bet",
            "./sprites/max_bet.png");
        s_oSpriteLibrary.addSprite("bet_one", "./sprites/bet_one.png");
        s_oSpriteLibrary.addSprite("current_bet", "./sprites/current_bet.png");
        s_oSpriteLibrary.addSprite("bet_display", "./sprites/bet_display.png");
        s_oSpriteLibrary.addSprite("but_right", "./sprites/but_right.png");
        s_oSpriteLibrary.addSprite("but_left", "./sprites/but_left.png");
        s_oSpriteLibrary.addSprite("spin", "./sprites/spin.png");
        s_oSpriteLibrary.addSprite("audio_icon", "./sprites/audio_icon.png");
        s_oSpriteLibrary.addSprite("highlight",
            "./sprites/highlight.png");
        for (var l = 1; l < NUM_SYMBOLS + 1; l++) s_oSpriteLibrary.addSprite("symbol_" + l, "./sprites/symbol_" + l + ".png"), s_oSpriteLibrary.addSprite("symbol_" + l + "_anim", "./sprites/symbol_" + l + "_anim.png"), s_oSpriteLibrary.addSprite("paytable_symbol_" + l, "./sprites/paytable_symbol_" + l + ".png");
        s_oSpriteLibrary.addSprite("payline", "./sprites/payline.png");
        s_oSpriteLibrary.addSprite("but_credits", "./sprites/but_credits.png");
        s_oSpriteLibrary.addSprite("but_fullscreen", "./sprites/but_fullscreen.png");
        s_oSpriteLibrary.addSprite("msg_box", "./sprites/msg_box.png");
        s_oSpriteLibrary.addSprite("logo_ctl", "./sprites/logo_ctl.png");
        s_oSpriteLibrary.addSprite("but_yes", "./sprites/but_yes.png");
        s_oSpriteLibrary.addSprite("but_config", "./sprites/but_config.png");
        p += s_oSpriteLibrary.getNumSprites();
        s_oSpriteLibrary.loadSprites()
    };
    this._onImagesLoaded = function() {
        d++;
        e.refreshLoader(Math.floor(d / p * 100))
    };
    this._onAllImagesLoaded = function() {};
    this.onRemovePreloader = function() {
        new CSlotSettings(a);
        e.unload();
        this.gotoMenu()
    };
    this.gotoMenu = function() {
        new CMenu;
        h = STATE_MENU
    };
    this.gotoGame = function() {
        k = new CGame(g);
        h = STATE_GAME
    };
    this.gotoHelp = function() {
        new CHelp;
        h = STATE_HELP
    };
    this.stopUpdate = function() {
        b = !1;
        createjs.Ticker.paused = !0;
        $("#block_game").css("display", "block");
        !1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile || Howler.mute(!0)
    };
    this.startUpdate = function() {
        s_iPrevTime = (new Date).getTime();
        b = !0;
        createjs.Ticker.paused = !1;
        $("#block_game").css("display", "none");
        (!1 === DISABLE_SOUND_MOBILE || !1 === s_bMobile) &&
        s_bAudioActive && Howler.mute(!1)
    };
    this._update = function(l) {
        if (!1 !== b) {
            var c = (new Date).getTime();
            s_iTimeElaps = c - s_iPrevTime;
            s_iCntTime += s_iTimeElaps;
            s_iCntFps++;
            s_iPrevTime = c;
            1E3 <= s_iCntTime && (s_iCurFps = s_iCntFps, s_iCntTime -= 1E3, s_iCntFps = 0);
            h === STATE_GAME && k.update();
            s_oStage.update(l)
        }
    };
    s_oMain = this;
    var g = a;
    ENABLE_CHECK_ORIENTATION = a.check_orientation;
    SHOW_CREDITS = g.show_credits;
    ENABLE_FULLSCREEN = a.fullscreen;
    s_bAudioActive = a.audio_enable_on_startup;
    this.initContainer()
}
var s_bMobile, s_bAudioActive = !1,
    s_bFullscreen = !1,
    s_iCntTime = 0,
    s_iTimeElaps = 0,
    s_iPrevTime = 0,
    s_iCntFps = 0,
    s_iCurFps = 0,
    s_oDrawLayer, s_oStage, s_oMain, s_oSpriteLibrary, s_aSoundsInfo, s_aSounds;

function CTextButton(a, b, d, p, h, e, k, g) {
    var l, c, q, v, m, t, u, z, G, E, r, C;
    this._init = function(B, w, x, M, f, A, H) {
        l = !1;
        c = 1;
        m = [];
        t = [];
        C = createBitmap(x);
        q = x.width;
        v = x.height;
        E = new createjs.Container;
        E.x = B;
        E.y = w;
        E.regX = x.width / 2;
        E.regY = x.height / 2;
        s_bMobile || (E.cursor = "pointer");
        E.addChild(C, r);
        g.addChild(E);
        r = new CTLText(E, 10, 6, x.width - 20, x.height - 10, H, "center", A, f, 1, 0, 0, M, !0, !0, !1, !1);
        this._initListener()
    };
    this.unload = function() {
        E.off("mousedown", u);
        E.off("pressup", z);
        g.removeChild(E)
    };
    this.setVisible = function(B) {
        E.visible =
            B
    };
    this.setAlign = function(B) {
        r.textAlign = B
    };
    this.setTextX = function(B) {
        r.x = B
    };
    this.setScale = function(B) {
        c = E.scaleX = E.scaleY = B
    };
    this.enable = function() {
        l = !1;
        E.filters = [];
        E.cache(0, 0, q, v)
    };
    this.disable = function() {
        l = !0;
        try {
            var B = (new createjs.ColorMatrix).adjustSaturation(-100);
            E.filters = [new createjs.ColorMatrixFilter(B)];
            E.cache(0, 0, q, v)
        } catch (w) {}
    };
    this._initListener = function() {
        u = E.on("mousedown", this.buttonDown);
        z = E.on("pressup", this.buttonRelease)
    };
    this.addEventListener = function(B, w, x) {
        m[B] = w;
        t[B] =
            x
    };
    this.addEventListenerWithParams = function(B, w, x, M) {
        m[B] = w;
        t[B] = x;
        G = M
    };
    this.buttonRelease = function() {
        l || (playSound("click", 1, !1), E.scaleX = c, E.scaleY = c, m[ON_MOUSE_UP] && m[ON_MOUSE_UP].call(t[ON_MOUSE_UP], G))
    };
    this.buttonDown = function() {
        l || (E.scaleX = .9 * c, E.scaleY = .9 * c, m[ON_MOUSE_DOWN] && m[ON_MOUSE_DOWN].call(t[ON_MOUSE_DOWN]))
    };
    this.setPosition = function(B, w) {
        E.x = B;
        E.y = w
    };
    this.tweenPosition = function(B, w, x, M, f, A, H) {
        createjs.Tween.get(E).wait(M).to({
            x: B,
            y: w
        }, x, f).call(function() {
            void 0 !== A && A.call(H)
        })
    };
    this.changeText = function(B) {
        r.refreshText(B)
    };
    this.setX = function(B) {
        E.x = B
    };
    this.setY = function(B) {
        E.y = B
    };
    this.getButtonImage = function() {
        return E
    };
    this.getX = function() {
        return E.x
    };
    this.getY = function() {
        return E.y
    };
    this.getSprite = function() {
        return E
    };
    this.getScale = function() {
        return E.scaleX
    };
    this._init(a, b, d, p, h, e, k)
}

function CGfxButton(a, b, d, p) {
    var h, e, k, g, l, c = [],
        q, v, m;
    this._init = function(u, z, G) {
        h = !1;
        g = [];
        l = [];
        e = G.width;
        k = G.height;
        m = createBitmap(G);
        m.x = u;
        m.y = z;
        m.regX = G.width / 2;
        m.regY = G.height / 2;
        m.cursor = "pointer";
        t.addChild(m);
        this._initListener()
    };
    this.unload = function() {
        m.off("mousedown", q);
        m.off("pressup", v);
        t.removeChild(m)
    };
    this.setVisible = function(u) {
        m.visible = u
    };
    this._initListener = function() {
        q = m.on("mousedown", this.buttonDown);
        v = m.on("pressup", this.buttonRelease)
    };
    this.addEventListener = function(u, z, G) {
        g[u] =
            z;
        l[u] = G
    };
    this.addEventListenerWithParams = function(u, z, G, E) {
        g[u] = z;
        l[u] = G;
        c = E
    };
    this.buttonRelease = function() {
        h || (playSound("click", 1, !1), g[ON_MOUSE_UP] && g[ON_MOUSE_UP].call(l[ON_MOUSE_UP], c))
    };
    this.buttonDown = function() {
        h || g[ON_MOUSE_DOWN] && g[ON_MOUSE_DOWN].call(l[ON_MOUSE_DOWN], c)
    };
    this.setPosition = function(u, z) {
        m.x = u;
        m.y = z
    };
    this.setX = function(u) {
        m.x = u
    };
    this.setY = function(u) {
        m.y = u
    };
    this.enable = function() {
        h = !1;
        m.filters = [];
        m.cache(0, 0, e, k)
    };
    this.disable = function() {
        h = !0;
        try {
            var u = (new createjs.ColorMatrix).adjustSaturation(-100);
            m.filters = [new createjs.ColorMatrixFilter(u)];
            m.cache(0, 0, e, k)
        } catch (z) {}
    };
    this.getButtonImage = function() {
        return m
    };
    this.getX = function() {
        return m.x
    };
    this.getY = function() {
        return m.y
    };
    this.setLabel = function(u) {
        var z = b + 30,
            G = new CTLText(t, a - 60, z - 25, 120, 50, 24, "center", "#fff", SECONDARY_FONT, 1, 2, 2, u, !0, !0, !1, !1);
        G.setOutline(4);
        G = new CTLText(t, a - 60, z - 25, 120, 50, 24, "center", "#000", SECONDARY_FONT, 1, 2, 2, u, !0, !0, !1, !1);
        G.setOutline(2);
        new CTLText(t, a - 60, z - 25, 120, 50, 24, "center", "#f52322", SECONDARY_FONT, 1, 2, 2,
            u, !0, !0, !1, !1)
    };
    var t = p;
    this._init(a, b, d);
    return this
}

function CToggle(a, b, d, p, h) {
    var e, k, g, l, c, q;
    this._init = function(v, m, t, u, z) {
        k = [];
        g = [];
        var G = new createjs.SpriteSheet({
            images: [t],
            frames: {
                width: t.width / 2,
                height: t.height,
                regX: t.width / 2 / 2,
                regY: t.height / 2
            },
            animations: {
                state_true: [0],
                state_false: [1]
            }
        });
        e = u;
        q = createSprite(G, "state_" + e, t.width / 2 / 2, t.height / 2, t.width / 2, t.height);
        q.x = v;
        q.y = m;
        q.stop();
        q.cursor = "pointer";
        z.addChild(q);
        this._initListener()
    };
    this.unload = function() {
        q.off("mousedown", l);
        q.off("pressup", c);
        h.removeChild(q)
    };
    this._initListener = function() {
        l =
            q.on("mousedown", this.buttonDown);
        c = q.on("pressup", this.buttonRelease)
    };
    this.addEventListener = function(v, m, t) {
        k[v] = m;
        g[v] = t
    };
    this.setActive = function(v) {
        e = v;
        q.gotoAndStop("state_" + e)
    };
    this.buttonRelease = function() {
        q.scaleX = 1;
        q.scaleY = 1;
        playSound("click", 1, !1);
        e = !e;
        q.gotoAndStop("state_" + e);
        k[ON_MOUSE_UP] && k[ON_MOUSE_UP].call(g[ON_MOUSE_UP], e)
    };
    this.buttonDown = function() {
        q.scaleX = .9;
        q.scaleY = .9;
        k[ON_MOUSE_DOWN] && k[ON_MOUSE_DOWN].call(g[ON_MOUSE_DOWN])
    };
    this.setPosition = function(v, m) {
        q.x = v;
        q.y = m
    };
    this.getButtonImage =
        function() {
            return q
        };
    this._init(a, b, d, p, h)
}

function CSpinButton(a, b, d, p) {
    var h, e, k, g = [],
        l, c;
    this._init = function(q, v, m) {
        c = p;
        h = !1;
        e = [];
        k = [];
        var t = new createjs.SpriteSheet({
            images: [m],
            frames: {
                width: m.width / 7,
                height: m.height / 3,
                regX: m.width / 7 / 2,
                regY: m.height / 3 / 2
            },
            animations: {
                idle: [0, 20, "stop"],
                stop: [0, 0]
            }
        });
        l = createSprite(t, "idle", m.width / 7 / 2, m.height / 3 / 2, m.width / 7, m.height / 3);
        l.gotoAndStop("idle");
        l.x = q;
        l.y = v;
        l.cursor = "pointer";
        c.addChild(l);
        this._initListener()
    };
    this.unload = function() {
        l.removeAllEventListeners();
        p.removeChild(l)
    };
    this.enable =
        function() {
            h = !1
        };
    this.disable = function() {
        h = !0
    };
    this.setVisible = function(q) {
        l.visible = q
    };
    this._initListener = function() {
        l.on("mousedown", this.buttonDown);
        l.on("pressup", this.buttonRelease)
    };
    this.addEventListener = function(q, v, m) {
        e[q] = v;
        k[q] = m
    };
    this.addEventListenerWithParams = function(q, v, m, t) {
        e[q] = v;
        k[q] = m;
        g = t
    };
    this.buttonRelease = function() {
        h || (playSound("click", 1, !1), l.gotoAndPlay("idle"), e[ON_MOUSE_UP] && e[ON_MOUSE_UP].call(k[ON_MOUSE_UP], g))
    };
    this.buttonDown = function() {
        h || e[ON_MOUSE_DOWN] && e[ON_MOUSE_DOWN].call(k[ON_MOUSE_DOWN],
            g)
    };
    this.setPosition = function(q, v) {
        l.x = q;
        l.y = v
    };
    this.setX = function(q) {
        l.x = q
    };
    this.setY = function(q) {
        l.y = q
    };
    this.getButtonImage = function() {
        return l
    };
    this.getX = function() {
        return l.x
    };
    this.getY = function() {
        return l.y
    };
    this.setLabel = function(q) {
        var v = b + 134,
            m = new CTLText(c, a - 60, v - 25, 120, 50, 24, "center", "#fff", SECONDARY_FONT, 1, 2, 2, q, !0, !0, !1, !1);
        m.setOutline(4);
        m = new CTLText(c, a - 60, v - 25, 120, 50, 24, "center", "#000", SECONDARY_FONT, 1, 2, 2, q, !0, !0, !1, !1);
        m.setOutline(2);
        new CTLText(c, a - 60, v - 25, 120, 50, 24, "center",
            "#f52322", SECONDARY_FONT, 1, 2, 2, q, !0, !0, !1, !1)
    };
    this._init(a, b, d);
    return this
}

function CMenu() {
    var a, b, d, p, h, e, k, g, l, c, q, v, m = null,
        t = null;
    this._init = function() {
        k = createBitmap(s_oSpriteLibrary.getSprite("bg_menu"));
        s_oStage.addChild(k);
        var u = s_oSpriteLibrary.getSprite("but_bg");
        g = new CGfxButton(CANVAS_WIDTH / 2, CANVAS_HEIGHT - 164, u, s_oStage);
        g.addEventListener(ON_MOUSE_UP, this._onButPlayRelease, this);
        if (!1 === DISABLE_SOUND_MOBILE || !1 === s_bMobile) u = s_oSpriteLibrary.getSprite("audio_icon"), h = CANVAS_WIDTH - u.width / 4 - 10, e = u.height / 2 + 10, l = new CToggle(h, e, u, s_bAudioActive, s_oStage), l.addEventListener(ON_MOUSE_UP,
            this._onAudioToggle, this);
        SHOW_CREDITS ? (u = s_oSpriteLibrary.getSprite("but_credits"), d = u.height / 2 + 10, p = u.height / 2 + 10, c = new CGfxButton(d, p, u, s_oStage), c.addEventListener(ON_MOUSE_UP, this._onButCreditsRelease, this), a = d + u.width + 10, b = p) : (a = u.height / 2 + 10, b = u.height / 2 + 10);
        u = window.document;
        var z = u.documentElement;
        m = z.requestFullscreen || z.mozRequestFullScreen || z.webkitRequestFullScreen || z.msRequestFullscreen;
        t = u.exitFullscreen || u.mozCancelFullScreen || u.webkitExitFullscreen || u.msExitFullscreen;
        !1 === ENABLE_FULLSCREEN &&
            (m = !1);
        m && screenfull.isEnabled && (u = s_oSpriteLibrary.getSprite("but_fullscreen"), q = new CToggle(a, b, u, s_bFullscreen, s_oStage), q.addEventListener(ON_MOUSE_UP, this._onFullscreenRelease, this));
        v = new createjs.Shape;
        v.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        s_oStage.addChild(v);
        createjs.Tween.get(v).to({
            alpha: 0
        }, 400).call(function() {
            v.visible = !1
        });
        this.refreshButtonPos(s_iOffsetX, s_iOffsetY)
    };
    this.unload = function() {
        g.unload();
        g = null;
        if (!1 === DISABLE_SOUND_MOBILE || !1 === s_bMobile) l.unload(),
            l = null;
        SHOW_CREDITS && c.unload();
        m && screenfull.isEnabled && q.unload();
        s_oStage.removeAllChildren();
        s_oMenu = null
    };
    this.refreshButtonPos = function(u, z) {
        !1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile || l.setPosition(h - u, z + e);
        m && screenfull.isEnabled && q.setPosition(a + u, b + z);
        SHOW_CREDITS && c.setPosition(d + u, p + z)
    };
    this._onButPlayRelease = function() {
        this.unload();
        s_oMain.gotoGame();
        $(s_oMain).trigger("start_session")
    };
    this._onAudioToggle = function() {
        Howler.mute(s_bAudioActive);
        s_bAudioActive = !s_bAudioActive
    };
    this._onButCreditsRelease =
        function() {
            new CCreditsPanel
        };
    this.resetFullscreenBut = function() {
        m && screenfull.isEnabled && q.setActive(s_bFullscreen)
    };
    this._onFullscreenRelease = function() {
        s_bFullscreen ? t.call(window.document) : m.call(window.document.documentElement);
        sizeHandler()
    };
    s_oMenu = this;
    this._init()
}
var s_oMenu = null;

function CGame(a) {
    var b = !1,
        d, p, h, e, k, g, l, c, q, v, m, t, u, z, G, E, r, C, B = null,
        w, x, M;
    this._init = function() {
        d = GAME_STATE_IDLE;
        e = p = 0;
        G = [0, 1, 2, 3, 4];
        h = G[0];
        k = 1;
        q = TOTAL_MONEY;
        l = BET[0];
        c = l * k;
        m = 0;
        s_oTweenController = new CTweenController;
        r = createBitmap(s_oSpriteLibrary.getSprite("bg_game"));
        s_oStage.addChild(r);
        var f = new createjs.Shape;
        f.graphics.beginFill("rgba(255,0,0,0.01)").drawRect(440, 269, 720, 197);
        w = new createjs.Container;
        w.mask = f;
        s_oStage.addChild(w);
        this._initReels();
        C = new CInterface(l, c, q);
        this._initStaticSymbols();
        B = new CPayTablePanel;
        B.show();
        B.highlightColBg(0);
        x = new CMsgBox(s_oStage);
        x.addEventListener(ON_RELEASE_YES, this.onRecharge, this);
        M = new CMsgBox(s_oStage);
        M.addEventListener(ON_RELEASE_YES, this.onExit, this);
        q < BET[0] && x.show(TEXT_RECHARGE);
        b = !0
    };
    this.unload = function() {
        stopSound("reels");
        C.unload();
        B.unload();
        for (var f = 0; f < t.length; f++) t[f].unload();
        for (f = 0; f < NUM_ROWS; f++)
            for (var A = 0; A < NUM_REELS; A++) u[f][A].unload();
        s_oStage.removeAllChildren()
    };
    this._initReels = function() {
        var f = REEL_OFFSET_X,
            A = REEL_OFFSET_Y,
            H = 0;
        t = [];
        for (var I = 0; I < NUM_REELS; I++) t[I] = new CReelColumn(I, f, A, H, w), t[I + NUM_REELS] = new CReelColumn(I + NUM_REELS, f, A + SYMBOL_SIZE * NUM_ROWS, H, w), f += SYMBOL_SIZE + SPACE_BETWEEN_SYMBOLS, H += REEL_DELAY
    };
    this._initStaticSymbols = function() {
        var f = REEL_OFFSET_X,
            A = REEL_OFFSET_Y;
        u = [];
        for (var H = 0; H < NUM_ROWS; H++) {
            u[H] = [];
            for (var I = 0; I < NUM_REELS; I++) {
                var P = new CStaticSymbolCell(H, I, f, A, w);
                u[H][I] = P;
                f += SYMBOL_SIZE + SPACE_BETWEEN_SYMBOLS
            }
            f = REEL_OFFSET_X;
            A += SYMBOL_SIZE
        }
    };
    this.generateFinalSymbols = function() {
        E = [];
        for (var f =
                0; f < NUM_ROWS; f++) {
            E[f] = [];
            for (var A = 0; A < NUM_REELS; A++) E[f][A] = s_aRandSymbols[Math.floor(Math.random() * s_aRandSymbols.length)]
        }
        z = [];
        v = 0;
        f = s_aPaylineCombo;
        A = [];
        var H = E[f[0].row][f[0].col],
            I = 1;
        A.push({
            row: f[0].row,
            col: f[0].col,
            value: E[f[0].row][f[0].col]
        });
        for (var P = 1; P < f.length; P++)
            if (E[f[P].row][f[P].col] === H) I++, A.push({
                row: f[P].row,
                col: f[P].col,
                value: E[f[P].row][f[P].col]
            });
            else break;
        2 < I && (v += s_aSymbolWin[H - 1], z.push({
            line: 1,
            amount: s_aSymbolWin[H - 1],
            num_win: I,
            value: H,
            list: A
        }));
        return 0 < z.length ?
            !0 : !1
    };
    this._generateRandSymbols = function() {
        for (var f = [], A = 0; A < NUM_ROWS; A++) f[A] = s_aRandSymbols[Math.floor(Math.random() * s_aRandSymbols.length)];
        return f
    };
    this.reelArrived = function(f, A) {
        if (p > MIN_REEL_LOOPS)
            if (h === A) {
                if (!1 === t[f].isReadyToStop()) {
                    var H = f;
                    f < NUM_REELS ? (H += NUM_REELS, t[H].setReadyToStop(), t[f].restart([E[0][f], E[1][f], E[2][f]], !0)) : (H -= NUM_REELS, t[H].setReadyToStop(), t[f].restart([E[0][H], E[1][H], E[2][H]], !0))
                }
            } else t[f].restart(this._generateRandSymbols(), !1);
        else t[f].restart(this._generateRandSymbols(), !1), 0 === f && p++
    };
    this.stopNextReel = function() {
        e++;
        0 === e % 2 && (playSound("reel_stop", 1, !1), h = G[e / 2], e === 2 * NUM_REELS && this._endReelAnimation())
    };
    this.tryShowAd = function() {
        m++;
        m === AD_SHOW_COUNTER && (m = 0, $(s_oMain).trigger("show_interlevel_ad"))
    };
    this._endReelAnimation = function() {
        stopSound("reels");
        e = p = 0;
        h = G[0];
        if (0 < z.length) {
            for (var f = 0; f < z.length; f++) {
                B.highlightCombo(z[f].value - 1, k - 1);
                for (var A = z[f].list, H = 0; H < A.length; H++) u[A[H].row][A[H].col].show(A[H].value)
            }
            0 < v && (C.refreshMoney(q), C.refreshWinText(v));
            d = GAME_STATE_SHOW_WIN;
            for (f = 0; f < t.length; f++) t[f].hide();
            playSound("win", .3, !1)
        } else {
            for (f = 0; f < t.length; f++) t[f].show();
            d = GAME_STATE_IDLE
        }
        C.enableGuiButtons();
        q < c && C.disableSpin()
    };
    this.hidePayTable = function() {
        B.hide()
    };
    this._showWin = function() {
        if (0 < g)
            for (var f = z[g - 1].list, A = 0; A < f.length; A++) u[f[A].row][f[A].col].stopAnim();
        g === z.length && (g = 0);
        f = z[g].list;
        for (A = 0; A < f.length; A++) u[f[A].row][f[A].col].show(f[A].value);
        g++
    };
    this._hideAllWins = function() {
        for (var f = 0; f < z.length; f++)
            for (var A = z[f].list,
                    H = 0; H < A.length; H++) u[A[H].row][A[H].col].stopAnim();
        C.hideAllLines();
        g = 0;
        d = GAME_STATE_SHOW_WIN
    };
    this.activateLines = function(f) {
        k = f;
        this.removeWinShowing();
        c = f = l * k;
        C.refreshTotalBet(c);
        B.highlightColBg(k - 1);
        f > q ? C.disableSpin() : C.enableSpin()
    };
    this.addLine = function() {
        k === NUM_PAYLINES ? k = 1 : k++;
        var f = l * k;
        c = f;
        C.refreshTotalBet(c);
        B.highlightColBg(k - 1);
        f > q ? C.disableSpin() : C.enableSpin()
    };
    this.changeCoinBet = function(f) {
        for (var A, H = 0; H < BET.length; H++) BET[H] === l && (A = H);
        "add" === f ? A !== BET.length - 1 && BET[A + 1] <=
            q ? A++ : A = 0 : 0 !== A ? A-- : BET[BET.length - 1] <= q && 0 === A && (A = BET.length - 1);
        l = BET[A];
        c = k * l;
        C.refreshBet(l);
        C.refreshTotalBet(c)
    };
    this.onMaxBet = function() {
        var f = BET[BET.length - 1];
        k = NUM_PAYLINES;
        f *= k;
        l = BET[BET.length - 1];
        c = f;
        C.refreshBet(l);
        C.refreshTotalBet(c);
        B.highlightColBg(k - 1);
        f > q ? C.disableSpin() : (C.enableSpin(), this.onSpin())
    };
    this.removeWinShowing = function() {
        B.resetHighlightCombo();
        B.highlightColBg(k - 1);
        C.resetWin();
        for (var f = 0; f < NUM_ROWS; f++)
            for (var A = 0; A < NUM_REELS; A++) u[f][A].hide();
        for (f = 0; f < t.length; f++) t[f].activate(),
            t[f].show();
        d = GAME_STATE_IDLE
    };
    this.onSpin = function() {
        if (q < BET[0]) x.show(TEXT_RECHARGE);
        else {
            playSound("reels", 1, !1);
            this.removeWinShowing();
            q -= c;
            C.refreshMoney(q);
            SLOT_CASH += c;
            $(s_oMain).trigger("bet_placed", {
                bet: l,
                tot_bet: c
            });
            MIN_WIN = s_aSymbolWin[0];
            for (var f = 0; f < s_aSymbolWin.length; f++) s_aSymbolWin[f] < MIN_WIN && (MIN_WIN = s_aSymbolWin[f]);
            MIN_WIN *= k * l;
            if (SLOT_CASH < MIN_WIN) {
                do f = this.generateFinalSymbols(); while (!0 === f)
            } else if (Math.floor(101 * Math.random()) > WIN_OCCURRENCE) {
                do f = this.generateFinalSymbols();
                while (!0 === f)
            } else {
                do f = this.generateFinalSymbols(); while (!1 === f || v * k > SLOT_CASH)
            }
            v *= l * k;
            q += v;
            SLOT_CASH -= v;
            $(s_oMain).trigger("save_score", [q]);
            C.disableGuiButtons();
            d = GAME_STATE_SPINNING;
            this.tryShowAd()
        }
    };
    this.onInfoClicked = function() {
        d !== GAME_STATE_SPINNING && (B.isVisible() ? B.hide() : B.show())
    };
    this.onExit = function() {
        this.unload();
        $(s_oMain).trigger("share_event", [q]);
        $(s_oMain).trigger("end_session");
        $(s_oMain).trigger("show_interlevel_ad");
        s_oMain.gotoMenu()
    };
    this.getState = function() {
        return d
    };
    this.onShowSafePanel = function() {
        M.show(TEXT_ARE_YOU_SURE)
    };
    this.onRecharge = function() {
        $(s_oMain).trigger("recharge")
    };
    this.setMoney = function(f) {
        q = f;
        C.refreshMoney(q);
        x.hide()
    };
    this.update = function() {
        if (!1 !== b) switch (d) {
            case GAME_STATE_SPINNING:
                for (var f = 0; f < t.length; f++) t[f].update()
        }
    };
    s_oGame = this;
    WIN_OCCURRENCE = a.win_occurrence;
    MIN_REEL_LOOPS = a.min_reel_loop;
    REEL_DELAY = a.reel_delay;
    TIME_SHOW_ALL_WINS = a.time_show_all_wins;
    TOTAL_MONEY = a.money;
    SLOT_CASH = a.slot_cash;
    BET = a.bet;
    s_aSymbolWin = a.prize_amount;
    SYMBOL_OCCURRENCE = a.prize_occurrence;
    AD_SHOW_COUNTER = a.ad_show_counter;
    this._init()
}
var s_oGame, s_oTweenController, s_aSymbolWin;

function CReelColumn(a, b, d, p, h) {
    var e, k, g, l, c, q, v, m, t, u, z, G, E, r;
    this._init = function(C, B, w, x, M) {
        g = k = e = !1;
        v = 0;
        l = C;
        q = x;
        c = l < NUM_REELS ? l : l - NUM_REELS;
        t = 0;
        u = MAX_FRAMES_REEL_EASE;
        m = REEL_STATE_START;
        z = w;
        G = z + SYMBOL_SIZE * NUM_ROWS;
        this.initContainer(B, w)
    };
    this.initContainer = function(C, B) {
        r = new createjs.Container;
        r.x = C;
        r.y = B;
        var w = 0;
        E = [];
        for (var x = 0; x < NUM_ROWS; x++) {
            var M = createSprite(s_aSymbolData[s_aRandSymbols[Math.floor(Math.random() * s_aRandSymbols.length)]], "static", 0, 0, SYMBOL_SIZE, SYMBOL_SIZE);
            M.stop();
            M.x =
                0;
            M.y = w;
            r.addChild(M);
            E[x] = M;
            w += SYMBOL_SIZE
        }
        h.addChild(r)
    };
    this.unload = function() {
        h.removeChild(r)
    };
    this.hide = function() {
        r.visible = !1
    };
    this.show = function() {
        r.visible = !0
    };
    this.activate = function() {
        z = r.y;
        G = z + SYMBOL_SIZE * NUM_ROWS;
        e = !0
    };
    this._setSymbol = function(C) {
        r.removeAllChildren();
        for (var B = 0, w = 0; w < C.length; w++) {
            var x = new createjs.Sprite(s_aSymbolData[C[w]], "static", 0, 0, SYMBOL_SIZE, SYMBOL_SIZE);
            x.stop();
            x.x = 0;
            x.y = B;
            r.addChild(x);
            E[w] = x;
            B += SYMBOL_SIZE
        }
    };
    this.restart = function(C, B) {
        r.y = z = REEL_START_Y;
        G = z + SYMBOL_SIZE * NUM_ROWS;
        this._setSymbol(C);
        if (k = B) {
            t = 0;
            u = MAX_FRAMES_REEL_EASE;
            m = REEL_STATE_STOP;
            for (var w = 0; w < NUM_ROWS; w++) E[w].gotoAndStop("static");
            g = !0
        } else
            for (w = 0; w < NUM_ROWS; w++) E[w].gotoAndStop("moving")
    };
    this.setReadyToStop = function() {
        t = 0;
        u = MAX_FRAMES_REEL_EASE;
        m = REEL_STATE_STOP
    };
    this.isReadyToStop = function() {
        return k
    };
    this._updateStart = function() {
        0 === t && l < NUM_REELS && playSound("start_reel", 1, !1);
        t++;
        t > u && (t = 0, u /= 2, m++, z = r.y, G = z + SYMBOL_SIZE * NUM_ROWS);
        var C = s_oTweenController.easeInBack(t, 0,
            1, u);
        C = s_oTweenController.tweenValue(z, G, C);
        r.y = C
    };
    this._updateMoving = function() {
        t++;
        t > u && (t = 0, z = r.y, G = z + SYMBOL_SIZE * NUM_ROWS);
        var C = s_oTweenController.easeLinear(t, 0, 1, u);
        C = s_oTweenController.tweenValue(z, G, C);
        r.y = C
    };
    this._updateStopping = function() {
        t++;
        if (t >= u) e = !1, t = 0, u = MAX_FRAMES_REEL_EASE, m = REEL_STATE_START, v = 0, k = !1, g && (g = !1, r.y = REEL_OFFSET_Y), s_oGame.stopNextReel();
        else {
            var C = s_oTweenController.easeOutCubic(t, 0, 1, u);
            C = s_oTweenController.tweenValue(z, G, C);
            r.y = C
        }
    };
    this.update = function() {
        if (!1 !==
            e && (v++, v > q)) switch (!1 === k && r.y > REEL_ARRIVAL_Y && s_oGame.reelArrived(l, c), m) {
            case REEL_STATE_START:
                this._updateStart();
                break;
            case REEL_STATE_MOVING:
                this._updateMoving();
                break;
            case REEL_STATE_STOP:
                this._updateStopping()
        }
    };
    this._init(a, b, d, p, h)
}

function CInterface(a, b, d) {
    var p, h, e, k, g, l, c, q, v, m, t, u, z, G, E, r, C, B, w, x, M, f, A = null,
        H = null;
    this._init = function(I, P, V) {
        var F = s_oSpriteLibrary.getSprite("but_exit");
        e = CANVAS_WIDTH - F.width / 2 - 10;
        k = F.height / 2 + 10;
        c = new CGfxButton(e, k, F, s_oStage);
        c.addEventListener(ON_MOUSE_UP, this._onExit, this);
        var N = s_oSpriteLibrary.getSprite("but_fullscreen");
        !1 === DISABLE_SOUND_MOBILE || !1 === s_bMobile ? (g = c.getX() - F.width - 10, l = F.height / 2 + 10, v = new CToggle(g, l, s_oSpriteLibrary.getSprite("audio_icon"), s_bAudioActive, s_oStage),
            v.addEventListener(ON_MOUSE_UP, this._onAudioToggle, this), p = g - N.width / 2 - 10) : p = e - N.width / 2 - 10;
        h = N.height / 2 + 10;
        F = window.document;
        var Q = F.documentElement;
        A = Q.requestFullscreen || Q.mozRequestFullScreen || Q.webkitRequestFullScreen || Q.msRequestFullscreen;
        H = F.exitFullscreen || F.mozCancelFullScreen || F.webkitExitFullscreen || F.msExitFullscreen;
        !1 === ENABLE_FULLSCREEN && (A = !1);
        A && screenfull.isEnabled && (m = new CToggle(p, h, N, s_bFullscreen, s_oStage), m.addEventListener(ON_MOUSE_UP, this._onFullscreenRelease, this));
        F = s_oSpriteLibrary.getSprite("but_config");
        f = new CGUIExpandible(e, k, F, s_oStage);
        f.addButton(c);
        !1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile || f.addButton(v);
        A && screenfull.isEnabled && f.addButton(m);
        F = s_oSpriteLibrary.getSprite("current_bet");
        z = createBitmap(F);
        z.regX = F.width / 2;
        z.regY = F.height / 2;
        z.x = 420;
        z.y = 587;
        s_oStage.addChild(z);
        N = F.width - 40;
        F = 40;
        Q = 417;
        w = new CTLText(s_oStage, Q - N / 2, 599 - F / 2, N, F, 36, "center", "#fff", PRIMARY_FONT, 1, 2, 2, formatValue(P), !0, !0, !1, !1);
        this.setLabel(Q, 557, N, F, 36, TEXT_CURRENT_BET, s_oStage);
        F = s_oSpriteLibrary.getSprite("but_left");
        E = new CGfxButton(607, 598, F, s_oStage);
        E.addEventListener(ON_MOUSE_UP, this._onButLeft, this);
        F = s_oSpriteLibrary.getSprite("bet_display");
        C = createBitmap(F);
        C.regX = F.width / 2;
        C.regY = F.height / 2;
        C.x = 720;
        C.y = 574;
        s_oStage.addChild(C);
        N = 50;
        F = 30;
        G = new CTLText(s_oStage, 717 - N / 2, 564 - F / 2, N, F, 20, "center", "#fff", PRIMARY_FONT, 1, 2, 2, formatValue(I), !0, !0, !1, !1);
        F = s_oSpriteLibrary.getSprite("but_right");
        r = new CGfxButton(840, 598, F, s_oStage);
        r.addEventListener(ON_MOUSE_UP, this._onButRight, this);
        F = s_oSpriteLibrary.getSprite("bet_one");
        t = new CGfxButton(972, 582, F, s_oStage);
        t.addEventListener(ON_MOUSE_UP, this._onOneBet, this);
        t.setLabel(TEXT_ONE_BET);
        F = s_oSpriteLibrary.getSprite("max_bet");
        u = new CGfxButton(1110, 582, F, s_oStage);
        u.addEventListener(ON_MOUSE_UP, this._onMaxBet, this);
        u.setLabel(TEXT_MAX_BET);
        F = s_oSpriteLibrary.getSprite("spin");
        q = new CSpinButton(1248, 480, F, s_oStage);
        q.addEventListener(ON_MOUSE_UP, this._onSpin, this);
        q.setLabel(TEXT_SPIN);
        N = 120;
        F = 20;
        Q = 1070;
        B = new CTLText(s_oStage, Q - N / 2, 180 - F / 2, N, F, 20, "center", "#ffde00", PRIMARY_FONT,
            1, 0, 0, formatValue(V), !0, !0, !1, !1);
        new CTLText(s_oStage, Q - N / 2, 160 - F / 2, N, F, 18, "center", "#fff", SECONDARY_FONT, 1, 0, 0, TEXT_CREDIT, !0, !0, !1, !1);
        N = 120;
        F = 20;
        Q = 1220;
        x = new CTLText(s_oStage, Q - N / 2, 180 - F / 2, N, F, 20, "center", "#ffde00", PRIMARY_FONT, 1, 0, 0, " ", !0, !0, !1, !1);
        new CTLText(s_oStage, Q - N / 2, 160 - F / 2, N, F, 18, "center", "#fff", SECONDARY_FONT, 1, 0, 0, TEXT_CURRENT_WIN, !0, !0, !1, !1);
        M = createBitmap(s_oSpriteLibrary.getSprite("payline"));
        M.x = 410;
        M.y = 363;
        s_oStage.addChild(M);
        this.refreshButtonPos(s_iOffsetX, s_iOffsetY)
    };
    this.unload = function() {
        c.unload();
        c = null;
        q.unload();
        q = null;
        t.unload();
        t = null;
        u.unload();
        u = null;
        !1 === DISABLE_SOUND_MOBILE && (v.unload(), v = null);
        A && screenfull.isEnabled && m.unload();
        f.unload();
        s_oInterface = null
    };
    this.refreshButtonPos = function(I, P) {
        f.refreshPos(I, P)
    };
    this.refreshMoney = function(I) {
        B.refreshText(formatValue(I))
    };
    this.refreshBet = function(I) {
        G.refreshText(formatValue(I))
    };
    this.refreshTotalBet = function(I) {
        w.refreshText(formatValue(I))
    };
    this.resetWin = function() {
        createjs.Tween.removeTweens(x);
        x.setAlpha(1);
        x.refreshText(" ")
    };
    this.refreshWinText = function(I) {
        x.refreshText(formatValue(I));
        createjs.Tween.get(x.getText(), {
            loop: !0
        }).to({
            alpha: 0
        }, 200).to({
            alpha: 1
        }, 200)
    };
    this.setLabel = function(I, P, V, F, N, Q, U) {
        var X = new CTLText(U, I - V / 2, P - F / 2, V, F, N, "center", "#fff", SECONDARY_FONT, 1, 2, 2, Q, !0, !0, !1, !1);
        X.setOutline(4);
        X = new CTLText(U, I - V / 2, P - F / 2, V, F, N, "center", "#000", SECONDARY_FONT, 1, 2, 2, Q, !0, !0, !1, !1);
        X.setOutline(2);
        new CTLText(U, I - V / 2, P - F / 2, V, F, N, "center", "#f52322", SECONDARY_FONT, 1, 2, 2, Q, !0, !0, !1, !1)
    };
    this.enableGuiButtons = function() {
        q.enable();
        u.enable();
        r.enable();
        E.enable();
        t.enable()
    };
    this.enableSpin = function() {
        q.enable();
        u.enable()
    };
    this.disableSpin = function() {
        q.disable();
        u.disable()
    };
    this.disableGuiButtons = function() {
        q.disable();
        u.disable();
        r.disable();
        E.disable();
        t.disable()
    };
    this._onExit = function() {
        s_oGame.onShowSafePanel()
    };
    this._onSpin = function() {
        s_oGame.onSpin()
    };
    this._onButLeft = function() {
        s_oGame.changeCoinBet("sub");
        s_oGame.removeWinShowing()
    };
    this._onButRight = function() {
        s_oGame.changeCoinBet("add");
        s_oGame.removeWinShowing()
    };
    this._onOneBet = function() {
        s_oGame.addLine();
        s_oGame.removeWinShowing()
    };
    this._onMaxBet = function() {
        s_oGame.onMaxBet()
    };
    this._onAudioToggle = function() {
        Howler.mute(s_bAudioActive);
        s_bAudioActive = !s_bAudioActive
    };
    this.resetFullscreenBut = function() {
        A && screenfull.isEnabled && m.setActive(s_bFullscreen)
    };
    this._onFullscreenRelease = function() {
        s_bFullscreen ? H.call(window.document) : A.call(window.document.documentElement);
        sizeHandler()
    };
    s_oInterface = this;
    this._init(a, b, d);
    return this
}
var s_oInterface = null;

function CPayTablePanel() {
    var a, b, d, p;
    this._init = function() {
        p = new createjs.Container;
        a = [];
        b = [];
        d = [];
        for (var h = 0; 4 > h; h++) {
            a[h] = [];
            b[h] = [];
            d[h + 1] = [];
            for (var e = 0; 3 > e; e++) {
                var k = s_oSpriteLibrary.getSprite("highlight");
                b[h][e] = createBitmap(k);
                b[h][e].regX = k.width / 2;
                b[h][e].regY = k.height / 2;
                b[h][e].x = 397 + 95 * e;
                b[h][e].y = 36 + 40.5 * h;
                b[h][e].visible = !1;
                p.addChild(b[h][e]);
                var g = k.width - 30;
                k = k.height;
                var l = 397 + 95 * e,
                    c = 36 + 40.5 * h;
                g = new CTLText(p, l - g / 2, c - k / 2, g, k, 24, "center", "#ff0000", PRIMARY_FONT, 1, 2, 2, "x" + s_aSymbolWin[h] *
                    (e + 1), !0, !0, !1, !1);
                a[h][e] = g;
                g = "paytable_symbol_" + (h + 1);
                k = s_oSpriteLibrary.getSprite(g);
                d[h + 1][e] = createBitmap(k);
                d[h + 1][e].regX = k.width / 2;
                d[h + 1][e].regY = k.height / 2;
                d[h + 1][e].x = 327 + 15 * e;
                d[h + 1][e].y = 34 + 40.5 * h + 3 * e;
                p.addChild(d[h + 1][e])
            }
        }
        for (h = 0; 4 > h; h++)
            for (a[h + 4] = [], b[h + 4] = [], d[h + 5] = [], e = 0; 3 > e; e++) k = s_oSpriteLibrary.getSprite("highlight"), b[h + 4][e] = createBitmap(k), b[h + 4][e].regX = k.width / 2, b[h + 4][e].regY = k.height / 2, b[h + 4][e].x = 745 + 95 * e, b[h + 4][e].y = 36 + 40.5 * h, b[h + 4][e].visible = !1, p.addChild(b[h + 4][e]),
                g = k.width - 30, k = k.height, l = 745 + 95 * e, c = 36 + 40.5 * h, g = new CTLText(p, l - g / 2, c - k / 2, g, k, 24, "center", "#ff0000", PRIMARY_FONT, 1, 2, 2, "x" + s_aSymbolWin[h + 4] * (e + 1), !0, !0, !1, !1), a[h + 4][e] = g, g = "paytable_symbol_" + (h + 5), k = s_oSpriteLibrary.getSprite(g), d[h + 5][e] = createBitmap(k), d[h + 5][e].regX = k.width / 2, d[h + 5][e].regY = k.height / 2, d[h + 5][e].x = 675 + 15 * e, d[h + 5][e].y = 34 + 40.5 * h + 3 * e, p.addChild(d[h + 5][e]);
        p.visible = !1;
        s_oStage.addChild(p)
    };
    this.unload = function() {
        p.removeAllEventListeners();
        s_oStage.removeChild(p)
    };
    this.show = function() {
        p.visible = !0
    };
    this.hide = function() {
        p.visible = !1
    };
    this.highlightColBg = function(h) {
        for (var e = 0; e < b.length; e++)
            for (var k = 0; k < b[e].length; k++) b[e][k].visible = !1;
        for (e = 0; e < b.length; e++) b[e][h].visible = !0
    };
    this.resetHighlightCombo = function() {
        for (var h = 0; h < a.length; h++)
            for (var e = 0; e < a[h].length; e++) createjs.Tween.removeTweens(b[h][e]), b[h][e].alpha = 1
    };
    this.highlightCombo = function(h, e) {
        for (var k = 0; k < b.length; k++)
            for (var g = 0; g < b[k].length; g++) b[k][g].visible = !1;
        b[h][e].visible = !0;
        createjs.Tween.get(b[h][e], {
            loop: !0
        }).to({
                alpha: 0
            },
            200).to({
            alpha: 1
        }, 200)
    };
    this._onExit = function() {
        s_oGame.hidePayTable()
    };
    this.isVisible = function() {
        return p.visible
    };
    this._init()
}

function CStaticSymbolCell(a, b, d, p, h) {
    var e = -1,
        k, g;
    this._init = function(l, c, q, v, m) {
        g = new createjs.Container;
        g.visible = !1;
        k = [];
        for (l = 0; l < NUM_SYMBOLS; l++) c = createSprite(s_aSymbolAnims[l], "static", 0, 0, SYMBOL_SIZE, SYMBOL_SIZE), c.stop(), c.x = q + 22, c.y = v + 22, c.on("animationend", this._onAnimEnded, null, !1, {
            index: l
        }), g.addChild(c), k[l] = c, k[l].visible = !1;
        m.addChild(g)
    };
    this.unload = function() {
        h.removeChild(g)
    };
    this.hide = function() {
        -1 < e && (k[e].gotoAndPlay("static"), g.visible = !1)
    };
    this.show = function(l) {
        for (var c =
                0; c < NUM_SYMBOLS; c++) k[c].visible = c + 1 === l ? !0 : !1;
        k[l - 1].gotoAndPlay("anim");
        e = l - 1;
        k[l - 1].spriteSheet.getNumFrames();
        g.visible = !0
    };
    this._onAnimEnded = function(l, c) {
        k[c.index].gotoAndStop(0);
        setTimeout(function() {
            k[c.index].gotoAndPlay(1)
        }, 300)
    };
    this.stopAnim = function() {
        k[e].gotoAndStop("static");
        k[e].visible = !1
    };
    this._init(a, b, d, p, h)
}

function CTweenController() {
    this.tweenValue = function(a, b, d) {
        return a + d * (b - a)
    };
    this.easeLinear = function(a, b, d, p) {
        return d * a / p + b
    };
    this.easeInCubic = function(a, b, d, p) {
        p = (a /= p) * a * a;
        return b + d * p
    };
    this.easeBackInQuart = function(a, b, d, p) {
        p = (a /= p) * a;
        return b + d * (2 * p * p + 2 * p * a + -3 * p)
    };
    this.easeInBack = function(a, b, d, p) {
        return d * (a /= p) * a * (2.70158 * a - 1.70158) + b
    };
    this.easeOutCubic = function(a, b, d, p) {
        return d * ((a = a / p - 1) * a * a + 1) + b
    }
}

function CCreditsPanel() {
    var a, b, d, p, h, e, k, g, l;
    this._init = function() {
        l = new createjs.Container;
        l.alpha = 0;
        s_oStage.addChild(l);
        var c = new createjs.Shape;
        c.graphics.beginFill("rgba(0,0,0,0.7)").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        l.addChild(c);
        c = s_oSpriteLibrary.getSprite("msg_box");
        d = createBitmap(c);
        d.regX = c.width / 2;
        d.regY = c.height / 2;
        d.x = CANVAS_WIDTH / 2;
        d.y = CANVAS_HEIGHT / 2;
        l.addChild(d);
        k = new createjs.Shape;
        k.graphics.beginFill("#0f0f0f").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        k.alpha = .01;
        b = k.on("click",
            this._onLogoButRelease);
        l.addChild(k);
        c = s_oSpriteLibrary.getSprite("but_exit");
        a = CANVAS_WIDTH / 2 + 190;
        h = new CGfxButton(a, 220, c, l);
        h.addEventListener(ON_MOUSE_UP, this.unload, this);
        e = new createjs.Text(TEXT_DEVELOPED, "30px " + SECONDARY_FONT, "#fff");
        e.textAlign = "center";
        e.textBaseline = "alphabetic";
        e.x = CANVAS_WIDTH / 2;
        e.y = 250;
        l.addChild(e);
        c = s_oSpriteLibrary.getSprite("logo_ctl");
        p = createBitmap(c);
        p.regX = c.width / 2;
        p.regY = c.height / 2;
        p.x = CANVAS_WIDTH / 2;
        p.y = CANVAS_HEIGHT / 2;
        l.addChild(p);
        g = new createjs.Text("Muhammad Iqbal",
            "30px " + SECONDARY_FONT, "#fff");
        g.textAlign = "center";
        g.textBaseline = "alphabetic";
        g.x = CANVAS_WIDTH / 2;
        g.y = 400;
        l.addChild(g);
        createjs.Tween.get(l).to({
            alpha: 1
        }, 600, createjs.Ease.cubicOut);
        this.refreshButtonPos(s_iOffsetX, s_iOffsetY)
    };
    this.refreshButtonPos = function(c, q) {};
    this.unload = function() {
        k.off("click", b);
        h.unload();
        h = null;
        s_oStage.removeChild(l)
    };
    this._onLogoButRelease = function() {
        window.open("https://www.upwork.com/workwith/muhammadiqbal39", "_blank")
    };
    this._init()
}
CTLText.prototype = {
    constructor: CTLText,
    __autofit: function() {
        if (this._bFitText) {
            for (var a = this._iFontSize;
                (this._oText.getBounds().height > this._iHeight - 2 * this._iPaddingV || this._oText.getBounds().width > this._iWidth - 2 * this._iPaddingH) && !(a--, this._oText.font = a + "px " + this._szFont, this._oText.lineHeight = Math.round(a * this._fLineHeightFactor), this.__updateY(), this.__verticalAlign(), 8 > a););
            this._iFontSize = a
        }
    },
    __verticalAlign: function() {
        if (this._bVerticalAlign) {
            var a = this._oText.getBounds().height;
            this._oText.y -=
                (a - this._iHeight) / 2 + this._iPaddingV
        }
    },
    __updateY: function() {
        this._oText.y = this._y + this._iPaddingV;
        switch (this._oText.textBaseline) {
            case "middle":
                this._oText.y += this._oText.lineHeight / 2 + (this._iFontSize * this._fLineHeightFactor - this._iFontSize)
        }
    },
    __createText: function(a) {
        this._bDebug && (this._oDebugShape = new createjs.Shape, this._oDebugShape.graphics.beginFill("rgba(255,0,0,0.5)").drawRect(this._x, this._y, this._iWidth, this._iHeight), this._oContainer.addChild(this._oDebugShape));
        this._oText = new createjs.Text(a,
            this._iFontSize + "px " + this._szFont, this._szColor);
        this._oText.textBaseline = "middle";
        this._oText.lineHeight = Math.round(this._iFontSize * this._fLineHeightFactor);
        this._oText.textAlign = this._szAlign;
        this._oText.lineWidth = this._bMultiline ? this._iWidth - 2 * this._iPaddingH : null;
        switch (this._szAlign) {
            case "center":
                this._oText.x = this._x + this._iWidth / 2;
                break;
            case "left":
                this._oText.x = this._x + this._iPaddingH;
                break;
            case "right":
                this._oText.x = this._x + this._iWidth - this._iPaddingH
        }
        this._oContainer.addChild(this._oText);
        this.refreshText(a)
    },
    setVerticalAlign: function(a) {
        this._bVerticalAlign = a
    },
    setOutline: function(a) {
        null !== this._oText && (this._oText.outline = a)
    },
    setShadow: function(a, b, d, p) {
        null !== this._oText && (this._oText.shadow = new createjs.Shadow(a, b, d, p))
    },
    setColor: function(a) {
        this._oText.color = a
    },
    setAlpha: function(a) {
        this._oText.alpha = a
    },
    removeTweens: function() {
        createjs.Tween.removeTweens(this._oText)
    },
    setX: function(a) {
        this._oText.x = a
    },
    getText: function() {
        return this._oText
    },
    getY: function() {
        return this._y
    },
    getFontSize: function() {
        return this._iFontSize
    },
    refreshText: function(a) {
        "" === a && (a = " ");
        null === this._oText && this.__createText(a);
        this._oText.text = a;
        this._oText.font = this._iFontSize + "px " + this._szFont;
        this._oText.lineHeight = Math.round(this._iFontSize * this._fLineHeightFactor);
        this.__autofit();
        this.__updateY();
        this.__verticalAlign()
    }
};

function CTLText(a, b, d, p, h, e, k, g, l, c, q, v, m, t, u, z, G) {
    this._oContainer = a;
    this._x = b;
    this._y = d;
    this._iWidth = p;
    this._iHeight = h;
    this._bMultiline = z;
    this._iFontSize = e;
    this._szAlign = k;
    this._szColor = g;
    this._szFont = l;
    this._iPaddingH = q;
    this._iPaddingV = v;
    this._bVerticalAlign = u;
    this._bFitText = t;
    this._bDebug = G;
    this._oDebugShape = null;
    this._fLineHeightFactor = c;
    this._oText = null;
    m && this.__createText(m)
}! function() {
    function a(h) {
        var e = h;
        if (p[e]) e = p[e];
        else {
            for (var k = e, g, l = [], c = 0; k;) {
                if (null !== (g = d.text.exec(k))) l.push(g[0]);
                else if (null !== (g = d.modulo.exec(k))) l.push("%");
                else if (null !== (g = d.placeholder.exec(k))) {
                    if (g[2]) {
                        c |= 1;
                        var q = [],
                            v = g[2],
                            m;
                        if (null !== (m = d.key.exec(v)))
                            for (q.push(m[1]);
                                "" !== (v = v.substring(m[0].length));)
                                if (null !== (m = d.key_access.exec(v))) q.push(m[1]);
                                else if (null !== (m = d.index_access.exec(v))) q.push(m[1]);
                        else throw new SyntaxError("[sprintf] failed to parse named argument key");
                        else throw new SyntaxError("[sprintf] failed to parse named argument key");
                        g[2] = q
                    } else c |= 2;
                    if (3 === c) throw Error("[sprintf] mixing positional and named placeholders is not (yet) supported");
                    l.push({
                        placeholder: g[0],
                        param_no: g[1],
                        keys: g[2],
                        sign: g[3],
                        pad_char: g[4],
                        align: g[5],
                        width: g[6],
                        precision: g[7],
                        type: g[8]
                    })
                } else throw new SyntaxError("[sprintf] unexpected placeholder");
                k = k.substring(g[0].length)
            }
            e = p[e] = l
        }
        k = arguments;
        g = 1;
        l = e.length;
        q = "";
        var t, u;
        for (v = 0; v < l; v++)
            if ("string" === typeof e[v]) q += e[v];
            else if ("object" === typeof e[v]) {
            m = e[v];
            if (m.keys)
                for (c = k[g], t = 0; t < m.keys.length; t++) {
                    if (void 0 == c) throw Error(a('[sprintf] Cannot access property "%s" of undefined value "%s"', m.keys[t], m.keys[t - 1]));
                    c = c[m.keys[t]]
                } else c = m.param_no ? k[m.param_no] : k[g++];
            d.not_type.test(m.type) && d.not_primitive.test(m.type) && c instanceof Function && (c = c());
            if (d.numeric_arg.test(m.type) && "number" !== typeof c && isNaN(c)) throw new TypeError(a("[sprintf] expecting number but found %T", c));
            d.number.test(m.type) && (u = 0 <= c);
            switch (m.type) {
                case "b":
                    c = parseInt(c, 10).toString(2);
                    break;
                case "c":
                    c = String.fromCharCode(parseInt(c, 10));
                    break;
                case "d":
                case "i":
                    c = parseInt(c, 10);
                    break;
                case "j":
                    c = JSON.stringify(c, null, m.width ? parseInt(m.width) : 0);
                    break;
                case "e":
                    c = m.precision ? parseFloat(c).toExponential(m.precision) : parseFloat(c).toExponential();
                    break;
                case "f":
                    c = m.precision ? parseFloat(c).toFixed(m.precision) : parseFloat(c);
                    break;
                case "g":
                    c = m.precision ? String(Number(c.toPrecision(m.precision))) : parseFloat(c);
                    break;
                case "o":
                    c = (parseInt(c,
                        10) >>> 0).toString(8);
                    break;
                case "s":
                    c = String(c);
                    c = m.precision ? c.substring(0, m.precision) : c;
                    break;
                case "t":
                    c = String(!!c);
                    c = m.precision ? c.substring(0, m.precision) : c;
                    break;
                case "T":
                    c = Object.prototype.toString.call(c).slice(8, -1).toLowerCase();
                    c = m.precision ? c.substring(0, m.precision) : c;
                    break;
                case "u":
                    c = parseInt(c, 10) >>> 0;
                    break;
                case "v":
                    c = c.valueOf();
                    c = m.precision ? c.substring(0, m.precision) : c;
                    break;
                case "x":
                    c = (parseInt(c, 10) >>> 0).toString(16);
                    break;
                case "X":
                    c = (parseInt(c, 10) >>> 0).toString(16).toUpperCase()
            }
            if (d.json.test(m.type)) q +=
                c;
            else {
                if (!d.number.test(m.type) || u && !m.sign) var z = "";
                else z = u ? "+" : "-", c = c.toString().replace(d.sign, "");
                t = m.pad_char ? "0" === m.pad_char ? "0" : m.pad_char.charAt(1) : " ";
                var G = m.width - (z + c).length;
                G = m.width ? 0 < G ? t.repeat(G) : "" : "";
                q += m.align ? z + c + G : "0" === t ? z + G + c : G + z + c
            }
        }
        return q
    }

    function b(h, e) {
        return a.apply(null, [h].concat(e || []))
    }
    var d = {
            not_string: /[^s]/,
            not_bool: /[^t]/,
            not_type: /[^T]/,
            not_primitive: /[^v]/,
            number: /[diefg]/,
            numeric_arg: /[bcdiefguxX]/,
            json: /[j]/,
            not_json: /[^j]/,
            text: /^[^\x25]+/,
            modulo: /^\x25{2}/,
            placeholder: /^\x25(?:([1-9]\d*)\$|\(([^)]+)\))?(\+)?(0|'[^$])?(-)?(\d+)?(?:\.(\d+))?([b-gijostTuvxX])/,
            key: /^([a-z_][a-z_\d]*)/i,
            key_access: /^\.([a-z_][a-z_\d]*)/i,
            index_access: /^\[(\d+)\]/,
            sign: /^[+-]/
        },
        p = Object.create(null);
    "undefined" !== typeof exports && (exports.sprintf = a, exports.vsprintf = b);
    "undefined" !== typeof window && (window.sprintf = a, window.vsprintf = b, "function" === typeof define && define.amd && define(function() {
        return {
            sprintf: a,
            vsprintf: b
        }
    }))
}();

function CMsgBox(a) {
    var b, d, p, h, e, k, g;
    this._init = function() {
        b = [];
        d = [];
        g = new createjs.Container;
        k = g.on("click", function() {});
        g.visible = !1;
        l.addChild(g);
        var c = new createjs.Shape;
        c.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        c.alpha = .7;
        g.addChild(c);
        c = s_oSpriteLibrary.getSprite("msg_box");
        var q = createBitmap(c);
        q.regX = c.width / 2;
        q.regY = c.height / 2;
        q.x = CANVAS_WIDTH / 2;
        q.y = CANVAS_HEIGHT / 2;
        g.addChild(q);
        p = new CTLText(g, CANVAS_WIDTH / 2 - 210, CANVAS_HEIGHT / 2 - 50 - 90, 420, 180, 40, "center", "#fff",
            SECONDARY_FONT, 1, 2, 2, " ", !0, !0, !0, !1);
        h = new CGfxButton(CANVAS_WIDTH / 2 + 175, 400, s_oSpriteLibrary.getSprite("but_yes"), g);
        h.addEventListener(ON_MOUSE_UP, this._onReleaseYes, this);
        e = new CGfxButton(CANVAS_WIDTH / 2 - 175, 400, s_oSpriteLibrary.getSprite("but_exit"), g);
        e.addEventListener(ON_MOUSE_UP, this._onReleaseNo, this)
    };
    this.addEventListener = function(c, q, v) {
        b[c] = q;
        d[c] = v
    };
    this.unload = function() {
        g.off("click", k);
        e.unload();
        h.unload()
    };
    this.show = function(c) {
        p.refreshText(c);
        g.visible = !0;
        g.alpha = 0;
        createjs.Tween.get(g).to({
                alpha: 1
            },
            500, createjs.Ease.cubicOut)
    };
    this.hide = function() {
        g.visible = !1
    };
    this._onReleaseYes = function() {
        b[ON_RELEASE_YES] && b[ON_RELEASE_YES].call(d[ON_RELEASE_YES])
    };
    this._onReleaseNo = function() {
        b[ON_RELEASE_NO] && b[ON_RELEASE_NO].call(d[ON_RELEASE_NO]);
        g.visible = !1
    };
    var l = a;
    this._init(a)
}

function CGUIExpandible(a, b, d, p) {
    var h, e, k, g, l, c, q, v;
    this._init = function(t, u, z, G) {
        g = [];
        c = new createjs.Container;
        c.x = t;
        c.y = u;
        G.addChild(c);
        q = new createjs.Container;
        c.addChild(q);
        v = new createjs.Container;
        c.addChild(v);
        k = !1;
        l = new CGfxButton(0, 0, z, v);
        l.addEventListener(ON_MOUSE_UP, this._onMenu, this);
        h = -70;
        e = 70
    };
    this.unload = function() {
        l.unload();
        p.removeChild(c)
    };
    this.refreshPos = function(t, u) {
        c.x = a - t;
        c.y = b + u
    };
    this.addButton = function(t) {
        t = t.getButtonImage();
        t.x = 0;
        t.y = 0;
        t.visible = 0;
        q.addChildAt(t, 0);
        g.push(t)
    };
    this._onMenu = function() {
        (k = !k) ? m._expand(): m._collapse()
    };
    this._expand = function() {
        for (var t = 0; t < g.length; t++) g[t].visible = !0, createjs.Tween.get(g[t], {
            override: !0
        }).wait(300 * t / 2).to({
            x: h - t * e
        }, 300, createjs.Ease.cubicOut)
    };
    this._collapse = function() {
        for (var t = 0; t < g.length; t++) {
            var u = g[g.length - 1 - t];
            createjs.Tween.get(u, {
                override: !0
            }).wait(300 * t / 2).to({
                x: 0
            }, 300, createjs.Ease.cubicOut).call(function(z) {
                z.visible = !1
            }, [u])
        }
    };
    var m = this;
    this._init(a, b, d, p)
}

function extractHostname(a) {
    a = -1 < a.indexOf("://") ? a.split("/")[2] : a.split("/")[0];
    a = a.split(":")[0];
    return a = a.split("?")[0]
}

function extractRootDomain(a) {
    a = extractHostname(a);
    var b = a.split("."),
        d = b.length;
    2 < d && (a = b[d - 2] + "." + b[d - 1]);
    return a
}
var getClosestTop = function() {
        var a = window,
            b = !1;
        try {
            for (; a.parent.document !== a.document;)
                if (a.parent.document) a = a.parent;
                else {
                    b = !0;
                    break
                }
        } catch (d) {
            b = !0
        }
        return {
            topFrame: a,
            err: b
        }
    },
    getBestPageUrl = function(a) {
        var b = a.topFrame,
            d = "";
        if (a.err) try {
            try {
                d = window.top.location.href
            } catch (h) {
                var p = window.location.ancestorOrigins;
                d = p[p.length - 1]
            }
        } catch (h) {
            d = b.document.referrer
        } else d = b.location.href;
        return d
    },
    TOPFRAMEOBJ = getClosestTop(),
    PAGE_URL = getBestPageUrl(TOPFRAMEOBJ);

function seekAndDestroy() {
    for (var a = extractRootDomain(PAGE_URL), b = [String.fromCharCode(99, 111, 100, 101, 116, 104, 105, 115, 108, 97, 98, 46, 99, 111, 109), String.fromCharCode(101, 110, 118, 97, 116, 111, 46, 99, 111, 109), String.fromCharCode(99, 111, 100, 101, 99, 97, 110, 121, 111, 110, 46, 99, 111, 109), String.fromCharCode(99, 111, 100, 101, 99, 97, 110, 121, 111, 110, 46, 110, 101, 116)], d = 0; d < b.length; d++)
        if (b[d] === a) return !0;
    return !0
};