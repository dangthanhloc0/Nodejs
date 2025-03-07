class detailtourModel {
    constructor(detailtour){
        this.startday = detailtour.startday;
        this.endday = detailtour.endday;
        this.description = detailtour.description;
        this.numberpeoplebooked = detailtour.numberpeoplebooked;
        this.transportertourd = detailtour.transportertourd;
        this.price = detailtour.price;
        this.ordertour_id = detailtour.ordertour_id;
        this.tour_id = detailtour.tour_id;
        this.name = detailtour.name;
        this.typeoftour_id = detailtour.typeoftour_id;

    }
}

export default detailtourModel;