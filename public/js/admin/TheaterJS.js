var table;
async function initTableData() {
    
    var url = `/admin/cum-rap/getdata`;
    axios.get(url)
        .then(function (response) {
            var i = 1;
            let crt;
            var modified = response.data.map(e => {
                return {
                    STT: i++,
                    name: e.name,
                    address: e.address,
                    createdAt: (e.createdAt).substr(0, e.createdAt.length - 14),
                    delete: "<a href=/admin/cum-rap/delete/"+e.id+"><i class='fas fa-trash-alt'></i></a>"
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
                    { data: 'address' },
                    { data: 'createdAt' },
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




