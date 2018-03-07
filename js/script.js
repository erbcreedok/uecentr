var $glob_var = {};

function scrollto(elem){
    var scrtop = 5;
    if($glob_var.cssmedia_chk) scrtop = 45;
    $('html, body').animate({
        scrollTop: $(elem).offset().top - scrtop
    }, 300); 
}
function onscreen(elem){
    var floor;
    floor = window.innerHeight;
    elem = elem.getBoundingClientRect();
    var elemtop = elem.top;
    var elemfloor = elem.bottom;
    return ((elemtop>0)&&(elemtop<floor))||
        ((elemfloor>0)&&(elemfloor<floor))||
        ((elemtop<0)&&(elemfloor>floor)); 
}
function ontop(elem,floor){
    if(floor===undefined) floor = window.innerHeight;
    elem = elem.getBoundingClientRect();
    var elemtop = elem.top;
    var elemfloor = elem.bottom;
    return (elemfloor>floor && elemtop<floor);
}
function hasscreen(elem,top, floor){
    if(top===undefined)top = 0;
    else top = 0-top;
    if(floor===undefined) floor = window.innerHeight;
    else floor = window.innerHeight + floor;
    elem = elem.getBoundingClientRect();
    var elemtop = elem.top;
    var elemfloor = elem.bottom;
    return ((top<=elemtop)&&(elemfloor<=floor))||((top>=elemtop)&&(elemfloor>=floor));
}
function gotoservices(){
    $(".list_main_li").eq(1).click();
}
function openform(id){
    if(!$(".form_container#"+id).hasClass("scrolled")){
        scrollto($(".form_container#"+id)); 
        return false;
    }
    setTimeout(function(){
        $(".form_container#"+id).removeClass("scrolled");
        scrollto($(".form_container#"+id));
    },300);
}
function closeform(id){
    $(".form_container#"+id).addClass("scrolled");
}

function openModal(element) {
    var body = document.getElementsByTagName('body').item(0);
    body.classList.add('modal-open');
    element.style.display = 'block';
}
function closeModal(element) {
    var body = document.getElementsByTagName('body').item(0);
    body.classList.remove('modal-open');
    element.style.display = 'none';
}
function onOpenModal(selector) {
    var element = document.querySelector(selector);
    if (!element) return;
    openModal(element);
}
function onCloseModal(selector) {
    var element = document.querySelector(selector);
    if (!element) return;
    closeModal(element);
}
function findParent(element, className) {
    var parent = element.parentNode;
    if (parent.tagName.toLowerCase() === 'html') return false;
    if (parent.classList.contains(className)) {
        return parent
    } else {
        return findParent(parent, className);
    }
}
(function(){
    $(document).ready(function(){
        $glob_var.cssmedia_chk = ($(".cssmedia_chk").css("display")==="none");
        $glob_var.sitepage = $("#sitepage").val();
    });
    $(window).resize(function(){
        $glob_var.cssmedia_chk = ($(".cssmedia_chk").css("display")==="none");
    });
    $(window).scroll(function(){
        if($glob_var.sitepage==="index"){
            (function navleft(){
                if($(this).scrollTop()>$(".navbar").height()){
                    $(".nav_left").addClass("fix_top");
                    if($glob_var.cssmedia_chk)
                        $(".navbar").css("margin-bottom","40");
                }else{
                    $(".nav_left").removeClass("fix_top");
                    if($glob_var.cssmedia_chk)
                        $(".navbar").removeAttr("style");
                }
                if($(this).scrollTop()+$(".nav_left").height()<$(".nav_left_bottom").offset().top-40){
                    if($(".nav_left").hasClass("abs_top")){
                        $(".nav_left").removeClass("abs_top"); 
                        $(".nav_left").removeAttr("style"); 
                    }
                }
                else{ 
                    if(!$(".nav_left").hasClass("abs_top")){
                        $(".nav_left").addClass("abs_top");
                        $(".nav_left").css("top",window.scrollY - $(".container").offset().top);
                    }
                }
            })();
            (function navleftsection(){
                $(".section").each(function(index){
                    var scrtop = 200;
                    if(ontop(this,scrtop)){
                        var title = parseInt($(this).attr("target"));
                        $(".list_main .list_main_li").removeClass("active");
                        $(".list_main .list_main_li").eq(title).addClass("active");
                    }
                });
                $(".subsection").each(function(index){
                    var scrtop = 200;
                    if(ontop(this,scrtop)){
                        var title = parseInt($(this).attr("target"));
                        $(".list_child .list_child_li").removeClass("active");
                        $(".list_main_li.active .list_child .list_child_li").eq(title).addClass("active");
                    } 
                });

            })();
            (function screenappear(){
            $(".waitappear").each(function(){
                if(onscreen(this)){
                    $(this).addClass("onscreen");
                }else{
                    if($(this).hasClass("onscreen")){
                        $(this).removeClass("onscreen");
                    }
                }
                if(hasscreen(this,80,80)){
                    $(this).addClass("hasscreen");
                }else{
                    if($(this).hasClass("hasscreen")){
                        $(this).removeClass("hasscreen");
                    }
                }
            });
            $(".appearonce").each(function(){
               if(onscreen(this)){
                   $(this).addClass("appeared");
                   $(this).removeClass("appearonce");
               }
            });
        })();
        }
    });
    $(document).on('click',".list_main_li",function(){
        var section = parseInt($(this).attr("target"));
        var scrtop = 5;
        if($glob_var.cssmedia_chk) scrtop = 45;
        $('html, body').animate({
            scrollTop: $(".section").eq(section).offset().top - scrtop
        }, 600);
    });
    $(document).on('click',".list_child_li",function(){
        var subsection = parseInt($(this).attr("target"));
        var scrtop = 5;
    });
    $(document).on('click',".footer .foot_href",function(){
        var index = $(".footer .foot_href").index(this);
        $(".list_main_li").eq(index).click();
    });
    $(document).on('submit','#acceptapplication',function(){
        var url = $(this).attr("action");
        var senddata = $(this).serializeArray();
        $("#acceptapplication .submit.accept").attr("disabled","").addClass("loading").html("<i class='fa fa-circle-o-notch'></i>");
        $.post(url,senddata,function(data){
            console.log(url,senddata,data);
            if(data=="success"){
                $("#acceptapplication .submit.accept").removeClass("loading").addClass("active").html("<i class='fa fa-check-circle'></i>");
                setTimeout(function(){window.location.replace("index.php");},1500);
            }
        });
        
        return false;
    });
    $('button[data-role=modal-open]').click(function() {
        var selector = this.dataset.target;
        if (!selector) return;
        onOpenModal(selector);
    });
    $('button[data-role=modal-close]').click(function() {
        var selector = this.dataset.target;
        if (!selector) return;
        onCloseModal(selector);
    });
    $('.modal [data-dismiss=modal]').click(function() {
        var modal = findParent(this, 'modal');
        if (!modal) return;
        closeModal(modal);
    });
})();
