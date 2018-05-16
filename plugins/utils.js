import Vue from "vue";
const myConfirm = function(msg) {
    let add = function() {
        let _body = document.body;
        let confirm = document.createElement("div");
        confirm.setAttribute("class", "confirm");
        confirm.innerHTML = `
        <div class="confirm-box">
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
        </div>
        `;
        _body.appendChild(confirm);
        let _head = document.head;
        let confirmCss = document.createElement("style");
        confirmCss.innerHTML = `
                @keyframes msgbox-fade-in {
                    0% {
                        transform: translate3d(0,-20px,0);
                        opacity: 0
                    }

                    to {
                        transform: translateZ(0);
                        opacity: 1
                    }
                }

                @keyframes msgbox-fade-out {
                    0% {
                        transform: translateZ(0);
                        opacity: 1
                    }

                    to {
                        transform: translate3d(0,-20px,0);
                        opacity: 0
                    }
                }
                .confirm{
                    position:fixed;
                    top: 0;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    text-align: center;
                    background-color: rgba(0,0,0,0.45);
                }
                .confirm::after {
                    content: "";
                    display: inline-block;
                    height: 100%;
                    width: 0;
                    vertical-align: middle;
                }
                .confirm-box{
                    display: inline-block;
                    vertical-align: middle;
                    background:#fff;
                    width:420px;
                    height:140px;
                    font-size: 16px;
                    overflow: hidden;
                    box-sizing: border-box;
                    box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.02), 0 4px 10px rgba(0, 0, 0, 0.06);
                    animation: msgbox-fade-in .3s;
                }
                .confirm-box.leave{
                    animation: msgbox-fade-out .3s;
                }
                .confirm-box-content{
                    padding: 30px 20px;
                    color: #48576a;
                    font-size: 14px;
                    text-align: left;
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
        document
            .getElementsByClassName("confirm-box")[0]
            .classList.add("leave");
        setTimeout(() => {
            document.body.removeChild(
                document.getElementsByClassName("confirm")[0]
            );
            document.head.removeChild(
                document.getElementsByTagName("style")[
                    document.getElementsByTagName("style").length - 1
                ]
            );
        }, 200);
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
