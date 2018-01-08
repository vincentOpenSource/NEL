import * as $ from "jquery";
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