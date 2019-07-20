$(document).ready(function() {

    var questions_list = [];

    matches = function(pattern, txt){
        var len = pattern.length;
        for(var i=0;i<len;i++){
            if(pattern[i]!=txt[i]){
                return 0;
            }
        }
        return 1;
    }

    get_list = function(response){
        jsonList = JSON.parse(response);
        return jsonList;
    }

    filter_list = function(pattern){
        rlist = [];
        listkeys = Object.keys(questions_list)
        console.log(listkeys.length);
        for(var j=0;j<listkeys.length; j++){
            var txt = listkeys[j];
            if(matches(pattern.toUpperCase(),txt.toUpperCase()))
                rlist[txt] = questions_list[txt];
        }
        return rlist;
    }

    build_html = function(plist){
        var ipr = 6;
        plistkeys = Object.keys(plist)
        mhtml = '<p>Number of questions remaining : '+ plistkeys.length +'</p>';
        mhtml+= '<table class="table table-striped table-bordered table-hover">';
        for(var i=0;i<plistkeys.length;i+=ipr){
            mhtml += '<tr>';
            for(var j=0;i+j<plistkeys.length && j<ipr; j++){
                var txt = plistkeys[i+j];
                if(plist[txt]==0)
                    mhtml+='<td><a href="https://www.spoj.com/problems/'+ txt +'" target="_blank">'+ txt +'</a></td>';
                else
                    mhtml+='<td><a href="https://www.spoj.com/problems/'+ txt +'" class="text-danger" target="_blank">'+txt+'</a></td>';
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
                if(response=="{\"-1\": 1}"){
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