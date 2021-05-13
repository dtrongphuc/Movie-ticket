var table;
async function initTableData() {
    
    var url = `/admin/getdata`;
    axios.get(url)
        .then(function (response) {
            var i = 1;
            var modified = response.data.map(e => {
                return {
                    STT: i++,
                    name: e.name,
                    theater: e.theaterName,
                    type: e.type,
                    length: e.length,
                    width: e.width,
                    createAt: (e.createdAt).substr(0, e.createdAt.length - 14),
                    updateAt: (e.updatedAt).substr(0, e.updatedAt.length - 14),
                    delete: "<a href=/admin/delete/"+e.id+"><i class='fas fa-trash-alt'></i></a>"
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
                    { data: 'width' },
                    { data: 'length' },
                    { data: 'createAt' },
                    { data: 'updateAt' },
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




