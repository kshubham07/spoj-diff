$(document).ready(function() {

    var questions_list = [];

    matches = function(pattern, txt){
        var len = pattern.length;
        for(var i=0;i<len;i++){
            if(pattern[i]!=txt[i]){
                console.log(txt+" violated at "+i);
                return 0;
            }
        }
        console.log(txt+" MATCHES!");
        return 1;
    }

    get_list = function(response){
        response = response.substring(1,response.length-1);
        //console.log(response);
        plist = response.split(',');
        //console.log(plist.length);
        qlist = []
        for(var j=0;j<plist.length; j++){
            var txt = plist[j];
            txt = txt.substring(1+(j!=0),txt.length-1);    
            qlist.push(txt);
        }
        return qlist;
    }

    filter_list = function(pattern){
        console.log("filter list");
        rlist = [];
        for(var j=0;j<questions_list.length; j++){
            var txt = questions_list[j];
            if(matches(pattern.toUpperCase(),txt.toUpperCase()))
                rlist.push(txt);
        }
        console.log("filter list returning "+rlist);
        return rlist;
    }

    build_html = function(plist){
        var ipr = 6;
        mhtml= '<table class="table table-striped table-bordered table-hover">';
        for(var i=0;i<plist.length;i+=ipr){
            mhtml += '<tr>';
            for(var j=0;i+j<plist.length && j<ipr; j++){
                var txt = plist[i+j];
                mhtml+='<td><a href="https://www.spoj.com/problems/'+ txt +'" target="_blank">'+ txt +'</a></td>';
            }
            mhtml += '</tr>';
        }
        mhtml+= '</table>';
        return mhtml;
    }

    $('#btnSignUp').click(function() {
        $('#content').html("Loading...");
        $.ajax({
            url: '/',
            data: $('form').serialize(),
            type: 'POST',
            success: function(response) {
                console.log(response);
                if(response=="['-1']"){
                    $('#content').html("Bad id. Please check id.");
                }
                else{
                    questions_list = get_list(response);
                    var properhtml = build_html(questions_list);
                    $('#content').html(properhtml);
                }
            },
            error: function(error) {
                console.log(error);
            }
        });
    });

    $("body").on("keyup","#pattern",function(event){
        if ( event.which == 13 ) {
            event.preventDefault();
        }
        var pattern = this.value;
        console.log(pattern);
        var filtered_list = filter_list(pattern);
        var properhtml = build_html(filtered_list);
        $('#content').html(properhtml);
    });

});