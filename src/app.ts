import * as $ from "jquery";
import * as bootstrap from "bootstrap";

export class Ajax{
    constructor(){}
    /**
     * async post
     */
    public async post(method:string,params:any[]):Promise<any> {
        let promise = new Promise<any>((resolve,reject)=>{
            $.ajax({
                type: 'POST',
                url: 'http://47.96.168.8:81/api/testnet',
                dataType: 'json',
                data: JSON.stringify({
                    "jsonrpc": "2.0",
                    "method": method,
                    "params": params,
                    "id": 1
                  }),
                success: (data,status)=>{
                    resolve(data['result']);
                },
                error:()=>{
                    reject("请求失败");
                }
                
            });
        });
        return promise;
    }
}
let ajax:Ajax = new Ajax();

export class PageUtil{
    private _currentPage:number;// 当前页
    private _pageSize:number;// 每页大小
    private _totalCount:number;// 总记录数
    private _totalPage:number ;// 总页数

    /**
     * 
     * @param total 总记录数
     * @param pageSize 每页条数
     */
    constructor(total:number,pageSize:number){
        this._currentPage=1;
        this._totalCount=total;
        this._pageSize = pageSize;
        this._totalPage = total % pageSize == 0 ? total / pageSize : Math.ceil(total / pageSize) ;
    };
    /**
     * currentPage 返回当前页码
     */
    public get currentPage(){
        return this._currentPage;
    }
    /**
     * 
     */
    public set currentPage(currentPage:number) {
        this._currentPage = currentPage;
    }
    /**
     * pageSize 每页条数
     */
    public get pageSize() {
        return this._pageSize;
    }
    /**
     * set count
     */
    public set pageSize(pageSize:number){
        this._pageSize = pageSize;
    }
    /**
     * pageSize 每页条数
     */
    public get totalCount() {
        return this._totalCount;
    }
    /**
     * set count
     */
    public set totalCount(totalCount:number){
        this._totalCount = totalCount;
    }
        /**
     * pageSize 总页数
     */
    public get totalPage() {
        this._totalPage=this._totalCount % this._pageSize == 0 ? this._totalCount / this._pageSize : Math.ceil(this._totalCount / this._pageSize);
        return this._totalPage;
    }
}

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
    
    let pageUtil:PageUtil = new PageUtil(blockCount,15);

    let blocks = await ajax.post('getblocks',[pageUtil.pageSize,1]);
    blocks.forEach((item,index,input)=>{
        var newDate = new Date();
        newDate.setTime(item['time'] * 1000);
        $("#blocks").append('<tr><td>'+item['index']+'</td><td>'+item['size']+' bytes</td><td>'+newDate.toLocaleString()+'</td></tr>')
    });
    
    //监听下一页
    $("#next").click(()=>{
        pageUtil.currentPage +=1;
        
    });
}

//jquery $()
$(()=>{
    let page = $('#page').val();
    console.log(page);
    if(page==='index'){
        indexPage();
    }
    
    if(page==='blocks'){
        let index:number = 0;      //
        blocksPage();
    }
    if(page==='transction'){

    }
});