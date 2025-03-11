class detailtourModel {
    constructor(detailtour){
        this.startday = detailtour.startday;
        this.endday = detailtour.endday;
        this.description = detailtour.description;
        this.numerseatunoccupied = detailtour.numerseatunoccupied;
        this.transportertourid = detailtour.transportertourid;
        this.price = detailtour.price;
        this.tour_id = detailtour.tour_id;
    }
}

export default detailtourModel;