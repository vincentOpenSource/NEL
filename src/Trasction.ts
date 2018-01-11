import * as $ from "jquery";
import {Ajax as Ajax} from "./Ajax";
import {Tx as Tx} from "./Entitys";
import {PageUtil as PageUtil} from "./Entitys";

export class Trasction{
    constructor(){}
    public async updateTrasction(pageUtil:PageUtil){
        let ajax :Ajax = new Ajax();
        //分页查询交易记录
        let txs:Tx[] = await ajax.post('getrawtransactions',[pageUtil.pageSize,pageUtil.currentPage]);
        txs.forEach((tx)=>{
            console.log(tx);
            let html:string="";
            html+="<tr>"
            html+="<td>"+tx.txid
            html+="</td>"
            html+="<td>"+tx.type
            html+="</td>"
            html+="<td>"+(tx.gas==undefined?'':tx.gas)
            html+="</td>"
            html+="<td>"+tx.blockindex
            html+="</td>"
            html+="<td>"+tx.size
            html+="</td>"
            html+="</tr>"
            $("#transactions").append(html);
        });
    }
}