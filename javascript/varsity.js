// A thingy to handle the sections ----------------------------------------------
// ------------------------------------------------------------------------------


$.get('menu.html', function(data) {
  $('body').prepend(data);
  continue_load();
});


function continue_load(){
function Sections(page) {
    this.page = page;
    this.init();
}

Sections.prototype = {
    init: function(attribute) {
        this.heights = this.page.nav.find('ul').map(function(idx, ele) {
            return $(this).outerHeight();
        }).get();
        
        this.links = {
            next: $('#nav_next_section'),
            prev: $('#nav_prev_section')
        };
    },

    map: function() {
        this.names = $('section [id]').map(function(idx, ele) {
            return {
                id: this.id.replace('.intro', ''),
                offset: $(this).offset().top - 20,
                title: $(this).find(':header:first').text()
            };

        }).get();
    },

    highlight: function() {
        var scroll = this.page.window.scrollTop(),
            articleID = this.names[this.names.length - 1].id;

        for(var i = 0, l = this.names.length; i < l; i++) {
            if (this.names[i].offset > scroll) {
                articleID = this.names[i - 1].id;
                break;
            }
        }

        var sectionID = articleID.split('.')[0],
            page = this.page,
            nav = page.nav;

        if (sectionID !== page.section) {
            nav.filter('.nav_' + page.section).removeClass('active');
            nav.filter('.nav_' + sectionID).addClass('active');

            this.expand(sectionID);
            page.section = sectionID;
        }

        if (articleID !== page.article) {
            nav.find('a[href*=#' + page.article + ']').removeClass('active');
            nav.find('a[href*=#' + articleID + ']').addClass('active');

            page.article = articleID;
            this.mobile(articleID);
        }
    },

    expand: function (sectionName) {
    	sectionName = sectionName.replace('logo', '');
        var nav = this.page.nav,
            index = nav.find('a[href^=' + sectionName + ']').closest('nav > ul > li').index();

        var height = this.page.window.height()
                     //- $('nav > div').height()
					 + 85
                     - (40 * this.heights.length),
					 
                     sections = [],
                     currentHeight = 0,
                     distance = 0;
					 
        		
        while ((currentHeight + this.heights[index]) < height ) {
            sections.push(index);
            currentHeight += this.heights[index];

            distance = -distance + (distance >= 0 ? -1 : 1);
            index += distance;

            if (index < 0 || index >= this.heights.length) {
                distance = -distance + (distance >= 0 ? -1 : 1);
                index += distance;
            }
        }

        for(var i = 0, len = nav.length; i < len; i++) {
            if ($.inArray(i, sections) === -1) {
                nav.eq(i).find('ul').slideUp();

            } else {
                nav.eq(i).find('ul').slideDown();
            }
        }
    },

    mobile: function(index){
        for(var i = 0; i < this.names.length; i++) {
            if (this.names[i].id === index) {
                this.updateLinks(i);
                break;
            }
        }
    },

    updateLinks: function(index) {
        if (index !== this.names.length - 1) {
            this.setLink(this.links.next, this.names[index + 1]);
        } else {
            this.links.next.slideUp(100);
        }

        if (index !== 0) {
            this.setLink(this.links.prev, this.names[index - 1]);
        } else {
            this.links.prev.slideUp(100);
        }
    },

    setLink: function(ele, data) {
        ele.slideDown(100).attr('href', '#' + data.id)
                       .find('.nav_section_name').text(data.title);
    }
};


// This more or less controls the page ------------------------------------------
// ------------------------------------------------------------------------------
function Page() {
    this.window = $(window);
    this.nav = $('nav > ul > li');
    this.sections = new Sections(this);
    this.section = null;
    this.article = null;
    this.init();
}

Page.prototype = {
    init: function() {
        var that = this,
            mainNav = $('#nav_main');

        this.scrollLast = 0;
        this.window.scroll(function() {
            that.onScroll();
        });

        this.resizeTimeout = null;
        this.window.resize(function() {
            that.onResize();
        });

        that.sections.map();
        setTimeout(function() {
            that.sections.highlight();
        }, 10);

        // Mobile, for position: fixed
        if ($.mobile) {
            var navs = $('#nav_mobile, #nav_main');
            navs.css('position', 'absolute');
            this.window.scroll(function(){
                navs.offset({
                    top: that.window.scrollTop()
                });
            });
        }
        
        // Show menu for tablets
        $('#show_menu').click(function (){
            var scrollTop = $.mobile ? that.window.scrollTop() : 0;
            
            mainNav.slideDown(300).css('top', scrollTop);
            return false;
        });
        
        $('#nav_main').click(function(){
            if(that.window.width() < 1000)
                mainNav.slideUp(300);
        });
    },

    onScroll: function() {
        if ((+new Date()) - this.scrollLast > 50) {
            this.scrollLast = +new Date();
            this.sections.highlight();
        }
    },

    onResize: function() {
        clearTimeout(this.resizeTimeout);

        var that = this;
        this.resizeTimeout = setTimeout(function() {
            that.sections.map();
            that.sections.expand(that.section);
        }, 100);
    }
    
    
};

var Garden = new Page();
prettyPrint();

var filename = window.location.href.substr(window.location.href.lastIndexOf("/") + 1, window.location.href.lastIndexOf(".html") - window.location.href.lastIndexOf("/") - 1);
if (filename.length == 0)
filename = 'index';

$(".nav_" + filename + " > h1 > a").addClass("active");

};

