import Image from "next/image";
import localFont from "next/font/local";
import style from '../styles/home.module.css';
import { useRef, useEffect } from 'react';
import Link from "next/link";


const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});




const acorn = localFont({
  src: "./fonts/acorn.woff",
  variable: "--font-acorn",
  weight: "100 900",
});

export default function Home() {
  const imageRef = useRef(null);
  const mainRef = useRef(null);
  const introtxt = useRef(null);
  const cursorRef = useRef(null);
  const cursorDotRef = useRef(null);
  const videoSectionRef = useRef(false);
  // Function to split text into spans
  const textContent = [
    { text: "My name is Muhammad Abrar, ", bold: false },
    { text: "a ", bold: false },
    { text: "full stack web developer", bold: true },
    { text: " with 3 years of experience. Currently, I am working with Speedy Brilliant, ", bold: false },
    { text: "where I focus on optimizing applications for performance, including API integration to ensure fast and cost-effective loading, as well as enhancing SEO and UI/UX.", bold: false },
    { text: " I am skilled in the ", bold: false },
    { text: "MERN stack and Python", bold: true },
    { text: " for web development and web scraping.", bold: false },
  ];

  async function handleHovers(isHovering) {
    const { gsap } = await import('gsap');

    if (isHovering) {
      gsap.to(cursorRef.current, { scale: 2, duration: 0.3 });
      gsap.to(videoSectionRef.current, { scale: 1.1, duration: 0.3 });
      gsap.to(cursorDotRef.current, { opacity: 0, duration: 0 });
    } else {
      gsap.to(cursorRef.current, { scale: 1, duration: 0.3 });
      gsap.to(videoSectionRef.current, { scale: 1, duration: 0.3 });
      gsap.to(cursorDotRef.current, { opacity: 1, duration: 0 });
    }
  }

  useEffect(() => {
    // Import GSAP and ScrollTrigger only on the client
    async function animate() {
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');

      gsap.registerPlugin(ScrollTrigger);

      // Add your GSAP animation logic here
      gsap.fromTo(
        imageRef.current,
        {},  // Initial position (above the text)
        {
          y: 200,    // Final position (scrolls down)
          duration: 2,
          scrollTrigger: {
            trigger: mainRef.current,
            start: 'top bottom',  // Animation starts when image enters the viewport
            end: "bottom top",         // Scroll distance for the animation
            scrub: true,          // Allows for smooth scrubbing as the user scrolls

          },
        }
      )

      gsap.to(imageRef.current, {
        scale: 1, // scale up to 1  
        scrollTrigger: {
          trigger: imageRef.current, // the element to be triggered  
          start: "top bottom", // start scaling when the top of the element hits the bottom of the viewport  
          end: "bottom top", // end scaling when the bottom of the element hits the top of the viewport  
          scrub: true, // smooth scrubbing, takes 1 second to catch up to the scroll position  
        }
      });

      const targets = document.querySelectorAll('.reveal-text');
      targets.forEach(target => {
        const isBold = target.querySelector('strong');
        gsap.fromTo(target,
          {
            color: "#eee",
          },
          {
            color: isBold ? "#052e16" : "#475569", // blue-500 for bold, slate-500 for regular
            duration: 0.1,
            stagger: 0.02,
            scrollTrigger: {
              trigger: target,
              start: 'top 80%',
              end: 'top 50%',
              scrub: true,
              markers: false,
              toggleActions: 'play play reverse reverse'
            }
          });
      });
      // Add to your existing animation setup:
      const links = document.querySelectorAll('a, button');
      links.forEach(link => {
        link.addEventListener('mouseenter', () => {
          gsap.to(cursorRef.current, { scale: 2, duration: 0.3 });
          gsap.to(cursorDotRef.current, { opacity: 0, duration: 0 });
        });

        link.addEventListener('mouseleave', () => {
          gsap.to(cursorRef.current, { scale: 1, duration: 0.3 });
          gsap.to(cursorDotRef.current, { opacity: 1, duration: 0 });
        });
      });

    }


    animate();
  }, []);

  useEffect(() => {
    // Import GSAP only on client side
    async function initCursor() {
      const { gsap } = await import('gsap');

      if (!cursorRef.current || !cursorDotRef.current) return;

      // Set initial position
      gsap.set([cursorRef.current, cursorDotRef.current], {
        xPercent: -50,
        yPercent: -50
      });

      // Create mouse move handler
      const onMouseMove = (e) => {
        // Animate outer circle
        gsap.to(cursorRef.current, {
          duration: 0.5,
          x: e.clientX,
          y: e.clientY,
          ease: "power2.out"
        });

        // Animate inner dot
        gsap.to(cursorDotRef.current, {
          duration: 0.1,
          x: e.clientX,
          y: e.clientY,
          ease: "none"
        });
      };

      // Add event listener
      window.addEventListener('mousemove', onMouseMove);

      // Cleanup
      return () => {
        window.removeEventListener('mousemove', onMouseMove);
      };
    }

    initCursor();
  }, []); // Empty dependency array since we only want to run this once


  const tech = [
    {name:"Python",logo:"/tech-logos/python.svg"},
    {name:"JavaScript",logo:"/tech-logos/javascript.svg"},
    {name:"TypeScript",logo:"/tech-logos/typescript.svg"},

    {name:"Node.js",logo:"/tech-logos/nodejs.svg"},
    {name:"Express.js",logo:"/tech-logos/Express.png"},
    {name:"MongoDB",logo:"/tech-logos/mongodb.svg"},
    {name:"React.js",logo:"/tech-logos/react.png"},
    {name:"Next.js",logo:"/tech-logos/nextjs.png"},
    {name:"TailwindCSS",logo:"/tech-logos/tailwind.svg"},
    {name:"FastAPI",logo:"/tech-logos/fastapi.svg"},
    {name:"Flask",logo:"/tech-logos/flask.png"},
    {name:"Selenium",logo:"/tech-logos/selenium.svg"},
    {name:"GitHub",logo:"/tech-logos/github.png"},
    {name:"Docker",logo:"/tech-logos/docker.svg"},
    {name:"AWS",logo:"/tech-logos/aws.png"},
  ]

  return (
    <>
      <div
        className={`${geistSans.variable} ${geistMono.variable}  ${acorn.variable}  font-[family-name:var(--font-geist-sans)] bg-green-50`}
      >
        <main
          ref={mainRef}
          className="grid grid-cols-1   h-[95vh]   ">

          <div className="relative bg-white border-2 border-white m-6 rounded-xl shadow-sm "  >
            <div
              className="absolute inset-x-0 -top-40  transform-gpu overflow-hidden blur-3xl sm:-top-80"
              aria-hidden="true"
            >
              <div
                className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-green-600 to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
                style={{
                  clipPath:
                    "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
                }}
              />
            </div>
            <div className="h-[75px] absolute top-0 left-0 right-0 flex justify-between items-center font-[family-name:var(--font-gt)]  px-8">
              <Link href="#" className=" font-semibold">

                <p className={`text-slate-500 ${style.Availableindicator}`}>Available for a full-time position</p>
              </Link>
              <Link href="#" className="text-right font-semibold">
                <p >Email</p>
                <p className="text-slate-500">muhammadabrar.work@gmail.com</p>
              </Link>


            </div>
            
            <div className="absolute bottom-[16%]  flex flex-col  items-center left-1/2 z-10 -translate-x-1/2 text-black">
              <p className="text-[22px] leading-none  bg-green-600 px-4 py-2 rounded-t-3xl rounded-l-3xl text-white  ">My name is</p>
              <p className="text-[96px] leading-none font-bold text-green-600 font-[family-name:var(--font-acorn)] ">MUHAMMAD</p>
              <p className="text-[96px] leading-none font-bold text-green-600 font-[family-name:var(--font-acorn)]">ABRAR</p>
              <h1 className="text-[28px] leading-none ">Full-Stack Web Developer</h1>
            </div>
            <div ref={imageRef} className={`bg-slate-300 w-[380px] h-[480px]  hover:z-20 rounded-2xl absolute top-[0%] left-1/2 transform -translate-x-1/2 -translate-y-[60%] "`}>
              {/* This is where your image will go */}
              <Image src="/abrar.jpg" fill className={`rounded-2xl object-cover object-center ${style.image}`} />
            </div>
            <div className="h-[40px] w-[25px] rounded-full absolute bottom-8 border-black border-2 left-1/2 transform -translate-x-1/2 -translate-y-[0%] flex justify-center p-2">
              <div
                className={`${style.scroller}`}
              ></div>

            </div>
          </div>


        </main>
        <div className=" w-screen bg-green-50" >
          <p ref={introtxt} className={`w-[95%] lg:w-[80%]   md:w-[90%] sm:w-[95%] mx-auto text-center  ${style.introtxt}`}>
            {textContent.map((item, index) => (
              <span key={index} className={`reveal-text ${item.bold ? 'font-semibold ' : ''}`} >
                {item.bold ? <strong >{item.text}</strong> : item.text}
              </span>
            ))}
          </p>

          <div ref={videoSectionRef} onMouseEnter={() => handleHovers(true)} onMouseLeave={() => handleHovers(false)} className={`${style.videoSection} overflow-hidden mx-auto w-[30rem] h-[12rem] rounded-xl bg-slate-500 mt-[4rem] grid grid-cols-3 `}>
            <div className="font-semibold text-xl px-4 py-2 bg-green-500 text-white flex flex-col justify-between ">
              <div>brief Introduction Video</div>
              <div>
                <svg className="w-12 h-12" viewBox="64 64 896 896" focusable="false" data-icon="play-circle" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm144.1 454.9L437.7 677.8a8.02 8.02 0 01-12.7-6.5V353.7a8 8 0 0112.7-6.5L656.1 506a7.9 7.9 0 010 12.9z"></path></svg>
              </div>
            </div>
            <div className="col-span-2 relative">
              <Image src="/abrar.jpg" fill className={` object-cover object-center `} />
            </div>


          </div>
          <section className="w-[95%] overflow-hidden relative rounded-2xl my-[6rem] p-8 text-center border-2 border-white lg:w-[80%]   md:w-[90%] sm:w-[95%] mx-auto">
            <div
              className="absolute transform-gpu top-[-20rem]  overflow-hidden blur-3xl "
              aria-hidden="true"
            >
              <div
                className="relative -z-10  left-[calc(50%-11rem)]  aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-green-600 to-[#f8ff20] opacity-30 sm:left-[calc(70%-30rem)] sm:w-[90rem]"
                style={{
                  clipPath:
                    "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
                }}
              />
            </div>
            <div className="relative z-10 ">
              <h3 className="text-3xl lg:text-4xl xl:text-5xl  font-bold font-[family-name:var(--font-acorn)] text-green-600 ">Capabilities</h3>
              <p className="text-slate-600 mt-4">Tech and Tools i am familiar with</p>
            </div>
            <div className="flex flex-wrap justify-center gap-4 mt-8 relative z-10">
              {tech.map((item,index)=>( 
              <div key={index} className=" rounded-xl p-4 flex flex-col items-center justify-center">
                <div className="w-[60px] relative p-4 rounded-full h-[60px]">
                  <Image src={item.logo} fill className={`object-contain`} />
                </div>
                <p className="text-slate-600 mt-2">{item.name}</p>
              </div>
              ))}
             
              
            </div>

          </section>
          <section className="w-[95%] overflow-hidden relative rounded-2xl my-[6rem] p-8 text-center border-2 border-white lg:w-[80%]   md:w-[90%] sm:w-[95%] mx-auto">
            <div className="relative">
              <h3 className="text-3xl lg:text-4xl xl:text-5xl  font-bold font-[family-name:var(--font-acorn)] text-green-600 ">Capabilities</h3>
              <p className="text-slate-600">Tech and Tools i am familiar with</p>
            </div>
          </section>

        </div>
      </div>
      <div ref={cursorRef} className={style.cursor}></div>
      <div ref={cursorDotRef} className={style.cursorDot}></div>




    </>
  );
}



