// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  return newRequire;
})({13:[function(require,module,exports) {
"use strict";

exports.__esModule = true;
var Vector = /** @class */function () {
    function Vector(horizontal, vertical) {
        this.h = horizontal;
        this.v = vertical;
    }
    Object.defineProperty(Vector.prototype, "horizontal", {
        get: function get() {
            return this.h;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vector.prototype, "vertical", {
        get: function get() {
            return this.v;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vector.prototype, "array", {
        get: function get() {
            return [this.h, this.v];
        },
        enumerable: true,
        configurable: true
    });
    Vector.prototype.dist = function (_a) {
        var x2 = _a[0],
            y2 = _a[1];
        var _b = this.array,
            x1 = _b[0],
            y1 = _b[1];
        var xl = x1 - x2;
        var yl = y1 - y2;
        return Math.sqrt(Math.pow(xl, 2) + Math.pow(yl, 2));
    };
    Vector.dist = function (_a, _b) {
        var x1 = _a[0],
            y1 = _a[1];
        var x2 = _b[0],
            y2 = _b[1];
        var xl = x1 + x2;
        var yl = y1 + y2;
        return Math.sqrt(Math.pow(xl, 2) + Math.pow(yl, 2));
    };
    Vector.prototype.add = function (array) {
        this.h += array[0];
        this.v += array[1];
        return this;
    };
    Vector.prototype.scale = function (n) {
        this.h *= n;
        this.v *= n;
        return this;
    };
    Vector.prototype.mult = function (_a) {
        var h = _a[0],
            v = _a[1];
        this.h *= h;
        this.v *= v;
        return this;
    };
    Vector.negV = function (v) {
        return new Vector(-v.horizontal, -v.vertical);
    };
    Vector.negA = function (v) {
        return v.map(function (x) {
            return x * -1;
        });
    };
    Vector.AddA = function () {
        var xs = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            xs[_i] = arguments[_i];
        }
        var a = xs.reduce(function (s, x) {
            return [s[0] + x[0], s[1] + x[1]];
        }, [0, 0]);
        return new Vector(a[0], a[1]);
    };
    return Vector;
}();
exports.Vector = Vector;
},{}],3:[function(require,module,exports) {
"use strict";

exports.__esModule = true;
var vector_1 = require("./vector");
var Particle = /** @class */function () {
    function Particle(position, mass, a0, v0, ctx, added, r) {
        if (added === void 0) {
            added = false;
        }
        if (r === void 0) {
            r = mass;
        }
        this.pos = position;
        this.m = mass;
        this.r = r;
        this.a = a0;
        this.v = v0;
        this.ctx = ctx;
        this.id = (Math.random() * Math.pow(10, 12)).toString(16);
        this.added = added;
    }
    Particle.prototype.applyForce = function (f, dt) {
        var _this = this;
        dt = dt / 1000;
        var a = f.map(function (x) {
            return x / _this.m;
        });
        this.a.add(a);
        var v = this.a.array.map(function (x) {
            return x * dt;
        });
        this.v.add(v);
        this.pos.add(this.v.array.map(function (x) {
            return x * dt;
        }));
    };
    Particle.prototype.update = function (state, dt) {
        var _this = this;
        var abort = false;
        var others = state.particles.filter(function (x) {
            return x.id !== _this.id;
        });
        var Fw = others.reduce(function (f, p) {
            if (abort) return f;
            var _a = Particle.calcForce(_this, p),
                x = _a[0],
                y = _a[1];
            var d = p.pos.dist(_this.pos.array);
            if (d < _this.r + p.r) {
                var mom1 = _this.v.scale(_this.m);
                var mom2 = p.v.scale(p.m);
                var nv = mom1.add(mom2.array).scale(1 / (_this.m + p.m));
                var np = new Particle(_this.pos, _this.m + p.m, new vector_1.Vector(0, 0), new vector_1.Vector(0, 0), _this.ctx, false, Math.sqrt(Math.pow(_this.r, 2) + Math.pow(p.r, 2)));
                console.log(np);
                state.particles.push(np);
                state.particles = state.particles.filter(function (x) {
                    return !(x.id === _this.id || x.id === p.id);
                });
                abort = true;
                return f;
            }
            return [f[0] + x, f[1] + y];
        }, [0, 0]);
        // if(abort) return
        // if(this.added) console.table(Fw)
        this.applyForce(Fw, dt);
        // Wall hit detection
        var hitScalar = 0.8;
        if (this.pos.h + this.r > this.ctx.canvas.width || this.pos.h - this.r < 0) {
            this.v.mult([-hitScalar, hitScalar]);
            this.a.mult([-hitScalar, hitScalar]);
        }
        if (this.pos.v + this.r > this.ctx.canvas.height || this.pos.v - this.r < 0) {
            this.v.mult([hitScalar, -hitScalar]);
            this.a.mult([hitScalar, -hitScalar]);
        }
    };
    Particle.prototype.draw = function (ctx) {
        ctx.beginPath();
        ctx.arc(this.pos.h, this.pos.v, this.r, 0, Math.PI * 2);
        if (this.added) ctx.fillStyle = 'red';else ctx.fillStyle = 'white';
        ctx.fill();
        ctx.closePath();
    };
    Particle.calcDist = function (p1, p2) {
        var s = Math.sign(p1.pos.h - p2.pos.h) * Math.sign(p1.pos.v - p2.pos.v);
        return s * p1.pos.dist(p2.pos.array);
    };
    /**
     * Returns an array of angles [p1, p2]
     */
    Particle.calcAngle = function (p1, p2) {
        var h = Math.abs(p1.pos.h - p2.pos.h);
        var v = Math.abs(p1.pos.v - p2.pos.v);
        return Math.atan(v / h);
    };
    Particle.calcRatio = function (p1, p2) {
        var b = Math.abs(p1.pos.h - p2.pos.h) || 1;
        var a = Math.abs(p1.pos.v - p2.pos.v) || 1;
        return [a / b, b / a];
    };
    /**
     * Returns an array of forces [horizonal, vertical] with which particles work on each other
     * @param p1 {Particle}
     * @param p2 {Particle}
     */
    Particle.calcForce = function (p1, p2) {
        function formula(M, m, r) {
            return G * M * m / Math.pow(r, 2);
        }
        var G = 6.67 * Math.pow(10, -5);
        var d = Particle.calcDist(p1, p2);
        var f = formula(p1.m, p2.m, d);
        var th = Particle.calcAngle(p1, p2);
        return [-Math.sign(p1.pos.h - p2.pos.h) * f * Math.cos(th), -Math.sign(p1.pos.v - p2.pos.v) * f * Math.sin(th)];
    };
    return Particle;
}();
exports.Particle = Particle;
},{"./vector":13}],2:[function(require,module,exports) {
"use strict";

exports.__esModule = true;
var particle_1 = require("./particle");
var vector_1 = require("./vector");
(function () {
    var ctx = document.getElementById('canvas').getContext("2d");
    var state = {
        particles: []
    };
    var fr = 1000 / 60;
    var k = 1;
    var x = 0,
        y = 0;
    function rand(max, min) {
        return Math.random() * (max - min) + min;
    }
    function handleClick(e) {
        state.particles.push(new particle_1.Particle(new vector_1.Vector(e.clientX / k, e.clientY / k), Math.pow(10, 11), new vector_1.Vector(0, 0), new vector_1.Vector(0, 0), ctx, true, 5));
    }
    function handleKey(e) {
        switch (e.keyCode) {
            case 107:
                k = 2;
                break;
            case 109:
                k = 1;
                break;
            case 83:
                console.log(state);
                break;
            default:
                ;
                break;
        }
    }
    function setup() {
        ctx.canvas.width = window.innerWidth;
        ctx.canvas.height = window.innerHeight;
        ctx.canvas.addEventListener('click', handleClick, { passive: true });
        window.addEventListener('keyup', handleKey, { passive: true });
        // ctx.canvas.addEventListener('mousemove', e => {
        //   x = ctx.canvas.width-e.clientX*1.3
        //   y = ctx.canvas.width-e.clientY*1.3
        // })
        var v = 3,
            a = 4;
        for (var i = 0; i < 200; i++) {
            state.particles.push(new particle_1.Particle(new vector_1.Vector(rand(ctx.canvas.width, 1), rand(ctx.canvas.height, 1)), Math.pow(10, 3), new vector_1.Vector(0, 0), new vector_1.Vector(0, 0), ctx, false, 1));
        }
        setTimeout(loop, fr);
    }
    function loop() {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        state.particles.forEach(function (p) {
            ctx.save();
            ctx.translate(x, y);
            ctx.scale(k, k);
            // console.log(particles.length)
            // @ts-ignore
            p.update(state, fr);
            p.draw(ctx);
            ctx.restore();
        });
        setTimeout(loop, fr);
    }
    setup();
})();
},{"./particle":3,"./vector":13}],5:[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';

var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };

  module.bundle.hotData = null;
}

module.bundle.Module = Module;

var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = '' || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + '54349' + '/');
  ws.onmessage = function (event) {
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      console.clear();

      data.assets.forEach(function (asset) {
        hmrApply(global.parcelRequire, asset);
      });

      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          hmrAccept(global.parcelRequire, asset.id);
        }
      });
    }

    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');

      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);

      removeErrorOverlay();

      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;

  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';

  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(+k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAccept(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAccept(bundle.parent, id);
  }

  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);

  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAccept(global.parcelRequire, id);
  });
}
},{}]},{},[5,2], null)
//# sourceMappingURL=/ts.1fb2260f.map