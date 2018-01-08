import * as $ from "jquery";
import {Ajax as Ajax} from "./Ajax";
import {PageUtil as PageUtil} from "./Entitys";

export class Block{
    constructor(){}
    public async updateBlocks(pageUtil:PageUtil){
        let ajax:Ajax = new Ajax();
        let blocks = await ajax.post('getblocks',[pageUtil.pageSize,pageUtil.currentPage]);
        $("#blocks").empty();
        blocks.forEach((item,index,input)=>{
            var newDate = new Date();
            newDate.setTime(item['time'] * 1000);
            $("#blocks").append('<tr><td>'+item['index']+'</td><td>'+item['size']+' bytes</td><td>'+newDate.toLocaleString()+'</td></tr>')
        });
    }
}