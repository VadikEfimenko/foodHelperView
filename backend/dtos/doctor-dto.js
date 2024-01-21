module.exports = class DoctorDto {
    login;
    id;

    constructor(model) {
        this.login = model.login;
        this.id = model._id;
    }

}