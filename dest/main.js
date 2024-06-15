// const { log } = require("grunt");
function handle() {
    const btnmenu = document.querySelector('.btnmenu');
    const nav = document.querySelector('.nav');
    btnmenu.addEventListener('click', function () {
        btnmenu.classList.toggle('clicked');
        nav.classList.toggle('active');
    })
    //hidenav
    function hidenav() {
        nav.classList.remove('active');
        btnmenu.classList.remove('clicked');
    }
    window.addEventListener('resize', () => {
        let wwindow = window.innerWidth
        if (wwindow > 992) {
            hidenav()
        }
    })
}
handle()
// change language
let HandleLang = () => {
    const Lang = document.querySelector('.lang');
    const langOption = document.querySelectorAll('.lang .lang__option .lang__option-item');
    const langCurrent = document.querySelector('.lang .lang-current span')
    Lang.addEventListener('click', (e) => {
        e.stopPropagation();//ngăn chặn sự tạo bọt sự kiện hiện tại , không ngăn cản hành vi mặc định  
        Lang.classList.toggle('active')
    })
    langOption.forEach((item) => {
        // console.log(e);
        item.addEventListener('click', (e) => {
            e.preventDefault();//ngăn cản sự chuyển trang mặc định của trình duyện 
            let langText = item.textContent;
            // console.log(langText);
            let langCurrentText = langCurrent.textContent;
            // console.log(langCurrentText);
            langCurrent.innerHTML = langText;
            item.innerHTML = langCurrentText;

        })
    })
    document.addEventListener('click', () => {
        Lang.classList.remove('active');
    })
}
HandleLang();

// video
function handleModelVideo() {
    let videos = document.querySelectorAll('.video__item-wrap .video__item .video__item-img');
    let modalVideo = document.querySelector('.popuvideo');
    let iFrameModelVideo = document.querySelector('.popuvideo .popuvideo__inner .popuvideo__inner-iframe iframe');
    let btnClose = document.querySelector('.popuvideo .popuvideo__inner .popuvideo__inner-close');

    videos.forEach(function (video) {
        video.addEventListener('click', function () {
            // show model
            modalVideo.classList.add('active');
            let dataID = video.getAttribute('data-video-src');
           iFrameModelVideo.setAttribute('src' , `https://www.youtube.com/embed/${dataID}?autoplay=1`);
        })
    })
    function closeModal(){
        // Hide model
        modalVideo.classList.remove('active');
        iFrameModelVideo.setAttribute('src', '');
    }
    btnClose.addEventListener('click', function(){
        closeModal();
    })
    modalVideo.addEventListener('click', function(){
        closeModal();
    })
}
handleModelVideo() 


