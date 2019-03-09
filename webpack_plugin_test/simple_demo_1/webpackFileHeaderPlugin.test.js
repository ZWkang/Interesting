/* global describe, it */
"use strict";

const path = require("path");
const webpack = require("webpack");
const fs = require("fs");
const webpackFileHeaderPlugin = require('./webpackFileHeaderPlugin')
const expect = require('expect')

describe("webpackFileHeaderPlugin", () => {
	it("webpackFileHeaderPlugin should write header to bundle file", done => {
		webpack(
			{
                mode: 'none',
                entry: __dirname + '/index.js',
                output: {
                    path: __dirname + '/dist'
                },
                plugins: [
                    new webpackFileHeaderPlugin({
                        AuthorName: `zhouwenkang`
                    })
                ]
			},
			(err, stats) => {
				if (err) return err;
				expect(stats.hasErrors()).toBe(false);
				expect(stats.hasWarnings()).toBe(false);
                const result = require(__dirname + "/dist/main.js");
                fs.readFile(__dirname + "/dist/main.js",'utf-8',function(err, data){
                    if(err){
                        // console.log("error");
                        done(err);
                    }
                    expect(/Author:\szhouwenkang/.test(data)).toBe(true);
                    done()
                });
			}
		);
    });
})