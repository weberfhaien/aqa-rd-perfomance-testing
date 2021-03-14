/*
   Licensed to the Apache Software Foundation (ASF) under one or more
   contributor license agreements.  See the NOTICE file distributed with
   this work for additional information regarding copyright ownership.
   The ASF licenses this file to You under the Apache License, Version 2.0
   (the "License"); you may not use this file except in compliance with
   the License.  You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/
var showControllersOnly = false;
var seriesFilter = "";
var filtersOnlySampleSeries = true;

/*
 * Add header in statistics table to group metrics by category
 * format
 *
 */
function summaryTableHeader(header) {
    var newRow = header.insertRow(-1);
    newRow.className = "tablesorter-no-sort";
    var cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 1;
    cell.innerHTML = "Requests";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 3;
    cell.innerHTML = "Executions";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 7;
    cell.innerHTML = "Response Times (ms)";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 1;
    cell.innerHTML = "Throughput";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 2;
    cell.innerHTML = "Network (KB/sec)";
    newRow.appendChild(cell);
}

/*
 * Populates the table identified by id parameter with the specified data and
 * format
 *
 */
function createTable(table, info, formatter, defaultSorts, seriesIndex, headerCreator) {
    var tableRef = table[0];

    // Create header and populate it with data.titles array
    var header = tableRef.createTHead();

    // Call callback is available
    if(headerCreator) {
        headerCreator(header);
    }

    var newRow = header.insertRow(-1);
    for (var index = 0; index < info.titles.length; index++) {
        var cell = document.createElement('th');
        cell.innerHTML = info.titles[index];
        newRow.appendChild(cell);
    }

    var tBody;

    // Create overall body if defined
    if(info.overall){
        tBody = document.createElement('tbody');
        tBody.className = "tablesorter-no-sort";
        tableRef.appendChild(tBody);
        var newRow = tBody.insertRow(-1);
        var data = info.overall.data;
        for(var index=0;index < data.length; index++){
            var cell = newRow.insertCell(-1);
            cell.innerHTML = formatter ? formatter(index, data[index]): data[index];
        }
    }

    // Create regular body
    tBody = document.createElement('tbody');
    tableRef.appendChild(tBody);

    var regexp;
    if(seriesFilter) {
        regexp = new RegExp(seriesFilter, 'i');
    }
    // Populate body with data.items array
    for(var index=0; index < info.items.length; index++){
        var item = info.items[index];
        if((!regexp || filtersOnlySampleSeries && !info.supportsControllersDiscrimination || regexp.test(item.data[seriesIndex]))
                &&
                (!showControllersOnly || !info.supportsControllersDiscrimination || item.isController)){
            if(item.data.length > 0) {
                var newRow = tBody.insertRow(-1);
                for(var col=0; col < item.data.length; col++){
                    var cell = newRow.insertCell(-1);
                    cell.innerHTML = formatter ? formatter(col, item.data[col]) : item.data[col];
                }
            }
        }
    }

    // Add support of columns sort
    table.tablesorter({sortList : defaultSorts});
}

