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
        return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
});



// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();



function locomotive() {
    const scroll = new LocomotiveScroll({
        el: document.querySelector('#main'),
        smooth: true
    });

}
locomotive();

function menubar() {
    const sidebar = document.querySelector("#res-nav")
    const menubtn = document.querySelector("#menu-btn")
    const closebtn = document.querySelector("#close-btn");
    menubtn.addEventListener('click', function () {
        sidebar.style.display = "block";
        setTimeout(() => {
            sidebar.classList.add("active");
        }, 10);
    });
    closebtn.addEventListener('click', function () {
        sidebar.classList.remove("active");
        setTimeout(() => {
            sidebar.style.display = "none";
        }, 300);
    });
}
menubar();

// For larger screens
gsap.matchMedia().add("(min-width: 768px)", () => {

    function page1Anim() {
        var tl = gsap.timeline();
        tl.from(".logo h1", {
            x: -30,
            opacity: 0,
            duration: 0.7,
        });
        tl.from(".navitems ul li, .navitems ul button", {
            y: -30,
            opacity: 0,
            stagger: 0.1,
        });
        tl.from(".banner-container .banner-text", {
            x: -30,
            opacity: 0,
            stagger: 0.1
        });
        tl.from(".banner-container .banner-image", {
            y: 40,
            opacity: 0,
        });
    }
    page1Anim();

    function page2Anim() {
        var tl2 = gsap.timeline({
            scrollTrigger: {
                trigger: ".about-content",
                scroller: "#main",
                start: "40% 60%",
                end: "30% 70%",
                // markers: true,
                scrub: 2,
            }
        });
        tl2.from(".about-left", {
            x: -300,
            opacity: 0,
            duration: 1.5,
        }, 'same');
        tl2.from(".about-right", {
            x: 300,
            opacity: 0,
            duration: 1.5,
        }, 'same');
    }
    page2Anim();

    function page3Anim() {
        var tl3 = gsap.timeline({
            scrollTrigger: {
                trigger: ".experience-container",
                scroller: "#main",
                start: "20% 50%",
                end: "20% 50%",
                scrub: 2,
            }
        });
        tl3.from(".experience-title", {
            y: 300,
            opacity: 0,
            duration: 1.5,
        }, 'same');
        tl3.from(".experience-leyar", {
            x: 300,
            opacity: 0,
            duration: 1.5,
            stagger: 0.3
        }, 'same');
    }
    page3Anim();

    function page4Anim() {
        var tl4 = gsap.timeline({
            scrollTrigger: {
                trigger: ".award-container",
                scroller: "#main",
                start: "30% 50%",
                end: "30% 50%",
                scrub: 2,
            }
        });
        tl4.from("#award-content1", {
            x: -300,
            opacity: 0,
            duration: 1.5,
            stagger: 0.3
        }, 'same');
        tl4.from("#award-content2", {
            x: 300,
            opacity: 0,
            duration: 1.5,
            stagger: 0.3
        }, 'same');
    }
    page4Anim();

});

// For mobile devices 
gsap.matchMedia().add("(max-width: 767px)", () => {
    // No animations will run here
});
