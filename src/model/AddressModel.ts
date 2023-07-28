export class AddressModel {
  id?: number;
  userEmail: string;
  firstName: string;
  lastName: string;
  gender: string;
  city: string;
  postcode: string;
  street: string;
  number: string;
  additionalInformation?: string;
  dateOfBirth?: string;

  constructor(userEmail: string, firstName: string, lastName: string, 
                gender: string, city: string, postcode: string, 
                street: string, number: string, 
                additionalInformation?: string, dateOfBirth?: string) {
    this.userEmail = userEmail;
    this.firstName = firstName;
    this.lastName = lastName;
    this.gender = gender;
    this.city = city;
    this.postcode = postcode;
    this.street = street;
    this.number = number;
    this.additionalInformation = additionalInformation;
    this.dateOfBirth = dateOfBirth;
  }
}