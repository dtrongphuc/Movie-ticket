var table;
async function initTableData() {
    
    var url = `/admin/phim/getdata`;
    axios.get(url)
        .then(function (response) {
            var i = 1;
            var modified = response.data.map(e => {
                return {
                    STT: i++,
                    name: e.name,
                    time: e.time,
                    director: e.directors != null ? e.directors : '',
                    open: (e.openingDay).substr(0, e.openingDay.length - 14),
                    createdAt: (e.createdAt).substr(0, e.createdAt.length - 14),
                    detail: "<a href=/admin/phim/chi-tiet/"+e.id+"><i class='fas fa-info-circle'></i></a>",
                    delete: "<a href=/admin/phim/delete/"+e.id+"><i class='fas fa-trash-alt'></i></a>"
                }
            });

            table = $('#theaters').DataTable({
                "pageLength": 10,
                "bInfo": false,
                "oLanguage": {
                    "sSearch": "Tìm Kiếm"
                },
                "dom": '<"toolbar">frtip',
                "processing": true,
                data: modified,
                columns: [
                    { data: 'STT' },
                    { data: 'name' },
                    { data: 'time' },
                    { data: 'open' },
                    { data: 'director' },
                    { data: 'createdAt' },
                    { data: 'detail' },
                    { data: 'delete' }
                ]
            });
        })
        .catch(function (error) {
            console.log(error);
        })

}


async function deletetheater() {
    var th = document.querySelector('.selected')
    if (th != null) {
        var movie = th.getElementsByTagName("td")[1].textContent;
        var cinema = th.getElementsByTagName("td")[3].textContent;
        var movieid = movie.substr(1,movie.length);
        var idcinema = cinema.substr(1,cinema.length);
        var url = `/suat-phim/delete/`+movieid+"/"+idcinema;
        axios.get(url)
            .then(function (response) {
                alert("Thành Công");
            })
            .catch(function (error) {
                alert("Có lổi");
            })
    }

}



$(document).ready(async function () {
    await initTableData();

    $('#theaters tbody').on('click', 'tr', function () {
        if ($(this).hasClass('selected')) {
            $(this).removeClass('selected');
        }
        else {
            table.$('tr.selected').removeClass('selected');
            $(this).addClass('selected');
        }
    });

   

    $("#list-header").on({
        mouseenter: function () {
            $(this).css("background-color", "lightgray");
        },
        mouseleave: function () {
            $(this).css("background-color", "white");
        },
    });


    // $('#submit').on('click', function () {
    //     let formData = $('#form').serializeArray();
    //     let validation =  true;
	// 	$.each(formData, function(i,v){
	// 		if(v.value == ""){
    //             console.log("error");
    //             validation = false;
    //         };
	// 	});
    //     if(validation){
    //         loading();
    //         console.log("xuat");
    //     }else{
    //         console.log("khong xuat");
    //     }
        
    // });

});





