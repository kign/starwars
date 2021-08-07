const Canvas = (function () {
    'use strict';

    let ctx;  // 2D drawing context
    let canvas; // HTML canvas element
    let W, H; // canvas pixel size
    let X, Y; // canvas logical size

    const pad = 1;
    const box = 14;
    const spc = 2;

    const c_bg = 'Teal';
    const c_fg = 'White';

    const flip = false;

    const init_board = function () {
        ctx.fillStyle = c_bg;
        ctx.fillRect(0, 0, W, H);
    }

    const fcell = function (color, x, y, ext= 0) {
        ctx.fillStyle = color;
        ctx.fillRect(
            pad + x * (spc + box) - ext,
            (flip?(H - box - pad - y * (spc + box)) : (pad + y * (spc + box))) - ext,
            box + 2 * ext,
            box + 2 * ext);
    }

    const tcell = function(color, c, x, y, ext = 0) {
        if (ext >= 0)
            fcell(c_bg, x, y, ext);
        ctx.fillStyle = color;
        ctx.font = `${box-0}px Arial`;
        if (c !== ' ')
            ctx.fillText(c, pad + x * (spc + box) + 1,
                (flip?(H - pad - y * (spc + box)): (pad + box + y * (spc + box))) - 1);
    }

    return {
        init: function (id) {
            canvas = document.getElementById(id);

            W = canvas.clientWidth;
            H = canvas.clientHeight;

            canvas.width = W;
            canvas.height = H;

            ctx = canvas.getContext("2d");

            init_board();
            X = Math.floor((W - 2*pad + spc)/(box + spc));
            Y = Math.floor((H - 2*pad + spc)/(box + spc));

            console.log("W =", W, ", H =", H, ", X =", X, ", Y =", Y);
        },

        dbgShowCells: function () {
            for (let x = 0; x < X; x++)
                for (let y = 0; y < Y; y++)
                    fcell('black', x, y);
        },

        dbgShowFont: function () {
            for (let x = 0; x < X; x++)
                tcell('white', String.fromCharCode(65 + x % 26), x, 0, -1);
            for (let y = 0; y < Y; y++)
                tcell('white', String.fromCharCode(48 + y % 10), 0, y, -1);
        },

        getWidth: function () {
            return X;
        },

        getHeight: function () {
            return Y;
        },

        getCanvas: function () {
            return canvas;
        },

        put: function (x, y, text) {
            for(let v = 0; v < text.length; v ++)
                tcell(c_fg, text[v], x + v, y, 2);
        }
    }
}());