//testpart
function check_me()
{
    var count=0;
    with(document.test) {
if (!Q1[0].checked&&!Q1[1].checked&&!Q1[2].checked&&!Q1[3].checked)  
{count+=1;};  
if (!Q2[0].checked&&!Q2[1].checked&&!Q2[2].checked&&!Q2[3].checked)  
{count+=1;};  
if (!Q3[0].checked&&!Q3[1].checked&&!Q3[2].checked&&!Q3[3].checked)  
{count+=1;};  
if (!Q4[0].checked&&!Q4[1].checked&&!Q4[2].checked&&!Q4[3].checked)  
{count+=1;};  
if (!Q5[0].checked&&!Q5[1].checked&&!Q5[2].checked&&!Q5[3].checked)  
{count+=1;};  
if (count>0) alert("Вы выполнили не все задания. Проверьте себя!");	 
        else answer();
    }
} 
 
function control(k, f1,f2,f3,f4,f5) {
if (k==="1"&&f1.checked) return true;
if (k==="2"&&f2.checked) return true;
if (k==="3"&&f3.checked) return true;
if (k==="4"&&f4.checked) return true;
if (k==="5"&&f5.checked) return true;
return false;
}

function answer()
{
answ="";
     with(document)    {
	answ+=control(res.charAt(0) ,test.Q1[0],test.Q1[1],test.Q1[2],test.Q1[3])?"1":"0";
answ+=control(res.charAt(1) ,test.Q2[0],test.Q2[1],test.Q2[2],test.Q2[3])?"1":"0";
answ+=control(res.charAt(2) ,test.Q3[0],test.Q3[1],test.Q3[2],test.Q3[3])?"1":"0";
answ+=control(res.charAt(3) ,test.Q4[0],test.Q4[1],test.Q4[2],test.Q4[3])?"1":"0";
answ+=control(res.charAt(4) ,test.Q5[0],test.Q5[1],test.Q5[2],test.Q5[3])?"1":"0";

showResult();
    }
}
 
function showResult()	{
    var nok=0;
    var i,s;
 
for (i=0; i<answ.length;i++) {nok+=answ.charAt(i)==="1"?1:0;}
if(nok===5) s="ОТЛИЧНО";
if(nok<5) s="ХОРОШО";
if(nok<3.75) s="УДОВЛЕТВОРИТЕЛЬНО";
if (nok<2.5) s="НЕУДОВЛЕТВОРИТЕЛЬНО";
    document.test.s1.
	value="Количество правильных ответов "+nok+". Ваша оценка "+s+". Посмотрите на окно рядом с номером вопроса. Если ответ правильный, там (+). Если ответ ошибочен, там (-).";
 
with(document.test)
    {
	if (answ.charAt(0)==="1") {T1.value=" + ";} else {T1.value=" - ";}
   if (answ.charAt(1)==="1") {T2.value=" + ";} else {T2.value=" - ";}
   if (answ.charAt(2)==="1") {T3.value=" + ";} else {T3.value=" - ";}
   if (answ.charAt(3)==="1") {T4.value=" + ";} else {T4.value=" - ";}
   if (answ.charAt(4)==="1") {T5.value=" + ";} else {T5.value=" - ";}
     }
}
function showhide(obj){
    if(obj === 'none') return 'inline';
    else return 'none';
}

