$(document).ready(function() {

    build_html = function(response){
        var ipr = 6;
        mhtml = '<table class="table table-striped table-bordered table-hover">';
        response = response.substring(1,response.length-1);
        console.log(response);
        plist = response.split(',');
        console.log(plist.length);
        for(var i=0;i<plist.length;i+=ipr){
            mhtml += '<tr>';
            for(var j=0;i+j<plist.length && j<ipr; j++){
                var txt = plist[i+j];
                txt = txt.substring(1+(i+j!=0),txt.length-1);    
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
                    properhtml = build_html(response);
                    $('#content').html(properhtml);
                }
            },
            error: function(error) {
                console.log(error);
            }
        });
    });
});