$(document).ready(function() {

    // Customize table sorter default options
    $.extend( $.tablesorter.defaults, {
        theme: 'blue',
        cssInfoBlock: "tablesorter-no-sort",
        widthFixed: true,
        widgets: ['zebra']
    });

    var data = {"OkPercent": 100.0, "KoPercent": 0.0};
    var dataset = [
        {
            "label" : "FAIL",
            "data" : data.KoPercent,
            "color" : "#FF6347"
        },
        {
            "label" : "PASS",
            "data" : data.OkPercent,
            "color" : "#9ACD32"
        }];
    $.plot($("#flot-requests-summary"), dataset, {
        series : {
            pie : {
                show : true,
                radius : 1,
                label : {
                    show : true,
                    radius : 3 / 4,
                    formatter : function(label, series) {
                        return '<div style="font-size:8pt;text-align:center;padding:2px;color:white;">'
                            + label
                            + '<br/>'
                            + Math.round10(series.percent, -2)
                            + '%</div>';
                    },
                    background : {
                        opacity : 0.5,
                        color : '#000'
                    }
                }
            }
        },
        legend : {
            show : true
        }
    });

    // Creates APDEX table
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.6247995188452286, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [0.4517684887459807, 500, 1500, "Open_Category_Page"], "isController": false}, {"data": [0.7006369426751592, 500, 1500, "Open_Main_Page-1"], "isController": false}, {"data": [0.9872611464968153, 500, 1500, "Open_Main_Page-0"], "isController": false}, {"data": [0.6821086261980831, 500, 1500, "Open_Computers_Page-1"], "isController": false}, {"data": [0.45307443365695793, 500, 1500, "Open_Item_Page"], "isController": false}, {"data": [0.9808306709265175, 500, 1500, "Open_Computers_Page-0"], "isController": false}, {"data": [0.4394904458598726, 500, 1500, "Open_Main_Page"], "isController": false}, {"data": [0.45686900958466453, 500, 1500, "Open_Computers_Page"], "isController": false}, {"data": [0.9823151125401929, 500, 1500, "Open_Category_Page-0"], "isController": false}, {"data": [0.5401929260450161, 500, 1500, "Open_Category_Page-1"], "isController": false}, {"data": [0.9902912621359223, 500, 1500, "Open_Item_Page-0"], "isController": false}, {"data": [0.529126213592233, 500, 1500, "Open_Item_Page-1"], "isController": false}]}, function(index, item){
        switch(index){
            case 0:
                item = item.toFixed(3);
                break;
            case 1:
            case 2:
                item = formatDuration(item);
                break;
        }
        return item;
    }, [[0, 0]], 3);

    // Create statistics table
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 3741, 0, 0.0, 640.6752205292677, 232, 2680, 573.0, 1018.0, 1485.8999999999996, 1953.58, 30.951888470607702, 190.27415983225086, 23.239674688702273], "isController": false}, "titles": ["Label", "#Samples", "FAIL", "Error %", "Average", "Min", "Max", "Median", "90th pct", "95th pct", "99th pct", "Transactions/s", "Received", "Sent"], "items": [{"data": ["Open_Category_Page", 622, 0, 0.0, 988.0, 652, 2297, 896.0, 1469.3000000000027, 1830.0, 2100.2099999999987, 5.326938723076265, 45.85758186849655, 6.124129528326125], "isController": false}, {"data": ["Open_Main_Page-1", 314, 0, 0.0, 635.8980891719743, 352, 2167, 507.5, 1395.5, 1564.25, 2109.7000000000035, 2.6114654978833824, 18.86743537870408, 1.6874675775954557], "isController": false}, {"data": ["Open_Main_Page-0", 314, 0, 0.0, 298.4840764331207, 235, 956, 272.0, 444.0, 460.75, 623.2500000000019, 2.6090785964154253, 3.5680084587325194, 1.0217841704127164], "isController": false}, {"data": ["Open_Computers_Page-1", 313, 0, 0.0, 609.1693290734829, 377, 1786, 527.0, 1180.8000000000002, 1245.1000000000001, 1515.6600000000003, 2.6560988442151356, 16.347100354712243, 1.840760894354305], "isController": false}, {"data": ["Open_Item_Page", 618, 0, 0.0, 1008.8608414239471, 646, 2038, 922.0, 1329.0, 1813.1, 1979.389999999999, 5.321988942663751, 64.89714548599748, 6.307953596217771], "isController": false}, {"data": ["Open_Computers_Page-0", 313, 0, 0.0, 304.4504792332269, 233, 966, 271.0, 450.0, 475.0, 687.0200000000001, 2.658354707750845, 3.64429782118955, 1.1708183331988584], "isController": false}, {"data": ["Open_Main_Page", 628, 0, 0.0, 934.7515923566892, 589, 2680, 794.0, 1680.0, 1950.0, 2524.690000000005, 5.197728890433861, 44.66086991607489, 5.3942182249507535], "isController": false}, {"data": ["Open_Computers_Page", 626, 0, 0.0, 913.8722044728434, 644, 2061, 815.0, 1444.9, 1632.0, 1831.7900000000004, 5.297721810365255, 39.867673979596155, 6.004763506651772], "isController": false}, {"data": ["Open_Category_Page-0", 311, 0, 0.0, 296.80064308681654, 232, 739, 272.0, 434.0, 473.5999999999998, 577.0399999999998, 2.6821443355871395, 3.675113139488754, 1.20307561264575], "isController": false}, {"data": ["Open_Category_Page-1", 311, 0, 0.0, 690.9421221864949, 373, 2000, 607.0, 1189.8000000000002, 1516.3999999999999, 1704.6799999999998, 2.6738427677281793, 19.354353417424687, 1.8746386335889675], "isController": false}, {"data": ["Open_Item_Page-0", 309, 0, 0.0, 298.54368932038835, 233, 1145, 272.0, 426.0, 458.5, 844.9999999999968, 2.6729410136415144, 3.7125476036521547, 1.2466054351963185], "isController": false}, {"data": ["Open_Item_Page-1", 309, 0, 0.0, 710.0614886731393, 409, 1694, 637.0, 956.0, 1507.5, 1658.6999999999998, 2.671161825726141, 28.862478591264694, 1.9202521233143153], "isController": false}]}, function(index, item){
        switch(index){
            // Errors pct
            case 3:
                item = item.toFixed(2) + '%';
                break;
            // Mean
            case 4:
            // Mean
            case 7:
            // Median
            case 8:
            // Percentile 1
            case 9:
            // Percentile 2
            case 10:
            // Percentile 3
            case 11:
            // Throughput
            case 12:
            // Kbytes/s
            case 13:
            // Sent Kbytes/s
                item = item.toFixed(2);
                break;
        }
        return item;
    }, [[0, 0]], 0, summaryTableHeader);

    // Create error table
    createTable($("#errorsTable"), {"supportsControllersDiscrimination": false, "titles": ["Type of error", "Number of errors", "% in errors", "% in all samples"], "items": []}, function(index, item){
        switch(index){
            case 2:
            case 3:
                item = item.toFixed(2) + '%';
                break;
        }
        return item;
    }, [[1, 1]]);

        // Create top5 errors by sampler
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 3741, 0, null, null, null, null, null, null, null, null, null, null], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