//final test
 
function check_me20()
                {
                    var count = 0;
                    with (document.test20) {
                        if (!Q1[0].checked && !Q1[1].checked && !Q1[2].checked && !Q1[3].checked)
                        {
                            count += 1;
                        }
                        if (!Q2[0].checked && !Q2[1].checked && !Q2[2].checked && !Q2[3].checked)
                        {
                            count += 1;
                        }
                        if (!Q3[0].checked && !Q3[1].checked && !Q3[2].checked && !Q3[3].checked)
                        {
                            count += 1;
                        }
                        if (!Q4[0].checked && !Q4[1].checked && !Q4[2].checked && !Q4[3].checked)
                        {
                            count += 1;
                        }
                        if (!Q5[0].checked && !Q5[1].checked && !Q5[2].checked && !Q5[3].checked)
                        {
                            count += 1;
                        }
                        if (!Q6[0].checked && !Q6[1].checked && !Q6[2].checked && !Q6[3].checked)
                        {
                            count += 1;
                        }
                        if (!Q7[0].checked && !Q7[1].checked && !Q7[2].checked && !Q7[3].checked)
                        {
                            count += 1;
                        }
                        if (!Q8[0].checked && !Q8[1].checked && !Q8[2].checked && !Q8[3].checked)
                        {
                            count += 1;
                        }
                        if (!Q9[0].checked && !Q9[1].checked && !Q9[2].checked && !Q9[3].checked)
                        {
                            count += 1;
                        }
                        if (!Q10[0].checked && !Q10[1].checked && !Q10[2].checked && !Q10[3].checked)
                        {
                            count += 1;
                        }
                        if (!Q11[0].checked && !Q11[1].checked && !Q11[2].checked && !Q11[3].checked)
                        {
                            count += 1;
                        }
                        if (!Q12[0].checked && !Q12[1].checked && !Q12[2].checked && !Q12[3].checked)
                        {
                            count += 1;
                        }
                        if (!Q13[0].checked && !Q13[1].checked && !Q13[2].checked && !Q13[3].checked)
                        {
                            count += 1;
                        }
                        if (!Q14[0].checked && !Q14[1].checked && !Q14[2].checked && !Q14[3].checked)
                        {
                            count += 1;
                        }
                        if (!Q15[0].checked && !Q15[1].checked && !Q15[2].checked && !Q15[3].checked)
                        {
                            count += 1;
                        }
                        if (!Q16[0].checked && !Q16[1].checked && !Q16[2].checked && !Q16[3].checked)
                        {
                            count += 1;
                        }
                        if (!Q17[0].checked && !Q17[1].checked && !Q17[2].checked && !Q17[3].checked)
                        {
                            count += 1;
                        }
                        if (!Q18[0].checked && !Q18[1].checked && !Q18[2].checked && !Q18[3].checked)
                        {
                            count += 1;
                        }
                        if (!Q19[0].checked && !Q19[1].checked && !Q19[2].checked && !Q19[3].checked)
                        {
                            count += 1;
                        }
                        if (!Q20[0].checked && !Q20[1].checked && !Q20[2].checked && !Q20[3].checked)
                        {
                            count += 1;
                        }
                        if (count > 0)
                            alert("Вы выполнили не все задания. Проверьте себя!");
                        else
                            answer20();
                    }
                }

                function control20(k, f1, f2, f3, f4, f5, f6, f7, f8, f9, f10, f11, f12, f13, f14, f15, f16, f17, f18, f19, f20) {
                    if (k == 1 && f1.checked)
                        return true;
                    if (k == 2 && f2.checked)
                        return true;
                    if (k == 3 && f3.checked)
                        return true;
                    if (k == 4 && f4.checked)
                        return true;
                    if (k == 5 && f5.checked)
                        return true;
                    if (k == 6 && f6.checked)
                        return true;
                    if (k == 7 && f7.checked)
                        return true;
                    if (k == 8 && f8.checked)
                        return true;
                    if (k == 9 && f9.checked)
                        return true;
                    if (k == 10 && f10.checked)
                        return true;
                    if (k == 11 && f11.checked)
                        return true;
                    if (k == 12 && f12.checked)
                        return true;
                    if (k == 13 && f13.checked)
                        return true;
                    if (k == 14 && f14.checked)
                        return true;
                    if (k == 15 && f15.checked)
                        return true;
                    if (k == 16 && f16.checked)
                        return true;
                    if (k == 17 && f17.checked)
                        return true;
                    if (k == 18 && f18.checked)
                        return true;
                    if (k == 19 && f19.checked)
                        return true;
                    if (k == 20 && f20.checked)
                        return true;
                    return false;
                }

                function answer20()
                {
                    answ = "";
                    with (document) {
                        answ += control20(res20.charAt(0), test20.Q1[0], test20.Q1[1], test20.Q1[2], test20.Q1[3]) ? "1" : "0";
                        answ += control20(res20.charAt(1), test20.Q2[0], test20.Q2[1], test20.Q2[2], test20.Q2[3]) ? "1" : "0";
                        answ += control20(res20.charAt(2), test20.Q3[0], test20.Q3[1], test20.Q3[2], test20.Q3[3]) ? "1" : "0";
                        answ += control20(res20.charAt(3), test20.Q4[0], test20.Q4[1], test20.Q4[2], test20.Q4[3]) ? "1" : "0";
                        answ += control20(res20.charAt(4), test20.Q5[0], test20.Q5[1], test20.Q5[2], test20.Q5[3]) ? "1" : "0";
                        answ += control20(res20.charAt(5), test20.Q6[0], test20.Q6[1], test20.Q6[2], test20.Q6[3]) ? "1" : "0";
                        answ += control20(res20.charAt(6), test20.Q7[0], test20.Q7[1], test20.Q7[2], test20.Q7[3]) ? "1" : "0";
                        answ += control20(res20.charAt(7), test20.Q8[0], test20.Q8[1], test20.Q8[2], test20.Q8[3]) ? "1" : "0";
                        answ += control20(res20.charAt(8), test20.Q9[0], test20.Q9[1], test20.Q9[2], test20.Q9[3]) ? "1" : "0";
                        answ += control20(res20.charAt(9), test20.Q10[0], test20.Q10[1], test20.Q10[2], test20.Q10[3]) ? "1" : "0";
                        answ += control20(res20.charAt(10), test20.Q11[0], test20.Q11[1], test20.Q11[2], test20.Q11[3]) ? "1" : "0";
                        answ += control20(res20.charAt(11), test20.Q12[0], test20.Q12[1], test20.Q12[2], test20.Q12[3]) ? "1" : "0";
                        answ += control20(res20.charAt(12), test20.Q13[0], test20.Q13[1], test20.Q13[2], test20.Q13[3]) ? "1" : "0";
                        answ += control20(res20.charAt(13), test20.Q14[0], test20.Q14[1], test20.Q14[2], test20.Q14[3]) ? "1" : "0";
                        answ += control20(res20.charAt(14), test20.Q15[0], test20.Q15[1], test20.Q15[2], test20.Q15[3]) ? "1" : "0";
                        answ += control20(res20.charAt(15), test20.Q16[0], test20.Q16[1], test20.Q16[2], test20.Q16[3]) ? "1" : "0";
                        answ += control20(res20.charAt(16), test20.Q17[0], test20.Q17[1], test20.Q17[2], test20.Q17[3]) ? "1" : "0";
                        answ += control20(res20.charAt(17), test20.Q18[0], test20.Q18[1], test20.Q18[2], test20.Q18[3]) ? "1" : "0";
                        answ += control20(res20.charAt(18), test20.Q19[0], test20.Q19[1], test20.Q19[2], test20.Q19[3]) ? "1" : "0";
                        answ += control20(res20.charAt(19), test20.Q20[0], test20.Q20[1], test20.Q20[2], test20.Q20[3]) ? "1" : "0";

                        showResult20();
                    }
                }

                function showResult20() {
                    var nok = 0;
                    var i, s;

                    for (i = 0; i < answ.length; i++) {
                        nok += answ.charAt(i) == "1" ? 1 : 0;
                    }
                    if (nok == 20)
                        s = "ОТЛИЧНО";
                    if (nok < 20)
                        s = "ХОРОШО";
                    if (nok < 15)
                        s = "УДОВЛЕТВОРИТЕЛЬНО";
                    if (nok < 10)
                        s = "НЕУДОВЛЕТВОРИТЕЛЬНО";
                    document.test20.s1.
                            value = "Количество правильных ответов " + nok + ". Ваша оценка " + s + ". Посмотрите на окно рядом с номером вопроса. Если ответ правильный, там (+). Если ответ ошибочен, там (-).";

                    with (document.test20)
                    {
                        if (answ.charAt(0) == "1") {
                            T1.value = " + ";
                        } else {
                            T1.value = " - ";
                        }
                        ;
                        if (answ.charAt(1) == "1") {
                            T2.value = " + ";
                        } else {
                            T2.value = " - ";
                        }
                        ;
                        if (answ.charAt(2) == "1") {
                            T3.value = " + ";
                        } else {
                            T3.value = " - ";
                        }
                        ;
                        if (answ.charAt(3) == "1") {
                            T4.value = " + ";
                        } else {
                            T4.value = " - ";
                        }
                        ;
                        if (answ.charAt(4) == "1") {
                            T5.value = " + ";
                        } else {
                            T5.value = " - ";
                        }
                        ;
                        if (answ.charAt(5) == "1") {
                            T6.value = " + ";
                        } else {
                            T6.value = " - ";
                        }
                        ;
                        if (answ.charAt(6) == "1") {
                            T7.value = " + ";
                        } else {
                            T7.value = " - ";
                        }
                        ;
                        if (answ.charAt(7) == "1") {
                            T8.value = " + ";
                        } else {
                            T8.value = " - ";
                        }
                        ;
                        if (answ.charAt(8) == "1") {
                            T9.value = " + ";
                        } else {
                            T9.value = " - ";
                        }
                        ;
                        if (answ.charAt(9) == "1") {
                            T10.value = " + ";
                        } else {
                            T10.value = " - ";
                        }
                        ;
                        if (answ.charAt(10) == "1") {
                            T11.value = " + ";
                        } else {
                            T11.value = " - ";
                        }
                        ;
                        if (answ.charAt(11) == "1") {
                            T12.value = " + ";
                        } else {
                            T12.value = " - ";
                        }
                        ;
                        if (answ.charAt(12) == "1") {
                            T13.value = " + ";
                        } else {
                            T13.value = " - ";
                        }
                        ;
                        if (answ.charAt(13) == "1") {
                            T14.value = " + ";
                        } else {
                            T14.value = " - ";
                        }
                        ;
                        if (answ.charAt(14) == "1") {
                            T15.value = " + ";
                        } else {
                            T15.value = " - ";
                        }
                        ;
                        if (answ.charAt(15) == "1") {
                            T16.value = " + ";
                        } else {
                            T16.value = " - ";
                        }
                        ;
                        if (answ.charAt(16) == "1") {
                            T17.value = " + ";
                        } else {
                            T17.value = " - ";
                        }
                        ;
                        if (answ.charAt(17) == "1") {
                            T18.value = " + ";
                        } else {
                            T18.value = " - ";
                        }
                        ;
                        if (answ.charAt(18) == "1") {
                            T19.value = " + ";
                        } else {
                            T19.value = " - ";
                        }
                        ;
                        if (answ.charAt(19) == "1") {
                            T20.value = " + ";
                        } else {
                            T20.value = " - ";
                        }
                        ;
                    }
                }
                function showhide20(obj) {
                    if (obj == 'none')
                        return 'inline';
                    else
                        return 'none';
                }