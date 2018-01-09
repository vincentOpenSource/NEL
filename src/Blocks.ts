import * as $ from "jquery";
import {Ajax as Ajax} from "./Ajax";
import {PageUtil as PageUtil} from "./Entitys";

export class Block{
    constructor(){}
    public async updateBlocks(pageUtil:PageUtil){
        let ajax:Ajax = new Ajax();
        let blocks = await ajax.post('getblocks',[pageUtil.pageSize,pageUtil.currentPage]);
        $("#blocks").empty();
        if(pageUtil.totalPage-pageUtil.currentPage){
            $("#next").removeClass('disabled');
        }else{
            $("#next").addClass('disabled');
        }
        if(pageUtil.currentPage-1){
            $("#previous").removeClass('disabled');
        }else{
            $("#previous").addClass('disabled');
        }
        blocks.forEach((item,index,input)=>{
            var newDate = new Date();
            newDate.setTime(item['time'] * 1000);
            $("#blocks").append('<tr><td><a href"../page/blockInfo.html">'+item['index']+'</a></td><td>'+item['size']+' bytes</td><td>'+newDate.toLocaleString()+'</td></tr>')
        });
    }
    public async queryBlock(index:number){
        let ajax:Ajax = new Ajax();
        var newDate = new Date();
        let block = await ajax.post('getblock',[index]);
        newDate.setTime(block[0]['time'] * 1000);
        $("#hash").text(block[0]['hash']);
        $("#size").text(block[0]['size']+' byte');
        $("#time").text(newDate.toLocaleString());
        $("#version").text(block[0]['version']);
    }
}