// 
let menus = document.querySelectorAll('.header .container-fluid .menu a');
let sections = [];
function removeActiveMenu(){
        menus.forEach(function(menu_Element, menu_index){
        menu_Element.classList.remove('active');
    });
}
function HandleMenu(){
    let HeightHeader = document.querySelector('.header').offsetHeight;//lấy chiều cao bao gồm padding và border 
    menus.forEach(function(element, index){
        let href = element.getAttribute('href');// lấy địa chỉ id của nó 
        let className = href.replace('#', '');
        let sc = document.querySelector('.' + className);
        sections.push(sc);
        element.addEventListener('click', function(e){//click lấy thẻ
            e.preventDefault(e);// ngăn chăn sự mặc định chuyển trang
            window.scrollTo({
                top: sc.offsetTop - HeightHeader + 1,// lấy vị trí element dựa vào body 
                behavior:'smooth'
            })
            removeActiveMenu();
            element.classList.add('active');
            window.addEventListener('scroll', function(e){
                let position = window.pageYOffset ;
                sections.forEach(function (sc, index){
                if(position > sc.offsetTop - HeightHeader && position < sc.offsetTop + sc.offsetHeight){
                    removeActiveMenu();
                    menus[index].classList.add('active');
                }else{
                     menus[index].classList.remove('active');
                    }
                })
            })
        });
    });
}
HandleMenu()
// slider 
// cách 1
// function HandleSlider(){
//     let sliderOption = document.querySelectorAll('.slider .slider__item-wrap .slider__item');
//     let currentslider = 0;
//     sliderOption.forEach(function(itemslider, index){
//         if(itemslider.classList.contains('active')){
//             currentslider = index;
//         }
//     })
//     let btn = document.querySelector('.slider__bottom-control .next');
//         btn.addEventListener('click', function(e){
//             if(currentslider < sliderOption.length - 1){
//                 sliderOption[currentslider].classList.remove('active');
//                 sliderOption[currentslider + 1].classList.add('active');
//                 currentslider ++;
//             }else{
//                 sliderOption[currentslider].classList.remove('active');
//                 sliderOption[0].classList.add('active');
//                 currentslider = 0;
//             }
//         })
//     let btnprev = document.querySelector('.slider__bottom-control .--prev');
//     btnprev.addEventListener('click', function(){
//         if(currentslider > 0){
//             sliderOption[currentslider].classList.remove('active');
//             sliderOption[currentslider - 1].classList.add('active');
//             currentslider --;
//         }else{
//             sliderOption[currentslider].classList.remove('active');
//             sliderOption[sliderOption.length - 1].classList.add('active');
//             currentslider = sliderOption.length -1;
//         }
//     })
// }
// HandleSlider()
// cách 2
// function HandleSlider(){
//     let sliderOption = document.querySelectorAll('.slider .slider__item-wrap .slider__item');
//     let number = document.querySelector('.slider__bottom-paging .number span');
//     let currentslider = 0;
//     let doted = document.querySelectorAll('.slider__bottom-paging .dotted li');

//     sliderOption.forEach(function(itemslider, index){
//         if(itemslider.classList.contains('active')){
//             currentslider = index;
//         }
//     })
    
//     let btn = document.querySelector('.slider__bottom-control .next');
//         btn.addEventListener('click', function(e){
//             if(currentslider < sliderOption.length - 1){
//                 goto(currentslider + 1);
//             }else{
//                 goto(0);
//             }
//         })
//     let btnprev = document.querySelector('.slider__bottom-control .--prev');
//     btnprev.addEventListener('click', function(){
//         if(currentslider > 0){
//             goto(currentslider - 1 );
//         }else{
//             goto(sliderOption.length -1);
//         }
//     })
//     function goto(index){
//     sliderOption[currentslider].classList.remove('active');
//     sliderOption[index].classList.add('active');
//     doted[currentslider].classList.remove('is-selected');
//     doted[index].classList.add('is-selected');
//     currentslider = index;
//     show(currentslider + 1);
    
//     }

