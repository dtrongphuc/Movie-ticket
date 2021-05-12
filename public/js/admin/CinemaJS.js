var table;
async function initTableData() {
    
    var url = `/admin/getdata`;
    axios.get(url)
        .then(function (response) {
            var i = 1;
            var modified = response.data.map(eachth => {
                return {
                    STT: i++,
                    name: eachth.name,
                    theater: eachth.theater,
                    type: eachth.type,
                    hor: eachth.hor,
                    ver: eachth.ver,
                    delete: "<a href=/admin/delete/"+eachth.id+"><i class='fas fa-trash-alt'></i></a>"
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
                    { data: 'theater' },
                    { data: 'type' },
                    { data: 'hor' },
                    { data: 'ver' },
                    { data: 'delete' },
                ]
            });
           
        })
        .catch(function (error) {
            console.log(error);
        })

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

});




