"use strict";
(() => {
  (function () {
    function s() {
      for (var t = arguments.length, i = 0; i < t; i++) {
        var n = i < 0 || arguments.length <= i ? void 0 : arguments[i];
        n.nodeType === 1 || n.nodeType === 11
          ? this.appendChild(n)
          : this.appendChild(document.createTextNode(String(n)));
      }
    }
    function e() {
      for (; this.lastChild; ) this.removeChild(this.lastChild);
      arguments.length && this.append.apply(this, arguments);
    }
    function r() {
      for (var t = this.parentNode, i = arguments.length, n = new Array(i), o = 0; o < i; o++)
        n[o] = arguments[o];
      var a = n.length;
      if (t)
        for (a || t.removeChild(this); a--; ) {
          var u = n[a];
          typeof u != "object"
            ? (u = this.ownerDocument.createTextNode(u))
            : u.parentNode && u.parentNode.removeChild(u),
            a ? t.insertBefore(this.previousSibling, u) : t.replaceChild(u, this);
        }
    }
    typeof Element < "u" &&
      (Element.prototype.append ||
        ((Element.prototype.append = s), (DocumentFragment.prototype.append = s)),
      Element.prototype.replaceChildren ||
        ((Element.prototype.replaceChildren = e), (DocumentFragment.prototype.replaceChildren = e)),
      Element.prototype.replaceWith ||
        ((Element.prototype.replaceWith = r), (DocumentFragment.prototype.replaceWith = r)));
  })();
  function ol(s, e) {
    if (!(s instanceof e)) throw new TypeError("Cannot call a class as a function");
  }
  function Io(s, e) {
    for (var r = 0; r < e.length; r++) {
      var t = e[r];
      (t.enumerable = t.enumerable || !1),
        (t.configurable = !0),
        "value" in t && (t.writable = !0),
        Object.defineProperty(s, t.key, t);
    }
  }
  function Bo(s, e, r) {
    return e && Io(s.prototype, e), r && Io(s, r), s;
  }
  function al(s, e, r) {
    return (
      e in s
        ? Object.defineProperty(s, e, { value: r, enumerable: !0, configurable: !0, writable: !0 })
        : (s[e] = r),
      s
    );
  }
  function Yo(s, e) {
    var r = Object.keys(s);
    if (Object.getOwnPropertySymbols) {
      var t = Object.getOwnPropertySymbols(s);
      e &&
        (t = t.filter(function (i) {
          return Object.getOwnPropertyDescriptor(s, i).enumerable;
        })),
        r.push.apply(r, t);
    }
    return r;
  }
  function Vo(s) {
    for (var e = 1; e < arguments.length; e++) {
      var r = arguments[e] != null ? arguments[e] : {};
      e % 2
        ? Yo(Object(r), !0).forEach(function (t) {
            al(s, t, r[t]);
          })
        : Object.getOwnPropertyDescriptors
          ? Object.defineProperties(s, Object.getOwnPropertyDescriptors(r))
          : Yo(Object(r)).forEach(function (t) {
              Object.defineProperty(s, t, Object.getOwnPropertyDescriptor(r, t));
            });
    }
    return s;
  }
  function Xo(s, e) {
    return ll(s) || cl(s, e) || Uo(s, e) || pl();
  }
  function Je(s) {
    return ul(s) || fl(s) || Uo(s) || hl();
  }
  function ul(s) {
    if (Array.isArray(s)) return cs(s);
  }
  function ll(s) {
    if (Array.isArray(s)) return s;
  }
  function fl(s) {
    if (typeof Symbol < "u" && Symbol.iterator in Object(s)) return Array.from(s);
  }
  function cl(s, e) {
    if (!(typeof Symbol > "u" || !(Symbol.iterator in Object(s)))) {
      var r = [],
        t = !0,
        i = !1,
        n = void 0;
      try {
        for (
          var o = s[Symbol.iterator](), a;
          !(t = (a = o.next()).done) && (r.push(a.value), !(e && r.length === e));
          t = !0
        );
      } catch (u) {
        (i = !0), (n = u);
      } finally {
        try {
          !t && o.return != null && o.return();
        } finally {
          if (i) throw n;
        }
      }
      return r;
    }
  }
  function Uo(s, e) {
    if (s) {
      if (typeof s == "string") return cs(s, e);
      var r = Object.prototype.toString.call(s).slice(8, -1);
      if ((r === "Object" && s.constructor && (r = s.constructor.name), r === "Map" || r === "Set"))
        return Array.from(s);
      if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return cs(s, e);
    }
  }
  function cs(s, e) {
    (e == null || e > s.length) && (e = s.length);
    for (var r = 0, t = new Array(e); r < e; r++) t[r] = s[r];
    return t;
  }
  function hl() {
    throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
  }
  function pl() {
    throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
  }
  function Fr(s, e) {
    return Object.getOwnPropertyNames(Object(s)).reduce(function (r, t) {
      var i = Object.getOwnPropertyDescriptor(Object(s), t),
        n = Object.getOwnPropertyDescriptor(Object(e), t);
      return Object.defineProperty(r, t, n || i);
    }, {});
  }
  function Fi(s) {
    return typeof s == "string";
  }
  function _s(s) {
    return Array.isArray(s);
  }
  function mn() {
    var s = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {},
      e = Fr(s),
      r;
    return (
      e.types !== void 0 ? (r = e.types) : e.split !== void 0 && (r = e.split),
      r !== void 0 &&
        (e.types = (Fi(r) || _s(r) ? String(r) : "")
          .split(",")
          .map(function (t) {
            return String(t).trim();
          })
          .filter(function (t) {
            return /((line)|(word)|(char))/i.test(t);
          })),
      (e.absolute || e.position) && (e.absolute = e.absolute || /absolute/.test(s.position)),
      e
    );
  }
  function gs(s) {
    var e = Fi(s) || _s(s) ? String(s) : "";
    return { none: !e, lines: /line/i.test(e), words: /word/i.test(e), chars: /char/i.test(e) };
  }
  function vn(s) {
    return s !== null && typeof s == "object";
  }
  function dl(s) {
    return vn(s) && /^(1|3|11)$/.test(s.nodeType);
  }
  function _l(s) {
    return typeof s == "number" && s > -1 && s % 1 === 0;
  }
  function gl(s) {
    return vn(s) && _l(s.length);
  }
  function zr(s) {
    return _s(s) ? s : s == null ? [] : gl(s) ? Array.prototype.slice.call(s) : [s];
  }
  function Wo(s) {
    var e = s;
    return (
      Fi(s) &&
        (/^(#[a-z]\w+)$/.test(s.trim())
          ? (e = document.getElementById(s.trim().slice(1)))
          : (e = document.querySelectorAll(s))),
      zr(e).reduce(function (r, t) {
        return [].concat(Je(r), Je(zr(t).filter(dl)));
      }, [])
    );
  }
  var ml = Object.entries,
    yn = "_splittype",
    It = {},
    yl = 0;
  function Ht(s, e, r) {
    if (!vn(s)) return console.warn("[data.set] owner is not an object"), null;
    var t = s[yn] || (s[yn] = ++yl),
      i = It[t] || (It[t] = {});
    return (
      r === void 0
        ? e && Object.getPrototypeOf(e) === Object.prototype && (It[t] = Vo(Vo({}, i), e))
        : e !== void 0 && (i[e] = r),
      r
    );
  }
  function Lr(s, e) {
    var r = vn(s) ? s[yn] : null,
      t = (r && It[r]) || {};
    return e === void 0 ? t : t[e];
  }
  function Ho(s) {
    var e = s && s[yn];
    e && (delete s[e], delete It[e]);
  }
  function vl() {
    Object.keys(It).forEach(function (s) {
      delete It[s];
    });
  }
  function xl() {
    ml(It).forEach(function (s) {
      var e = Xo(s, 2),
        r = e[0],
        t = e[1],
        i = t.isRoot,
        n = t.isSplit;
      (!i || !n) && ((It[r] = null), delete It[r]);
    });
  }
  function wl(s) {
    var e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : " ",
      r = s ? String(s) : "";
    return r.trim().replace(/\s+/g, " ").split(e);
  }
  var ms = "\\ud800-\\udfff",
    Go = "\\u0300-\\u036f\\ufe20-\\ufe23",
    qo = "\\u20d0-\\u20f0",
    jo = "\\ufe0e\\ufe0f",
    bl = "[".concat(ms, "]"),
    hs = "[".concat(Go).concat(qo, "]"),
    ps = "\\ud83c[\\udffb-\\udfff]",
    Tl = "(?:".concat(hs, "|").concat(ps, ")"),
    $o = "[^".concat(ms, "]"),
    Ko = "(?:\\ud83c[\\udde6-\\uddff]){2}",
    Qo = "[\\ud800-\\udbff][\\udc00-\\udfff]",
    Zo = "\\u200d",
    Jo = "".concat(Tl, "?"),
    ea = "[".concat(jo, "]?"),
    Sl = "(?:" + Zo + "(?:" + [$o, Ko, Qo].join("|") + ")" + ea + Jo + ")*",
    Cl = ea + Jo + Sl,
    Pl = "(?:".concat(
      ["".concat($o).concat(hs, "?"), hs, Ko, Qo, bl].join("|"),
      `
)`
    ),
    kl = RegExp("".concat(ps, "(?=").concat(ps, ")|").concat(Pl).concat(Cl), "g"),
    Ol = [Zo, ms, Go, qo, jo],
    El = RegExp("[".concat(Ol.join(""), "]"));
  function Ml(s) {
    return s.split("");
  }
  function ta(s) {
    return El.test(s);
  }
  function Dl(s) {
    return s.match(kl) || [];
  }
  function Al(s) {
    return ta(s) ? Dl(s) : Ml(s);
  }
  function Rl(s) {
    return s == null ? "" : String(s);
  }
  function Fl(s) {
    var e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "";
    return (s = Rl(s)), s && Fi(s) && !e && ta(s) ? Al(s) : s.split(e);
  }
  function ds(s, e) {
    var r = document.createElement(s);
    return (
      e &&
        Object.keys(e).forEach(function (t) {
          var i = e[t],
            n = Fi(i) ? i.trim() : i;
          n === null ||
            n === "" ||
            (t === "children" ? r.append.apply(r, Je(zr(n))) : r.setAttribute(t, n));
        }),
      r
    );
  }
  var ys = {
    splitClass: "",
    lineClass: "line",
    wordClass: "word",
    charClass: "char",
    types: ["lines", "words", "chars"],
    absolute: !1,
    tagName: "div",
  };
  function Ll(s, e) {
    e = Fr(ys, e);
    var r = gs(e.types),
      t = e.tagName,
      i = s.nodeValue,
      n = document.createDocumentFragment(),
      o = [],
      a = [];
    return (
      /^\s/.test(i) && n.append(" "),
      (o = wl(i).reduce(function (u, l, f, h) {
        var d, c;
        return (
          r.chars &&
            (c = Fl(l).map(function (_) {
              var p = ds(t, {
                class: "".concat(e.splitClass, " ").concat(e.charClass),
                style: "display: inline-block;",
                children: _,
              });
              return Ht(p, "isChar", !0), (a = [].concat(Je(a), [p])), p;
            })),
          r.words || r.lines
            ? ((d = ds(t, {
                class: "".concat(e.wordClass, " ").concat(e.splitClass),
                style: "display: inline-block; ".concat(
                  r.words && e.absolute ? "position: relative;" : ""
                ),
                children: r.chars ? c : l,
              })),
              Ht(d, { isWord: !0, isWordStart: !0, isWordEnd: !0 }),
              n.appendChild(d))
            : c.forEach(function (_) {
                n.appendChild(_);
              }),
          f < h.length - 1 && n.append(" "),
          r.words ? u.concat(d) : u
        );
      }, [])),
      /\s$/.test(i) && n.append(" "),
      s.replaceWith(n),
      { words: o, chars: a }
    );
  }
  function ra(s, e) {
    var r = s.nodeType,
      t = { words: [], chars: [] };
    if (!/(1|3|11)/.test(r)) return t;
    if (r === 3 && /\S/.test(s.nodeValue)) return Ll(s, e);
    var i = zr(s.childNodes);
    if (i.length && (Ht(s, "isSplit", !0), !Lr(s).isRoot)) {
      (s.style.display = "inline-block"), (s.style.position = "relative");
      var n = s.nextSibling,
        o = s.previousSibling,
        a = s.textContent || "",
        u = n ? n.textContent : " ",
        l = o ? o.textContent : " ";
      Ht(s, {
        isWordEnd: /\s$/.test(a) || /^\s/.test(u),
        isWordStart: /^\s/.test(a) || /\s$/.test(l),
      });
    }
    return i.reduce(function (f, h) {
      var d = ra(h, e),
        c = d.words,
        _ = d.chars;
      return { words: [].concat(Je(f.words), Je(c)), chars: [].concat(Je(f.chars), Je(_)) };
    }, t);
  }
  function zl(s, e, r, t) {
    if (!r.absolute) return { top: e ? s.offsetTop : null };
    var i = s.offsetParent,
      n = Xo(t, 2),
      o = n[0],
      a = n[1],
      u = 0,
      l = 0;
    if (i && i !== document.body) {
      var f = i.getBoundingClientRect();
      (u = f.x + o), (l = f.y + a);
    }
    var h = s.getBoundingClientRect(),
      d = h.width,
      c = h.height,
      _ = h.x,
      p = h.y,
      m = p + a - l,
      T = _ + o - u;
    return { width: d, height: c, top: m, left: T };
  }
  function ia(s) {
    Lr(s).isWord
      ? (Ho(s), s.replaceWith.apply(s, Je(s.childNodes)))
      : zr(s.children).forEach(function (e) {
          return ia(e);
        });
  }
  var Nl = function () {
    return document.createDocumentFragment();
  };
  function Il(s, e, r) {
    var t = gs(e.types),
      i = e.tagName,
      n = s.getElementsByTagName("*"),
      o = [],
      a = [],
      u = null,
      l,
      f,
      h,
      d = [],
      c = s.parentElement,
      _ = s.nextElementSibling,
      p = Nl(),
      m = window.getComputedStyle(s),
      T = m.textAlign,
      b = parseFloat(m.fontSize),
      P = b * 0.2;
    return (
      e.absolute &&
        ((h = { left: s.offsetLeft, top: s.offsetTop, width: s.offsetWidth }),
        (f = s.offsetWidth),
        (l = s.offsetHeight),
        Ht(s, { cssWidth: s.style.width, cssHeight: s.style.height })),
      zr(n).forEach(function (y) {
        var w = y.parentElement === s,
          S = zl(y, w, e, r),
          x = S.width,
          O = S.height,
          C = S.top,
          k = S.left;
        /^br$/i.test(y.nodeName) ||
          (t.lines && w && ((u === null || C - u >= P) && ((u = C), o.push((a = []))), a.push(y)),
          e.absolute && Ht(y, { top: C, left: k, width: x, height: O }));
      }),
      c && c.removeChild(s),
      t.lines &&
        ((d = o.map(function (y) {
          var w = ds(i, {
            class: "".concat(e.splitClass, " ").concat(e.lineClass),
            style: "display: block; text-align: ".concat(T, "; width: 100%;"),
          });
          Ht(w, "isLine", !0);
          var S = { height: 0, top: 1e4 };
          return (
            p.appendChild(w),
            y.forEach(function (x, O, C) {
              var k = Lr(x),
                F = k.isWordEnd,
                E = k.top,
                Y = k.height,
                B = C[O + 1];
              (S.height = Math.max(S.height, Y)),
                (S.top = Math.min(S.top, E)),
                w.appendChild(x),
                F && Lr(B).isWordStart && w.append(" ");
            }),
            e.absolute && Ht(w, { height: S.height, top: S.top }),
            w
          );
        })),
        t.words || ia(p),
        s.replaceChildren(p)),
      e.absolute &&
        ((s.style.width = "".concat(s.style.width || f, "px")),
        (s.style.height = "".concat(l, "px")),
        zr(n).forEach(function (y) {
          var w = Lr(y),
            S = w.isLine,
            x = w.top,
            O = w.left,
            C = w.width,
            k = w.height,
            F = Lr(y.parentElement),
            E = !S && F.isLine;
          (y.style.top = "".concat(E ? x - F.top : x, "px")),
            (y.style.left = S ? "".concat(h.left, "px") : "".concat(O - (E ? h.left : 0), "px")),
            (y.style.height = "".concat(k, "px")),
            (y.style.width = S ? "".concat(h.width, "px") : "".concat(C, "px")),
            (y.style.position = "absolute");
        })),
      c && (_ ? c.insertBefore(s, _) : c.appendChild(s)),
      d
    );
  }
  var ui = Fr(ys, {}),
    na = (function () {
      Bo(s, null, [
        {
          key: "clearData",
          value: function () {
            vl();
          },
        },
        {
          key: "setDefaults",
          value: function (r) {
            return (ui = Fr(ui, mn(r))), ys;
          },
        },
        {
          key: "revert",
          value: function (r) {
            Wo(r).forEach(function (t) {
              var i = Lr(t),
                n = i.isSplit,
                o = i.html,
                a = i.cssWidth,
                u = i.cssHeight;
              n &&
                ((t.innerHTML = o), (t.style.width = a || ""), (t.style.height = u || ""), Ho(t));
            });
          },
        },
        {
          key: "create",
          value: function (r, t) {
            return new s(r, t);
          },
        },
        {
          key: "data",
          get: function () {
            return It;
          },
        },
        {
          key: "defaults",
          get: function () {
            return ui;
          },
          set: function (r) {
            ui = Fr(ui, mn(r));
          },
        },
      ]);
      function s(e, r) {
        ol(this, s),
          (this.isSplit = !1),
          (this.settings = Fr(ui, mn(r))),
          (this.elements = Wo(e)),
          this.split();
      }
      return (
        Bo(s, [
          {
            key: "split",
            value: function (r) {
              var t = this;
              this.revert(),
                this.elements.forEach(function (o) {
                  Ht(o, "html", o.innerHTML);
                }),
                (this.lines = []),
                (this.words = []),
                (this.chars = []);
              var i = [window.pageXOffset, window.pageYOffset];
              r !== void 0 && (this.settings = Fr(this.settings, mn(r)));
              var n = gs(this.settings.types);
              n.none ||
                (this.elements.forEach(function (o) {
                  Ht(o, "isRoot", !0);
                  var a = ra(o, t.settings),
                    u = a.words,
                    l = a.chars;
                  (t.words = [].concat(Je(t.words), Je(u))),
                    (t.chars = [].concat(Je(t.chars), Je(l)));
                }),
                this.elements.forEach(function (o) {
                  if (n.lines || t.settings.absolute) {
                    var a = Il(o, t.settings, i);
                    t.lines = [].concat(Je(t.lines), Je(a));
                  }
                }),
                (this.isSplit = !0),
                window.scrollTo(i[0], i[1]),
                xl());
            },
          },
          {
            key: "revert",
            value: function () {
              this.isSplit &&
                ((this.lines = null),
                (this.words = null),
                (this.chars = null),
                (this.isSplit = !1)),
                s.revert(this.elements);
            },
          },
        ]),
        s
      );
    })();
  var vs = class extends Error {
      constructor(e) {
        super(e), (this.name = "AssertionError");
      }
    },
    xn = (s, e, r) => {
      if (s == null || Number.isNaN(s) || (r && !r(s))) throw new vs(e);
      return s;
    },
    li = (s, e, r) =>
      s !== void 0 && r && !r(s)
        ? (console.log(`"${s}" was not used, fallbacking to "${e}"`), e)
        : s === void 0 || Number.isNaN(s)
          ? (console.log(`"${s}" was not used, fallbacking to "${e}"`), e)
          : s;
  var wn = { revealType: "[data-reveal-type]", revealParent: "[data-reveal-parent]" },
    Bl = ["chars", "words", "lines"],
    sa = new Set(Bl),
    Yl = ["from-top", "from-bottom", "from-left-bottom", "fade-from-bottom-left"],
    oa = new Set(Yl),
    Vl = [
      "power1",
      "power1.in",
      "power1.out",
      "power1.inOut",
      "power2",
      "power2.in",
      "power2.out",
      "power2.inOut",
      "power3",
      "power3.in",
      "power3.out",
      "power3.inOut",
      "power4",
      "power4.in",
      "power4.out",
      "power4.inOut",
      "back",
      "back.in",
      "back.out",
      "back.inOut",
      "bounce",
      "bounce.in",
      "bounce.out",
      "bounce.inOut",
      "circ",
      "circ.in",
      "circ.out",
      "circ.inOut",
      "elastic",
      "elastic.in",
      "elastic.out",
      "elastic.inOut",
      "expo",
      "expo.in",
      "expo.out",
      "expo.inOut",
      "sine",
      "sine.in",
      "sine.out",
      "sine.inOut",
    ],
    aa = new Set(Vl);
  function rr(s) {
    if (s === void 0)
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return s;
  }
  function _a(s, e) {
    (s.prototype = Object.create(e.prototype)), (s.prototype.constructor = s), (s.__proto__ = e);
  }
  var pt = { autoSleep: 120, force3D: "auto", nullTargetWarn: 1, units: { lineHeight: "" } },
    ci = { duration: 0.5, overwrite: !1, delay: 0 },
    Is,
    Xe,
    oe,
    Ct = 1e8,
    te = 1 / Ct,
    ks = Math.PI * 2,
    Wl = ks / 4,
    Xl = 0,
    ga = Math.sqrt,
    Ul = Math.cos,
    Hl = Math.sin,
    Pe = function (e) {
      return typeof e == "string";
    },
    pe = function (e) {
      return typeof e == "function";
    },
    nr = function (e) {
      return typeof e == "number";
    },
    Dn = function (e) {
      return typeof e > "u";
    },
    jt = function (e) {
      return typeof e == "object";
    },
    ht = function (e) {
      return e !== !1;
    },
    Bs = function () {
      return typeof window < "u";
    },
    bn = function (e) {
      return pe(e) || Pe(e);
    },
    ma = (typeof ArrayBuffer == "function" && ArrayBuffer.isView) || function () {},
    Ue = Array.isArray,
    Os = /(?:-?\.?\d|\.)+/gi,
    Ys = /[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g,
    Vr = /[-+=.]*\d+[.e-]*\d*[a-z%]*/g,
    xs = /[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi,
    Vs = /[+-]=-?[.\d]+/,
    ya = /[^,'"\[\]\s]+/gi,
    Gl = /^[+\-=e\s\d]*\d+[.\d]*([a-z]*|%)\s*$/i,
    ue,
    Gt,
    Es,
    Ws,
    vt = {},
    Pn = {},
    va,
    xa = function (e) {
      return (Pn = Yr(e, vt)) && He;
    },
    An = function (e, r) {
      return console.warn(
        "Invalid property",
        e,
        "set to",
        r,
        "Missing plugin? gsap.registerPlugin()"
      );
    },
    Yi = function (e, r) {
      return !r && console.warn(e);
    },
    wa = function (e, r) {
      return (e && (vt[e] = r) && Pn && (Pn[e] = r)) || vt;
    },
    Vi = function () {
      return 0;
    },
    ql = { suppressEvents: !0, isStart: !0, kill: !1 },
    Tn = { suppressEvents: !0, kill: !1 },
    jl = { suppressEvents: !0 },
    Xs = {},
    vr = [],
    Ms = {},
    ba,
    ft = {},
    ws = {},
    ua = 30,
    Sn = [],
    Us = "",
    Hs = function (e) {
      var r = e[0],
        t,
        i;
      if ((jt(r) || pe(r) || (e = [e]), !(t = (r._gsap || {}).harness))) {
        for (i = Sn.length; i-- && !Sn[i].targetTest(r); );
        t = Sn[i];
      }
      for (i = e.length; i--; )
        (e[i] && (e[i]._gsap || (e[i]._gsap = new js(e[i], t)))) || e.splice(i, 1);
      return e;
    },
    xr = function (e) {
      return e._gsap || Hs(Pt(e))[0]._gsap;
    },
    Gs = function (e, r, t) {
      return (t = e[r]) && pe(t) ? e[r]() : (Dn(t) && e.getAttribute && e.getAttribute(r)) || t;
    },
    et = function (e, r) {
      return (e = e.split(",")).forEach(r) || e;
    },
    de = function (e) {
      return Math.round(e * 1e5) / 1e5 || 0;
    },
    Me = function (e) {
      return Math.round(e * 1e7) / 1e7 || 0;
    },
    Wr = function (e, r) {
      var t = r.charAt(0),
        i = parseFloat(r.substr(2));
      return (e = parseFloat(e)), t === "+" ? e + i : t === "-" ? e - i : t === "*" ? e * i : e / i;
    },
    $l = function (e, r) {
      for (var t = r.length, i = 0; e.indexOf(r[i]) < 0 && ++i < t; );
      return i < t;
    },
    kn = function () {
      var e = vr.length,
        r = vr.slice(0),
        t,
        i;
      for (Ms = {}, vr.length = 0, t = 0; t < e; t++)
        (i = r[t]), i && i._lazy && (i.render(i._lazy[0], i._lazy[1], !0)._lazy = 0);
    },
    Ta = function (e, r, t, i) {
      vr.length && !Xe && kn(),
        e.render(r, t, i || (Xe && r < 0 && (e._initted || e._startAt))),
        vr.length && !Xe && kn();
    },
    Sa = function (e) {
      var r = parseFloat(e);
      return (r || r === 0) && (e + "").match(ya).length < 2 ? r : Pe(e) ? e.trim() : e;
    },
    Ca = function (e) {
      return e;
    },
    kt = function (e, r) {
      for (var t in r) t in e || (e[t] = r[t]);
      return e;
    },
    Kl = function (e) {
      return function (r, t) {
        for (var i in t) i in r || (i === "duration" && e) || i === "ease" || (r[i] = t[i]);
      };
    },
    Yr = function (e, r) {
      for (var t in r) e[t] = r[t];
      return e;
    },
    la = function s(e, r) {
      for (var t in r)
        t !== "__proto__" &&
          t !== "constructor" &&
          t !== "prototype" &&
          (e[t] = jt(r[t]) ? s(e[t] || (e[t] = {}), r[t]) : r[t]);
      return e;
    },
    On = function (e, r) {
      var t = {},
        i;
      for (i in e) i in r || (t[i] = e[i]);
      return t;
    },
    Ni = function (e) {
      var r = e.parent || ue,
        t = e.keyframes ? Kl(Ue(e.keyframes)) : kt;
      if (ht(e.inherit)) for (; r; ) t(e, r.vars.defaults), (r = r.parent || r._dp);
      return e;
    },
    Ql = function (e, r) {
      for (var t = e.length, i = t === r.length; i && t-- && e[t] === r[t]; );
      return t < 0;
    },
    Pa = function (e, r, t, i, n) {
      t === void 0 && (t = "_first"), i === void 0 && (i = "_last");
      var o = e[i],
        a;
      if (n) for (a = r[n]; o && o[n] > a; ) o = o._prev;
      return (
        o ? ((r._next = o._next), (o._next = r)) : ((r._next = e[t]), (e[t] = r)),
        r._next ? (r._next._prev = r) : (e[i] = r),
        (r._prev = o),
        (r.parent = r._dp = e),
        r
      );
    },
    Rn = function (e, r, t, i) {
      t === void 0 && (t = "_first"), i === void 0 && (i = "_last");
      var n = r._prev,
        o = r._next;
      n ? (n._next = o) : e[t] === r && (e[t] = o),
        o ? (o._prev = n) : e[i] === r && (e[i] = n),
        (r._next = r._prev = r.parent = null);
    },
    wr = function (e, r) {
      e.parent && (!r || e.parent.autoRemoveChildren) && e.parent.remove && e.parent.remove(e),
        (e._act = 0);
    },
    Nr = function (e, r) {
      if (e && (!r || r._end > e._dur || r._start < 0))
        for (var t = e; t; ) (t._dirty = 1), (t = t.parent);
      return e;
    },
    Zl = function (e) {
      for (var r = e.parent; r && r.parent; ) (r._dirty = 1), r.totalDuration(), (r = r.parent);
      return e;
    },
    Ds = function (e, r, t, i) {
      return (
        e._startAt &&
        (Xe
          ? e._startAt.revert(Tn)
          : (e.vars.immediateRender && !e.vars.autoRevert) || e._startAt.render(r, !0, i))
      );
    },
    Jl = function s(e) {
      return !e || (e._ts && s(e.parent));
    },
    fa = function (e) {
      return e._repeat ? hi(e._tTime, (e = e.duration() + e._rDelay)) * e : 0;
    },
    hi = function (e, r) {
      var t = Math.floor((e /= r));
      return e && t === e ? t - 1 : t;
    },
    En = function (e, r) {
      return (e - r._start) * r._ts + (r._ts >= 0 ? 0 : r._dirty ? r.totalDuration() : r._tDur);
    },
    Fn = function (e) {
      return (e._end = Me(e._start + (e._tDur / Math.abs(e._ts || e._rts || te) || 0)));
    },
    Ln = function (e, r) {
      var t = e._dp;
      return (
        t &&
          t.smoothChildTiming &&
          e._ts &&
          ((e._start = Me(
            t._time -
              (e._ts > 0 ? r / e._ts : ((e._dirty ? e.totalDuration() : e._tDur) - r) / -e._ts)
          )),
          Fn(e),
          t._dirty || Nr(t, e)),
        e
      );
    },
    ka = function (e, r) {
      var t;
      if (
        ((r._time || (!r._dur && r._initted) || (r._start < e._time && (r._dur || !r.add))) &&
          ((t = En(e.rawTime(), r)),
          (!r._dur || Ui(0, r.totalDuration(), t) - r._tTime > te) && r.render(t, !0)),
        Nr(e, r)._dp && e._initted && e._time >= e._dur && e._ts)
      ) {
        if (e._dur < e.duration())
          for (t = e; t._dp; ) t.rawTime() >= 0 && t.totalTime(t._tTime), (t = t._dp);
        e._zTime = -te;
      }
    },
    qt = function (e, r, t, i) {
      return (
        r.parent && wr(r),
        (r._start = Me((nr(t) ? t : t || e !== ue ? St(e, t, r) : e._time) + r._delay)),
        (r._end = Me(r._start + (r.totalDuration() / Math.abs(r.timeScale()) || 0))),
        Pa(e, r, "_first", "_last", e._sort ? "_start" : 0),
        As(r) || (e._recent = r),
        i || ka(e, r),
        e._ts < 0 && Ln(e, e._tTime),
        e
      );
    },
    Oa = function (e, r) {
      return (vt.ScrollTrigger || An("scrollTrigger", r)) && vt.ScrollTrigger.create(r, e);
    },
    Ea = function (e, r, t, i, n) {
      if ((Qs(e, r, n), !e._initted)) return 1;
      if (
        !t &&
        e._pt &&
        !Xe &&
        ((e._dur && e.vars.lazy !== !1) || (!e._dur && e.vars.lazy)) &&
        ba !== ct.frame
      )
        return vr.push(e), (e._lazy = [n, i]), 1;
    },
    ef = function s(e) {
      var r = e.parent;
      return r && r._ts && r._initted && !r._lock && (r.rawTime() < 0 || s(r));
    },
    As = function (e) {
      var r = e.data;
      return r === "isFromStart" || r === "isStart";
    },
    tf = function (e, r, t, i) {
      var n = e.ratio,
        o =
          r < 0 ||
          (!r &&
            ((!e._start && ef(e) && !(!e._initted && As(e))) ||
              ((e._ts < 0 || e._dp._ts < 0) && !As(e))))
            ? 0
            : 1,
        a = e._rDelay,
        u = 0,
        l,
        f,
        h;
      if (
        (a &&
          e._repeat &&
          ((u = Ui(0, e._tDur, r)),
          (f = hi(u, a)),
          e._yoyo && f & 1 && (o = 1 - o),
          f !== hi(e._tTime, a) &&
            ((n = 1 - o), e.vars.repeatRefresh && e._initted && e.invalidate())),
        o !== n || Xe || i || e._zTime === te || (!r && e._zTime))
      ) {
        if (!e._initted && Ea(e, r, i, t, u)) return;
        for (
          h = e._zTime,
            e._zTime = r || (t ? te : 0),
            t || (t = r && !h),
            e.ratio = o,
            e._from && (o = 1 - o),
            e._time = 0,
            e._tTime = u,
            l = e._pt;
          l;

        )
          l.r(o, l.d), (l = l._next);
        r < 0 && Ds(e, r, t, !0),
          e._onUpdate && !t && yt(e, "onUpdate"),
          u && e._repeat && !t && e.parent && yt(e, "onRepeat"),
          (r >= e._tDur || r < 0) &&
            e.ratio === o &&
            (o && wr(e, 1),
            !t && !Xe && (yt(e, o ? "onComplete" : "onReverseComplete", !0), e._prom && e._prom()));
      } else e._zTime || (e._zTime = r);
    },
    rf = function (e, r, t) {
      var i;
      if (t > r)
        for (i = e._first; i && i._start <= t; ) {
          if (i.data === "isPause" && i._start > r) return i;
          i = i._next;
        }
      else
        for (i = e._last; i && i._start >= t; ) {
          if (i.data === "isPause" && i._start < r) return i;
          i = i._prev;
        }
    },
    pi = function (e, r, t, i) {
      var n = e._repeat,
        o = Me(r) || 0,
        a = e._tTime / e._tDur;
      return (
        a && !i && (e._time *= o / e._dur),
        (e._dur = o),
        (e._tDur = n ? (n < 0 ? 1e10 : Me(o * (n + 1) + e._rDelay * n)) : o),
        a > 0 && !i && Ln(e, (e._tTime = e._tDur * a)),
        e.parent && Fn(e),
        t || Nr(e.parent, e),
        e
      );
    },
    ca = function (e) {
      return e instanceof ze ? Nr(e) : pi(e, e._dur);
    },
    nf = { _start: 0, endTime: Vi, totalDuration: Vi },
    St = function s(e, r, t) {
      var i = e.labels,
        n = e._recent || nf,
        o = e.duration() >= Ct ? n.endTime(!1) : e._dur,
        a,
        u,
        l;
      return Pe(r) && (isNaN(r) || r in i)
        ? ((u = r.charAt(0)),
          (l = r.substr(-1) === "%"),
          (a = r.indexOf("=")),
          u === "<" || u === ">"
            ? (a >= 0 && (r = r.replace(/=/, "")),
              (u === "<" ? n._start : n.endTime(n._repeat >= 0)) +
                (parseFloat(r.substr(1)) || 0) * (l ? (a < 0 ? n : t).totalDuration() / 100 : 1))
            : a < 0
              ? (r in i || (i[r] = o), i[r])
              : ((u = parseFloat(r.charAt(a - 1) + r.substr(a + 1))),
                l && t && (u = (u / 100) * (Ue(t) ? t[0] : t).totalDuration()),
                a > 1 ? s(e, r.substr(0, a - 1), t) + u : o + u))
        : r == null
          ? o
          : +r;
    },
    Ii = function (e, r, t) {
      var i = nr(r[1]),
        n = (i ? 2 : 1) + (e < 2 ? 0 : 1),
        o = r[n],
        a,
        u;
      if ((i && (o.duration = r[1]), (o.parent = t), e)) {
        for (a = o, u = t; u && !("immediateRender" in a); )
          (a = u.vars.defaults || {}), (u = ht(u.vars.inherit) && u.parent);
        (o.immediateRender = ht(a.immediateRender)),
          e < 2 ? (o.runBackwards = 1) : (o.startAt = r[n - 1]);
      }
      return new ve(r[0], o, r[n + 1]);
    },
    br = function (e, r) {
      return e || e === 0 ? r(e) : r;
    },
    Ui = function (e, r, t) {
      return t < e ? e : t > r ? r : t;
    },
    Ne = function (e, r) {
      return !Pe(e) || !(r = Gl.exec(e)) ? "" : r[1];
    },
    sf = function (e, r, t) {
      return br(t, function (i) {
        return Ui(e, r, i);
      });
    },
    Rs = [].slice,
    Ma = function (e, r) {
      return (
        e &&
        jt(e) &&
        "length" in e &&
        ((!r && !e.length) || (e.length - 1 in e && jt(e[0]))) &&
        !e.nodeType &&
        e !== Gt
      );
    },
    of = function (e, r, t) {
      return (
        t === void 0 && (t = []),
        e.forEach(function (i) {
          var n;
          return (Pe(i) && !r) || Ma(i, 1) ? (n = t).push.apply(n, Pt(i)) : t.push(i);
        }) || t
      );
    },
    Pt = function (e, r, t) {
      return oe && !r && oe.selector
        ? oe.selector(e)
        : Pe(e) && !t && (Es || !di())
          ? Rs.call((r || Ws).querySelectorAll(e), 0)
          : Ue(e)
            ? of(e, t)
            : Ma(e)
              ? Rs.call(e, 0)
              : e
                ? [e]
                : [];
    },
    Fs = function (e) {
      return (
        (e = Pt(e)[0] || Yi("Invalid scope") || {}),
        function (r) {
          var t = e.current || e.nativeElement || e;
          return Pt(
            r,
            t.querySelectorAll ? t : t === e ? Yi("Invalid scope") || Ws.createElement("div") : e
          );
        }
      );
    },
    Da = function (e) {
      return e.sort(function () {
        return 0.5 - Math.random();
      });
    },
    Aa = function (e) {
      if (pe(e)) return e;
      var r = jt(e) ? e : { each: e },
        t = Ir(r.ease),
        i = r.from || 0,
        n = parseFloat(r.base) || 0,
        o = {},
        a = i > 0 && i < 1,
        u = isNaN(i) || a,
        l = r.axis,
        f = i,
        h = i;
      return (
        Pe(i)
          ? (f = h = { center: 0.5, edges: 0.5, end: 1 }[i] || 0)
          : !a && u && ((f = i[0]), (h = i[1])),
        function (d, c, _) {
          var p = (_ || r).length,
            m = o[p],
            T,
            b,
            P,
            y,
            w,
            S,
            x,
            O,
            C;
          if (!m) {
            if (((C = r.grid === "auto" ? 0 : (r.grid || [1, Ct])[1]), !C)) {
              for (x = -Ct; x < (x = _[C++].getBoundingClientRect().left) && C < p; );
              C < p && C--;
            }
            for (
              m = o[p] = [],
                T = u ? Math.min(C, p) * f - 0.5 : i % C,
                b = C === Ct ? 0 : u ? (p * h) / C - 0.5 : (i / C) | 0,
                x = 0,
                O = Ct,
                S = 0;
              S < p;
              S++
            )
              (P = (S % C) - T),
                (y = b - ((S / C) | 0)),
                (m[S] = w = l ? Math.abs(l === "y" ? y : P) : ga(P * P + y * y)),
                w > x && (x = w),
                w < O && (O = w);
            i === "random" && Da(m),
              (m.max = x - O),
              (m.min = O),
              (m.v = p =
                (parseFloat(r.amount) ||
                  parseFloat(r.each) *
                    (C > p ? p - 1 : l ? (l === "y" ? p / C : C) : Math.max(C, p / C)) ||
                  0) * (i === "edges" ? -1 : 1)),
              (m.b = p < 0 ? n - p : n),
              (m.u = Ne(r.amount || r.each) || 0),
              (t = t && p < 0 ? Va(t) : t);
          }
          return (p = (m[d] - m.min) / m.max || 0), Me(m.b + (t ? t(p) : p) * m.v) + m.u;
        }
      );
    },
    Ls = function (e) {
      var r = Math.pow(10, ((e + "").split(".")[1] || "").length);
      return function (t) {
        var i = Me(Math.round(parseFloat(t) / e) * e * r);
        return (i - (i % 1)) / r + (nr(t) ? 0 : Ne(t));
      };
    },
    Ra = function (e, r) {
      var t = Ue(e),
        i,
        n;
      return (
        !t &&
          jt(e) &&
          ((i = t = e.radius || Ct),
          e.values ? ((e = Pt(e.values)), (n = !nr(e[0])) && (i *= i)) : (e = Ls(e.increment))),
        br(
          r,
          t
            ? pe(e)
              ? function (o) {
                  return (n = e(o)), Math.abs(n - o) <= i ? n : o;
                }
              : function (o) {
                  for (
                    var a = parseFloat(n ? o.x : o),
                      u = parseFloat(n ? o.y : 0),
                      l = Ct,
                      f = 0,
                      h = e.length,
                      d,
                      c;
                    h--;

                  )
                    n
                      ? ((d = e[h].x - a), (c = e[h].y - u), (d = d * d + c * c))
                      : (d = Math.abs(e[h] - a)),
                      d < l && ((l = d), (f = h));
                  return (f = !i || l <= i ? e[f] : o), n || f === o || nr(o) ? f : f + Ne(o);
                }
            : Ls(e)
        )
      );
    },
    Fa = function (e, r, t, i) {
      return br(Ue(e) ? !r : t === !0 ? !!(t = 0) : !i, function () {
        return Ue(e)
          ? e[~~(Math.random() * e.length)]
          : (t = t || 1e-5) &&
              (i = t < 1 ? Math.pow(10, (t + "").length - 2) : 1) &&
              Math.floor(Math.round((e - t / 2 + Math.random() * (r - e + t * 0.99)) / t) * t * i) /
                i;
      });
    },
    af = function () {
      for (var e = arguments.length, r = new Array(e), t = 0; t < e; t++) r[t] = arguments[t];
      return function (i) {
        return r.reduce(function (n, o) {
          return o(n);
        }, i);
      };
    },
    uf = function (e, r) {
      return function (t) {
        return e(parseFloat(t)) + (r || Ne(t));
      };
    },
    lf = function (e, r, t) {
      return za(e, r, 0, 1, t);
    },
    La = function (e, r, t) {
      return br(t, function (i) {
        return e[~~r(i)];
      });
    },
    ff = function s(e, r, t) {
      var i = r - e;
      return Ue(e)
        ? La(e, s(0, e.length), r)
        : br(t, function (n) {
            return ((i + ((n - e) % i)) % i) + e;
          });
    },
    cf = function s(e, r, t) {
      var i = r - e,
        n = i * 2;
      return Ue(e)
        ? La(e, s(0, e.length - 1), r)
        : br(t, function (o) {
            return (o = (n + ((o - e) % n)) % n || 0), e + (o > i ? n - o : o);
          });
    },
    _i = function (e) {
      for (var r = 0, t = "", i, n, o, a; ~(i = e.indexOf("random(", r)); )
        (o = e.indexOf(")", i)),
          (a = e.charAt(i + 7) === "["),
          (n = e.substr(i + 7, o - i - 7).match(a ? ya : Os)),
          (t += e.substr(r, i - r) + Fa(a ? n : +n[0], a ? 0 : +n[1], +n[2] || 1e-5)),
          (r = o + 1);
      return t + e.substr(r, e.length - r);
    },
    za = function (e, r, t, i, n) {
      var o = r - e,
        a = i - t;
      return br(n, function (u) {
        return t + (((u - e) / o) * a || 0);
      });
    },
    hf = function s(e, r, t, i) {
      var n = isNaN(e + r)
        ? 0
        : function (c) {
            return (1 - c) * e + c * r;
          };
      if (!n) {
        var o = Pe(e),
          a = {},
          u,
          l,
          f,
          h,
          d;
        if ((t === !0 && (i = 1) && (t = null), o)) (e = { p: e }), (r = { p: r });
        else if (Ue(e) && !Ue(r)) {
          for (f = [], h = e.length, d = h - 2, l = 1; l < h; l++) f.push(s(e[l - 1], e[l]));
          h--,
            (n = function (_) {
              _ *= h;
              var p = Math.min(d, ~~_);
              return f[p](_ - p);
            }),
            (t = r);
        } else i || (e = Yr(Ue(e) ? [] : {}, e));
        if (!f) {
          for (u in r) $s.call(a, e, u, "get", r[u]);
          n = function (_) {
            return eo(_, a) || (o ? e.p : e);
          };
        }
      }
      return br(t, n);
    },
    ha = function (e, r, t) {
      var i = e.labels,
        n = Ct,
        o,
        a,
        u;
      for (o in i) (a = i[o] - r), a < 0 == !!t && a && n > (a = Math.abs(a)) && ((u = o), (n = a));
      return u;
    },
    yt = function (e, r, t) {
      var i = e.vars,
        n = i[r],
        o = oe,
        a = e._ctx,
        u,
        l,
        f;
      if (n)
        return (
          (u = i[r + "Params"]),
          (l = i.callbackScope || e),
          t && vr.length && kn(),
          a && (oe = a),
          (f = u ? n.apply(l, u) : n.call(l)),
          (oe = o),
          f
        );
    },
    Li = function (e) {
      return (
        wr(e),
        e.scrollTrigger && e.scrollTrigger.kill(!!Xe),
        e.progress() < 1 && yt(e, "onInterrupt"),
        e
      );
    },
    fi,
    Na = [],
    Ia = function (e) {
      if (e)
        if (((e = (!e.name && e.default) || e), Bs() || e.headless)) {
          var r = e.name,
            t = pe(e),
            i =
              r && !t && e.init
                ? function () {
                    this._props = [];
                  }
                : e,
            n = { init: Vi, render: eo, add: $s, kill: Of, modifier: kf, rawVars: 0 },
            o = { targetTest: 0, get: 0, getSetter: zn, aliases: {}, register: 0 };
          if ((di(), e !== i)) {
            if (ft[r]) return;
            kt(i, kt(On(e, n), o)),
              Yr(i.prototype, Yr(n, On(e, o))),
              (ft[(i.prop = r)] = i),
              e.targetTest && (Sn.push(i), (Xs[r] = 1)),
              (r = (r === "css" ? "CSS" : r.charAt(0).toUpperCase() + r.substr(1)) + "Plugin");
          }
          wa(r, i), e.register && e.register(He, i, tt);
        } else Na.push(e);
    },
    ee = 255,
    zi = {
      aqua: [0, ee, ee],
      lime: [0, ee, 0],
      silver: [192, 192, 192],
      black: [0, 0, 0],
      maroon: [128, 0, 0],
      teal: [0, 128, 128],
      blue: [0, 0, ee],
      navy: [0, 0, 128],
      white: [ee, ee, ee],
      olive: [128, 128, 0],
      yellow: [ee, ee, 0],
      orange: [ee, 165, 0],
      gray: [128, 128, 128],
      purple: [128, 0, 128],
      green: [0, 128, 0],
      red: [ee, 0, 0],
      pink: [ee, 192, 203],
      cyan: [0, ee, ee],
      transparent: [ee, ee, ee, 0],
    },
    bs = function (e, r, t) {
      return (
        (e += e < 0 ? 1 : e > 1 ? -1 : 0),
        ((e * 6 < 1
          ? r + (t - r) * e * 6
          : e < 0.5
            ? t
            : e * 3 < 2
              ? r + (t - r) * (2 / 3 - e) * 6
              : r) *
          ee +
          0.5) |
          0
      );
    },
    Ba = function (e, r, t) {
      var i = e ? (nr(e) ? [e >> 16, (e >> 8) & ee, e & ee] : 0) : zi.black,
        n,
        o,
        a,
        u,
        l,
        f,
        h,
        d,
        c,
        _;
      if (!i) {
        if ((e.substr(-1) === "," && (e = e.substr(0, e.length - 1)), zi[e])) i = zi[e];
        else if (e.charAt(0) === "#") {
          if (
            (e.length < 6 &&
              ((n = e.charAt(1)),
              (o = e.charAt(2)),
              (a = e.charAt(3)),
              (e =
                "#" + n + n + o + o + a + a + (e.length === 5 ? e.charAt(4) + e.charAt(4) : ""))),
            e.length === 9)
          )
            return (
              (i = parseInt(e.substr(1, 6), 16)),
              [i >> 16, (i >> 8) & ee, i & ee, parseInt(e.substr(7), 16) / 255]
            );
          (e = parseInt(e.substr(1), 16)), (i = [e >> 16, (e >> 8) & ee, e & ee]);
        } else if (e.substr(0, 3) === "hsl") {
          if (((i = _ = e.match(Os)), !r))
            (u = (+i[0] % 360) / 360),
              (l = +i[1] / 100),
              (f = +i[2] / 100),
              (o = f <= 0.5 ? f * (l + 1) : f + l - f * l),
              (n = f * 2 - o),
              i.length > 3 && (i[3] *= 1),
              (i[0] = bs(u + 1 / 3, n, o)),
              (i[1] = bs(u, n, o)),
              (i[2] = bs(u - 1 / 3, n, o));
          else if (~e.indexOf("=")) return (i = e.match(Ys)), t && i.length < 4 && (i[3] = 1), i;
        } else i = e.match(Os) || zi.transparent;
        i = i.map(Number);
      }
      return (
        r &&
          !_ &&
          ((n = i[0] / ee),
          (o = i[1] / ee),
          (a = i[2] / ee),
          (h = Math.max(n, o, a)),
          (d = Math.min(n, o, a)),
          (f = (h + d) / 2),
          h === d
            ? (u = l = 0)
            : ((c = h - d),
              (l = f > 0.5 ? c / (2 - h - d) : c / (h + d)),
              (u =
                h === n
                  ? (o - a) / c + (o < a ? 6 : 0)
                  : h === o
                    ? (a - n) / c + 2
                    : (n - o) / c + 4),
              (u *= 60)),
          (i[0] = ~~(u + 0.5)),
          (i[1] = ~~(l * 100 + 0.5)),
          (i[2] = ~~(f * 100 + 0.5))),
        t && i.length < 4 && (i[3] = 1),
        i
      );
    },
    Ya = function (e) {
      var r = [],
        t = [],
        i = -1;
      return (
        e.split(ir).forEach(function (n) {
          var o = n.match(Vr) || [];
          r.push.apply(r, o), t.push((i += o.length + 1));
        }),
        (r.c = t),
        r
      );
    },
    pa = function (e, r, t) {
      var i = "",
        n = (e + i).match(ir),
        o = r ? "hsla(" : "rgba(",
        a = 0,
        u,
        l,
        f,
        h;
      if (!n) return e;
      if (
        ((n = n.map(function (d) {
          return (
            (d = Ba(d, r, 1)) &&
            o + (r ? d[0] + "," + d[1] + "%," + d[2] + "%," + d[3] : d.join(",")) + ")"
          );
        })),
        t && ((f = Ya(e)), (u = t.c), u.join(i) !== f.c.join(i)))
      )
        for (l = e.replace(ir, "1").split(Vr), h = l.length - 1; a < h; a++)
          i +=
            l[a] +
            (~u.indexOf(a)
              ? n.shift() || o + "0,0,0,0)"
              : (f.length ? f : n.length ? n : t).shift());
      if (!l) for (l = e.split(ir), h = l.length - 1; a < h; a++) i += l[a] + n[a];
      return i + l[h];
    },
    ir = (function () {
      var s = "(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b",
        e;
      for (e in zi) s += "|" + e + "\\b";
      return new RegExp(s + ")", "gi");
    })(),
    pf = /hsl[a]?\(/,
    qs = function (e) {
      var r = e.join(" "),
        t;
      if (((ir.lastIndex = 0), ir.test(r)))
        return (t = pf.test(r)), (e[1] = pa(e[1], t)), (e[0] = pa(e[0], t, Ya(e[1]))), !0;
    },
    Wi,
    ct = (function () {
      var s = Date.now,
        e = 500,
        r = 33,
        t = s(),
        i = t,
        n = 1e3 / 240,
        o = n,
        a = [],
        u,
        l,
        f,
        h,
        d,
        c,
        _ = function p(m) {
          var T = s() - i,
            b = m === !0,
            P,
            y,
            w,
            S;
          if (
            ((T > e || T < 0) && (t += T - r),
            (i += T),
            (w = i - t),
            (P = w - o),
            (P > 0 || b) &&
              ((S = ++h.frame),
              (d = w - h.time * 1e3),
              (h.time = w = w / 1e3),
              (o += P + (P >= n ? 4 : n - P)),
              (y = 1)),
            b || (u = l(p)),
            y)
          )
            for (c = 0; c < a.length; c++) a[c](w, d, S, m);
        };
      return (
        (h = {
          time: 0,
          frame: 0,
          tick: function () {
            _(!0);
          },
          deltaRatio: function (m) {
            return d / (1e3 / (m || 60));
          },
          wake: function () {
            va &&
              (!Es &&
                Bs() &&
                ((Gt = Es = window),
                (Ws = Gt.document || {}),
                (vt.gsap = He),
                (Gt.gsapVersions || (Gt.gsapVersions = [])).push(He.version),
                xa(Pn || Gt.GreenSockGlobals || (!Gt.gsap && Gt) || {}),
                Na.forEach(Ia)),
              (f = typeof requestAnimationFrame < "u" && requestAnimationFrame),
              u && h.sleep(),
              (l =
                f ||
                function (m) {
                  return setTimeout(m, (o - h.time * 1e3 + 1) | 0);
                }),
              (Wi = 1),
              _(2));
          },
          sleep: function () {
            (f ? cancelAnimationFrame : clearTimeout)(u), (Wi = 0), (l = Vi);
          },
          lagSmoothing: function (m, T) {
            (e = m || 1 / 0), (r = Math.min(T || 33, e));
          },
          fps: function (m) {
            (n = 1e3 / (m || 240)), (o = h.time * 1e3 + n);
          },
          add: function (m, T, b) {
            var P = T
              ? function (y, w, S, x) {
                  m(y, w, S, x), h.remove(P);
                }
              : m;
            return h.remove(m), a[b ? "unshift" : "push"](P), di(), P;
          },
          remove: function (m, T) {
            ~(T = a.indexOf(m)) && a.splice(T, 1) && c >= T && c--;
          },
          _listeners: a,
        }),
        h
      );
    })(),
    di = function () {
      return !Wi && ct.wake();
    },
    q = {},
    df = /^[\d.\-M][\d.\-,\s]/,
    _f = /["']/g,
    gf = function (e) {
      for (
        var r = {},
          t = e.substr(1, e.length - 3).split(":"),
          i = t[0],
          n = 1,
          o = t.length,
          a,
          u,
          l;
        n < o;
        n++
      )
        (u = t[n]),
          (a = n !== o - 1 ? u.lastIndexOf(",") : u.length),
          (l = u.substr(0, a)),
          (r[i] = isNaN(l) ? l.replace(_f, "").trim() : +l),
          (i = u.substr(a + 1).trim());
      return r;
    },
    mf = function (e) {
      var r = e.indexOf("(") + 1,
        t = e.indexOf(")"),
        i = e.indexOf("(", r);
      return e.substring(r, ~i && i < t ? e.indexOf(")", t + 1) : t);
    },
    yf = function (e) {
      var r = (e + "").split("("),
        t = q[r[0]];
      return t && r.length > 1 && t.config
        ? t.config.apply(null, ~e.indexOf("{") ? [gf(r[1])] : mf(e).split(",").map(Sa))
        : q._CE && df.test(e)
          ? q._CE("", e)
          : t;
    },
    Va = function (e) {
      return function (r) {
        return 1 - e(1 - r);
      };
    },
    Wa = function s(e, r) {
      for (var t = e._first, i; t; )
        t instanceof ze
          ? s(t, r)
          : t.vars.yoyoEase &&
            (!t._yoyo || !t._repeat) &&
            t._yoyo !== r &&
            (t.timeline
              ? s(t.timeline, r)
              : ((i = t._ease), (t._ease = t._yEase), (t._yEase = i), (t._yoyo = r))),
          (t = t._next);
    },
    Ir = function (e, r) {
      return (e && (pe(e) ? e : q[e] || yf(e))) || r;
    },
    Xr = function (e, r, t, i) {
      t === void 0 &&
        (t = function (u) {
          return 1 - r(1 - u);
        }),
        i === void 0 &&
          (i = function (u) {
            return u < 0.5 ? r(u * 2) / 2 : 1 - r((1 - u) * 2) / 2;
          });
      var n = { easeIn: r, easeOut: t, easeInOut: i },
        o;
      return (
        et(e, function (a) {
          (q[a] = vt[a] = n), (q[(o = a.toLowerCase())] = t);
          for (var u in n)
            q[o + (u === "easeIn" ? ".in" : u === "easeOut" ? ".out" : ".inOut")] = q[a + "." + u] =
              n[u];
        }),
        n
      );
    },
    Xa = function (e) {
      return function (r) {
        return r < 0.5 ? (1 - e(1 - r * 2)) / 2 : 0.5 + e((r - 0.5) * 2) / 2;
      };
    },
    Ts = function s(e, r, t) {
      var i = r >= 1 ? r : 1,
        n = (t || (e ? 0.3 : 0.45)) / (r < 1 ? r : 1),
        o = (n / ks) * (Math.asin(1 / i) || 0),
        a = function (f) {
          return f === 1 ? 1 : i * Math.pow(2, -10 * f) * Hl((f - o) * n) + 1;
        },
        u =
          e === "out"
            ? a
            : e === "in"
              ? function (l) {
                  return 1 - a(1 - l);
                }
              : Xa(a);
      return (
        (n = ks / n),
        (u.config = function (l, f) {
          return s(e, l, f);
        }),
        u
      );
    },
    Ss = function s(e, r) {
      r === void 0 && (r = 1.70158);
      var t = function (o) {
          return o ? --o * o * ((r + 1) * o + r) + 1 : 0;
        },
        i =
          e === "out"
            ? t
            : e === "in"
              ? function (n) {
                  return 1 - t(1 - n);
                }
              : Xa(t);
      return (
        (i.config = function (n) {
          return s(e, n);
        }),
        i
      );
    };
  et("Linear,Quad,Cubic,Quart,Quint,Strong", function (s, e) {
    var r = e < 5 ? e + 1 : e;
    Xr(
      s + ",Power" + (r - 1),
      e
        ? function (t) {
            return Math.pow(t, r);
          }
        : function (t) {
            return t;
          },
      function (t) {
        return 1 - Math.pow(1 - t, r);
      },
      function (t) {
        return t < 0.5 ? Math.pow(t * 2, r) / 2 : 1 - Math.pow((1 - t) * 2, r) / 2;
      }
    );
  });
  q.Linear.easeNone = q.none = q.Linear.easeIn;
  Xr("Elastic", Ts("in"), Ts("out"), Ts());
  (function (s, e) {
    var r = 1 / e,
      t = 2 * r,
      i = 2.5 * r,
      n = function (a) {
        return a < r
          ? s * a * a
          : a < t
            ? s * Math.pow(a - 1.5 / e, 2) + 0.75
            : a < i
              ? s * (a -= 2.25 / e) * a + 0.9375
              : s * Math.pow(a - 2.625 / e, 2) + 0.984375;
      };
    Xr(
      "Bounce",
      function (o) {
        return 1 - n(1 - o);
      },
      n
    );
  })(7.5625, 2.75);
  Xr("Expo", function (s) {
    return s ? Math.pow(2, 10 * (s - 1)) : 0;
  });
  Xr("Circ", function (s) {
    return -(ga(1 - s * s) - 1);
  });
  Xr("Sine", function (s) {
    return s === 1 ? 1 : -Ul(s * Wl) + 1;
  });
  Xr("Back", Ss("in"), Ss("out"), Ss());
  q.SteppedEase =
    q.steps =
    vt.SteppedEase =
      {
        config: function (e, r) {
          e === void 0 && (e = 1);
          var t = 1 / e,
            i = e + (r ? 0 : 1),
            n = r ? 1 : 0,
            o = 1 - te;
          return function (a) {
            return (((i * Ui(0, o, a)) | 0) + n) * t;
          };
        },
      };
  ci.ease = q["quad.out"];
  et("onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt", function (s) {
    return (Us += s + "," + s + "Params,");
  });
  var js = function (e, r) {
      (this.id = Xl++),
        (e._gsap = this),
        (this.target = e),
        (this.harness = r),
        (this.get = r ? r.get : Gs),
        (this.set = r ? r.getSetter : zn);
    },
    Xi = (function () {
      function s(r) {
        (this.vars = r),
          (this._delay = +r.delay || 0),
          (this._repeat = r.repeat === 1 / 0 ? -2 : r.repeat || 0) &&
            ((this._rDelay = r.repeatDelay || 0), (this._yoyo = !!r.yoyo || !!r.yoyoEase)),
          (this._ts = 1),
          pi(this, +r.duration, 1, 1),
          (this.data = r.data),
          oe && ((this._ctx = oe), oe.data.push(this)),
          Wi || ct.wake();
      }
      var e = s.prototype;
      return (
        (e.delay = function (t) {
          return t || t === 0
            ? (this.parent &&
                this.parent.smoothChildTiming &&
                this.startTime(this._start + t - this._delay),
              (this._delay = t),
              this)
            : this._delay;
        }),
        (e.duration = function (t) {
          return arguments.length
            ? this.totalDuration(this._repeat > 0 ? t + (t + this._rDelay) * this._repeat : t)
            : this.totalDuration() && this._dur;
        }),
        (e.totalDuration = function (t) {
          return arguments.length
            ? ((this._dirty = 0),
              pi(
                this,
                this._repeat < 0 ? t : (t - this._repeat * this._rDelay) / (this._repeat + 1)
              ))
            : this._tDur;
        }),
        (e.totalTime = function (t, i) {
          if ((di(), !arguments.length)) return this._tTime;
          var n = this._dp;
          if (n && n.smoothChildTiming && this._ts) {
            for (Ln(this, t), !n._dp || n.parent || ka(n, this); n && n.parent; )
              n.parent._time !==
                n._start +
                  (n._ts >= 0 ? n._tTime / n._ts : (n.totalDuration() - n._tTime) / -n._ts) &&
                n.totalTime(n._tTime, !0),
                (n = n.parent);
            !this.parent &&
              this._dp.autoRemoveChildren &&
              ((this._ts > 0 && t < this._tDur) ||
                (this._ts < 0 && t > 0) ||
                (!this._tDur && !t)) &&
              qt(this._dp, this, this._start - this._delay);
          }
          return (
            (this._tTime !== t ||
              (!this._dur && !i) ||
              (this._initted && Math.abs(this._zTime) === te) ||
              (!t && !this._initted && (this.add || this._ptLookup))) &&
              (this._ts || (this._pTime = t), Ta(this, t, i)),
            this
          );
        }),
        (e.time = function (t, i) {
          return arguments.length
            ? this.totalTime(
                Math.min(this.totalDuration(), t + fa(this)) % (this._dur + this._rDelay) ||
                  (t ? this._dur : 0),
                i
              )
            : this._time;
        }),
        (e.totalProgress = function (t, i) {
          return arguments.length
            ? this.totalTime(this.totalDuration() * t, i)
            : this.totalDuration()
              ? Math.min(1, this._tTime / this._tDur)
              : this.rawTime() > 0
                ? 1
                : 0;
        }),
        (e.progress = function (t, i) {
          return arguments.length
            ? this.totalTime(
                this.duration() * (this._yoyo && !(this.iteration() & 1) ? 1 - t : t) + fa(this),
                i
              )
            : this.duration()
              ? Math.min(1, this._time / this._dur)
              : this.rawTime() > 0
                ? 1
                : 0;
        }),
        (e.iteration = function (t, i) {
          var n = this.duration() + this._rDelay;
          return arguments.length
            ? this.totalTime(this._time + (t - 1) * n, i)
            : this._repeat
              ? hi(this._tTime, n) + 1
              : 1;
        }),
        (e.timeScale = function (t, i) {
          if (!arguments.length) return this._rts === -te ? 0 : this._rts;
          if (this._rts === t) return this;
          var n = this.parent && this._ts ? En(this.parent._time, this) : this._tTime;
          return (
            (this._rts = +t || 0),
            (this._ts = this._ps || t === -te ? 0 : this._rts),
            this.totalTime(Ui(-Math.abs(this._delay), this._tDur, n), i !== !1),
            Fn(this),
            Zl(this)
          );
        }),
        (e.paused = function (t) {
          return arguments.length
            ? (this._ps !== t &&
                ((this._ps = t),
                t
                  ? ((this._pTime = this._tTime || Math.max(-this._delay, this.rawTime())),
                    (this._ts = this._act = 0))
                  : (di(),
                    (this._ts = this._rts),
                    this.totalTime(
                      this.parent && !this.parent.smoothChildTiming
                        ? this.rawTime()
                        : this._tTime || this._pTime,
                      this.progress() === 1 && Math.abs(this._zTime) !== te && (this._tTime -= te)
                    ))),
              this)
            : this._ps;
        }),
        (e.startTime = function (t) {
          if (arguments.length) {
            this._start = t;
            var i = this.parent || this._dp;
            return i && (i._sort || !this.parent) && qt(i, this, t - this._delay), this;
          }
          return this._start;
        }),
        (e.endTime = function (t) {
          return (
            this._start + (ht(t) ? this.totalDuration() : this.duration()) / Math.abs(this._ts || 1)
          );
        }),
        (e.rawTime = function (t) {
          var i = this.parent || this._dp;
          return i
            ? t && (!this._ts || (this._repeat && this._time && this.totalProgress() < 1))
              ? this._tTime % (this._dur + this._rDelay)
              : this._ts
                ? En(i.rawTime(t), this)
                : this._tTime
            : this._tTime;
        }),
        (e.revert = function (t) {
          t === void 0 && (t = jl);
          var i = Xe;
          return (
            (Xe = t),
            (this._initted || this._startAt) &&
              (this.timeline && this.timeline.revert(t), this.totalTime(-0.01, t.suppressEvents)),
            this.data !== "nested" && t.kill !== !1 && this.kill(),
            (Xe = i),
            this
          );
        }),
        (e.globalTime = function (t) {
          for (var i = this, n = arguments.length ? t : i.rawTime(); i; )
            (n = i._start + n / (Math.abs(i._ts) || 1)), (i = i._dp);
          return !this.parent && this._sat ? this._sat.globalTime(t) : n;
        }),
        (e.repeat = function (t) {
          return arguments.length
            ? ((this._repeat = t === 1 / 0 ? -2 : t), ca(this))
            : this._repeat === -2
              ? 1 / 0
              : this._repeat;
        }),
        (e.repeatDelay = function (t) {
          if (arguments.length) {
            var i = this._time;
            return (this._rDelay = t), ca(this), i ? this.time(i) : this;
          }
          return this._rDelay;
        }),
        (e.yoyo = function (t) {
          return arguments.length ? ((this._yoyo = t), this) : this._yoyo;
        }),
        (e.seek = function (t, i) {
          return this.totalTime(St(this, t), ht(i));
        }),
        (e.restart = function (t, i) {
          return this.play().totalTime(t ? -this._delay : 0, ht(i));
        }),
        (e.play = function (t, i) {
          return t != null && this.seek(t, i), this.reversed(!1).paused(!1);
        }),
        (e.reverse = function (t, i) {
          return t != null && this.seek(t || this.totalDuration(), i), this.reversed(!0).paused(!1);
        }),
        (e.pause = function (t, i) {
          return t != null && this.seek(t, i), this.paused(!0);
        }),
        (e.resume = function () {
          return this.paused(!1);
        }),
        (e.reversed = function (t) {
          return arguments.length
            ? (!!t !== this.reversed() && this.timeScale(-this._rts || (t ? -te : 0)), this)
            : this._rts < 0;
        }),
        (e.invalidate = function () {
          return (this._initted = this._act = 0), (this._zTime = -te), this;
        }),
        (e.isActive = function () {
          var t = this.parent || this._dp,
            i = this._start,
            n;
          return !!(
            !t ||
            (this._ts &&
              this._initted &&
              t.isActive() &&
              (n = t.rawTime(!0)) >= i &&
              n < this.endTime(!0) - te)
          );
        }),
        (e.eventCallback = function (t, i, n) {
          var o = this.vars;
          return arguments.length > 1
            ? (i
                ? ((o[t] = i), n && (o[t + "Params"] = n), t === "onUpdate" && (this._onUpdate = i))
                : delete o[t],
              this)
            : o[t];
        }),
        (e.then = function (t) {
          var i = this;
          return new Promise(function (n) {
            var o = pe(t) ? t : Ca,
              a = function () {
                var l = i.then;
                (i.then = null),
                  pe(o) && (o = o(i)) && (o.then || o === i) && (i.then = l),
                  n(o),
                  (i.then = l);
              };
            (i._initted && i.totalProgress() === 1 && i._ts >= 0) || (!i._tTime && i._ts < 0)
              ? a()
              : (i._prom = a);
          });
        }),
        (e.kill = function () {
          Li(this);
        }),
        s
      );
    })();
  kt(Xi.prototype, {
    _time: 0,
    _start: 0,
    _end: 0,
    _tTime: 0,
    _tDur: 0,
    _dirty: 0,
    _repeat: 0,
    _yoyo: !1,
    parent: null,
    _initted: !1,
    _rDelay: 0,
    _ts: 1,
    _dp: 0,
    ratio: 0,
    _zTime: -te,
    _prom: 0,
    _ps: !1,
    _rts: 1,
  });
  var ze = (function (s) {
    _a(e, s);
    function e(t, i) {
      var n;
      return (
        t === void 0 && (t = {}),
        (n = s.call(this, t) || this),
        (n.labels = {}),
        (n.smoothChildTiming = !!t.smoothChildTiming),
        (n.autoRemoveChildren = !!t.autoRemoveChildren),
        (n._sort = ht(t.sortChildren)),
        ue && qt(t.parent || ue, rr(n), i),
        t.reversed && n.reverse(),
        t.paused && n.paused(!0),
        t.scrollTrigger && Oa(rr(n), t.scrollTrigger),
        n
      );
    }
    var r = e.prototype;
    return (
      (r.to = function (i, n, o) {
        return Ii(0, arguments, this), this;
      }),
      (r.from = function (i, n, o) {
        return Ii(1, arguments, this), this;
      }),
      (r.fromTo = function (i, n, o, a) {
        return Ii(2, arguments, this), this;
      }),
      (r.set = function (i, n, o) {
        return (
          (n.duration = 0),
          (n.parent = this),
          Ni(n).repeatDelay || (n.repeat = 0),
          (n.immediateRender = !!n.immediateRender),
          new ve(i, n, St(this, o), 1),
          this
        );
      }),
      (r.call = function (i, n, o) {
        return qt(this, ve.delayedCall(0, i, n), o);
      }),
      (r.staggerTo = function (i, n, o, a, u, l, f) {
        return (
          (o.duration = n),
          (o.stagger = o.stagger || a),
          (o.onComplete = l),
          (o.onCompleteParams = f),
          (o.parent = this),
          new ve(i, o, St(this, u)),
          this
        );
      }),
      (r.staggerFrom = function (i, n, o, a, u, l, f) {
        return (
          (o.runBackwards = 1),
          (Ni(o).immediateRender = ht(o.immediateRender)),
          this.staggerTo(i, n, o, a, u, l, f)
        );
      }),
      (r.staggerFromTo = function (i, n, o, a, u, l, f, h) {
        return (
          (a.startAt = o),
          (Ni(a).immediateRender = ht(a.immediateRender)),
          this.staggerTo(i, n, a, u, l, f, h)
        );
      }),
      (r.render = function (i, n, o) {
        var a = this._time,
          u = this._dirty ? this.totalDuration() : this._tDur,
          l = this._dur,
          f = i <= 0 ? 0 : Me(i),
          h = this._zTime < 0 != i < 0 && (this._initted || !l),
          d,
          c,
          _,
          p,
          m,
          T,
          b,
          P,
          y,
          w,
          S,
          x;
        if ((this !== ue && f > u && i >= 0 && (f = u), f !== this._tTime || o || h)) {
          if (
            (a !== this._time && l && ((f += this._time - a), (i += this._time - a)),
            (d = f),
            (y = this._start),
            (P = this._ts),
            (T = !P),
            h && (l || (a = this._zTime), (i || !n) && (this._zTime = i)),
            this._repeat)
          ) {
            if (((S = this._yoyo), (m = l + this._rDelay), this._repeat < -1 && i < 0))
              return this.totalTime(m * 100 + i, n, o);
            if (
              ((d = Me(f % m)),
              f === u
                ? ((p = this._repeat), (d = l))
                : ((p = ~~(f / m)), p && p === f / m && ((d = l), p--), d > l && (d = l)),
              (w = hi(this._tTime, m)),
              !a && this._tTime && w !== p && this._tTime - w * m - this._dur <= 0 && (w = p),
              S && p & 1 && ((d = l - d), (x = 1)),
              p !== w && !this._lock)
            ) {
              var O = S && w & 1,
                C = O === (S && p & 1);
              if (
                (p < w && (O = !O),
                (a = O ? 0 : f % l ? l : f),
                (this._lock = 1),
                (this.render(a || (x ? 0 : Me(p * m)), n, !l)._lock = 0),
                (this._tTime = f),
                !n && this.parent && yt(this, "onRepeat"),
                this.vars.repeatRefresh && !x && (this.invalidate()._lock = 1),
                (a && a !== this._time) ||
                  T !== !this._ts ||
                  (this.vars.onRepeat && !this.parent && !this._act))
              )
                return this;
              if (
                ((l = this._dur),
                (u = this._tDur),
                C &&
                  ((this._lock = 2),
                  (a = O ? l : -1e-4),
                  this.render(a, !0),
                  this.vars.repeatRefresh && !x && this.invalidate()),
                (this._lock = 0),
                !this._ts && !T)
              )
                return this;
              Wa(this, x);
            }
          }
          if (
            (this._hasPause &&
              !this._forcing &&
              this._lock < 2 &&
              ((b = rf(this, Me(a), Me(d))), b && (f -= d - (d = b._start))),
            (this._tTime = f),
            (this._time = d),
            (this._act = !P),
            this._initted ||
              ((this._onUpdate = this.vars.onUpdate),
              (this._initted = 1),
              (this._zTime = i),
              (a = 0)),
            !a && d && !n && !p && (yt(this, "onStart"), this._tTime !== f))
          )
            return this;
          if (d >= a && i >= 0)
            for (c = this._first; c; ) {
              if (((_ = c._next), (c._act || d >= c._start) && c._ts && b !== c)) {
                if (c.parent !== this) return this.render(i, n, o);
                if (
                  (c.render(
                    c._ts > 0
                      ? (d - c._start) * c._ts
                      : (c._dirty ? c.totalDuration() : c._tDur) + (d - c._start) * c._ts,
                    n,
                    o
                  ),
                  d !== this._time || (!this._ts && !T))
                ) {
                  (b = 0), _ && (f += this._zTime = -te);
                  break;
                }
              }
              c = _;
            }
          else {
            c = this._last;
            for (var k = i < 0 ? i : d; c; ) {
              if (((_ = c._prev), (c._act || k <= c._end) && c._ts && b !== c)) {
                if (c.parent !== this) return this.render(i, n, o);
                if (
                  (c.render(
                    c._ts > 0
                      ? (k - c._start) * c._ts
                      : (c._dirty ? c.totalDuration() : c._tDur) + (k - c._start) * c._ts,
                    n,
                    o || (Xe && (c._initted || c._startAt))
                  ),
                  d !== this._time || (!this._ts && !T))
                ) {
                  (b = 0), _ && (f += this._zTime = k ? -te : te);
                  break;
                }
              }
              c = _;
            }
          }
          if (
            b &&
            !n &&
            (this.pause(), (b.render(d >= a ? 0 : -te)._zTime = d >= a ? 1 : -1), this._ts)
          )
            return (this._start = y), Fn(this), this.render(i, n, o);
          this._onUpdate && !n && yt(this, "onUpdate", !0),
            ((f === u && this._tTime >= this.totalDuration()) || (!f && a)) &&
              (y === this._start || Math.abs(P) !== Math.abs(this._ts)) &&
              (this._lock ||
                ((i || !l) && ((f === u && this._ts > 0) || (!f && this._ts < 0)) && wr(this, 1),
                !n &&
                  !(i < 0 && !a) &&
                  (f || a || !u) &&
                  (yt(this, f === u && i >= 0 ? "onComplete" : "onReverseComplete", !0),
                  this._prom && !(f < u && this.timeScale() > 0) && this._prom())));
        }
        return this;
      }),
      (r.add = function (i, n) {
        var o = this;
        if ((nr(n) || (n = St(this, n, i)), !(i instanceof Xi))) {
          if (Ue(i))
            return (
              i.forEach(function (a) {
                return o.add(a, n);
              }),
              this
            );
          if (Pe(i)) return this.addLabel(i, n);
          if (pe(i)) i = ve.delayedCall(0, i);
          else return this;
        }
        return this !== i ? qt(this, i, n) : this;
      }),
      (r.getChildren = function (i, n, o, a) {
        i === void 0 && (i = !0),
          n === void 0 && (n = !0),
          o === void 0 && (o = !0),
          a === void 0 && (a = -Ct);
        for (var u = [], l = this._first; l; )
          l._start >= a &&
            (l instanceof ve
              ? n && u.push(l)
              : (o && u.push(l), i && u.push.apply(u, l.getChildren(!0, n, o)))),
            (l = l._next);
        return u;
      }),
      (r.getById = function (i) {
        for (var n = this.getChildren(1, 1, 1), o = n.length; o--; )
          if (n[o].vars.id === i) return n[o];
      }),
      (r.remove = function (i) {
        return Pe(i)
          ? this.removeLabel(i)
          : pe(i)
            ? this.killTweensOf(i)
            : (Rn(this, i), i === this._recent && (this._recent = this._last), Nr(this));
      }),
      (r.totalTime = function (i, n) {
        return arguments.length
          ? ((this._forcing = 1),
            !this._dp &&
              this._ts &&
              (this._start = Me(
                ct.time - (this._ts > 0 ? i / this._ts : (this.totalDuration() - i) / -this._ts)
              )),
            s.prototype.totalTime.call(this, i, n),
            (this._forcing = 0),
            this)
          : this._tTime;
      }),
      (r.addLabel = function (i, n) {
        return (this.labels[i] = St(this, n)), this;
      }),
      (r.removeLabel = function (i) {
        return delete this.labels[i], this;
      }),
      (r.addPause = function (i, n, o) {
        var a = ve.delayedCall(0, n || Vi, o);
        return (a.data = "isPause"), (this._hasPause = 1), qt(this, a, St(this, i));
      }),
      (r.removePause = function (i) {
        var n = this._first;
        for (i = St(this, i); n; ) n._start === i && n.data === "isPause" && wr(n), (n = n._next);
      }),
      (r.killTweensOf = function (i, n, o) {
        for (var a = this.getTweensOf(i, o), u = a.length; u--; ) yr !== a[u] && a[u].kill(i, n);
        return this;
      }),
      (r.getTweensOf = function (i, n) {
        for (var o = [], a = Pt(i), u = this._first, l = nr(n), f; u; )
          u instanceof ve
            ? $l(u._targets, a) &&
              (l
                ? (!yr || (u._initted && u._ts)) &&
                  u.globalTime(0) <= n &&
                  u.globalTime(u.totalDuration()) > n
                : !n || u.isActive()) &&
              o.push(u)
            : (f = u.getTweensOf(a, n)).length && o.push.apply(o, f),
            (u = u._next);
        return o;
      }),
      (r.tweenTo = function (i, n) {
        n = n || {};
        var o = this,
          a = St(o, i),
          u = n,
          l = u.startAt,
          f = u.onStart,
          h = u.onStartParams,
          d = u.immediateRender,
          c,
          _ = ve.to(
            o,
            kt(
              {
                ease: n.ease || "none",
                lazy: !1,
                immediateRender: !1,
                time: a,
                overwrite: "auto",
                duration:
                  n.duration ||
                  Math.abs((a - (l && "time" in l ? l.time : o._time)) / o.timeScale()) ||
                  te,
                onStart: function () {
                  if ((o.pause(), !c)) {
                    var m =
                      n.duration ||
                      Math.abs((a - (l && "time" in l ? l.time : o._time)) / o.timeScale());
                    _._dur !== m && pi(_, m, 0, 1).render(_._time, !0, !0), (c = 1);
                  }
                  f && f.apply(_, h || []);
                },
              },
              n
            )
          );
        return d ? _.render(0) : _;
      }),
      (r.tweenFromTo = function (i, n, o) {
        return this.tweenTo(n, kt({ startAt: { time: St(this, i) } }, o));
      }),
      (r.recent = function () {
        return this._recent;
      }),
      (r.nextLabel = function (i) {
        return i === void 0 && (i = this._time), ha(this, St(this, i));
      }),
      (r.previousLabel = function (i) {
        return i === void 0 && (i = this._time), ha(this, St(this, i), 1);
      }),
      (r.currentLabel = function (i) {
        return arguments.length ? this.seek(i, !0) : this.previousLabel(this._time + te);
      }),
      (r.shiftChildren = function (i, n, o) {
        o === void 0 && (o = 0);
        for (var a = this._first, u = this.labels, l; a; )
          a._start >= o && ((a._start += i), (a._end += i)), (a = a._next);
        if (n) for (l in u) u[l] >= o && (u[l] += i);
        return Nr(this);
      }),
      (r.invalidate = function (i) {
        var n = this._first;
        for (this._lock = 0; n; ) n.invalidate(i), (n = n._next);
        return s.prototype.invalidate.call(this, i);
      }),
      (r.clear = function (i) {
        i === void 0 && (i = !0);
        for (var n = this._first, o; n; ) (o = n._next), this.remove(n), (n = o);
        return (
          this._dp && (this._time = this._tTime = this._pTime = 0),
          i && (this.labels = {}),
          Nr(this)
        );
      }),
      (r.totalDuration = function (i) {
        var n = 0,
          o = this,
          a = o._last,
          u = Ct,
          l,
          f,
          h;
        if (arguments.length)
          return o.timeScale(
            (o._repeat < 0 ? o.duration() : o.totalDuration()) / (o.reversed() ? -i : i)
          );
        if (o._dirty) {
          for (h = o.parent; a; )
            (l = a._prev),
              a._dirty && a.totalDuration(),
              (f = a._start),
              f > u && o._sort && a._ts && !o._lock
                ? ((o._lock = 1), (qt(o, a, f - a._delay, 1)._lock = 0))
                : (u = f),
              f < 0 &&
                a._ts &&
                ((n -= f),
                ((!h && !o._dp) || (h && h.smoothChildTiming)) &&
                  ((o._start += f / o._ts), (o._time -= f), (o._tTime -= f)),
                o.shiftChildren(-f, !1, -1 / 0),
                (u = 0)),
              a._end > n && a._ts && (n = a._end),
              (a = l);
          pi(o, o === ue && o._time > n ? o._time : n, 1, 1), (o._dirty = 0);
        }
        return o._tDur;
      }),
      (e.updateRoot = function (i) {
        if ((ue._ts && (Ta(ue, En(i, ue)), (ba = ct.frame)), ct.frame >= ua)) {
          ua += pt.autoSleep || 120;
          var n = ue._first;
          if ((!n || !n._ts) && pt.autoSleep && ct._listeners.length < 2) {
            for (; n && !n._ts; ) n = n._next;
            n || ct.sleep();
          }
        }
      }),
      e
    );
  })(Xi);
  kt(ze.prototype, { _lock: 0, _hasPause: 0, _forcing: 0 });
  var vf = function (e, r, t, i, n, o, a) {
      var u = new tt(this._pt, e, r, 0, 1, Js, null, n),
        l = 0,
        f = 0,
        h,
        d,
        c,
        _,
        p,
        m,
        T,
        b;
      for (
        u.b = t,
          u.e = i,
          t += "",
          i += "",
          (T = ~i.indexOf("random(")) && (i = _i(i)),
          o && ((b = [t, i]), o(b, e, r), (t = b[0]), (i = b[1])),
          d = t.match(xs) || [];
        (h = xs.exec(i));

      )
        (_ = h[0]),
          (p = i.substring(l, h.index)),
          c ? (c = (c + 1) % 5) : p.substr(-5) === "rgba(" && (c = 1),
          _ !== d[f++] &&
            ((m = parseFloat(d[f - 1]) || 0),
            (u._pt = {
              _next: u._pt,
              p: p || f === 1 ? p : ",",
              s: m,
              c: _.charAt(1) === "=" ? Wr(m, _) - m : parseFloat(_) - m,
              m: c && c < 4 ? Math.round : 0,
            }),
            (l = xs.lastIndex));
      return (
        (u.c = l < i.length ? i.substring(l, i.length) : ""),
        (u.fp = a),
        (Vs.test(i) || T) && (u.e = 0),
        (this._pt = u),
        u
      );
    },
    $s = function (e, r, t, i, n, o, a, u, l, f) {
      pe(i) && (i = i(n || 0, e, o));
      var h = e[r],
        d =
          t !== "get"
            ? t
            : pe(h)
              ? l
                ? e[r.indexOf("set") || !pe(e["get" + r.substr(3)]) ? r : "get" + r.substr(3)](l)
                : e[r]()
              : h,
        c = pe(h) ? (l ? Sf : Ga) : Zs,
        _;
      if (
        (Pe(i) &&
          (~i.indexOf("random(") && (i = _i(i)),
          i.charAt(1) === "=" && ((_ = Wr(d, i) + (Ne(d) || 0)), (_ || _ === 0) && (i = _))),
        !f || d !== i || zs)
      )
        return !isNaN(d * i) && i !== ""
          ? ((_ = new tt(
              this._pt,
              e,
              r,
              +d || 0,
              i - (d || 0),
              typeof h == "boolean" ? Pf : qa,
              0,
              c
            )),
            l && (_.fp = l),
            a && _.modifier(a, this, e),
            (this._pt = _))
          : (!h && !(r in e) && An(r, i), vf.call(this, e, r, d, i, c, u || pt.stringFilter, l));
    },
    xf = function (e, r, t, i, n) {
      if ((pe(e) && (e = Bi(e, n, r, t, i)), !jt(e) || (e.style && e.nodeType) || Ue(e) || ma(e)))
        return Pe(e) ? Bi(e, n, r, t, i) : e;
      var o = {},
        a;
      for (a in e) o[a] = Bi(e[a], n, r, t, i);
      return o;
    },
    Ks = function (e, r, t, i, n, o) {
      var a, u, l, f;
      if (
        ft[e] &&
        (a = new ft[e]()).init(n, a.rawVars ? r[e] : xf(r[e], i, n, o, t), t, i, o) !== !1 &&
        ((t._pt = u = new tt(t._pt, n, e, 0, 1, a.render, a, 0, a.priority)), t !== fi)
      )
        for (l = t._ptLookup[t._targets.indexOf(n)], f = a._props.length; f--; ) l[a._props[f]] = u;
      return a;
    },
    yr,
    zs,
    Qs = function s(e, r, t) {
      var i = e.vars,
        n = i.ease,
        o = i.startAt,
        a = i.immediateRender,
        u = i.lazy,
        l = i.onUpdate,
        f = i.runBackwards,
        h = i.yoyoEase,
        d = i.keyframes,
        c = i.autoRevert,
        _ = e._dur,
        p = e._startAt,
        m = e._targets,
        T = e.parent,
        b = T && T.data === "nested" ? T.vars.targets : m,
        P = e._overwrite === "auto" && !Is,
        y = e.timeline,
        w,
        S,
        x,
        O,
        C,
        k,
        F,
        E,
        Y,
        B,
        $,
        H,
        L;
      if (
        (y && (!d || !n) && (n = "none"),
        (e._ease = Ir(n, ci.ease)),
        (e._yEase = h ? Va(Ir(h === !0 ? n : h, ci.ease)) : 0),
        h && e._yoyo && !e._repeat && ((h = e._yEase), (e._yEase = e._ease), (e._ease = h)),
        (e._from = !y && !!i.runBackwards),
        !y || (d && !i.stagger))
      ) {
        if (
          ((E = m[0] ? xr(m[0]).harness : 0),
          (H = E && i[E.prop]),
          (w = On(i, Xs)),
          p &&
            (p._zTime < 0 && p.progress(1),
            r < 0 && f && a && !c ? p.render(-1, !0) : p.revert(f && _ ? Tn : ql),
            (p._lazy = 0)),
          o)
        ) {
          if (
            (wr(
              (e._startAt = ve.set(
                m,
                kt(
                  {
                    data: "isStart",
                    overwrite: !1,
                    parent: T,
                    immediateRender: !0,
                    lazy: !p && ht(u),
                    startAt: null,
                    delay: 0,
                    onUpdate:
                      l &&
                      function () {
                        return yt(e, "onUpdate");
                      },
                    stagger: 0,
                  },
                  o
                )
              ))
            ),
            (e._startAt._dp = 0),
            (e._startAt._sat = e),
            r < 0 && (Xe || (!a && !c)) && e._startAt.revert(Tn),
            a && _ && r <= 0 && t <= 0)
          ) {
            r && (e._zTime = r);
            return;
          }
        } else if (f && _ && !p) {
          if (
            (r && (a = !1),
            (x = kt(
              {
                overwrite: !1,
                data: "isFromStart",
                lazy: a && !p && ht(u),
                immediateRender: a,
                stagger: 0,
                parent: T,
              },
              w
            )),
            H && (x[E.prop] = H),
            wr((e._startAt = ve.set(m, x))),
            (e._startAt._dp = 0),
            (e._startAt._sat = e),
            r < 0 && (Xe ? e._startAt.revert(Tn) : e._startAt.render(-1, !0)),
            (e._zTime = r),
            !a)
          )
            s(e._startAt, te, te);
          else if (!r) return;
        }
        for (e._pt = e._ptCache = 0, u = (_ && ht(u)) || (u && !_), S = 0; S < m.length; S++) {
          if (
            ((C = m[S]),
            (F = C._gsap || Hs(m)[S]._gsap),
            (e._ptLookup[S] = B = {}),
            Ms[F.id] && vr.length && kn(),
            ($ = b === m ? S : b.indexOf(C)),
            E &&
              (Y = new E()).init(C, H || w, e, $, b) !== !1 &&
              ((e._pt = O = new tt(e._pt, C, Y.name, 0, 1, Y.render, Y, 0, Y.priority)),
              Y._props.forEach(function (K) {
                B[K] = O;
              }),
              Y.priority && (k = 1)),
            !E || H)
          )
            for (x in w)
              ft[x] && (Y = Ks(x, w, e, $, C, b))
                ? Y.priority && (k = 1)
                : (B[x] = O = $s.call(e, C, x, "get", w[x], $, b, 0, i.stringFilter));
          e._op && e._op[S] && e.kill(C, e._op[S]),
            P &&
              e._pt &&
              ((yr = e), ue.killTweensOf(C, B, e.globalTime(r)), (L = !e.parent), (yr = 0)),
            e._pt && u && (Ms[F.id] = 1);
        }
        k && to(e), e._onInit && e._onInit(e);
      }
      (e._onUpdate = l),
        (e._initted = (!e._op || e._pt) && !L),
        d && r <= 0 && y.render(Ct, !0, !0);
    },
    wf = function (e, r, t, i, n, o, a, u) {
      var l = ((e._pt && e._ptCache) || (e._ptCache = {}))[r],
        f,
        h,
        d,
        c;
      if (!l)
        for (l = e._ptCache[r] = [], d = e._ptLookup, c = e._targets.length; c--; ) {
          if (((f = d[c][r]), f && f.d && f.d._pt))
            for (f = f.d._pt; f && f.p !== r && f.fp !== r; ) f = f._next;
          if (!f)
            return (
              (zs = 1),
              (e.vars[r] = "+=0"),
              Qs(e, a),
              (zs = 0),
              u ? Yi(r + " not eligible for reset") : 1
            );
          l.push(f);
        }
      for (c = l.length; c--; )
        (h = l[c]),
          (f = h._pt || h),
          (f.s = (i || i === 0) && !n ? i : f.s + (i || 0) + o * f.c),
          (f.c = t - f.s),
          h.e && (h.e = de(t) + Ne(h.e)),
          h.b && (h.b = f.s + Ne(h.b));
    },
    bf = function (e, r) {
      var t = e[0] ? xr(e[0]).harness : 0,
        i = t && t.aliases,
        n,
        o,
        a,
        u;
      if (!i) return r;
      n = Yr({}, r);
      for (o in i) if (o in n) for (u = i[o].split(","), a = u.length; a--; ) n[u[a]] = n[o];
      return n;
    },
    Tf = function (e, r, t, i) {
      var n = r.ease || i || "power1.inOut",
        o,
        a;
      if (Ue(r))
        (a = t[e] || (t[e] = [])),
          r.forEach(function (u, l) {
            return a.push({ t: (l / (r.length - 1)) * 100, v: u, e: n });
          });
      else
        for (o in r)
          (a = t[o] || (t[o] = [])), o === "ease" || a.push({ t: parseFloat(e), v: r[o], e: n });
    },
    Bi = function (e, r, t, i, n) {
      return pe(e) ? e.call(r, t, i, n) : Pe(e) && ~e.indexOf("random(") ? _i(e) : e;
    },
    Ua = Us + "repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase,autoRevert",
    Ha = {};
  et(Ua + ",id,stagger,delay,duration,paused,scrollTrigger", function (s) {
    return (Ha[s] = 1);
  });
  var ve = (function (s) {
    _a(e, s);
    function e(t, i, n, o) {
      var a;
      typeof i == "number" && ((n.duration = i), (i = n), (n = null)),
        (a = s.call(this, o ? i : Ni(i)) || this);
      var u = a.vars,
        l = u.duration,
        f = u.delay,
        h = u.immediateRender,
        d = u.stagger,
        c = u.overwrite,
        _ = u.keyframes,
        p = u.defaults,
        m = u.scrollTrigger,
        T = u.yoyoEase,
        b = i.parent || ue,
        P = (Ue(t) || ma(t) ? nr(t[0]) : "length" in i) ? [t] : Pt(t),
        y,
        w,
        S,
        x,
        O,
        C,
        k,
        F;
      if (
        ((a._targets = P.length
          ? Hs(P)
          : Yi("GSAP target " + t + " not found. https://gsap.com", !pt.nullTargetWarn) || []),
        (a._ptLookup = []),
        (a._overwrite = c),
        _ || d || bn(l) || bn(f))
      ) {
        if (
          ((i = a.vars),
          (y = a.timeline =
            new ze({
              data: "nested",
              defaults: p || {},
              targets: b && b.data === "nested" ? b.vars.targets : P,
            })),
          y.kill(),
          (y.parent = y._dp = rr(a)),
          (y._start = 0),
          d || bn(l) || bn(f))
        ) {
          if (((x = P.length), (k = d && Aa(d)), jt(d)))
            for (O in d) ~Ua.indexOf(O) && (F || (F = {}), (F[O] = d[O]));
          for (w = 0; w < x; w++)
            (S = On(i, Ha)),
              (S.stagger = 0),
              T && (S.yoyoEase = T),
              F && Yr(S, F),
              (C = P[w]),
              (S.duration = +Bi(l, rr(a), w, C, P)),
              (S.delay = (+Bi(f, rr(a), w, C, P) || 0) - a._delay),
              !d &&
                x === 1 &&
                S.delay &&
                ((a._delay = f = S.delay), (a._start += f), (S.delay = 0)),
              y.to(C, S, k ? k(w, C, P) : 0),
              (y._ease = q.none);
          y.duration() ? (l = f = 0) : (a.timeline = 0);
        } else if (_) {
          Ni(kt(y.vars.defaults, { ease: "none" })), (y._ease = Ir(_.ease || i.ease || "none"));
          var E = 0,
            Y,
            B,
            $;
          if (Ue(_))
            _.forEach(function (H) {
              return y.to(P, H, ">");
            }),
              y.duration();
          else {
            S = {};
            for (O in _) O === "ease" || O === "easeEach" || Tf(O, _[O], S, _.easeEach);
            for (O in S)
              for (
                Y = S[O].sort(function (H, L) {
                  return H.t - L.t;
                }),
                  E = 0,
                  w = 0;
                w < Y.length;
                w++
              )
                (B = Y[w]),
                  ($ = { ease: B.e, duration: ((B.t - (w ? Y[w - 1].t : 0)) / 100) * l }),
                  ($[O] = B.v),
                  y.to(P, $, E),
                  (E += $.duration);
            y.duration() < l && y.to({}, { duration: l - y.duration() });
          }
        }
        l || a.duration((l = y.duration()));
      } else a.timeline = 0;
      return (
        c === !0 && !Is && ((yr = rr(a)), ue.killTweensOf(P), (yr = 0)),
        qt(b, rr(a), n),
        i.reversed && a.reverse(),
        i.paused && a.paused(!0),
        (h ||
          (!l && !_ && a._start === Me(b._time) && ht(h) && Jl(rr(a)) && b.data !== "nested")) &&
          ((a._tTime = -te), a.render(Math.max(0, -f) || 0)),
        m && Oa(rr(a), m),
        a
      );
    }
    var r = e.prototype;
    return (
      (r.render = function (i, n, o) {
        var a = this._time,
          u = this._tDur,
          l = this._dur,
          f = i < 0,
          h = i > u - te && !f ? u : i < te ? 0 : i,
          d,
          c,
          _,
          p,
          m,
          T,
          b,
          P,
          y;
        if (!l) tf(this, i, n, o);
        else if (
          h !== this._tTime ||
          !i ||
          o ||
          (!this._initted && this._tTime) ||
          (this._startAt && this._zTime < 0 !== f)
        ) {
          if (((d = h), (P = this.timeline), this._repeat)) {
            if (((p = l + this._rDelay), this._repeat < -1 && f))
              return this.totalTime(p * 100 + i, n, o);
            if (
              ((d = Me(h % p)),
              h === u
                ? ((_ = this._repeat), (d = l))
                : ((_ = ~~(h / p)), _ && _ === Me(h / p) && ((d = l), _--), d > l && (d = l)),
              (T = this._yoyo && _ & 1),
              T && ((y = this._yEase), (d = l - d)),
              (m = hi(this._tTime, p)),
              d === a && !o && this._initted && _ === m)
            )
              return (this._tTime = h), this;
            _ !== m &&
              (P && this._yEase && Wa(P, T),
              this.vars.repeatRefresh &&
                !T &&
                !this._lock &&
                this._time !== p &&
                this._initted &&
                ((this._lock = o = 1), (this.render(Me(p * _), !0).invalidate()._lock = 0)));
          }
          if (!this._initted) {
            if (Ea(this, f ? i : d, o, n, h)) return (this._tTime = 0), this;
            if (a !== this._time && !(o && this.vars.repeatRefresh && _ !== m)) return this;
            if (l !== this._dur) return this.render(i, n, o);
          }
          if (
            ((this._tTime = h),
            (this._time = d),
            !this._act && this._ts && ((this._act = 1), (this._lazy = 0)),
            (this.ratio = b = (y || this._ease)(d / l)),
            this._from && (this.ratio = b = 1 - b),
            d && !a && !n && !_ && (yt(this, "onStart"), this._tTime !== h))
          )
            return this;
          for (c = this._pt; c; ) c.r(b, c.d), (c = c._next);
          (P && P.render(i < 0 ? i : P._dur * P._ease(d / this._dur), n, o)) ||
            (this._startAt && (this._zTime = i)),
            this._onUpdate && !n && (f && Ds(this, i, n, o), yt(this, "onUpdate")),
            this._repeat &&
              _ !== m &&
              this.vars.onRepeat &&
              !n &&
              this.parent &&
              yt(this, "onRepeat"),
            (h === this._tDur || !h) &&
              this._tTime === h &&
              (f && !this._onUpdate && Ds(this, i, !0, !0),
              (i || !l) &&
                ((h === this._tDur && this._ts > 0) || (!h && this._ts < 0)) &&
                wr(this, 1),
              !n &&
                !(f && !a) &&
                (h || a || T) &&
                (yt(this, h === u ? "onComplete" : "onReverseComplete", !0),
                this._prom && !(h < u && this.timeScale() > 0) && this._prom()));
        }
        return this;
      }),
      (r.targets = function () {
        return this._targets;
      }),
      (r.invalidate = function (i) {
        return (
          (!i || !this.vars.runBackwards) && (this._startAt = 0),
          (this._pt = this._op = this._onUpdate = this._lazy = this.ratio = 0),
          (this._ptLookup = []),
          this.timeline && this.timeline.invalidate(i),
          s.prototype.invalidate.call(this, i)
        );
      }),
      (r.resetTo = function (i, n, o, a, u) {
        Wi || ct.wake(), this._ts || this.play();
        var l = Math.min(this._dur, (this._dp._time - this._start) * this._ts),
          f;
        return (
          this._initted || Qs(this, l),
          (f = this._ease(l / this._dur)),
          wf(this, i, n, o, a, f, l, u)
            ? this.resetTo(i, n, o, a, 1)
            : (Ln(this, 0),
              this.parent || Pa(this._dp, this, "_first", "_last", this._dp._sort ? "_start" : 0),
              this.render(0))
        );
      }),
      (r.kill = function (i, n) {
        if ((n === void 0 && (n = "all"), !i && (!n || n === "all")))
          return (this._lazy = this._pt = 0), this.parent ? Li(this) : this;
        if (this.timeline) {
          var o = this.timeline.totalDuration();
          return (
            this.timeline.killTweensOf(i, n, yr && yr.vars.overwrite !== !0)._first || Li(this),
            this.parent &&
              o !== this.timeline.totalDuration() &&
              pi(this, (this._dur * this.timeline._tDur) / o, 0, 1),
            this
          );
        }
        var a = this._targets,
          u = i ? Pt(i) : a,
          l = this._ptLookup,
          f = this._pt,
          h,
          d,
          c,
          _,
          p,
          m,
          T;
        if ((!n || n === "all") && Ql(a, u)) return n === "all" && (this._pt = 0), Li(this);
        for (
          h = this._op = this._op || [],
            n !== "all" &&
              (Pe(n) &&
                ((p = {}),
                et(n, function (b) {
                  return (p[b] = 1);
                }),
                (n = p)),
              (n = bf(a, n))),
            T = a.length;
          T--;

        )
          if (~u.indexOf(a[T])) {
            (d = l[T]),
              n === "all" ? ((h[T] = n), (_ = d), (c = {})) : ((c = h[T] = h[T] || {}), (_ = n));
            for (p in _)
              (m = d && d[p]),
                m && ((!("kill" in m.d) || m.d.kill(p) === !0) && Rn(this, m, "_pt"), delete d[p]),
                c !== "all" && (c[p] = 1);
          }
        return this._initted && !this._pt && f && Li(this), this;
      }),
      (e.to = function (i, n) {
        return new e(i, n, arguments[2]);
      }),
      (e.from = function (i, n) {
        return Ii(1, arguments);
      }),
      (e.delayedCall = function (i, n, o, a) {
        return new e(n, 0, {
          immediateRender: !1,
          lazy: !1,
          overwrite: !1,
          delay: i,
          onComplete: n,
          onReverseComplete: n,
          onCompleteParams: o,
          onReverseCompleteParams: o,
          callbackScope: a,
        });
      }),
      (e.fromTo = function (i, n, o) {
        return Ii(2, arguments);
      }),
      (e.set = function (i, n) {
        return (n.duration = 0), n.repeatDelay || (n.repeat = 0), new e(i, n);
      }),
      (e.killTweensOf = function (i, n, o) {
        return ue.killTweensOf(i, n, o);
      }),
      e
    );
  })(Xi);
  kt(ve.prototype, { _targets: [], _lazy: 0, _startAt: 0, _op: 0, _onInit: 0 });
  et("staggerTo,staggerFrom,staggerFromTo", function (s) {
    ve[s] = function () {
      var e = new ze(),
        r = Rs.call(arguments, 0);
      return r.splice(s === "staggerFromTo" ? 5 : 4, 0, 0), e[s].apply(e, r);
    };
  });
  var Zs = function (e, r, t) {
      return (e[r] = t);
    },
    Ga = function (e, r, t) {
      return e[r](t);
    },
    Sf = function (e, r, t, i) {
      return e[r](i.fp, t);
    },
    Cf = function (e, r, t) {
      return e.setAttribute(r, t);
    },
    zn = function (e, r) {
      return pe(e[r]) ? Ga : Dn(e[r]) && e.setAttribute ? Cf : Zs;
    },
    qa = function (e, r) {
      return r.set(r.t, r.p, Math.round((r.s + r.c * e) * 1e6) / 1e6, r);
    },
    Pf = function (e, r) {
      return r.set(r.t, r.p, !!(r.s + r.c * e), r);
    },
    Js = function (e, r) {
      var t = r._pt,
        i = "";
      if (!e && r.b) i = r.b;
      else if (e === 1 && r.e) i = r.e;
      else {
        for (; t; )
          (i = t.p + (t.m ? t.m(t.s + t.c * e) : Math.round((t.s + t.c * e) * 1e4) / 1e4) + i),
            (t = t._next);
        i += r.c;
      }
      r.set(r.t, r.p, i, r);
    },
    eo = function (e, r) {
      for (var t = r._pt; t; ) t.r(e, t.d), (t = t._next);
    },
    kf = function (e, r, t, i) {
      for (var n = this._pt, o; n; ) (o = n._next), n.p === i && n.modifier(e, r, t), (n = o);
    },
    Of = function (e) {
      for (var r = this._pt, t, i; r; )
        (i = r._next),
          (r.p === e && !r.op) || r.op === e ? Rn(this, r, "_pt") : r.dep || (t = 1),
          (r = i);
      return !t;
    },
    Ef = function (e, r, t, i) {
      i.mSet(e, r, i.m.call(i.tween, t, i.mt), i);
    },
    to = function (e) {
      for (var r = e._pt, t, i, n, o; r; ) {
        for (t = r._next, i = n; i && i.pr > r.pr; ) i = i._next;
        (r._prev = i ? i._prev : o) ? (r._prev._next = r) : (n = r),
          (r._next = i) ? (i._prev = r) : (o = r),
          (r = t);
      }
      e._pt = n;
    },
    tt = (function () {
      function s(r, t, i, n, o, a, u, l, f) {
        (this.t = t),
          (this.s = n),
          (this.c = o),
          (this.p = i),
          (this.r = a || qa),
          (this.d = u || this),
          (this.set = l || Zs),
          (this.pr = f || 0),
          (this._next = r),
          r && (r._prev = this);
      }
      var e = s.prototype;
      return (
        (e.modifier = function (t, i, n) {
          (this.mSet = this.mSet || this.set),
            (this.set = Ef),
            (this.m = t),
            (this.mt = n),
            (this.tween = i);
        }),
        s
      );
    })();
  et(
    Us +
      "parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger",
    function (s) {
      return (Xs[s] = 1);
    }
  );
  vt.TweenMax = vt.TweenLite = ve;
  vt.TimelineLite = vt.TimelineMax = ze;
  ue = new ze({
    sortChildren: !1,
    defaults: ci,
    autoRemoveChildren: !0,
    id: "root",
    smoothChildTiming: !0,
  });
  pt.stringFilter = qs;
  var Br = [],
    Cn = {},
    Mf = [],
    da = 0,
    Df = 0,
    Cs = function (e) {
      return (Cn[e] || Mf).map(function (r) {
        return r();
      });
    },
    Ns = function () {
      var e = Date.now(),
        r = [];
      e - da > 2 &&
        (Cs("matchMediaInit"),
        Br.forEach(function (t) {
          var i = t.queries,
            n = t.conditions,
            o,
            a,
            u,
            l;
          for (a in i)
            (o = Gt.matchMedia(i[a]).matches), o && (u = 1), o !== n[a] && ((n[a] = o), (l = 1));
          l && (t.revert(), u && r.push(t));
        }),
        Cs("matchMediaRevert"),
        r.forEach(function (t) {
          return t.onMatch(t, function (i) {
            return t.add(null, i);
          });
        }),
        (da = e),
        Cs("matchMedia"));
    },
    ja = (function () {
      function s(r, t) {
        (this.selector = t && Fs(t)),
          (this.data = []),
          (this._r = []),
          (this.isReverted = !1),
          (this.id = Df++),
          r && this.add(r);
      }
      var e = s.prototype;
      return (
        (e.add = function (t, i, n) {
          pe(t) && ((n = i), (i = t), (t = pe));
          var o = this,
            a = function () {
              var l = oe,
                f = o.selector,
                h;
              return (
                l && l !== o && l.data.push(o),
                n && (o.selector = Fs(n)),
                (oe = o),
                (h = i.apply(o, arguments)),
                pe(h) && o._r.push(h),
                (oe = l),
                (o.selector = f),
                (o.isReverted = !1),
                h
              );
            };
          return (
            (o.last = a),
            t === pe
              ? a(o, function (u) {
                  return o.add(null, u);
                })
              : t
                ? (o[t] = a)
                : a
          );
        }),
        (e.ignore = function (t) {
          var i = oe;
          (oe = null), t(this), (oe = i);
        }),
        (e.getTweens = function () {
          var t = [];
          return (
            this.data.forEach(function (i) {
              return i instanceof s
                ? t.push.apply(t, i.getTweens())
                : i instanceof ve && !(i.parent && i.parent.data === "nested") && t.push(i);
            }),
            t
          );
        }),
        (e.clear = function () {
          this._r.length = this.data.length = 0;
        }),
        (e.kill = function (t, i) {
          var n = this;
          if (
            (t
              ? (function () {
                  for (var a = n.getTweens(), u = n.data.length, l; u--; )
                    (l = n.data[u]),
                      l.data === "isFlip" &&
                        (l.revert(),
                        l.getChildren(!0, !0, !1).forEach(function (f) {
                          return a.splice(a.indexOf(f), 1);
                        }));
                  for (
                    a
                      .map(function (f) {
                        return {
                          g:
                            f._dur || f._delay || (f._sat && !f._sat.vars.immediateRender)
                              ? f.globalTime(0)
                              : -1 / 0,
                          t: f,
                        };
                      })
                      .sort(function (f, h) {
                        return h.g - f.g || -1 / 0;
                      })
                      .forEach(function (f) {
                        return f.t.revert(t);
                      }),
                      u = n.data.length;
                    u--;

                  )
                    (l = n.data[u]),
                      l instanceof ze
                        ? l.data !== "nested" &&
                          (l.scrollTrigger && l.scrollTrigger.revert(), l.kill())
                        : !(l instanceof ve) && l.revert && l.revert(t);
                  n._r.forEach(function (f) {
                    return f(t, n);
                  }),
                    (n.isReverted = !0);
                })()
              : this.data.forEach(function (a) {
                  return a.kill && a.kill();
                }),
            this.clear(),
            i)
          )
            for (var o = Br.length; o--; ) Br[o].id === this.id && Br.splice(o, 1);
        }),
        (e.revert = function (t) {
          this.kill(t || {});
        }),
        s
      );
    })(),
    Af = (function () {
      function s(r) {
        (this.contexts = []), (this.scope = r), oe && oe.data.push(this);
      }
      var e = s.prototype;
      return (
        (e.add = function (t, i, n) {
          jt(t) || (t = { matches: t });
          var o = new ja(0, n || this.scope),
            a = (o.conditions = {}),
            u,
            l,
            f;
          oe && !o.selector && (o.selector = oe.selector),
            this.contexts.push(o),
            (i = o.add("onMatch", i)),
            (o.queries = t);
          for (l in t)
            l === "all"
              ? (f = 1)
              : ((u = Gt.matchMedia(t[l])),
                u &&
                  (Br.indexOf(o) < 0 && Br.push(o),
                  (a[l] = u.matches) && (f = 1),
                  u.addListener ? u.addListener(Ns) : u.addEventListener("change", Ns)));
          return (
            f &&
              i(o, function (h) {
                return o.add(null, h);
              }),
            this
          );
        }),
        (e.revert = function (t) {
          this.kill(t || {});
        }),
        (e.kill = function (t) {
          this.contexts.forEach(function (i) {
            return i.kill(t, !0);
          });
        }),
        s
      );
    })(),
    Mn = {
      registerPlugin: function () {
        for (var e = arguments.length, r = new Array(e), t = 0; t < e; t++) r[t] = arguments[t];
        r.forEach(function (i) {
          return Ia(i);
        });
      },
      timeline: function (e) {
        return new ze(e);
      },
      getTweensOf: function (e, r) {
        return ue.getTweensOf(e, r);
      },
      getProperty: function (e, r, t, i) {
        Pe(e) && (e = Pt(e)[0]);
        var n = xr(e || {}).get,
          o = t ? Ca : Sa;
        return (
          t === "native" && (t = ""),
          e &&
            (r
              ? o(((ft[r] && ft[r].get) || n)(e, r, t, i))
              : function (a, u, l) {
                  return o(((ft[a] && ft[a].get) || n)(e, a, u, l));
                })
        );
      },
      quickSetter: function (e, r, t) {
        if (((e = Pt(e)), e.length > 1)) {
          var i = e.map(function (f) {
              return He.quickSetter(f, r, t);
            }),
            n = i.length;
          return function (f) {
            for (var h = n; h--; ) i[h](f);
          };
        }
        e = e[0] || {};
        var o = ft[r],
          a = xr(e),
          u = (a.harness && (a.harness.aliases || {})[r]) || r,
          l = o
            ? function (f) {
                var h = new o();
                (fi._pt = 0),
                  h.init(e, t ? f + t : f, fi, 0, [e]),
                  h.render(1, h),
                  fi._pt && eo(1, fi);
              }
            : a.set(e, u);
        return o
          ? l
          : function (f) {
              return l(e, u, t ? f + t : f, a, 1);
            };
      },
      quickTo: function (e, r, t) {
        var i,
          n = He.to(e, Yr(((i = {}), (i[r] = "+=0.1"), (i.paused = !0), i), t || {})),
          o = function (u, l, f) {
            return n.resetTo(r, u, l, f);
          };
        return (o.tween = n), o;
      },
      isTweening: function (e) {
        return ue.getTweensOf(e, !0).length > 0;
      },
      defaults: function (e) {
        return e && e.ease && (e.ease = Ir(e.ease, ci.ease)), la(ci, e || {});
      },
      config: function (e) {
        return la(pt, e || {});
      },
      registerEffect: function (e) {
        var r = e.name,
          t = e.effect,
          i = e.plugins,
          n = e.defaults,
          o = e.extendTimeline;
        (i || "").split(",").forEach(function (a) {
          return a && !ft[a] && !vt[a] && Yi(r + " effect requires " + a + " plugin.");
        }),
          (ws[r] = function (a, u, l) {
            return t(Pt(a), kt(u || {}, n), l);
          }),
          o &&
            (ze.prototype[r] = function (a, u, l) {
              return this.add(ws[r](a, jt(u) ? u : (l = u) && {}, this), l);
            });
      },
      registerEase: function (e, r) {
        q[e] = Ir(r);
      },
      parseEase: function (e, r) {
        return arguments.length ? Ir(e, r) : q;
      },
      getById: function (e) {
        return ue.getById(e);
      },
      exportRoot: function (e, r) {
        e === void 0 && (e = {});
        var t = new ze(e),
          i,
          n;
        for (
          t.smoothChildTiming = ht(e.smoothChildTiming),
            ue.remove(t),
            t._dp = 0,
            t._time = t._tTime = ue._time,
            i = ue._first;
          i;

        )
          (n = i._next),
            (r || !(!i._dur && i instanceof ve && i.vars.onComplete === i._targets[0])) &&
              qt(t, i, i._start - i._delay),
            (i = n);
        return qt(ue, t, 0), t;
      },
      context: function (e, r) {
        return e ? new ja(e, r) : oe;
      },
      matchMedia: function (e) {
        return new Af(e);
      },
      matchMediaRefresh: function () {
        return (
          Br.forEach(function (e) {
            var r = e.conditions,
              t,
              i;
            for (i in r) r[i] && ((r[i] = !1), (t = 1));
            t && e.revert();
          }) || Ns()
        );
      },
      addEventListener: function (e, r) {
        var t = Cn[e] || (Cn[e] = []);
        ~t.indexOf(r) || t.push(r);
      },
      removeEventListener: function (e, r) {
        var t = Cn[e],
          i = t && t.indexOf(r);
        i >= 0 && t.splice(i, 1);
      },
      utils: {
        wrap: ff,
        wrapYoyo: cf,
        distribute: Aa,
        random: Fa,
        snap: Ra,
        normalize: lf,
        getUnit: Ne,
        clamp: sf,
        splitColor: Ba,
        toArray: Pt,
        selector: Fs,
        mapRange: za,
        pipe: af,
        unitize: uf,
        interpolate: hf,
        shuffle: Da,
      },
      install: xa,
      effects: ws,
      ticker: ct,
      updateRoot: ze.updateRoot,
      plugins: ft,
      globalTimeline: ue,
      core: {
        PropTween: tt,
        globals: wa,
        Tween: ve,
        Timeline: ze,
        Animation: Xi,
        getCache: xr,
        _removeLinkedListItem: Rn,
        reverting: function () {
          return Xe;
        },
        context: function (e) {
          return e && oe && (oe.data.push(e), (e._ctx = oe)), oe;
        },
        suppressOverwrites: function (e) {
          return (Is = e);
        },
      },
    };
  et("to,from,fromTo,delayedCall,set,killTweensOf", function (s) {
    return (Mn[s] = ve[s]);
  });
  ct.add(ze.updateRoot);
  fi = Mn.to({}, { duration: 0 });
  var Rf = function (e, r) {
      for (var t = e._pt; t && t.p !== r && t.op !== r && t.fp !== r; ) t = t._next;
      return t;
    },
    Ff = function (e, r) {
      var t = e._targets,
        i,
        n,
        o;
      for (i in r)
        for (n = t.length; n--; )
          (o = e._ptLookup[n][i]),
            o &&
              (o = o.d) &&
              (o._pt && (o = Rf(o, i)), o && o.modifier && o.modifier(r[i], e, t[n], i));
    },
    Ps = function (e, r) {
      return {
        name: e,
        rawVars: 1,
        init: function (i, n, o) {
          o._onInit = function (a) {
            var u, l;
            if (
              (Pe(n) &&
                ((u = {}),
                et(n, function (f) {
                  return (u[f] = 1);
                }),
                (n = u)),
              r)
            ) {
              u = {};
              for (l in n) u[l] = r(n[l]);
              n = u;
            }
            Ff(a, n);
          };
        },
      };
    },
    He =
      Mn.registerPlugin(
        {
          name: "attr",
          init: function (e, r, t, i, n) {
            var o, a, u;
            this.tween = t;
            for (o in r)
              (u = e.getAttribute(o) || ""),
                (a = this.add(e, "setAttribute", (u || 0) + "", r[o], i, n, 0, 0, o)),
                (a.op = o),
                (a.b = u),
                this._props.push(o);
          },
          render: function (e, r) {
            for (var t = r._pt; t; ) Xe ? t.set(t.t, t.p, t.b, t) : t.r(e, t.d), (t = t._next);
          },
        },
        {
          name: "endArray",
          init: function (e, r) {
            for (var t = r.length; t--; ) this.add(e, t, e[t] || 0, r[t], 0, 0, 0, 0, 0, 1);
          },
        },
        Ps("roundProps", Ls),
        Ps("modifiers"),
        Ps("snap", Ra)
      ) || Mn;
  ve.version = ze.version = He.version = "3.12.5";
  va = 1;
  Bs() && di();
  var Lf = q.Power0,
    zf = q.Power1,
    Nf = q.Power2,
    If = q.Power3,
    Bf = q.Power4,
    Yf = q.Linear,
    Vf = q.Quad,
    Wf = q.Cubic,
    Xf = q.Quart,
    Uf = q.Quint,
    Hf = q.Strong,
    Gf = q.Elastic,
    qf = q.Back,
    jf = q.SteppedEase,
    $f = q.Bounce,
    Kf = q.Sine,
    Qf = q.Expo,
    Zf = q.Circ;
  var $a,
    Tr,
    mi,
    uo,
    qr,
    Jf,
    Ka,
    lo,
    ec = function () {
      return typeof window < "u";
    },
    or = {},
    Gr = 180 / Math.PI,
    yi = Math.PI / 180,
    gi = Math.atan2,
    Qa = 1e8,
    fo = /([A-Z])/g,
    tc = /(left|right|width|margin|padding|x)/i,
    rc = /[\s,\(]\S/,
    $t = { autoAlpha: "opacity,visibility", scale: "scaleX,scaleY", alpha: "opacity" },
    no = function (e, r) {
      return r.set(r.t, r.p, Math.round((r.s + r.c * e) * 1e4) / 1e4 + r.u, r);
    },
    ic = function (e, r) {
      return r.set(r.t, r.p, e === 1 ? r.e : Math.round((r.s + r.c * e) * 1e4) / 1e4 + r.u, r);
    },
    nc = function (e, r) {
      return r.set(r.t, r.p, e ? Math.round((r.s + r.c * e) * 1e4) / 1e4 + r.u : r.b, r);
    },
    sc = function (e, r) {
      var t = r.s + r.c * e;
      r.set(r.t, r.p, ~~(t + (t < 0 ? -0.5 : 0.5)) + r.u, r);
    },
    nu = function (e, r) {
      return r.set(r.t, r.p, e ? r.e : r.b, r);
    },
    su = function (e, r) {
      return r.set(r.t, r.p, e !== 1 ? r.b : r.e, r);
    },
    oc = function (e, r, t) {
      return (e.style[r] = t);
    },
    ac = function (e, r, t) {
      return e.style.setProperty(r, t);
    },
    uc = function (e, r, t) {
      return (e._gsap[r] = t);
    },
    lc = function (e, r, t) {
      return (e._gsap.scaleX = e._gsap.scaleY = t);
    },
    fc = function (e, r, t, i, n) {
      var o = e._gsap;
      (o.scaleX = o.scaleY = t), o.renderTransform(n, o);
    },
    cc = function (e, r, t, i, n) {
      var o = e._gsap;
      (o[r] = t), o.renderTransform(n, o);
    },
    le = "transform",
    dt = le + "Origin",
    hc = function s(e, r) {
      var t = this,
        i = this.target,
        n = i.style,
        o = i._gsap;
      if (e in or && n) {
        if (((this.tfm = this.tfm || {}), e !== "transform"))
          (e = $t[e] || e),
            ~e.indexOf(",")
              ? e.split(",").forEach(function (a) {
                  return (t.tfm[a] = sr(i, a));
                })
              : (this.tfm[e] = o.x ? o[e] : sr(i, e)),
            e === dt && (this.tfm.zOrigin = o.zOrigin);
        else
          return $t.transform.split(",").forEach(function (a) {
            return s.call(t, a, r);
          });
        if (this.props.indexOf(le) >= 0) return;
        o.svg && ((this.svgo = i.getAttribute("data-svg-origin")), this.props.push(dt, r, "")),
          (e = le);
      }
      (n || r) && this.props.push(e, r, n[e]);
    },
    ou = function (e) {
      e.translate &&
        (e.removeProperty("translate"), e.removeProperty("scale"), e.removeProperty("rotate"));
    },
    pc = function () {
      var e = this.props,
        r = this.target,
        t = r.style,
        i = r._gsap,
        n,
        o;
      for (n = 0; n < e.length; n += 3)
        e[n + 1]
          ? (r[e[n]] = e[n + 2])
          : e[n + 2]
            ? (t[e[n]] = e[n + 2])
            : t.removeProperty(
                e[n].substr(0, 2) === "--" ? e[n] : e[n].replace(fo, "-$1").toLowerCase()
              );
      if (this.tfm) {
        for (o in this.tfm) i[o] = this.tfm[o];
        i.svg && (i.renderTransform(), r.setAttribute("data-svg-origin", this.svgo || "")),
          (n = lo()),
          (!n || !n.isStart) &&
            !t[le] &&
            (ou(t),
            i.zOrigin &&
              t[dt] &&
              ((t[dt] += " " + i.zOrigin + "px"), (i.zOrigin = 0), i.renderTransform()),
            (i.uncache = 1));
      }
    },
    au = function (e, r) {
      var t = { target: e, props: [], revert: pc, save: hc };
      return (
        e._gsap || He.core.getCache(e),
        r &&
          r.split(",").forEach(function (i) {
            return t.save(i);
          }),
        t
      );
    },
    uu,
    so = function (e, r) {
      var t = Tr.createElementNS
        ? Tr.createElementNS((r || "http://www.w3.org/1999/xhtml").replace(/^https/, "http"), e)
        : Tr.createElement(e);
      return t && t.style ? t : Tr.createElement(e);
    },
    Kt = function s(e, r, t) {
      var i = getComputedStyle(e);
      return (
        i[r] ||
        i.getPropertyValue(r.replace(fo, "-$1").toLowerCase()) ||
        i.getPropertyValue(r) ||
        (!t && s(e, vi(r) || r, 1)) ||
        ""
      );
    },
    Za = "O,Moz,ms,Ms,Webkit".split(","),
    vi = function (e, r, t) {
      var i = r || qr,
        n = i.style,
        o = 5;
      if (e in n && !t) return e;
      for (e = e.charAt(0).toUpperCase() + e.substr(1); o-- && !(Za[o] + e in n); );
      return o < 0 ? null : (o === 3 ? "ms" : o >= 0 ? Za[o] : "") + e;
    },
    oo = function () {
      ec() &&
        window.document &&
        (($a = window),
        (Tr = $a.document),
        (mi = Tr.documentElement),
        (qr = so("div") || { style: {} }),
        (Jf = so("div")),
        (le = vi(le)),
        (dt = le + "Origin"),
        (qr.style.cssText = "border-width:0;line-height:0;position:absolute;padding:0"),
        (uu = !!vi("perspective")),
        (lo = He.core.reverting),
        (uo = 1));
    },
    ro = function s(e) {
      var r = so(
          "svg",
          (this.ownerSVGElement && this.ownerSVGElement.getAttribute("xmlns")) ||
            "http://www.w3.org/2000/svg"
        ),
        t = this.parentNode,
        i = this.nextSibling,
        n = this.style.cssText,
        o;
      if ((mi.appendChild(r), r.appendChild(this), (this.style.display = "block"), e))
        try {
          (o = this.getBBox()), (this._gsapBBox = this.getBBox), (this.getBBox = s);
        } catch {}
      else this._gsapBBox && (o = this._gsapBBox());
      return (
        t && (i ? t.insertBefore(this, i) : t.appendChild(this)),
        mi.removeChild(r),
        (this.style.cssText = n),
        o
      );
    },
    Ja = function (e, r) {
      for (var t = r.length; t--; ) if (e.hasAttribute(r[t])) return e.getAttribute(r[t]);
    },
    lu = function (e) {
      var r;
      try {
        r = e.getBBox();
      } catch {
        r = ro.call(e, !0);
      }
      return (
        (r && (r.width || r.height)) || e.getBBox === ro || (r = ro.call(e, !0)),
        r && !r.width && !r.x && !r.y
          ? {
              x: +Ja(e, ["x", "cx", "x1"]) || 0,
              y: +Ja(e, ["y", "cy", "y1"]) || 0,
              width: 0,
              height: 0,
            }
          : r
      );
    },
    fu = function (e) {
      return !!(e.getCTM && (!e.parentNode || e.ownerSVGElement) && lu(e));
    },
    jr = function (e, r) {
      if (r) {
        var t = e.style,
          i;
        r in or && r !== dt && (r = le),
          t.removeProperty
            ? ((i = r.substr(0, 2)),
              (i === "ms" || r.substr(0, 6) === "webkit") && (r = "-" + r),
              t.removeProperty(i === "--" ? r : r.replace(fo, "-$1").toLowerCase()))
            : t.removeAttribute(r);
      }
    },
    Sr = function (e, r, t, i, n, o) {
      var a = new tt(e._pt, r, t, 0, 1, o ? su : nu);
      return (e._pt = a), (a.b = i), (a.e = n), e._props.push(t), a;
    },
    eu = { deg: 1, rad: 1, turn: 1 },
    dc = { grid: 1, flex: 1 },
    Cr = function s(e, r, t, i) {
      var n = parseFloat(t) || 0,
        o = (t + "").trim().substr((n + "").length) || "px",
        a = qr.style,
        u = tc.test(r),
        l = e.tagName.toLowerCase() === "svg",
        f = (l ? "client" : "offset") + (u ? "Width" : "Height"),
        h = 100,
        d = i === "px",
        c = i === "%",
        _,
        p,
        m,
        T;
      if (i === o || !n || eu[i] || eu[o]) return n;
      if (
        (o !== "px" && !d && (n = s(e, r, t, "px")),
        (T = e.getCTM && fu(e)),
        (c || o === "%") && (or[r] || ~r.indexOf("adius")))
      )
        return (
          (_ = T ? e.getBBox()[u ? "width" : "height"] : e[f]), de(c ? (n / _) * h : (n / 100) * _)
        );
      if (
        ((a[u ? "width" : "height"] = h + (d ? o : i)),
        (p = ~r.indexOf("adius") || (i === "em" && e.appendChild && !l) ? e : e.parentNode),
        T && (p = (e.ownerSVGElement || {}).parentNode),
        (!p || p === Tr || !p.appendChild) && (p = Tr.body),
        (m = p._gsap),
        m && c && m.width && u && m.time === ct.time && !m.uncache)
      )
        return de((n / m.width) * h);
      if (c && (r === "height" || r === "width")) {
        var b = e.style[r];
        (e.style[r] = h + i), (_ = e[f]), b ? (e.style[r] = b) : jr(e, r);
      } else
        (c || o === "%") && !dc[Kt(p, "display")] && (a.position = Kt(e, "position")),
          p === e && (a.position = "static"),
          p.appendChild(qr),
          (_ = qr[f]),
          p.removeChild(qr),
          (a.position = "absolute");
      return (
        u && c && ((m = xr(p)), (m.time = ct.time), (m.width = p[f])),
        de(d ? (_ * n) / h : _ && n ? (h / _) * n : 0)
      );
    },
    sr = function (e, r, t, i) {
      var n;
      return (
        uo || oo(),
        r in $t && r !== "transform" && ((r = $t[r]), ~r.indexOf(",") && (r = r.split(",")[0])),
        or[r] && r !== "transform"
          ? ((n = qi(e, i)),
            (n =
              r !== "transformOrigin"
                ? n[r]
                : n.svg
                  ? n.origin
                  : In(Kt(e, dt)) + " " + n.zOrigin + "px"))
          : ((n = e.style[r]),
            (!n || n === "auto" || i || ~(n + "").indexOf("calc(")) &&
              (n = (Nn[r] && Nn[r](e, r, t)) || Kt(e, r) || Gs(e, r) || (r === "opacity" ? 1 : 0))),
        t && !~(n + "").trim().indexOf(" ") ? Cr(e, r, n, t) + t : n
      );
    },
    _c = function (e, r, t, i) {
      if (!t || t === "none") {
        var n = vi(r, e, 1),
          o = n && Kt(e, n, 1);
        o && o !== t ? ((r = n), (t = o)) : r === "borderColor" && (t = Kt(e, "borderTopColor"));
      }
      var a = new tt(this._pt, e.style, r, 0, 1, Js),
        u = 0,
        l = 0,
        f,
        h,
        d,
        c,
        _,
        p,
        m,
        T,
        b,
        P,
        y,
        w;
      if (
        ((a.b = t),
        (a.e = i),
        (t += ""),
        (i += ""),
        i === "auto" &&
          ((p = e.style[r]),
          (e.style[r] = i),
          (i = Kt(e, r) || i),
          p ? (e.style[r] = p) : jr(e, r)),
        (f = [t, i]),
        qs(f),
        (t = f[0]),
        (i = f[1]),
        (d = t.match(Vr) || []),
        (w = i.match(Vr) || []),
        w.length)
      ) {
        for (; (h = Vr.exec(i)); )
          (m = h[0]),
            (b = i.substring(u, h.index)),
            _
              ? (_ = (_ + 1) % 5)
              : (b.substr(-5) === "rgba(" || b.substr(-5) === "hsla(") && (_ = 1),
            m !== (p = d[l++] || "") &&
              ((c = parseFloat(p) || 0),
              (y = p.substr((c + "").length)),
              m.charAt(1) === "=" && (m = Wr(c, m) + y),
              (T = parseFloat(m)),
              (P = m.substr((T + "").length)),
              (u = Vr.lastIndex - P.length),
              P || ((P = P || pt.units[r] || y), u === i.length && ((i += P), (a.e += P))),
              y !== P && (c = Cr(e, r, p, P) || 0),
              (a._pt = {
                _next: a._pt,
                p: b || l === 1 ? b : ",",
                s: c,
                c: T - c,
                m: (_ && _ < 4) || r === "zIndex" ? Math.round : 0,
              }));
        a.c = u < i.length ? i.substring(u, i.length) : "";
      } else a.r = r === "display" && i === "none" ? su : nu;
      return Vs.test(i) && (a.e = 0), (this._pt = a), a;
    },
    tu = { top: "0%", bottom: "100%", left: "0%", right: "100%", center: "50%" },
    gc = function (e) {
      var r = e.split(" "),
        t = r[0],
        i = r[1] || "50%";
      return (
        (t === "top" || t === "bottom" || i === "left" || i === "right") &&
          ((e = t), (t = i), (i = e)),
        (r[0] = tu[t] || t),
        (r[1] = tu[i] || i),
        r.join(" ")
      );
    },
    mc = function (e, r) {
      if (r.tween && r.tween._time === r.tween._dur) {
        var t = r.t,
          i = t.style,
          n = r.u,
          o = t._gsap,
          a,
          u,
          l;
        if (n === "all" || n === !0) (i.cssText = ""), (u = 1);
        else
          for (n = n.split(","), l = n.length; --l > -1; )
            (a = n[l]), or[a] && ((u = 1), (a = a === "transformOrigin" ? dt : le)), jr(t, a);
        u &&
          (jr(t, le),
          o && (o.svg && t.removeAttribute("transform"), qi(t, 1), (o.uncache = 1), ou(i)));
      }
    },
    Nn = {
      clearProps: function (e, r, t, i, n) {
        if (n.data !== "isFromStart") {
          var o = (e._pt = new tt(e._pt, r, t, 0, 0, mc));
          return (o.u = i), (o.pr = -10), (o.tween = n), e._props.push(t), 1;
        }
      },
    },
    Gi = [1, 0, 0, 1, 0, 0],
    cu = {},
    hu = function (e) {
      return e === "matrix(1, 0, 0, 1, 0, 0)" || e === "none" || !e;
    },
    ru = function (e) {
      var r = Kt(e, le);
      return hu(r) ? Gi : r.substr(7).match(Ys).map(de);
    },
    co = function (e, r) {
      var t = e._gsap || xr(e),
        i = e.style,
        n = ru(e),
        o,
        a,
        u,
        l;
      return t.svg && e.getAttribute("transform")
        ? ((u = e.transform.baseVal.consolidate().matrix),
          (n = [u.a, u.b, u.c, u.d, u.e, u.f]),
          n.join(",") === "1,0,0,1,0,0" ? Gi : n)
        : (n === Gi &&
            !e.offsetParent &&
            e !== mi &&
            !t.svg &&
            ((u = i.display),
            (i.display = "block"),
            (o = e.parentNode),
            (!o || !e.offsetParent) && ((l = 1), (a = e.nextElementSibling), mi.appendChild(e)),
            (n = ru(e)),
            u ? (i.display = u) : jr(e, "display"),
            l && (a ? o.insertBefore(e, a) : o ? o.appendChild(e) : mi.removeChild(e))),
          r && n.length > 6 ? [n[0], n[1], n[4], n[5], n[12], n[13]] : n);
    },
    ao = function (e, r, t, i, n, o) {
      var a = e._gsap,
        u = n || co(e, !0),
        l = a.xOrigin || 0,
        f = a.yOrigin || 0,
        h = a.xOffset || 0,
        d = a.yOffset || 0,
        c = u[0],
        _ = u[1],
        p = u[2],
        m = u[3],
        T = u[4],
        b = u[5],
        P = r.split(" "),
        y = parseFloat(P[0]) || 0,
        w = parseFloat(P[1]) || 0,
        S,
        x,
        O,
        C;
      t
        ? u !== Gi &&
          (x = c * m - _ * p) &&
          ((O = y * (m / x) + w * (-p / x) + (p * b - m * T) / x),
          (C = y * (-_ / x) + w * (c / x) - (c * b - _ * T) / x),
          (y = O),
          (w = C))
        : ((S = lu(e)),
          (y = S.x + (~P[0].indexOf("%") ? (y / 100) * S.width : y)),
          (w = S.y + (~(P[1] || P[0]).indexOf("%") ? (w / 100) * S.height : w))),
        i || (i !== !1 && a.smooth)
          ? ((T = y - l),
            (b = w - f),
            (a.xOffset = h + (T * c + b * p) - T),
            (a.yOffset = d + (T * _ + b * m) - b))
          : (a.xOffset = a.yOffset = 0),
        (a.xOrigin = y),
        (a.yOrigin = w),
        (a.smooth = !!i),
        (a.origin = r),
        (a.originIsAbsolute = !!t),
        (e.style[dt] = "0px 0px"),
        o &&
          (Sr(o, a, "xOrigin", l, y),
          Sr(o, a, "yOrigin", f, w),
          Sr(o, a, "xOffset", h, a.xOffset),
          Sr(o, a, "yOffset", d, a.yOffset)),
        e.setAttribute("data-svg-origin", y + " " + w);
    },
    qi = function (e, r) {
      var t = e._gsap || new js(e);
      if ("x" in t && !r && !t.uncache) return t;
      var i = e.style,
        n = t.scaleX < 0,
        o = "px",
        a = "deg",
        u = getComputedStyle(e),
        l = Kt(e, dt) || "0",
        f,
        h,
        d,
        c,
        _,
        p,
        m,
        T,
        b,
        P,
        y,
        w,
        S,
        x,
        O,
        C,
        k,
        F,
        E,
        Y,
        B,
        $,
        H,
        L,
        K,
        re,
        g,
        ie,
        $e,
        Dt,
        ce,
        Re;
      return (
        (f = h = d = p = m = T = b = P = y = 0),
        (c = _ = 1),
        (t.svg = !!(e.getCTM && fu(e))),
        u.translate &&
          ((u.translate !== "none" || u.scale !== "none" || u.rotate !== "none") &&
            (i[le] =
              (u.translate !== "none"
                ? "translate3d(" + (u.translate + " 0 0").split(" ").slice(0, 3).join(", ") + ") "
                : "") +
              (u.rotate !== "none" ? "rotate(" + u.rotate + ") " : "") +
              (u.scale !== "none" ? "scale(" + u.scale.split(" ").join(",") + ") " : "") +
              (u[le] !== "none" ? u[le] : "")),
          (i.scale = i.rotate = i.translate = "none")),
        (x = co(e, t.svg)),
        t.svg &&
          (t.uncache
            ? ((K = e.getBBox()),
              (l = t.xOrigin - K.x + "px " + (t.yOrigin - K.y) + "px"),
              (L = ""))
            : (L = !r && e.getAttribute("data-svg-origin")),
          ao(e, L || l, !!L || t.originIsAbsolute, t.smooth !== !1, x)),
        (w = t.xOrigin || 0),
        (S = t.yOrigin || 0),
        x !== Gi &&
          ((F = x[0]),
          (E = x[1]),
          (Y = x[2]),
          (B = x[3]),
          (f = $ = x[4]),
          (h = H = x[5]),
          x.length === 6
            ? ((c = Math.sqrt(F * F + E * E)),
              (_ = Math.sqrt(B * B + Y * Y)),
              (p = F || E ? gi(E, F) * Gr : 0),
              (b = Y || B ? gi(Y, B) * Gr + p : 0),
              b && (_ *= Math.abs(Math.cos(b * yi))),
              t.svg && ((f -= w - (w * F + S * Y)), (h -= S - (w * E + S * B))))
            : ((Re = x[6]),
              (Dt = x[7]),
              (g = x[8]),
              (ie = x[9]),
              ($e = x[10]),
              (ce = x[11]),
              (f = x[12]),
              (h = x[13]),
              (d = x[14]),
              (O = gi(Re, $e)),
              (m = O * Gr),
              O &&
                ((C = Math.cos(-O)),
                (k = Math.sin(-O)),
                (L = $ * C + g * k),
                (K = H * C + ie * k),
                (re = Re * C + $e * k),
                (g = $ * -k + g * C),
                (ie = H * -k + ie * C),
                ($e = Re * -k + $e * C),
                (ce = Dt * -k + ce * C),
                ($ = L),
                (H = K),
                (Re = re)),
              (O = gi(-Y, $e)),
              (T = O * Gr),
              O &&
                ((C = Math.cos(-O)),
                (k = Math.sin(-O)),
                (L = F * C - g * k),
                (K = E * C - ie * k),
                (re = Y * C - $e * k),
                (ce = B * k + ce * C),
                (F = L),
                (E = K),
                (Y = re)),
              (O = gi(E, F)),
              (p = O * Gr),
              O &&
                ((C = Math.cos(O)),
                (k = Math.sin(O)),
                (L = F * C + E * k),
                (K = $ * C + H * k),
                (E = E * C - F * k),
                (H = H * C - $ * k),
                (F = L),
                ($ = K)),
              m && Math.abs(m) + Math.abs(p) > 359.9 && ((m = p = 0), (T = 180 - T)),
              (c = de(Math.sqrt(F * F + E * E + Y * Y))),
              (_ = de(Math.sqrt(H * H + Re * Re))),
              (O = gi($, H)),
              (b = Math.abs(O) > 2e-4 ? O * Gr : 0),
              (y = ce ? 1 / (ce < 0 ? -ce : ce) : 0)),
          t.svg &&
            ((L = e.getAttribute("transform")),
            (t.forceCSS = e.setAttribute("transform", "") || !hu(Kt(e, le))),
            L && e.setAttribute("transform", L))),
        Math.abs(b) > 90 &&
          Math.abs(b) < 270 &&
          (n
            ? ((c *= -1), (b += p <= 0 ? 180 : -180), (p += p <= 0 ? 180 : -180))
            : ((_ *= -1), (b += b <= 0 ? 180 : -180))),
        (r = r || t.uncache),
        (t.x =
          f -
          ((t.xPercent =
            f &&
            ((!r && t.xPercent) || (Math.round(e.offsetWidth / 2) === Math.round(-f) ? -50 : 0)))
            ? (e.offsetWidth * t.xPercent) / 100
            : 0) +
          o),
        (t.y =
          h -
          ((t.yPercent =
            h &&
            ((!r && t.yPercent) || (Math.round(e.offsetHeight / 2) === Math.round(-h) ? -50 : 0)))
            ? (e.offsetHeight * t.yPercent) / 100
            : 0) +
          o),
        (t.z = d + o),
        (t.scaleX = de(c)),
        (t.scaleY = de(_)),
        (t.rotation = de(p) + a),
        (t.rotationX = de(m) + a),
        (t.rotationY = de(T) + a),
        (t.skewX = b + a),
        (t.skewY = P + a),
        (t.transformPerspective = y + o),
        (t.zOrigin = parseFloat(l.split(" ")[2]) || (!r && t.zOrigin) || 0) && (i[dt] = In(l)),
        (t.xOffset = t.yOffset = 0),
        (t.force3D = pt.force3D),
        (t.renderTransform = t.svg ? vc : uu ? pu : yc),
        (t.uncache = 0),
        t
      );
    },
    In = function (e) {
      return (e = e.split(" "))[0] + " " + e[1];
    },
    io = function (e, r, t) {
      var i = Ne(r);
      return de(parseFloat(r) + parseFloat(Cr(e, "x", t + "px", i))) + i;
    },
    yc = function (e, r) {
      (r.z = "0px"), (r.rotationY = r.rotationX = "0deg"), (r.force3D = 0), pu(e, r);
    },
    Ur = "0deg",
    Hi = "0px",
    Hr = ") ",
    pu = function (e, r) {
      var t = r || this,
        i = t.xPercent,
        n = t.yPercent,
        o = t.x,
        a = t.y,
        u = t.z,
        l = t.rotation,
        f = t.rotationY,
        h = t.rotationX,
        d = t.skewX,
        c = t.skewY,
        _ = t.scaleX,
        p = t.scaleY,
        m = t.transformPerspective,
        T = t.force3D,
        b = t.target,
        P = t.zOrigin,
        y = "",
        w = (T === "auto" && e && e !== 1) || T === !0;
      if (P && (h !== Ur || f !== Ur)) {
        var S = parseFloat(f) * yi,
          x = Math.sin(S),
          O = Math.cos(S),
          C;
        (S = parseFloat(h) * yi),
          (C = Math.cos(S)),
          (o = io(b, o, x * C * -P)),
          (a = io(b, a, -Math.sin(S) * -P)),
          (u = io(b, u, O * C * -P + P));
      }
      m !== Hi && (y += "perspective(" + m + Hr),
        (i || n) && (y += "translate(" + i + "%, " + n + "%) "),
        (w || o !== Hi || a !== Hi || u !== Hi) &&
          (y +=
            u !== Hi || w
              ? "translate3d(" + o + ", " + a + ", " + u + ") "
              : "translate(" + o + ", " + a + Hr),
        l !== Ur && (y += "rotate(" + l + Hr),
        f !== Ur && (y += "rotateY(" + f + Hr),
        h !== Ur && (y += "rotateX(" + h + Hr),
        (d !== Ur || c !== Ur) && (y += "skew(" + d + ", " + c + Hr),
        (_ !== 1 || p !== 1) && (y += "scale(" + _ + ", " + p + Hr),
        (b.style[le] = y || "translate(0, 0)");
    },
    vc = function (e, r) {
      var t = r || this,
        i = t.xPercent,
        n = t.yPercent,
        o = t.x,
        a = t.y,
        u = t.rotation,
        l = t.skewX,
        f = t.skewY,
        h = t.scaleX,
        d = t.scaleY,
        c = t.target,
        _ = t.xOrigin,
        p = t.yOrigin,
        m = t.xOffset,
        T = t.yOffset,
        b = t.forceCSS,
        P = parseFloat(o),
        y = parseFloat(a),
        w,
        S,
        x,
        O,
        C;
      (u = parseFloat(u)),
        (l = parseFloat(l)),
        (f = parseFloat(f)),
        f && ((f = parseFloat(f)), (l += f), (u += f)),
        u || l
          ? ((u *= yi),
            (l *= yi),
            (w = Math.cos(u) * h),
            (S = Math.sin(u) * h),
            (x = Math.sin(u - l) * -d),
            (O = Math.cos(u - l) * d),
            l &&
              ((f *= yi),
              (C = Math.tan(l - f)),
              (C = Math.sqrt(1 + C * C)),
              (x *= C),
              (O *= C),
              f && ((C = Math.tan(f)), (C = Math.sqrt(1 + C * C)), (w *= C), (S *= C))),
            (w = de(w)),
            (S = de(S)),
            (x = de(x)),
            (O = de(O)))
          : ((w = h), (O = d), (S = x = 0)),
        ((P && !~(o + "").indexOf("px")) || (y && !~(a + "").indexOf("px"))) &&
          ((P = Cr(c, "x", o, "px")), (y = Cr(c, "y", a, "px"))),
        (_ || p || m || T) &&
          ((P = de(P + _ - (_ * w + p * x) + m)), (y = de(y + p - (_ * S + p * O) + T))),
        (i || n) &&
          ((C = c.getBBox()),
          (P = de(P + (i / 100) * C.width)),
          (y = de(y + (n / 100) * C.height))),
        (C = "matrix(" + w + "," + S + "," + x + "," + O + "," + P + "," + y + ")"),
        c.setAttribute("transform", C),
        b && (c.style[le] = C);
    },
    xc = function (e, r, t, i, n) {
      var o = 360,
        a = Pe(n),
        u = parseFloat(n) * (a && ~n.indexOf("rad") ? Gr : 1),
        l = u - i,
        f = i + l + "deg",
        h,
        d;
      return (
        a &&
          ((h = n.split("_")[1]),
          h === "short" && ((l %= o), l !== l % (o / 2) && (l += l < 0 ? o : -o)),
          h === "cw" && l < 0
            ? (l = ((l + o * Qa) % o) - ~~(l / o) * o)
            : h === "ccw" && l > 0 && (l = ((l - o * Qa) % o) - ~~(l / o) * o)),
        (e._pt = d = new tt(e._pt, r, t, i, l, ic)),
        (d.e = f),
        (d.u = "deg"),
        e._props.push(t),
        d
      );
    },
    iu = function (e, r) {
      for (var t in r) e[t] = r[t];
      return e;
    },
    wc = function (e, r, t) {
      var i = iu({}, t._gsap),
        n = "perspective,force3D,transformOrigin,svgOrigin",
        o = t.style,
        a,
        u,
        l,
        f,
        h,
        d,
        c,
        _;
      i.svg
        ? ((l = t.getAttribute("transform")),
          t.setAttribute("transform", ""),
          (o[le] = r),
          (a = qi(t, 1)),
          jr(t, le),
          t.setAttribute("transform", l))
        : ((l = getComputedStyle(t)[le]), (o[le] = r), (a = qi(t, 1)), (o[le] = l));
      for (u in or)
        (l = i[u]),
          (f = a[u]),
          l !== f &&
            n.indexOf(u) < 0 &&
            ((c = Ne(l)),
            (_ = Ne(f)),
            (h = c !== _ ? Cr(t, u, l, _) : parseFloat(l)),
            (d = parseFloat(f)),
            (e._pt = new tt(e._pt, a, u, h, d - h, no)),
            (e._pt.u = _ || 0),
            e._props.push(u));
      iu(a, i);
    };
  et("padding,margin,Width,Radius", function (s, e) {
    var r = "Top",
      t = "Right",
      i = "Bottom",
      n = "Left",
      o = (e < 3 ? [r, t, i, n] : [r + n, r + t, i + t, i + n]).map(function (a) {
        return e < 2 ? s + a : "border" + a + s;
      });
    Nn[e > 1 ? "border" + s : s] = function (a, u, l, f, h) {
      var d, c;
      if (arguments.length < 4)
        return (
          (d = o.map(function (_) {
            return sr(a, _, l);
          })),
          (c = d.join(" ")),
          c.split(d[0]).length === 5 ? d[0] : c
        );
      (d = (f + "").split(" ")),
        (c = {}),
        o.forEach(function (_, p) {
          return (c[_] = d[p] = d[p] || d[((p - 1) / 2) | 0]);
        }),
        a.init(u, c, h);
    };
  });
  var ho = {
    name: "css",
    register: oo,
    targetTest: function (e) {
      return e.style && e.nodeType;
    },
    init: function (e, r, t, i, n) {
      var o = this._props,
        a = e.style,
        u = t.vars.startAt,
        l,
        f,
        h,
        d,
        c,
        _,
        p,
        m,
        T,
        b,
        P,
        y,
        w,
        S,
        x,
        O;
      uo || oo(), (this.styles = this.styles || au(e)), (O = this.styles.props), (this.tween = t);
      for (p in r)
        if (p !== "autoRound" && ((f = r[p]), !(ft[p] && Ks(p, r, t, i, e, n)))) {
          if (
            ((c = typeof f),
            (_ = Nn[p]),
            c === "function" && ((f = f.call(t, i, e, n)), (c = typeof f)),
            c === "string" && ~f.indexOf("random(") && (f = _i(f)),
            _)
          )
            _(this, e, p, f, t) && (x = 1);
          else if (p.substr(0, 2) === "--")
            (l = (getComputedStyle(e).getPropertyValue(p) + "").trim()),
              (f += ""),
              (ir.lastIndex = 0),
              ir.test(l) || ((m = Ne(l)), (T = Ne(f))),
              T ? m !== T && (l = Cr(e, p, l, T) + T) : m && (f += m),
              this.add(a, "setProperty", l, f, i, n, 0, 0, p),
              o.push(p),
              O.push(p, 0, a[p]);
          else if (c !== "undefined") {
            if (
              (u && p in u
                ? ((l = typeof u[p] == "function" ? u[p].call(t, i, e, n) : u[p]),
                  Pe(l) && ~l.indexOf("random(") && (l = _i(l)),
                  Ne(l + "") || l === "auto" || (l += pt.units[p] || Ne(sr(e, p)) || ""),
                  (l + "").charAt(1) === "=" && (l = sr(e, p)))
                : (l = sr(e, p)),
              (d = parseFloat(l)),
              (b = c === "string" && f.charAt(1) === "=" && f.substr(0, 2)),
              b && (f = f.substr(2)),
              (h = parseFloat(f)),
              p in $t &&
                (p === "autoAlpha" &&
                  (d === 1 && sr(e, "visibility") === "hidden" && h && (d = 0),
                  O.push("visibility", 0, a.visibility),
                  Sr(
                    this,
                    a,
                    "visibility",
                    d ? "inherit" : "hidden",
                    h ? "inherit" : "hidden",
                    !h
                  )),
                p !== "scale" &&
                  p !== "transform" &&
                  ((p = $t[p]), ~p.indexOf(",") && (p = p.split(",")[0]))),
              (P = p in or),
              P)
            ) {
              if (
                (this.styles.save(p),
                y ||
                  ((w = e._gsap),
                  (w.renderTransform && !r.parseTransform) || qi(e, r.parseTransform),
                  (S = r.smoothOrigin !== !1 && w.smooth),
                  (y = this._pt = new tt(this._pt, a, le, 0, 1, w.renderTransform, w, 0, -1)),
                  (y.dep = 1)),
                p === "scale")
              )
                (this._pt = new tt(
                  this._pt,
                  w,
                  "scaleY",
                  w.scaleY,
                  (b ? Wr(w.scaleY, b + h) : h) - w.scaleY || 0,
                  no
                )),
                  (this._pt.u = 0),
                  o.push("scaleY", p),
                  (p += "X");
              else if (p === "transformOrigin") {
                O.push(dt, 0, a[dt]),
                  (f = gc(f)),
                  w.svg
                    ? ao(e, f, 0, S, 0, this)
                    : ((T = parseFloat(f.split(" ")[2]) || 0),
                      T !== w.zOrigin && Sr(this, w, "zOrigin", w.zOrigin, T),
                      Sr(this, a, p, In(l), In(f)));
                continue;
              } else if (p === "svgOrigin") {
                ao(e, f, 1, S, 0, this);
                continue;
              } else if (p in cu) {
                xc(this, w, p, d, b ? Wr(d, b + f) : f);
                continue;
              } else if (p === "smoothOrigin") {
                Sr(this, w, "smooth", w.smooth, f);
                continue;
              } else if (p === "force3D") {
                w[p] = f;
                continue;
              } else if (p === "transform") {
                wc(this, f, e);
                continue;
              }
            } else p in a || (p = vi(p) || p);
            if (P || ((h || h === 0) && (d || d === 0) && !rc.test(f) && p in a))
              (m = (l + "").substr((d + "").length)),
                h || (h = 0),
                (T = Ne(f) || (p in pt.units ? pt.units[p] : m)),
                m !== T && (d = Cr(e, p, l, T)),
                (this._pt = new tt(
                  this._pt,
                  P ? w : a,
                  p,
                  d,
                  (b ? Wr(d, b + h) : h) - d,
                  !P && (T === "px" || p === "zIndex") && r.autoRound !== !1 ? sc : no
                )),
                (this._pt.u = T || 0),
                m !== T && T !== "%" && ((this._pt.b = l), (this._pt.r = nc));
            else if (p in a) _c.call(this, e, p, l, b ? b + f : f);
            else if (p in e) this.add(e, p, l || e[p], b ? b + f : f, i, n);
            else if (p !== "parseTransform") {
              An(p, f);
              continue;
            }
            P || (p in a ? O.push(p, 0, a[p]) : O.push(p, 1, l || e[p])), o.push(p);
          }
        }
      x && to(this);
    },
    render: function (e, r) {
      if (r.tween._time || !lo()) for (var t = r._pt; t; ) t.r(e, t.d), (t = t._next);
      else r.styles.revert();
    },
    get: sr,
    aliases: $t,
    getSetter: function (e, r, t) {
      var i = $t[r];
      return (
        i && i.indexOf(",") < 0 && (r = i),
        r in or && r !== dt && (e._gsap.x || sr(e, "x"))
          ? t && Ka === t
            ? r === "scale"
              ? lc
              : uc
            : (Ka = t || {}) && (r === "scale" ? fc : cc)
          : e.style && !Dn(e.style[r])
            ? oc
            : ~r.indexOf("-")
              ? ac
              : zn(e, r)
      );
    },
    core: { _removeProperty: jr, _getMatrix: co },
  };
  He.utils.checkPrefix = vi;
  He.core.getStyleSaver = au;
  (function (s, e, r, t) {
    var i = et(s + "," + e + "," + r, function (n) {
      or[n] = 1;
    });
    et(e, function (n) {
      (pt.units[n] = "deg"), (cu[n] = 1);
    }),
      ($t[i[13]] = s + "," + e),
      et(t, function (n) {
        var o = n.split(":");
        $t[o[1]] = i[o[0]];
      });
  })(
    "x,y,z,scale,scaleX,scaleY,xPercent,yPercent",
    "rotation,rotationX,rotationY,skewX,skewY",
    "transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective",
    "0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY"
  );
  et("x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective", function (s) {
    pt.units[s] = "px";
  });
  He.registerPlugin(ho);
  var ji = He.registerPlugin(ho) || He,
    Kc = ji.core.Tween;
  function du(s, e) {
    for (var r = 0; r < e.length; r++) {
      var t = e[r];
      (t.enumerable = t.enumerable || !1),
        (t.configurable = !0),
        "value" in t && (t.writable = !0),
        Object.defineProperty(s, t.key, t);
    }
  }
  function bc(s, e, r) {
    return e && du(s.prototype, e), r && du(s, r), s;
  }
  var Ie,
    Vn,
    Tc,
    xt,
    Pr,
    kr,
    wi,
    gu,
    $r,
    Ki,
    mu,
    ar,
    Bt,
    yu,
    vu = function () {
      return Ie || (typeof window < "u" && (Ie = window.gsap) && Ie.registerPlugin && Ie);
    },
    xu = 1,
    xi = [],
    V = [],
    Yt = [],
    Qi = Date.now,
    po = function (e, r) {
      return r;
    },
    Sc = function () {
      var e = Ki.core,
        r = e.bridge || {},
        t = e._scrollers,
        i = e._proxies;
      t.push.apply(t, V),
        i.push.apply(i, Yt),
        (V = t),
        (Yt = i),
        (po = function (o, a) {
          return r[o](a);
        });
    },
    lr = function (e, r) {
      return ~Yt.indexOf(e) && Yt[Yt.indexOf(e) + 1][r];
    },
    Zi = function (e) {
      return !!~mu.indexOf(e);
    },
    it = function (e, r, t, i, n) {
      return e.addEventListener(r, t, { passive: i !== !1, capture: !!n });
    },
    rt = function (e, r, t, i) {
      return e.removeEventListener(r, t, !!i);
    },
    Bn = "scrollLeft",
    Yn = "scrollTop",
    _o = function () {
      return (ar && ar.isPressed) || V.cache++;
    },
    Wn = function (e, r) {
      var t = function i(n) {
        if (n || n === 0) {
          xu && (xt.history.scrollRestoration = "manual");
          var o = ar && ar.isPressed;
          (n = i.v = Math.round(n) || (ar && ar.iOS ? 1 : 0)),
            e(n),
            (i.cacheID = V.cache),
            o && po("ss", n);
        } else (r || V.cache !== i.cacheID || po("ref")) && ((i.cacheID = V.cache), (i.v = e()));
        return i.v + i.offset;
      };
      return (t.offset = 0), e && t;
    },
    Ge = {
      s: Bn,
      p: "left",
      p2: "Left",
      os: "right",
      os2: "Right",
      d: "width",
      d2: "Width",
      a: "x",
      sc: Wn(function (s) {
        return arguments.length
          ? xt.scrollTo(s, Te.sc())
          : xt.pageXOffset || Pr[Bn] || kr[Bn] || wi[Bn] || 0;
      }),
    },
    Te = {
      s: Yn,
      p: "top",
      p2: "Top",
      os: "bottom",
      os2: "Bottom",
      d: "height",
      d2: "Height",
      a: "y",
      op: Ge,
      sc: Wn(function (s) {
        return arguments.length
          ? xt.scrollTo(Ge.sc(), s)
          : xt.pageYOffset || Pr[Yn] || kr[Yn] || wi[Yn] || 0;
      }),
    },
    nt = function (e, r) {
      return (
        ((r && r._ctx && r._ctx.selector) || Ie.utils.toArray)(e)[0] ||
        (typeof e == "string" && Ie.config().nullTargetWarn !== !1
          ? console.warn("Element not found:", e)
          : null)
      );
    },
    ur = function (e, r) {
      var t = r.s,
        i = r.sc;
      Zi(e) && (e = Pr.scrollingElement || kr);
      var n = V.indexOf(e),
        o = i === Te.sc ? 1 : 2;
      !~n && (n = V.push(e) - 1), V[n + o] || it(e, "scroll", _o);
      var a = V[n + o],
        u =
          a ||
          (V[n + o] =
            Wn(lr(e, t), !0) ||
            (Zi(e)
              ? i
              : Wn(function (l) {
                  return arguments.length ? (e[t] = l) : e[t];
                })));
      return (u.target = e), a || (u.smooth = Ie.getProperty(e, "scrollBehavior") === "smooth"), u;
    },
    Xn = function (e, r, t) {
      var i = e,
        n = e,
        o = Qi(),
        a = o,
        u = r || 50,
        l = Math.max(500, u * 3),
        f = function (_, p) {
          var m = Qi();
          p || m - o > u
            ? ((n = i), (i = _), (a = o), (o = m))
            : t
              ? (i += _)
              : (i = n + ((_ - n) / (m - a)) * (o - a));
        },
        h = function () {
          (n = i = t ? 0 : i), (a = o = 0);
        },
        d = function (_) {
          var p = a,
            m = n,
            T = Qi();
          return (
            (_ || _ === 0) && _ !== i && f(_),
            o === a || T - a > l ? 0 : ((i + (t ? m : -m)) / ((t ? T : o) - p)) * 1e3
          );
        };
      return { update: f, reset: h, getVelocity: d };
    },
    $i = function (e, r) {
      return r && !e._gsapAllow && e.preventDefault(), e.changedTouches ? e.changedTouches[0] : e;
    },
    _u = function (e) {
      var r = Math.max.apply(Math, e),
        t = Math.min.apply(Math, e);
      return Math.abs(r) >= Math.abs(t) ? r : t;
    },
    wu = function () {
      (Ki = Ie.core.globals().ScrollTrigger), Ki && Ki.core && Sc();
    },
    bu = function (e) {
      return (
        (Ie = e || vu()),
        !Vn &&
          Ie &&
          typeof document < "u" &&
          document.body &&
          ((xt = window),
          (Pr = document),
          (kr = Pr.documentElement),
          (wi = Pr.body),
          (mu = [xt, Pr, kr, wi]),
          (Tc = Ie.utils.clamp),
          (yu = Ie.core.context || function () {}),
          ($r = "onpointerenter" in wi ? "pointer" : "mouse"),
          (gu = _e.isTouch =
            xt.matchMedia && xt.matchMedia("(hover: none), (pointer: coarse)").matches
              ? 1
              : "ontouchstart" in xt ||
                  navigator.maxTouchPoints > 0 ||
                  navigator.msMaxTouchPoints > 0
                ? 2
                : 0),
          (Bt = _e.eventTypes =
            (
              "ontouchstart" in kr
                ? "touchstart,touchmove,touchcancel,touchend"
                : "onpointerdown" in kr
                  ? "pointerdown,pointermove,pointercancel,pointerup"
                  : "mousedown,mousemove,mouseup,mouseup"
            ).split(",")),
          setTimeout(function () {
            return (xu = 0);
          }, 500),
          wu(),
          (Vn = 1)),
        Vn
      );
    };
  Ge.op = Te;
  V.cache = 0;
  var _e = (function () {
    function s(r) {
      this.init(r);
    }
    var e = s.prototype;
    return (
      (e.init = function (t) {
        Vn || bu(Ie) || console.warn("Please gsap.registerPlugin(Observer)"), Ki || wu();
        var i = t.tolerance,
          n = t.dragMinimum,
          o = t.type,
          a = t.target,
          u = t.lineHeight,
          l = t.debounce,
          f = t.preventDefault,
          h = t.onStop,
          d = t.onStopDelay,
          c = t.ignore,
          _ = t.wheelSpeed,
          p = t.event,
          m = t.onDragStart,
          T = t.onDragEnd,
          b = t.onDrag,
          P = t.onPress,
          y = t.onRelease,
          w = t.onRight,
          S = t.onLeft,
          x = t.onUp,
          O = t.onDown,
          C = t.onChangeX,
          k = t.onChangeY,
          F = t.onChange,
          E = t.onToggleX,
          Y = t.onToggleY,
          B = t.onHover,
          $ = t.onHoverEnd,
          H = t.onMove,
          L = t.ignoreCheck,
          K = t.isNormalizer,
          re = t.onGestureStart,
          g = t.onGestureEnd,
          ie = t.onWheel,
          $e = t.onEnable,
          Dt = t.onDisable,
          ce = t.onClick,
          Re = t.scrollSpeed,
          Ke = t.capture,
          xe = t.allowClicks,
          Qe = t.lockAxis,
          Be = t.onLockAxis;
        (this.target = a = nt(a) || kr),
          (this.vars = t),
          c && (c = Ie.utils.toArray(c)),
          (i = i || 1e-9),
          (n = n || 0),
          (_ = _ || 1),
          (Re = Re || 1),
          (o = o || "wheel,touch,pointer"),
          (l = l !== !1),
          u || (u = parseFloat(xt.getComputedStyle(wi).lineHeight) || 22);
        var hr,
          Ze,
          At,
          Q,
          ge,
          lt,
          _t,
          v = this,
          gt = 0,
          Jt = 0,
          pr = t.passive || !f,
          we = ur(a, Ge),
          dr = ur(a, Te),
          Er = we(),
          ni = dr(),
          Oe = ~o.indexOf("touch") && !~o.indexOf("pointer") && Bt[0] === "pointerdown",
          _r = Zi(a),
          me = a.ownerDocument || Pr,
          Rt = [0, 0, 0],
          Tt = [0, 0, 0],
          er = 0,
          Ei = function () {
            return (er = Qi());
          },
          be = function (R, Z) {
            return (
              ((v.event = R) && c && ~c.indexOf(R.target)) ||
              (Z && Oe && R.pointerType !== "touch") ||
              (L && L(R, Z))
            );
          },
          dn = function () {
            v._vx.reset(), v._vy.reset(), Ze.pause(), h && h(v);
          },
          gr = function () {
            var R = (v.deltaX = _u(Rt)),
              Z = (v.deltaY = _u(Tt)),
              M = Math.abs(R) >= i,
              I = Math.abs(Z) >= i;
            F && (M || I) && F(v, R, Z, Rt, Tt),
              M &&
                (w && v.deltaX > 0 && w(v),
                S && v.deltaX < 0 && S(v),
                C && C(v),
                E && v.deltaX < 0 != gt < 0 && E(v),
                (gt = v.deltaX),
                (Rt[0] = Rt[1] = Rt[2] = 0)),
              I &&
                (O && v.deltaY > 0 && O(v),
                x && v.deltaY < 0 && x(v),
                k && k(v),
                Y && v.deltaY < 0 != Jt < 0 && Y(v),
                (Jt = v.deltaY),
                (Tt[0] = Tt[1] = Tt[2] = 0)),
              (Q || At) && (H && H(v), At && (b(v), (At = !1)), (Q = !1)),
              lt && !(lt = !1) && Be && Be(v),
              ge && (ie(v), (ge = !1)),
              (hr = 0);
          },
          si = function (R, Z, M) {
            (Rt[M] += R),
              (Tt[M] += Z),
              v._vx.update(R),
              v._vy.update(Z),
              l ? hr || (hr = requestAnimationFrame(gr)) : gr();
          },
          oi = function (R, Z) {
            Qe && !_t && ((v.axis = _t = Math.abs(R) > Math.abs(Z) ? "x" : "y"), (lt = !0)),
              _t !== "y" && ((Rt[2] += R), v._vx.update(R, !0)),
              _t !== "x" && ((Tt[2] += Z), v._vy.update(Z, !0)),
              l ? hr || (hr = requestAnimationFrame(gr)) : gr();
          },
          mr = function (R) {
            if (!be(R, 1)) {
              R = $i(R, f);
              var Z = R.clientX,
                M = R.clientY,
                I = Z - v.x,
                A = M - v.y,
                z = v.isDragging;
              (v.x = Z),
                (v.y = M),
                (z || Math.abs(v.startX - Z) >= n || Math.abs(v.startY - M) >= n) &&
                  (b && (At = !0), z || (v.isDragging = !0), oi(I, A), z || (m && m(v)));
            }
          },
          Mr = (v.onPress = function (N) {
            be(N, 1) ||
              (N && N.button) ||
              ((v.axis = _t = null),
              Ze.pause(),
              (v.isPressed = !0),
              (N = $i(N)),
              (gt = Jt = 0),
              (v.startX = v.x = N.clientX),
              (v.startY = v.y = N.clientY),
              v._vx.reset(),
              v._vy.reset(),
              it(K ? a : me, Bt[1], mr, pr, !0),
              (v.deltaX = v.deltaY = 0),
              P && P(v));
          }),
          X = (v.onRelease = function (N) {
            if (!be(N, 1)) {
              rt(K ? a : me, Bt[1], mr, !0);
              var R = !isNaN(v.y - v.startY),
                Z = v.isDragging,
                M = Z && (Math.abs(v.x - v.startX) > 3 || Math.abs(v.y - v.startY) > 3),
                I = $i(N);
              !M &&
                R &&
                (v._vx.reset(),
                v._vy.reset(),
                f &&
                  xe &&
                  Ie.delayedCall(0.08, function () {
                    if (Qi() - er > 300 && !N.defaultPrevented) {
                      if (N.target.click) N.target.click();
                      else if (me.createEvent) {
                        var A = me.createEvent("MouseEvents");
                        A.initMouseEvent(
                          "click",
                          !0,
                          !0,
                          xt,
                          1,
                          I.screenX,
                          I.screenY,
                          I.clientX,
                          I.clientY,
                          !1,
                          !1,
                          !1,
                          !1,
                          0,
                          null
                        ),
                          N.target.dispatchEvent(A);
                      }
                    }
                  })),
                (v.isDragging = v.isGesturing = v.isPressed = !1),
                h && Z && !K && Ze.restart(!0),
                T && Z && T(v),
                y && y(v, M);
            }
          }),
          Dr = function (R) {
            return R.touches && R.touches.length > 1 && (v.isGesturing = !0) && re(R, v.isDragging);
          },
          Ft = function () {
            return (v.isGesturing = !1) || g(v);
          },
          Lt = function (R) {
            if (!be(R)) {
              var Z = we(),
                M = dr();
              si((Z - Er) * Re, (M - ni) * Re, 1), (Er = Z), (ni = M), h && Ze.restart(!0);
            }
          },
          zt = function (R) {
            if (!be(R)) {
              (R = $i(R, f)), ie && (ge = !0);
              var Z = (R.deltaMode === 1 ? u : R.deltaMode === 2 ? xt.innerHeight : 1) * _;
              si(R.deltaX * Z, R.deltaY * Z, 0), h && !K && Ze.restart(!0);
            }
          },
          Ar = function (R) {
            if (!be(R)) {
              var Z = R.clientX,
                M = R.clientY,
                I = Z - v.x,
                A = M - v.y;
              (v.x = Z), (v.y = M), (Q = !0), h && Ze.restart(!0), (I || A) && oi(I, A);
            }
          },
          ai = function (R) {
            (v.event = R), B(v);
          },
          tr = function (R) {
            (v.event = R), $(v);
          },
          Mi = function (R) {
            return be(R) || ($i(R, f) && ce(v));
          };
        (Ze = v._dc = Ie.delayedCall(d || 0.25, dn).pause()),
          (v.deltaX = v.deltaY = 0),
          (v._vx = Xn(0, 50, !0)),
          (v._vy = Xn(0, 50, !0)),
          (v.scrollX = we),
          (v.scrollY = dr),
          (v.isDragging = v.isGesturing = v.isPressed = !1),
          yu(this),
          (v.enable = function (N) {
            return (
              v.isEnabled ||
                (it(_r ? me : a, "scroll", _o),
                o.indexOf("scroll") >= 0 && it(_r ? me : a, "scroll", Lt, pr, Ke),
                o.indexOf("wheel") >= 0 && it(a, "wheel", zt, pr, Ke),
                ((o.indexOf("touch") >= 0 && gu) || o.indexOf("pointer") >= 0) &&
                  (it(a, Bt[0], Mr, pr, Ke),
                  it(me, Bt[2], X),
                  it(me, Bt[3], X),
                  xe && it(a, "click", Ei, !0, !0),
                  ce && it(a, "click", Mi),
                  re && it(me, "gesturestart", Dr),
                  g && it(me, "gestureend", Ft),
                  B && it(a, $r + "enter", ai),
                  $ && it(a, $r + "leave", tr),
                  H && it(a, $r + "move", Ar)),
                (v.isEnabled = !0),
                N && N.type && Mr(N),
                $e && $e(v)),
              v
            );
          }),
          (v.disable = function () {
            v.isEnabled &&
              (xi.filter(function (N) {
                return N !== v && Zi(N.target);
              }).length || rt(_r ? me : a, "scroll", _o),
              v.isPressed && (v._vx.reset(), v._vy.reset(), rt(K ? a : me, Bt[1], mr, !0)),
              rt(_r ? me : a, "scroll", Lt, Ke),
              rt(a, "wheel", zt, Ke),
              rt(a, Bt[0], Mr, Ke),
              rt(me, Bt[2], X),
              rt(me, Bt[3], X),
              rt(a, "click", Ei, !0),
              rt(a, "click", Mi),
              rt(me, "gesturestart", Dr),
              rt(me, "gestureend", Ft),
              rt(a, $r + "enter", ai),
              rt(a, $r + "leave", tr),
              rt(a, $r + "move", Ar),
              (v.isEnabled = v.isPressed = v.isDragging = !1),
              Dt && Dt(v));
          }),
          (v.kill = v.revert =
            function () {
              v.disable();
              var N = xi.indexOf(v);
              N >= 0 && xi.splice(N, 1), ar === v && (ar = 0);
            }),
          xi.push(v),
          K && Zi(a) && (ar = v),
          v.enable(p);
      }),
      bc(s, [
        {
          key: "velocityX",
          get: function () {
            return this._vx.getVelocity();
          },
        },
        {
          key: "velocityY",
          get: function () {
            return this._vy.getVelocity();
          },
        },
      ]),
      s
    );
  })();
  _e.version = "3.12.5";
  _e.create = function (s) {
    return new _e(s);
  };
  _e.register = bu;
  _e.getAll = function () {
    return xi.slice();
  };
  _e.getById = function (s) {
    return xi.filter(function (e) {
      return e.vars.id === s;
    })[0];
  };
  vu() && Ie.registerPlugin(_e);
  var D,
    Si,
    j,
    fe,
    Vt,
    ne,
    Yu,
    ss,
    hn,
    on,
    en,
    Un,
    qe,
    ls,
    To,
    ot,
    Tu,
    Su,
    Ci,
    Vu,
    go,
    Wu,
    st,
    So,
    Xu,
    Uu,
    Or,
    Co,
    Mo,
    Pi,
    Do,
    os,
    Po,
    mo,
    Hn = 1,
    je = Date.now,
    yo = je(),
    Mt = 0,
    tn = 0,
    Cu = function (e, r, t) {
      var i = bt(e) && (e.substr(0, 6) === "clamp(" || e.indexOf("max") > -1);
      return (t["_" + r + "Clamp"] = i), i ? e.substr(6, e.length - 7) : e;
    },
    Pu = function (e, r) {
      return r && (!bt(e) || e.substr(0, 6) !== "clamp(") ? "clamp(" + e + ")" : e;
    },
    Cc = function s() {
      return tn && requestAnimationFrame(s);
    },
    ku = function () {
      return (ls = 1);
    },
    Ou = function () {
      return (ls = 0);
    },
    Qt = function (e) {
      return e;
    },
    rn = function (e) {
      return Math.round(e * 1e5) / 1e5 || 0;
    },
    Hu = function () {
      return typeof window < "u";
    },
    Gu = function () {
      return D || (Hu() && (D = window.gsap) && D.registerPlugin && D);
    },
    ti = function (e) {
      return !!~Yu.indexOf(e);
    },
    qu = function (e) {
      return (e === "Height" ? Do : j["inner" + e]) || Vt["client" + e] || ne["client" + e];
    },
    ju = function (e) {
      return (
        lr(e, "getBoundingClientRect") ||
        (ti(e)
          ? function () {
              return (ns.width = j.innerWidth), (ns.height = Do), ns;
            }
          : function () {
              return fr(e);
            })
      );
    },
    Pc = function (e, r, t) {
      var i = t.d,
        n = t.d2,
        o = t.a;
      return (o = lr(e, "getBoundingClientRect"))
        ? function () {
            return o()[i];
          }
        : function () {
            return (r ? qu(n) : e["client" + n]) || 0;
          };
    },
    kc = function (e, r) {
      return !r || ~Yt.indexOf(e)
        ? ju(e)
        : function () {
            return ns;
          };
    },
    Zt = function (e, r) {
      var t = r.s,
        i = r.d2,
        n = r.d,
        o = r.a;
      return Math.max(
        0,
        (t = "scroll" + i) && (o = lr(e, t))
          ? o() - ju(e)()[n]
          : ti(e)
            ? (Vt[t] || ne[t]) - qu(i)
            : e[t] - e["offset" + i]
      );
    },
    Gn = function (e, r) {
      for (var t = 0; t < Ci.length; t += 3)
        (!r || ~r.indexOf(Ci[t + 1])) && e(Ci[t], Ci[t + 1], Ci[t + 2]);
    },
    bt = function (e) {
      return typeof e == "string";
    },
    ut = function (e) {
      return typeof e == "function";
    },
    nn = function (e) {
      return typeof e == "number";
    },
    Kr = function (e) {
      return typeof e == "object";
    },
    Ji = function (e, r, t) {
      return e && e.progress(r ? 0 : 1) && t && e.pause();
    },
    vo = function (e, r) {
      if (e.enabled) {
        var t = e._ctx
          ? e._ctx.add(function () {
              return r(e);
            })
          : r(e);
        t && t.totalTime && (e.callbackAnimation = t);
      }
    },
    bi = Math.abs,
    $u = "left",
    Ku = "top",
    Ao = "right",
    Ro = "bottom",
    Zr = "width",
    Jr = "height",
    an = "Right",
    un = "Left",
    ln = "Top",
    fn = "Bottom",
    Se = "padding",
    Ot = "margin",
    Oi = "Width",
    Fo = "Height",
    ke = "px",
    Et = function (e) {
      return j.getComputedStyle(e);
    },
    Oc = function (e) {
      var r = Et(e).position;
      e.style.position = r === "absolute" || r === "fixed" ? r : "relative";
    },
    Eu = function (e, r) {
      for (var t in r) t in e || (e[t] = r[t]);
      return e;
    },
    fr = function (e, r) {
      var t =
          r &&
          Et(e)[To] !== "matrix(1, 0, 0, 1, 0, 0)" &&
          D.to(e, {
            x: 0,
            y: 0,
            xPercent: 0,
            yPercent: 0,
            rotation: 0,
            rotationX: 0,
            rotationY: 0,
            scale: 1,
            skewX: 0,
            skewY: 0,
          }).progress(1),
        i = e.getBoundingClientRect();
      return t && t.progress(0).kill(), i;
    },
    as = function (e, r) {
      var t = r.d2;
      return e["offset" + t] || e["client" + t] || 0;
    },
    Qu = function (e) {
      var r = [],
        t = e.labels,
        i = e.duration(),
        n;
      for (n in t) r.push(t[n] / i);
      return r;
    },
    Ec = function (e) {
      return function (r) {
        return D.utils.snap(Qu(e), r);
      };
    },
    Lo = function (e) {
      var r = D.utils.snap(e),
        t =
          Array.isArray(e) &&
          e.slice(0).sort(function (i, n) {
            return i - n;
          });
      return t
        ? function (i, n, o) {
            o === void 0 && (o = 0.001);
            var a;
            if (!n) return r(i);
            if (n > 0) {
              for (i -= o, a = 0; a < t.length; a++) if (t[a] >= i) return t[a];
              return t[a - 1];
            } else for (a = t.length, i += o; a--; ) if (t[a] <= i) return t[a];
            return t[0];
          }
        : function (i, n, o) {
            o === void 0 && (o = 0.001);
            var a = r(i);
            return !n || Math.abs(a - i) < o || a - i < 0 == n < 0 ? a : r(n < 0 ? i - e : i + e);
          };
    },
    Mc = function (e) {
      return function (r, t) {
        return Lo(Qu(e))(r, t.direction);
      };
    },
    qn = function (e, r, t, i) {
      return t.split(",").forEach(function (n) {
        return e(r, n, i);
      });
    },
    Ae = function (e, r, t, i, n) {
      return e.addEventListener(r, t, { passive: !i, capture: !!n });
    },
    De = function (e, r, t, i) {
      return e.removeEventListener(r, t, !!i);
    },
    jn = function (e, r, t) {
      (t = t && t.wheelHandler), t && (e(r, "wheel", t), e(r, "touchmove", t));
    },
    Mu = {
      startColor: "green",
      endColor: "red",
      indent: 0,
      fontSize: "16px",
      fontWeight: "normal",
    },
    $n = { toggleActions: "play", anticipatePin: 0 },
    us = { top: 0, left: 0, center: 0.5, bottom: 1, right: 1 },
    es = function (e, r) {
      if (bt(e)) {
        var t = e.indexOf("="),
          i = ~t ? +(e.charAt(t - 1) + 1) * parseFloat(e.substr(t + 1)) : 0;
        ~t && (e.indexOf("%") > t && (i *= r / 100), (e = e.substr(0, t - 1))),
          (e =
            i +
            (e in us
              ? us[e] * r
              : ~e.indexOf("%")
                ? (parseFloat(e) * r) / 100
                : parseFloat(e) || 0));
      }
      return e;
    },
    Kn = function (e, r, t, i, n, o, a, u) {
      var l = n.startColor,
        f = n.endColor,
        h = n.fontSize,
        d = n.indent,
        c = n.fontWeight,
        _ = fe.createElement("div"),
        p = ti(t) || lr(t, "pinType") === "fixed",
        m = e.indexOf("scroller") !== -1,
        T = p ? ne : t,
        b = e.indexOf("start") !== -1,
        P = b ? l : f,
        y =
          "border-color:" +
          P +
          ";font-size:" +
          h +
          ";color:" +
          P +
          ";font-weight:" +
          c +
          ";pointer-events:none;white-space:nowrap;font-family:sans-serif,Arial;z-index:1000;padding:4px 8px;border-width:0;border-style:solid;";
      return (
        (y += "position:" + ((m || u) && p ? "fixed;" : "absolute;")),
        (m || u || !p) && (y += (i === Te ? Ao : Ro) + ":" + (o + parseFloat(d)) + "px;"),
        a && (y += "box-sizing:border-box;text-align:left;width:" + a.offsetWidth + "px;"),
        (_._isStart = b),
        _.setAttribute("class", "gsap-marker-" + e + (r ? " marker-" + r : "")),
        (_.style.cssText = y),
        (_.innerText = r || r === 0 ? e + "-" + r : e),
        T.children[0] ? T.insertBefore(_, T.children[0]) : T.appendChild(_),
        (_._offset = _["offset" + i.op.d2]),
        ts(_, 0, i, b),
        _
      );
    },
    ts = function (e, r, t, i) {
      var n = { display: "block" },
        o = t[i ? "os2" : "p2"],
        a = t[i ? "p2" : "os2"];
      (e._isFlipped = i),
        (n[t.a + "Percent"] = i ? -100 : 0),
        (n[t.a] = i ? "1px" : 0),
        (n["border" + o + Oi] = 1),
        (n["border" + a + Oi] = 0),
        (n[t.p] = r + "px"),
        D.set(e, n);
    },
    W = [],
    ko = {},
    pn,
    Du = function () {
      return je() - Mt > 34 && (pn || (pn = requestAnimationFrame(cr)));
    },
    Ti = function () {
      (!st || !st.isPressed || st.startX > ne.clientWidth) &&
        (V.cache++,
        st ? pn || (pn = requestAnimationFrame(cr)) : cr(),
        Mt || ii("scrollStart"),
        (Mt = je()));
    },
    xo = function () {
      (Uu = j.innerWidth), (Xu = j.innerHeight);
    },
    sn = function () {
      V.cache++,
        !qe &&
          !Wu &&
          !fe.fullscreenElement &&
          !fe.webkitFullscreenElement &&
          (!So || Uu !== j.innerWidth || Math.abs(j.innerHeight - Xu) > j.innerHeight * 0.25) &&
          ss.restart(!0);
    },
    ri = {},
    Dc = [],
    Zu = function s() {
      return De(U, "scrollEnd", s) || Qr(!0);
    },
    ii = function (e) {
      return (
        (ri[e] &&
          ri[e].map(function (r) {
            return r();
          })) ||
        Dc
      );
    },
    wt = [],
    Ju = function (e) {
      for (var r = 0; r < wt.length; r += 5)
        (!e || (wt[r + 4] && wt[r + 4].query === e)) &&
          ((wt[r].style.cssText = wt[r + 1]),
          wt[r].getBBox && wt[r].setAttribute("transform", wt[r + 2] || ""),
          (wt[r + 3].uncache = 1));
    },
    zo = function (e, r) {
      var t;
      for (ot = 0; ot < W.length; ot++)
        (t = W[ot]), t && (!r || t._ctx === r) && (e ? t.kill(1) : t.revert(!0, !0));
      (os = !0), r && Ju(r), r || ii("revert");
    },
    el = function (e, r) {
      V.cache++,
        (r || !at) &&
          V.forEach(function (t) {
            return ut(t) && t.cacheID++ && (t.rec = 0);
          }),
        bt(e) && (j.history.scrollRestoration = Mo = e);
    },
    at,
    ei = 0,
    Au,
    Ac = function () {
      if (Au !== ei) {
        var e = (Au = ei);
        requestAnimationFrame(function () {
          return e === ei && Qr(!0);
        });
      }
    },
    tl = function () {
      ne.appendChild(Pi), (Do = (!st && Pi.offsetHeight) || j.innerHeight), ne.removeChild(Pi);
    },
    Ru = function (e) {
      return hn(
        ".gsap-marker-start, .gsap-marker-end, .gsap-marker-scroller-start, .gsap-marker-scroller-end"
      ).forEach(function (r) {
        return (r.style.display = e ? "none" : "block");
      });
    },
    Qr = function (e, r) {
      if (Mt && !e && !os) {
        Ae(U, "scrollEnd", Zu);
        return;
      }
      tl(),
        (at = U.isRefreshing = !0),
        V.forEach(function (i) {
          return ut(i) && ++i.cacheID && (i.rec = i());
        });
      var t = ii("refreshInit");
      Vu && U.sort(),
        r || zo(),
        V.forEach(function (i) {
          ut(i) && (i.smooth && (i.target.style.scrollBehavior = "auto"), i(0));
        }),
        W.slice(0).forEach(function (i) {
          return i.refresh();
        }),
        (os = !1),
        W.forEach(function (i) {
          if (i._subPinOffset && i.pin) {
            var n = i.vars.horizontal ? "offsetWidth" : "offsetHeight",
              o = i.pin[n];
            i.revert(!0, 1), i.adjustPinSpacing(i.pin[n] - o), i.refresh();
          }
        }),
        (Po = 1),
        Ru(!0),
        W.forEach(function (i) {
          var n = Zt(i.scroller, i._dir),
            o = i.vars.end === "max" || (i._endClamp && i.end > n),
            a = i._startClamp && i.start >= n;
          (o || a) &&
            i.setPositions(a ? n - 1 : i.start, o ? Math.max(a ? n : i.start + 1, n) : i.end, !0);
        }),
        Ru(!1),
        (Po = 0),
        t.forEach(function (i) {
          return i && i.render && i.render(-1);
        }),
        V.forEach(function (i) {
          ut(i) &&
            (i.smooth &&
              requestAnimationFrame(function () {
                return (i.target.style.scrollBehavior = "smooth");
              }),
            i.rec && i(i.rec));
        }),
        el(Mo, 1),
        ss.pause(),
        ei++,
        (at = 2),
        cr(2),
        W.forEach(function (i) {
          return ut(i.vars.onRefresh) && i.vars.onRefresh(i);
        }),
        (at = U.isRefreshing = !1),
        ii("refresh");
    },
    Oo = 0,
    rs = 1,
    cn,
    cr = function (e) {
      if (e === 2 || (!at && !os)) {
        (U.isUpdating = !0), cn && cn.update(0);
        var r = W.length,
          t = je(),
          i = t - yo >= 50,
          n = r && W[0].scroll();
        if (
          ((rs = Oo > n ? -1 : 1),
          at || (Oo = n),
          i && (Mt && !ls && t - Mt > 200 && ((Mt = 0), ii("scrollEnd")), (en = yo), (yo = t)),
          rs < 0)
        ) {
          for (ot = r; ot-- > 0; ) W[ot] && W[ot].update(0, i);
          rs = 1;
        } else for (ot = 0; ot < r; ot++) W[ot] && W[ot].update(0, i);
        U.isUpdating = !1;
      }
      pn = 0;
    },
    Eo = [
      $u,
      Ku,
      Ro,
      Ao,
      Ot + fn,
      Ot + an,
      Ot + ln,
      Ot + un,
      "display",
      "flexShrink",
      "float",
      "zIndex",
      "gridColumnStart",
      "gridColumnEnd",
      "gridRowStart",
      "gridRowEnd",
      "gridArea",
      "justifySelf",
      "alignSelf",
      "placeSelf",
      "order",
    ],
    is = Eo.concat([
      Zr,
      Jr,
      "boxSizing",
      "max" + Oi,
      "max" + Fo,
      "position",
      Ot,
      Se,
      Se + ln,
      Se + an,
      Se + fn,
      Se + un,
    ]),
    Rc = function (e, r, t) {
      ki(t);
      var i = e._gsap;
      if (i.spacerIsNative) ki(i.spacerState);
      else if (e._gsap.swappedIn) {
        var n = r.parentNode;
        n && (n.insertBefore(e, r), n.removeChild(r));
      }
      e._gsap.swappedIn = !1;
    },
    wo = function (e, r, t, i) {
      if (!e._gsap.swappedIn) {
        for (var n = Eo.length, o = r.style, a = e.style, u; n--; ) (u = Eo[n]), (o[u] = t[u]);
        (o.position = t.position === "absolute" ? "absolute" : "relative"),
          t.display === "inline" && (o.display = "inline-block"),
          (a[Ro] = a[Ao] = "auto"),
          (o.flexBasis = t.flexBasis || "auto"),
          (o.overflow = "visible"),
          (o.boxSizing = "border-box"),
          (o[Zr] = as(e, Ge) + ke),
          (o[Jr] = as(e, Te) + ke),
          (o[Se] = a[Ot] = a[Ku] = a[$u] = "0"),
          ki(i),
          (a[Zr] = a["max" + Oi] = t[Zr]),
          (a[Jr] = a["max" + Fo] = t[Jr]),
          (a[Se] = t[Se]),
          e.parentNode !== r && (e.parentNode.insertBefore(r, e), r.appendChild(e)),
          (e._gsap.swappedIn = !0);
      }
    },
    Fc = /([A-Z])/g,
    ki = function (e) {
      if (e) {
        var r = e.t.style,
          t = e.length,
          i = 0,
          n,
          o;
        for ((e.t._gsap || D.core.getCache(e.t)).uncache = 1; i < t; i += 2)
          (o = e[i + 1]),
            (n = e[i]),
            o ? (r[n] = o) : r[n] && r.removeProperty(n.replace(Fc, "-$1").toLowerCase());
      }
    },
    Qn = function (e) {
      for (var r = is.length, t = e.style, i = [], n = 0; n < r; n++) i.push(is[n], t[is[n]]);
      return (i.t = e), i;
    },
    Lc = function (e, r, t) {
      for (var i = [], n = e.length, o = t ? 8 : 0, a; o < n; o += 2)
        (a = e[o]), i.push(a, a in r ? r[a] : e[o + 1]);
      return (i.t = e.t), i;
    },
    ns = { left: 0, top: 0 },
    Fu = function (e, r, t, i, n, o, a, u, l, f, h, d, c, _) {
      ut(e) && (e = e(u)),
        bt(e) &&
          e.substr(0, 3) === "max" &&
          (e = d + (e.charAt(4) === "=" ? es("0" + e.substr(3), t) : 0));
      var p = c ? c.time() : 0,
        m,
        T,
        b;
      if ((c && c.seek(0), isNaN(e) || (e = +e), nn(e)))
        c && (e = D.utils.mapRange(c.scrollTrigger.start, c.scrollTrigger.end, 0, d, e)),
          a && ts(a, t, i, !0);
      else {
        ut(r) && (r = r(u));
        var P = (e || "0").split(" "),
          y,
          w,
          S,
          x;
        (b = nt(r, u) || ne),
          (y = fr(b) || {}),
          (!y || (!y.left && !y.top)) &&
            Et(b).display === "none" &&
            ((x = b.style.display),
            (b.style.display = "block"),
            (y = fr(b)),
            x ? (b.style.display = x) : b.style.removeProperty("display")),
          (w = es(P[0], y[i.d])),
          (S = es(P[1] || "0", t)),
          (e = y[i.p] - l[i.p] - f + w + n - S),
          a && ts(a, S, i, t - S < 20 || (a._isStart && S > 20)),
          (t -= t - S);
      }
      if ((_ && ((u[_] = e || -0.001), e < 0 && (e = 0)), o)) {
        var O = e + t,
          C = o._isStart;
        (m = "scroll" + i.d2),
          ts(
            o,
            O,
            i,
            (C && O > 20) || (!C && (h ? Math.max(ne[m], Vt[m]) : o.parentNode[m]) <= O + 1)
          ),
          h && ((l = fr(a)), h && (o.style[i.op.p] = l[i.op.p] - i.op.m - o._offset + ke));
      }
      return (
        c &&
          b &&
          ((m = fr(b)),
          c.seek(d),
          (T = fr(b)),
          (c._caScrollDist = m[i.p] - T[i.p]),
          (e = (e / c._caScrollDist) * d)),
        c && c.seek(p),
        c ? e : Math.round(e)
      );
    },
    zc = /(webkit|moz|length|cssText|inset)/i,
    Lu = function (e, r, t, i) {
      if (e.parentNode !== r) {
        var n = e.style,
          o,
          a;
        if (r === ne) {
          (e._stOrig = n.cssText), (a = Et(e));
          for (o in a)
            !+o && !zc.test(o) && a[o] && typeof n[o] == "string" && o !== "0" && (n[o] = a[o]);
          (n.top = t), (n.left = i);
        } else n.cssText = e._stOrig;
        (D.core.getCache(e).uncache = 1), r.appendChild(e);
      }
    },
    rl = function (e, r, t) {
      var i = r,
        n = i;
      return function (o) {
        var a = Math.round(e());
        return (
          a !== i && a !== n && Math.abs(a - i) > 3 && Math.abs(a - n) > 3 && ((o = a), t && t()),
          (n = i),
          (i = o),
          o
        );
      };
    },
    Zn = function (e, r, t) {
      var i = {};
      (i[r.p] = "+=" + t), D.set(e, i);
    },
    zu = function (e, r) {
      var t = ur(e, r),
        i = "_scroll" + r.p2,
        n = function o(a, u, l, f, h) {
          var d = o.tween,
            c = u.onComplete,
            _ = {};
          l = l || t();
          var p = rl(t, l, function () {
            d.kill(), (o.tween = 0);
          });
          return (
            (h = (f && h) || 0),
            (f = f || a - l),
            d && d.kill(),
            (u[i] = a),
            (u.inherit = !1),
            (u.modifiers = _),
            (_[i] = function () {
              return p(l + f * d.ratio + h * d.ratio * d.ratio);
            }),
            (u.onUpdate = function () {
              V.cache++, o.tween && cr();
            }),
            (u.onComplete = function () {
              (o.tween = 0), c && c.call(d);
            }),
            (d = o.tween = D.to(e, u)),
            d
          );
        };
      return (
        (e[i] = t),
        (t.wheelHandler = function () {
          return n.tween && n.tween.kill() && (n.tween = 0);
        }),
        Ae(e, "wheel", t.wheelHandler),
        U.isTouch && Ae(e, "touchmove", t.wheelHandler),
        n
      );
    },
    U = (function () {
      function s(r, t) {
        Si || s.register(D) || console.warn("Please gsap.registerPlugin(ScrollTrigger)"),
          Co(this),
          this.init(r, t);
      }
      var e = s.prototype;
      return (
        (e.init = function (t, i) {
          if (((this.progress = this.start = 0), this.vars && this.kill(!0, !0), !tn)) {
            this.update = this.refresh = this.kill = Qt;
            return;
          }
          t = Eu(bt(t) || nn(t) || t.nodeType ? { trigger: t } : t, $n);
          var n = t,
            o = n.onUpdate,
            a = n.toggleClass,
            u = n.id,
            l = n.onToggle,
            f = n.onRefresh,
            h = n.scrub,
            d = n.trigger,
            c = n.pin,
            _ = n.pinSpacing,
            p = n.invalidateOnRefresh,
            m = n.anticipatePin,
            T = n.onScrubComplete,
            b = n.onSnapComplete,
            P = n.once,
            y = n.snap,
            w = n.pinReparent,
            S = n.pinSpacer,
            x = n.containerAnimation,
            O = n.fastScrollEnd,
            C = n.preventOverlaps,
            k = t.horizontal || (t.containerAnimation && t.horizontal !== !1) ? Ge : Te,
            F = !h && h !== 0,
            E = nt(t.scroller || j),
            Y = D.core.getCache(E),
            B = ti(E),
            $ = ("pinType" in t ? t.pinType : lr(E, "pinType") || (B && "fixed")) === "fixed",
            H = [t.onEnter, t.onLeave, t.onEnterBack, t.onLeaveBack],
            L = F && t.toggleActions.split(" "),
            K = "markers" in t ? t.markers : $n.markers,
            re = B ? 0 : parseFloat(Et(E)["border" + k.p2 + Oi]) || 0,
            g = this,
            ie =
              t.onRefreshInit &&
              function () {
                return t.onRefreshInit(g);
              },
            $e = Pc(E, B, k),
            Dt = kc(E, B),
            ce = 0,
            Re = 0,
            Ke = 0,
            xe = ur(E, k),
            Qe,
            Be,
            hr,
            Ze,
            At,
            Q,
            ge,
            lt,
            _t,
            v,
            gt,
            Jt,
            pr,
            we,
            dr,
            Er,
            ni,
            Oe,
            _r,
            me,
            Rt,
            Tt,
            er,
            Ei,
            be,
            dn,
            gr,
            si,
            oi,
            mr,
            Mr,
            X,
            Dr,
            Ft,
            Lt,
            zt,
            Ar,
            ai,
            tr;
          if (
            ((g._startClamp = g._endClamp = !1),
            (g._dir = k),
            (m *= 45),
            (g.scroller = E),
            (g.scroll = x ? x.time.bind(x) : xe),
            (Ze = xe()),
            (g.vars = t),
            (i = i || t.animation),
            "refreshPriority" in t && ((Vu = 1), t.refreshPriority === -9999 && (cn = g)),
            (Y.tweenScroll = Y.tweenScroll || { top: zu(E, Te), left: zu(E, Ge) }),
            (g.tweenTo = Qe = Y.tweenScroll[k.p]),
            (g.scrubDuration = function (M) {
              (Dr = nn(M) && M),
                Dr
                  ? X
                    ? X.duration(M)
                    : (X = D.to(i, {
                        ease: "expo",
                        totalProgress: "+=0",
                        inherit: !1,
                        duration: Dr,
                        paused: !0,
                        onComplete: function () {
                          return T && T(g);
                        },
                      }))
                  : (X && X.progress(1).kill(), (X = 0));
            }),
            i &&
              ((i.vars.lazy = !1),
              (i._initted && !g.isReverted) ||
                (i.vars.immediateRender !== !1 &&
                  t.immediateRender !== !1 &&
                  i.duration() &&
                  i.render(0, !0, !0)),
              (g.animation = i.pause()),
              (i.scrollTrigger = g),
              g.scrubDuration(h),
              (mr = 0),
              u || (u = i.vars.id)),
            y &&
              ((!Kr(y) || y.push) && (y = { snapTo: y }),
              "scrollBehavior" in ne.style && D.set(B ? [ne, Vt] : E, { scrollBehavior: "auto" }),
              V.forEach(function (M) {
                return ut(M) && M.target === (B ? fe.scrollingElement || Vt : E) && (M.smooth = !1);
              }),
              (hr = ut(y.snapTo)
                ? y.snapTo
                : y.snapTo === "labels"
                  ? Ec(i)
                  : y.snapTo === "labelsDirectional"
                    ? Mc(i)
                    : y.directional !== !1
                      ? function (M, I) {
                          return Lo(y.snapTo)(M, je() - Re < 500 ? 0 : I.direction);
                        }
                      : D.utils.snap(y.snapTo)),
              (Ft = y.duration || { min: 0.1, max: 2 }),
              (Ft = Kr(Ft) ? on(Ft.min, Ft.max) : on(Ft, Ft)),
              (Lt = D.delayedCall(y.delay || Dr / 2 || 0.1, function () {
                var M = xe(),
                  I = je() - Re < 500,
                  A = Qe.tween;
                if ((I || Math.abs(g.getVelocity()) < 10) && !A && !ls && ce !== M) {
                  var z = (M - Q) / we,
                    Ee = i && !F ? i.totalProgress() : z,
                    G = I ? 0 : ((Ee - Mr) / (je() - en)) * 1e3 || 0,
                    ye = D.utils.clamp(-z, 1 - z, (bi(G / 2) * G) / 0.185),
                    Ye = z + (y.inertia === !1 ? 0 : ye),
                    he,
                    se,
                    J = y,
                    Nt = J.onStart,
                    ae = J.onInterrupt,
                    mt = J.onComplete;
                  if (
                    ((he = hr(Ye, g)),
                    nn(he) || (he = Ye),
                    (se = Math.round(Q + he * we)),
                    M <= ge && M >= Q && se !== M)
                  ) {
                    if (A && !A._initted && A.data <= bi(se - M)) return;
                    y.inertia === !1 && (ye = he - z),
                      Qe(
                        se,
                        {
                          duration: Ft(
                            bi((Math.max(bi(Ye - Ee), bi(he - Ee)) * 0.185) / G / 0.05 || 0)
                          ),
                          ease: y.ease || "power3",
                          data: bi(se - M),
                          onInterrupt: function () {
                            return Lt.restart(!0) && ae && ae(g);
                          },
                          onComplete: function () {
                            g.update(),
                              (ce = xe()),
                              i &&
                                (X
                                  ? X.resetTo("totalProgress", he, i._tTime / i._tDur)
                                  : i.progress(he)),
                              (mr = Mr = i && !F ? i.totalProgress() : g.progress),
                              b && b(g),
                              mt && mt(g);
                          },
                        },
                        M,
                        ye * we,
                        se - M - ye * we
                      ),
                      Nt && Nt(g, Qe.tween);
                  }
                } else g.isActive && ce !== M && Lt.restart(!0);
              }).pause())),
            u && (ko[u] = g),
            (d = g.trigger = nt(d || (c !== !0 && c))),
            (tr = d && d._gsap && d._gsap.stRevert),
            tr && (tr = tr(g)),
            (c = c === !0 ? d : nt(c)),
            bt(a) && (a = { targets: d, className: a }),
            c &&
              (_ === !1 ||
                _ === Ot ||
                (_ =
                  !_ && c.parentNode && c.parentNode.style && Et(c.parentNode).display === "flex"
                    ? !1
                    : Se),
              (g.pin = c),
              (Be = D.core.getCache(c)),
              Be.spacer
                ? (dr = Be.pinState)
                : (S &&
                    ((S = nt(S)),
                    S && !S.nodeType && (S = S.current || S.nativeElement),
                    (Be.spacerIsNative = !!S),
                    S && (Be.spacerState = Qn(S))),
                  (Be.spacer = Oe = S || fe.createElement("div")),
                  Oe.classList.add("pin-spacer"),
                  u && Oe.classList.add("pin-spacer-" + u),
                  (Be.pinState = dr = Qn(c))),
              t.force3D !== !1 && D.set(c, { force3D: !0 }),
              (g.spacer = Oe = Be.spacer),
              (oi = Et(c)),
              (Ei = oi[_ + k.os2]),
              (me = D.getProperty(c)),
              (Rt = D.quickSetter(c, k.a, ke)),
              wo(c, Oe, oi),
              (ni = Qn(c))),
            K)
          ) {
            (Jt = Kr(K) ? Eu(K, Mu) : Mu),
              (v = Kn("scroller-start", u, E, k, Jt, 0)),
              (gt = Kn("scroller-end", u, E, k, Jt, 0, v)),
              (_r = v["offset" + k.op.d2]);
            var Mi = nt(lr(E, "content") || E);
            (lt = this.markerStart = Kn("start", u, Mi, k, Jt, _r, 0, x)),
              (_t = this.markerEnd = Kn("end", u, Mi, k, Jt, _r, 0, x)),
              x && (ai = D.quickSetter([lt, _t], k.a, ke)),
              !$ &&
                !(Yt.length && lr(E, "fixedMarkers") === !0) &&
                (Oc(B ? ne : E),
                D.set([v, gt], { force3D: !0 }),
                (dn = D.quickSetter(v, k.a, ke)),
                (si = D.quickSetter(gt, k.a, ke)));
          }
          if (x) {
            var N = x.vars.onUpdate,
              R = x.vars.onUpdateParams;
            x.eventCallback("onUpdate", function () {
              g.update(0, 0, 1), N && N.apply(x, R || []);
            });
          }
          if (
            ((g.previous = function () {
              return W[W.indexOf(g) - 1];
            }),
            (g.next = function () {
              return W[W.indexOf(g) + 1];
            }),
            (g.revert = function (M, I) {
              if (!I) return g.kill(!0);
              var A = M !== !1 || !g.enabled,
                z = qe;
              A !== g.isReverted &&
                (A &&
                  ((zt = Math.max(xe(), g.scroll.rec || 0)),
                  (Ke = g.progress),
                  (Ar = i && i.progress())),
                lt &&
                  [lt, _t, v, gt].forEach(function (Ee) {
                    return (Ee.style.display = A ? "none" : "block");
                  }),
                A && ((qe = g), g.update(A)),
                c && (!w || !g.isActive) && (A ? Rc(c, Oe, dr) : wo(c, Oe, Et(c), be)),
                A || g.update(A),
                (qe = z),
                (g.isReverted = A));
            }),
            (g.refresh = function (M, I, A, z) {
              if (!((qe || !g.enabled) && !I)) {
                if (c && M && Mt) {
                  Ae(s, "scrollEnd", Zu);
                  return;
                }
                !at && ie && ie(g),
                  (qe = g),
                  Qe.tween && !A && (Qe.tween.kill(), (Qe.tween = 0)),
                  X && X.pause(),
                  p && i && i.revert({ kill: !1 }).invalidate(),
                  g.isReverted || g.revert(!0, !0),
                  (g._subPinOffset = !1);
                var Ee = $e(),
                  G = Dt(),
                  ye = x ? x.duration() : Zt(E, k),
                  Ye = we <= 0.01,
                  he = 0,
                  se = z || 0,
                  J = Kr(A) ? A.end : t.end,
                  Nt = t.endTrigger || d,
                  ae = Kr(A)
                    ? A.start
                    : t.start || (t.start === 0 || !d ? 0 : c ? "0 0" : "0 100%"),
                  mt = (g.pinnedContainer = t.pinnedContainer && nt(t.pinnedContainer, g)),
                  Wt = (d && Math.max(0, W.indexOf(g))) || 0,
                  Fe = Wt,
                  Le,
                  Ve,
                  Rr,
                  _n,
                  We,
                  Ce,
                  Xt,
                  fs,
                  No,
                  Di,
                  Ut,
                  Ai,
                  gn;
                for (
                  K && Kr(A) && ((Ai = D.getProperty(v, k.p)), (gn = D.getProperty(gt, k.p)));
                  Fe--;

                )
                  (Ce = W[Fe]),
                    Ce.end || Ce.refresh(0, 1) || (qe = g),
                    (Xt = Ce.pin),
                    Xt &&
                      (Xt === d || Xt === c || Xt === mt) &&
                      !Ce.isReverted &&
                      (Di || (Di = []), Di.unshift(Ce), Ce.revert(!0, !0)),
                    Ce !== W[Fe] && (Wt--, Fe--);
                for (
                  ut(ae) && (ae = ae(g)),
                    ae = Cu(ae, "start", g),
                    Q =
                      Fu(
                        ae,
                        d,
                        Ee,
                        k,
                        xe(),
                        lt,
                        v,
                        g,
                        G,
                        re,
                        $,
                        ye,
                        x,
                        g._startClamp && "_startClamp"
                      ) || (c ? -0.001 : 0),
                    ut(J) && (J = J(g)),
                    bt(J) &&
                      !J.indexOf("+=") &&
                      (~J.indexOf(" ")
                        ? (J = (bt(ae) ? ae.split(" ")[0] : "") + J)
                        : ((he = es(J.substr(2), Ee)),
                          (J = bt(ae)
                            ? ae
                            : (x
                                ? D.utils.mapRange(
                                    0,
                                    x.duration(),
                                    x.scrollTrigger.start,
                                    x.scrollTrigger.end,
                                    Q
                                  )
                                : Q) + he),
                          (Nt = d))),
                    J = Cu(J, "end", g),
                    ge =
                      Math.max(
                        Q,
                        Fu(
                          J || (Nt ? "100% 0" : ye),
                          Nt,
                          Ee,
                          k,
                          xe() + he,
                          _t,
                          gt,
                          g,
                          G,
                          re,
                          $,
                          ye,
                          x,
                          g._endClamp && "_endClamp"
                        )
                      ) || -0.001,
                    he = 0,
                    Fe = Wt;
                  Fe--;

                )
                  (Ce = W[Fe]),
                    (Xt = Ce.pin),
                    Xt &&
                      Ce.start - Ce._pinPush <= Q &&
                      !x &&
                      Ce.end > 0 &&
                      ((Le = Ce.end - (g._startClamp ? Math.max(0, Ce.start) : Ce.start)),
                      ((Xt === d && Ce.start - Ce._pinPush < Q) || Xt === mt) &&
                        isNaN(ae) &&
                        (he += Le * (1 - Ce.progress)),
                      Xt === c && (se += Le));
                if (
                  ((Q += he),
                  (ge += he),
                  g._startClamp && (g._startClamp += he),
                  g._endClamp &&
                    !at &&
                    ((g._endClamp = ge || -0.001), (ge = Math.min(ge, Zt(E, k)))),
                  (we = ge - Q || ((Q -= 0.01) && 0.001)),
                  Ye && (Ke = D.utils.clamp(0, 1, D.utils.normalize(Q, ge, zt))),
                  (g._pinPush = se),
                  lt &&
                    he &&
                    ((Le = {}),
                    (Le[k.a] = "+=" + he),
                    mt && (Le[k.p] = "-=" + xe()),
                    D.set([lt, _t], Le)),
                  c && !(Po && g.end >= Zt(E, k)))
                )
                  (Le = Et(c)),
                    (_n = k === Te),
                    (Rr = xe()),
                    (Tt = parseFloat(me(k.a)) + se),
                    !ye &&
                      ge > 1 &&
                      ((Ut = (B ? fe.scrollingElement || Vt : E).style),
                      (Ut = { style: Ut, value: Ut["overflow" + k.a.toUpperCase()] }),
                      B &&
                        Et(ne)["overflow" + k.a.toUpperCase()] !== "scroll" &&
                        (Ut.style["overflow" + k.a.toUpperCase()] = "scroll")),
                    wo(c, Oe, Le),
                    (ni = Qn(c)),
                    (Ve = fr(c, !0)),
                    (fs = $ && ur(E, _n ? Ge : Te)()),
                    _
                      ? ((be = [_ + k.os2, we + se + ke]),
                        (be.t = Oe),
                        (Fe = _ === Se ? as(c, k) + we + se : 0),
                        Fe &&
                          (be.push(k.d, Fe + ke),
                          Oe.style.flexBasis !== "auto" && (Oe.style.flexBasis = Fe + ke)),
                        ki(be),
                        mt &&
                          W.forEach(function (Ri) {
                            Ri.pin === mt && Ri.vars.pinSpacing !== !1 && (Ri._subPinOffset = !0);
                          }),
                        $ && xe(zt))
                      : ((Fe = as(c, k)),
                        Fe && Oe.style.flexBasis !== "auto" && (Oe.style.flexBasis = Fe + ke)),
                    $ &&
                      ((We = {
                        top: Ve.top + (_n ? Rr - Q : fs) + ke,
                        left: Ve.left + (_n ? fs : Rr - Q) + ke,
                        boxSizing: "border-box",
                        position: "fixed",
                      }),
                      (We[Zr] = We["max" + Oi] = Math.ceil(Ve.width) + ke),
                      (We[Jr] = We["max" + Fo] = Math.ceil(Ve.height) + ke),
                      (We[Ot] = We[Ot + ln] = We[Ot + an] = We[Ot + fn] = We[Ot + un] = "0"),
                      (We[Se] = Le[Se]),
                      (We[Se + ln] = Le[Se + ln]),
                      (We[Se + an] = Le[Se + an]),
                      (We[Se + fn] = Le[Se + fn]),
                      (We[Se + un] = Le[Se + un]),
                      (Er = Lc(dr, We, w)),
                      at && xe(0)),
                    i
                      ? ((No = i._initted),
                        go(1),
                        i.render(i.duration(), !0, !0),
                        (er = me(k.a) - Tt + we + se),
                        (gr = Math.abs(we - er) > 1),
                        $ && gr && Er.splice(Er.length - 2, 2),
                        i.render(0, !0, !0),
                        No || i.invalidate(!0),
                        i.parent || i.totalTime(i.totalTime()),
                        go(0))
                      : (er = we),
                    Ut &&
                      (Ut.value
                        ? (Ut.style["overflow" + k.a.toUpperCase()] = Ut.value)
                        : Ut.style.removeProperty("overflow-" + k.a));
                else if (d && xe() && !x)
                  for (Ve = d.parentNode; Ve && Ve !== ne; )
                    Ve._pinOffset && ((Q -= Ve._pinOffset), (ge -= Ve._pinOffset)),
                      (Ve = Ve.parentNode);
                Di &&
                  Di.forEach(function (Ri) {
                    return Ri.revert(!1, !0);
                  }),
                  (g.start = Q),
                  (g.end = ge),
                  (Ze = At = at ? zt : xe()),
                  !x && !at && (Ze < zt && xe(zt), (g.scroll.rec = 0)),
                  g.revert(!1, !0),
                  (Re = je()),
                  Lt && ((ce = -1), Lt.restart(!0)),
                  (qe = 0),
                  i &&
                    F &&
                    (i._initted || Ar) &&
                    i.progress() !== Ar &&
                    i.progress(Ar || 0, !0).render(i.time(), !0, !0),
                  (Ye || Ke !== g.progress || x || p) &&
                    (i &&
                      !F &&
                      i.totalProgress(
                        x && Q < -0.001 && !Ke ? D.utils.normalize(Q, ge, 0) : Ke,
                        !0
                      ),
                    (g.progress = Ye || (Ze - Q) / we === Ke ? 0 : Ke)),
                  c && _ && (Oe._pinOffset = Math.round(g.progress * er)),
                  X && X.invalidate(),
                  isNaN(Ai) ||
                    ((Ai -= D.getProperty(v, k.p)),
                    (gn -= D.getProperty(gt, k.p)),
                    Zn(v, k, Ai),
                    Zn(lt, k, Ai - (z || 0)),
                    Zn(gt, k, gn),
                    Zn(_t, k, gn - (z || 0))),
                  Ye && !at && g.update(),
                  f && !at && !pr && ((pr = !0), f(g), (pr = !1));
              }
            }),
            (g.getVelocity = function () {
              return ((xe() - At) / (je() - en)) * 1e3 || 0;
            }),
            (g.endAnimation = function () {
              Ji(g.callbackAnimation),
                i &&
                  (X
                    ? X.progress(1)
                    : i.paused()
                      ? F || Ji(i, g.direction < 0, 1)
                      : Ji(i, i.reversed()));
            }),
            (g.labelToScroll = function (M) {
              return (
                (i && i.labels && (Q || g.refresh() || Q) + (i.labels[M] / i.duration()) * we) || 0
              );
            }),
            (g.getTrailing = function (M) {
              var I = W.indexOf(g),
                A = g.direction > 0 ? W.slice(0, I).reverse() : W.slice(I + 1);
              return (
                bt(M)
                  ? A.filter(function (z) {
                      return z.vars.preventOverlaps === M;
                    })
                  : A
              ).filter(function (z) {
                return g.direction > 0 ? z.end <= Q : z.start >= ge;
              });
            }),
            (g.update = function (M, I, A) {
              if (!(x && !A && !M)) {
                var z = at === !0 ? zt : g.scroll(),
                  Ee = M ? 0 : (z - Q) / we,
                  G = Ee < 0 ? 0 : Ee > 1 ? 1 : Ee || 0,
                  ye = g.progress,
                  Ye,
                  he,
                  se,
                  J,
                  Nt,
                  ae,
                  mt,
                  Wt;
                if (
                  (I &&
                    ((At = Ze),
                    (Ze = x ? xe() : z),
                    y && ((Mr = mr), (mr = i && !F ? i.totalProgress() : G))),
                  m &&
                    c &&
                    !qe &&
                    !Hn &&
                    Mt &&
                    (!G && Q < z + ((z - At) / (je() - en)) * m
                      ? (G = 1e-4)
                      : G === 1 && ge > z + ((z - At) / (je() - en)) * m && (G = 0.9999)),
                  G !== ye && g.enabled)
                ) {
                  if (
                    ((Ye = g.isActive = !!G && G < 1),
                    (he = !!ye && ye < 1),
                    (ae = Ye !== he),
                    (Nt = ae || !!G != !!ye),
                    (g.direction = G > ye ? 1 : -1),
                    (g.progress = G),
                    Nt &&
                      !qe &&
                      ((se = G && !ye ? 0 : G === 1 ? 1 : ye === 1 ? 2 : 3),
                      F &&
                        ((J = (!ae && L[se + 1] !== "none" && L[se + 1]) || L[se]),
                        (Wt = i && (J === "complete" || J === "reset" || J in i)))),
                    C &&
                      (ae || Wt) &&
                      (Wt || h || !i) &&
                      (ut(C)
                        ? C(g)
                        : g.getTrailing(C).forEach(function (Rr) {
                            return Rr.endAnimation();
                          })),
                    F ||
                      (X && !qe && !Hn
                        ? (X._dp._time - X._start !== X._time && X.render(X._dp._time - X._start),
                          X.resetTo
                            ? X.resetTo("totalProgress", G, i._tTime / i._tDur)
                            : ((X.vars.totalProgress = G), X.invalidate().restart()))
                        : i && i.totalProgress(G, !!(qe && (Re || M)))),
                    c)
                  ) {
                    if ((M && _ && (Oe.style[_ + k.os2] = Ei), !$)) Rt(rn(Tt + er * G));
                    else if (Nt) {
                      if (((mt = !M && G > ye && ge + 1 > z && z + 1 >= Zt(E, k)), w))
                        if (!M && (Ye || mt)) {
                          var Fe = fr(c, !0),
                            Le = z - Q;
                          Lu(
                            c,
                            ne,
                            Fe.top + (k === Te ? Le : 0) + ke,
                            Fe.left + (k === Te ? 0 : Le) + ke
                          );
                        } else Lu(c, Oe);
                      ki(Ye || mt ? Er : ni),
                        (gr && G < 1 && Ye) || Rt(Tt + (G === 1 && !mt ? er : 0));
                    }
                  }
                  y && !Qe.tween && !qe && !Hn && Lt.restart(!0),
                    a &&
                      (ae || (P && G && (G < 1 || !mo))) &&
                      hn(a.targets).forEach(function (Rr) {
                        return Rr.classList[Ye || P ? "add" : "remove"](a.className);
                      }),
                    o && !F && !M && o(g),
                    Nt && !qe
                      ? (F &&
                          (Wt &&
                            (J === "complete"
                              ? i.pause().totalProgress(1)
                              : J === "reset"
                                ? i.restart(!0).pause()
                                : J === "restart"
                                  ? i.restart(!0)
                                  : i[J]()),
                          o && o(g)),
                        (ae || !mo) &&
                          (l && ae && vo(g, l),
                          H[se] && vo(g, H[se]),
                          P && (G === 1 ? g.kill(!1, 1) : (H[se] = 0)),
                          ae || ((se = G === 1 ? 1 : 3), H[se] && vo(g, H[se]))),
                        O &&
                          !Ye &&
                          Math.abs(g.getVelocity()) > (nn(O) ? O : 2500) &&
                          (Ji(g.callbackAnimation),
                          X ? X.progress(1) : Ji(i, J === "reverse" ? 1 : !G, 1)))
                      : F && o && !qe && o(g);
                }
                if (si) {
                  var Ve = x ? (z / x.duration()) * (x._caScrollDist || 0) : z;
                  dn(Ve + (v._isFlipped ? 1 : 0)), si(Ve);
                }
                ai && ai((-z / x.duration()) * (x._caScrollDist || 0));
              }
            }),
            (g.enable = function (M, I) {
              g.enabled ||
                ((g.enabled = !0),
                Ae(E, "resize", sn),
                B || Ae(E, "scroll", Ti),
                ie && Ae(s, "refreshInit", ie),
                M !== !1 && ((g.progress = Ke = 0), (Ze = At = ce = xe())),
                I !== !1 && g.refresh());
            }),
            (g.getTween = function (M) {
              return M && Qe ? Qe.tween : X;
            }),
            (g.setPositions = function (M, I, A, z) {
              if (x) {
                var Ee = x.scrollTrigger,
                  G = x.duration(),
                  ye = Ee.end - Ee.start;
                (M = Ee.start + (ye * M) / G), (I = Ee.start + (ye * I) / G);
              }
              g.refresh(
                !1,
                !1,
                { start: Pu(M, A && !!g._startClamp), end: Pu(I, A && !!g._endClamp) },
                z
              ),
                g.update();
            }),
            (g.adjustPinSpacing = function (M) {
              if (be && M) {
                var I = be.indexOf(k.d) + 1;
                (be[I] = parseFloat(be[I]) + M + ke), (be[1] = parseFloat(be[1]) + M + ke), ki(be);
              }
            }),
            (g.disable = function (M, I) {
              if (
                g.enabled &&
                (M !== !1 && g.revert(!0, !0),
                (g.enabled = g.isActive = !1),
                I || (X && X.pause()),
                (zt = 0),
                Be && (Be.uncache = 1),
                ie && De(s, "refreshInit", ie),
                Lt && (Lt.pause(), Qe.tween && Qe.tween.kill() && (Qe.tween = 0)),
                !B)
              ) {
                for (var A = W.length; A--; ) if (W[A].scroller === E && W[A] !== g) return;
                De(E, "resize", sn), B || De(E, "scroll", Ti);
              }
            }),
            (g.kill = function (M, I) {
              g.disable(M, I), X && !I && X.kill(), u && delete ko[u];
              var A = W.indexOf(g);
              A >= 0 && W.splice(A, 1),
                A === ot && rs > 0 && ot--,
                (A = 0),
                W.forEach(function (z) {
                  return z.scroller === g.scroller && (A = 1);
                }),
                A || at || (g.scroll.rec = 0),
                i && ((i.scrollTrigger = null), M && i.revert({ kill: !1 }), I || i.kill()),
                lt &&
                  [lt, _t, v, gt].forEach(function (z) {
                    return z.parentNode && z.parentNode.removeChild(z);
                  }),
                cn === g && (cn = 0),
                c &&
                  (Be && (Be.uncache = 1),
                  (A = 0),
                  W.forEach(function (z) {
                    return z.pin === c && A++;
                  }),
                  A || (Be.spacer = 0)),
                t.onKill && t.onKill(g);
            }),
            W.push(g),
            g.enable(!1, !1),
            tr && tr(g),
            i && i.add && !we)
          ) {
            var Z = g.update;
            (g.update = function () {
              (g.update = Z), Q || ge || g.refresh();
            }),
              D.delayedCall(0.01, g.update),
              (we = 0.01),
              (Q = ge = 0);
          } else g.refresh();
          c && Ac();
        }),
        (s.register = function (t) {
          return Si || ((D = t || Gu()), Hu() && window.document && s.enable(), (Si = tn)), Si;
        }),
        (s.defaults = function (t) {
          if (t) for (var i in t) $n[i] = t[i];
          return $n;
        }),
        (s.disable = function (t, i) {
          (tn = 0),
            W.forEach(function (o) {
              return o[i ? "kill" : "disable"](t);
            }),
            De(j, "wheel", Ti),
            De(fe, "scroll", Ti),
            clearInterval(Un),
            De(fe, "touchcancel", Qt),
            De(ne, "touchstart", Qt),
            qn(De, fe, "pointerdown,touchstart,mousedown", ku),
            qn(De, fe, "pointerup,touchend,mouseup", Ou),
            ss.kill(),
            Gn(De);
          for (var n = 0; n < V.length; n += 3) jn(De, V[n], V[n + 1]), jn(De, V[n], V[n + 2]);
        }),
        (s.enable = function () {
          if (
            ((j = window),
            (fe = document),
            (Vt = fe.documentElement),
            (ne = fe.body),
            D &&
              ((hn = D.utils.toArray),
              (on = D.utils.clamp),
              (Co = D.core.context || Qt),
              (go = D.core.suppressOverwrites || Qt),
              (Mo = j.history.scrollRestoration || "auto"),
              (Oo = j.pageYOffset),
              D.core.globals("ScrollTrigger", s),
              ne))
          ) {
            (tn = 1),
              (Pi = document.createElement("div")),
              (Pi.style.height = "100vh"),
              (Pi.style.position = "absolute"),
              tl(),
              Cc(),
              _e.register(D),
              (s.isTouch = _e.isTouch),
              (Or = _e.isTouch && /(iPad|iPhone|iPod|Mac)/g.test(navigator.userAgent)),
              (So = _e.isTouch === 1),
              Ae(j, "wheel", Ti),
              (Yu = [j, fe, Vt, ne]),
              D.matchMedia
                ? ((s.matchMedia = function (u) {
                    var l = D.matchMedia(),
                      f;
                    for (f in u) l.add(f, u[f]);
                    return l;
                  }),
                  D.addEventListener("matchMediaInit", function () {
                    return zo();
                  }),
                  D.addEventListener("matchMediaRevert", function () {
                    return Ju();
                  }),
                  D.addEventListener("matchMedia", function () {
                    Qr(0, 1), ii("matchMedia");
                  }),
                  D.matchMedia("(orientation: portrait)", function () {
                    return xo(), xo;
                  }))
                : console.warn("Requires GSAP 3.11.0 or later"),
              xo(),
              Ae(fe, "scroll", Ti);
            var t = ne.style,
              i = t.borderTopStyle,
              n = D.core.Animation.prototype,
              o,
              a;
            for (
              n.revert ||
                Object.defineProperty(n, "revert", {
                  value: function () {
                    return this.time(-0.01, !0);
                  },
                }),
                t.borderTopStyle = "solid",
                o = fr(ne),
                Te.m = Math.round(o.top + Te.sc()) || 0,
                Ge.m = Math.round(o.left + Ge.sc()) || 0,
                i ? (t.borderTopStyle = i) : t.removeProperty("border-top-style"),
                Un = setInterval(Du, 250),
                D.delayedCall(0.5, function () {
                  return (Hn = 0);
                }),
                Ae(fe, "touchcancel", Qt),
                Ae(ne, "touchstart", Qt),
                qn(Ae, fe, "pointerdown,touchstart,mousedown", ku),
                qn(Ae, fe, "pointerup,touchend,mouseup", Ou),
                To = D.utils.checkPrefix("transform"),
                is.push(To),
                Si = je(),
                ss = D.delayedCall(0.2, Qr).pause(),
                Ci = [
                  fe,
                  "visibilitychange",
                  function () {
                    var u = j.innerWidth,
                      l = j.innerHeight;
                    fe.hidden ? ((Tu = u), (Su = l)) : (Tu !== u || Su !== l) && sn();
                  },
                  fe,
                  "DOMContentLoaded",
                  Qr,
                  j,
                  "load",
                  Qr,
                  j,
                  "resize",
                  sn,
                ],
                Gn(Ae),
                W.forEach(function (u) {
                  return u.enable(0, 1);
                }),
                a = 0;
              a < V.length;
              a += 3
            )
              jn(De, V[a], V[a + 1]), jn(De, V[a], V[a + 2]);
          }
        }),
        (s.config = function (t) {
          "limitCallbacks" in t && (mo = !!t.limitCallbacks);
          var i = t.syncInterval;
          (i && clearInterval(Un)) || ((Un = i) && setInterval(Du, i)),
            "ignoreMobileResize" in t && (So = s.isTouch === 1 && t.ignoreMobileResize),
            "autoRefreshEvents" in t &&
              (Gn(De) || Gn(Ae, t.autoRefreshEvents || "none"),
              (Wu = (t.autoRefreshEvents + "").indexOf("resize") === -1));
        }),
        (s.scrollerProxy = function (t, i) {
          var n = nt(t),
            o = V.indexOf(n),
            a = ti(n);
          ~o && V.splice(o, a ? 6 : 2),
            i && (a ? Yt.unshift(j, i, ne, i, Vt, i) : Yt.unshift(n, i));
        }),
        (s.clearMatchMedia = function (t) {
          W.forEach(function (i) {
            return i._ctx && i._ctx.query === t && i._ctx.kill(!0, !0);
          });
        }),
        (s.isInViewport = function (t, i, n) {
          var o = (bt(t) ? nt(t) : t).getBoundingClientRect(),
            a = o[n ? Zr : Jr] * i || 0;
          return n
            ? o.right - a > 0 && o.left + a < j.innerWidth
            : o.bottom - a > 0 && o.top + a < j.innerHeight;
        }),
        (s.positionInViewport = function (t, i, n) {
          bt(t) && (t = nt(t));
          var o = t.getBoundingClientRect(),
            a = o[n ? Zr : Jr],
            u =
              i == null
                ? a / 2
                : i in us
                  ? us[i] * a
                  : ~i.indexOf("%")
                    ? (parseFloat(i) * a) / 100
                    : parseFloat(i) || 0;
          return n ? (o.left + u) / j.innerWidth : (o.top + u) / j.innerHeight;
        }),
        (s.killAll = function (t) {
          if (
            (W.slice(0).forEach(function (n) {
              return n.vars.id !== "ScrollSmoother" && n.kill();
            }),
            t !== !0)
          ) {
            var i = ri.killAll || [];
            (ri = {}),
              i.forEach(function (n) {
                return n();
              });
          }
        }),
        s
      );
    })();
  U.version = "3.12.5";
  U.saveStyles = function (s) {
    return s
      ? hn(s).forEach(function (e) {
          if (e && e.style) {
            var r = wt.indexOf(e);
            r >= 0 && wt.splice(r, 5),
              wt.push(
                e,
                e.style.cssText,
                e.getBBox && e.getAttribute("transform"),
                D.core.getCache(e),
                Co()
              );
          }
        })
      : wt;
  };
  U.revert = function (s, e) {
    return zo(!s, e);
  };
  U.create = function (s, e) {
    return new U(s, e);
  };
  U.refresh = function (s) {
    return s ? sn() : (Si || U.register()) && Qr(!0);
  };
  U.update = function (s) {
    return ++V.cache && cr(s === !0 ? 2 : 0);
  };
  U.clearScrollMemory = el;
  U.maxScroll = function (s, e) {
    return Zt(s, e ? Ge : Te);
  };
  U.getScrollFunc = function (s, e) {
    return ur(nt(s), e ? Ge : Te);
  };
  U.getById = function (s) {
    return ko[s];
  };
  U.getAll = function () {
    return W.filter(function (s) {
      return s.vars.id !== "ScrollSmoother";
    });
  };
  U.isScrolling = function () {
    return !!Mt;
  };
  U.snapDirectional = Lo;
  U.addEventListener = function (s, e) {
    var r = ri[s] || (ri[s] = []);
    ~r.indexOf(e) || r.push(e);
  };
  U.removeEventListener = function (s, e) {
    var r = ri[s],
      t = r && r.indexOf(e);
    t >= 0 && r.splice(t, 1);
  };
  U.batch = function (s, e) {
    var r = [],
      t = {},
      i = e.interval || 0.016,
      n = e.batchMax || 1e9,
      o = function (l, f) {
        var h = [],
          d = [],
          c = D.delayedCall(i, function () {
            f(h, d), (h = []), (d = []);
          }).pause();
        return function (_) {
          h.length || c.restart(!0), h.push(_.trigger), d.push(_), n <= h.length && c.progress(1);
        };
      },
      a;
    for (a in e)
      t[a] = a.substr(0, 2) === "on" && ut(e[a]) && a !== "onRefreshInit" ? o(a, e[a]) : e[a];
    return (
      ut(n) &&
        ((n = n()),
        Ae(U, "refresh", function () {
          return (n = e.batchMax());
        })),
      hn(s).forEach(function (u) {
        var l = {};
        for (a in t) l[a] = t[a];
        (l.trigger = u), r.push(U.create(l));
      }),
      r
    );
  };
  var Nu = function (e, r, t, i) {
      return r > i ? e(i) : r < 0 && e(0), t > i ? (i - r) / (t - r) : t < 0 ? r / (r - t) : 1;
    },
    bo = function s(e, r) {
      r === !0
        ? e.style.removeProperty("touch-action")
        : (e.style.touchAction =
            r === !0 ? "auto" : r ? "pan-" + r + (_e.isTouch ? " pinch-zoom" : "") : "none"),
        e === Vt && s(ne, r);
    },
    Jn = { auto: 1, scroll: 1 },
    Nc = function (e) {
      var r = e.event,
        t = e.target,
        i = e.axis,
        n = (r.changedTouches ? r.changedTouches[0] : r).target,
        o = n._gsap || D.core.getCache(n),
        a = je(),
        u;
      if (!o._isScrollT || a - o._isScrollT > 2e3) {
        for (
          ;
          n &&
          n !== ne &&
          ((n.scrollHeight <= n.clientHeight && n.scrollWidth <= n.clientWidth) ||
            !(Jn[(u = Et(n)).overflowY] || Jn[u.overflowX]));

        )
          n = n.parentNode;
        (o._isScroll = n && n !== t && !ti(n) && (Jn[(u = Et(n)).overflowY] || Jn[u.overflowX])),
          (o._isScrollT = a);
      }
      (o._isScroll || i === "x") && (r.stopPropagation(), (r._gsapAllow = !0));
    },
    il = function (e, r, t, i) {
      return _e.create({
        target: e,
        capture: !0,
        debounce: !1,
        lockAxis: !0,
        type: r,
        onWheel: (i = i && Nc),
        onPress: i,
        onDrag: i,
        onScroll: i,
        onEnable: function () {
          return t && Ae(fe, _e.eventTypes[0], Bu, !1, !0);
        },
        onDisable: function () {
          return De(fe, _e.eventTypes[0], Bu, !0);
        },
      });
    },
    Ic = /(input|label|select|textarea)/i,
    Iu,
    Bu = function (e) {
      var r = Ic.test(e.target.tagName);
      (r || Iu) && ((e._gsapAllow = !0), (Iu = r));
    },
    Bc = function (e) {
      Kr(e) || (e = {}),
        (e.preventDefault = e.isNormalizer = e.allowClicks = !0),
        e.type || (e.type = "wheel,touch"),
        (e.debounce = !!e.debounce),
        (e.id = e.id || "normalizer");
      var r = e,
        t = r.normalizeScrollX,
        i = r.momentum,
        n = r.allowNestedScroll,
        o = r.onRelease,
        a,
        u,
        l = nt(e.target) || Vt,
        f = D.core.globals().ScrollSmoother,
        h = f && f.get(),
        d =
          Or &&
          ((e.content && nt(e.content)) || (h && e.content !== !1 && !h.smooth() && h.content())),
        c = ur(l, Te),
        _ = ur(l, Ge),
        p = 1,
        m =
          (_e.isTouch && j.visualViewport
            ? j.visualViewport.scale * j.visualViewport.width
            : j.outerWidth) / j.innerWidth,
        T = 0,
        b = ut(i)
          ? function () {
              return i(a);
            }
          : function () {
              return i || 2.8;
            },
        P,
        y,
        w = il(l, e.type, !0, n),
        S = function () {
          return (y = !1);
        },
        x = Qt,
        O = Qt,
        C = function () {
          (u = Zt(l, Te)), (O = on(Or ? 1 : 0, u)), t && (x = on(0, Zt(l, Ge))), (P = ei);
        },
        k = function () {
          (d._gsap.y = rn(parseFloat(d._gsap.y) + c.offset) + "px"),
            (d.style.transform =
              "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, " +
              parseFloat(d._gsap.y) +
              ", 0, 1)"),
            (c.offset = c.cacheID = 0);
        },
        F = function () {
          if (y) {
            requestAnimationFrame(S);
            var K = rn(a.deltaY / 2),
              re = O(c.v - K);
            if (d && re !== c.v + c.offset) {
              c.offset = re - c.v;
              var g = rn((parseFloat(d && d._gsap.y) || 0) - c.offset);
              (d.style.transform =
                "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, " + g + ", 0, 1)"),
                (d._gsap.y = g + "px"),
                (c.cacheID = V.cache),
                cr();
            }
            return !0;
          }
          c.offset && k(), (y = !0);
        },
        E,
        Y,
        B,
        $,
        H = function () {
          C(),
            E.isActive() &&
              E.vars.scrollY > u &&
              (c() > u ? E.progress(1) && c(u) : E.resetTo("scrollY", u));
        };
      return (
        d && D.set(d, { y: "+=0" }),
        (e.ignoreCheck = function (L) {
          return (
            (Or && L.type === "touchmove" && F(L)) ||
            (p > 1.05 && L.type !== "touchstart") ||
            a.isGesturing ||
            (L.touches && L.touches.length > 1)
          );
        }),
        (e.onPress = function () {
          y = !1;
          var L = p;
          (p = rn(((j.visualViewport && j.visualViewport.scale) || 1) / m)),
            E.pause(),
            L !== p && bo(l, p > 1.01 ? !0 : t ? !1 : "x"),
            (Y = _()),
            (B = c()),
            C(),
            (P = ei);
        }),
        (e.onRelease = e.onGestureStart =
          function (L, K) {
            if ((c.offset && k(), !K)) $.restart(!0);
            else {
              V.cache++;
              var re = b(),
                g,
                ie;
              t &&
                ((g = _()),
                (ie = g + (re * 0.05 * -L.velocityX) / 0.227),
                (re *= Nu(_, g, ie, Zt(l, Ge))),
                (E.vars.scrollX = x(ie))),
                (g = c()),
                (ie = g + (re * 0.05 * -L.velocityY) / 0.227),
                (re *= Nu(c, g, ie, Zt(l, Te))),
                (E.vars.scrollY = O(ie)),
                E.invalidate().duration(re).play(0.01),
                ((Or && E.vars.scrollY >= u) || g >= u - 1) &&
                  D.to({}, { onUpdate: H, duration: re });
            }
            o && o(L);
          }),
        (e.onWheel = function () {
          E._ts && E.pause(), je() - T > 1e3 && ((P = 0), (T = je()));
        }),
        (e.onChange = function (L, K, re, g, ie) {
          if (
            (ei !== P && C(),
            K && t && _(x(g[2] === K ? Y + (L.startX - L.x) : _() + K - g[1])),
            re)
          ) {
            c.offset && k();
            var $e = ie[2] === re,
              Dt = $e ? B + L.startY - L.y : c() + re - ie[1],
              ce = O(Dt);
            $e && Dt !== ce && (B += ce - Dt), c(ce);
          }
          (re || K) && cr();
        }),
        (e.onEnable = function () {
          bo(l, t ? !1 : "x"),
            U.addEventListener("refresh", H),
            Ae(j, "resize", H),
            c.smooth && ((c.target.style.scrollBehavior = "auto"), (c.smooth = _.smooth = !1)),
            w.enable();
        }),
        (e.onDisable = function () {
          bo(l, !0), De(j, "resize", H), U.removeEventListener("refresh", H), w.kill();
        }),
        (e.lockAxis = e.lockAxis !== !1),
        (a = new _e(e)),
        (a.iOS = Or),
        Or && !c() && c(1),
        Or && D.ticker.add(Qt),
        ($ = a._dc),
        (E = D.to(a, {
          ease: "power4",
          paused: !0,
          inherit: !1,
          scrollX: t ? "+=0.1" : "+=0",
          scrollY: "+=0.1",
          modifiers: {
            scrollY: rl(c, c(), function () {
              return E.pause();
            }),
          },
          onUpdate: cr,
          onComplete: $.vars.onComplete,
        })),
        a
      );
    };
  U.sort = function (s) {
    return W.sort(
      s ||
        function (e, r) {
          return (
            (e.vars.refreshPriority || 0) * -1e6 +
            e.start -
            (r.start + (r.vars.refreshPriority || 0) * -1e6)
          );
        }
    );
  };
  U.observe = function (s) {
    return new _e(s);
  };
  U.normalizeScroll = function (s) {
    if (typeof s > "u") return st;
    if (s === !0 && st) return st.enable();
    if (s === !1) {
      st && st.kill(), (st = s);
      return;
    }
    var e = s instanceof _e ? s : Bc(s);
    return st && st.target === e.target && st.kill(), ti(e.target) && (st = e), e;
  };
  U.core = {
    _getVelocityProp: Xn,
    _inputObserver: il,
    _scrollers: V,
    _proxies: Yt,
    bridge: {
      ss: function () {
        Mt || ii("scrollStart"), (Mt = je());
      },
      ref: function () {
        return qe;
      },
    },
  };
  Gu() && D.registerPlugin(U);
  ji.registerPlugin(U);
  var nl = (s, e) => {
    let {
        animationType: r,
        delay: t,
        duration: i,
        easing: n,
        revealType: o,
        staggerDelay: a,
        shouldMask: u,
      } = s.dataset,
      l = xn(r, "Animation type not found or invalid!", (m) => m !== void 0 && oa.has(m)),
      f = li(o, e?.revealType ?? "chars", (m) => m !== void 0 && sa.has(m)),
      h = li(n, e?.easing ?? "powe3.out", (m) => m !== void 0 && aa.has(m)),
      d = li(Number.parseFloat(t || ""), e?.delay ?? 0),
      c = li(Number.parseFloat(i || ""), e?.duration ?? 0.5),
      _ = li(Number.parseFloat(a || ""), e?.staggerDelay ?? 0.05);
    return {
      animationType: l,
      revealType: f,
      delay: d,
      duration: c,
      easing: h,
      staggerDelay: _,
      shouldMask: u !== void 0 && u !== "false",
    };
  };
  var sl = document.querySelectorAll(wn.revealType);
  for (let s = 0; s < sl.length; s++) {
    let e = xn(sl[s], `${wn.revealType} not found!`),
      r = e.closest(wn.revealParent),
      {
        animationType: t,
        delay: i,
        duration: n,
        easing: o,
        revealType: a,
        staggerDelay: u,
      } = nl(e),
      l = na.create(e),
      f = (a === "lines" ? l.lines : a === "words" ? l.words : l.chars) || [];
    if (a === "lines") {
      let d = [];
      for (let c = 0; c < f.length; c++) {
        let _ = f[c],
          p = document.createElement("div"),
          m = _.cloneNode(!0);
        p.classList.add("line-parent"), p.appendChild(m), _.replaceWith(p), d.push(m);
      }
      f = d;
    }
    let h = {
      delay: i,
      stagger: u,
      ease: o,
      duration: n,
      scrollTrigger: { trigger: r || e, start: "top center" },
    };
    t === "from-bottom" && (h = { ...h, yPercent: 100 }),
      t === "from-top" && (h = { ...h, yPercent: -100 }),
      t === "fade-from-bottom-left" && (h = { ...h, yPercent: 30, x: -50, opacity: 0.05 }),
      ji.from(f, h);
  }
})();
/*! Bundled license information:

gsap/gsap-core.js:
  (*!
   * GSAP 3.12.5
   * https://gsap.com
   *
   * @license Copyright 2008-2024, GreenSock. All rights reserved.
   * Subject to the terms at https://gsap.com/standard-license or for
   * Club GSAP members, the agreement issued with that membership.
   * @author: Jack Doyle, jack@greensock.com
  *)

gsap/CSSPlugin.js:
  (*!
   * CSSPlugin 3.12.5
   * https://gsap.com
   *
   * Copyright 2008-2024, GreenSock. All rights reserved.
   * Subject to the terms at https://gsap.com/standard-license or for
   * Club GSAP members, the agreement issued with that membership.
   * @author: Jack Doyle, jack@greensock.com
  *)

gsap/Observer.js:
  (*!
   * Observer 3.12.5
   * https://gsap.com
   *
   * @license Copyright 2008-2024, GreenSock. All rights reserved.
   * Subject to the terms at https://gsap.com/standard-license or for
   * Club GSAP members, the agreement issued with that membership.
   * @author: Jack Doyle, jack@greensock.com
  *)

gsap/ScrollTrigger.js:
  (*!
   * ScrollTrigger 3.12.5
   * https://gsap.com
   *
   * @license Copyright 2008-2024, GreenSock. All rights reserved.
   * Subject to the terms at https://gsap.com/standard-license or for
   * Club GSAP members, the agreement issued with that membership.
   * @author: Jack Doyle, jack@greensock.com
  *)
*/
