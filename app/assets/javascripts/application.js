// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require turbolinks
//= require_tree .

var count=0;
var lastsearchname;
var k=0;

function myfunction() {

    var ajaxRequest;
    var nam = document.getElementById('name').value.trim();
    var name= nam.replace(/ /g,'');
    var len = name.length;
    var photo;
    if (name!="")  {
        try {
            ajaxRequest = new XMLHttpRequest();
        } catch (e) {
            // Internet Explorer Browsers
            try {
                ajaxRequest = new ActiveXObject("Msxml2.XMLHTTP");
            } catch (e) {
                try {
                    ajaxRequest = new ActiveXObject("Microsoft.XMLHTTP");
                } catch (e) {
                    // Something went wrong
                    alert("Your browser broke!");
                    return false;
                }
            }
        }

        ajaxRequest.onreadystatechange = function () {
            if (ajaxRequest.readyState == 4 && ajaxRequest.status == 200) {
                document.getElementById("demo").innerHTML = "";
                var obj = JSON.parse(ajaxRequest.responseText);
                var result;



            if (obj.length >0) {
                lastsearchname= obj[0].firstname;
                //alert(lastsearchname);
                for (var i = 0; i < obj.length; i++) {
                    photo= obj[i].upload;
                    //alert(obj[i].upload);
                    result = obj[i].firstname + ' ' + obj[i].lastname ;
                    JSON.stringify(result);
                    //document.getElementById("demo").innerHTML+= result +"<br>";

                    var firstname_len= obj[0].firstname.length;
                       //alert(firstname_len)
                    var a= document.createElement('a');
                    var anchr="anchr"+i;
                    var id= obj[i].id;
                    a.id=anchr;
                    a.href="/contacts/"+id;
                    document.getElementById("demo").appendChild(a);

                    var m = document.createElement('div');
                    var str="outer"+i;
                    m.id=str;
                    document.getElementById(anchr).appendChild(m);
                    m.style.width="200px";
                    m.style.height="40px";
                    m.style.clear="left";
                    var img= document.createElement('img');
                    img.src="/data/"+photo;
                    img.style.width= "35px";
                    img.style.height= "35px";
                    img.style.float="left";
                    img.style.paddingRight= "15px";
                    document.getElementById(str).appendChild(img);

                    var k = document.createElement('div');
                    inner="inner"+i;
                    k.id=inner;
                    k.style.paddingTop="10px";
                    document.getElementById(str).appendChild(k);
                    for (var j = 0; j < result.length; j++) {
                        var n = document.createElement('span');
                        document.getElementById(inner).appendChild(n);

                            k=j;


                        //}



                         if ((j < name.length) && (result[k].toLowerCase() == name[j].toLowerCase())) {
                            n.textContent += result[j];
                            n.style.color = "red";

                             if(name.length == firstname_len)
                             //alert(name.length)
                                 k=k+1;
                         }

                        else {
                            n.textContent += result[j];
                        }
                    }

                   n.innerHTML += "<br>";
                   }
                k.style.paddingBottom="10px";

            }
                else
            {
                //alert(lastsearchname);
                var m = document.createElement('div');
                m.id="mo";
                document.getElementById("demo").appendChild(m);

                var z = document.createElement('div');
                document.getElementById("mo").appendChild(z);
                z.textContent += "Sorry! No Results Found ";

                var n = document.createElement('span');
                document.getElementById("mo").appendChild(n);
                n.innerHTML += "Did u Mean &nbsp; &nbsp;" ;
                n.style.color="red";
                //n.style.display="inline-block";

                var k = document.createElement('span');
                document.getElementById("mo").appendChild(k);
                k.textContent+= lastsearchname;
                k.style.color="blue";
                k.paddingLeft="50px";
            }
            }
        }


        ajaxRequest.open("GET", "/contacts/quicksearch?name=" + name, true);
        ajaxRequest.send();
    }
    else {
        document.getElementById("demo").innerHTML = "";
    }

}