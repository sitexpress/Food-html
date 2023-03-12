window.addEventListener('DOMContentLoaded', () => {
// Tabs------------------------------------------------------------------------------------------
    const tabItem = document.querySelectorAll('.tabheader__item'),
          tabContent = document.querySelectorAll('.tabcontent'),
          tabheaderParent = document.querySelector('.tabheader__items'),
          tabcontainer = document.querySelector('.tabcontainer');
         


        function hideContent () {
            tabContent.forEach((item) => {
                item.style.display = 'none';
            });
        }  
        hideContent();

        function showContent (i) {
            tabContent[i].style.display = 'block';
        }
        showContent (0);

        tabheaderParent.addEventListener('click', (event) => {
            if (event.target && event.target.classList.contains('tabheader__item')) {
               
                tabItem.forEach((item) => {
                    item.classList.remove('tabheader__item_active');
                });

                event.target.classList.add('tabheader__item_active');
                
                tabItem.forEach((item, i) => {
                    if (item.classList.contains('tabheader__item_active')) {
                        hideContent();
                        showContent(i);
                    } 
                });
            }
    });

    // Timer------------------------------------------------------------------------------------------------

    const deadline = '2020-11-08';

    function getTimeRemaining(endtime) {
        const t = Date.parse(endtime) - Date.parse(new Date()),
            days = Math.floor(t / (1000*60*60*24)),
            hours = Math.floor((t / (1000*60*60)% 24)),
            minutes = Math.floor((t / 1000 / 60) % 60),
            seconds = Math.floor((t / 1000) % 60);

        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    function getZero(num) {
        if (num >= 0 && num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    }

    function setClock (selector, endtime) {
        const timer = document.querySelector(selector),
            days = timer.querySelector('#days'),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),
            timeInterval = setInterval(updateClock, 1000);

        updateClock();
        
        function updateClock() {
            const t = getTimeRemaining(endtime);

            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            if (t.total <= 0) {
                clearInterval(timeInterval);
            }
        }
    }

    setClock('.timer', deadline);

    // Modal

    const dataModal = document.querySelectorAll('[data-modal]'),
            dataClose = document.querySelector('[data-close]'),
            modal = document.querySelector('.modal');


        function openModal () {
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
            clearInterval(modalTimerId);
        }

        function closeModal () {
            modal.style.display = 'none';
            document.body.style.overflow = '';
        }
        dataModal.forEach((item) => {
            item.addEventListener ('click', openModal);
        });

        dataClose.addEventListener ('click', closeModal);
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.code === 'Escape' && modal.style.display === 'block') {
                closeModal();
            }
        });

        // const modalTimerId = setTimeout(openModal, 5000);

        function showModalByScroll () {
            if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
                openModal();
                window.removeEventListener('scroll', showModalByScroll);
            }
        }

    window.addEventListener('scroll', showModalByScroll);


    class MenuItem {
        constructor(img, alt, heading, description, price, priceNumber, currency, parentSelector, ...classes) {
            this.img = img;
            this.alt = alt;
            this.heading = heading;
            this.description = description;
            this.price = price;
            this.priceNumber = priceNumber;
            this.currency = currency;
            this.parent = document.querySelector(parentSelector);
            this.classes = classes;
        }
        render() {
            
            const element = document.createElement('div');
                
                if(this.classes.length === 0) {
                    this.element = 'menu__item';
                    element.classList.add(this.element );
                } else {
                    this.classes.forEach(className => element.classList.add(className));
                }
              
                element.innerHTML = `
                    <img src=${this.img} alt=${this.alt}>
                    <h3 class="menu__item-subtitle">${this.heading}</h3>
                    <div class="menu__item-descr">${this.description}</div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                        <div class="menu__item-cost">${this.price}</div>
                        <div class="menu__item-total"><span>${this.priceNumber}</span> ${this.currency}</div>
                    </div>
                    `;
                this.parent.append(element);
        }
    }

    new MenuItem (
        'img/tabs/vegy.jpg',
        'vegy', 
        'Меню "Фитнес"',
        'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Для людей, которые интересуются спортом; активных и здоровых. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
        'Цена:',
        229,
        'грн/день',
        '.menu .container'
        ).render();

    new MenuItem (
        'img/tabs/elite.jpg',
        'elite', 
        'Меню "Премиум"',
        'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
        'Цена:',
        550,
        'грн/день',
        '.menu .container'
        ).render();

    new MenuItem (
        'img/tabs/post.jpg',
        'post', 
        'Меню "Постное"',
        'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
        'Цена:',
        430,
        'грн/день',
        '.menu .container'
        ).render();

});