//     function show(index){
//         number.innerHTML = (index).toString().padStart(2, '0');
//     }
//     // default active 
//     show(currentslider + 1);
//     doted[currentslider].classList.add('is-selected');
//     doted.forEach(function(li, index){
//         li.addEventListener('click', function(){
//             goto(index);
//         })
//     })
// }
// HandleSlider()
// tabs
function handleTabNews(){
    let tabs = document.querySelectorAll('.news__tab .news__tab-frame');
    let listNews = document.querySelectorAll('.news__list');
    tabs.forEach(function(item){
        item.addEventListener('click', function(e){
            // remove all active of tab
            tabs.forEach(function(tabItem){
                tabItem.classList.remove('active');
            })
            // add item tab
            item.classList.add('active');
            // hide all new list 
            listNews.forEach(function(list){
                list.classList.remove('active')
            })
            // let id = this.getAttribute('data-tab');
            let id = this.dataset.tab;
            // add class active to new list
            document.querySelector('.news__ele-' + id).classList.add('active');
        })
    })
}
handleTabNews()
// scroll y
// window.addEventListener('scroll', getPosWindowScroll)
// function getPosWindowScroll(){
//     let vertical = window.scrollY ;
//     console.log(vertical)
// }
// getPosWindowScroll()
// header Scroll
function changeBgHeader(){
    const header = document.querySelector('.header');
    let scrollY = window.scrollY;
    if(scrollY > header.clientHeight){
        header.classList.add('active');
    }else{
        header.classList.remove('active');
    }
}
changeBgHeader()
// back to top 
function backtotop(){
    const footer = document.querySelector('.footer');
    let scrollY = window.scrollY;
    if(scrollY > 1500){
        footer.classList.add('active');
    }else{
        footer.classList.remove('active');
    }
}
backtotop()
function clickbacktotop(){
    const btn = document.querySelector('.footer__backtotop');
    btn.addEventListener('click', function(e){
        e.preventDefault();
        window.scrollTo({
            top:0,
            behavior:'smooth'
        })
    })
}
clickbacktotop()
window.addEventListener('scroll', function(){
    changeBgHeader();
    backtotop();
});
// progressbar
const progressBar = () =>{
    let progess = document.querySelector('.progressbar');
    window.addEventListener('scroll', () => {
        let scrollY = window.scrollY;
        // body.offsetheight : chiều cao của body 
        let heightBody =document.body.offsetHeight;
        let percent = scrollY / (heightBody - window.innerHeight) * 100;
        // console.log(percent * 100)
        progess.style.width = `${percent}%`;
    });
}
progressBar();
// slider carousel
// function handlecarouselSlider(){
//     let slider = document.querySelector('.carousel');
//     let flktySlider = new Flickity(
//         slider,
//         {
//             cellAlign:'left',
//             contain: true,
//             draggable: '>1',
//             prevNextButtons: false,
//             wrapAround: true,
//             pageDots:false,
//             freeScroll:true,
//         }
//     )
// }
// SLIDER HERO
function handleSldiderHero(){
    // khoi tao Slider
    var slider = document.querySelector('.slider__item-wrap');
    var flktySlider = new Flickity( 
        slider, 
        {
            // options
            cellAlign: 'left',
            contain: true,
            draggable:'>1',
            // disable previous & next 
            prevNextButtons: false,
            wrapAround: true,
            // pageDots: false
            on: {
                ready: function() {
                    console.log('Flickity is ready');
                    handleDotsSlider()
                },
                change: function( index ) {
                    console.log( 'Slide changed to' + index );
                    handlePagingSlider(index)
                }
            }
        }
    );
    // CONTROLS
    let btn = document.querySelector('.slider__bottom-control .next');
    let btnprev = document.querySelector('.slider__bottom-control .--prev');
    btn.addEventListener('click', function(e){
        flktySlider.previous(true);
    })   
    btnprev.addEventListener('click', function(){
        flktySlider.next(true);
    })
    // Dots
    function handleDotsSlider(){
        let dotsSlider = document.querySelector('.flickity-page-dots');
        let dotsSliderBottom = document.querySelector('.slider__bottom-paging');
        dotsSliderBottom.appendChild(dotsSlider);
    }
    handleDotsSlider()
    // paging
    function handlePagingSlider(index){
        let number = document.querySelector('.slider__bottom-paging .number span');
        number.innerHTML = (index + 1).toString().padStart(2, '0');
    }
    handlePagingSlider()
}
handleSldiderHero()
// Cách để đọc tài liệu và ứng dụng thư viện vào dự án 
// 1 . Thự viện nào cũng có docs và đọc hiểu , hk hiểu thì youtube 
// 2 . Bước 1 xem cách khởi tạo , 
    Fancybox.bind('[data-fancybox]', {
    Infinity: false,
    loop:false,
    keyboard:{
        Escape:'close',
        Delete:'close',
        Backspace:'close',
        PageUp:'next',
        PageDown:'prev',
        ArrowUp:'next',
        ArrowDown:'prev',
        ArrowRight:'next',
        ArrowLeft:'prev'
    },
    l10n:{
        CLOSE:'Đóng',
    },

    });
// SLIDER CAROUSEL
function HandleSlierCarosel(){
     var slider = document.querySelector('.carousel');
    var flktySlider = new Flickity( 
        slider, 
        {
            // options
            cellAlign: 'left',
            contain: true,
            draggable:'>1',
            // disable previous & next 
            prevNextButtons: false,
            wrapAround: true,
            pageDots: false,
            freeScroll:true,
            lazyLoad:3
        }
    );
}
HandleSlierCarosel();