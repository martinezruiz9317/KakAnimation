class KakAnimation {
    selector;
    options;
    elms;
    animations;
    
    loadCoreAnimations(){
      this.animations = {
          fadeInLeft: {
            initStyles: {
              transform: `translateX(-${this.options.distance}px)`,
              opacity: 0,
              // animationFillMode: 'forwards'
            },
            keyframes: [
              // { transform: `translateX(-${this.options.distance}px)` },
              {
                visibility: "visible",
                opacity: 1,
                transform: "translateX(0)",
              },
            ],
          },
          fadeInRight: {
              initStyles: {
                transform: `translateX(${this.options.distance}px)`,
                opacity: 0,
                // animationFillMode: 'forwards'
              },
              keyframes: [
                { transform: `translateX(${this.options.distance}px)` },
                {
                  visibility: "visible",
                  opacity: 1,
                  transform: "translateX(0)",
                },
              ],
          },
          fadeInUp: {
              initStyles: {
                transform: `translateY(${this.options.distance}px)`,
                opacity: 0,
                // animationFillMode: 'forwards'
              },
              keyframes: [
                { transform: `translateY(${this.options.distance}px)` },
                {
                  visibility: "visible",
                  opacity: 1,
                  transform: "translateX(0)",
                },
              ],
          },
          fadeInDown: {
              initStyles: {
                transform: `translateY(-${this.options.distance}px)`,
                opacity: 0,
                // animationFillMode: 'forwards'
              },
              keyframes: [
                { transform: `translateY(-${this.options.distance}px)` },
                {
                  visibility: "visible",
                  opacity: 1,
                  transform: "translateX(0)",
                },
              ],
          },
        };
    }
  
    constructor(selector, options) {
      this.selector = selector;
      this.elms = document.querySelectorAll(selector);
      this.options = options;
      this.init();
    }
  
    init() {
      // // this.el[0].addEventListener("click", () => {
      // //   this.el[0].animate(this.animations[this.options.animation], this.timing);
      // // });
      // console.log(this.isElementInViewport(this.el[0]));
      this.loadCoreAnimations()
      this.initStyles();
      this.addDocumentListener();
    }
  
    addDocumentListener() {
      if (window.addEventListener) {
        addEventListener(
          "DOMContentLoaded",
          this.viewportChanged.bind(this),
          false
        );
        addEventListener("load", this.viewportChanged.bind(this), false);
        addEventListener("scroll", this.viewportChanged.bind(this), false);
        addEventListener("resize", this.viewportChanged.bind(this), false);
      } else if (window.attachEvent) {
        attachEvent("onDOMContentLoaded", this.viewportChanged.bind(this)); // Internet Explorer 9+ :(
        attachEvent("onload", this.viewportChanged.bind(this));
        attachEvent("onscroll", this.viewportChanged.bind(this));
        attachEvent("onresize", this.viewportChanged.bind(this));
      }
    }
  
    initStyles() {
      this.elms.forEach((el) => {
          KakAnimation.mapStyles(el, this.animations[this.options.animation].initStyles);
      });
    }
    static mapStyles(element, style) {
      for (const property in style) element.style[property] = style[property];
    }
  
    viewportChanged() {
      this.elms.forEach((el) => {
        if (this.isElementInViewport(el)) {
          var t = el.classList.contains("has-entered");
          t || this.enter(el);
        }
      });
    }
  
    enter(e) {
      e.animate(this.animations[this.options.animation].keyframes, 
          {
              duration: this.options.duration,
              iterations: 1,
              fill: 'forwards',
          }
      );
      e.classList.add("has-entered");
    }
  
    isElementInViewport(el) {
      var rect = el.getBoundingClientRect();
  
      return (
        rect.top >= 0 &&
      //   rect.left >= 0 &&
        rect.bottom <=
          (window.innerHeight ||
            document.documentElement.clientHeight) 
      
      );
    }
  }
  
  // initialize
  new KakAnimation(".animate-left", {
    animation: "fadeInLeft",
    distance: "700",
    duration: 2000,
  });
  
  new KakAnimation(".animate-right", {
      animation: "fadeInRight",
      distance: "700",
      duration: 2000,
  });
  
  // new KakAnimation(".animate-up", {
  //     animation: "fadeInUp",
  //     distance: "700",
  //     duration: 100,
  // });
  
  // new KakAnimation(".animate-down", {
  //     animation: "fadeInDown",
  //     distance: "700",
  //     duration: 100,
  // });