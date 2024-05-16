function locomotiveAnimationScroll(){
    gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy("#main", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
});
}

locomotiveAnimationScroll()

function navbarAnimation(){
    gsap.to("#nav-part1 svg",{
        transform: "translatey(-100%)",
        scrollTrigger:{
            trigger: "#page1",
            scroller: "#main",
            // markers: true,
            start: "top 0",
            end: "top -5%",
            scrub: true
        }
    })
    
    gsap.to("#nav-part2 #links",{
        transform: "translatey(-100%)",
        opacity: 0,
        scrollTrigger:{
            trigger: "#page1",
            scroller: "#main",
            start: "top 0",
            end: "top -5%",
            scrub: true
        }
    })
}

navbarAnimation()




function loadingAnimation() {
    gsap.from("#page1 h1",{
        y: 100,
        opacity: 0,
        delay: 0.5,
        duration: 0.5,
        stagger: 0.3
    })

    gsap.from("#video-container",{
        scale:0.9,
        opacity: 0,
        delay: 1.3,
        duration: 0.9,
    })
}

loadingAnimation()




function cursorAnimation(){
    let cursor = document.querySelector("#cursor")

let child = document.querySelectorAll(".child")

document.addEventListener("mousemove",(dets)=>{
    gsap.to(cursor,{
        left: dets.x ,
        top: dets.y 
    })
})


child.forEach(function(elem){
    elem.addEventListener("mouseenter",()=>{
        gsap.to(cursor,{
            scale: 2,
            transform: "translate(-50%,-50%)"
        })
    })

    elem.addEventListener("mouseleave",()=>{
        gsap.to(cursor,{
            scale: 0
        })
    })
})
}

cursorAnimation()


function childAnimation() {
    gsap.from("#child1,#child2",{
        opacity: 0,
        duration : 1.5,
        stagger: 0.1,
        
        scrollTrigger:{
            trigger: "#child1, #child2",
            scroller: "#main",
            start: "top 75%",
            end: "bottom 90%",
            scrub: true
    
        }
    })
    
    gsap.from("#child3,#child4",{
        opacity: 0,
        duration : 1.5,
        stagger: 0.1,
        
        scrollTrigger:{
            trigger: "#child3, #child4",
            scroller: "#main",
            start: "top 75%",
            end: "bottom 90%",
            scrub: true
    
        }
    })
}

childAnimation()