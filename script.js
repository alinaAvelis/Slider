import 'hammerjs';

window.addEventListener('DOMContentLoaded', function() {

    function slider({container, slide, nextArrow, prevArrow, totalCounter, currentCounter, wrapper, field}) {
        const slides = document.querySelectorAll(slide),
              slider = document.querySelector(container),
              prev = document.querySelector(prevArrow),
              next = document.querySelector(nextArrow),
              total = document.querySelector(totalCounter),
              current = document.querySelector(currentCounter),
              slidesWrapper = document.querySelector(wrapper),
              slidesField = document.querySelector(field),
              width = window.getComputedStyle(slidesWrapper).width;
        
        let slideIndex = 1; 
        let offset = 0; 
    
        if(slides.length < 10){
            total.textContent = `0${slides.length}`;
            current.textContent = `0${slideIndex}`;
        } else {
            total.textContent = slides.length;
            current.textContent = slideIndex;
        }
    
        slidesField.style.width = 100 * slides.length + '%';
    
        slidesWrapper.style.overflow = 'hidden';
    
        slides.forEach(slide => {
            slide.style.width = width;
        });
    
        slider.style.position = 'relative';
    
        const indicators = document.createElement('ol'), 
              dots = [];
    
        indicators.classList.add('carousel-indicators');
        slider.append(indicators);
    
        for(let i = 0; i < slides.length; i++) {
            const dot = document.createElement('li');
            dot.setAttribute('data-slide-to', i+1);
            dot.classList.add('dot');
    
            if(i == 0) {
                dot.style.opacity = 1;
            }
    
            indicators.append(dot);
            dots.push(dot);
        }
    
        function deleteNotDegets(str) {
            return +str.replace(/\D/g, '');
        }
    
        function currentSlide() {
            if(slides.length < 10){
                current.textContent = `0${slideIndex}`;
            } else {
                current.textContent = slideIndex;
            }
    
            dots.forEach(dot => dot.style.opacity = '.5');
            dots[slideIndex-1].style.opacity = 1;
        }

        function goToRight() {
            if(offset == deleteNotDegets(width) * (slides.length - 1)){
                offset = 0;
            } else {
                offset += deleteNotDegets(width);
            }
    
            slidesField.style.transform = `translateX(-${offset}px)`;
    
            if(slideIndex == slides.length) {
                slideIndex = 1;
            } else {
                slideIndex++;
            }
    
            currentSlide();
        }

        function goToLeft() {
            if(offset == 0) {            
                offset = deleteNotDegets(width) * (slides.length - 1);
            } else {
                offset -= deleteNotDegets(width);
            }
    
            slidesField.style.transform = `translateX(-${offset}px)`;
    
            if(slideIndex == 1) {
                slideIndex = slides.length;
            } else {
                slideIndex--;
            }
    
            currentSlide();
        }

    
        next.addEventListener('click', () => {
            goToRight();
        });
    
        prev.addEventListener('click', () => {
            goToLeft();
        });
    
        dots.forEach(dot => { /*на каждую точку в массиве навешываем событие*/
            dot.addEventListener('click', (e) => {
                const slideTo = e.target.getAttribute('data-slide-to');
    
                slideIndex = slideTo;
                offset = deleteNotDegets(width) * (slideTo - 1);
    
                slidesField.style.transform = `translateX(-${offset}px)`;
    
                currentSlide();
            });
        });      

        let manager = new Hammer.Manager(slidesWrapper);
        let Swipe = new Hammer.Swipe();
        manager.add(Swipe);
        
        manager.on('swipeleft', function(e) {
            goToRight();
        });

        manager.on('swiperight', function(e) {
            goToLeft();
        });

        document.addEventListener('keydown', (e) => {
            if (e.code === "ArrowRight") { 
                goToRight();
            } else if (e.code === "ArrowLeft"){
                goToLeft();
            }
        });

    }

    slider({container: '.offer__slider',
         slide: '.offer__slide', 
         nextArrow: '.offer__slider-next', 
         prevArrow: '.offer__slider-prev', 
         totalCounter: '#total', 
         currentCounter: '#current', 
         wrapper: '.offer__slider-wrapper', 
         field: '.offer__slider-inner'
    });
});