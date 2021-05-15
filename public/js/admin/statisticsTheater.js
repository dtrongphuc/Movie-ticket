async function chart(start, end) {
    var url = `/admin/thong-ke/getdata/${start}/${end}`;
    axios.get(url).then(function (response) {
        var doanhthu = response.data.map(e => {
            return {
                label: e.name,
                y: e.doanhthu
            }
        });
        var veban = response.data.map(e => {
            return {
                label: e.name,
                y: parseInt(e.ve)
            }
        });
        var chart = new CanvasJS.Chart("chartContainer", {
            exportEnabled: true,
            animationEnabled: true,
            title: {
                text: "Doanh Thu Cụm Rạp"
            },
            subtitles: [{
                text: `Doanh Thu Từ ${start} - ${end}`
            }],

            axisY: {
                title: "Doanh Thu",
                titleFontColor: "#4F81BC",
                lineColor: "#4F81BC",
                labelFontColor: "#4F81BC",
                tickColor: "#4F81BC",
                includeZero: true
            },
            axisY2: {
                title: "Số Vé",
                titleFontColor: "#C0504E",
                lineColor: "#C0504E",
                labelFontColor: "#C0504E",
                tickColor: "#C0504E",
                includeZero: true
            },
            toolTip: {
                shared: true
            },
            legend: {
                cursor: "pointer",
                itemclick: toggleDataSeries
            },
            data: [{
                type: "column",
                name: "Doanh Thu",
                showInLegend: true,
                yValueFormatString: "#,##0.# VNĐ",
                dataPoints: doanhthu
            },
            {
                type: "column",
                name: "Số Vé Bán",
                axisYType: "secondary",
                showInLegend: true,
                yValueFormatString: "#,##0.# vé",
                dataPoints: veban
            }]
        });
        chart.render();
        function toggleDataSeries(e) {
            if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
                e.dataSeries.visible = false;
            } else {
                e.dataSeries.visible = true;
            }
            e.chart.render();
        }
    }).catch(function (error) {
        console.log(error);
    })
}

function submitTheater() {
    var start = document.getElementById("startdate").value;
    var end = document.getElementById("enddate").value;
    if (new Date(start) < new Date(end)) {
        chart(start, end);
    } else {
        document.getElementById("mess").innerHTML = `<div class="alert alert-danger" style="text-align: center;" role="alert">
        Ngày Không Hợp Lệ
      </div>`;
    }
}