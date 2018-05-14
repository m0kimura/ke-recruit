const Cp=require('child_process');
module.exports=class keRecruit {
/**
 * リクルートAPIコンストラクター
 * @param  {String} site API対応サイト(省略時は対応サイト)
 * @return {Void}       none
 * @constructor
 */
  constructor(site) {
    this.Context='';
    this.Site=site||'https://api.a3rt.recruit-tech.co.jp';
  }
  /**
  * 文書校正インターフェイス
  * @param  {String}   txt 文章
  * @return {Object}       アラートオブジェクトhttps://a3rt.recruit-tech.co.jp/product/proofreadingAPI/
  * @method
  */
  proof(txt) {
    let res, out;
    try{
      let stdout=Cp.execSync(this.curlProof(encodeURIComponent(txt)))+'';
      res=JSON.parse(stdout+'');
      if(res.message=='ok'){
        out=res.alerts;
      }
    }catch(error){
      out='';
      console.log('error16', error);
      this.error=error;
    }
    return out;
  }
  /**
 * 文書校正curlコマンド編集
 * @param  {String} data 送信メッセージ
 * @return {String}      curlコマンド
 * @method
 */
  curlProof(data) {
    let apikey=process.env.RECRUIT_PROOF_KEY;
    let out='curl -f "'+this.Site+'/proofreading/v1/typo?apikey='+apikey;
    out+='&sentence='+data+'" ';
    out+='-H \'Content-type: application/json\'';
    return out;
  }
  /**
 * 会話インターフェイス
 * @param  {String} txt 会話内容
 * @return {String}     会話返答
 * @method
 */
  dialogue(txt) {
    let res, out;
    try{
      let stdout=Cp.execSync(this.curlDialog(txt))+'';
      res=JSON.parse(stdout+'');
      if(res.message=='ok'){
        out=res.results[0].reply;
      }
    }catch(error){
      out='何か調子が悪いです。';
      console.log('error16', error);
      this.error=error;
    }
    return out;
  }
  /**
   * 会話用curlインターフェイス
   * @param  {String} data 会話での発言
   * @return {String}      curlテキスト
   * @method
   */
  curlDialog(data) {
    let apikey=process.env.RECRUIT_DIALOG_KEY;
    let out='curl -f -X POST "'+this.Site+'/talk/v1/smalltalk" ';
    out+='-F "apikey='+apikey+'" ';
    out+='-F "query='+data+'"';
    return out;
  }
  /**
   * イメージ検索
   * @param  {string} txt 検索ワード
   * @return {Object}     検索結果 https://a3rt.recruit-tech.co.jp/product/imageSearchAPI/
   * @method
   */
  search(txt) {
    let res, out;
    try{
      let stdout=Cp.execSync(this.curlSearch(txt))+'';
      res=JSON.parse(stdout+'');
      if(res.message=='ok'){
        out=res.result.img;
      }
    }catch(error){
      out=[];
      console.log('error16', error);
      this.error=error;
    }
    return out;
  }
  /**
   * イメージ検索cursインターフェイス
   * @param  {string} data 検索ワード
   * @return {string}      curl用URL
   * @method
   */
  curlSearch(data) {
    let apikey=process.env.RECRUIT_SEARCH_KEY;
    let out='curl -f "'+this.Site+'/image_search/v1/search_by_text?apikey='+apikey;
    out+='&query='+encodeURIComponent(data)+'" ';
    out+='-H \'Content-type: application/json\'';
    return out;
  }
};
