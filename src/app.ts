import * as $ from "jquery";
import * as bootstrap from "bootstrap";
import {Ajax as Ajax} from "./Ajax";
import {PageUtil as PageUtil} from "./Entitys";
import {Block as Block}from "./blocks";

let ajax:Ajax = new Ajax();

//主页
async function indexPage(){

    //查询区块高度(区块数量-1)
    let blockCount = await ajax.post('getblockcount',[]);
    let blockHeight = blockCount[0]['blockcount']-1;
    $("#blockHeight").text(blockHeight.toLocaleString());//显示在页面
    
    //查询交易数量
    let txcount = await ajax.post('gettxcount',[]);
    txcount = txcount[0]['txcount'];
    $("#txcount").text(txcount.toLocaleString());//显示在页面

    //分页查询区块数据
    let blocks = await ajax.post('getblocks',[10,1]);
    blocks.forEach((item,index,input)=>{
        var newDate = new Date();
        newDate.setTime(item['time'] * 1000);
        $("#blocks").append('<tr><td>'+item['index']+'</td><td>'+item['size']+' bytes</td><td>'+newDate.toLocaleString()+'</td></tr>')
    });
};

//区块列表
async function blocksPage(){
    //查询区块数量
    let blockCount = await ajax.post('getblockcount',[]);
    //分页查询区块数据
    $("#blocks").empty();
    
    let pageUtil:PageUtil = new PageUtil(blockCount[0]['blockcount'],15);

    let block:Block = new Block();
    block.updateBlocks(pageUtil);
    
    //监听下一页
    $("#next").click(()=>{
        pageUtil.currentPage +=1;
        block.updateBlocks(pageUtil);
    });
    $("#previous").click(()=>{
        pageUtil.currentPage -=1;
        block.updateBlocks(pageUtil);
    });
}

//jquery $()
$(()=>{
    let page = $('#page').val();
    if(page==='index'){
        indexPage();
        $("#searchBtn").click(()=>{
            window.location.href='./page/blockInfo.html?index='+$("#searchText").val();
        });
    }
    
    if(page==='blocks'){
        let index:number = 0;      //
        blocksPage();
        $("#searchBtn").click(()=>{
            window.location.href='./blockInfo.html?index='+$("#searchText").val();
        });
    }
    if(page==='transction'){

    }
    if(page==='blockInfo'){
        let index:number = Number(GetQueryString("index"));
        let block:Block = new Block();
        block.queryBlock(index);
        $("#searchBtn").click(()=>{
            window.location.href='./blockInfo.html?index='+$("#searchText").val();
        });
    }
});

/**
 * 页面获取参数方法
 * @param name
 * @returns
 */
var LocString = String(location.href);
function GetQueryString(name):string {
    var rs = new RegExp("(^|)" + name + "=([^&]*)(&|$)", "gi").exec(LocString), tmp;
    if (tmp = rs) {
        return decodeURI(tmp[2]);
    }
    // parameter cannot be found
    return "";
}