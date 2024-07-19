
class WidgetLayout {
    tilesData = null;
    constructor(data) {
        this.tilesData = data;
    }

    //#region "private methods"
    _randomizeArray = (array) => {
        let clonedArray = [...array];
        clonedArray.sort(() => Math.random() - 0.5);
        return clonedArray;
    } 

    _splitArray = (array, size) => {
        let results = [];
        let clonedArray = [...array];
        while (clonedArray.length) {
            results.push(clonedArray.splice(0, size));
        }
        return results;
    }

    _createTemplateFrom = (obj) => {
        let template = $("#tile-template").html();

        function escapeRegExp(string) {
            return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        }

        function replaceAll(str, find, replace) {
            return str.replace(new RegExp(escapeRegExp(find), 'g'), replace);
        }

        Object.keys(obj).forEach((key) => {
            template = replaceAll(template, '${' + key + '}', obj[key]);
        });

        return template;
    }
   //#endregion "private methods"


    //#region "public methods"
    render(isRandom = true) {

        let data = this.tilesData;

        if (isRandom) {
            data = this._randomizeArray(data);
        }

        //set order
        data.forEach((item, index) => {
            item.order = item.text;
        });

        let divWidget = $("div.widgets");
        divWidget.empty();

        const tileRows = this._splitArray(data, 3);

        tileRows.forEach((tiles, rowIndex) => {
            divWidget.append('<div class="d-flex flex-sm-row flex-column"></div>');
            let divRow = divWidget.find('div.d-flex:last');
            //tiles in row
            tiles.forEach((tile, colIndex) => {
                let tileHtml = this._createTemplateFrom(tile);
                $(tileHtml).appendTo(divRow);
            });
        });
    }
    //#endregion "public methods"

}

$(document).ready(function () {

    const tilesData = [
        { text: '1' },
        { text: '2' },
        { text: '3' },
        { text: '4' },
        { text: '5' },
        { text: '6' },
        { text: '7' },
        { text: '8' },
        { text: '9' },
    ];

    const widgetLayout = new WidgetLayout(tilesData);

    $('#btnShuffle').click(() => {
        widgetLayout.render(true);
    });

    $('#btnSort').click(() => {
        widgetLayout.render(false);
    });

    widgetLayout.render();
});