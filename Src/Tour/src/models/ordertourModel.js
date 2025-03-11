class ordertourModel {
    constructor(ordertour){
     this.typeoforderid = ordertour.typeoforderid;
     this.user_id = ordertour.user_id;
     this.numberpeople = ordertour.numberpeople;
     this.totalprice = ordertour.totalprice;
     this.detailtour_id = ordertour.detailtour_id;
    }
}

export default ordertourModel
