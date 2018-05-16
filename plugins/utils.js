import Vue from "vue";
const myConfirm = function(msg) {
    let add = function() {
        let _body = document.body;
        let confirm = document.createElement("div");
        confirm.setAttribute("class", "confirm-box");
        confirm.innerHTML = `
            <div class="confirm-box-header">
                <div class="confirm-box-title"></div>
            </div>
            <div class="confirm-box-content">
                <div class="confirm-box-message">
                    ${msg}
                </div>
            </div>
            <div class="confirm-box-btns">
                <button type="button" id="cancel"><span>取消</span></button>
                <button type="button" class="primary" id="confirm"><span>确定</span></button>
            </div>
        `;
        _body.appendChild(confirm);
        let _head = document.head;
        let confirmCss = document.createElement("style");
        confirmCss.innerHTML = `
                .confirm-box{
                    position:absolute;
                    background:#fff;
                    width:420px;
                    height:140px;
                    top:35%;
                    left:50%;
                    margin-left:-210px;
                    border-radius: 3px;
                    font-size: 16px;
                    overflow: hidden;
                    box-sizing: border-box;
                }
                .confirm-box-content{
                    padding: 30px 20px;
                    color: #48576a;
                    font-size: 14px;
                }
                .confirm-box-btns{
                    padding: 10px 20px 15px;
                    text-align: right;
                }
                button{
                    display: inline-block;
                    line-height: 1;
                    white-space: nowrap;
                    cursor: pointer;
                    background: #fff;
                    border: 1px solid #bfcbd9;
                    color: #1f2d3d;
                    -webkit-appearance: none;
                    text-align: center;
                    box-sizing: border-box;
                    outline: 0;
                    margin: 0;
                    padding: 10px 15px;
                    font-size: 14px;
                    border-radius: 4px;
                }
                .primary{
                    color: #fff;
                    background-color: #20a0ff;
                    border-color: #20a0ff;
                }
            `;

        _head.appendChild(confirmCss);
    };
    let remo = function() {
        document.body.removeChild(
            document.getElementsByClassName("confirm-box")[0]
        );
    };
    add();
    return new Promise(function(resolve, reject) {
        document.getElementById("confirm").addEventListener("click", e => {
            remo();
            resolve(msg);
        });
        document.getElementById("cancel").addEventListener("click", e => {
            remo();
            reject(msg);
        });
    });
};
Vue.prototype.$confirm = myConfirm;
